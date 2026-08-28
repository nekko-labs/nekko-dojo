'use client';

import { useState } from 'react';
import type { Project, Region } from '@/data/communities';
import { ProjectCard } from './ProjectCard';
import { LinkTile } from './LinkTile';
import { Reveal, Stagger, StaggerItem } from './motion';

/**
 * The filterable listing shared by /get-hired and /projects: one or more
 * sections of cards, narrowed by location. Filtering is client-side over data
 * loaded on the server, so the full directory is still in the HTML for
 * crawlers and no-JS readers.
 *
 * Sections arrive fully resolved. Badges and analytics `kind`s are computed on
 * the server rather than passed as functions, since functions cannot cross the
 * server/client boundary.
 */

/** A link-tile entry, flattened from a networking community or job resource. */
export type DirectoryLink = {
  id: string;
  url: string;
  name: string;
  description: string;
  badge: string;
  /** Analytics label for the tile, e.g. `board`, `company`, `discord`. */
  kind: string;
  region: Region;
};

type SectionBase = {
  /** Anchor id, so the section can be deep-linked. */
  id: string;
  title: string;
  blurb: string;
  /** Analytics section name passed through to each tile. */
  analytics: string;
};

export type DirectorySection =
  | (SectionBase & { kind: 'projects'; items: Project[] })
  | (SectionBase & { kind: 'links'; items: DirectoryLink[] });

type LocationFilter = 'all' | Region;

const LOCATIONS: { id: LocationFilter; label: string }[] = [
  { id: 'all', label: 'Anywhere' },
  { id: 'Japan', label: 'Japan' },
  { id: 'Global', label: 'Global' },
];

const chipBase =
  'rounded-full border px-3.5 py-1.5 text-sm font-bold transition-colors focus-visible:outline-2';
const chipOff = 'border-border bg-surface text-muted hover:border-accent hover:text-fg';
const chipOn = 'border-accent bg-accent/12 text-accent';

function Chip({
  label,
  pressed,
  onClick,
}: {
  label: string;
  pressed: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`${chipBase} ${pressed ? chipOn : chipOff}`}
    >
      {label}
    </button>
  );
}

export function Directory({
  sections,
  /** Plural noun for the running count, e.g. "entries" or "projects". */
  noun = 'entries',
  emptyHint,
}: {
  sections: DirectorySection[];
  noun?: string;
  emptyHint: string;
}) {
  const [location, setLocation] = useState<LocationFilter>('all');

  const inLocation = (entry: { region: Region }) =>
    location === 'all' || entry.region === location;

  // Filtering inside each discriminated branch keeps the section's own item
  // type, so the render below still knows whether it holds projects or links.
  const visible: DirectorySection[] = sections.map((section) =>
    section.kind === 'projects'
      ? { ...section, items: section.items.filter(inLocation) }
      : { ...section, items: section.items.filter(inLocation) },
  );

  const total = visible.reduce((sum, section) => sum + section.items.length, 0);
  const filtered = location !== 'all';
  const singular = noun.replace(/e?s$/, '');

  return (
    <>
      <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6">
        <div
          className="flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Filter by location"
        >
          <span className="mr-1 text-xs font-bold uppercase tracking-wide text-muted">Where</span>
          {LOCATIONS.map((option) => (
            <Chip
              key={option.id}
              label={option.label}
              pressed={location === option.id}
              onClick={() => setLocation(option.id)}
            />
          ))}
          {filtered && (
            <button
              type="button"
              onClick={() => setLocation('all')}
              className="ml-1 text-sm font-bold text-accent hover:text-accent-hover"
            >
              Clear filter
            </button>
          )}
        </div>
        <p aria-live="polite" className="text-sm text-muted">
          {`Showing ${total} ${total === 1 ? singular : noun}.`}
        </p>
      </div>

      {total === 0 && (
        <p className="mt-10 rounded-2xl border border-border bg-surface p-6 text-sm text-muted">
          {emptyHint}
        </p>
      )}

      {visible.map((section) =>
        section.items.length === 0 ? null : (
          <section
            key={section.id}
            id={section.id}
            aria-labelledby={`${section.id}-heading`}
            className="mt-14 scroll-mt-20 first-of-type:mt-12"
          >
            <Reveal>
              <h2 id={`${section.id}-heading`} className="text-2xl font-black tracking-tight">
                {section.title}
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-muted">{section.blurb}</p>
            </Reveal>

            {section.kind === 'projects' ? (
              <Stagger className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {section.items.map((project) => (
                  <StaggerItem key={project.id} instant className="h-full">
                    <ProjectCard project={project} />
                  </StaggerItem>
                ))}
              </Stagger>
            ) : (
              <Stagger className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {section.items.map((entry) => (
                  <StaggerItem key={entry.id} instant className="h-full">
                    <LinkTile
                      href={entry.url}
                      name={entry.name}
                      description={entry.description}
                      badge={entry.badge}
                      section={section.analytics}
                      kind={entry.kind}
                    />
                  </StaggerItem>
                ))}
              </Stagger>
            )}
          </section>
        ),
      )}
    </>
  );
}
