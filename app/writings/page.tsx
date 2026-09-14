import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { PlanetKicker } from "@/components/planet-kicker";
import { listArticles, listDecks } from "@/lib/content/load";
import { planets } from "@/lib/planets";

export const metadata: Metadata = {
  title: "Writings",
  description: "Articles with product learnings, plus PDF decks from workshops and MBA work.",
};

function formatDate(date: string) {
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

export default function WritingsPage() {
  const articles = listArticles();
  const decks = listDecks();

  return (
    <Container className="pb-20 pt-10">
      <PlanetKicker>{planets.writings.name}</PlanetKicker>
      <h1 className="mt-2 font-[family-name:var(--font-outfit)] text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
        Writings
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-[var(--text-muted)]">
        Product learnings as articles, plus slide decks from workshops and MBA
        work. Skim the groups below — keep it simple.
      </p>

      <section className="mt-14" aria-labelledby="writings-articles">
        <h2
          id="writings-articles"
          className="font-[family-name:var(--font-mono)] text-sm uppercase tracking-wider text-[var(--crawl-blue)]"
        >
          Articles
        </h2>
        <ul className="mt-6 grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {articles.map(({ slug, meta }) => (
            <li key={slug}>
              <Link
                href={`/writings/${slug}`}
                className="group block h-full rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] p-6 transition-transform hover:-translate-y-[3px] hover:bg-[var(--card-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--star-yellow)]"
              >
                <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--text-muted)]">
                  {formatDate(meta.date)}
                </p>
                <h3 className="mt-2 font-[family-name:var(--font-outfit)] text-xl font-semibold text-[var(--text-primary)] group-hover:text-[var(--star-yellow)]">
                  {meta.title}
                </h3>
                <p className="mt-3 text-sm text-[var(--text-muted)]">
                  {meta.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16" aria-labelledby="writings-decks">
        <h2
          id="writings-decks"
          className="font-[family-name:var(--font-mono)] text-sm uppercase tracking-wider text-[var(--crawl-blue)]"
        >
          Decks
        </h2>
        <ul className="mt-6 grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {decks.map(({ slug, meta }) => (
            <li key={slug}>
              <Link
                href={`/writings/${slug}`}
                className="group block h-full rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] p-6 transition-transform hover:-translate-y-[3px] hover:bg-[var(--card-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--star-yellow)]"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--text-muted)]">
                    {formatDate(meta.date)}
                  </p>
                  <span className="rounded border border-[var(--card-border)] px-2 py-0.5 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wide text-[var(--star-yellow)]">
                    PDF
                  </span>
                </div>
                <h3 className="mt-2 font-[family-name:var(--font-outfit)] text-xl font-semibold text-[var(--text-primary)] group-hover:text-[var(--star-yellow)]">
                  {meta.title}
                </h3>
                <p className="mt-3 text-sm text-[var(--text-muted)]">
                  {meta.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}
