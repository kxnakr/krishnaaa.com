import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { splineSansMono } from "@/fonts";
import { cn } from "@/lib/utils";
import { Menu } from "./menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Kbd from "./kbd";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-8">
      <Link href="/">
        <span className={cn("font-bold text-lg", splineSansMono.className)}>
          krishna
        </span>
      </Link>

      <div className="flex justify-center items-center gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <ThemeToggle />
            </TooltipTrigger>
            <TooltipContent>
              <Kbd letter="J" />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Menu />
            </TooltipTrigger>
            <TooltipContent>
              <Kbd letter="K" />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </nav>
  );
};

export default Navbar;
