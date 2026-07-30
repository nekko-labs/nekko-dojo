import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  getCourse,
  roleShift,
  modules,
  stillMatters,
  stoppedMattering,
} from '@/data/courses';
import { DiscordCTA } from '@/components/DiscordCTA';
import { ArrowRightIcon } from '@/components/icons';
import {
  LearningPath,
  BeltStrip,
  type PathStage,
} from '@/components/LearningPath';
import { Reveal, Stagger, StaggerItem } from '@/components/motion';

const course = getCourse('applied-ai-engineer')!;
const prevCourse = getCourse('the-guide')!;

export const metadata: Metadata = {
  title: 'Applied AI Engineer (coming soon)',
  description:
    'The dojo’s second course. Engineering roles are shifting from producing code to directing the systems that produce it, and harness development is the fastest-growing role in the field. Here is what the course will cover, and which parts of coding and engineering design still matter.',
  alternates: { canonical: '/courses/applied-ai-engineer' },
};

/**
 * The curriculum as the same walked path The Guide uses. The lessons are not
 * written yet, so a stage carries its pitch as `body` and no stops; the moves
 * and the dan grades come straight from the module data.
 */
const stages: PathStage[] = modules.map((module) => ({
  key: module.title,
  title: module.title,
  emoji: module.emoji,
  body: module.body,
  stops: [],
  moves: module.outcomes,
  belt: module.belt,
}));

const belts = stages.flatMap((stage) => (stage.belt ? [stage.belt] : []));

/** Reusable section heading so the long page keeps one rhythm. */
function SectionHead({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <Reveal className="max-w-2xl">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-black tracking-tight">{title}</h2>
      {children && (
        <div className="mt-3 space-y-4 text-base font-medium leading-relaxed text-muted">
          {children}
        </div>
      )}
    </Reveal>
  );
}

