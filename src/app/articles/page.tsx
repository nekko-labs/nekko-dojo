import type { Metadata } from 'next';
import { getAllArticles } from '@/lib/content';
import { ArticleExplorer } from '@/components/ArticleExplorer';
import { Reveal } from '@/components/motion';

export const metadata: Metadata = {
  title: 'Articles',
  description:
    'Director-level perspective on engineering, AI, and growing your career as the market shifts.',
  alternates: { canonical: '/articles' },
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      <Reveal as="header" load className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Articles</h1>
        <p className="mt-3 text-pretty text-lg text-muted">
          Perspective from years as a high-level engineer and director: on the tech space,
          the latest in AI, and how to keep growing as the market shifts.
        </p>
      </Reveal>

      {articles.length === 0 ? (
        <p className="mt-12 rounded-2xl border border-border bg-surface p-6 text-muted">
          No articles yet. Check back soon, or join the Discord to hear when new ones land.
        </p>
      ) : (
        <ArticleExplorer articles={articles} />
      )}
    </div>
  );
}
