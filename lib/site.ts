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
  tagline: "Product Manager | AI-Native | Empathy",
  headline: "Shaping the next generation of digital products.",
  description:
    "I love building and scaling AI-native consumer products. Here, you will find a breakdown of my process, my builds, and my learnings from the past.",
  url: resolveSiteUrl(),
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "rishi38199@gmail.com",
  linkedInUrl:
    process.env.NEXT_PUBLIC_LINKEDIN_URL ??
    "https://www.linkedin.com/in/rishikashyap01/",
  githubUrl: process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/rkmagic",
  blogUrl: process.env.NEXT_PUBLIC_BLOG_URL ?? "https://kolli.vercel.app/",
  /** Digits only, country code included (no +). Used for wa.me links. */
  whatsappNumber:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "491791673876",
  whatsappDisplay:
    process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY ?? "+49 179 1673876",
} as const;
