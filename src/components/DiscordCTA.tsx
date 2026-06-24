import { site } from '@/lib/site';
import { DiscordIcon } from './icons';

type DiscordCTAProps = {
  /** Compact inline button vs. full callout block. */
  variant?: 'block' | 'button';
  className?: string;
};

/**
 * Reusable "Join our Discord" call-to-action. Used on the home page, article
 * and chapter footers, and the community page. Target comes from site config
 * (NEXT_PUBLIC_DISCORD_URL with a fallback).
 */
export function DiscordCTA({ variant = 'block', className = '' }: DiscordCTAProps) {
  if (variant === 'button') {
    return (
      <a
        href={site.discordUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-fg transition-colors hover:bg-accent-hover ${className}`}
      >
        <DiscordIcon className="h-4 w-4" />
        Join our Discord
      </a>
    );
  }

  return (
    <section
      className={`rounded-2xl border border-border bg-surface p-8 text-center ${className}`}
    >
      <DiscordIcon className="mx-auto h-9 w-9 text-accent" />
      <h2 className="mt-3 text-xl font-semibold">Learning is better together</h2>
      <p className="mx-auto mt-2 max-w-prose text-muted">
        Get unstuck, find your first real issue, and meet others switching into
        tech. Join the Nekko Labs Discord — bring your questions.
      </p>
      <a
        href={site.discordUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-medium text-accent-fg transition-colors hover:bg-accent-hover"
      >
        <DiscordIcon className="h-5 w-5" />
        Join the Discord
      </a>
    </section>
  );
}
