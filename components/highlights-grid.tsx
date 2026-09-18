import { HighlightCard } from "@/components/highlight-card";
import type { Highlight } from "@/lib/highlights";

export function HighlightsGrid({ items }: { items: Highlight[] }) {
  if (items.length === 0) return null;

  return (
    <ul className="mt-4 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={`${item.kind}-${item.title}-${item.mediaSrc}`}>
          <HighlightCard item={item} />
        </li>
      ))}
    </ul>
  );
}
