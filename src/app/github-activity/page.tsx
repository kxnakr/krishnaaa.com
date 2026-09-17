import { format, parseISO } from "date-fns";
import type { Metadata } from "next";
import { GITHUB_URL } from "@/constants";
import { getRecentContributions } from "@/lib/github";
import MyGithubCalendar from "./my-github-calendar";

export const metadata: Metadata = {
  title: "GitHub activity",
  alternates: { canonical: "/github-activity" },
};

export default async function GithubActivityPage() {
  const contributions = await getRecentContributions();
  return (
    <main id="main" className="page-enter space-y-8">
      <h1 className="text-xl font-semibold">github activity</h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        You can find my public work on{" "}
        <a href={GITHUB_URL} className="text-link">
          GitHub
        </a>
        .
      </p>
      <MyGithubCalendar />
      <ul className="space-y-6">
        {contributions.map((commit) => (
          <li key={commit.url} className="min-w-0 space-y-1">
            <a href={commit.repoUrl} className="quiet-link text-xs">
              {commit.repo}
            </a>
            <a
              href={commit.url}
              className="block break-words text-sm hover:underline underline-offset-4"
            >
              {commit.messageHeadline}
            </a>
            <time
              dateTime={commit.committedDate}
              className="block text-xs text-zinc-500 dark:text-zinc-400"
            >
              {format(parseISO(commit.committedDate), "MMM d, yyyy")}
            </time>
          </li>
        ))}
      </ul>
    </main>
  );
}
