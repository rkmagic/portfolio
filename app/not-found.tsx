import Link from "next/link";
import { Container } from "@/components/container";
import { PlanetKicker } from "@/components/planet-kicker";
import { planets } from "@/lib/planets";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <PlanetKicker>Hyperspace miss</PlanetKicker>
      <h1 className="mt-2 font-[family-name:var(--font-outfit)] text-2xl font-semibold text-[var(--text-primary)]">
        These aren&apos;t the droids
      </h1>
      <p className="mt-4 text-[var(--text-muted)]">
        That coordinate isn&apos;t on the map.
      </p>
      <p className="mt-8">
        <Link
          href="/"
          className="font-[family-name:var(--font-mono)] text-[var(--crawl-blue)] hover:text-[var(--star-yellow)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--star-yellow)]"
        >
          Jump to {planets.home.name}
        </Link>
      </p>
    </Container>
  );
}
