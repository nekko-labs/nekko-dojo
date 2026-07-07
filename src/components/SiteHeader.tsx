import Link from 'next/link';
import { nav, site } from '@/lib/site';
import { DiscordCTA } from './DiscordCTA';
import { GitHubIcon } from './icons';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-bg/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span aria-hidden className="text-lg">
            🐱⛩️
          </span>
          <span>{site.name}</span>
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-1 sm:gap-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-fg"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={site.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Nekko Labs on GitHub"
            className="ml-1 inline-flex items-center rounded-full p-2 text-muted transition-colors hover:bg-surface-2 hover:text-fg"
          >
            <GitHubIcon className="h-5 w-5" />
          </a>
          <DiscordCTA variant="button" className="hidden sm:inline-flex" />
        </nav>
      </div>
    </header>
  );
}
