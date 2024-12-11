"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DownloadSnippetProps {
  code: string;
  filename: string;
  iconOnly?: boolean;
}

const DownloadSnippet = ({
  code,
  filename,
  iconOnly = false,
}: DownloadSnippetProps) => {
  const handleDownload = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleDownload}
      className="h-8"
    >
      <Download className={cn("h-4 w-4", iconOnly ? "sm:mr-0" : "sm:mr-2")} />
      {iconOnly ? null : <span className="hidden sm:inline">Download</span>}
    </Button>
  );
};

export default DownloadSnippet;
