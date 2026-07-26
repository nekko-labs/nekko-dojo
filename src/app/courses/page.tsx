import type { Metadata } from 'next';
import { courses } from '@/data/courses';
import { getAllGuideChapters } from '@/lib/content';
import { CourseCard } from '@/components/CourseCard';
import { DiscordCTA } from '@/components/DiscordCTA';
import { Reveal, Stagger, StaggerItem } from '@/components/motion';

export const metadata: Metadata = {
  title: 'Courses',
  description:
    'Two paths through the dojo: The Guide takes you from never having coded to your first engineering job, and Applied AI Engineer teaches you to direct agents once you can already build.',
};

export default function CoursesPage() {
  const chapterCount = getAllGuideChapters().length;

  return (
    <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20">
      <Reveal as="header" load className="max-w-2xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
          Training paths
        </p>
        <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">Courses</h1>
        <p className="mt-4 text-lg font-medium leading-relaxed text-muted">
          Two paths through the dojo. One gets you into the industry. The other
          keeps you valuable once the industry stops paying for typing. Walk
          them in order, or start wherever you actually are.
        </p>
        {chapterCount > 0 && (
          <p className="mt-3 text-sm font-medium text-subtle">
            {chapterCount} chapters live today, and more being written.
          </p>
        )}
      </Reveal>

      <Stagger className="mt-12 flex flex-col gap-6" gap={0.12}>
        {courses.map((course, i) => (
          <StaggerItem key={course.id}>
            <CourseCard course={course} flip={i % 2 === 1} />
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal className="mt-14">
        <DiscordCTA />
      </Reveal>
    </div>
  );
}
