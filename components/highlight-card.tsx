import type { Highlight } from "@/lib/highlights";
import { highlightKindLabels } from "@/lib/highlights";

function resolveHref(item: Highlight): string | undefined {
  if (item.href) return item.href;
  if (item.mediaType === "pdf") return item.mediaSrc;
  return undefined;
}

function CardBody({ item }: { item: Highlight }) {
  return (
    <>
      <span className="block px-4 pt-3 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wide text-[var(--text-muted)]">
        {highlightKindLabels[item.kind]}
      </span>
      <div className="mt-2 aspect-[16/10] overflow-hidden border-y border-[var(--card-border)] bg-[var(--card-hover)]">
        {item.mediaType === "image" ? (
          // eslint-disable-next-line @next/next/no-img-element -- highlight assets are static public paths
          <img
            src={item.mediaSrc}
            alt=""
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 px-4 text-center">
            <span
              className="rounded border border-[var(--card-border)] px-2 py-0.5 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wide text-[var(--star-yellow)]"
              aria-hidden="true"
            >
              PDF
            </span>
            <span className="line-clamp-2 text-sm text-[var(--text-muted)]">
              {item.title}
            </span>
          </div>
        )}
      </div>
      <div className="space-y-1.5 px-4 py-3">
        <h3 className="font-[family-name:var(--font-outfit)] text-base font-semibold text-[var(--text-primary)]">
          {item.title}
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-[var(--text-muted)]">
          {item.description}
        </p>
      </div>
    </>
  );
}

export function HighlightCard({ item }: { item: Highlight }) {
  const href = resolveHref(item);
  const className =
    "group relative flex h-full flex-col overflow-hidden rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] shadow-none transition-[background-color,transform] duration-200 hover:-translate-y-[3px] hover:bg-[var(--card-hover)]";

  if (href) {
    const isExternal = href.startsWith("http");
    return (
      <a
        href={href}
        className={`${className} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--star-yellow)]`}
        {...(isExternal || item.mediaType === "pdf"
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        <CardBody item={item} />
      </a>
    );
  }

  return (
    <div className={className}>
      <CardBody item={item} />
    </div>
  );
}
