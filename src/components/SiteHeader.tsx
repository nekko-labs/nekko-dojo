import Link from 'next/link';
import { nav, site } from '@/lib/site';
import { DiscordCTA } from './DiscordCTA';

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
          <DiscordCTA variant="button" className="ml-1 hidden sm:inline-flex" />
        </nav>
      </div>
    </header>
  );
}
