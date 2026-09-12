"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { requestIntroReplay } from "@/components/cinematic-intro";
import { useEmailContact } from "@/components/email-contact-provider";
import { site } from "@/lib/site";

const nav = [
  { href: "/about", label: "About" },
  { href: "/teardowns", label: "Teardowns" },
  { href: "/projects", label: "Projects" },
  { href: "/writings", label: "Writings" },
] as const;

function LinkedInIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

const linkClass =
  "rounded px-2 py-2 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--star-yellow)] min-h-[44px] inline-flex items-center";

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { openEmailDialog } = useEmailContact();

  const seeOnboardingAgain = () => {
    requestIntroReplay();
    if (pathname !== "/") {
      router.push("/?replayIntro=1");
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--card-border)] bg-black/50 backdrop-blur-md">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Link
            href="/"
            className="shrink-0 font-[family-name:var(--font-mono)] text-sm font-bold tracking-wide text-[var(--star-yellow)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--star-yellow)]"
          >
            {site.name}
          </Link>
          <button
            type="button"
            onClick={seeOnboardingAgain}
            className="min-h-[44px] rounded px-1.5 py-1 font-[family-name:var(--font-mono)] text-[10px] leading-tight text-[var(--text-muted)] transition-colors hover:text-[var(--star-yellow)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--star-yellow)] sm:text-xs"
          >
            See onboarding again
          </button>
        </div>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={linkClass}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={site.blogUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${linkClass} gap-1`}
          >
            Blog
            <span aria-hidden="true">↗</span>
            <span className="sr-only">(opens in new tab)</span>
          </a>
          <a
            href={site.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${linkClass} text-[var(--text-muted)]`}
            aria-label="LinkedIn profile (opens in new tab)"
          >
            <LinkedInIcon />
          </a>
          <a
            href={site.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${linkClass} text-[var(--text-muted)]`}
            aria-label="GitHub profile (opens in new tab)"
          >
            <GitHubIcon />
          </a>
          <button
            type="button"
            className="ml-1 inline-flex min-h-[44px] items-center rounded border border-[var(--star-yellow)] bg-[var(--star-yellow)] px-4 py-2 text-sm font-medium text-black transition hover:bg-[#e6b800] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--star-yellow)]"
            aria-label="Contact me — email or WhatsApp"
            onClick={openEmailDialog}
          >
            Contact Me
          </button>
        </nav>

        <button
          type="button"
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded border border-[var(--card-border)] text-[var(--text-primary)] md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-[var(--card-border)] bg-black/95 px-4 py-4 md:hidden"
          aria-label="Mobile primary"
        >
          <ul className="flex flex-col gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block min-h-[44px] py-3 text-[var(--text-primary)]"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={site.blogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block min-h-[44px] py-3"
              >
                Blog ↗
              </a>
            </li>
            <li>
              <a
                href={site.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block min-h-[44px] py-3"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={site.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block min-h-[44px] py-3"
              >
                GitHub
              </a>
            </li>
            <li>
              <button
                type="button"
                className="mt-2 w-full min-h-[44px] rounded border border-[var(--star-yellow)] bg-[var(--star-yellow)] px-4 py-3 text-center font-medium text-black"
                aria-label="Contact me — email or WhatsApp"
                onClick={() => {
                  setOpen(false);
                  openEmailDialog();
                }}
              >
                Contact Me
              </button>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
