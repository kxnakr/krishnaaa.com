"use client";

import Link from "next/link";
import CopySnippet from "./copy-snippet";
import DownloadSnippet from "./download-snippet";

interface SnippetCardProps {
  snippet: {
    title: string;
    description: string;
    code: string;
    language: string;
    filename: string;
    slug: string;
  };
  noButtons?: boolean;
}

export function SnippetCard({ snippet, noButtons = false }: SnippetCardProps) {
  return (
    <article className="space-y-2">
      <Link href={`/snippets/${snippet.slug}`}>
        <h2 className="text-lg font-medium hover:underline">{snippet.title}</h2>
      </Link>
      <p className="text-sm text-muted-foreground">{snippet.description}</p>
      {noButtons ? null : (
        <div className="flex gap-2">
          <CopySnippet code={snippet.code} />
          <DownloadSnippet code={snippet.code} filename={snippet.filename} />
        </div>
      )}
    </article>
  );
}
