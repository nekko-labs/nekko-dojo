import type { Metadata } from 'next';
import Link from 'next/link';
import { getGuideSections, getAllGuideChapters } from '@/lib/content';
import { ArrowRightIcon } from '@/components/icons';
import { Reveal, Stagger, StaggerItem } from '@/components/motion';

export const metadata: Metadata = {
  title: 'The Guide',
  description:
    'A step-by-step guide for switching into software development — built from a proven workflow helping career-changers in Japan.',
};

export default function GuidePage() {
  const sections = getGuideSections();
  const all = getAllGuideChapters();
  const firstChapter = all[0];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Reveal as="header" load className="max-w-2xl">
        <p className="text-sm font-medium text-accent">The flagship</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">The Guide</h1>
        <p className="mt-3 text-lg text-muted">
          A practical, sequenced path into software development — expanded from the workflow
          I&apos;ve used to help many people in Japan switch careers (often from English
          teaching) into engineering. Work through it in order.
        </p>
        {firstChapter && (
          <Link
            href={`/guide/${firstChapter.slug}`}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-medium text-accent-fg transition-colors hover:bg-accent-hover"
          >
            Start here: {firstChapter.title}
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        )}
      </Reveal>

      {all.length === 0 ? (
        <p className="mt-12 text-muted">Chapters are being written — check back soon.</p>
      ) : (
        <Stagger className="mt-12 space-y-10">
          {sections.map((section) => (
            <StaggerItem as="section" key={section.section}>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
                {section.section}
              </h2>
              <ol className="mt-3 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
                {section.chapters.map((chapter, index) => (
                  <li key={chapter.slug}>
                    <Link
                      href={`/guide/${chapter.slug}`}
                      className="flex items-start gap-4 p-5 transition-colors hover:bg-surface-2"
                    >
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-2 text-sm font-medium text-muted">
                        {index + 1}
                      </span>
                      <span className="min-w-0">
                        <span className="block font-medium">{chapter.title}</span>
                        {chapter.description && (
                          <span className="mt-1 block text-sm text-muted">
                            {chapter.description}
                          </span>
                        )}
                        <span className="mt-1 block text-xs text-muted">
                          {chapter.readingMinutes} min read
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </StaggerItem>
          ))}
        </Stagger>
      )}
    </div>
  );
}
