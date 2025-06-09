import Emoji from "@/components/emoji";
import {
  EMAIL_ADDRESS,
  GITHUB_URL,
  // GITHUB_USERNAME,
  LINKEDIN_URL,
  NAME,
  TWITTER_URL,
} from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
import { splineSansMono } from "@/fonts";
import { cn } from "@/lib/utils";
import { getRecentContributions, getSnippets } from "../lib/actions";
import { format, parseISO } from "date-fns";
import Newsletter from "@/components/newsletter";
import CopySnippet from "./snippets/copy-snippet";
import DownloadSnippet from "./snippets/download-snippet";

export default async function Home() {
  const contributions = await getRecentContributions({
    topFiveOnly: true,
  });
  const snippets = await getSnippets();

  return (
    <main className="flex flex-col gap-20">
      <section className="m-auto flex flex-col items-center gap-4">
        <Image
          src="/krishna.png"
          alt={`${NAME}'s Photo`}
          width={210}
          height={210 * 1.17157}
          quality={100}
          draggable={false}
          priority
        />
        <span
          className={cn("text-xl font-extrabold", splineSansMono.className)}
        >
          {NAME}
        </span>
        <span className="w-full sm:w-5/6 text-center">
          Passionate about crafting user-friendly applications{" "}
          <Emoji symbol="🚀" label="rocket" />, using modern technologies to
          deliver efficient and delightful experiences{" "}
          <Emoji symbol="💻" label="laptop" />.
        </span>

        <div className="flex gap-6 mt-2">
          <Link href={GITHUB_URL} target="_blank">
            <FaGithub size={24} />
          </Link>
          <Link href={`mailto:${EMAIL_ADDRESS}`}>
            <MdAlternateEmail size={24} />
          </Link>
          <Link href={LINKEDIN_URL} target="_blank">
            <FaLinkedin size={24} />
          </Link>
          <Link href={TWITTER_URL} target="_blank">
            <FaXTwitter size={24} />
          </Link>
        </div>
      </section>

      <section className="space-y-8">
        <header className="font-bold">
          <span>tldr;</span>
        </header>
        <ul className="list-disc space-y-3 ml-5">
          <li>
            Self-taught full-stack developer with expertise in Node.js, Next.js,
            and Golang <Emoji symbol="💻" label="laptop" />.
          </li>
          <li>
            Passionate about backend development and DevOps{" "}
            <Emoji symbol="⚙️" label="gear" /> to build efficient and scalable
            systems.
          </li>
          <li>
            Proficient in leveraging Docker, GCP, and CI/CD to create reliable
            and cloud-native applications <Emoji symbol="☁️" label="cloud" />.
          </li>
          <li>
            4+ years of freelancing experience delivering solutions like static
            sites, LMS platforms, dashboards, and agency landing pages tailored
            to startup needs <Emoji symbol="🛠️" label="tools" />.
          </li>
        </ul>
      </section>

      <section className="space-y-8">
        <header className="font-bold flex justify-between">
          <span>blogs</span>
          <Link href="/blogs">
            <span className="text-sm font-light">show all</span>
          </Link>
        </header>
        <ul className="space-y-3">
          <Link href="https://blogs.krishnaaa.com/javascript-basics-for-reactjs-a-beginners-guide">
            <li className="flex justify-between hover:underline">
              <span>
                JavaScript Basics for React.js: A Beginner&apos;s Guide
              </span>
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                Nov 3, 2023
              </span>
            </li>
          </Link>
        </ul>
      </section>

      <section className="space-y-8">
        <header className="font-bold flex justify-between">
          <span>snippets</span>
          <Link href="/snippets">
            <span className="text-sm font-light">show all</span>
          </Link>
        </header>
        <ul className="space-y-3">
          {snippets.slice(0, 5).map((snippet) => (
            <li key={snippet.id} className="flex justify-between items-center">
              <Link
                href={`/snippets/${snippet.slug}`}
                className="hover:underline"
              >
                {snippet.title}
              </Link>
              <div className="flex gap-2">
                <CopySnippet iconOnly code={snippet.code} />
                <DownloadSnippet
                  iconOnly
                  code={snippet.code}
                  filename={snippet.filename}
                />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-8">
        <header className="font-bold flex justify-between">
          <span>github activity</span>
          <Link href="/github-activity">
            <span className="text-sm font-light">show all</span>
          </Link>
        </header>
        <ul className="space-y-3">
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
      </section>
      <Newsletter />
    </main>
  );
}
