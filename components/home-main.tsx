import Link from "next/link";
import { Container } from "@/components/container";
import { FeaturedSection } from "@/components/featured-section";
import { GalaxyBackdrop } from "@/components/galaxy-backdrop";
import { HeroDroid } from "@/components/hero-droid";
import { PlanetKicker } from "@/components/planet-kicker";
import { SectionCard } from "@/components/section-card";
import { planets } from "@/lib/planets";
import { site } from "@/lib/site";
import { listProjects, listTeardowns, listWritings } from "@/lib/content/load";

const FEATURED_WRITING_SLUGS = [
  "effective-client-relations",
  "android-notifications",
  "ai-workshops",
] as const;

const FEATURED_TEARDOWN_SLUGS = ["dazn", "blackboard"] as const;

function splitFeaturedByCount<T>(items: T[], count: number) {
  return {
    featured: items.slice(0, count),
    rest: items.slice(count),
  };
}

function splitFeaturedBySlugs<T extends { slug: string }>(
  items: T[],
  featuredSlugs: readonly string[],
) {
  const bySlug = new Map(items.map((item) => [item.slug, item]));
  const featured = featuredSlugs
    .map((slug) => bySlug.get(slug))
    .filter((item): item is T => Boolean(item));
  const featuredSet = new Set(featured.map((item) => item.slug));
  const rest = items.filter((item) => !featuredSet.has(item.slug));
  return { featured, rest };
}

function PlanetLinkList({
  featured,
  rest,
  hrefOf,
}: {
  featured: { slug: string; meta: { title: string } }[];
  rest: { slug: string; meta: { title: string } }[];
  hrefOf: (slug: string) => string;
}) {
  return (
    <div className="space-y-3">
      <ul className="list-none space-y-1 text-[var(--text-muted)]">
        {featured.map((item) => (
          <li key={item.slug}>
            <Link
              href={hrefOf(item.slug)}
              className="text-[var(--crawl-blue)] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--star-yellow)]"
            >
              {item.meta.title}
            </Link>
          </li>
        ))}
      </ul>
      {rest.length > 0 ? (
        <details className="group">
          <summary className="cursor-pointer list-none font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-wide text-[var(--text-muted)] marker:content-none [&::-webkit-details-marker]:hidden hover:text-[var(--star-yellow)]">
            <span className="inline-flex items-center gap-1.5">
              Also in orbit
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-open:rotate-90"
              >
                ›
              </span>
            </span>
          </summary>
          <ul className="mt-2 list-none space-y-1 text-[var(--text-muted)]">
            {rest.map((item) => (
              <li key={item.slug}>
                <Link
                  href={hrefOf(item.slug)}
                  className="text-[var(--crawl-blue)] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--star-yellow)]"
                >
                  {item.meta.title}
                </Link>
              </li>
            ))}
          </ul>
        </details>
      ) : null}
    </div>
  );
}

export function HomeMain() {
  const teardowns = listTeardowns();
  const projects = listProjects();
  const writings = listWritings();

  const shipyard = splitFeaturedByCount(projects, 3);
  const archive = splitFeaturedBySlugs(writings, FEATURED_WRITING_SLUGS);
  const teardown = splitFeaturedBySlugs(teardowns, FEATURED_TEARDOWN_SLUGS);

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

        <section
          id="all-artefacts"
          className="mt-16 border-t border-[var(--card-border)] pt-12"
          aria-labelledby="all-artefacts-heading"
        >
          <PlanetKicker>Browse</PlanetKicker>
          <h2
            id="all-artefacts-heading"
            className="mt-2 font-[family-name:var(--font-outfit)] text-2xl font-semibold tracking-tight text-[var(--text-primary)]"
          >
            All Artefacts
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-1 lg:grid-cols-3">
            <SectionCard
              planet={planets.projects.name}
              title={planets.projects.title}
              oneLiner="Case studies and side builds — context, trade-offs, and outcomes."
              href={planets.projects.href}
              planetVariant="projects"
            >
              <PlanetLinkList
                featured={shipyard.featured}
                rest={shipyard.rest}
                hrefOf={(slug) => `/projects/${slug}`}
              />
            </SectionCard>

            <SectionCard
              planet={planets.writings.name}
              title={planets.writings.title}
              oneLiner="Articles with product learnings, plus PDF decks from workshops and MBA work."
              href={planets.writings.href}
              planetVariant="writings"
            >
              <PlanetLinkList
                featured={archive.featured}
                rest={archive.rest}
                hrefOf={(slug) => `/writings/${slug}`}
              />
            </SectionCard>

            <SectionCard
              planet={planets.teardowns.name}
              title={planets.teardowns.title}
              oneLiner="Structured critiques of real products — what works, what breaks, and what I would try next."
              href={planets.teardowns.href}
              planetVariant="teardown"
            >
              <PlanetLinkList
                featured={teardown.featured}
                rest={teardown.rest}
                hrefOf={(slug) => `/teardowns/${slug}`}
              />
            </SectionCard>
          </div>
        </section>
      </Container>
    </div>
  );
}
