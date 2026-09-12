import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      className="mt-10 font-[family-name:var(--font-outfit)] text-2xl font-semibold tracking-tight text-[var(--text-primary)] first:mt-0"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-6 font-[family-name:var(--font-outfit)] text-xl font-medium text-[var(--text-primary)]"
      {...props}
    />
  ),
  p: (props) => (
    <p
      className="mt-4 text-base leading-relaxed text-[var(--text-primary)] first:mt-0"
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      className="mt-4 list-disc space-y-2 pl-6 text-[var(--text-primary)]"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="mt-4 list-decimal space-y-2 pl-6 text-[var(--text-primary)]"
      {...props}
    />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  a: ({ className, ...props }) => (
    <a
      {...props}
      className={[
        "font-medium text-[var(--star-yellow)] underline decoration-[var(--star-yellow)]/50 underline-offset-4 transition-colors hover:decoration-[var(--star-yellow)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  ),
  img: (props) => (
    // eslint-disable-next-line @next/next/no-img-element -- MDX body images use plain img for flexible public/ paths
    <img
      loading="lazy"
      {...props}
      alt={props.alt ?? ""}
      className="my-8 h-auto w-full max-h-[min(70vh,36rem)] rounded-lg border border-[var(--card-border)] object-contain bg-black/30"
    />
  ),
  strong: (props) => <strong className="font-semibold text-[var(--text-primary)]" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="border-l-2 border-[var(--star-yellow)] pl-4 text-[var(--text-muted)]"
      {...props}
    />
  ),
};
