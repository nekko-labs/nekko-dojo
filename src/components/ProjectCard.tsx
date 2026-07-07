import type { Project } from '@/data/communities';
import { ExternalLinkIcon } from './icons';
import { TrackedLink } from './TrackedLink';

/**
 * A contribute-to-me OSS project. The whole card is one large tap target
 * (better on mobile) and fires a tracked click on navigation.
 */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <TrackedLink
      href={project.url}
      section="projects"
      name={project.name}
      kind="project"
      aria-label={`${project.name} (opens in a new tab)`}
      className={`group flex h-full flex-col rounded-2xl border bg-surface p-5 transition-colors hover:border-accent sm:p-6 ${
        project.featured ? 'border-accent/50' : 'border-border'
      }`}
    >
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-full bg-surface-2 px-2.5 py-0.5 text-muted">
          {project.region}
        </span>
        {project.beginnerFriendly && (
          <span className="rounded-full bg-accent/12 px-2.5 py-0.5 font-medium text-accent">
            Beginner friendly
          </span>
        )}
        {project.featured && (
          <span className="ml-auto text-accent" aria-label="Featured">
            ★
          </span>
        )}
      </div>

      <h3 className="mt-3 text-lg font-semibold tracking-tight">{project.name}</h3>
      <p className="mt-2 flex-1 text-sm text-muted">{project.description}</p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li key={tag} className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs text-muted">
            {tag}
          </li>
        ))}
      </ul>

      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent group-hover:text-accent-hover">
        Visit
        <ExternalLinkIcon className="h-3.5 w-3.5" />
      </span>
    </TrackedLink>
  );
}
