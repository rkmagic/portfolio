import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-3xl px-4 sm:px-6 lg:max-w-4xl lg:px-8 ${className}`}
    >
      {children}
    </div>
  );
}
