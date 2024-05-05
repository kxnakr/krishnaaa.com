"use client";

import { useTheme } from "next-themes";
import { HiMiniMoon } from "react-icons/hi2";
import { HiSun } from "react-icons/hi";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <button
        aria-label="Toggle Dark Mode"
        className="p-2 rounded-md"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? <HiSun size={21} /> : <HiMiniMoon size={21} />}
      </button>
    </div>
  );
}
