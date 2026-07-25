'use client';

import { useState } from 'react';
import type { JobResource, NetworkCommunity, Project, Region } from '@/data/communities';
import { ProjectCard } from './ProjectCard';
import { LinkTile } from './LinkTile';
import { Reveal, Stagger, StaggerItem } from './motion';

/**
 * The filterable half of the Community page: projects, networking communities,
 * job boards and junior-friendly companies, narrowed by entry type and
 * location. Filtering is client-side over data loaded on the server, so the
 * full directory is still in the HTML for crawlers and no-JS readers.
 */

type EntryType = 'projects' | 'networking' | 'boards' | 'companies';

const ENTRY_TYPES: { id: EntryType; label: string }[] = [
  { id: 'projects', label: 'Projects' },
  { id: 'networking', label: 'Networking' },
  { id: 'boards', label: 'Job boards' },
  { id: 'companies', label: 'Companies' },
];

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
  count,
  pressed,
  onClick,
}: {
  label: string;
  count?: number;
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
      {typeof count === 'number' && (
        <span className="ml-1.5 text-xs font-medium opacity-70">{count}</span>
      )}
    </button>
  );
}

function SectionHeading({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <h2 id={`${id}-heading`} className="text-2xl font-black tracking-tight">
        {title}
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-muted">{children}</p>
    </Reveal>
  );
}

export function CommunityDirectory({
  projects,
  networking,
  jobBoards,
  juniorCompanies,
}: {
  projects: Project[];
  networking: NetworkCommunity[];
  jobBoards: JobResource[];
  juniorCompanies: JobResource[];
}) {
  const [types, setTypes] = useState<EntryType[]>([]);
  const [location, setLocation] = useState<LocationFilter>('all');

  const showType = (type: EntryType) => types.length === 0 || types.includes(type);
  const inLocation = (entry: { region: Region }) => location === 'all' || entry.region === location;

  const toggleType = (type: EntryType) =>
    setTypes((current) =>
      current.includes(type) ? current.filter((t) => t !== type) : [...current, type],
    );

  const visible = {
    projects: showType('projects') ? projects.filter(inLocation) : [],
    networking: showType('networking') ? networking.filter(inLocation) : [],
    boards: showType('boards') ? jobBoards.filter(inLocation) : [],
    companies: showType('companies') ? juniorCompanies.filter(inLocation) : [],
  };

  const counts: Record<EntryType, number> = {
    projects: projects.filter(inLocation).length,
    networking: networking.filter(inLocation).length,
    boards: jobBoards.filter(inLocation).length,
    companies: juniorCompanies.filter(inLocation).length,
  };

  const total =
    visible.projects.length +
    visible.networking.length +
    visible.boards.length +
    visible.companies.length;
  const filtered = types.length > 0 || location !== 'all';
  const showJobs = visible.boards.length > 0 || visible.companies.length > 0;

  return (
    <>
      <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by type">
          <span className="mr-1 text-xs font-bold uppercase tracking-wide text-muted">Type</span>
          {ENTRY_TYPES.map((type) => (
            <Chip
              key={type.id}
              label={type.label}
              count={counts[type.id]}
              pressed={types.includes(type.id)}
              onClick={() => toggleType(type.id)}
            />
          ))}
        </div>
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
              onClick={() => {
                setTypes([]);
                setLocation('all');
              }}
              className="ml-1 text-sm font-bold text-accent hover:text-accent-hover"
            >
              Clear filters
            </button>
          )}
        </div>
        <p aria-live="polite" className="text-sm text-muted">
          {filtered
            ? `Showing ${total} ${total === 1 ? 'entry' : 'entries'}.`
            : `${total} entries across projects, communities and job resources.`}
        </p>
      </div>

      {total === 0 && (
        <p className="mt-10 rounded-2xl border border-border bg-surface p-6 text-sm text-muted">
          Nothing matches those filters yet. Clear one of them — or tell us in the Discord what we
          should add.
        </p>
      )}

      {visible.projects.length > 0 && (
        <section id="projects" aria-labelledby="projects-heading" className="mt-12 scroll-mt-20">
          <SectionHeading id="projects" title="Projects to contribute to">
            Real GitHub / open-source projects where you can work on a team, ship code that ships,
            and build a portfolio that actually counts.
          </SectionHeading>
          <Stagger className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.projects.map((project) => (
              <StaggerItem key={project.id} instant className="h-full">
                <ProjectCard project={project} />
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      )}

      {visible.networking.length > 0 && (
        <section
          id="networking"
          aria-labelledby="networking-heading"
          className="mt-14 scroll-mt-20"
        >
          <SectionHeading id="networking" title="Networking">
            Communities where you can ask questions, hear about openings before they hit the
            boards, and meet people already working in tech here.
          </SectionHeading>
          <Stagger className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {visible.networking.map((c) => (
              <StaggerItem key={c.id} instant className="h-full">
                <LinkTile
                  href={c.url}
                  name={c.name}
                  description={c.description}
                  badge={c.platform}
                  section="networking"
                  kind={c.platform.toLowerCase()}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      )}

      {showJobs && (
        <section id="jobs" aria-labelledby="jobs-heading" className="mt-14 scroll-mt-20">
          <SectionHeading id="jobs" title="Where to search for a job">
            Foreigner-friendly job boards first, then companies that run English-friendly teams and
            tend to hire junior and early-career engineers.
          </SectionHeading>

          {visible.boards.length > 0 && (
            <>
              <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-muted">
                Job boards
              </h3>
              <Stagger className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {visible.boards.map((b) => (
                  <StaggerItem key={b.id} instant className="h-full">
                    <LinkTile
                      href={b.url}
                      name={b.name}
                      description={b.description}
                      badge={b.region === 'Japan' ? 'Japan' : 'Global'}
                      section="job-boards"
                      kind="board"
                    />
                  </StaggerItem>
                ))}
              </Stagger>
            </>
          )}

          {visible.companies.length > 0 && (
            <>
              <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-muted">
                Companies that hire juniors
              </h3>
              <Stagger className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {visible.companies.map((c) => (
                  <StaggerItem key={c.id} instant className="h-full">
                    <LinkTile
                      href={c.url}
                      name={c.name}
                      description={c.description}
                      badge="Junior friendly"
                      section="companies"
                      kind="company"
                    />
                  </StaggerItem>
                ))}
              </Stagger>
            </>
          )}
        </section>
      )}
    </>
  );
}
