import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentLayout } from "@/components/content-layout";
import {
  getTeardown,
  getTeardownSlugs,
} from "@/lib/content/load";
import { site } from "@/lib/site";
import { planets } from "@/lib/planets";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getTeardownSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { meta } = await getTeardown(slug);
    return {
      title: meta.title,
      description: meta.description,
      openGraph: {
        title: meta.title,
        description: meta.description,
        url: `${site.url}/teardowns/${slug}`,
      },
    };
  } catch {
    return { title: "Not found" };
  }
}

export default async function TeardownPage({ params }: Props) {
  const { slug } = await params;
  let data;
  try {
    data = await getTeardown(slug);
  } catch {
    notFound();
  }

  const { meta, content, readingTime } = data;

  return (
    <ContentLayout
      breadcrumbs={[
        { href: planets.home.href, label: planets.home.name },
        { href: planets.teardowns.href, label: planets.teardowns.name },
        { href: `/teardowns/${slug}`, label: meta.title },
      ]}
      planet={planets.teardowns.name}
      title={meta.title}
      description={meta.description}
      readingTime={readingTime}
      backHref={planets.teardowns.href}
      backLabel={planets.teardowns.backLabel}
    >
      {content}
    </ContentLayout>
  );
}
