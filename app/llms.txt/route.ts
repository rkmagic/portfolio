import { site } from "@/lib/site";
import { listProjects, listTeardowns, listWritings } from "@/lib/content/load";

export const dynamic = "force-static";

function line(title: string, url: string, description?: string) {
  const desc = description?.trim();
  return desc ? `- [${title}](${url}): ${desc}` : `- [${title}](${url})`;
}

export function GET() {
  const base = site.url.replace(/\/$/, "");
  const projects = listProjects();
  const writings = listWritings();
  const teardowns = listTeardowns();

  const body = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `${site.headline} Portfolio of product work, teardowns, and writing on AI-native and mobile products.`,
    "",
    "## Pages",
    "",
    line("Home", `${base}/`, site.tagline),
    line(
      "About",
      `${base}/about`,
      "Background, expertise, and contact for Rishi Kashyap, product manager.",
    ),
    line("Projects", `${base}/projects`, "Product builds and case studies."),
    line("Writings", `${base}/writings`, "Articles and decks."),
    line("Teardowns", `${base}/teardowns`, "Product teardown analyses."),
    "",
    "## Projects",
    "",
    ...projects.map(({ slug, meta }) =>
      line(meta.title, `${base}/projects/${slug}`, meta.description),
    ),
    "",
    "## Writings",
    "",
    ...writings.map(({ slug, meta }) =>
      line(meta.title, `${base}/writings/${slug}`, meta.description),
    ),
    "",
    "## Teardowns",
    "",
    ...teardowns.map(({ slug, meta }) =>
      line(meta.title, `${base}/teardowns/${slug}`, meta.description),
    ),
    "",
    "## Optional",
    "",
    `- [Sitemap](${base}/sitemap.xml)`,
    `- [LinkedIn](${site.linkedInUrl})`,
    `- [GitHub](${site.githubUrl})`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
