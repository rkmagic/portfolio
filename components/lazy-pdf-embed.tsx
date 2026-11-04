"use client";

import { useEffect, useRef, useState } from "react";

/** True when the browser is unlikely to paint a PDF inside an iframe
 *  (Chrome/Safari on phones/tablets → grey blank viewer). */
function useNeedsPdfFallback() {
  const [needsFallback, setNeedsFallback] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(
      "(max-width: 767px), (hover: none) and (pointer: coarse)",
    );
    const sync = () => setNeedsFallback(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return needsFallback;
}

function OpenPdfCard({ src, title }: { src: string; title: string }) {
  return (
    <div className="flex min-h-[12rem] flex-col items-start justify-center gap-4 p-6 sm:min-h-[16rem] sm:p-8">
      <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-[var(--text-muted)]">
        PDF preview
      </p>
      <p className="max-w-md text-base text-[var(--text-primary)]">
        On this device, open the file in a new tab to use the system PDF viewer.
      </p>
      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center rounded-lg border border-[var(--star-yellow)]/60 bg-[var(--star-yellow)]/10 px-4 py-2.5 font-[family-name:var(--font-outfit)] text-sm font-semibold text-[var(--star-yellow)] transition-colors hover:bg-[var(--star-yellow)]/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--star-yellow)]"
      >
        Open {title}
      </a>
    </div>
  );
}

/** Renders the PDF iframe only once the section is near the viewport.
 *  On mobile/touch, links out instead — iframe PDF viewers stay grey there. */
export function LazyPdfEmbed({
  src,
  title,
}: {
  src: string;
  title: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const needsFallback = useNeedsPdfFallback();

  useEffect(() => {
    if (needsFallback) return;

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
  }, [needsFallback]);

  return (
    <div
      ref={containerRef}
      className="mt-6 overflow-hidden rounded-lg border border-[var(--card-border)] bg-black/40"
    >
      {needsFallback ? (
        <OpenPdfCard src={src} title={title} />
      ) : shouldLoad ? (
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
