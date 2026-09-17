"use client";

import Link from "next/link";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main id="main" className="space-y-4 py-12">
      <h1 className="text-xl font-semibold">I couldn’t load this page.</h1>
      <div className="flex gap-6">
        <button type="button" onClick={reset} className="text-link">
          Try again
        </button>
        <Link href="/" className="text-link">
          Back home
        </Link>
      </div>
    </main>
  );
}
