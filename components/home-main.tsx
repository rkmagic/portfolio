import Link from "next/link";
import { Container } from "@/components/container";
import { GalaxyBackdrop } from "@/components/galaxy-backdrop";
import { HeroDroid } from "@/components/hero-droid";
import { PlanetKicker } from "@/components/planet-kicker";
import { SectionCard } from "@/components/section-card";
import { planets } from "@/lib/planets";
import { site } from "@/lib/site";
import { listProjects, listTeardowns, listWritings } from "@/lib/content/load";

export function HomeMain() {
  const teardowns = listTeardowns();
  const projects = listProjects();
  const writings = listWritings();

  return (
    <div className="relative overflow-hidden pb-20 pt-12 sm:pt-16">
      <GalaxyBackdrop />
      <Container className="relative">
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-between md:gap-8">
          <HeroDroid className="order-1 h-[72px] w-auto shrink-0 md:order-2 md:h-[140px]" />
          <div className="order-2 min-w-0 w-full md:order-1 md:flex-1">
            <PlanetKicker className="text-sm">{planets.home.name}</PlanetKicker>
            <p className="mt-2 font-[family-name:var(--font-mono)] text-sm text-[var(--text-muted)]">
              {site.tagline}
            </p>
            <h1 className="mt-4 font-[family-name:var(--font-outfit)] text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
              {site.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--text-primary)]">
              {site.description}
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-1 lg:grid-cols-3">
          <SectionCard
            planet={planets.teardowns.name}
            title={planets.teardowns.title}
            oneLiner="Structured critiques of real products — what works, what breaks, and what I would try next."
            href={planets.teardowns.href}
            badge="Work in progress"
            planetVariant="teardown"
          >
            <ul className="list-none space-y-1 text-[var(--text-muted)]">
              {teardowns.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/teardowns/${t.slug}`}
                    className="text-[var(--crawl-blue)] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--star-yellow)]"
                  >
                    {t.meta.title}
                  </Link>
                </li>
              ))}
            </ul>
          </SectionCard>

          <SectionCard
            planet={planets.projects.name}
            title={planets.projects.title}
            oneLiner="Case studies and side builds — context, trade-offs, and outcomes."
            href={planets.projects.href}
            badge="Work in progress"
            planetVariant="projects"
          >
            <ul className="list-none space-y-1 text-[var(--text-muted)]">
              {projects.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="text-[var(--crawl-blue)] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--star-yellow)]"
                  >
                    {p.meta.title}
                  </Link>
                </li>
              ))}
            </ul>
          </SectionCard>

          <SectionCard
            planet={planets.writings.name}
            title={planets.writings.title}
            oneLiner="Articles with product learnings, plus PDF decks from workshops and MBA work."
            href={planets.writings.href}
            planetVariant="writings"
          >
            <ul className="list-none space-y-1 text-[var(--text-muted)]">
              {writings.slice(0, 5).map((w) => (
                <li key={w.slug}>
                  <Link
                    href={`/writings/${w.slug}`}
                    className="text-[var(--crawl-blue)] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--star-yellow)]"
                  >
                    {w.meta.title}
                  </Link>
                </li>
              ))}
            </ul>
          </SectionCard>
        </div>
      </Container>
    </div>
  );
}
