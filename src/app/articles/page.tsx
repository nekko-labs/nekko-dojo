import type { Metadata } from 'next';
import { getAllArticles } from '@/lib/content';
import { ArticleCard } from '@/components/ArticleCard';
import { Reveal, Stagger, StaggerItem } from '@/components/motion';

export const metadata: Metadata = {
  title: 'Articles',
  description:
    'Director-level perspective on engineering, AI, and growing your career as the market shifts.',
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <Reveal as="header" load className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Articles</h1>
        <p className="mt-3 text-lg text-muted">
          Perspective from years as a high-level engineer and director — on the tech space,
          the latest in AI, and how to keep growing as the market shifts.
        </p>
      </Reveal>

      {articles.length === 0 ? (
        <p className="mt-12 text-muted">No articles yet — check back soon.</p>
      ) : (
        <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <StaggerItem key={article.slug}>
              <ArticleCard article={article} />
            </StaggerItem>
          ))}
        </Stagger>
      )}
    </div>
  );
}
