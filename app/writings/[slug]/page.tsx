import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentLayout } from "@/components/content-layout";
import { LazyPdfEmbed } from "@/components/lazy-pdf-embed";
import { getWriting, getWritingSlugs } from "@/lib/content/load";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getWritingSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { meta } = await getWriting(slug);
    return {
      title: meta.title,
      description: meta.description,
      openGraph: {
        title: meta.title,
        description: meta.description,
        url: `${site.url}/writings/${slug}`,
      },
    };
  } catch {
    return { title: "Not found" };
  }
}

export default async function WritingPage({ params }: Props) {
  const { slug } = await params;
  let data;
  try {
    data = await getWriting(slug);
  } catch (error) {
    if (error instanceof Error && error.message === "Not found") {
      notFound();
    }
    throw error;
  }

  const { meta, content, readingTime } = data;
  const showPdf = meta.kind === "deck" && Boolean(meta.pdfUrl);

  return (
    <ContentLayout
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/writings", label: "Writings" },
        { href: `/writings/${slug}`, label: meta.title },
      ]}
      title={meta.title}
      description={meta.description}
      readingTime={readingTime}
      backHref="/writings"
      backLabel="Back to writings"
    >
      {content}

      {showPdf && meta.pdfUrl ? (
        <div className="mt-12 border-t border-[var(--card-border)] pt-10">
          <h2 className="font-[family-name:var(--font-outfit)] text-2xl font-semibold text-[var(--text-primary)]">
            Deck PDF
          </h2>
          <LazyPdfEmbed src={meta.pdfUrl} title={`${meta.title} PDF`} />
        </div>
      ) : null}
    </ContentLayout>
  );
}
