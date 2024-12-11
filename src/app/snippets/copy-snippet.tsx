"use client";

import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface CopySnippetProps {
  code: string;
  iconOnly?: boolean;
}

const CopySnippet = ({ code, iconOnly = false }: CopySnippetProps) => {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    toast.success("Copied to clipboard!"); // Show success toast
  };

  return (
    <Button variant="outline" size="sm" onClick={handleCopy} className="h-8">
      <Copy
        className={cn("h-4 w-4 sm:mr-2", iconOnly ? "sm:mr-0" : "sm:mr-2")}
      />
      {iconOnly ? null : <span className="hidden sm:inline">Copy</span>}
    </Button>
  );
};

export default CopySnippet;
