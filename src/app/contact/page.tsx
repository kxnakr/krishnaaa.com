import type { Metadata } from "next";
import { connection } from "next/server";
import { EMAIL_ADDRESS, GITHUB_URL, TWITTER_URL } from "@/constants";
import ContactForm from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  await connection();
  return (
    <main id="main" className="page-enter space-y-8">
      <h1 className="text-xl font-semibold">say hello</h1>
      <div className="space-y-4 leading-relaxed">
        <p>
          You can write to me at{" "}
          <a href={`mailto:${EMAIL_ADDRESS}`} className="text-link">
            {EMAIL_ADDRESS}
          </a>
          .
        </p>
        <p className="text-zinc-600 dark:text-zinc-400">
          I’m also on{" "}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            GitHub
          </a>{" "}
          and{" "}
          <a
            href={TWITTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            X
          </a>
          .
        </p>
      </div>
      {process.env.SENDGRID_API_KEY ? <ContactForm /> : null}
    </main>
  );
}
