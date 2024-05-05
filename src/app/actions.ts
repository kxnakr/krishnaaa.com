"use server";

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
