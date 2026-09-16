import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { GalaxyTrail } from "@/components/planet-nav";
import { PlanetKicker } from "@/components/planet-kicker";
import { listTeardowns } from "@/lib/content/load";
import { planets } from "@/lib/planets";

export const metadata: Metadata = {
  title: "Product teardowns",
  description: "Structured critiques of products — what works, what does not, and what I would try next.",
};

export default function TeardownsPage() {
  const items = listTeardowns();
  return (
    <Container className="pb-20 pt-10">
      <GalaxyTrail currentHref={planets.teardowns.href} />
      <PlanetKicker>{planets.teardowns.name}</PlanetKicker>
      <h1 className="mt-2 font-[family-name:var(--font-outfit)] text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
        Product teardowns
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-[var(--text-muted)]">
        Structured critiques of products — what works, what does not, and what I
        would try next.
      </p>
      <ul className="mt-12 grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        {items.map(({ slug, meta }) => (
          <li key={slug}>
            <Link
              href={`/teardowns/${slug}`}
              className="group block h-full rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] p-6 transition-transform hover:-translate-y-[3px] hover:bg-[var(--card-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--star-yellow)]"
            >
              <div className="flex gap-4">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded border border-[var(--card-border)] font-[family-name:var(--font-mono)] text-lg text-[var(--star-yellow)]"
                  aria-hidden="true"
                >
                  {meta.title.slice(0, 1)}
                </div>
                <div>
                  <h2 className="font-[family-name:var(--font-outfit)] text-xl font-semibold text-[var(--text-primary)] group-hover:text-[var(--star-yellow)]">
                    {meta.title}
                  </h2>
                  <p className="mt-2 text-sm text-[var(--text-muted)]">{meta.hook}</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
