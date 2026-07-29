---
status: draft
last-updated: 2026-07-19
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
- **Communities data (`data/communities.ts`)**: typed array of curated projects/communities (structured data, not prose). Card content (description/overview) is fetched server-side from each project's README via `lib/github-readme.ts` (`## Overview` section or first prose paragraph, cached 1h, no token), with the typed array staying as the curation/ordering layer and build-safe fallback.
- **Helpful tools (`lib/vaizer-skills.ts`)**: a Community-page section fed by Vaizer's public skills catalog API (`/api/skills`, JSON), fetched server-side and cached 1h with a static two-entry fallback; each card links out to the skill's page on vaizer.app. No local skills data returns to Dojo (that stays in Vaizer).
- **Course registry (`data/courses.ts`)** — typed list of courses (id, href, status `live` / `coming-soon`, pitch, audience, belt, mascot) plus the Applied AI Engineer syllabus data (role-shift rows, modules, what still matters). Consumed by `/courses`, the AI course page, and the `/guide` next-course teaser, so a course's copy and status live in exactly one place.
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
- `/courses` — hub listing every course; `/courses/applied-ai-engineer` — course-two teaser (no chapters yet)
- `/guide` — course one overview/TOC; `/guide/[slug]` — chapter (prev/next nav). Kept at `/guide`, not moved under `/courses`, so existing links and shares stay valid.
- `/community` — projects + communities directory
- All served at the domain root of `dojo.nekkolabs.com` (no basePath).

## Integrations & APIs

- **Supabase** — skill votes + feedback (`/api/vote`, `/api/feedback`, schema in `supabase/schema.sql`).
- **PostHog** — analytics.
- **Nekko Labs Discord** — invite-link CTA.
- **Vaizer skills catalog API**: Dojo's Helpful tools section consumes Vaizer's public catalog endpoint (JSON: name, slug, description, trust tier, link). Tracked on the Vaizer side in `code/vaizer/TASKS.md`.
- **GitHub README fetch** (`lib/github-readme.ts`): community project cards source their content from each repo's public README (raw fetch, cached, no token).
- External links out to Nekko Labs OSS repos/community and other Japan-origin OSS projects.
- Cloudflare — DNS record for the `dojo.nekkolabs.com` subdomain pointing at Vercel.

## Infrastructure & Deployment

- **Hosting:** standalone deploy on Vercel (nekkolabs team, project `nekko-dojo`). Served at its own subdomain `dojo.nekkolabs.com` (DNS via Cloudflare → Vercel).
- **Build:** `next build`; statically rendered where possible (`generateStaticParams` for articles/guide). Latest verified build prerenders ~21 routes.
- **CI/CD:** TODO — match Nekko repo conventions (GitHub Actions).
- **Env:** `NEXT_PUBLIC_DISCORD_URL`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_VAIZER_URL` (defaults to `https://vaizer.app`; plus Supabase/PostHog keys). Provide sensible fallbacks so the site builds without env set.

## Design System & UI/UX

**Design direction:** a focused, editorial, dev-credible feel — clean typography, generous reading width for long-form content, and a calm "training hall" vibe. Dark-mode-friendly. The brand is Nekko ("cat" / ネコ) Labs, so the dojo can lean into a subtle, tasteful cat/dojo motif without being gimmicky.

> Travis owns final marketing/visual voice. The current implementation ships a sensible default theme (Tailwind v4 tokens) intended to be re-skinned, not a final brand spec.

**Theme tokens (v1 defaults)** — Tailwind v4 `@theme` CSS variables in `app/globals.css`:
- **Background:** near-black in dark, warm off-white in light
- **Accent:** a single brand accent (currently indigo/violet) for links, CTAs, active nav
- **Prose:** one reading measure that widens on desktop with the reading type size (`--measure` / `--prose-size`, see STYLESEED 2.2), heading scale in `em` so it rides that size, code blocks via shiki
- **Font:** system UI stack for v1 (swap to a brand font later)

**Page inventory:**

