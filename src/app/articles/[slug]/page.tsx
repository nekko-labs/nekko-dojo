import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllArticles, getArticle } from '@/lib/content';
import { Mdx } from '@/components/Mdx';
import { DiscordCTA } from '@/components/DiscordCTA';
import { formatDate } from '@/lib/format';
import { Reveal } from '@/components/motion';
import { TableOfContents } from '@/components/TableOfContents';
import { ReadingProgress } from '@/components/ReadingProgress';
import { JsonLd } from '@/components/JsonLd';
import { getTableOfContents } from '@/lib/toc';
import { site } from '@/lib/site';

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
  const { meta } = article;
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/articles/${meta.slug}` },
    openGraph: {
      type: 'article',
      title: meta.title,
      description: meta.description,
      url: `/articles/${meta.slug}`,
      publishedTime: meta.date || undefined,
      authors: [meta.author],
      tags: meta.tags,
      // A child openGraph object replaces the layout's, so restate the image.
      // Articles with a hero photo share with it; the rest fall back to the logo.
      images: meta.hero
        ? [{ url: meta.hero.src, alt: meta.hero.alt || meta.title }]
        : [{ url: '/dojo.png', width: 1100, height: 683, alt: meta.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [meta.hero?.src ?? '/dojo.png'],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const { meta, body } = article;
  const toc = getTableOfContents(body);

  // BlogPosting, so the article can be quoted with its author, date, and
  // reading time rather than guessed at from the markup.
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: meta.title,
    description: meta.description,
    url: `${site.url}/articles/${meta.slug}`,
    mainEntityOfPage: `${site.url}/articles/${meta.slug}`,
    datePublished: meta.date || undefined,
    dateModified: meta.date || undefined,
    keywords: meta.tags,
    wordCount: body.trim().split(/\s+/).filter(Boolean).length,
    timeRequired: `PT${meta.readingMinutes}M`,
    inLanguage: 'en',
    author: { '@type': 'Person', name: meta.author },
    publisher: { '@id': `${site.url}/#organization` },
    isPartOf: { '@id': `${site.url}/#website` },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: site.name, item: `${site.url}/` },
      { '@type': 'ListItem', position: 2, name: 'Articles', item: `${site.url}/articles` },
      {
        '@type': 'ListItem',
        position: 3,
        name: meta.title,
        item: `${site.url}/articles/${meta.slug}`,
      },
    ],
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <ReadingProgress targetId="article-body" />
      <Link href="/articles" className="text-sm text-accent hover:text-accent-hover">
        ← All articles
      </Link>

      {/* Title/meta fade up gently on load; the article body below stays
          static so the content is instantly readable. */}
      <Reveal as="header" load distance={16} className="mt-6 measure">
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
      </Reveal>

      <hr className="my-8 border-border" />

      <div className="gap-12 lg:grid lg:grid-cols-[minmax(0,1fr)_15rem]">
        <article id="article-body" className="prose">
          <Mdx source={body} />
        </article>
        <aside className="hidden lg:block">
          <TableOfContents entries={toc} />
        </aside>
      </div>

      <div className="measure mt-16">
        <DiscordCTA />
      </div>
    </div>
  );
}
