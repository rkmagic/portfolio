"use client";

import { useEffect, useState } from "react";

export type JumpSection = { id: string; label: string; count: number };

/** Pixels from viewport top where the section under the sticky jump bar “counts”. */
const ACTIVE_MARKER_PX = 140;

export function SectionJumpBar({ sections }: { sections: JumpSection[] }) {
  const [active, setActive] = useState<string | null>(sections[0]?.id ?? null);

  useEffect(() => {
    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (elements.length === 0) return;

    const update = () => {
      // Last section whose top has crossed the sticky band wins — so a tall
      // Archive above Teardown does not keep stealing the active state.
      let current = sections[0]?.id ?? null;
      for (const el of elements) {
        if (el.getBoundingClientRect().top <= ACTIVE_MARKER_PX) {
          current = el.id;
        } else {
          break;
        }
      }
      setActive(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
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
                onClick={() => setActive(s.id)}
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
