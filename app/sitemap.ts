import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import {
  getProjectSlugs,
  getTeardownSlugs,
  getWritingSlugs,
} from "@/lib/content/load";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/teardowns",
    "/projects",
    "/writings",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  const teardowns = getTeardownSlugs().map((slug) => ({
    url: `${base}/teardowns/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const projects = getProjectSlugs().map((slug) => ({
    url: `${base}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const writings = getWritingSlugs().map((slug) => ({
    url: `${base}/writings/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...teardowns, ...projects, ...writings];
}
