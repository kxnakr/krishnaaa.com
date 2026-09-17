import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="space-y-4 py-12">
      <h1 className="text-xl font-semibold">page not found</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        I don’t have a page at this address.
      </p>
      <Link href="/" className="text-link inline-block">
        Back home
      </Link>
    </main>
  );
}
