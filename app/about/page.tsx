import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { EmailLink } from "@/components/email-contact-provider";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Background, focus areas, and how to get in touch.",
};

export default function AboutPage() {
  return (
    <Container className="pb-20 pt-10">
      <h1 className="font-[family-name:var(--font-outfit)] text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
        About
      </h1>
      <div className="mt-8 space-y-6 text-lg leading-relaxed text-[var(--text-primary)]">
        <p>
          This is placeholder biography text. Replace it with your narrative:
          where you have built products, what problems you gravitate toward, and
          what you are looking for next.
        </p>
        <p>
          Second paragraph placeholder — for example, transitions between roles,
          regions, or domains you want to highlight without turning the page into
          a metrics wall.
        </p>
        <p>
          Third paragraph placeholder for school, certifications, or other context
          that helps a hiring manager understand your trajectory.
        </p>
      </div>
      <section className="mt-10" aria-labelledby="expertise-heading">
        <h2
          id="expertise-heading"
          className="font-[family-name:var(--font-outfit)] text-xl font-semibold text-[var(--text-primary)]"
        >
          Expertise areas
        </h2>
        <p className="mt-4 text-[var(--text-primary)]">
          Placeholder list woven into prose — for example: product discovery,
          platform partnerships, AI-assisted workflows, privacy-aware launches, and
          multi-market rollouts. Edit to match your real strengths.
        </p>
      </section>
      <p className="mt-10">
        <a
          href={site.linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--crawl-blue)] underline decoration-[var(--crawl-blue)]/40 underline-offset-4 hover:text-[var(--star-yellow)] hover:decoration-[var(--star-yellow)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--star-yellow)]"
        >
          LinkedIn profile
          <span className="sr-only"> (opens in new tab)</span>
        </a>{" "}
        will act as a lightweight CV when you are ready to link it.
      </p>
      <p className="mt-8">
        <EmailLink className="inline-flex min-h-[44px] items-center rounded border border-[var(--star-yellow)] bg-[var(--star-yellow)] px-5 py-2 text-sm font-medium text-black hover:bg-[#e6b800] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--star-yellow)]">
          Contact me
        </EmailLink>
      </p>
      <p className="mt-6 text-sm text-[var(--text-muted)]">
        <Link href="/" className="hover:text-[var(--star-yellow)]">
          ← Home
        </Link>
      </p>
    </Container>
  );
}
