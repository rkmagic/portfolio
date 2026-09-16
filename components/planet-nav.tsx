import Link from "next/link";
import {
  planetDestinations,
  planets,
  type PlanetDestination,
} from "@/lib/planets";

const hopLinkClass =
  "inline-flex min-h-[44px] items-center font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-[var(--text-muted)] transition-colors hover:text-[var(--star-yellow)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--star-yellow)]";

/** Compact galaxy trail shown at the top of planet pages. */
export function GalaxyTrail({
  currentHref,
}: {
  currentHref?: PlanetDestination["href"];
}) {
  return (
    <nav aria-label="Galaxy destinations" className="mb-8">
      <Link
        href={planets.home.href}
        className={`${hopLinkClass} text-[var(--crawl-blue)] hover:text-[var(--star-yellow)]`}
      >
        ← {planets.home.name}
      </Link>
      <ul className="mt-3 flex flex-wrap items-center gap-x-1 gap-y-1">
        {planetDestinations.map((planet, index) => {
          const isCurrent = planet.href === currentHref;
          return (
            <li key={planet.href} className="flex items-center gap-1">
              {index > 0 ? (
                <span
                  aria-hidden="true"
                  className="px-1 font-[family-name:var(--font-mono)] text-xs text-[var(--text-muted)]"
                >
                  ·
                </span>
              ) : null}
              {isCurrent ? (
                <span
                  aria-current="page"
                  className="inline-flex min-h-[44px] items-center font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-[var(--star-yellow)]"
                >
                  {planet.name}
                </span>
              ) : (
                <Link href={planet.href} className={hopLinkClass}>
                  {planet.name}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
