import { graphql } from "@octokit/graphql";
import { unstable_cache } from "next/cache";
import { z } from "zod";
import { GITHUB_USER_ID, UNIVERSAL_USERNAME } from "@/constants";

const commitSchema = z.object({
  messageHeadline: z.string(),
  committedDate: z.iso.datetime(),
  url: z.url(),
  abbreviatedOid: z.string(),
});
const resultSchema = z.object({
  user: z
    .object({
      repositories: z.object({
        nodes: z.array(
          z
            .object({
              name: z.string(),
              url: z.url(),
              defaultBranchRef: z
                .object({
                  target: z.object({
                    history: z
                      .object({ nodes: z.array(commitSchema.nullable()) })
                      .optional(),
                  }),
                })
                .nullable(),
            })
            .nullable(),
        ),
      }),
    })
    .nullable(),
});

export const getRecentContributions = unstable_cache(
  async () => {
    const token = process.env.GITHUB_ACCESS_TOKEN;
    if (!token) return [];
    try {
      const result = resultSchema.parse(
        await graphql<unknown>(
          `
      query($login: String!, $author: ID!) {
        user(login: $login) {
          repositories(first: 20, privacy: PUBLIC, orderBy: {field: UPDATED_AT, direction: DESC}) {
            nodes {
              name url
              defaultBranchRef { target { ... on Commit {
                history(first: 10, author: {id: $author}) {
                  nodes { url messageHeadline committedDate abbreviatedOid }
                }
              } } }
            }
          }
        }
      }`,
          {
            login: UNIVERSAL_USERNAME,
            author: GITHUB_USER_ID,
            headers: { authorization: `bearer ${token}` },
            request: { signal: AbortSignal.timeout(5000) },
          },
        ),
      );
      return (result.user?.repositories.nodes ?? [])
        .flatMap((repo) =>
          repo
            ? (repo.defaultBranchRef?.target.history?.nodes ?? []).flatMap(
                (commit) =>
                  commit
                    ? [{ ...commit, repo: repo.name, repoUrl: repo.url }]
                    : [],
              )
            : [],
        )
        .sort(
          (a, b) => Date.parse(b.committedDate) - Date.parse(a.committedDate),
        )
        .slice(0, 100);
    } catch {
      console.error("GitHub activity could not be loaded.");
      return [];
    }
  },
  ["public-github-contributions"],
  { revalidate: 3600 },
);
