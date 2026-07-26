import Link from 'next/link';
import Image from 'next/image';
import type { Course } from '@/data/courses';
import { ArrowRightIcon } from './icons';

/**
 * A course on the courses hub: mascot on one side, pitch on the other, sides
 * alternating down the page so two courses do not read as a plain list. A
 * `coming-soon` course keeps the same card (it is a real destination, just
 * unwritten) and swaps the belt badge for a "Coming soon" chip.
 */
export function CourseCard({ course, flip = false }: { course: Course; flip?: boolean }) {
  const comingSoon = course.status === 'coming-soon';

  return (
    <Link
      href={course.href}
      className="group grid items-center gap-6 rounded-3xl border border-border bg-surface p-6 transition hover:-translate-y-0.5 hover:border-accent sm:grid-cols-[1fr_13rem] sm:gap-8 sm:p-8"
    >
      <div className={flip ? 'sm:order-2' : undefined}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-lg" aria-hidden>
            {course.emoji}
          </span>
          {comingSoon ? (
            <span
              className="rounded-full px-2.5 py-0.5 text-xs font-black uppercase tracking-[0.14em] text-accent"
              style={{
                border: '1px solid color-mix(in srgb, var(--accent) 45%, transparent)',
                background: 'color-mix(in srgb, var(--accent) 10%, transparent)',
              }}
            >
              Coming soon
            </span>
          ) : (
            <span className="rounded-full border border-border bg-surface-2 px-2.5 py-0.5 text-xs font-black uppercase tracking-[0.14em] text-muted">
              Open now
            </span>
          )}
        </div>

        <h2 className="mt-3 text-2xl font-black tracking-tight transition-colors group-hover:text-accent">
          {course.name}
        </h2>
        <p className="mt-1 text-base font-bold text-accent">{course.tagline}</p>
        <p className="mt-3 text-sm font-medium leading-relaxed text-muted">
          {course.description}
        </p>
        <p className="mt-4 text-xs font-bold uppercase tracking-wide text-subtle">
          For: {course.audience}
        </p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-accent">
          {comingSoon ? 'See what it covers' : 'Start the course'}
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>

      <div
        className={
          'flex flex-col items-center ' + (flip ? 'sm:order-1' : '')
        }
      >
        <Image
          src={course.mascot.src}
          alt={course.mascot.alt}
          width={480}
          height={360}
          sizes="(min-width: 640px) 13rem, 55vw"
          className="h-auto w-full max-w-[11rem] drop-shadow-xl"
        />
        <Image
          src={course.belt.src}
          alt=""
          width={200}
          height={170}
          className="mt-2 w-16 drop-shadow-lg"
        />
        <span className="mt-1 text-[11px] font-bold uppercase tracking-wide text-muted">
          {course.belt.name}
        </span>
      </div>
    </Link>
  );
}
