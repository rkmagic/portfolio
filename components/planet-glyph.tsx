export type PlanetVariant = "teardown" | "projects" | "writings";

const variants: Record<
  PlanetVariant,
  { body: string; accent: string; ring?: string; glow: string }
> = {
  teardown: {
    body: "#c45c3a",
    accent: "#f5a623",
    glow: "rgba(245, 166, 35, 0.35)",
  },
  projects: {
    body: "#5a8fae",
    accent: "var(--star-yellow)",
    ring: "rgba(245, 197, 24, 0.55)",
    glow: "rgba(75, 213, 238, 0.3)",
  },
  writings: {
    body: "#6b5b95",
    accent: "var(--crawl-blue)",
    glow: "rgba(107, 91, 149, 0.4)",
  },
};

export function PlanetGlyph({
  variant,
  className = "",
}: {
  variant: PlanetVariant;
  className?: string;
}) {
  const v = variants[variant];

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={`${variant}-shine`} cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="28" fill={v.glow} opacity="0.55" />
      <circle cx="32" cy="32" r="18" fill={v.body} />
      <circle cx="32" cy="32" r="18" fill={`url(#${variant}-shine)`} />
      {variant === "teardown" ? (
        <>
          <circle cx="24" cy="28" r="2.5" fill="#8a3f28" opacity="0.55" />
          <circle cx="38" cy="36" r="1.8" fill="#8a3f28" opacity="0.45" />
          <circle cx="30" cy="40" r="1.2" fill="#8a3f28" opacity="0.4" />
        </>
      ) : null}
      {variant === "writings" ? (
        <>
          <ellipse cx="32" cy="28" rx="14" ry="3" fill="#8f7bb8" opacity="0.55" />
          <ellipse cx="32" cy="34" rx="15" ry="2.5" fill="#554a72" opacity="0.45" />
          <ellipse cx="32" cy="39" rx="13" ry="2" fill="#9d8ec4" opacity="0.4" />
        </>
      ) : null}
      {v.ring ? (
        <ellipse
          cx="32"
          cy="34"
          rx="26"
          ry="8"
          stroke={v.ring}
          strokeWidth="2"
          fill="none"
          transform="rotate(-18 32 34)"
        />
      ) : null}
      <circle cx="40" cy="24" r="2" fill={v.accent} opacity="0.85" />
    </svg>
  );
}