| Route | Purpose | Key elements |
|---|---|---|
| `/` | Orient + route to pillars | Hero, four-pillar cards, latest articles, Discord CTA |
| `/articles` | Browse essays | Article cards (title, date, tags, excerpt) |
| `/articles/[slug]` | Read an essay | Prose, headings TOC anchors, author, Discord CTA footer |
| `/courses` | Choose a path | "What do you want to learn?" + the two answers side by side as borderless `CourseChoice` panels (mascot, glow, outcome headline, course, belt, status); pointing at one dims the other |
| `/guide` | Course one overview | Course header (track, outcome headline, mascot, `BeltStrip`) + `LearningPath`: chapters as numbered stops on a scroll-inked rail, "New moves" per stage, belt rank-ups, finish flag, next-course teaser |
| `/courses/applied-ai-engineer` | Course two overview (coming soon) | Same header + `LearningPath` shape as `/guide`, six stages with dan grades and no stops yet; role-shift table, harness callout, what still matters, link back to course one, Discord CTA |
| `/guide/[slug]` | Read a chapter | Prose, prev/next chapter nav, progress context |
| `/community` | Discover real projects + tools | Featured projects (Kotrain, Nekko OSS; README-sourced cards), filter by type/location, Helpful tools (Vaizer-fed skills), Discord CTA |

**Components:** `SiteHeader` (logo/wordmark, themed nav icons, Discord button; `NavLink` marks the current section with `aria-current`), `SiteFooter` (links, Discord, Nekko Labs attribution), `DiscordCTA` (reusable), `ArticleCard`, `ProjectCard`, `SkillVote`, `SkillFeedback`, `CourseChoice` (one answer on the `/courses` chooser), `LearningPath` + `BeltStrip` (the walked course path and its rank strip, shared by both courses).

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

## Backlog / Planned

