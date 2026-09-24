import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "frame-src 'self'",
      "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      // 'self' (not 'none') so /pdfs embeds in LazyPdfEmbed iframes still work
      "frame-ancestors 'self'",
    ].join("; "),
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
];

/** Chrome’s PDF viewer fails (grey sad-face) when the PDF response itself
 *  carries X-Frame-Options / object-src 'none'. Keep PDFs embeddable. */
const staticPdfHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
];

const nextConfig: NextConfig = {
  transpilePackages: ["next-mdx-remote"],
  async headers() {
    return [
      {
        source: "/pdfs/:path*",
        headers: staticPdfHeaders,
      },
      {
        source: "/highlights/:path*.pdf",
        headers: staticPdfHeaders,
      },
      {
        // Apply page CSP everywhere except static PDF assets
        source: "/((?!pdfs/|highlights/).*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
