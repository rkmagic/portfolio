function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export const site = {
  name: "Rishi",
  title: "Rishi — Product Manager",
  tagline: "Product Manager | Consumer Mobile Products | AI-Native",
  headline: "I think by building.",
  description:
    "When I'm not sure, I build the smallest version and let it answer. Every artefact below shows what I tried, what broke, and what I kept.",
  url: resolveSiteUrl(),
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "rishikashyap.work@gmail.com",
  linkedInUrl:
    process.env.NEXT_PUBLIC_LINKEDIN_URL ??
    "https://www.linkedin.com/in/rishikashyap01/",
  githubUrl: process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/rkmagic",
  blogUrl: process.env.NEXT_PUBLIC_BLOG_URL ?? "https://kolli.vercel.app/",
  /** Served from `public/pdfs/` */
  resumeUrl: "/pdfs/Rishi_Kashyap_CV.pdf",
  resumeDownloadName: "Rishi-Kashyap-CV.pdf",
  /** Digits only, country code included (no +). Used for wa.me links. */
  whatsappNumber:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "491791673876",
  whatsappDisplay:
    process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY ?? "+49 179 1673876",
} as const;
