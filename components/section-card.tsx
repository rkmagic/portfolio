import Link from "next/link";
import type { ReactNode } from "react";

export function SectionCard({
  sectionNumber,
  title,
  oneLiner,
  href,
  children,
}: {
  sectionNumber: string;
  title: string;
  oneLiner: string;
  href: string;
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
        <p className="font-[family-name:var(--font-mono)] text-xs font-medium uppercase tracking-wider text-[var(--crawl-blue)]">
          Section {sectionNumber}
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-outfit)] text-xl font-semibold text-[var(--text-primary)]">
          {title}
        </h2>
        <p className="mt-2 text-sm text-[var(--text-muted)]">{oneLiner}</p>
      </Link>
      {children ? <div className="mt-4 space-y-2 text-sm">{children}</div> : null}
    </div>
  );
}