- [ ] **T3** — Fill remaining Guide source-doc TODOs (Supabase signup link, git guide link, the missing walkthrough) with real content. See `features/initial-scaffold`. · [spec](SPEC.md#the-guide-flagship) · Added: 2026-06-29
- [ ] **T4** — Expand the Community directory beyond Nekko OSS + Nekko Notes (more Japan-focused OSS projects/communities). → feature `community-directory-expansion`. · [spec](SPEC.md#community--projects) · Added: 2026-06-29
- [ ] **T5** — Add the `dojo` CNAME in Cloudflare pointing `dojo.nekkolabs.com` at Vercel, then verify the domain resolves. (Superseded the earlier `/dojo` subpath-rewrite plan.) · Added: 2026-06-29 · Updated: 2026-07-07
- [ ] **T6** — Decide hosting (Vercel vs same host as main site, separate project) and stand up CI/CD (GitHub Actions, match Nekko conventions). · Added: 2026-06-29
- [~] **T7** — Travis brand/visual pass over the v1 default theme. → feature `brand-pass`. The *rules* half is locked in `STYLESEED.md` (palette/type/shape/icon/motion/a11y rules + the token layer they bind to); the marketing/visual voice pass (illustration, wordmark, photography) is still Travis'. · Added: 2026-06-29 · Updated: 2026-07-25
- [ ] **T8** — Optional newsletter / email capture for new articles. → feature `newsletter-capture`. · [spec](SPEC.md#cross-cutting) · Added: 2026-06-29
- [ ] **T9** — Publish new articles from the `article-topics.md` brain-dump pipeline. · [spec](SPEC.md#articles) · Added: 2026-06-29

- [ ] **T32** — Write the Applied AI Engineer chapters (`content/courses/applied-ai-engineer/`), reusing the guide content layer + `LearningPath` rendering (drop each stage's `body` and hand it real `stops` as chapters land, keeping the dan-grade ranks), and flip the course status from `coming-soon` to `live` in `src/data/courses.ts`. · [spec](SPEC.md#applied-ai-engineer-course-two) · Added: 2026-07-26 · Updated: 2026-07-30
- [ ] **T34** — Audit mascot/art intrinsic dimensions site-wide. Several `next/image` calls declare `width={480} height={360}` for mascots whose real PNGs are different shapes (kamae 767×1000, men 599×1000, walk 761×1000, sensei 1463×1200), so the reserved box is the wrong ratio and the image reflows on load (home "Where are you now?" stages, and anywhere else the cats appear). Pass the true dimensions (as `src/data/courses.ts` now does) or size by height in a fixed slot. · Added: 2026-07-30

## Shipped

- [x] **T38**: Header nav themed motion + icons. Primary nav sections carry icons from the dojo world (`ScrollIcon` kakejiku for Articles, `ToriiIcon` for Courses, `PawIcon` for Community, mapped once in `NAV_ICONS` in `icons.tsx` so desktop and mobile never drift), each taking a quick bow on hover/focus. The new `NavLink` client component marks the current section `aria-current="page"`, which the CSS dresses as a 2px amber belt tied under the pill plus an accent icon (mobile list items get the `--accent-soft` wash instead). The dojo logo hops on hover with the same spring curve as the torii feet, the Discord mark wiggles on the CTA, the mobile toggle is now one SVG whose three lines fold into a cross instead of an icon swap, and the menu panel drops in with a short per-item stagger. The inline nav moved from `sm` to `md`: the wordmark was already wrapping at 640-767px before this change, and icon+label pills need the room, so the mobile menu (which shows the same icons) serves that band; the wordmark is `whitespace-nowrap` with slightly tighter md spacing so 768px holds one line. All new motion is hand-rolled CSS with a `prefers-reduced-motion` block dropping it to fades or nothing (STYLESEED 5.2), icons are `icons.tsx` SVGs (4.1), colours come from tokens (1.2). `tsc` clean, `next build` green, verified in-browser at 375/640/767/768px and desktop: no horizontal overflow, one-line wordmark, dialog a11y intact (focus trap, inert background, scroll lock, focus return). · [spec](SPEC.md#motion) · Done: 2026-07-30
- [x] **T36**: `/articles` modernized into a browsing experience + footer revamp. The content layer now derives a `hero` per article (`ArticleHero` in `lib/content.ts`: frontmatter `hero`/`heroAlt`, else the first local `<img>` in the body), consumed three ways: `ArticleCover.tsx` renders the photo (or, for articles without one, a deterministic slug-hashed "dusk cover": glow-token wash, seigaiha SVG pattern, oversized type monogram); the article page's OpenGraph/Twitter images use the hero over the logo; and the new `ArticleExplorer.tsx` (client) drives the index: newest article as a featured spread (`border-accent/50` per STYLESEED 3.3, "Latest" chip in `accent-soft`/`accent-line`), recurring-topic chips reusing the CommunityDirectory chip grammar (`aria-pressed`, counts, single-use tags stay on cards, instant re-filter via `StaggerItem instant`, `aria-live` result count per 6.5), and the `ArticleCard` grid rebuilt around 16:9 covers with a stretched-link click target and `motion-safe` hover zoom. `SiteFooter.tsx` drops the emoji nav pills (4.1 violation) for a brand block + Discord CTA button (reusing `DiscordCTA variant="button"`), Explore/Community link columns with `icons.tsx` SVGs and sr-only new-tab notes (6.3), and the `nekko-walk` mascot strolling on the legal strip's border. `tsc` clean, `next build` prerenders all routes, detector zero findings, verified at 1280 + 375: chips filter correctly, AA contrast (muted 5.31:1, active chip 6.17:1), no horizontal overflow. · [spec](SPEC.md#articles) · Done: 2026-07-30
- [x] **T35** — Reading pages use the desktop screen: `--measure` moved from `68ch` to rem (36.5rem) and now steps up with a new `--prose-size` token (42rem / 1.125rem at `lg`, 44rem at `xl`), so an article body goes from 583px to 704px at 1440px and the 281px hole between the text and the sticky TOC closes to 144px. rem instead of `ch` because the two consumers of the token sit at different font sizes, and `ch` resolved ~34px narrower on the 1rem furniture than on the prose (header and body now measure the same 704px). Prose heading scale moved to `em` so h2/h3/h4 ride the reading size rather than drifting toward it (an h4 at `1.1rem` would have rendered *smaller* than an 18px body). Both reading routes also picked up the rule 3.1 page padding (`px-5 sm:px-8`, they were on `px-4 sm:px-6`). STYLESEED 2.2 (locked) rewritten to match. Verified in-browser at 1440/1024/768/375: line length 78→89 characters at the widest step, header + body + chapter nav + CTA all one width, tablet and phone unchanged at 584px/17px, no horizontal overflow, code blocks and figures still inside the column, no console errors; `tsc` clean and `next build` prerenders every route. · [spec](SPEC.md#cross-cutting) · Done: 2026-07-30
- [x] **T37**: Community directory caught up with its projects, and every project card now leads with a graphic. **Renames:** Nekko MCP → **Hypergate** (`nekko-labs/hypergate`, hypergate.app, now a TypeScript daemon plus a Rust shell) and Nekko Journal → **Getsu** (`nekko-labs/getsu`); both had been showing the old name over README copy that GitHub was already redirecting to the renamed repo. Kotrain gained its kotrain.com website link, and the guide chapter *Get Involved in the Community* swapped the retired "Nekko Notes" for Kotrain (Lightwrite, its successor, is a private repo and deliberately stays off a page about repos you can contribute to). Getsu links its live Vercel URL with a comment to swap in getsu.app when that DNS lands. **Graphics:** new optional `art` on `Project` (`{src, alt}`) rendered by `ProjectCard` as a 16:9 `next/image` banner above the padded card body (card is now `overflow-hidden` with the padding moved inward), fed by `public/projects/*.webp`: one 880×495 shot of each project's own site, captured at 1440×900@2x and cropped to the hero (10–32KB each, ~180KB total). **Cleanup:** dropped the dead `getFeaturedProjects()` export (the home page surfaces `TrainTogether`, not featured projects) and the stale "surfaces it on the home page" comment, and fixed `vaizer.com` → `vaizer.app` in the spec. `tsc` clean, clean `next build`, verified in-browser at 1440 and 390: all seven cards render their graphic, no console errors, no layout shift. · [spec](SPEC.md#community--projects) · Done: 2026-07-30
- [x] **T33**: `/courses` is a chooser, both courses walk one path, and the Discord mark is fixed. Three pieces: **(1) the chooser** — `/courses` now asks "What do you want to learn?" and answers side by side (`sm:grid-cols-2`, `items-stretch`) with *Become an expert in coding* (classic way → The Guide) and *Learn the new Agentic Coding way* (agentic way → Applied AI Engineer). `CourseCard` → `CourseChoice`: borderless panels carried by a surface wash plus a per-course glow token (`--glow-amber` / `--glow-violet`), a fixed bottom-aligned mascot slot so a portrait cat and a landscape cat leave the copy on the same line, and `.choice` / `.chooser` states in `globals.css` that lift the panel, brighten the glow, draw an accent rule under the answer and dim the sibling via `:has()`, identically for hover and `:focus-visible`, with a reduced-motion block that keeps the dimming and drops the movement. New `answer` / `track` / `pitch` / `glow` fields on `Course`. **(2) One path for both courses** — `GuidePath` generalised into `LearningPath` (stages with optional `stops`, `body`, moves and belt, plus a configurable finish line) and a `BeltStrip` for course headers; `/guide` and `/courses/applied-ai-engineer` now share the rail, gates, "New moves" chips, rank-ups, finish stop, header shape and `max-w-3xl` measure. The AI course's six modules became six stages with dan grades (shodan/nidan/sandan, since it starts at black belt), an honest "lessons are being written" line, and a panel pointing back at the other path. **(3) Discord icon** — `DiscordIcon`'s path was a hand-approximated redraw whose bbox ran x 2.46→26.44 inside a `0 0 24 24` viewBox, so the mark was clipped and off-centre in the header, mobile nav, footer, and every Discord CTA; replaced with the official path (bbox x 0→24), verified in-browser on all instances. Also gave the chooser mascots their true intrinsic dimensions (the shared `480×360` was wrong for every cat) so nothing shifts on load. `tsc` clean, clean `next build` prerenders all 32 routes, verified in-browser at 1280 and 375: panels align (equal 681px height, headlines and CTAs on the same baseline), no horizontal overflow, hover/dim states confirmed against computed styles. STYLESEED deviations for the borderless panels and the violet glow recorded in that file. · [spec](SPEC.md#courses) · Done: 2026-07-30
- [x] **T31**: Second course shipped as a coming-soon destination. `src/data/courses.ts` is the new typed course registry (The Guide `live`, Applied AI Engineer `coming-soon`) plus the AI course's role-shift rows, six modules, and the still-matters / stopped-mattering lists. New `/courses` hub (`CourseCard.tsx`, alternating sides, mascot + rank belt + status chip) and `/courses/applied-ai-engineer` teaser page (role shift, harness-development callout, curriculum with outcome chips, what still matters, prereqs back to The Guide, Discord CTA). Nav `The Guide` → `Courses` (header, mobile, footer glyph), `/guide` gains a `← Courses` crumb and a "Next course" teaser at the foot of the path, and the home page's black-belt stage now points at the AI course instead of `/articles`. Built against `STYLESEED.md`: the accent callout mix is now two semantic tokens (`--accent-soft`, `--accent-line`, exposed as `bg-accent-soft` / `border-accent-line`) instead of a per-screen `color-mix` (1.2/1.3), which also de-duplicates the inline mix that was already in `GuidePath`; radii stay `rounded-2xl` / `rounded-full` (3.2); and no emoji appear inside interactive controls (4.1), so a course carries a mascot and rank belt rather than a glyph. `tsc` clean, `next build` prerenders both routes, verified in-browser at desktop and 375px: no console errors, no horizontal overflow, no inline colour styles, every decorative emoji `aria-hidden`. · [spec](SPEC.md#applied-ai-engineer-course-two) · Done: 2026-07-26
- [x] **T2** — Community & Projects directory is filterable by type (Projects / Networking / Job boards / Companies) and location (Anywhere / Japan / Global): `CommunityDirectory.tsx` filters server-loaded data client-side, with per-type counts, a polite live result count, an empty state, and "Clear filters". Helpful tools stays unfiltered below it. · [spec](SPEC.md#community--projects) · Done: 2026-07-25
- [x] **T28** — `MobileNav` is a real modal: `role="dialog"` + `aria-modal`, Escape to close, Tab trapped in the panel, focus moved in on open and returned to the toggle on close, background (`#main`, footer, glow layer) `inert` + `aria-hidden`, body scroll locked, and a tap-off scrim. · Done: 2026-07-25
- [x] **T29** — Reading upgrade on `/guide/[slug]` and `/articles/[slug]`: single `--measure` token for the text column and its furniture, prose microtypography (hyphenation limits, kerning/ligatures, hanging punctuation, pretty/balanced wrapping, orphan+widow control), a sticky scroll-spy table of contents on large screens (`lib/toc.ts` shares `github-slugger` with `rehype-slug`, so ids always match), and a reading-progress hairline. · Done: 2026-07-25
- [x] **T30** — MDX rendering has designed failure surfaces: `Mdx` catches compile errors and renders `ContentNotice` (keeping nav/CTA usable), an empty body renders a "still being written" state, and both reading routes have `error.tsx` boundaries (`ReadingErrorBoundary`) with retry + a way back. · Done: 2026-07-25
- [x] **T23**: Reworked `/guide` into the interactive dojo path: `GuidePath.tsx` (client) renders chapters as numbered stops on a dotted rail that inks itself in accent on scroll (`useScroll` + scaleY, fully inked under reduced motion), section gates with stage counters, "New moves unlocked" chip callouts per section (`src/data/guide-path.ts`), belt rank-ups (white/green/brown/black) with the home page's spring settle, and a finish-flag stop. · [spec](SPEC.md#the-guide-flagship) · Done: 2026-07-19
- [x] **T24**: Replaced the free-live-interview-practice pitch with the "Interview practice, incoming" teaser (we're building a dedicated tool; Discord hears first) in `TrainTogether.tsx`, the community benefits list, and the community meta description. · [spec](SPEC.md#community--projects) · Done: 2026-07-19
- [x] **T25**: Kotrain replaces Open Paw (`communities.ts`, TrainTogether, community copy, and the spec-driven-development article's tool recommendation), and project cards now auto-import their description from each repo's README via `lib/github-readme.ts` (Overview section or first prose paragraph, cached 1h, typed data as fallback). Verified live: Kotrain and Misskey cards render their README prose. · [spec](SPEC.md#community--projects) · Done: 2026-07-19
- [x] **T26**: Kotrain's README restructured upstream with a clean `## Overview` section + fixed tagline (kotrain PR #89), generic and importer-agnostic. · [spec](SPEC.md#community--projects) · Done: 2026-07-19
- [x] **T27**: "Helpful tools" section live on `/community` after Projects: `lib/vaizer-skills.ts` pulls Vaizer's `/api/skills` (cached 1h, static Resume Checker + Impeccable fallback when unreachable), LinkTile cards with trust-tier badges ("Curated · by Paul Bakaus" for third-party), nav pill added. Verified pulling all 7 live catalog entries from vaizer.app. · [spec](SPEC.md#helpful-tools) · Done: 2026-07-19
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
