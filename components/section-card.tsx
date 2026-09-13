import Link from "next/link";
import type { ReactNode } from "react";

export function SectionCard({
  sectionNumber,
  title,
  oneLiner,
  href,
  badge,
  children,
}: {
  sectionNumber: string;
  title: string;
  oneLiner: string;
  href: string;
  badge?: string;
  children?: ReactNode;
}) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] p-6 shadow-none transition-transform duration-200 hover:-translate-y-[3px] hover:bg-[var(--card-hover)]">
      <span
        className="absolute left-0 right-0 top-0 h-0.5 origin-left scale-x-0 bg-[var(--star-yellow)] transition-transform duration-200 group-hover:scale-x-100"
        aria-hidden="true"
      />
      <Link
        href={href}
        className="block rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--star-yellow)]"
      >
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-[family-name:var(--font-mono)] text-xs font-medium uppercase tracking-wider text-[var(--crawl-blue)]">
            Section {sectionNumber}
          </p>
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
      {children ? <div className="mt-4 space-y-2 text-sm">{children}</div> : null}
    </div>
  );
}
