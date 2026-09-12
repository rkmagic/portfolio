export type TeardownMeta = {
  title: string;
  description: string;
  date: string;
  hook: string;
};

export type ProjectMeta = {
  title: string;
  description: string;
  date: string;
  company: string;
  outcome: string;
};

export type WritingKind = "article" | "deck";

export type WritingMeta = {
  title: string;
  description: string;
  date: string;
  kind: WritingKind;
  /** Required for kind: deck — path under public/, e.g. /pdfs/agents.pdf */
  pdfUrl?: string;
};
