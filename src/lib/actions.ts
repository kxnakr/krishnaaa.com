"use server";

import { db } from "@/db";
import { z } from "zod";
import sgMail from "@sendgrid/mail";
import { newsletterUsersTable } from "@/db/schema";
import { GITHUB_ACCESS_TOKEN, GITHUB_USERNAME } from "@/constants";

export interface IContribution {
  repo: string;
  repoUrl: string;
  committedDate: string;
  commitUrl: string;
  message: string;
  abbreviatedOid: string;
}

export interface IRepo {
  name: string;
  url: string;
  defaultBranchRef: {
    target: {
      history: {
        nodes: [
          {
            message: string;
            committedDate: string;
            url: string;
            abbreviatedOid: string;
          }
        ];
      };
    };
  };
}

export const getRecentContributions = async (limit: number = 100) => {
  const query = `
  query {
    user(login: "${GITHUB_USERNAME}") {
      repositories(first: 15, orderBy: {field: UPDATED_AT, direction: DESC}) {
        nodes {
          name
          url
          defaultBranchRef {
            target {
              ... on Commit {
                history(first: 100, author: {id: "MDQ6VXNlcjcxODE3Njkx"}) {
                  nodes {
                    url
                    message
                    committedDate
                    abbreviatedOid
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  `;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({ query }),
    next: {
      revalidate: 3600,
    },
  });

  const { data } = await response.json();

  const allCommits: IContribution[] = [];

  let counter = 0;

  data.user.repositories.nodes.forEach((repo: IRepo) => {
    if (counter >= limit) {
      return;
    }

    repo.defaultBranchRef.target.history.nodes.forEach((commit) => {
      if (counter >= limit) {
        return;
      }

      allCommits.push({
        repo: repo.name,
        repoUrl: repo.url,
        commitUrl: commit.url,
        committedDate: commit.committedDate,
        message: commit.message,
        abbreviatedOid: commit.abbreviatedOid,
      });

      counter++;
    });
  });

  allCommits.sort(
    (a, b) => +new Date(b.committedDate) - +new Date(a.committedDate)
  );

  return allCommits;
};

const userEmailSchema = z.string().email();

export const addToNewsletter = async (formData: FormData) => {
  const validatedResult = userEmailSchema.safeParse(formData.get("email"));

  if (validatedResult.error) {
    return {
      error: validatedResult.error.format()._errors[0],
    };
  }

  try {
    const a = await db.insert(newsletterUsersTable).values({
      email: validatedResult.data,
    });
    return {
      success: "You've been added to the newsletter!",
    };
  } catch (error: unknown) {
    if (error instanceof Error && (error as any).code === "23505") {
      return {
        error: "You're already subscribed to the newsletter.",
      };
    }
    return {
      error:
        "An unexpected error occurred while processing your request. Please try again!",
    };
  }
};

const contactUsSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  message: z.string().min(1),
});

export const sendEmailToMe = async (formData: FormData) => {
  const validatedResult = contactUsSchema.safeParse({
    email: formData.get("email"),
    name: formData.get("name"),
    message: formData.get("message"),
  });

  if (!validatedResult.success) {
    return {
      error: validatedResult.error.format().email?._errors[0] ?? "Invalid data",
    };
  }

  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

  try {
    const mailRes = await sgMail.send({
      from: `Krishna Kumar <portfolio@krishnaaa.com>`,
      to: "krishnakumarlal8421@gmail.com",
      subject: `🚀 New Message from ${validatedResult.data.name} 🚀 | krishnaaa.com`,
      html: `
          <p>Name:         ${validatedResult.data.name}</p>
          <p>Email:        ${validatedResult.data.email}</p>
          <p>Message:      ${validatedResult.data.message}</p>
      `,
    });

    if (mailRes[0].statusCode !== 202) {
      throw new Error();
    }

    return {
      success: "Message sent successfully! I'll get back to you soon.",
    };
  } catch (error: unknown) {
    return {
      error:
        "An unexpected error occurred while processing your request. Please try again!",
    };
  }
};
