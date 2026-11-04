import type { Metadata } from "next";
import { ArtefactList } from "@/components/artefact-list";
import { Container } from "@/components/container";
import { GalaxyTrail } from "@/components/planet-nav";
import { PlanetKicker } from "@/components/planet-kicker";
import { projectRows } from "@/lib/content/rows";
import { planets } from "@/lib/planets";

export const metadata: Metadata = {
  title: "Product projects",
  description: "Case studies and side builds from context through outcomes.",
};

export default function ProjectsPage() {
  const rows = projectRows();
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
      <div className="mt-12 border-t border-[var(--card-border)]">
        <ArtefactList rows={rows} />
      </div>
    </Container>
  );
}
