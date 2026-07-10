---
status: draft
last-updated: 2026-07-10
owner: Philip
---

# Execution Plan — Nekko Dojo

> Converted from executionplan.md on 2026-06-29. ✅ = done per the prior plan; Part 1 below is the technical plan, Part 2 is the task checklist.

> **The plan + the build log, in one file.** The top half (Part 1) is the technical plan — how we build what `SPEC.md` describes. The bottom half (Part 2) is the task list — Now / Backlog / Shipped, recording how past features were built and how future ones will be. (Merged from the former `plan.md` + `tasks.md`.)

---

# Part 1 — Plan (how we build it)

> The **technical plan**: how we build what `SPEC.md` describes. Stack, architecture, data model, conventions, design system, and constraints. Update this whenever the technical approach changes. (Absorbs the old `architecture.md`, `coding-rules.md`, and `ui-ux-design.md`.)

## Stack

- **Next.js (App Router)** — Next.js 15.5 + React 19. React Server Components by default; `"use client"` only when interactivity is needed.
- **TypeScript strict.** No `any` in content schemas.
- **Tailwind CSS v4** — CSS-first config via `@theme` in `globals.css`. Prefer tokens/utilities over ad-hoc inline styles.
- **Content / MDX:** `next-mdx-remote` (RSC) + `gray-matter` (frontmatter) + `shiki` / `rehype-pretty-code` (syntax highlighting), plus `remark-gfm`, `rehype-slug`, `rehype-autolink-headings`.
- **Backend bits:** Supabase (skill votes + feedback via `/api/vote`, `/api/feedback`, `supabase/schema.sql`); PostHog analytics.
- **Animation:** the `motion` library (motion.dev, imported from `motion/react`). Reusable client primitives (`Reveal`, `Stagger`, `StaggerItem`, `MotionProvider`) live in `src/components/motion.tsx`; pages stay server components and compose them via children. All motion is once-only, opacity/transform only, and reduced-motion aware.
- **Package manager: npm** (matches `nekko-notes`, `open-paw`), Node 20+. Lockfile is `package-lock.json`. This overrides the global pnpm default — do not relitigate.
- Served at `dojo.nekkolabs.com` on its own subdomain (separate, standalone deploy; no basePath).

## Architecture Overview

Nekko Dojo is a statically-renderable Next.js (App Router) content site. Content is authored as **MDX files in the repo** and compiled at request/build time; there is no CMS in v1 (Supabase backs only the skill votes/feedback). It deploys as a **standalone app** served at its own subdomain `dojo.nekkolabs.com` (DNS via Cloudflare → Vercel), living at the domain root.

```
content/ (MDX + data)  ──►  lib/content.ts (load + parse)  ──►  App Router pages (RSC)  ──►  static HTML
                                     │
                                     └─ next-mdx-remote (RSC) + gray-matter + shiki
```

Component breakdown:
- **Content layer (`lib/content.ts`)** — reads MDX from `content/articles` and `content/guide`, parses frontmatter with `gray-matter`, returns typed metadata + sorted lists. Single source of truth for content access.
- **MDX rendering (`mdx-components.tsx` + `next-mdx-remote/rsc`, helpers in `lib/mdx.ts`)** — compiles MDX bodies in server components with the remark/rehype plugin chain above.
- **Communities data (`data/communities.ts`)** — typed array of curated projects/communities (structured data, not prose). Skills directory in `src/data/skills.ts`.
- **Site config (`lib/site.ts`)** — nav, Discord URL, metadata, social links.
- **UI components (`components/`)** — header, footer, Discord CTA, article card, project card, `SkillVote` / `SkillFeedback`.
- **API routes** — `/api/vote`, `/api/feedback` (Supabase-backed).
- **Pages (`app/`)** — home + the four pillars.

App code lives at `C:/Users/phili/code/nekko-dojo` (top-level repo, NOT inside obsurdian; a separate agent owns it). GitHub: `git@github.com:nekko-labs/nekko-dojo.git` (internal).

## Data Model

No primary content store — "data" is the content tree (Supabase only holds skill votes/feedback):

- **Article** (frontmatter): `title`, `description`, `date`, `tags[]`, `author`, `draft?`, `readingTime?` (derived).
- **GuideChapter** (frontmatter): `title`, `description`, `order` (also encoded in `NN-` filename prefix), `section?`, `draft?`.
- **Community/Project** (typed object): `name`, `url`, `description`, `type` (`oss-project` | `community`), `location` (e.g. `Japan` | `Global`), `tags[]`, `goodFirstIssue?`, `featured?`.

Frontmatter shapes are defined and validated in `lib/content.ts` — update the types there when adding fields; don't read frontmatter ad-hoc in pages.

Routing:
- `/` — home (intro + entry points to all pillars + Discord CTA)
- `/articles` — index; `/articles/[slug]` — article
- `/guide` — overview/TOC; `/guide/[slug]` — chapter (prev/next nav)
- `/community` — projects + communities directory
- All served at the domain root of `dojo.nekkolabs.com` (no basePath).

## Integrations & APIs

