import Link from "next/link";
import { getRecentContributions } from "@/lib/actions";
import { format, parseISO } from "date-fns";
import MyGithubCalendar from "./my-github-calendar";

const GithubActivityPage = async () => {
  const contributions = await getRecentContributions(100);
  return (
    <main className="space-y-8">
      <header className="font-bold">
        <span>github activity</span>
      </header>
      <MyGithubCalendar />
      <ul className="space-y-8">
        {contributions.map((contribution) => (
          <li key={contribution.abbreviatedOid} className="">
            <Link
              href={contribution.repoUrl}
              className="text-sm text-zinc-600 dark:text-zinc-400 hover:underline"
            >
              {contribution.repo}
            </Link>
            <Link
              href={contribution.commitUrl}
              className="flex justify-between items-center hover:underline"
            >
              <p className="w-4/6">{contribution.message}</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {format(parseISO(contribution.committedDate), "MMM do, yy")}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default GithubActivityPage;
