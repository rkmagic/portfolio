import Link from "next/link";
import type { ReactNode } from "react";
import { PlanetKicker } from "@/components/planet-kicker";
import type { ArtefactRowData } from "@/lib/content/rows";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--star-yellow)]";

export function ArtefactSection({
  id,
  planet,
  title,
  count,
  href,
  children,
}: {
  id: string;
  planet: string;
  title: string;
  count: number;
  href?: string;
  children: ReactNode;
}) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} className="scroll-mt-32" aria-labelledby={headingId}>
      <div className="flex items-end justify-between gap-4 border-b border-[var(--card-border)] pb-3">
        <div>
          <PlanetKicker>{planet}</PlanetKicker>
          <h2
            id={headingId}
            className="mt-1 font-[family-name:var(--font-outfit)] text-xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-2xl"
          >
            {title}
            <span className="ml-2 font-[family-name:var(--font-mono)] text-sm font-normal text-[var(--text-muted)]">
              {count}
            </span>
          </h2>
        </div>
        {href ? (
          <Link
            href={href}
            className={`shrink-0 rounded font-[family-name:var(--font-mono)] text-xs uppercase tracking-wide text-[var(--text-muted)] hover:text-[var(--star-yellow)] ${focusRing}`}
          >
            Open planet →
          </Link>
        ) : null}
      </div>
      {children}
    </section>
  );
}

export function ArtefactList({ rows }: { rows: ArtefactRowData[] }) {
  return (
    <ul className="list-none divide-y divide-[var(--card-border)] p-0">
      {rows.map((row) => (
        <li key={row.slug}>
          <ArtefactRow {...row} />
        </li>
      ))}
    </ul>
  );
}

export function ArtefactRow({
  href,
  title,
  summary,
  meta,
  badge,
}: Omit<ArtefactRowData, "slug">) {
  return (
    <Link
      href={href}
      className={`group relative flex flex-col gap-1 rounded py-4 pl-4 pr-2 transition-colors hover:bg-[var(--card-hover)] sm:flex-row sm:items-baseline sm:gap-6 ${focusRing}`}
    >
      <span
        className="pointer-events-none absolute bottom-3 left-0 top-3 w-0.5 origin-center scale-y-0 bg-[var(--star-yellow)] motion-safe:transition-transform motion-safe:duration-200 group-hover:scale-y-100 group-focus-visible:scale-y-100"
        aria-hidden="true"
      />
      <span className="order-1 flex items-center gap-2 font-[family-name:var(--font-mono)] text-xs text-[var(--text-muted)] sm:order-2 sm:ml-auto sm:shrink-0">
        {meta}
        {badge ? (
          <span className="rounded border border-[var(--card-border)] px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-[var(--star-yellow)]">
            {badge}
          </span>
        ) : null}
      </span>
      <span className="order-2 min-w-0 sm:order-1 sm:flex-1">
        <span className="flex items-center gap-2 font-[family-name:var(--font-outfit)] text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--star-yellow)] group-focus-visible:text-[var(--star-yellow)]">
          {title}
          <span
            aria-hidden="true"
            className="-translate-x-1 opacity-0 motion-safe:transition-[opacity,transform] motion-safe:duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
          >
            →
          </span>
        </span>
        <span className="mt-1 line-clamp-2 block text-sm text-[var(--text-muted)] sm:line-clamp-1">
          {summary}
        </span>
      </span>
    </Link>
  );
}
