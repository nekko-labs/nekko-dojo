import type { Metadata } from 'next';
import Link from 'next/link';
import { courses } from '@/data/courses';
import { getAllGuideChapters } from '@/lib/content';
import { CourseChoice } from '@/components/CourseChoice';
import { DiscordCTA } from '@/components/DiscordCTA';
import { Reveal, Stagger, StaggerItem } from '@/components/motion';

export const metadata: Metadata = {
  title: 'Courses',
  description:
    'What do you want to learn? Become an expert in coding with The Guide, which takes you from never having coded to your first engineering job, or learn the new agentic coding way with Applied AI Engineer, for engineers who already build.',
  alternates: { canonical: '/courses' },
};

export default function CoursesPage() {
  const chapterCount = getAllGuideChapters().length;

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <Reveal as="header" load className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
          Training paths
        </p>
        <h1 className="mt-3 text-4xl font-black leading-[1.1] tracking-tight sm:text-5xl">
          What do you want to learn?
        </h1>
        <p className="mt-4 text-lg font-medium leading-relaxed text-muted">
          Two ways through the dojo. Both are walked the same way, stop by stop,
          unlocking new moves and earning ranks. Pick the one that sounds like
          you, or walk them in order.
        </p>
      </Reveal>

      {/* The choice itself. `.chooser` lets each panel dim its sibling on hover
          and focus (see globals.css), so this reads as picking a path. */}
      <Stagger
        className="chooser mt-14 grid items-stretch gap-4 sm:grid-cols-2 sm:gap-6"
        gap={0.12}
      >
        {courses.map((course) => (
          <StaggerItem key={course.id} className="h-full">
            <CourseChoice course={course} />
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal className="mt-10 text-center">
        <p className="text-sm font-medium text-subtle">
          Not sure? Almost everyone starts on the classic path.{' '}
          <Link href="/guide" className="font-bold text-accent hover:underline">
            Take a look at The Guide
          </Link>
          {chapterCount > 0
            ? `. ${chapterCount} chapters live today, and more being written.`
            : '.'}
        </p>
      </Reveal>

      <Reveal className="mx-auto mt-14 max-w-3xl">
        <DiscordCTA />
      </Reveal>
    </div>
  );
}
