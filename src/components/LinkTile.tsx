import { ExternalLinkIcon } from './icons';
import { TrackedLink } from './TrackedLink';

/**
 * A compact, fully-tappable card for networking communities and job
 * resources. Renders a small badge (e.g. the platform or "Junior friendly")
 * and fires a tracked click on navigation.
 */
export function LinkTile({
  href,
  name,
  description,
  badge,
  section,
  kind,
}: {
  href: string;
  name: string;
  description: string;
  badge?: string;
  section: string;
  kind?: string;
}) {
  return (
    <TrackedLink
      href={href}
      section={section}
      name={name}
      kind={kind}
      aria-label={`${name} (opens in a new tab)`}
      className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-5 transition hover:-translate-y-0.5 hover:border-accent"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold tracking-tight">{name}</h3>
        <ExternalLinkIcon className="mt-0.5 h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-accent" />
      </div>
      {badge && (
        <span className="mt-2 inline-flex w-fit rounded-full bg-surface-2 px-2.5 py-0.5 text-xs text-muted">
          {badge}
        </span>
      )}
      <p className="mt-2 flex-1 text-sm text-muted">{description}</p>
    </TrackedLink>
  );
}
