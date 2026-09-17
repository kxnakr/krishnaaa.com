import type { Metadata } from "next";
import { writing } from "@/content/site";

export const metadata: Metadata = {
  title: "Writing",
  alternates: { canonical: "/blogs" },
};

export default function BlogsPage() {
  return (
    <main id="main" className="page-enter space-y-8">
      <h1 className="text-xl font-semibold">writing</h1>
      <ul className="space-y-6">
        {writing.map((post) => (
          <li key={post.url}>
            <a href={post.url} className="text-link leading-relaxed">
              {post.title}
            </a>
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              {post.date}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
