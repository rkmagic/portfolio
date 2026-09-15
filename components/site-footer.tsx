import Link from "next/link";
import { EmailLink } from "@/components/email-contact-provider";
import { planets } from "@/lib/planets";
import { site } from "@/lib/site";

const footerLinkClass =
  "inline-flex min-h-[44px] items-center border-0 bg-transparent p-0 text-sm leading-none text-inherit font-inherit cursor-pointer py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--star-yellow)]";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--card-border)] bg-black/40 py-10 pb-16 backdrop-blur-sm">
      {/* Black hole crest — true semicircle rising from the bottom */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center overflow-hidden"
        aria-hidden="true"
      >
        <svg
          className="h-36 w-[min(100%,28rem)] sm:h-44 sm:w-[min(100%,36rem)]"
          viewBox="0 0 400 200"
          preserveAspectRatio="xMidYMax meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="bh-glow" cx="50%" cy="100%" r="70%">
              <stop offset="0%" stopColor="rgba(180,168,110,0.28)" />
              <stop offset="35%" stopColor="rgba(100,130,140,0.14)" />
              <stop offset="70%" stopColor="rgba(0,0,0,0.9)" />
              <stop offset="100%" stopColor="#000" />
            </radialGradient>
            <linearGradient id="bh-rim" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(180,168,110,0)" />
              <stop offset="50%" stopColor="rgba(220,210,170,0.55)" />
              <stop offset="100%" stopColor="rgba(180,168,110,0)" />
            </linearGradient>
          </defs>

          {/* Soft outer wash */}
          <ellipse cx="200" cy="200" rx="195" ry="195" fill="url(#bh-glow)" opacity="0.85" />

          {/* Outer horizon arc */}
          <path
            d="M 20 200 A 180 180 0 0 1 380 200"
            fill="none"
            stroke="rgba(180,168,110,0.35)"
            strokeWidth="2"
          />
          {/* Mid ring */}
          <path
            d="M 55 200 A 145 145 0 0 1 345 200"
            fill="none"
            stroke="rgba(120,150,160,0.28)"
            strokeWidth="1.5"
          />
          {/* Inner ring */}
          <path
            d="M 90 200 A 110 110 0 0 1 310 200"
            fill="none"
            stroke="rgba(180,168,110,0.22)"
            strokeWidth="1.25"
          />

          {/* Event horizon fill */}
          <path d="M 110 200 A 90 90 0 0 1 290 200 Z" fill="#000" />

          {/* Rim highlight along the crest */}
          <path
            d="M 40 200 A 160 160 0 0 1 360 200"
            fill="none"
            stroke="url(#bh-rim)"
            strokeWidth="3"
            opacity="0.7"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm leading-none text-[var(--text-muted)]"
        >
          <a
            href={site.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={footerLinkClass}
          >
            LinkedIn
          </a>
          <a
            href={site.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={footerLinkClass}
          >
            GitHub
          </a>
          <a
            href={site.resumeUrl}
            download={site.resumeDownloadName}
            className={footerLinkClass}
          >
            Resume
          </a>
          <EmailLink className={footerLinkClass}>Contact</EmailLink>
          <a
            href={site.blogUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${footerLinkClass} gap-1`}
          >
            Blog
            <span aria-hidden="true">↗</span>
            <span className="sr-only">(opens in new tab)</span>
          </a>
        </nav>
        <p className="text-center font-[family-name:var(--font-mono)] text-xs text-[var(--text-muted)]">
          Ship or ship not. No try
        </p>
        <p className="text-center text-xs text-[var(--text-muted)]">
          <Link
            href="/"
            className="text-[var(--text-muted)] hover:text-[var(--star-yellow)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--star-yellow)]"
          >
            {planets.home.name}
          </Link>
        </p>
      </div>
    </footer>
  );
}
