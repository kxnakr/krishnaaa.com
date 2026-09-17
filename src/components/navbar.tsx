import Link from "next/link";
import { Menu } from "@/components/menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { RESUME_URL } from "@/constants";
import { splineSansMono } from "@/fonts";

export default function Navbar() {
  return (
    <nav
      aria-label="Main navigation"
      className="flex items-center justify-between py-8"
    >
      <Link
        href="/"
        className={`${splineSansMono.className} text-lg font-bold`}
      >
        krishna
      </Link>
      <div className="flex items-center gap-3 sm:gap-4">
        <Link href="/projects" className="quiet-link text-sm">
          projects
        </Link>
        <a href={RESUME_URL} className="quiet-link text-sm">
          resume
        </a>
        <ThemeToggle />
        <Menu />
      </div>
    </nav>
  );
}
