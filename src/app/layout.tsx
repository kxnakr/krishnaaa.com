import type { Metadata } from "next";
import { PropsWithChildren } from "react";
import "@/styles/globals.css";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/constants";
import { spaceGrotesk } from "@/fonts";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "antialiased bg-light dark:bg-dark",
          spaceGrotesk.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster closeButton />
          <div className="relative max-w-xl py-2 px-4 flex min-h-screen flex-col gap-8 m-auto">
            <Navbar />
            <div className="flex-grow">{children}</div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
