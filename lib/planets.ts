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
