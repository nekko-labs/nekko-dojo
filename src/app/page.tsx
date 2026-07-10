import Link from 'next/link';
import Image from 'next/image';
import { getAllArticles, getAllGuideChapters } from '@/lib/content';
import { formatDate } from '@/lib/format';
import { DiscordIcon } from '@/components/icons';
import { TrainTogether } from '@/components/TrainTogether';
import { site } from '@/lib/site';

/** "Where are you now?" — the dojo meets you at any stage. Each stage carries a
 *  photo of the sensei-in-training, so the cat grows up alongside you. */
const stages = [
  {
    emoji: '🐣',
    title: "I've never coded",
    body: 'Find out if you even like it — one free evening, zero commitment.',
    cta: 'Try code tonight',
    href: '/guide',
    photo: { src: '/mascot/nekko-kamae.png', alt: 'Orange tabby in a ready kendo stance holding a shinai' },
  },
  {
    emoji: '⚒️',
    title: "I'm learning",
    body: 'Trade tutorials for building — real projects, a portfolio, a real team.',
    cta: 'Start building',
    href: '/guide',
    photo: { src: '/mascot/nekko-men.png', alt: 'Orange tabby in kendo bogu mid overhead strike' },
  },
  {
    emoji: '🎯',
    title: "I'm job hunting",
    body: 'Post-bootcamp to signed offer: interviews, résumé, strategy, practice.',
    cta: 'Prep the interviews',
    href: '/guide',
    photo: { src: '/mascot/nekko-walk.png', alt: 'Orange tabby walking in, shinai resting on its shoulder' },
  },
  {
    emoji: '🌱',
    title: "I'm already an engineer",
    body: 'Sharpen your craft in the AI era, mentor someone a step behind you.',
    cta: 'Keep training',
    href: '/articles',
    accent: true,
    photo: { src: '/mascot/nekko-sensei.png', alt: 'Orange tabby kendo sensei dual-wielding two shinai' },
  },
];

/** The training path — belts from first line of code to lifelong practice. */
const belts = [
  { emoji: '👋', title: 'Getting Started', rank: 'white belt · steps 0–2', color: 'var(--belt-white)', bg: 'var(--node-bg)' },
  { emoji: '📚', title: 'Foundations', rank: 'yellow belt · step 3', color: 'var(--belt-yellow)', bg: 'var(--node-bg)' },
  { emoji: '🔨', title: 'Building Real Things', rank: 'green belt · steps 4–6', color: 'var(--belt-green)', bg: 'var(--node-bg)' },
  { emoji: '🧠', title: 'Interview Prep', rank: 'brown belt · steps 7–9', color: 'var(--belt-brown)', bg: 'var(--node-bg)' },
  { emoji: '⛩️', title: 'Hired — milestone one', rank: 'black belt · steps 10–11', color: 'var(--gate)', bg: 'var(--accent)', gate: true },
  { emoji: '♾️', title: 'Keep growing', rank: 'beyond belts · forever', color: 'var(--belt-infinity)', bg: 'var(--gate)' },
];

