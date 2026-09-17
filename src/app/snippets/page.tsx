import type { Metadata } from "next";
import { connection } from "next/server";
import { getSnippets } from "@/lib/actions";
import { SnippetCard } from "./snippet-card";

export const metadata: Metadata = {
  title: "Snippets",
  alternates: { canonical: "/snippets" },
};

export default async function SnippetsPage() {
  await connection();
  const snippets = await getSnippets();
  return (
    <main id="main" className="page-enter space-y-8">
      <h1 className="text-xl font-semibold">snippets</h1>
      {snippets?.length ? (
        <div className="space-y-8">
          {snippets.map((snippet) => (
            <SnippetCard key={snippet.id} snippet={snippet} />
          ))}
        </div>
      ) : (
        <p className="text-zinc-600 dark:text-zinc-400">
          {snippets
            ? "I haven’t added any snippets yet."
            : "I couldn’t load the snippets. Please try again later."}
        </p>
      )}
    </main>
  );
}
