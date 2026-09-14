import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/container";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PlanetKicker } from "@/components/planet-kicker";

export function ContentLayout({
  breadcrumbs,
  planet,
  title,
  description,
  readingTime,
  children,
  backHref,
  backLabel,
}: {
  breadcrumbs: { href: string; label: string }[];
  planet?: string;
  title: string;
  description?: string;
  readingTime: number;
  children: ReactNode;
  backHref: string;
  backLabel: string;
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
      <p className="mt-12 border-t border-[var(--card-border)] pt-8">
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
