import type { ReactNode } from "react";

export function PlanetKicker({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`font-[family-name:var(--font-mono)] text-xs font-medium uppercase tracking-wider text-[var(--crawl-blue)] ${className}`}
    >
      {children}
    </p>
  );
}
