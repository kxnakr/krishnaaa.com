"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { UNIVERSAL_USERNAME } from "@/constants";

// The library fetches in the browser and does not support server rendering.
const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((module) => module.GitHubCalendar),
  {
    ssr: false,
    loading: () => <p className="text-sm text-zinc-500">Loading calendar…</p>,
  },
);

export default function MyGithubCalendar() {
  const { resolvedTheme } = useTheme();
  return (
    <section
      className="max-w-full overflow-x-auto"
      // biome-ignore lint/a11y/noNoninteractiveTabindex: Keyboard users need to scroll the contribution calendar.
      tabIndex={0}
      aria-label="GitHub contribution calendar"
    >
      <GitHubCalendar
        username={UNIVERSAL_USERNAME}
        blockMargin={2}
        blockRadius={2.5}
        blockSize={8}
        colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
        fontSize={12}
        errorMessage="I couldn’t load the calendar. You can view my activity on GitHub."
      />
    </section>
  );
}
