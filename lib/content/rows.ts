import {
  listArticles,
  listDecks,
  listProjects,
  listTeardowns,
  listWritings,
} from "@/lib/content/load";
import type { ProjectMeta, TeardownMeta, WritingMeta } from "./types";

export type ArtefactRowData = {
  slug: string;
  href: string;
  title: string;
  summary: string;
  meta: string;
  badge?: string;
};

export function formatDate(date: string) {
  try {
    return new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(date));
  } catch {
    return date;
  }
}

type Item<T> = { slug: string; meta: T };

function projectRow({ slug, meta }: Item<ProjectMeta>): ArtefactRowData {
  return {
    slug,
    href: `/projects/${slug}`,
    title: meta.title,
    summary: meta.outcome,
    meta: meta.company,
  };
}

function writingRow({ slug, meta }: Item<WritingMeta>): ArtefactRowData {
  return {
    slug,
    href: `/writings/${slug}`,
    title: meta.title,
    summary: meta.description,
    meta: formatDate(meta.date),
    badge: meta.kind === "deck" ? "PDF" : undefined,
  };
}

function teardownRow({ slug, meta }: Item<TeardownMeta>): ArtefactRowData {
  return {
    slug,
    href: `/teardowns/${slug}`,
    title: meta.title,
    summary: meta.hook,
    meta: formatDate(meta.date),
  };
}

export function projectRows() {
  return listProjects().map(projectRow);
}

export function writingRows() {
  return listWritings().map(writingRow);
}

export function articleRows() {
  return listArticles().map(writingRow);
}

export function deckRows() {
  return listDecks().map(writingRow);
}

export function teardownRows() {
  return listTeardowns().map(teardownRow);
}

export type Neighbor = { href: string; title: string };

export function getNeighbors(
  rows: ArtefactRowData[],
  slug: string,
): { prev?: Neighbor; next?: Neighbor } {
  const index = rows.findIndex((row) => row.slug === slug);
  if (index === -1) return {};
  const toNeighbor = (row?: ArtefactRowData) =>
    row ? { href: row.href, title: row.title } : undefined;
  return {
    prev: toNeighbor(rows[index - 1]),
    next: toNeighbor(rows[index + 1]),
  };
}
