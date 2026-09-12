import Link from "next/link";

export function Breadcrumbs({
  items,
}: {
  items: { href: string; label: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 font-[family-name:var(--font-mono)] text-xs text-[var(--text-muted)]">
        {items.map((item, i) => (
          <li key={item.href} className="flex items-center gap-2">
            {i > 0 ? <span aria-hidden="true">/</span> : null}
            {i === items.length - 1 ? (
              <span className="text-[var(--text-primary)]">{item.label}</span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-[var(--star-yellow)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--star-yellow)]"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
