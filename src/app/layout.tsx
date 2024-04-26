import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { PropsWithChildren } from "react";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/constants";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased `}>{children}</body>
    </html>
  );
}
