import Link from 'next/link';
import { nav, site } from '@/lib/site';
import { DiscordIcon } from './icons';

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div className="max-w-sm">
          <div className="flex items-center gap-2 font-semibold">
            <span aria-hidden>🐱⛩️</span>
            <span>{site.name}</span>
          </div>
          <p className="mt-2 text-sm text-muted">{site.description}</p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-2 text-sm">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-muted hover:text-fg">
              {item.label}
            </Link>
          ))}
          <a
            href={site.discordUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-muted hover:text-fg"
          >
            <DiscordIcon className="h-4 w-4" />
            Discord
          </a>
        </nav>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-5xl px-4 py-5 text-xs text-muted sm:px-6">
          A{' '}
          <a
            href={site.parentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-fg"
          >
            {site.parentName}
          </a>{' '}
          project.
        </div>
      </div>
    </footer>
  );
}
