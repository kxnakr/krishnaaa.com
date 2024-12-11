import { getSnippetBySlug } from "@/lib/actions";
import { SnippetCard } from "@/app/snippets/snippet-card";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import CopySnippet from "../copy-snippet";
import DownloadSnippet from "../download-snippet";

interface SnippetPageProps {
  params: { slug: string };
}

export default async function SnippetPage({ params }: SnippetPageProps) {
  const snippet = await getSnippetBySlug(params.slug);

  if (!snippet) {
    notFound();
  }

  return (
    <main className="space-y-8">
      <Link href="/snippets">
        <header className="font-bold text-sm flex items-center gap-1.5 hover:underline cursor-pointer">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>back</span>
        </header>
      </Link>
      <section className="space-y-8">
        <SnippetCard snippet={snippet} noButtons />
        <div className="rounded-md dark:bg-zinc-950 bg-zinc-100 border border-zinc-200 dark:border-zinc-800">
          <div className="rounded-t-md border-b border-zinc-200 dark:border-zinc-800 px-4 py-2 font-medium uppercase flex items-center justify-between">
            <span>{snippet.language}</span>
            <div className="flex gap-2">
              <CopySnippet iconOnly code={snippet.code} />
              <DownloadSnippet
                iconOnly
                code={snippet.code}
                filename={snippet.filename}
              />
            </div>
          </div>
          <pre className=" p-4 overflow-x-auto">
            <code>{snippet.code}</code>
          </pre>
        </div>
      </section>
    </main>
  );
}
