import type { Project } from '@/data/communities';
import { DiscordIcon, GitHubIcon, GlobeIcon, SlackIcon } from './icons';
import { TrackedLink } from './TrackedLink';

/**
 * A contribute-to-me OSS project. Each project surfaces up to three explicit
 * links — its GitHub repo, website, and community server (Discord/Slack) —
 * shown only when that resource exists. Every link fires a tracked click.
 */
export function ProjectCard({ project }: { project: Project }) {
  // A Slack invite gets the Slack glyph; anything else (Discord) is a server.
  const isSlack = project.community?.includes('slack.com');
  const CommunityIcon = isSlack ? SlackIcon : DiscordIcon;
  const communityLabel = isSlack ? 'Slack' : 'Discord';

  return (
    <div
      className={`group flex h-full flex-col rounded-2xl border bg-surface p-5 transition hover:-translate-y-0.5 hover:border-accent sm:p-6 ${
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

      <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-4 text-sm">
        {project.github && (
          <TrackedLink
            href={project.github}
            section="projects"
            name={project.name}
            kind="project-github"
            aria-label={`${project.name} on GitHub (opens in a new tab)`}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 font-medium text-muted transition-colors hover:border-accent hover:text-fg"
          >
            <GitHubIcon className="h-4 w-4" />
            GitHub
          </TrackedLink>
        )}
        {project.website && (
          <TrackedLink
            href={project.website}
            section="projects"
            name={project.name}
            kind="project-website"
            aria-label={`${project.name} website (opens in a new tab)`}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 font-medium text-muted transition-colors hover:border-accent hover:text-fg"
          >
            <GlobeIcon className="h-4 w-4" />
            Website
          </TrackedLink>
        )}
        {project.community && (
          <TrackedLink
            href={project.community}
            section="projects"
            name={project.name}
            kind="project-community"
            aria-label={`${project.name} ${communityLabel} community (opens in a new tab)`}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 font-medium text-muted transition-colors hover:border-accent hover:text-fg"
          >
            <CommunityIcon className="h-4 w-4" />
            {communityLabel}
          </TrackedLink>
        )}
      </div>
    </div>
  );
}
