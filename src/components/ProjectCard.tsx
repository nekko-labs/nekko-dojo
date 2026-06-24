import type { Community } from '@/data/communities';
import { ExternalLinkIcon } from './icons';

const typeLabel: Record<Community['type'], string> = {
  'oss-project': 'OSS project',
  community: 'Community',
};

export function ProjectCard({ community }: { community: Community }) {
  return (
    <article
      className={`flex flex-col rounded-2xl border bg-surface p-6 transition-colors hover:border-accent ${
        community.featured ? 'border-accent/50' : 'border-border'
      }`}
    >
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-full bg-surface-2 px-2.5 py-0.5 text-muted">
          {typeLabel[community.type]}
        </span>
        <span className="rounded-full bg-surface-2 px-2.5 py-0.5 text-muted">
          {community.region}
        </span>
        {community.beginnerFriendly && (
          <span className="rounded-full bg-accent/12 px-2.5 py-0.5 font-medium text-accent">
            Beginner friendly
          </span>
        )}
        {community.featured && (
          <span className="ml-auto text-accent" aria-label="Featured">
            ★
          </span>
        )}
      </div>

      <h3 className="mt-3 text-lg font-semibold tracking-tight">{community.name}</h3>
      <p className="mt-2 flex-1 text-sm text-muted">{community.description}</p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {community.tags.map((tag) => (
          <li key={tag} className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs text-muted">
            {tag}
          </li>
        ))}
      </ul>

      <a
        href={community.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover"
      >
        Visit
        <ExternalLinkIcon className="h-3.5 w-3.5" />
      </a>
    </article>
  );
}
