import { ArtefactList, ArtefactSection } from "@/components/artefact-list";
import { Container } from "@/components/container";
import { FeaturedSection } from "@/components/featured-section";
import { GalaxyBackdrop } from "@/components/galaxy-backdrop";
import { HeroDroid } from "@/components/hero-droid";
import { PlanetKicker } from "@/components/planet-kicker";
import { SectionJumpBar } from "@/components/section-jump-bar";
import { planets } from "@/lib/planets";
import { site } from "@/lib/site";
import { projectRows, teardownRows, writingRows } from "@/lib/content/rows";

export function HomeMain() {
  const sections = [
    { planet: planets.projects, label: "Shipyard", rows: projectRows() },
    { planet: planets.writings, label: "Archive", rows: writingRows() },
    { planet: planets.teardowns, label: "Teardown", rows: teardownRows() },
  ].filter((s) => s.rows.length > 0);

  return (
    <div className="relative overflow-clip pb-20 pt-12 sm:pt-16">
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
            <a
              href="#featured"
              className="mt-8 flex flex-col items-center gap-1 text-[var(--text-muted)] md:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--star-yellow)]"
              aria-label="Scroll to selected work"
            >
              <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider">
                Scroll
              </span>
              <span
                aria-hidden="true"
                className="motion-safe:animate-scroll-nudge text-2xl leading-none text-[var(--crawl-blue)]"
              >
                ↓
              </span>
            </a>
          </div>
        </div>

        <FeaturedSection />

        <div
          id="all-artefacts"
          className="mt-16 border-t border-[var(--card-border)] pt-12"
        >
          <PlanetKicker>Browse</PlanetKicker>
          <h2 className="mt-2 font-[family-name:var(--font-outfit)] text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
            All Artefacts
          </h2>
          <div className="mt-4">
            <SectionJumpBar
              sections={sections.map((s) => ({
                id: s.planet.homeAnchor,
                label: s.label,
                count: s.rows.length,
              }))}
            />
            <div className="mt-8 space-y-14">
              {sections.map((s) => (
                <ArtefactSection
                  key={s.planet.homeAnchor}
                  id={s.planet.homeAnchor}
                  planet={s.planet.name}
                  title={s.planet.title}
                  count={s.rows.length}
                  href={s.planet.href}
                >
                  <ArtefactList rows={s.rows} />
                </ArtefactSection>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
