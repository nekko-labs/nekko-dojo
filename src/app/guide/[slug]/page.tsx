import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getAllGuideChapters,
  getGuideChapter,
  getAdjacentChapters,
} from '@/lib/content';
import { Mdx } from '@/components/Mdx';
import { DiscordCTA } from '@/components/DiscordCTA';
import { Reveal } from '@/components/motion';
import { TableOfContents } from '@/components/TableOfContents';
import { ReadingProgress } from '@/components/ReadingProgress';
import { JsonLd } from '@/components/JsonLd';
import { getTableOfContents } from '@/lib/toc';
import { site } from '@/lib/site';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllGuideChapters(true).map((chapter) => ({ slug: chapter.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getGuideChapter(slug);
  if (!chapter) return {};
  const { meta } = chapter;
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/guide/${meta.slug}` },
    openGraph: {
      type: 'article',
      title: meta.title,
      description: meta.description,
      url: `/guide/${meta.slug}`,
      // A child openGraph object replaces the layout's, so restate the image.
      images: [{ url: '/dojo.png', width: 1100, height: 683, alt: meta.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: ['/dojo.png'],
    },
  };
}

export default async function GuideChapterPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const chapter = getGuideChapter(slug);
  if (!chapter) notFound();

  const { meta, body } = chapter;
  const { prev, next } = getAdjacentChapters(slug);
  const toc = getTableOfContents(body);

  // A chapter of a course, not a standalone blog post: LearningResource says so,
  // and the breadcrumb keeps it attached to The Guide.
  const chapterSchema = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: meta.title,
    description: meta.description,
    url: `${site.url}/guide/${meta.slug}`,
    learningResourceType: 'Course chapter',
    educationalLevel: 'Beginner',
    timeRequired: `PT${meta.readingMinutes}M`,
    inLanguage: 'en',
    isPartOf: {
      '@type': 'Course',
      name: 'The Guide',
      url: `${site.url}/guide`,
      provider: { '@id': `${site.url}/#organization` },
    },
    provider: { '@id': `${site.url}/#organization` },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: site.name, item: `${site.url}/` },
      { '@type': 'ListItem', position: 2, name: 'The Guide', item: `${site.url}/guide` },
      {
        '@type': 'ListItem',
        position: 3,
        name: meta.title,
        item: `${site.url}/guide/${meta.slug}`,
      },
    ],
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <JsonLd data={chapterSchema} />
      <JsonLd data={breadcrumbSchema} />
      <ReadingProgress targetId="chapter-body" />
      <Link href="/guide" className="text-sm text-accent hover:text-accent-hover">
        ← The Guide
      </Link>

      {/* Title/meta fade up gently on load; the chapter body below stays
          static so the content is instantly readable. */}
      <Reveal as="header" load distance={16} className="mt-6 measure">
        <p className="text-sm font-medium text-accent">{meta.section}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{meta.title}</h1>
        {meta.description && <p className="mt-3 text-lg text-muted">{meta.description}</p>}
        <p className="mt-3 text-sm text-muted">{meta.readingMinutes} min read</p>
      </Reveal>

      <hr className="my-8 border-border" />

      <div className="gap-12 lg:grid lg:grid-cols-[minmax(0,1fr)_15rem]">
        <article id="chapter-body" className="prose">
          <Mdx source={body} />
        </article>
        <aside className="hidden lg:block">
          <TableOfContents entries={toc} />
        </aside>
      </div>

      {/* Prev / next navigation */}
      <nav className="measure mt-12 grid gap-3 sm:grid-cols-2" aria-label="Chapter navigation">
        {prev ? (
          <Link
            href={`/guide/${prev.slug}`}
            className="rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-accent"
          >
            <span className="text-xs text-muted">← Previous</span>
            <span className="mt-1 block font-medium">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/guide/${next.slug}`}
            className="rounded-2xl border border-border bg-surface p-4 text-right transition-colors hover:border-accent"
          >
            <span className="text-xs text-muted">Next →</span>
            <span className="mt-1 block font-medium">{next.title}</span>
          </Link>
        ) : (
          <span />
        )}
      </nav>

      <div className="measure mt-16">
        <DiscordCTA />
      </div>
    </div>
  );
}
