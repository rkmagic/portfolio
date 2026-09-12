"use client";

import { useEffect, useRef, useState } from "react";

/** Renders the PDF iframe only once the section is near the viewport. */
export function LazyPdfEmbed({
  src,
  title,
}: {
  src: string;
  title: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="mt-6 overflow-hidden rounded-lg border border-[var(--card-border)] bg-black/40"
    >
      {shouldLoad ? (
        <iframe title={title} src={src} className="h-[70vh] w-full" />
      ) : (
        <div
          className="flex h-[70vh] w-full items-center justify-center font-[family-name:var(--font-mono)] text-sm text-[var(--text-muted)]"
          aria-hidden="true"
        >
          PDF preview loads when you scroll here
        </div>
      )}
    </div>
  );
}
