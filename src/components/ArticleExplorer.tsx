'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { ArticleMeta } from '@/lib/content';
import { formatDate } from '@/lib/format';
import { ArticleCard } from './ArticleCard';
import { ArticleCover } from './ArticleCover';
import { ArrowRightIcon } from './icons';
import { Reveal, Stagger, StaggerItem } from './motion';

/**
 * The /articles browsing experience: the newest article leads as a featured
 * spread, and the rest sit in a card grid behind topic chips. Picking a topic
 * collapses the spread and re-filters the grid instantly (no re-stagger), so
 * exploring never feels sluggish.
 */

// Same chip grammar as the community directory filters.
const chipBase =
  'rounded-full border px-3.5 py-1.5 text-sm font-bold transition-colors focus-visible:outline-2';
const chipOff = 'border-border bg-surface text-muted hover:border-accent hover:text-fg';
const chipOn = 'border-accent bg-accent/12 text-accent';

function TopicChip({
  label,
  count,
  pressed,
  onClick,
}: {
  label: string;
  count: number;
  pressed: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`${chipBase} ${pressed ? chipOn : chipOff}`}
    >
      {label}
      <span className="ml-1.5 text-xs font-medium opacity-70">{count}</span>
    </button>
  );
}

/** The newest article, spread wide: cover on the left, story on the right. */
function FeaturedArticle({ article }: { article: ArticleMeta }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-accent/50 bg-surface md:grid md:grid-cols-[3fr_2fr]">
      <div className="relative aspect-[16/9] overflow-hidden border-b border-border md:aspect-auto md:min-h-[21rem] md:border-b-0 md:border-r">
        <ArticleCover article={article} priority sizes="(min-width: 768px) 60vw, 100vw" />
      </div>
      <div className="flex flex-col p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">
          <span className="rounded-full border border-accent-line bg-accent-soft px-2.5 py-0.5 font-bold text-accent">
            Latest
          </span>
          {article.date && <time dateTime={article.date}>{formatDate(article.date)}</time>}
          {article.date && <span aria-hidden>·</span>}
          <span>{article.readingMinutes} min read</span>
        </div>
        <h2 className="mt-4 text-balance text-2xl font-bold tracking-tight transition-colors group-hover:text-accent sm:text-3xl">
          <Link href={`/articles/${article.slug}`} className="after:absolute after:inset-0">
            {article.title}
          </Link>
        </h2>
        {article.description && (
          <p className="mt-3 line-clamp-3 text-muted sm:line-clamp-4">{article.description}</p>
        )}
        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          {article.author && <span className="text-sm font-bold text-subtle">{article.author}</span>}
          <span className="inline-flex items-center gap-1.5 text-sm font-bold text-accent">
            Read article
            <ArrowRightIcon
              aria-hidden
              className="h-4 w-4 motion-safe:transition-transform motion-safe:group-hover:translate-x-1"
            />
          </span>
        </div>
      </div>
    </article>
  );
}

export function ArticleExplorer({ articles }: { articles: ArticleMeta[] }) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  // Once a chip has been used, grid items render settled (no entrance replay).
  const [hasFiltered, setHasFiltered] = useState(false);

  const topics = useMemo(() => {
    const counts = new Map<string, number>();
    for (const article of articles) {
      for (const tag of article.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
    const all = Array.from(counts, ([tag, count]) => ({ tag, count })).sort(
      (a, b) => b.count - a.count || a.tag.localeCompare(b.tag),
    );
    // Single-use tags belong on their card, not up here: a chip that filters
    // to one article is noise. If the library is still too small to have
    // recurring topics, fall back to everything.
    const recurring = all.filter(({ count }) => count > 1);
    return recurring.length >= 2 ? recurring : all;
  }, [articles]);

  const pick = (tag: string | null) => {
    setActiveTag(tag);
    setHasFiltered(true);
  };

  const [featured, ...rest] = articles;
  const showFeatured = activeTag === null;
  const gridArticles = activeTag
    ? articles.filter((article) => article.tags.includes(activeTag))
    : rest;
  const shownCount = gridArticles.length + (showFeatured ? 1 : 0);

  return (
    <div>
      {showFeatured && (
        <Reveal load delay={0.1} className="mt-10">
          <FeaturedArticle article={featured} />
        </Reveal>
      )}

      <Reveal load delay={0.2} className="mt-8 flex flex-wrap items-center gap-2">
        <div role="group" aria-label="Filter articles by topic" className="flex flex-wrap gap-2">
          <TopicChip
            label="All"
            count={articles.length}
            pressed={activeTag === null}
            onClick={() => pick(null)}
          />
          {topics.map(({ tag, count }) => (
            <TopicChip
              key={tag}
              label={tag}
              count={count}
              pressed={activeTag === tag}
              onClick={() => pick(tag)}
            />
          ))}
        </div>
      </Reveal>
      <p aria-live="polite" className="sr-only">
        Showing {shownCount} of {articles.length} articles
      </p>

      {gridArticles.length > 0 ? (
        <Stagger load delay={0.25} className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gridArticles.map((article) => (
            <StaggerItem key={article.slug} instant={hasFiltered} className="h-full">
              <ArticleCard article={article} />
            </StaggerItem>
          ))}
        </Stagger>
      ) : (
        !showFeatured && (
          <p className="mt-10 rounded-2xl border border-border bg-surface p-6 text-muted">
            Nothing under this topic yet. Pick another, or hit All to see everything.
          </p>
        )
      )}
    </div>
  );
}
