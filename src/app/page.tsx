import Emoji from "@/components/emoji";
import {
  EMAIL_ADDRESS,
  GITHUB_URL,
  GITHUB_USERNAME,
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { splineSansMono } from "@/fonts";
import { cn } from "@/lib/utils";
import { getRecentContributions } from "./actions";
import { format, parseISO } from "date-fns";

export default async function Home() {
  const contributions = await getRecentContributions(5);

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
        <span className="max-w-[21rem] text-center font-thin">
          Code <Emoji symbol="💻" label="laptop" /> , Caffeinated{" "}
          <Emoji symbol="☕️" label="coffee" /> by Nitro{" "}
          <Emoji symbol="🚀" label="rocket" /> , and Architecting{" "}
          <Emoji symbol="🏗" label="building construction" /> Systems for Speed
          🏎️.
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
            Mastermind of user-friendly websites (think 🤔 : smooth interfaces
            you&apos;ll love).
          </li>
          <li>
            Once disassembled a bike engine 🏍️ (don&apos;t worry, I reassembled
            it!) - that&apos;s how curious I am!
          </li>
          <li>
            My insatiable curiosity fuels exploration in machine learning 🤖,
            pushing the boundaries of human-computer interaction.
          </li>
          <li>
            Bonus: I build the secret code that makes everything scalable:
            powerful backend systems using AWS & GCP.
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
      <section className="space-y-8">
        <header className="font-bold">
          <span>newsletter</span>
        </header>
        <div className="flex w-full items-center space-x-4">
          <Input type="email" placeholder="Email" />
          <Button type="submit">Subscribe</Button>
        </div>
      </section>
    </main>
  );
}
