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
import { Reveal, Stagger, StaggerItem } from '@/components/motion';

const course = getCourse('applied-ai-engineer')!;

export const metadata: Metadata = {
  title: 'Applied AI Engineer (coming soon)',
  description:
    'The dojo’s second course. Engineering roles are shifting from producing code to directing the systems that produce it, and harness development is the fastest-growing role in the field. Here is what the course will cover, and which parts of coding and engineering design still matter.',
};

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
    <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
      <Link href="/courses" className="text-sm font-bold text-accent hover:underline">
        ← Courses
      </Link>

      {/* Hero */}
      <header className="mt-6 grid items-center gap-8 sm:grid-cols-[1fr_15rem]">
        <Reveal load>
          <span className="inline-flex rounded-full border border-accent-line bg-accent-soft px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-accent">
            Coming soon
          </span>
          <h1 className="mt-4 text-4xl font-black leading-[1.1] tracking-tight sm:text-5xl">
            Applied AI <span className="text-accent">Engineer</span>
          </h1>
          <p className="mt-4 text-lg font-bold text-accent">{course.tagline}</p>
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
            width={480}
            height={360}
            priority
            className="h-auto w-full max-w-[13rem] drop-shadow-2xl"
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

      {/* Curriculum */}
      <section className="mt-20">
        <SectionHead eyebrow="The curriculum" title="What you will learn">
          <p>
            Six stages, in order, each one building something you keep. The
            course is being written now; the shape below is what it covers.
          </p>
        </SectionHead>

        <Stagger className="mt-8 flex flex-col gap-4">
          {modules.map((module, i) => (
            <StaggerItem key={module.title}>
              <article className="rounded-2xl border border-border bg-surface p-6">
                <div className="flex items-start gap-4">
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-accent bg-bg text-lg"
                    aria-hidden
                  >
                    {module.emoji}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-subtle">
                      Stage {i + 1} of {modules.length}
                    </p>
                    <h3 className="mt-1 text-xl font-black tracking-tight">
                      {module.title}
                    </h3>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-muted">
                      {module.body}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {module.outcomes.map((outcome) => (
                        <li
                          key={outcome}
                          className="rounded-full border border-border bg-surface-2 px-3 py-1 text-sm font-medium"
                        >
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
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

      {/* Prereqs */}
      <section className="mt-20">
        <SectionHead eyebrow="Before you start" title="Who this is for">
          <p>
            You should be able to build and ship something on your own already:
            read an unfamiliar codebase, write tests, use git without fear. If
            you are not there yet, that is exactly what{' '}
            <Link href="/guide" className="font-bold text-accent hover:underline">
              The Guide
            </Link>{' '}
            is for. Walk that first, then come back. This course starts where it
            ends.
          </p>
        </SectionHead>
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
