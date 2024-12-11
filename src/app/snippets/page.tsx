import { getSnippets } from "@/lib/actions";
import { SnippetCard } from "@/app/snippets/snippet-card";
import { type Snippet } from "@/db/schema";

// export const dynamic = 'force-dynamic'

export default async function SnippetsPage() {
  const snippets = await getSnippets();

  return (
    <main className="space-y-8">
      <header className="font-bold">
        <span>snippets</span>
      </header>
      <section className="space-y-8">
        {snippets.map((snippet: Snippet) => (
          <SnippetCard key={snippet.id} snippet={snippet} />
        ))}
      </section>
    </main>
  );
}
