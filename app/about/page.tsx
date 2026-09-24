import type { Metadata } from "next";
import { Container } from "@/components/container";
import { EmailLink } from "@/components/email-contact-provider";
import { HighlightsGrid } from "@/components/highlights-grid";
import Link from "next/link";
import { GalaxyTrail } from "@/components/planet-nav";
import { PlanetKicker } from "@/components/planet-kicker";
import { highlights } from "@/lib/highlights";
import { planets } from "@/lib/planets";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "I build consumer mobile and AI-native products and can thrive in messy environments: partner-led distribution, many markets, and privacy rules that change at every border.",
};

export default function AboutPage() {
  return (
    <Container className="pb-20 pt-10">
      <GalaxyTrail />
      <PlanetKicker>{planets.about.name}</PlanetKicker>
      <h1 className="mt-2 font-[family-name:var(--font-outfit)] text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
        About
      </h1>
      <div className="mt-8 space-y-6 text-lg leading-relaxed text-[var(--text-primary)]">
        <p>
          I build consumer mobile and AI-native products and can thrive in messy
          environments: partner-led distribution, many markets, and privacy rules
          that change at every border.
        </p>
        <p>
          I spent 3+ years in product at InMobi, moving from business analytics
          into APM and then PM roles. As PM, I owned a content discovery app with
          ~200K daily users distributed through Verizon, and grew its revenue 70%
          by rethinking how it was deployed (app vs web vs TWA) and tuning
          engagement and programmatic monetization (without hurting the user experience). Before
          that, as APM, I led a news and gaming app with 600K daily users on
          Motorola devices: 4x revenue, 30% engagement gains, and a real-time US
          election feature built with the Associated Press that lifted daily
          users by 20%.
        </p>
      </div>
      <section className="mt-10" aria-labelledby="expertise-heading">
        <h2
          id="expertise-heading"
          className="font-[family-name:var(--font-outfit)] text-xl font-semibold text-[var(--text-primary)]"
        >
          What I bring
        </h2>
        <ul className="mt-4 list-disc space-y-3 pl-6 text-lg leading-relaxed text-[var(--text-primary)]">
          <li>
            <strong className="font-semibold">0→1 mobile products.</strong> Lock
            screen experiences, widgets, and content apps (android and web), from rough problem to
            shipped product.
          </li>
          <li>
            <strong className="font-semibold">Partner-driven GTM.</strong>{" "}
            B2B2C models where the end user isn&apos;t your direct customer. I
            owned revenue, projections, and weekly reporting across three telco
            and OEM partners.
          </li>
          <li>
            <strong className="font-semibold">
              Programmatic monetization.
            </strong>{" "}
            Ad SDK integrations and optimizing eCPMs and CTRs without degrading
            the experience.
          </li>
          <li>
            <strong className="font-semibold">
              Privacy-regulated products.
            </strong>{" "}
            CCPA, COPPA, and GDPR compliance across markets.
          </li>
          <li>
            <strong className="font-semibold">AI-native products.</strong> I
            shipped AI-driven MVPs at InMobi (calorie tracking, mindfulness, quiz
            content) and have been building with LLMs since 2024. I care most
            about the gap between an AI demo and AI that users actually value;
            Fintrack&apos;s model evaluation shows how I test for it.
          </li>
        </ul>
      </section>
      <section className="mt-10" aria-labelledby="now-heading">
        <h2
          id="now-heading"
          className="font-[family-name:var(--font-outfit)] text-xl font-semibold text-[var(--text-primary)]"
        >
          Now
        </h2>
        <div className="mt-4 space-y-6 text-lg leading-relaxed text-[var(--text-primary)]">
          <p>
            Completing my MBA at IE Business School (Digital Business and
            Analytics), currently on exchange at ESMT Berlin. Graduating December
            2026.
          </p>
          <p>
            I&apos;m looking for PM and AI PM roles across EMEA in consumer
            mobile, media and streaming, and AI-native products, especially where
            partners, monetization, or regulation make the problem harder.
          </p>
          <p>
            Outside work: football (Manchester United), F1 (Ferrari), history,
            chess, and geopolitics.
          </p>
        </div>
      </section>
      {highlights.length > 0 ? (
        <section className="mt-10" aria-labelledby="highlights-heading">
          <h2
            id="highlights-heading"
            className="font-[family-name:var(--font-outfit)] text-xl font-semibold text-[var(--text-primary)]"
          >
            Highlights
          </h2>
          <HighlightsGrid items={highlights} />
        </section>
      ) : null}
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
