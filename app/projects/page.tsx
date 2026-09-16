import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { GalaxyTrail } from "@/components/planet-nav";
import { PlanetKicker } from "@/components/planet-kicker";
import { listProjects } from "@/lib/content/load";
import { planets } from "@/lib/planets";

export const metadata: Metadata = {
  title: "Product projects",
  description: "Case studies and side builds from context through outcomes.",
};

export default function ProjectsPage() {
  const items = listProjects();
  return (
    <Container className="pb-20 pt-10">
      <GalaxyTrail currentHref={planets.projects.href} />
      <PlanetKicker>{planets.projects.name}</PlanetKicker>
      <h1 className="mt-2 font-[family-name:var(--font-outfit)] text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
        Product projects
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-[var(--text-muted)]">
        Case studies and personal builds — context, trade-offs, and outcomes.
      </p>
      <ul className="mt-12 grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {items.map(({ slug, meta }) => (
          <li key={slug}>
            <Link
              href={`/projects/${slug}`}
              className="group block h-full rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] p-6 transition-transform hover:-translate-y-[3px] hover:bg-[var(--card-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--star-yellow)]"
            >
              <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-[var(--crawl-blue)]">
                {meta.company}
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-outfit)] text-xl font-semibold text-[var(--text-primary)]">
                {meta.title}
              </h2>
              <p className="mt-3 text-sm text-[var(--text-muted)]">{meta.outcome}</p>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
