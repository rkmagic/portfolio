import Link from "next/link";
import type { FeaturedItem } from "@/lib/featured";
import { featuredKindLabels } from "@/lib/featured";

export function FeaturedCard({ item }: { item: FeaturedItem }) {
  return (
    <Link
      href={item.href}
      className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] shadow-none transition-[background-color,transform] duration-200 hover:-translate-y-[3px] hover:bg-[var(--card-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--star-yellow)]"
    >
      <span
        className="pointer-events-none absolute left-0 right-0 top-0 h-0.5 origin-left scale-x-0 bg-[var(--star-yellow)] transition-transform duration-200 group-hover:scale-x-100"
        aria-hidden="true"
      />
      <div className="aspect-[16/10] overflow-hidden border-b border-[var(--card-border)] bg-[var(--card-hover)]">
        {/* eslint-disable-next-line @next/next/no-img-element -- featured covers are static public paths */}
        <img
          src={item.coverImage}
          alt=""
          className="h-full w-full object-cover object-top transition-transform duration-300 motion-safe:group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col space-y-2 px-4 py-4">
        <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wide text-[var(--crawl-blue)]">
          {featuredKindLabels[item.kind]}
        </span>
        <h3 className="font-[family-name:var(--font-outfit)] text-lg font-semibold text-[var(--text-primary)]">
          {item.title}
        </h3>
        {item.hook ? (
          <p className="text-sm italic leading-relaxed text-[var(--star-yellow)]/90">
            {item.hook}
          </p>
        ) : null}
        <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-[var(--text-muted)]">
          {item.description}
        </p>
        <span className="mt-2 inline-flex w-fit items-center gap-1 font-[family-name:var(--font-mono)] text-xs uppercase tracking-wide text-[var(--crawl-blue)] group-hover:text-[var(--star-yellow)]">
          Read
          <span aria-hidden="true">›</span>
        </span>
      </div>
    </Link>
  );
}
