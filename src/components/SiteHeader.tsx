import Link from 'next/link';
import { nav, site } from '@/lib/site';
import { DiscordIcon, GitHubIcon } from './icons';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-bg/70 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5 text-lg font-black tracking-tight">
          <span aria-hidden className="text-xl">
            🐱⛩️
          </span>
          <span>{site.name}</span>
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-1 sm:gap-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 text-sm font-bold text-muted transition-colors hover:bg-surface-2 hover:text-fg"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={site.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Nekko Dojo on GitHub"
            className="ml-1 inline-flex items-center rounded-full p-2 text-muted transition-colors hover:bg-surface-2 hover:text-fg"
          >
            <GitHubIcon className="h-5 w-5" />
          </a>
          <a
            href={site.discordUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 hidden items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-bold text-bg transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            <DiscordIcon className="h-4 w-4" />
            Join the Discord
          </a>
        </nav>
      </div>
    </header>
  );
}
