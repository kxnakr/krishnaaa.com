import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";
import { ProjectList } from "@/components/project-list";
import {
  EMAIL_ADDRESS,
  GITHUB_URL,
  LINKEDIN_URL,
  NAME,
  TWITTER_URL,
} from "@/constants";
import { experience, projects, writing } from "@/content/site";
import { splineSansMono } from "@/fonts";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <main id="main" className="page-enter flex flex-col gap-16 sm:gap-20">
      <section className="flex flex-col items-center gap-4 text-center">
        <Image
          src="/krishna.png"
          alt="Krishna"
          width={210}
          height={246}
          sizes="210px"
          preload
          draggable={false}
        />
        <h1 className={`${splineSansMono.className} text-xl font-bold`}>
          {NAME}
        </h1>
        <p className="max-w-md leading-relaxed text-zinc-700 dark:text-zinc-300">
          I’m a software engineer in India. I build web and mobile apps, and
          spend much of my time exploring AI and developer tools.
        </p>
        <div className="mt-2 flex items-center gap-6">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub size={22} />
          </a>
          <a href={`mailto:${EMAIL_ADDRESS}`} aria-label="Email Krishna">
            <MdAlternateEmail size={24} />
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={22} />
          </a>
          <a
            href={TWITTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
          >
            <FaXTwitter size={21} />
          </a>
        </div>
      </section>
      <section aria-labelledby="projects-heading" className="space-y-6">
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="projects-heading" className="font-semibold">
            things i’m building
          </h2>
          <Link href="/projects" className="quiet-link text-sm">
            all projects
          </Link>
        </div>
        <ProjectList
          items={projects
            .filter((project) => project.group === "project")
            .slice(0, 3)}
        />
      </section>
      <section aria-labelledby="experience-heading" className="space-y-6">
        <h2 id="experience-heading" className="font-semibold">
          where i’ve worked
        </h2>
        <ul className="space-y-7">
          {experience.map((job) => (
            <li key={job.company}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-medium">{job.company}</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {job.dates}
                </p>
              </div>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {job.role}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                {job.description}
              </p>
            </li>
          ))}
        </ul>
      </section>
      <section aria-labelledby="about-heading" className="space-y-4">
        <h2 id="about-heading" className="font-semibold">
          a little about me
        </h2>
        <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">
          I studied computer science at KIIT. I work with TypeScript and React,
          write backend services, and look after the infrastructure they run on.
        </p>
        <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">
          Outside that work, I’ve been learning Rust, running models on my Mac,
          and experimenting with agent memory and 3D tools. I keep those
          experiments{" "}
          <Link href="/projects#experiments" className="text-link">
            here
          </Link>
          .
        </p>
      </section>
      <section aria-labelledby="writing-heading" className="space-y-5">
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="writing-heading" className="font-semibold">
            writing
          </h2>
          <Link href="/snippets" className="quiet-link text-sm">
            code snippets
          </Link>
        </div>
        <ul>
          {writing.map((post) => (
            <li key={post.url}>
              <a href={post.url} className="text-link leading-relaxed">
                {post.title}
              </a>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                {post.date}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
