# Rishi — Product Manager Portfolio

Personal portfolio site: product teardowns, shipped projects, and writings. Built with Next.js and MDX.

**Live:** connect this repo to [Vercel](https://vercel.com) after the first GitHub push.

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |

Copy `.env.example` to `.env.local` to override contact links or the site URL. `.env.local` is gitignored.

## Content

MDX lives under `content/`:

- `content/teardowns/` → `/teardowns/[slug]`
- `content/projects/` → `/projects/[slug]`
- `content/writings/` → `/writings/[slug]`

PDFs for writing decks go in `public/pdfs/`. Intro audio is in `public/audio/`.

## Deploy to GitHub + Vercel

This is an App Router Next.js app (server-rendered MDX). Host it on Vercel from GitHub — GitHub Pages is not a fit without a static export.

1. Push this repo to GitHub (public or private).
2. At [vercel.com/new](https://vercel.com/new), import the repo. Framework preset: **Next.js**.
3. Add env vars from `.env.example`. After the first deploy, set `NEXT_PUBLIC_SITE_URL` to the production URL (for example `https://your-project.vercel.app`) and redeploy so sitemap, robots, and Open Graph URLs are correct.
4. Optional: attach a custom domain in the Vercel project settings.

If `NEXT_PUBLIC_SITE_URL` is unset, the app falls back to Vercel’s project URL at build time.
