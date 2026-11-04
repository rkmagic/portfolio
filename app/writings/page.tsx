import type { Metadata } from "next";
import { ArtefactList } from "@/components/artefact-list";
import { Container } from "@/components/container";
import { GalaxyTrail } from "@/components/planet-nav";
import { PlanetKicker } from "@/components/planet-kicker";
import { articleRows, deckRows } from "@/lib/content/rows";
import { planets } from "@/lib/planets";

export const metadata: Metadata = {
  title: "Writings",
  description: "Articles with product learnings, plus PDF decks from workshops and MBA work.",
};

export default function WritingsPage() {
  const groups = [
    { id: "writings-articles", label: "Articles", rows: articleRows() },
    { id: "writings-decks", label: "Decks", rows: deckRows() },
  ];

  return (
    <Container className="pb-20 pt-10">
      <GalaxyTrail currentHref={planets.writings.href} />
      <PlanetKicker>{planets.writings.name}</PlanetKicker>
      <h1 className="mt-2 font-[family-name:var(--font-outfit)] text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
        Writings
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-[var(--text-muted)]">
        Product learnings as articles, plus slide decks from workshops and MBA
        work. Skim the groups below — keep it simple.
      </p>

      {groups.map((group) => (
        <section key={group.id} className="mt-14" aria-labelledby={group.id}>
          <h2
            id={group.id}
            className="border-b border-[var(--card-border)] pb-3 font-[family-name:var(--font-mono)] text-sm uppercase tracking-wider text-[var(--crawl-blue)]"
          >
            {group.label}
          </h2>
          <ArtefactList rows={group.rows} />
        </section>
      ))}
    </Container>
  );
}
