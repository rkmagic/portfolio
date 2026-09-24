import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unstable_noStore as noStore } from "next/cache";
import { compileMDX } from "next-mdx-remote/rsc";
import type { ProjectMeta, TeardownMeta, WritingMeta } from "./types";
import { mdxComponents } from "@/components/mdx-components";

const contentRoot = path.join(process.cwd(), "content");

/** Same-origin PDF paths under public/pdfs only (no query/hash/traversal). */
const SAFE_PDF_URL = /^\/pdfs\/[A-Za-z0-9._\- ]+\.pdf$/;

function sanitizePdfUrl(url: unknown): string | undefined {
  if (url == null || url === "") return undefined;
  if (typeof url !== "string" || !SAFE_PDF_URL.test(url)) {
    throw new Error(
      `Invalid pdfUrl (expected /pdfs/<filename>.pdf): ${String(url)}`,
    );
  }
  return url;
}

function withSafePdfUrl<T extends { pdfUrl?: string }>(meta: T): T {
  return { ...meta, pdfUrl: sanitizePdfUrl(meta.pdfUrl) };
}

/** In dev, skip the Full Route Cache so MDX edits show up without a restart. */
function bypassCacheInDev() {
  if (process.env.NODE_ENV === "development") {
    noStore();
  }
}

function readDir(kind: "teardowns" | "projects" | "writings") {
  const dir = path.join(contentRoot, kind);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getTeardownSlugs() {
  return readDir("teardowns");
}

export function getProjectSlugs() {
  return readDir("projects").filter((slug) => {
    const raw = fs.readFileSync(
      path.join(contentRoot, "projects", `${slug}.mdx`),
      "utf8",
    );
    const { data } = matter(raw);
    return !(data as ProjectMeta).draft;
  });
}

export function getWritingSlugs() {
  return readDir("writings");
}

function byDateDesc<T extends { date: string }>(a: T, b: T) {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

export function listTeardowns() {
  bypassCacheInDev();
  const slugs = getTeardownSlugs();
  const items = slugs.map((slug) => {
    const raw = fs.readFileSync(
      path.join(contentRoot, "teardowns", `${slug}.mdx`),
      "utf8",
    );
    const { data } = matter(raw);
    return { slug, meta: data as TeardownMeta };
  });
  items.sort((a, b) => byDateDesc(a.meta, b.meta));
  return items;
}

export function listProjects() {
  bypassCacheInDev();
  const slugs = getProjectSlugs();
  const items = slugs.map((slug) => {
    const raw = fs.readFileSync(
      path.join(contentRoot, "projects", `${slug}.mdx`),
      "utf8",
    );
    const { data } = matter(raw);
    return { slug, meta: withSafePdfUrl(data as ProjectMeta) };
  });
  items.sort((a, b) => byDateDesc(a.meta, b.meta));
  return items;
}

export function listWritings() {
  bypassCacheInDev();
  const slugs = getWritingSlugs();
  const items = slugs.map((slug) => {
    const raw = fs.readFileSync(
      path.join(contentRoot, "writings", `${slug}.mdx`),
      "utf8",
    );
    const { data } = matter(raw);
    return { slug, meta: withSafePdfUrl(data as WritingMeta) };
  });
  items.sort((a, b) => byDateDesc(a.meta, b.meta));
  return items;
}

export function listArticles() {
  return listWritings().filter((w) => w.meta.kind === "article");
}

export function listDecks() {
  return listWritings().filter((w) => w.meta.kind === "deck");
}

export function readingTimeFromMdx(body: string) {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return minutes;
}

async function compileBody(content: string) {
  const { content: mdx } = await compileMDX({
    source: content,
    components: mdxComponents,
    options: {
      parseFrontmatter: false,
    },
  });
  return mdx;
}

export async function getTeardown(slug: string) {
  bypassCacheInDev();
  const filePath = path.join(contentRoot, "teardowns", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    throw new Error("Not found");
  }
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const meta = data as TeardownMeta;
  return {
    meta,
    content: await compileBody(content),
    readingTime: readingTimeFromMdx(content),
  };
}

export async function getProject(slug: string) {
  bypassCacheInDev();
  const filePath = path.join(contentRoot, "projects", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    throw new Error("Not found");
  }
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const meta = withSafePdfUrl(data as ProjectMeta);
  if (meta.draft) {
    throw new Error("Not found");
  }
  return {
    meta,
    content: await compileBody(content),
    readingTime: readingTimeFromMdx(content),
  };
}

export async function getWriting(slug: string) {
  bypassCacheInDev();
  const filePath = path.join(contentRoot, "writings", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    throw new Error("Not found");
  }
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const meta = withSafePdfUrl(data as WritingMeta);
  return {
    meta,
    content: await compileBody(content),
    readingTime: readingTimeFromMdx(content),
  };
}
