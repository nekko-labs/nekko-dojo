import Link from 'next/link';
import Image from 'next/image';
import type { Course } from '@/data/courses';
import { ArrowRightIcon } from './icons';

/**
 * One answer to "What do you want to learn?" on the `/courses` chooser: a full
 * borderless panel you pick, sitting beside its sibling rather than stacked in
 * a list. There is deliberately no card border here (a STYLESEED 3.4 deviation,
 * on record in that file): the mascot, the course's own glow token and the
 * surface wash carry the panel, and the `.choice` / `.chooser` rules in
 * `globals.css` dim whichever path you are not pointing at so the page reads as
 * a choice being made. Hover and keyboard focus behave identically.
 *
 * A `coming-soon` course is still a real destination (its page sells the
 * curriculum), so it gets the same panel with a quieter status chip.
 */
export function CourseChoice({ course }: { course: Course }) {
  const comingSoon = course.status === 'coming-soon';

  return (
    <Link
      href={course.href}
      className="choice group relative flex h-full flex-col items-center overflow-hidden rounded-2xl bg-gradient-to-b from-surface/70 via-surface/25 to-transparent p-6 text-center sm:p-8"
    >
      {/* The course's own glow, brightening as you point at it. Decorative. */}
      <span
        className="choice-glow pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full opacity-60 blur-2xl"
        style={{
          background: `radial-gradient(circle, var(--glow-${course.glow}), transparent 70%)`,
        }}
        aria-hidden
      />

      {/* A fixed slot for the cat to stand in, bottom-aligned. The two mascots
          are different shapes (one portrait, one landscape), so sizing them by
          height instead of width keeps both panels' copy starting at the same
          line, and pins the reserved space so nothing shifts on load. */}
      <span className="relative flex h-52 w-full items-end justify-center sm:h-60">
        <Image
          src={course.mascot.src}
          alt={course.mascot.alt}
          width={course.mascot.width}
          height={course.mascot.height}
          sizes="16rem"
          className="choice-mascot h-full w-auto max-w-full object-contain drop-shadow-2xl"
        />
      </span>

      <span
        className={
          'relative mt-2 rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.14em] ' +
          (comingSoon ? 'bg-surface-2 text-muted' : 'bg-accent text-accent-fg')
        }
      >
        {comingSoon ? 'Coming soon' : 'Open now'}
      </span>

      <p className="relative mt-5 text-xs font-black uppercase tracking-[0.2em] text-subtle">
        {course.track}
      </p>
      <h2 className="relative mt-2 text-2xl font-black leading-tight tracking-tight transition-colors group-hover:text-accent sm:text-3xl">
        {course.answer}
      </h2>
      {/* An accent rule that draws itself in under the answer on hover. */}
      <span className="choice-rule relative mt-3 block h-0.5 w-16 rounded-full bg-accent" aria-hidden />

      <p className="relative mt-4 text-sm font-bold text-accent">{course.name}</p>
      <p className="relative mt-2 max-w-sm text-sm font-medium leading-relaxed text-muted">
        {course.pitch}
      </p>

      {/* Pushed to the bottom so both panels line up their belt + CTA. */}
      <span className="relative mt-auto flex w-full flex-col items-center pt-6">
        <Image
          src={course.belt.src}
          alt=""
          width={200}
          height={170}
          sizes="3.5rem"
          className="w-14 drop-shadow-lg"
        />
        <span className="mt-1 text-[11px] font-bold uppercase tracking-wide text-muted">
          starts at {course.belt.name}
        </span>
        <span className="mt-4 text-xs font-medium text-subtle">For: {course.audience}</span>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-accent">
          {comingSoon ? 'See what it covers' : 'Walk this path'}
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </span>
    </Link>
  );
}
