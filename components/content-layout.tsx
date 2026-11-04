import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/container";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PlanetKicker } from "@/components/planet-kicker";
import type { Neighbor } from "@/lib/content/rows";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--star-yellow)]";

function PrevNextNav({ prev, next }: { prev?: Neighbor; next?: Neighbor }) {
  if (!prev && !next) return null;
  const cell = `group block rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] p-4 transition-colors hover:bg-[var(--card-hover)] ${focusRing}`;
  return (
    <nav
      aria-label="More in this section"
      className="mt-12 grid gap-4 border-t border-[var(--card-border)] pt-8 sm:grid-cols-2"
    >
      {prev ? (
        <Link href={prev.href} className={cell}>
          <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wide text-[var(--text-muted)]">
            ← Previous
          </span>
          <span className="mt-1 block font-[family-name:var(--font-outfit)] font-semibold text-[var(--text-primary)] group-hover:text-[var(--star-yellow)]">
            {prev.title}
          </span>
        </Link>
      ) : (
        <span className="hidden sm:block" aria-hidden="true" />
      )}
      {next ? (
        <Link href={next.href} className={`${cell} sm:text-right`}>
          <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wide text-[var(--text-muted)]">
            Next →
          </span>
          <span className="mt-1 block font-[family-name:var(--font-outfit)] font-semibold text-[var(--text-primary)] group-hover:text-[var(--star-yellow)]">
            {next.title}
          </span>
        </Link>
      ) : null}
    </nav>
  );
}

export function ContentLayout({
  breadcrumbs,
  planet,
  title,
  description,
  readingTime,
  children,
  backHref,
  backLabel,
  prevNext,
}: {
  breadcrumbs: { href: string; label: string }[];
  planet?: string;
  title: string;
  description?: string;
  readingTime: number;
  children: ReactNode;
  backHref: string;
  backLabel: string;
  prevNext?: { prev?: Neighbor; next?: Neighbor };
}) {
  return (
    <Container className="pb-20 pt-10">
      <Breadcrumbs items={breadcrumbs} />
      <header className="border-b border-[var(--card-border)] pb-8">
        {planet ? <PlanetKicker>{planet}</PlanetKicker> : null}
        <p
          className={`font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-[var(--text-muted)] ${planet ? "mt-2" : ""}`}
        >
          {readingTime} min read
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-outfit)] text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 text-lg text-[var(--text-muted)]">{description}</p>
        ) : null}
      </header>
      <article className="prose-portfolio pt-10">{children}</article>
      {prevNext ? <PrevNextNav {...prevNext} /> : null}
      <p
        className={`border-t border-[var(--card-border)] pt-8 ${prevNext?.prev || prevNext?.next ? "mt-8" : "mt-12"}`}
      >
        <Link
          href={backHref}
          className="font-[family-name:var(--font-mono)] text-sm text-[var(--crawl-blue)] hover:text-[var(--star-yellow)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--star-yellow)]"
        >
          ← {backLabel}
        </Link>
      </p>
    </Container>
  );
}
