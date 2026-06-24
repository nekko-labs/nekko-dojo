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
  return {
    title: chapter.meta.title,
    description: chapter.meta.description,
  };
}

export default async function GuideChapterPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const chapter = getGuideChapter(slug);
  if (!chapter) notFound();

  const { meta, body } = chapter;
  const { prev, next } = getAdjacentChapters(slug);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Link href="/guide" className="text-sm text-accent hover:text-accent-hover">
        ← The Guide
      </Link>

      <header className="mt-6">
        <p className="text-sm font-medium text-accent">{meta.section}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{meta.title}</h1>
        {meta.description && <p className="mt-3 text-lg text-muted">{meta.description}</p>}
        <p className="mt-3 text-sm text-muted">{meta.readingMinutes} min read</p>
      </header>

      <hr className="my-8 border-border" />

      <article className="prose">
        <Mdx source={body} />
      </article>

      {/* Prev / next navigation */}
      <nav className="mt-12 grid gap-3 sm:grid-cols-2" aria-label="Chapter navigation">
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

      <div className="mt-16">
        <DiscordCTA />
      </div>
    </div>
  );
}
