import type { MetadataRoute } from "next";
import { SITE_URL } from "@/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/projects",
    "/blogs",
    "/contact",
    "/snippets",
    "/github-activity",
  ].map((path) => ({ url: `${SITE_URL}${path}` }));
}
