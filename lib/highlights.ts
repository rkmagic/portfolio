export type HighlightKind = "recommendation" | "certificate" | "award";

export type Highlight = {
  kind: HighlightKind;
  title: string;
  description: string;
  /** Path under public/, e.g. /highlights/lor-glance.jpg */
  mediaSrc: string;
  mediaType: "image" | "pdf";
  /** Optional external or site link; PDFs default to mediaSrc */
  href?: string;
};

export const highlightKindLabels: Record<HighlightKind, string> = {
  recommendation: "Recommendation",
  certificate: "Certificate",
  award: "Award",
};

/**
 * Drop files into public/highlights/, then append entries here.
 *
 * Example:
 * {
 *   kind: "recommendation",
 *   title: "Letter of Recommendation",
 *   description: "From …",
 *   mediaSrc: "/highlights/lor-glance.pdf",
 *   mediaType: "pdf",
 * }
 */
export const highlights: Highlight[] = [
  {
    kind: "award",
    title: "Climate Tech Competition — 1st Place",
    description:
      "1st place, IE Climate Tech Lab. Built the commercialization plan for a deep-tech startup recovering platinum group metals from spent catalytic converters. Owned business model design from value proposition through go-to-market.",
    mediaSrc: "/highlights/Climate_tech_Rishi%20Kashyap.png",
    mediaType: "image",
  },
  {
    kind: "award",
    title: "Beta Gamma Sigma",
    description:
      "Top 20% of the MBA class. Honor society of AACSB-accredited business schools.",
    mediaSrc: "/highlights/bgs.png",
    mediaType: "image",
  },
  {
    kind: "recommendation",
    title: "Letter of Recommendation",
    description:
      "From Ben Berwing, an experienced project manager, for work in a project management course.",
    mediaSrc: "/highlights/Mayerfeld_LoR_Rishi_Kashyap.pdf",
    mediaType: "pdf",
  },
  {
    kind: "certificate",
    title: "McKinsey Forward",
    description:
      "Completed the McKinsey Forward programme — consulting frameworks and best practices.",
    mediaSrc: "/highlights/McKinsey_Forward.pdf",
    mediaType: "pdf",
  },
];
