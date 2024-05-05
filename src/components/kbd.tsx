import React from "react";

interface KbdProps {
  letter: string;
}

const Kbd = ({ letter }: KbdProps) => {
  return (
    <kbd className="pointer-events-none inline-flex h-5 select-none items-center justify-center gap-1 font-mono font-medium text-zinc-700 dark:text-zinc-300">
      <span className="text-base">⌘</span>
      <span className="text-sm">{letter}</span>
    </kbd>
  );
};

export default Kbd;
