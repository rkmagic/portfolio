import type { Metadata } from "next";
import { Outfit, Space_Mono } from "next/font/google";
import "./globals.css";
import { EmailContactProvider } from "@/components/email-contact-provider";
import { SkipLink } from "@/components/skip-link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${spaceMono.variable} min-h-screen bg-[var(--bg-deep)]`}
      >
        <EmailContactProvider>
          <SkipLink />
          <SiteHeader />
          <main
            id="main-content"
            tabIndex={-1}
            className="outline-none focus-visible:ring-2 focus-visible:ring-[var(--star-yellow)] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            {children}
          </main>
          <SiteFooter />
        </EmailContactProvider>
      </body>
    </html>
  );
}
