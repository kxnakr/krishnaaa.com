"use client";

import { Menu as MenuIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { GITHUB_URL, LINKEDIN_URL, RESUME_URL, TWITTER_URL } from "@/constants";

const pages = [
  ["Home", "/"],
  ["Projects", "/projects"],
  ["Writing", "/blogs"],
  ["Snippets", "/snippets"],
  ["GitHub activity", "/github-activity"],
  ["Contact", "/contact"],
] as const;
const links = [
  ["GitHub", GITHUB_URL],
  ["LinkedIn", LINKEDIN_URL],
  ["X", TWITTER_URL],
  ["Resume", RESUME_URL],
] as const;

export function Menu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  return (
    <>
      <button
        id="menu-trigger"
        type="button"
        className="icon-button"
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        title="Open menu (⌘/Ctrl K)"
        onClick={() => setOpen(true)}
      >
        <MenuIcon className="size-4" aria-hidden="true" />
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          aria-label="Search pages and links"
          placeholder="Go to…"
        />
        <CommandList>
          <CommandEmpty>No matching pages.</CommandEmpty>
          <CommandGroup heading="Pages">
            {pages.map(([label, href]) => (
              <CommandItem
                key={href}
                onSelect={() => {
                  setOpen(false);
                  router.push(href);
                }}
              >
                {label}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Links">
            {links.map(([label, href]) => (
              <CommandItem
                key={href}
                onSelect={() => {
                  setOpen(false);
                  if (href.startsWith("http")) {
                    window.open(href, "_blank", "noopener,noreferrer");
                  } else {
                    window.location.assign(href);
                  }
                }}
              >
                {label}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
