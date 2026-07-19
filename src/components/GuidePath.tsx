'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll } from 'motion/react';
import { Reveal, Stagger, StaggerItem } from './motion';
import type { GuideSectionMeta } from '@/data/guide-path';

/**
 * The Guide overview as a path you walk, not a table of contents: chapters
 * are numbered stops on a dotted rail that inks itself in (accent) as you
 * scroll, each section ends in a "New moves" callout naming the abilities it
 * unlocks, and the milestone sections award a rank belt with a soft spring
 * settle, echoing the home page's belt path. Reduced-motion users get the
 * rail fully inked and opacity-only reveals.
 */

export type PathChapter = {
  slug: string;
  title: string;
  description: string;
  readingMinutes: number;
  /** 1-based stop number across the whole path. */
  number: number;
};

export type PathSection = {
  section: string;
  chapters: PathChapter[];
} & GuideSectionMeta;

/** Grid shell: a 40px marker gutter (the rail runs through it) + content. */
function Row({ marker, children }: { marker: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[40px_1fr] gap-x-4">
      <div className="relative z-10 flex justify-center pt-4">{marker}</div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

export function GuidePath({ sections }: { sections: PathSection[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.75', 'end 0.9'],
  });

  const totalChapters = sections.reduce((n, s) => n + s.chapters.length, 0);

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
        {sections.map((section, sectionIndex) => (
          <section key={section.section} aria-label={section.section}>
            {/* Section gate */}
            <Row
              marker={
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-accent bg-bg text-lg shadow-lg"
                  aria-hidden
                >
                  {section.emoji}
                </span>
              }
            >
              <Reveal>
                <p className="pt-1 text-xs font-black uppercase tracking-[0.2em] text-subtle">
                  Stage {sectionIndex + 1} of {sections.length}
                </p>
                <h2 className="mt-1 text-2xl font-black tracking-tight">{section.section}</h2>
              </Reveal>
            </Row>

            {/* Chapter stops */}
            <Stagger className="mt-4 flex flex-col gap-3">
              {section.chapters.map((chapter) => (
                <StaggerItem key={chapter.slug}>
                  <Row
                    marker={
                      <span
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-surface-2 text-sm font-bold text-muted"
                        aria-hidden
                      >
                        {chapter.number}
                      </span>
                    }
                  >
                    <Link
                      href={`/guide/${chapter.slug}`}
                      className="group block rounded-2xl border border-border bg-surface p-5 transition hover:-translate-y-0.5 hover:border-accent"
                    >
                      <span className="block font-bold transition-colors group-hover:text-accent">
                        {chapter.title}
                      </span>
                      {chapter.description && (
                        <span className="mt-1 block text-sm font-medium leading-relaxed text-muted">
                          {chapter.description}
                        </span>
                      )}
                      <span className="mt-2 block text-xs font-bold uppercase tracking-wide text-subtle">
                        Stop {chapter.number} of {totalChapters} · {chapter.readingMinutes} min
                      </span>
                    </Link>
                  </Row>
                </StaggerItem>
              ))}
            </Stagger>

            {/* New moves unlocked by this section */}
            {section.moves.length > 0 && (
              <div className="mt-3">
                <Row
                  marker={
                    <span className="pt-1 text-lg" aria-hidden>
                      ✨
                    </span>
                  }
                >
                  <Reveal>
                    <div
                      className="rounded-2xl border p-5"
                      style={{
                        borderColor: 'color-mix(in srgb, var(--accent) 45%, transparent)',
                        background: 'color-mix(in srgb, var(--accent) 8%, transparent)',
                      }}
                    >
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">
                        New moves unlocked
                      </p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {section.moves.map((move) => (
                          <li
                            key={move}
                            className="rounded-full border border-border bg-surface px-3 py-1 text-sm font-medium"
                          >
                            {move}
                          </li>
                        ))}
                      </ul>
                      {section.belt && (
                        <Reveal
                          className="mt-4 flex items-center gap-3"
                          spring
                          direction="down"
                          distance={16}
                          rotate={-3}
                        >
                          <Image
                            src={section.belt.src}
                            alt=""
                            width={200}
                            height={170}
                            className="w-14 drop-shadow-lg"
                          />
                          <span className="text-sm font-black">
                            Rank up: {section.belt.name} 🎉
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
              🏁
            </span>
          }
        >
          <Reveal>
            <p className="pt-2 text-base font-black">
              End of the path: your first offer.
            </p>
            <p className="mt-1 max-w-md text-sm font-medium leading-relaxed text-muted">
              The dojo door stays open. Come back, keep training, and mentor the
              next person walking it.
            </p>
          </Reveal>
        </Row>
      </div>
    </div>
  );
}
