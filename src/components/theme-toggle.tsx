"use client";

import { useTheme } from "next-themes";
import { HiMiniMoon } from "react-icons/hi2";
import { HiSun } from "react-icons/hi";
import { useEffect } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setTheme(theme === "dark" ? "light" : "dark");
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [theme, setTheme]);

  return (
    <div>
      <div
        aria-label="Toggle Dark Mode"
        className="p-2 cursor-pointer"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? <HiSun size={18} /> : <HiMiniMoon size={18} />}
      </div>
    </div>
  );
}
