'use client';

import { useEffect, useState } from 'react';
import type { TocEntry } from '@/lib/toc';

/**
 * Sticky "on this page" outline for long-form reading. Highlights the section
 * currently under the header via an IntersectionObserver over the headings the
 * MDX body rendered (ids come from the same slugger, see `lib/toc.ts`).
 */
export function TableOfContents({ entries }: { entries: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string>(entries[0]?.id ?? '');

  useEffect(() => {
    const headings = entries
      .map((entry) => document.getElementById(entry.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (records) => {
        const visible = records
          .filter((record) => record.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
          return;
        }
        // Nothing in the band: fall back to the last heading scrolled past.
        const passed = headings.filter((el) => el.getBoundingClientRect().top < 120);
        if (passed.length > 0) setActiveId(passed[passed.length - 1].id);
      },
      { rootMargin: '-96px 0px -70% 0px', threshold: 0 },
    );

    for (const heading of headings) observer.observe(heading);
    return () => observer.disconnect();
  }, [entries]);

  if (entries.length < 2) return null;

  return (
    <nav aria-labelledby="toc-heading" className="sticky top-28 hidden max-h-[70vh] overflow-y-auto lg:block">
      <p id="toc-heading" className="text-xs font-bold uppercase tracking-wide text-muted">
        On this page
      </p>
      <ul className="mt-3 space-y-1.5 border-l border-border">
        {entries.map((entry) => {
          const active = entry.id === activeId;
          return (
            <li key={entry.id}>
              <a
                href={`#${entry.id}`}
                aria-current={active ? 'location' : undefined}
                className={`-ml-px block border-l py-0.5 text-sm leading-snug transition-colors ${
                  entry.depth === 3 ? 'pl-6' : 'pl-3'
                } ${
                  active
                    ? 'border-accent font-bold text-accent'
                    : 'border-transparent text-muted hover:border-border hover:text-fg'
                }`}
              >
                {entry.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
