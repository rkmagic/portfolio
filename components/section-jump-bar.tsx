"use client";

import { useEffect, useState } from "react";

export type JumpSection = { id: string; label: string; count: number };

export function SectionJumpBar({ sections }: { sections: JumpSection[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (elements.length === 0) return;

    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry.isIntersecting);
        }
        const first = sections.find((s) => visible.get(s.id));
        setActive(first ? first.id : null);
      },
      // Band just below the sticky header + jump bar.
      { rootMargin: "-130px 0px -55% 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav
      aria-label="Jump to section"
      className="sticky top-[69px] z-40 -mx-4 border-b border-[var(--card-border)] bg-black/70 px-4 py-2 backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
    >
      <ul className="flex list-none gap-2 overflow-x-auto p-0">
        {sections.map((s) => {
          const isActive = active === s.id;
          return (
            <li key={s.id} className="shrink-0">
              <a
                href={`#${s.id}`}
                aria-current={isActive ? "location" : undefined}
                className={`inline-flex min-h-[36px] items-center gap-2 rounded-full border px-3 font-[family-name:var(--font-mono)] text-xs uppercase tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--star-yellow)] ${
                  isActive
                    ? "border-[var(--star-yellow)] text-[var(--star-yellow)]"
                    : "border-[var(--card-border)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                }`}
              >
                {s.label}
                <span className="opacity-70">{s.count}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