export default function AppliedAiEngineerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Link href="/courses" className="text-sm font-bold text-accent hover:underline">
        ← Courses
      </Link>

      {/* Hero — same shape as The Guide's, so the two courses read as siblings */}
      <header className="mt-6 grid items-center gap-8 sm:grid-cols-[1fr_11rem]">
        <Reveal load>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">
            {course.track} · Coming soon
          </p>
          <h1 className="mt-2 text-4xl font-black leading-[1.1] tracking-tight sm:text-5xl">
            {course.answer}
          </h1>
          <p className="mt-3 text-lg font-bold text-accent">{course.tagline}</p>
          <p className="mt-4 text-base font-medium leading-relaxed text-muted">
            The dojo&apos;s second course, for people who can already build
            software and can feel the job changing under them. Not prompt
            tricks. The engineering discipline of getting real, correct,
            maintainable systems out of machines that write code faster than you
            can read it.
          </p>
          <p className="mt-3 text-xs font-bold uppercase tracking-wide text-subtle">
            For: {course.audience}
          </p>
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

      {/* The shift */}
      <section className="mt-20">
        <SectionHead eyebrow="Why this course exists" title="The role is shifting">
          <p>
            For twenty years the title told you the work. You picked a layer,
            got good at producing code in it, and got paid for the producing.
            That mapping is coming apart. The scarce skill is no longer writing
            the code: it is deciding what should exist, directing the systems
            that build it, and being able to prove the result is right.
          </p>
          <p>
            This is not AI replacing engineers. It is AI repricing engineering.
            Some of what you were paid for went to nearly zero. Some of it just
            became the whole job.
          </p>
        </SectionHead>

        <Stagger className="mt-8 flex flex-col gap-3">
          {roleShift.map((row) => (
            <StaggerItem key={row.before}>
              <div className="grid gap-3 rounded-2xl border border-border bg-surface p-5 sm:grid-cols-[1fr_auto_1.2fr] sm:items-center sm:gap-5">
                <p className="text-sm font-medium leading-relaxed text-muted line-through decoration-subtle/50">
                  {row.before}
                </p>
                <ArrowRightIcon
                  className="hidden h-4 w-4 shrink-0 text-accent sm:block"
                  aria-hidden
                />
                <p className="text-sm font-bold leading-relaxed">{row.after}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* The growing role */}
      <section className="mt-20">
        <Reveal>
          <div className="rounded-2xl border border-accent-line bg-accent-soft p-7 sm:p-9">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">
              The fastest-growing role
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">
              Harness development
            </h2>
            <p className="mt-4 text-base font-medium leading-relaxed text-muted">
              A job is forming in the gap, and it is hiring faster than anything
              else in software. Call it agentic engineering, or harness
              development: the person who builds the system the agents run
              inside.
            </p>
            <p className="mt-3 text-base font-medium leading-relaxed text-muted">
              Not the person chatting with an assistant. The person who engineers
              the context it sees, the tools it can call, the permissions it
              cannot exceed, the tests that tell it when it failed, and the
              review process that catches what nobody reads. Anyone can get a
              demo out of a model. Getting production software out of one, over
              and over, at a quality a team can live with, is engineering, and
              almost nobody has been taught it.
            </p>
            <p className="mt-3 text-base font-bold leading-relaxed">
              The factory runs itself. Somebody still has to build the factory.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Curriculum — the same walked path as The Guide, one rail, six gates */}
      <section className="mt-20">
        <SectionHead eyebrow="The curriculum" title="What you will learn">
          <p>
            Six stages, walked in order, exactly like The Guide: every stage
            unlocks new moves, and the milestones grade you up. This course
            starts where The Guide ends, at black belt, so the ranks here are
            dan grades.
          </p>
        </SectionHead>

        {belts.length > 0 && (
          <Reveal className="mt-8">
            <BeltStrip belts={belts} label="Ranks you earn on this path" />
          </Reveal>
        )}

        <Reveal className="mt-8">
          <p className="text-xs font-bold uppercase tracking-wide text-subtle">
            Lessons are being written. The stages below are what the course
            covers.
          </p>
        </Reveal>

        <div className="mt-8">
          <LearningPath
            stages={stages}
            end={{
              emoji: '♾️',
              title: 'End of the path: you build the factory.',
              body: 'There is no final belt here. The models change every few months, so the last move you learn is how to keep re-learning the loop.',
            }}
          />
        </div>
      </section>

      {/* What survives */}
      <section className="mt-20">
        <SectionHead eyebrow="Do not throw it away" title="What still matters">
          <p>
            The loudest version of this story says none of it counts any more.
            That version is wrong, and expensive to believe. Most of what makes
            a good engineer did not move. It got more leveraged, because it is
            now the part nothing else can do for you.
          </p>
        </SectionHead>

        <Stagger className="mt-8 grid gap-4 sm:grid-cols-2">
          {stillMatters.map((item) => (
            <StaggerItem key={item.title}>
              <div className="h-full rounded-2xl border border-border bg-surface p-5">
                <h3 className="text-base font-black tracking-tight">
                  <span className="mr-2 text-accent" aria-hidden>
                    ✓
                  </span>
                  {item.title}
                </h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-muted">
                  {item.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-6">
          <div className="rounded-2xl border border-border bg-surface-2 p-6">
            <h3 className="text-sm font-black uppercase tracking-[0.16em] text-muted">
              And the honest half: what stopped being a moat
            </h3>
            <ul className="mt-3 space-y-2">
              {stoppedMattering.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm font-medium leading-relaxed text-muted"
                >
                  <span className="text-subtle" aria-hidden>
                    ×
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm font-medium leading-relaxed text-muted">
              None of that made you a bad engineer. It just stopped being the
              thing you get paid for, and the course spends its time on what
              replaced it.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Prereqs — the other path, for anyone who is not ready for this one */}
      <section className="mt-20">
        <SectionHead eyebrow="Before you start" title="Who this is for">
          <p>
            You should be able to build and ship something on your own already:
            read an unfamiliar codebase, write tests, use git without fear. If
            you are not there yet, that is exactly what the other path is for.
            Walk it first, then come back. This course starts where it ends.
          </p>
        </SectionHead>

        <Reveal className="mt-8">
          <Link
            href={prevCourse.href}
            className="group block rounded-2xl border border-accent-line bg-accent-soft p-6 transition hover:-translate-y-0.5 sm:p-7"
          >
            <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">
              Start here instead · Open now
            </p>
            <h3 className="mt-2 text-xl font-black tracking-tight transition-colors group-hover:text-accent">
              {prevCourse.answer}
            </h3>
            <p className="mt-2 max-w-xl text-sm font-medium leading-relaxed text-muted">
              {prevCourse.description}
            </p>
            <span className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-accent">
              Walk {prevCourse.name}
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="mt-16">
        <Reveal>
          <div className="rounded-2xl border border-border bg-surface p-8 text-center">
            <h2 className="text-2xl font-black tracking-tight">
              Want to know when it opens?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-base font-medium leading-relaxed text-muted">
              Chapters are being written now. The Discord hears first, and the
              people in there help shape what makes the cut. Tell us what you
              want covered.
            </p>
            <DiscordCTA variant="button" className="mt-6" />
            <p className="mt-6 text-sm font-medium text-subtle">
              In the meantime, the{' '}
              <Link href="/articles" className="font-bold text-accent hover:underline">
                articles
              </Link>{' '}
              cover a lot of this ground already.
            </p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
