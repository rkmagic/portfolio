import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { EmailLink } from "@/components/email-contact-provider";
import { PlanetKicker } from "@/components/planet-kicker";
import { planets } from "@/lib/planets";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Product manager focused on 0-to-1 AI-native products, OEM partnerships, and regulated multi-market launches.",
};

export default function AboutPage() {
  return (
    <Container className="pb-20 pt-10">
      <PlanetKicker>{planets.about.name}</PlanetKicker>
      <h1 className="mt-2 font-[family-name:var(--font-outfit)] text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
        About
      </h1>
      <div className="mt-8 space-y-6 text-lg leading-relaxed text-[var(--text-primary)]">
        <p>
          I love building 0-to-1 products particularly AI-native ones where the
          challenges are multifold — competing stakeholders, complex partner
          ecosystems, and legal constraints that vary by market.
        </p>
        <p>
          Most recently at InMobi-Glance, I owned mobile content experiences
          reaching 200K+ daily users across North America, Latin America, and
          Asia — distributed through OEM partnerships with Motorola and Verizon
          in a B2B2C model. The real challenge was shipping across OEM release
          cycles, multi-jurisdiction compliance (CCPA, COPPA, GDPR), and
          stakeholders who each had a different definition of success. An
          environment I&apos;m most comfortable in.
        </p>
      </div>
      <section className="mt-10" aria-labelledby="expertise-heading">
        <h2
          id="expertise-heading"
          className="font-[family-name:var(--font-outfit)] text-xl font-semibold text-[var(--text-primary)]"
        >
          I specialize in
        </h2>
        <ul className="mt-4 list-disc space-y-3 pl-6 text-lg leading-relaxed text-[var(--text-primary)]">
          <li>
            <strong className="font-semibold">
              0→1 mobile and digital product development
            </strong>{" "}
            — from rough problem to shipped product
          </li>
          <li>
            <strong className="font-semibold">
              Partner-driven GTM and relations
            </strong>{" "}
            — B2B2C models where the end user isn&apos;t your direct customer.
            Owning revenue, projections and directly working with B2B partners.
          </li>
          <li>
            <strong className="font-semibold">Programmatic monetization</strong>{" "}
            — content, advertising, and engagement mechanics
          </li>
          <li>
            <strong className="font-semibold">Regulated environments</strong> —{" "}
            privacy compliance across US, LATAM, and EU frameworks
          </li>
          <li>
            <strong className="font-semibold">AI-native</strong> — I&apos;ve
            built LLM-powered content tools and multimodal prototypes, and
            I&apos;m very particular about how AI creates real user value vs
            noise. I&apos;ve strengthened my AI knowledge by continuous
            research, building agents, doing workshops with my MBA cohort and
            attending events, workshops, webinars and more since 2024.
          </li>
        </ul>
      </section>
      <div className="mt-10 space-y-6 text-lg leading-relaxed text-[var(--text-primary)]">
        <p>
          Currently completing my MBA at IE Business School in Madrid, with a
          specialization in Digital Business and Analytics. I&apos;m doing my
          exchange semester in ESMT Berlin.
        </p>
        <p>
          Open to Product Manager, AI Product Manager, Product Owner, and
          product-adjacent roles across EMEA — Media/Streaming/Commerce,
          fintech, healthtech, enterprise SaaS, and AI-native products.
        </p>
        <p>
          Outside work, I&apos;m a huge sports fan. I follow football, F1,
          tennis and cricket. Manchester United and Ferrari are my favorite
          teams. I&apos;m also a history buff so I enjoy learning about history
          and it fascinates me whenever I visit historic places. I play chess
          occasionally and like to see movies (select TV shows). Geopolitics is
          something I can talk about with anyone.
        </p>
      </div>
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
        has a fuller work history.
      </p>
      <p className="mt-8 flex flex-wrap items-center gap-3">
        <EmailLink className="inline-flex min-h-[44px] items-center rounded border border-[var(--star-yellow)] bg-[var(--star-yellow)] px-5 py-2 text-sm font-medium text-black hover:bg-[#e6b800] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--star-yellow)]">
          Contact me
        </EmailLink>
        <a
          href={site.resumeUrl}
          download={site.resumeDownloadName}
          className="inline-flex min-h-[44px] items-center rounded border border-[var(--card-border)] px-5 py-2 text-sm font-medium text-[var(--text-primary)] hover:border-[var(--star-yellow)] hover:text-[var(--star-yellow)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--star-yellow)]"
        >
          Download resume
        </a>
      </p>
      <p className="mt-6 text-sm text-[var(--text-muted)]">
        <Link href="/" className="hover:text-[var(--star-yellow)]">
          ← {planets.home.name}
        </Link>
      </p>
    </Container>
  );
}
