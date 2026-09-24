import {
  listProjects,
  listTeardowns,
  listWritings,
} from "@/lib/content/load";

export type FeaturedKind = "project" | "writing" | "teardown";

export type FeaturedConfigEntry = {
  kind: FeaturedKind;
  slug: string;
  coverImage: string;
};

export type FeaturedItem = {
  kind: FeaturedKind;
  slug: string;
  title: string;
  description: string;
  hook?: string;
  coverImage: string;
  href: string;
};

export const featuredKindLabels: Record<FeaturedKind, string> = {
  project: "Project",
  writing: "Writing",
  teardown: "Teardown",
};

/** Ordered homepage featured picks — resolve titles/descriptions from content. */
export const featuredConfig: readonly FeaturedConfigEntry[] = [
  {
    kind: "project",
    slug: "spend-management",
    coverImage: "/images/featured/fintrack.png",
  },
  {
    kind: "teardown",
    slug: "dazn",
    coverImage: "/images/featured/dazn.jpg",
  },
  {
    kind: "writing",
    slug: "effective-widgets",
    coverImage: "/images/featured/widgets.png",
  },
] as const;

function hrefFor(kind: FeaturedKind, slug: string): string {
  switch (kind) {
    case "project":
      return `/projects/${slug}`;
    case "writing":
      return `/writings/${slug}`;
    case "teardown":
      return `/teardowns/${slug}`;
  }
}

export function resolveFeaturedItems(): FeaturedItem[] {
  const projects = new Map(
    listProjects().map((item) => [item.slug, item]),
  );
  const writings = new Map(
    listWritings().map((item) => [item.slug, item]),
  );
  const teardowns = new Map(
    listTeardowns().map((item) => [item.slug, item]),
  );

  const items: FeaturedItem[] = [];

  for (const entry of featuredConfig) {
    if (entry.kind === "project") {
      const found = projects.get(entry.slug);
      if (!found) continue;
      items.push({
        kind: "project",
        slug: entry.slug,
        title: found.meta.title,
        description: found.meta.description,
        coverImage: entry.coverImage,
        href: hrefFor("project", entry.slug),
      });
      continue;
    }

    if (entry.kind === "writing") {
      const found = writings.get(entry.slug);
      if (!found) continue;
      items.push({
        kind: "writing",
        slug: entry.slug,
        title: found.meta.title,
        description: found.meta.description,
        coverImage: entry.coverImage,
        href: hrefFor("writing", entry.slug),
      });
      continue;
    }

    const found = teardowns.get(entry.slug);
    if (!found) continue;
    items.push({
      kind: "teardown",
      slug: entry.slug,
      title: found.meta.title,
      description: found.meta.description,
      hook: found.meta.hook,
      coverImage: entry.coverImage,
      href: hrefFor("teardown", entry.slug),
    });
  }

  return items;
}
