# Nekko Dojo 🐱⛩️

A learning / content platform from [Nekko Labs](https://nekkolabs.com). Three things in one place:

1. **Articles** — director-level perspective on engineering, AI, and growing a career as the market shifts.
2. **The Guide** — a step-by-step path for switching into software development (especially for career-changers in Japan).
3. **Community & Projects** — curated open-source projects and communities (starting with [findadoc.jp](https://findadoc.jp) and the Nekko Labs OSS community) where you gain *real* team experience.

…all funneling into the **Nekko Labs Discord**.

Served in production at **dojo.nekkolabs.com** (standalone app on its own subdomain).

## Stack

- Next.js (App Router) + React 19 + TypeScript (strict)
- Tailwind CSS v4 (CSS-first theme tokens)
- Content: **MDX in-repo** — `next-mdx-remote` (RSC) + `gray-matter` + `rehype-pretty-code`/shiki
- npm, Node 20+

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build     # production build
npm run start     # serve the production build
npm run typecheck # tsc --noEmit
```

## Project structure

```
content/
  articles/        # *.mdx essays (frontmatter: title, description, date, tags, author)
  guide/           # NN-*.mdx chapters (ordered by filename prefix + `order`)
src/
  app/             # App Router routes (home + articles, guide, community)
  components/       # SiteHeader, SiteFooter, DiscordCTA, ArticleCard, ProjectCard
  data/            # communities.ts — curated projects/communities (typed)
  lib/             # content.ts (MDX loaders), mdx.ts (compile config), site.ts (config)
  mdx-components.tsx
```

## Authoring content

- **New article:** add `content/articles/my-slug.mdx` with frontmatter. It appears on `/articles` automatically.
- **New guide chapter:** add `content/guide/NN-my-slug.mdx`; the `NN-` prefix sets order.
- Frontmatter shapes are defined in `src/lib/content.ts` — update the types there when adding fields.

## Configuration

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_DISCORD_URL` — Discord invite link (CTA target)
- `NEXT_PUBLIC_SITE_URL` — absolute site URL for metadata (default `https://dojo.nekkolabs.com`)

## Deployment

Deployed as its own app on Vercel and served at its own subdomain, `dojo.nekkolabs.com` (DNS via Cloudflare → Vercel). No basePath — the app lives at the domain root.
