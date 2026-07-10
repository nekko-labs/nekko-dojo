import Link from 'next/link';
import type { ArticleMeta } from '@/lib/content';
import { formatDate } from '@/lib/format';

export function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <article className="group rounded-2xl border border-border bg-surface p-6 transition hover:-translate-y-0.5 hover:border-accent">
      <Link href={`/articles/${article.slug}`} className="block">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">
          {article.author && <span className="font-bold text-subtle">{article.author}</span>}
          {article.author && <span aria-hidden>·</span>}
          {article.date && <time dateTime={article.date}>{formatDate(article.date)}</time>}
          {article.date && <span aria-hidden>·</span>}
          <span>{article.readingMinutes} min read</span>
        </div>
        <h3 className="mt-2 text-lg font-semibold tracking-tight group-hover:text-accent">
          {article.title}
        </h3>
        {article.description && (
          <p className="mt-2 line-clamp-3 text-sm text-muted">{article.description}</p>
        )}
      </Link>
      {article.tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
