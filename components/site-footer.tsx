import Link from "next/link";
import { EmailLink } from "@/components/email-contact-provider";
import { site } from "@/lib/site";

const footerLinkClass =
  "inline-flex min-h-[44px] items-center border-0 bg-transparent p-0 text-sm leading-none text-inherit font-inherit cursor-pointer py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--star-yellow)]";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--card-border)] bg-black/40 py-10 backdrop-blur-sm">
      <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
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
            Home
          </Link>
        </p>
      </div>
    </footer>
  );
}
