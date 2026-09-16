/** Named worlds in Rishi's Galaxy — used as section labels across the site. */
export const planets = {
  home: {
    name: "Rishi's Galaxy",
    href: "/",
  },
  about: {
    name: "Planet Origin",
    title: "About",
    href: "/about",
  },
  teardowns: {
    name: "Planet Teardown",
    title: "Product teardowns",
    href: "/teardowns",
    backLabel: "Back to Planet Teardown",
  },
  projects: {
    name: "Planet Shipyard",
    title: "Product projects",
    href: "/projects",
    backLabel: "Back to Planet Shipyard",
  },
  writings: {
    name: "Planet Archive",
    title: "Writings",
    href: "/writings",
    backLabel: "Back to Planet Archive",
  },
} as const;

export type PlanetId = keyof typeof planets;

/** Destinations you can hop between inside the galaxy (excludes home + about). */
export const planetDestinations = [
  planets.teardowns,
  planets.projects,
  planets.writings,
] as const;

export type PlanetDestination = (typeof planetDestinations)[number];

/** Resolve which planet section a pathname belongs to (includes About for header). */
export function planetFromPathname(pathname: string): {
  href: string;
} | null {
  if (
    pathname === planets.about.href ||
    pathname.startsWith(`${planets.about.href}/`)
  ) {
    return planets.about;
  }

  return (
    planetDestinations.find(
      (planet) =>
        pathname === planet.href || pathname.startsWith(`${planet.href}/`),
    ) ?? null
  );
}
