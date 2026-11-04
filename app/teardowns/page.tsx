import type { Metadata } from "next";
import { ArtefactList } from "@/components/artefact-list";
import { Container } from "@/components/container";
import { GalaxyTrail } from "@/components/planet-nav";
import { PlanetKicker } from "@/components/planet-kicker";
import { teardownRows } from "@/lib/content/rows";
import { planets } from "@/lib/planets";

export const metadata: Metadata = {
  title: "Product teardowns",
  description: "Structured critiques of products — what works, what does not, and what I would try next.",
};

export default function TeardownsPage() {
  const rows = teardownRows();
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
      <div className="mt-12 border-t border-[var(--card-border)]">
        <ArtefactList rows={rows} />
      </div>
    </Container>
  );
}