- **Supabase** — skill votes + feedback (`/api/vote`, `/api/feedback`, schema in `supabase/schema.sql`).
- **PostHog** — analytics.
- **Nekko Labs Discord** — invite-link CTA.
- External links out to Nekko Labs OSS repos/community and other Japan-origin OSS projects.
- Cloudflare — DNS record for the `dojo.nekkolabs.com` subdomain pointing at Vercel.

## Infrastructure & Deployment

- **Hosting:** standalone deploy on Vercel (nekkolabs team, project `nekko-dojo`). Served at its own subdomain `dojo.nekkolabs.com` (DNS via Cloudflare → Vercel).
- **Build:** `next build`; statically rendered where possible (`generateStaticParams` for articles/guide). Latest verified build prerenders ~21 routes.
- **CI/CD:** TODO — match Nekko repo conventions (GitHub Actions).
- **Env:** `NEXT_PUBLIC_DISCORD_URL`, `NEXT_PUBLIC_SITE_URL` (plus Supabase/PostHog keys). Provide sensible fallbacks so the site builds without env set.

## Design System & UI/UX

**Design direction:** a focused, editorial, dev-credible feel — clean typography, generous reading width for long-form content, and a calm "training hall" vibe. Dark-mode-friendly. The brand is Nekko ("cat" / ネコ) Labs, so the dojo can lean into a subtle, tasteful cat/dojo motif without being gimmicky.

> Travis owns final marketing/visual voice. The current implementation ships a sensible default theme (Tailwind v4 tokens) intended to be re-skinned, not a final brand spec.

**Theme tokens (v1 defaults)** — Tailwind v4 `@theme` CSS variables in `app/globals.css`:
- **Background:** near-black in dark, warm off-white in light
- **Accent:** a single brand accent (currently indigo/violet) for links, CTAs, active nav
- **Prose:** comfortable measure (~68ch), clear heading scale, code blocks via shiki
- **Font:** system UI stack for v1 (swap to a brand font later)

**Page inventory:**

| Route | Purpose | Key elements |
|---|---|---|
| `/` | Orient + route to pillars | Hero, four-pillar cards, latest articles, Discord CTA |
| `/articles` | Browse essays | Article cards (title, date, tags, excerpt) |
| `/articles/[slug]` | Read an essay | Prose, headings TOC anchors, author, Discord CTA footer |
| `/guide` | Guide overview / TOC | Intro, ordered chapter list grouped by section, "start here" |
| `/guide/[slug]` | Read a chapter | Prose, prev/next chapter nav, progress context |
| `/community` | Discover real projects | Featured projects (Open Paw, Nekko OSS), filter by type/location, Discord CTA |

**Components:** `SiteHeader` (logo/wordmark, nav, Discord button), `SiteFooter` (links, Discord, Nekko Labs attribution), `DiscordCTA` (reusable), `ArticleCard`, `ProjectCard`, `SkillVote`, `SkillFeedback`.

**Accessibility:** semantic headings; skip-to-content; visible focus states; AA color contrast for text/accent on both themes; all external links labelled with `rel="noopener"` on `target="_blank"`; reading width capped; respects `prefers-reduced-motion`.

## Coding Conventions

Extends `../../knowledgebase/principles/coding.md` (these deltas override it).

- **Content:** all content lives under `content/` as MDX; communities are typed data under `data/`. Guide chapters use a `NN-` filename prefix to define order; keep it in sync with the `order` frontmatter. Article/guide slugs derive from the filename (sans `.mdx`, and sans the `NN-` prefix for guide).
- **Routing / deploy:** the app is served at the root of its own subdomain (`dojo.nekkolabs.com`), no basePath. Use Next `<Link href="/articles">` for internal links and the `lib/site.ts` `site.url` for absolute/metadata URLs. External links: `target="_blank"` + `rel="noopener noreferrer"`.
- **Components:** named exports, one component per file, file named to match (default kebab-case filenames). Keep the server/client boundary tight; data loading stays in server components / `lib/`.
- **Env:** public config via `NEXT_PUBLIC_*`; provide sensible fallbacks so the site builds without env set.

## Constraints

- Must build and render without env vars set (fallbacks required).
- No `any` in content schemas; TypeScript strict throughout.
- Color contrast AA on both light and dark themes.
- Independently deployable — Dojo must not depend on the main site at build time; it stands alone on its own subdomain.

## Key Technical Decisions

- **MDX in-repo over CMS (v1):** zero cost, git-versioned, fast DX for a solo/small team; the content layer (`lib/content.ts`) is abstracted so a CMS could replace it later without touching pages.
- **Standalone app on its own subdomain (`dojo.nekkolabs.com`):** keeps Dojo independently deployable as a distinct property, DNS pointed at Vercel via Cloudflare.
- **npm (not pnpm):** matches existing Nekko repos despite the global default favoring pnpm.
- **Gotchas (from build):** `next-mdx-remote` `compileMDX` options need `PluggableList`-typed plugin arrays (fixed in `lib/mdx.ts`); stray lockfiles up the tree mis-infer the workspace root → set `outputFileTracingRoot` in `next.config.mjs`. See `memory.md`.

---

# Part 2 — Tasks (what's built and what's next)

