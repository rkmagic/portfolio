import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentLayout } from "@/components/content-layout";
import { LazyPdfEmbed } from "@/components/lazy-pdf-embed";
import {
  getProject,
  getProjectSlugs,
} from "@/lib/content/load";
import { site } from "@/lib/site";
import { planets } from "@/lib/planets";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { meta } = await getProject(slug);
    return {
      title: meta.title,
      description: meta.description,
      openGraph: {
        title: meta.title,
        description: meta.description,
        url: `${site.url}/projects/${slug}`,
      },
    };
  } catch {
    return { title: "Not found" };
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  let data;
  try {
    data = await getProject(slug);
  } catch {
    notFound();
  }

  const { meta, content, readingTime } = data;

  return (
    <ContentLayout
      breadcrumbs={[
        { href: planets.home.href, label: planets.home.name },
        { href: planets.projects.href, label: planets.projects.name },
        { href: `/projects/${slug}`, label: meta.title },
      ]}
      planet={planets.projects.name}
      title={meta.title}
      description={meta.description}
      readingTime={readingTime}
      backHref={planets.projects.href}
      backLabel={planets.projects.backLabel}
    >
      {content}

      {meta.pdfUrl ? (
        <div className="mt-12 border-t border-[var(--card-border)] pt-10">
          <h2 className="font-[family-name:var(--font-outfit)] text-2xl font-semibold text-[var(--text-primary)]">
            Project PDF
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--text-primary)]">
            <a
              href={meta.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[var(--star-yellow)] underline decoration-[var(--star-yellow)]/50 underline-offset-4 transition-colors hover:decoration-[var(--star-yellow)]"
            >
              Open PDF in a new tab
            </a>
          </p>
          <LazyPdfEmbed src={meta.pdfUrl} title={`${meta.title} PDF`} />
        </div>
      ) : null}
    </ContentLayout>
  );
}
