"use client";

import {
  HamburgerMenuIcon,
  ChatBubbleIcon,
  GitHubLogoIcon,
  DashboardIcon,
} from "@radix-ui/react-icons";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TbWriting } from "react-icons/tb";
import { LuHome, LuUser2 } from "react-icons/lu";
import { IoCodeSlash } from "react-icons/io5";
import {
  GITHUB_URL,
  LEETCODE_URL,
  LINKEDIN_URL,
  RESUME_URL,
  TWITTER_URL,
} from "@/constants";
import { DiGitBranch } from "react-icons/di";
import { FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { GrTwitter } from "react-icons/gr";
import { MdOutlineContactPage } from "react-icons/md";
import { RiSketching } from "react-icons/ri";

export function Menu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const redirectInternal = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  const redirectExternal = (path: string) => {
    window.open(path, "_blank");
    setOpen(false);
  };

  const iconsClassName = "mr-4 h-4 w-4";

  const internalLinks = [
    {
      icon: LuHome,
      title: "Home",
      path: "/",
    },
    {
      icon: LuUser2,
      title: "About",
      path: "/about",
    },
    {
      icon: DashboardIcon,
      title: "Projects",
      path: "/projects",
    },
    {
      icon: TbWriting,
      title: "Blogs",
      path: "/blogs",
    },
    {
      icon: RiSketching,
      title: "Gallery",
      path: "/gallery",
    },
    {
      icon: DiGitBranch,
      title: "Github Activity",
      path: "/github-activity",
    },
    {
      icon: ChatBubbleIcon,
      title: "Contact",
      path: "/contact",
    },

    {
      icon: IoCodeSlash,
      title: "Scripts",
      path: "/scripts",
    },
  ];

  const externalLinks = [
    {
      icon: GitHubLogoIcon,
      title: "Github",
      path: GITHUB_URL,
    },
    {
      icon: FaLinkedin,
      title: "LinkedIn",
      path: LINKEDIN_URL,
    },
    {
      icon: GrTwitter,
      title: "Twitter",
      path: TWITTER_URL,
    },
    {
      icon: SiLeetcode,
      title: "LeetCode",
      path: LEETCODE_URL,
    },
    {
      icon: MdOutlineContactPage,
      title: "Resume",
      path: RESUME_URL,
    },
  ];

  return (
    <>
      <div
        aria-label="Menu Toggle"
        className="p-2 cursor-pointer"
        onClick={() => setOpen((open) => !open)}
      >
        <HamburgerMenuIcon />
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Navigate to..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Internal">
            {internalLinks.map((link, index) => (
              <Link href={link.path} key={index}>
                <CommandItem
                  key={index}
                  onSelect={() => redirectInternal(link.path)}
                >
                  <link.icon className={iconsClassName} />
                  <span>{link.title}</span>
                </CommandItem>
              </Link>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="External">
            {externalLinks.map((link, index) => (
              <Link href={link.path} target="_blank" key={index}>
                <CommandItem onSelect={() => redirectExternal(link.path)}>
                  <link.icon className={iconsClassName} />
                  <span>{link.title}</span>
                </CommandItem>
              </Link>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
