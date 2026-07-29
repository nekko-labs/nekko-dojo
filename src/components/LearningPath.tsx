'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll } from 'motion/react';
import { Reveal, Stagger, StaggerItem } from './motion';

/**
 * A course overview as a path you walk, not a table of contents. Both courses
 * render through this so they read as two routes through the same dojo: stages
 * are gates on a dotted rail that inks itself in (accent) as you scroll, each
 * stage ends in a "New moves" callout naming the abilities it unlocks, and the
 * milestone stages award a rank with a soft spring settle, echoing the home
 * page's belt path. Reduced-motion users get the rail fully inked and
 * opacity-only reveals.
 *
 * The Guide fills each stage with chapter stops; Applied AI Engineer has no
 * lessons written yet, so its stages carry a `body` instead. A stage with
 * neither still renders.
 */

export type PathBelt = {
  /** Belt image under /public/belts. */
  src: string;
  name: string;
};

export type PathStop = {
  key: string;
  title: string;
  description?: string;
  /** Metadata line under the title, e.g. "Stop 3 of 12 · 7 min". */
  meta?: string;
  /** Omit for a stop with no page yet: it renders as a panel, not a link. */
  href?: string;
  /** What the rail marker shows, usually the stop number. */
  marker: string;
};

export type PathStage = {
  key: string;
  title: string;
  emoji: string;
  /** Lead paragraph under the stage title, when the stage has no stops. */
  body?: string;
  stops: PathStop[];
  /** Abilities unlocked by finishing the stage, shown as "New moves". */
  moves: string[];
  /** Awarded at milestone stages only, like a real dojo. */
  belt?: PathBelt;
};

/** Grid shell: a 40px marker gutter (the rail runs through it) + content. */
function Row({ marker, children }: { marker: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[40px_1fr] gap-x-4">
      <div className="relative z-10 flex justify-center pt-4">{marker}</div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

export function LearningPath({
  stages,
  end,
}: {
  stages: PathStage[];
  /** The finish line at the bottom of the rail. */
  end: { emoji: string; title: string; body: string };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.75', 'end 0.9'],
  });

  return (
    <div ref={ref} className="relative">
      {/* The rail: a dotted base the accent line inks over as you scroll. */}
      <div
        className="absolute bottom-8 left-[19px] top-4 border-l-2 border-dotted border-border"
        aria-hidden
      />
      <motion.div
        className="absolute bottom-8 left-[19px] top-4 w-0.5 origin-top rounded-full bg-accent"
        style={{ scaleY: reduced ? 1 : scrollYProgress }}
        aria-hidden
      />

      <div className="flex flex-col gap-12">
        {stages.map((stage, stageIndex) => (
          <section key={stage.key} aria-label={stage.title}>
            {/* Stage gate */}
            <Row
              marker={
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-accent bg-bg text-lg shadow-lg"
                  aria-hidden
                >
                  {stage.emoji}
                </span>
              }
            >
              <Reveal>
                <p className="pt-1 text-xs font-black uppercase tracking-[0.2em] text-subtle">
                  Stage {stageIndex + 1} of {stages.length}
                </p>
                <h2 className="mt-1 text-2xl font-black tracking-tight">{stage.title}</h2>
                {stage.body && (
                  <p className="mt-2 text-sm font-medium leading-relaxed text-muted">
                    {stage.body}
                  </p>
                )}
              </Reveal>
            </Row>

            {/* Stops along the way */}
            {stage.stops.length > 0 && (
              <Stagger className="mt-4 flex flex-col gap-3">
                {stage.stops.map((stop) => (
                  <StaggerItem key={stop.key}>
                    <Row
                      marker={
                        <span
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-surface-2 text-sm font-bold text-muted"
                          aria-hidden
                        >
                          {stop.marker}
                        </span>
                      }
                    >
                      <StopPanel stop={stop} />
                    </Row>
                  </StaggerItem>
                ))}
              </Stagger>
            )}

            {/* New moves unlocked by this stage */}
            {stage.moves.length > 0 && (
              <div className="mt-3">
                <Row
                  marker={
                    <span className="pt-1 text-lg" aria-hidden>
                      ✨
                    </span>
                  }
                >
                  <Reveal>
                    <div className="rounded-2xl border border-accent-line bg-accent-soft p-5">
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">
                        New moves unlocked
                      </p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {stage.moves.map((move) => (
                          <li
                            key={move}
                            className="rounded-full border border-border bg-surface px-3 py-1 text-sm font-medium"
                          >
                            {move}
                          </li>
                        ))}
                      </ul>
                      {stage.belt && (
                        <Reveal
                          className="mt-4 flex items-center gap-3"
                          spring
                          direction="down"
                          distance={16}
                          rotate={-3}
                        >
                          <Image
                            src={stage.belt.src}
                            alt=""
                            width={200}
                            height={170}
                            className="w-14 drop-shadow-lg"
                          />
                          <span className="text-sm font-black">
                            Rank up: {stage.belt.name} 🎉
                          </span>
                        </Reveal>
                      )}
                    </div>
                  </Reveal>
                </Row>
              </div>
            )}
          </section>
        ))}

        {/* End of the path */}
        <Row
          marker={
            <span
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-accent bg-accent text-lg shadow-lg"
              aria-hidden
            >
              {end.emoji}
            </span>
          }
        >
          <Reveal>
            <p className="pt-2 text-base font-black">{end.title}</p>
            <p className="mt-1 max-w-md text-sm font-medium leading-relaxed text-muted">
              {end.body}
            </p>
          </Reveal>
        </Row>
      </div>
    </div>
  );
}

/** One stop: a link once its page exists, otherwise a quiet unlinked panel. */
function StopPanel({ stop }: { stop: PathStop }) {
  const body = (
    <>
      <span className="block font-bold transition-colors group-hover:text-accent">
        {stop.title}
      </span>
      {stop.description && (
        <span className="mt-1 block text-sm font-medium leading-relaxed text-muted">
          {stop.description}
        </span>
      )}
      {stop.meta && (
        <span className="mt-2 block text-xs font-bold uppercase tracking-wide text-subtle">
          {stop.meta}
        </span>
      )}
    </>
  );

  if (!stop.href) {
    return <div className="rounded-2xl border border-border bg-surface p-5">{body}</div>;
  }

  return (
    <Link
      href={stop.href}
      className="group block rounded-2xl border border-border bg-surface p-5 transition hover:-translate-y-0.5 hover:border-accent"
    >
      {body}
    </Link>
  );
}

/**
 * The ranks a path awards, in order: a compact strip for a course header so
 * you can see the whole progression before committing to the walk.
 */
export function BeltStrip({ belts, label }: { belts: PathBelt[]; label: string }) {
  if (belts.length === 0) return null;

  return (
    <div>
      <p className="text-xs font-black uppercase tracking-[0.2em] text-subtle">{label}</p>
      <ul className="mt-3 flex flex-wrap items-end gap-x-5 gap-y-3">
        {belts.map((belt, i) => (
          <li key={`${belt.src}-${belt.name}`} className="flex items-end gap-5">
            <span className="flex flex-col items-center">
              <Image
                src={belt.src}
                alt=""
                width={200}
                height={170}
                className="w-12 drop-shadow-lg"
              />
              <span className="mt-1 text-[11px] font-bold uppercase tracking-wide text-muted">
                {belt.name}
              </span>
            </span>
            {i < belts.length - 1 && (
              <span className="pb-4 text-subtle" aria-hidden>
                →
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
