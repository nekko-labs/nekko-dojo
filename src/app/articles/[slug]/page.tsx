import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllArticles, getArticle } from '@/lib/content';
import { Mdx } from '@/components/Mdx';
import { DiscordCTA } from '@/components/DiscordCTA';
import { formatDate } from '@/lib/format';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllArticles(true).map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.meta.title,
    description: article.meta.description,
  };
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const { meta, body } = article;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Link href="/articles" className="text-sm text-accent hover:text-accent-hover">
        ← All articles
      </Link>

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
          {meta.date && <time dateTime={meta.date}>{formatDate(meta.date)}</time>}
          <span aria-hidden>·</span>
          <span>{meta.readingMinutes} min read</span>
          <span aria-hidden>·</span>
          <span>{meta.author}</span>
        </div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{meta.title}</h1>
        {meta.description && <p className="mt-3 text-lg text-muted">{meta.description}</p>}
        {meta.tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {meta.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs text-muted"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </header>

      <hr className="my-8 border-border" />

      <article className="prose">
        <Mdx source={body} />
      </article>

      <div className="mt-16">
        <DiscordCTA />
      </div>
    </div>
  );
}
