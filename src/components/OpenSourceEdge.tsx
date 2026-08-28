import Link from 'next/link';
import { ArrowRightIcon } from './icons';
import { Reveal } from './motion';

/**
 * The bridge from /get-hired to /projects: the course's own argument that
 * contributing to a real open-source team is the single strongest signal a
 * junior candidate can send. Copy is drawn from guide chapter 6 rather than
 * written fresh, so the site and the course never make different claims.
 *
 * Placed above the listings because the chapter it comes from (6) precedes the
 * applying chapter (10): do this before you start sending applications.
 */

const CHAPTER_HREF = '/guide/get-involved-in-the-community';

/** What open source teaches that solo projects cannot, per chapter 6. */
const PROOF = [
  'Reading and understanding code other people wrote',
  'Code review, giving it and receiving it',
  'Collaborating with Git: branches, pull requests, merge conflicts',
  'Shipping to real users who notice when it breaks',
];

export function OpenSourceEdge() {
  return (
    /* Reveal takes only its own props, so the landmark wraps it rather than
       being it. */
    <section aria-labelledby="open-source-edge-heading" className="mt-12">
      <Reveal className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-wide text-accent">
          From the course · Chapter 6
        </p>
        <h2
          id="open-source-edge-heading"
          className="mt-2 text-2xl font-black tracking-tight sm:text-3xl"
        >
          Your strongest signal is not a résumé line
        </h2>
        <p className="mt-3 max-w-2xl text-sm font-medium leading-relaxed text-muted sm:text-base">
          Solo projects teach you to write code. A job is mostly not writing code from
          scratch: it is working on a team, in a large codebase you didn&apos;t write, to
          someone else&apos;s standards. Open source gives you the real thing before anyone
          pays you, and{' '}
          <strong className="font-bold text-fg">
            &ldquo;has contributed to a real team project&rdquo;
          </strong>{' '}
          is one of the strongest signals you can send a hiring manager.
        </p>

        <ul className="mt-6 grid gap-x-8 gap-y-2 sm:grid-cols-2">
          {PROOF.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-bold text-bg transition-transform hover:-translate-y-0.5"
          >
            Find a project to contribute to
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link href={CHAPTER_HREF} className="text-sm font-bold text-accent hover:underline">
            Read the chapter
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
