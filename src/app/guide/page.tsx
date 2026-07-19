import type { Metadata } from 'next';
import Link from 'next/link';
import { getGuideSections, getAllGuideChapters } from '@/lib/content';
import { guideSectionMeta } from '@/data/guide-path';
import { GuidePath, type PathSection } from '@/components/GuidePath';
import { ArrowRightIcon } from '@/components/icons';
import { Reveal } from '@/components/motion';

export const metadata: Metadata = {
  title: 'The Guide',
  description:
    'A step-by-step path into software development, built from a proven workflow helping career-changers in Japan. Walk it stop by stop and unlock new moves at every stage.',
};

export default function GuidePage() {
  const sections = getGuideSections();
  const all = getAllGuideChapters();
  const firstChapter = all[0];

  // Merge content sections with their path flavor (emoji, moves, rank belt)
  // and number the stops continuously across the whole path.
  let stop = 0;
  const pathSections: PathSection[] = sections.map(({ section, chapters }) => {
    const meta = guideSectionMeta[section] ?? { emoji: '🥋', moves: [] };
    return {
      section,
      ...meta,
      chapters: chapters.map((chapter) => ({
        slug: chapter.slug,
        title: chapter.title,
        description: chapter.description,
        readingMinutes: chapter.readingMinutes,
        number: ++stop,
      })),
    };
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Reveal as="header" load className="max-w-2xl">
        <p className="text-sm font-medium text-accent">The flagship</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">The Guide</h1>
        <p className="mt-3 text-lg text-muted">
          A practical, sequenced path into software development, expanded from
          the workflow I&apos;ve used to help many people in Japan switch
          careers (often from English teaching) into engineering. Walk it stop
          by stop: every stage unlocks new moves, and the big milestones earn
          you a new belt.
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
        <div className="mt-12">
          <GuidePath sections={pathSections} />
        </div>
      )}
    </div>
  );
}
