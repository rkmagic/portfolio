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
    kind: "certificate",
    title: "McKinsey Forward",
    description:
      "Completed the McKinsey Forward programme — consulting frameworks and best practices.",
    mediaSrc: "/highlights/McKinsey_Forward.pdf",
    mediaType: "pdf",
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
    kind: "award",
    title: "Climate Tech Competition — 1st Place",
    description:
      "Won first place building a commercialization plan for a deep tech project.",
    mediaSrc: "/highlights/Climate_tech_Rishi%20Kashyap.png",
    mediaType: "image",
  },
  {
    kind: "award",
    title: "Beta Gamma Sigma",
    description:
      "Awarded for being in the top 20%. Community of triple-accredited business schools worldwide.",
    mediaSrc: "/highlights/bgs.png",
    mediaType: "image",
  },
];