> The spec + plan broken into **small, reviewable, independently testable work items**. This is the project-level build checklist; deep features get their own folder under `features/` and are referenced here.

> **Status values**: `[ ]` not-started · `[~]` in-progress · `[x]` done · `[!]` blocked
>
> Keep IDs stable (T1, T2, …) — don't renumber; mark removed tasks `cancelled`. When a task ships, move it to **Shipped** with a one-line note. When the spec gains a feature, add its tasks here.

## Now / In Progress

- [ ] **T1** — Wire the real Discord invite URL (`NEXT_PUBLIC_DISCORD_URL`) across all CTAs; replace the placeholder. · [spec](SPEC.md#discord) · Added: 2026-06-29
- [ ] **T2** — Add type/location filtering to the Community & Projects directory page. · [spec](SPEC.md#community--projects) · Added: 2026-06-29

## Backlog / Planned

- [ ] **T3** — Fill remaining Guide source-doc TODOs (Supabase signup link, git guide link, the missing walkthrough) with real content. See `features/initial-scaffold`. · [spec](SPEC.md#the-guide-flagship) · Added: 2026-06-29
- [ ] **T4** — Expand the Community directory beyond Nekko OSS + Nekko Notes (more Japan-focused OSS projects/communities). → feature `community-directory-expansion`. · [spec](SPEC.md#community--projects) · Added: 2026-06-29
- [ ] **T5** — Add the `dojo` CNAME in Cloudflare pointing `dojo.nekkolabs.com` at Vercel, then verify the domain resolves. (Superseded the earlier `/dojo` subpath-rewrite plan.) · Added: 2026-06-29 · Updated: 2026-07-07
- [ ] **T6** — Decide hosting (Vercel vs same host as main site, separate project) and stand up CI/CD (GitHub Actions, match Nekko conventions). · Added: 2026-06-29
- [ ] **T7** — Travis brand/visual pass over the v1 default theme. → feature `brand-pass`. · Added: 2026-06-29
- [ ] **T8** — Optional newsletter / email capture for new articles. → feature `newsletter-capture`. · [spec](SPEC.md#cross-cutting) · Added: 2026-06-29
- [ ] **T9** — Publish new articles from the `article-topics.md` brain-dump pipeline. · [spec](SPEC.md#articles) · Added: 2026-06-29

## Shipped

- [x] **T10** — Greenfield Next.js scaffold: config, content layer, all four pillars + sample content; `tsc` clean, `next build` prerenders routes, all routes 200. (feature `initial-scaffold`)
- [x] **T11** — Home page: hero, four-pillar cards, latest articles, Discord CTA; plus 404 page. · [spec](SPEC.md#cross-cutting)
- [x] **T12** — Articles pillar: index with cards + reading page (prose, TOC anchors, author, Discord CTA footer); 2 sample essays. · [spec](SPEC.md#articles)
- [x] **T13** — The Guide: overview/TOC grouped by section + chapter reading page with prev/next nav. · [spec](SPEC.md#the-guide-flagship)
- [x] **T14** — Import & expand The Guide to 12 chapters from Philip's course doc, in his voice, preserving all specifics (sections Getting Started → … → Practice). · [spec](SPEC.md#the-guide-flagship)
- [x] **T15** — Community & Projects directory rendering typed data; findadoc.jp + Nekko OSS + Nekko Notes featured. · [spec](SPEC.md#community--projects)
- [x] **T16** — Reusable Discord CTA block on home, article/chapter footers, and community. · [spec](SPEC.md#discord)
- [x] **T17** — Skills directory with community feedback: skill votes + feedback (`/api/vote`, `/api/feedback`, `supabase/schema.sql`, `SkillVote`/`SkillFeedback`, `src/data/skills.ts`). · [spec](SPEC.md#community--projects)
- [x] **T18** — PostHog analytics integrated. · [spec](SPEC.md#cross-cutting)
- [x] **T19** — Initialize git, connect to `nekko-labs/nekko-dojo` (internal), merge remote stub history, push `main`.
- [x] **T20** — Landing polish: footer torii separator reworked so the ink line rises *into* the gate (no beam under it, pillars poke through the lintel); flipped "The path" ahead of "Where are you now?"; reworded the footer blurb around mission + community + learning from experienced leaders. · [spec](SPEC.md#cross-cutting) · Done: 2026-07-10
- [x] **T21** — Removed Find a Doc Japan from the site at the maintainers' request: dropped the directory entry, home/community "ship with real teams" copy, the guide's community bullet, and the article mentions. · [spec](SPEC.md#community--projects) · Done: 2026-07-10
- [x] **T22** - Tasteful scroll/entrance animations site-wide via the `motion` library: `Reveal`/`Stagger`/`StaggerItem` primitives + `MotionProvider` (reduced-motion aware) in `src/components/motion.tsx`; hero and page-header fade-ups, staggered card grids, alternating stage-row slides with soft-spring belts, a scroll-drawn dotted belt path (`StagePath`), instant-on-filter skills grid, and a 2px hover lift on cards. · [spec](SPEC.md#motion) · Done: 2026-07-10
