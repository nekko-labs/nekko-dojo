import Link from 'next/link';
import type { ArticleMeta } from '@/lib/content';
import { formatDate } from '@/lib/format';
import { ArticleCover } from './ArticleCover';

export function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition hover:-translate-y-0.5 hover:border-accent focus-within:border-accent">
      <div className="relative aspect-[16/9] overflow-hidden border-b border-border">
        <ArticleCover
          article={article}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">
          {article.date && <time dateTime={article.date}>{formatDate(article.date)}</time>}
          {article.date && <span aria-hidden>·</span>}
          <span>{article.readingMinutes} min read</span>
        </div>
        <h3 className="mt-2 text-lg font-semibold tracking-tight transition-colors group-hover:text-accent">
          {/* Stretched link: the whole card, cover included, is the click target. */}
          <Link href={`/articles/${article.slug}`} className="after:absolute after:inset-0">
            {article.title}
          </Link>
        </h3>
        {article.description && (
          <p className="mt-2 line-clamp-3 text-sm text-muted">{article.description}</p>
        )}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-2 pt-5">
          {article.author && <span className="text-xs font-bold text-subtle">{article.author}</span>}
          {article.tags.length > 0 && (
            <ul className="flex flex-wrap gap-1.5">
              {article.tags.slice(0, 2).map((tag) => (
                <li key={tag} className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs text-muted">
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </article>
  );
}
