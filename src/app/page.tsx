import Link from 'next/link';
import { getAllArticles, getAllGuideChapters } from '@/lib/content';
import { getFeaturedProjects, projectPrimaryUrl } from '@/data/communities';
import { ArticleCard } from '@/components/ArticleCard';
import { DiscordCTA } from '@/components/DiscordCTA';
import { ArrowRightIcon } from '@/components/icons';
import { site } from '@/lib/site';

const pillars = [
  {
    href: '/articles',
    emoji: '✍️',
    title: 'Articles',
    body: 'Director-level takes on engineering, AI, and how to grow your career as the market shifts.',
  },
  {
    href: '/guide',
    emoji: '🥋',
    title: 'The Guide',
    body: 'A step-by-step path into software development — built from helping people switch careers in Japan.',
  },
  {
    href: '/community',
    emoji: '🤝',
    title: 'Community & Projects',
    body: 'Real open-source projects and communities where you work on a team, not just a portfolio.',
  },
];

export default function HomePage() {
  const latestArticles = getAllArticles().slice(0, 3);
  const chapterCount = getAllGuideChapters().length;
  const featured = getFeaturedProjects();

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      {/* Hero */}
      <section className="py-16 sm:py-24">
        <p className="text-sm font-medium text-accent">{site.parentName} presents</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          Train into tech. <br className="hidden sm:block" />
          Grow your engineering career.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">{site.description}</p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/guide"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-medium text-accent-fg transition-colors hover:bg-accent-hover"
          >
            Start the Guide
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 font-medium transition-colors hover:bg-surface-2"
          >
            Read the articles
          </Link>
        </div>
      </section>

      {/* Pillars */}
      <section className="grid gap-4 sm:grid-cols-3">
        {pillars.map((pillar) => (
          <Link
            key={pillar.href}
            href={pillar.href}
            className="group rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent"
          >
            <div className="text-2xl" aria-hidden>
              {pillar.emoji}
            </div>
            <h2 className="mt-3 flex items-center gap-1 text-lg font-semibold group-hover:text-accent">
              {pillar.title}
              <ArrowRightIcon className="h-4 w-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
            </h2>
            <p className="mt-2 text-sm text-muted">{pillar.body}</p>
            {pillar.href === '/guide' && chapterCount > 0 && (
              <p className="mt-3 text-xs font-medium text-accent">
                {chapterCount} chapter{chapterCount === 1 ? '' : 's'} →
              </p>
            )}
          </Link>
        ))}
      </section>

      {/* Latest articles */}
      {latestArticles.length > 0 && (
        <section className="mt-20">
          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">Latest articles</h2>
            <Link href="/articles" className="text-sm text-accent hover:text-accent-hover">
              All articles →
            </Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {latestArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* Featured communities */}
      {featured.length > 0 && (
        <section className="mt-20">
          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">Get real experience</h2>
            <Link href="/community" className="text-sm text-accent hover:text-accent-hover">
              All projects →
            </Link>
          </div>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {featured.map((community) => (
              <li key={community.id}>
                <a
                  href={projectPrimaryUrl(community)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent"
                >
                  <h3 className="font-semibold">{community.name}</h3>
                  <p className="mt-2 text-sm text-muted">{community.description}</p>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Discord */}
      <section className="mt-20">
        <DiscordCTA />
      </section>

      <div className="h-8" />
    </div>
  );
}
