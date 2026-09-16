import Link from "next/link";
import type { ReactNode } from "react";
import { PlanetGlyph, type PlanetVariant } from "@/components/planet-glyph";
import { PlanetKicker } from "@/components/planet-kicker";

export function SectionCard({
  planet,
  title,
  oneLiner,
  href,
  badge,
  planetVariant,
  children,
}: {
  planet: string;
  title: string;
  oneLiner: string;
  href: string;
  badge?: string;
  planetVariant: PlanetVariant;
  children?: ReactNode;
}) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] p-6 shadow-none transition-[background-color,transform] duration-200 hover:-translate-y-[3px] hover:bg-[var(--card-hover)] active:bg-[var(--card-hover)]">
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full bg-[var(--crawl-blue)] opacity-[0.07] blur-2xl transition-opacity duration-300 group-hover:opacity-[0.12]"
        aria-hidden="true"
      />
      <PlanetGlyph
        variant={planetVariant}
        className="pointer-events-none absolute right-4 top-5 h-14 w-14 opacity-80 motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:rotate-[8deg] motion-safe:group-hover:scale-105"
      />
      <span
        className="pointer-events-none absolute left-0 right-0 top-0 h-0.5 origin-left scale-x-0 bg-[var(--star-yellow)] transition-transform duration-200 group-hover:scale-x-100"
        aria-hidden="true"
      />
      <Link
        href={href}
        className="relative block rounded pr-14 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--star-yellow)]"
      >
        <div className="flex flex-wrap items-center gap-2">
          <PlanetKicker>{planet}</PlanetKicker>
          {badge ? (
            <span className="rounded border border-[var(--card-border)] px-2 py-0.5 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wide text-[var(--star-yellow)]">
              {badge}
            </span>
          ) : null}
        </div>
        <h2 className="mt-2 font-[family-name:var(--font-outfit)] text-xl font-semibold text-[var(--text-primary)]">
          {title}
        </h2>
        <p className="mt-2 text-sm text-[var(--text-muted)]">{oneLiner}</p>
      </Link>
      {children ? (
        <div className="relative mt-4 border-t border-[var(--card-border)] pt-4 text-sm">
          {children}
        </div>
      ) : null}
    </div>
  );
}
