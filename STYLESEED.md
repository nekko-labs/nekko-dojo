---
status: locked
last-updated: 2026-07-25
owner: Philip
supersedes: TASKS.md#T7 (brand pass — the rules half)
---

# STYLESEED — Nekko Dojo visual rule lock

A [StyleSeed](https://github.com/bitjaru/styleseed)-style rule lock: the design
decisions for Dusk Dojo, written down once so every screen (and every agent
touching this repo) resolves them the same way instead of re-inventing a look
per page. This is the *rules* half of the brand pass; the marketing/visual
voice pass (illustration, photography, wordmark) still belongs to Travis.

Rules are numbered so a review can cite them. **Locked** rules are binding —
changing one is a deliberate edit to this file, in its own PR.

---

## 1. Palette — one dusk, tokens only

- **1.1 (locked)** There is exactly one theme: *Dusk Dojo*. Not light, not
  "dark mode" — an evening-training palette defined in `src/app/globals.css`
  under `:root`. Do not add a light/dark toggle, and do not add a second theme
  without changing this rule.
- **1.2 (locked)** No hardcoded hex, `rgb()` or `rgba()` in `src/**/*.tsx`.
  Colour comes from Tailwind utilities backed by `@theme` (`bg-surface`,
  `text-muted`, `border-border`, `text-accent`, `text-danger`, …) or from
  `var(--token)`. The single exception is a non-colour SVG value such as mask
  luminance (`StagePath`), which must carry a comment saying so.
- **1.3 (locked)** New colour needs a **semantic token** in `:root`, derived
  from an existing palette value with `color-mix()` where possible — never a
  new per-screen literal. Current semantic layer: `--danger`, `--scrim`,
  `--rail`, `--glow-violet`, `--glow-amber`, `--glow-teal`, `--node-bg`.
- **1.4 (locked)** The accent is **amber `--accent`**, not indigo/violet/blue.
  The default-framework indigo-on-white and "purple gradient SaaS" looks are
  banned. Violet appears only as `--belt-infinity` and as diffuse background
  glow, never as a CTA colour.
- **1.5** Body text is `--fg` on `--bg`/`--surface`; secondary text is
  `--muted`; never below AA contrast. `--subtle` is for tertiary metadata only.

## 2. Type

- **2.1 (locked)** One typeface: **Zen Maru Gothic** (`--font-sans`, loaded via
  `next/font`), with `--font-mono` for code. A bare system-font stack is *not*
  the brand — the fallback stack exists for CJK glyphs and load failures only.
- **2.2 (locked)** Long-form measure is **one number**: `--measure` (68ch).
  Reading pages use `.prose` for the body and `.measure` for the furniture
  around it (header, chapter nav, CTA) so a page holds a single column width.
- **2.3** Microtypography on prose is on by default (see `.prose` in
  `globals.css`): hyphenation with sane limits, kerning + ligatures, hanging
  punctuation, `text-wrap: pretty` for paragraphs and `balance` for headings,
  orphan/widow control. Code, tables and headings opt out of hyphenation.
- **2.4** Text stays **left-aligned, ragged-right**. Full justification is
  intentionally not used: without Knuth–Plass line breaking the browser's
  greedy justifier opens rivers at this measure. Revisit only with a real
  line-breaking implementation.

## 3. Layout & shape

- **3.1** Page container is `max-w-6xl` with `px-5 sm:px-8`; reading routes
  constrain the text column with `.prose`/`.measure`, not the page container.
- **3.2** Radii come in two sizes: `rounded-2xl` for cards/panels,
  `rounded-full` for chips, pills and icon buttons. No other radius.
- **3.3 (locked)** Card grids are **content-shaped, not evenly padded**:
  `sm:grid-cols-2 lg:grid-cols-3` with real entries, no filler cards to square
  off a row, and featured items are marked (`border-accent/50`) rather than
  duplicated.
- **3.4** Elevation is a border plus the surface step (`bg-surface` /
  `bg-surface-2`). Drop shadows are reserved for genuinely floating layers
  (the mobile nav panel).

## 4. Iconography

- **4.1 (locked)** Icons in chrome — navigation, buttons, cards, link
  affordances — are SVGs from `src/components/icons.tsx`. Emoji are never used
  as an icon in an interactive control.
- **4.2** Emoji are allowed as *illustration* in editorial copy (headlines,
  the community benefits list, the 404 cat), where they are decorative and
  marked `aria-hidden`. They must never be the only carrier of meaning.

## 5. Motion

- **5.1 (locked)** All motion goes through `src/components/motion.tsx`
  (`Reveal`, `Stagger`, `StaggerItem`, `MotionProvider`). Once-only,
  opacity/transform only, 16–24px of travel.
- **5.2 (locked)** Everything respects `prefers-reduced-motion`; transforms
  drop to opacity fades or nothing. Any hand-rolled CSS animation needs a
  matching `@media (prefers-reduced-motion: reduce)` block.

## 6. Accessibility gate

A screen does not ship unless all of these hold:

- **6.1 (locked)** Overlays that trap the reader (mobile nav) are
  `role="dialog"` + `aria-modal="true"`, close on Escape, trap Tab, return
  focus to their trigger, and mark the background `inert` + `aria-hidden`.
- **6.2 (locked)** Every interactive control is a real `<button>` or `<a>` —
  never a `div` with `onClick`. Buttons carry an accessible name, filter chips
  carry `aria-pressed`, and the current TOC entry carries `aria-current`.
- **6.3 (locked)** Visible focus everywhere (the global `:focus-visible`
  outline); external links get `target="_blank"` + `rel="noopener noreferrer"`
  and say so in their accessible name.
- **6.4** Every list/directory has a designed **empty state**, and every route
  that renders authored content has an **error state** (`ContentNotice`,
  `ReadingErrorBoundary`) — no raw stack traces, no blank panels.
- **6.5** Live-updating result counts announce with `aria-live="polite"`.

## 7. Content surfaces

- **7.1** Cards state their own provenance (region, platform, tier badge)
  rather than relying on section position.
- **7.2** Copy is second person, lowercase-friendly, and specific. No
  "Lorem ipsum", no "Welcome to our platform", no invented statistics.

---

## Deviations on record

- `#fff` in `StagePath` — SVG mask luminance, not a colour (rule 1.2).
- Emoji in editorial copy (`/community` benefits, home hero, 404) are kept on
  purpose as illustration under rule 4.2; they are `aria-hidden`.
