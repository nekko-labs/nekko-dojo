---
status: draft
last-updated: 2026-06-25
owner: Philip
---

# Spec — Nekko Dojo

> **This is the source of truth for the project.** It describes *what* we're building and *why* — vision, users, journeys, the feature set, and what success looks like. It is **not** about stack or technical design (that's `TASKS.md`). It is a **living artifact**: every prompt that adds or changes a feature updates this file so it always describes the system as it actually is and intends to be.

## Vision

A learning/content platform ("dojo" = training hall) where Philip shares director-level engineering and AI-career perspective, a step-by-step guide for switching into software development (especially for people in Japan coming from English teaching), and a curated directory of real-world OSS projects/communities to gain professional team experience — funneling into the Nekko Labs Discord.

The feel is focused, editorial, and dev-credible: a calm "training hall" for people serious about changing or growing their engineering careers.

## Why It Exists

There's a large, motivated population — especially English teachers and other career-changers in Japan — who want to break into software development but lack (a) a trustworthy, experience-backed roadmap and (b) a path to *real* team experience beyond solo toy projects. Separately, the AI shift is rapidly changing what it means to be a valuable engineer, and there's little senior/director-level perspective written for people navigating that change.

Philip has both: a proven course/workflow that has helped many people switch careers (Findadoc has helped 225+ engineers learn, several landing jobs), and 10+ years culminating in principal/director-level experience. Nekko Dojo packages that into an opinionated, experience-backed resource — not an exhaustive tutorial farm.

## Who It's For

1. **Career-changers in Japan** (primary) — often English teachers wanting to move into software development. Need a concrete, sequenced path and real-world experience.
2. **Early/mid-career engineers** — want senior perspective on growth, navigating the AI shift, and what to learn next.
3. **Aspiring open-source contributors** — looking for welcoming, real projects/communities (esp. in Japan) to gain team experience.

## User Journeys & Experiences

1. **Career-changer path:** Home → Guide overview → start chapter 1 → progress chapter-to-chapter via prev/next → Community (apply learning to a real project) → Discord for help and accountability.
2. **Reader/subscriber path:** Home → Articles → read an essay → Discord CTA at the footer.
3. **Contributor path:** Home/Community → pick a project (e.g. findadoc.jp) → external link out + "join Discord for help".

Interacting with the site should feel like reading a trusted senior engineer's notes: generous reading width for long-form content, clean typography, syntax-highlighted code, and a recurring, low-pressure nudge toward the community.

## What Success Looks Like

- Guide completion / chapter progression (readers moving through chapters)
- Discord joins attributed to the site
- Clickthroughs to featured projects/communities (findadoc.jp, Nekko OSS)
- Article readership and returning visitors
- Qualitative: career-changers reporting they landed roles / made first OSS contributions

## Feature Set

The living catalog of capabilities, grouped by the four pillars. Mark each `[shipped]` / `[in progress]` / `[planned]`.

### Articles
Philip's essays on tech, AI, and career growth from a director/principal vantage point, including how the market is shifting with AI. *Why:* builds trust/audience and differentiates with senior perspective.

- Article index with cards (title, date, tags, excerpt) `[shipped]` — 2 sample essays seeded
- Article reading page: prose, heading TOC anchors, author, Discord CTA footer `[shipped]`
- Running brain-dump of article ideas (`article-topics.md`) feeding the pipeline `[in progress]`

### The Guide (flagship)
A structured, multi-chapter guide expanding Philip's existing course/workflow for switching into software development in Japan. *Why:* the core value proposition and the main reason people will share the site.

- Guide overview / TOC, chapters grouped by section, "start here" `[shipped]`
- Chapter reading page with prev/next navigation `[shipped]`
- **12 chapters imported from Philip's course doc**, in his voice, preserving specifics (links, the TODO-app philosophy, exact stack recs, DS&A + architecture interview prep, the S/A/B-F company tier list, Google exploding-offers note, practice questions). Sections: Getting Started → Foundations → Building Real Things → Interview Prep → Landing the Job → Practice `[shipped]`
- Fill remaining source-doc TODOs (Supabase signup link, git guide link, a walkthrough) `[planned]`

### Community & Projects
A curated directory of OSS projects and communities (starting with findadoc.jp and the Nekko Labs OSS community) where learners contribute to real teams. *Why:* bridges the gap between learning and employable, collaborative experience.

- Directory page rendering typed community/project data `[shipped]` — findadoc.jp, Nekko OSS, Nekko Notes featured
- Filter by type / location `[in progress]`
- Skills directory with community feedback (skill votes + feedback, Supabase-backed) `[shipped]`
- Expand beyond findadoc.jp + Nekko OSS to more Japan-focused projects/communities `[planned]`

### Discord
A persistent CTA throughout the site to join the Nekko Labs Discord community. *Why:* converts readers into an engaged community and support network.

- Reusable Discord CTA block used on home, article/chapter footers, and community `[shipped]`
- Wire the real Discord invite URL (`NEXT_PUBLIC_DISCORD_URL` — currently a placeholder) `[planned]`

### Cross-cutting
- Home page: orient + route to all four pillars, hero, four-pillar cards, latest articles, Discord CTA `[shipped]`
- 404 page `[shipped]`
- PostHog analytics `[shipped]`
- Newsletter / email capture for new articles `[planned]`

## Scope Boundaries

This project is NOT:
- A full LMS with accounts, quizzes, or progress tracking (at least initially — content-first)
- A job board or recruiting platform
- The Nekko Labs corporate site (that's `nekko-labs-website`; Dojo is a subpath but a distinct property)
- A general dev tutorial farm — content is opinionated and experience-backed, not exhaustive reference

## Open Questions

- Discord invite URL still needs to be set (`NEXT_PUBLIC_DISCORD_URL`).
- Coordination with `nekko-labs-website` for the `/dojo` subpath routing/rewrite and shared brand.
- Travis brand/visual pass — v1 ships a re-skinnable default theme, not a final brand spec.
- Hosting decision (Vercel vs same host as main site, separate project) + CI.
- Dependencies still open: importing remaining Guide source TODOs; expanding the Community directory.
