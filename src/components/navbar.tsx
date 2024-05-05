import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { splineSansMono } from "@/fonts";
import { cn } from "@/lib/utils";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-8">
      <Link href="/">
        <span className={cn("font-bold text-lg", splineSansMono.className)}>
          krishna
        </span>
      </Link>

      <ThemeToggle />
    </nav>
  );
};

export default Navbar;