export default function HomePage() {
  const latestArticles = getAllArticles().slice(0, 3);
  const chapterCount = getAllGuideChapters().length;

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      {/* Hero */}
      <section className="grid items-center gap-10 pb-14 pt-24 sm:pb-20 sm:pt-32 lg:min-h-[72vh] lg:grid-cols-[1fr_1.12fr] lg:gap-10">
        {/* Copy — left of the sensei on desktop, centered on mobile */}
        <div className="text-center lg:text-left">
          <h1 className="mx-auto max-w-3xl text-5xl font-black leading-[1.12] tracking-tight sm:text-6xl lg:mx-0">
            Start from anywhere.
            <br />
            Never stop <span className="text-accent">growing.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg font-medium leading-relaxed text-muted lg:mx-0">
            Learn to code, land your first engineering job, and keep leveling up.
            Join our community where you don&apos;t have to do it alone.
          </p>
        </div>

        {/* The sensei — dual-wielding mascot, to the right of the title */}
        <div className="flex justify-center lg:justify-end">
          <Image
            src="/mascot/nekko-sensei.png"
            alt="Nekko, the orange tabby kendo sensei, dual-wielding two shinai"
            width={1984}
            height={1200}
            priority
            className="h-auto w-full max-w-lg drop-shadow-2xl lg:max-w-none"
          />
        </div>
      </section>

      {/* The path */}
      <section className="mt-44 sm:mt-60">
        <div className="flex flex-col items-baseline justify-between gap-2 sm:flex-row">
          <h2 className="text-3xl font-black">The path 🐾</h2>
          <p className="text-sm font-bold text-muted">Hired is the gate ⛩️ — not the end of the road.</p>
        </div>
        <div className="relative mt-14">
          {/* Dotted connector — only meaningful on the 6-across layout */}
          <svg
            viewBox="0 0 1080 150"
            preserveAspectRatio="none"
            className="pointer-events-none absolute left-0 top-0 hidden h-[150px] w-full lg:block"
            aria-hidden
          >
            <path
              d="M 90 100 C 180 100 200 40 270 40 C 340 40 360 100 450 100 C 540 100 560 40 630 40 C 700 40 720 100 810 100 C 900 100 920 40 990 40"
              fill="none"
              stroke="rgba(244,241,234,0.3)"
              strokeWidth="3"
              strokeDasharray="2 10"
              strokeLinecap="round"
            />
          </svg>
          <ol className="relative grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6 lg:items-start lg:gap-4">
            {belts.map((belt, i) => (
              <li
                key={belt.title}
                data-belt-row={i % 2 === 0 ? 'down' : 'up'}
                className="text-center"
              >
                <span
                  className="mx-auto flex h-[76px] w-[76px] items-center justify-center rounded-full text-3xl"
                  style={{
                    background: belt.bg,
                    border: `4px solid ${belt.color}`,
                  }}
                  aria-hidden
                >
                  {belt.emoji}
                </span>
                <p
                  className="mt-4 text-sm font-black"
                  style={belt.gate ? { color: 'var(--accent)' } : undefined}
                >
                  {belt.title}
                </p>
                <p className="mt-1 text-xs font-bold text-muted">{belt.rank}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Where are you now? */}
      <section className="mt-32 sm:mt-40">
        <h2 className="text-center text-3xl font-black">Where are you now?</h2>
        <p className="mx-auto mt-3 max-w-lg text-center text-base font-medium leading-relaxed text-muted">
          The dojo meets you wherever you are — there&apos;s a mat for every stage.
        </p>
        <div className="mt-12 grid items-stretch gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {stages.map((stage) => (
            <div
              key={stage.title}
              className="flex h-full flex-col border-t-2 pt-5"
              style={{ borderColor: stage.accent ? 'var(--accent)' : 'var(--border)' }}
            >
              <span className="text-2xl" aria-hidden>
                {stage.emoji}
              </span>
              <h3
                className="mt-3 text-lg font-black leading-snug"
                style={stage.accent ? { color: 'var(--accent)' } : undefined}
              >
                {stage.title}
              </h3>
              <p className="mt-2 text-sm font-medium leading-relaxed text-muted">{stage.body}</p>
              <Link
                href={stage.href}
                className="mt-4 inline-block text-sm font-bold text-accent hover:underline"
              >
                {stage.cta} →
              </Link>
              {/* the sensei-in-training, one pose per stage — polaroid framed */}
              <figure
                className="mt-5 rounded-xl bg-fg p-2.5 pb-3 shadow-xl"
                style={stage.accent ? { boxShadow: '0 0 0 2px var(--accent)' } : undefined}
              >
                <div
                  className="relative h-36 overflow-hidden rounded-md"
                  style={{ background: 'linear-gradient(135deg, var(--dusk-2), var(--dusk-3))' }}
                >
                  <Image
                    src={stage.photo.src}
                    alt={stage.photo.alt}
                    fill
                    sizes="(min-width: 1024px) 15rem, (min-width: 640px) 45vw, 90vw"
                    className="object-contain object-bottom p-2"
                  />
                </div>
              </figure>
            </div>
          ))}
        </div>
      </section>

      {/* You don't train alone — interactive, auto-rotating, parallax hero */}
      <TrainTogether />

      {/* Training never stops — latest articles */}
      {latestArticles.length > 0 && (
        <section className="mt-32 sm:mt-40">
          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl font-black">Check out some articles from our team 📖</h2>
            <Link href="/articles" className="text-sm font-bold text-accent hover:underline">
              All articles →
            </Link>
          </div>
          <div className="mt-5">
            {latestArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="group flex items-baseline justify-between gap-8 border-t border-border py-5 last:border-b"
              >
                <p className="text-base font-bold leading-snug transition-colors group-hover:text-accent sm:text-lg">
                  {article.title}
                </p>
                <div className="flex shrink-0 items-baseline gap-4">
                  {article.tags[0] && (
                    <span className="hidden rounded-full border border-border px-3 py-0.5 text-xs font-bold text-subtle sm:inline">
                      {article.tags[0]}
                    </span>
                  )}
                  {article.date && (
                    <span className="text-sm font-medium text-muted">{formatDate(article.date)}</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Closing CTA */}
      <section className="mt-36 pb-28 text-center sm:mt-44">
        <p className="text-4xl" aria-hidden>
          🐱⛩️
        </p>
        <h2 className="mx-auto mt-5 max-w-2xl text-4xl font-black leading-tight">
          Wherever you are on the path, the dojo door is open.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-base font-medium leading-relaxed text-muted">
          Total beginners, job hunters, and working engineers — same mat, same
          community.{chapterCount > 0 ? ` ${chapterCount} chapters and counting.` : ''}
        </p>
        <a
          href={site.discordUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-fg px-8 py-3.5 text-base font-bold text-bg transition-transform hover:-translate-y-0.5"
        >
          <DiscordIcon className="h-5 w-5" />
          Join the Discord
        </a>
      </section>
    </div>
  );
}
