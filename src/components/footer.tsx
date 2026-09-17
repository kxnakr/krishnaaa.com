import Link from "next/link";
import { EMAIL_ADDRESS } from "@/constants";

export default function Footer() {
  return (
    <footer className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 py-6 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
      <span>© {new Date().getFullYear()} Krishna Kumar</span>
      <div className="flex gap-4">
        <Link href="/contact" className="quiet-link">
          say hello
        </Link>
        <a href={`mailto:${EMAIL_ADDRESS}`} className="quiet-link">
          {EMAIL_ADDRESS}
        </a>
      </div>
    </footer>
  );
}
