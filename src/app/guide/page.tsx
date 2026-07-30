import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getGuideSections, getAllGuideChapters } from '@/lib/content';
import { guideSectionMeta } from '@/data/guide-path';
import { getCourse } from '@/data/courses';
import { LearningPath, BeltStrip, type PathStage } from '@/components/LearningPath';
import { ArrowRightIcon } from '@/components/icons';
import { Reveal } from '@/components/motion';

export const metadata: Metadata = {
  title: 'The Guide',
  description:
    'A step-by-step path into software development, built from a proven workflow helping career-changers in Japan. Walk it stop by stop and unlock new moves at every stage.',
  alternates: { canonical: '/guide' },
};

const course = getCourse('the-guide')!;
const nextCourse = getCourse('applied-ai-engineer')!;

export default function GuidePage() {
  const sections = getGuideSections();
  const all = getAllGuideChapters();
  const firstChapter = all[0];

  // Merge content sections with their path flavor (emoji, moves, rank belt)
  // and number the stops continuously across the whole path.
  let stop = 0;
  const stages: PathStage[] = sections.map(({ section, chapters }) => {
    const meta = guideSectionMeta[section] ?? { emoji: '🥋', moves: [] };
    return {
      key: section,
      title: section,
      emoji: meta.emoji,
      moves: meta.moves,
      belt: meta.belt,
      stops: chapters.map((chapter) => {
        const number = ++stop;
        return {
          key: chapter.slug,
          title: chapter.title,
          description: chapter.description,
          meta: `Stop ${number} of ${all.length} · ${chapter.readingMinutes} min`,
          href: `/guide/${chapter.slug}`,
          marker: String(number),
        };
      }),
    };
  });

  const belts = stages.flatMap((stage) => (stage.belt ? [stage.belt] : []));

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Link href="/courses" className="text-sm font-bold text-accent hover:underline">
        ← Courses
      </Link>

      <header className="mt-6 grid items-center gap-8 sm:grid-cols-[1fr_11rem]">
        <Reveal load>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">
            {course.track} · Open now
          </p>
          <h1 className="mt-2 text-4xl font-black leading-[1.1] tracking-tight sm:text-5xl">
            {course.answer}
          </h1>
          <p className="mt-3 text-lg font-bold text-accent">{course.tagline}</p>
          <p className="mt-4 text-base font-medium leading-relaxed text-muted">
            A practical, sequenced path into software development, expanded from
            the workflow I&apos;ve used to help many people in Japan switch
            careers (often from English teaching) into engineering. Walk it stop
            by stop: every stage unlocks new moves, and the big milestones earn
            you a new belt.
          </p>
          <p className="mt-3 text-xs font-bold uppercase tracking-wide text-subtle">
            For: {course.audience}
          </p>
          {firstChapter && (
            <Link
              href={`/guide/${firstChapter.slug}`}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-bold text-accent-fg transition-colors hover:bg-accent-hover"
            >
              Start here: {firstChapter.title}
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          )}
        </Reveal>

        <Reveal load spring delay={0.15} className="flex justify-center">
          <Image
            src={course.mascot.src}
            alt={course.mascot.alt}
            width={course.mascot.width}
            height={course.mascot.height}
            sizes="11rem"
            priority
            className="h-auto w-full max-w-[11rem] drop-shadow-2xl"
          />
        </Reveal>
      </header>

      {belts.length > 0 && (
        <Reveal className="mt-12">
          <BeltStrip belts={belts} label="Ranks you earn on this path" />
        </Reveal>
      )}

      {all.length === 0 ? (
        <p className="mt-12 text-muted">Chapters are being written, check back soon.</p>
      ) : (
        <div className="mt-12">
          <LearningPath
            stages={stages}
            end={{
              emoji: '🏁',
              title: 'End of the path: your first offer.',
              body: 'The dojo door stays open. Come back, keep training, and mentor the next person walking it.',
            }}
          />
        </div>
      )}

      {/* What comes after the offer: the second course, still being written. */}
      <Reveal className="mt-14">
        <Link
          href={nextCourse.href}
          className="group block rounded-2xl border border-accent-line bg-accent-soft p-6 transition hover:-translate-y-0.5 sm:p-7"
        >
          <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">
            Next course · Coming soon
          </p>
          <h2 className="mt-2 text-xl font-black tracking-tight transition-colors group-hover:text-accent">
            {nextCourse.answer}
          </h2>
          <p className="mt-2 max-w-xl text-sm font-medium leading-relaxed text-muted">
            {nextCourse.description}
          </p>
          <span className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-accent">
            See what it covers
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>
      </Reveal>
    </div>
  );
}
