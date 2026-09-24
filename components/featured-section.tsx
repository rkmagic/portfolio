import { FeaturedCard } from "@/components/featured-card";
import { PlanetKicker } from "@/components/planet-kicker";
import { resolveFeaturedItems } from "@/lib/featured";

export function FeaturedSection() {
  const items = resolveFeaturedItems();
  if (items.length === 0) return null;

  return (
    <section
      id="featured"
      className="mt-14 scroll-mt-24"
      aria-labelledby="featured-heading"
    >
      <PlanetKicker>Featured</PlanetKicker>
      <h2
        id="featured-heading"
        className="mt-2 font-[family-name:var(--font-outfit)] text-2xl font-semibold tracking-tight text-[var(--text-primary)]"
      >
        Selected Work
      </h2>
      <ul className="mt-6 grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={`${item.kind}-${item.slug}`}>
            <FeaturedCard item={item} />
          </li>
        ))}
      </ul>
    </section>
  );
}
