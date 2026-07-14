import Link from 'next/link';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { nav, site } from '@/lib/site';
import { DiscordIcon, GitHubIcon } from './icons';
import { ToriiSeparator } from './ToriiSeparator';

/** Playful glyph per nav destination, echoing each page's theme. */
const NAV_GLYPH: Record<string, string> = {
  '/articles': '📖',
  '/guide': '🗺️',
  '/community': '⛩️',
};

/** A footer link styled as a rounded "training tile": emoji + label, lifts on hover. */
function FooterTile({
  href,
  glyph,
  external,
  children,
}: {
  href: string;
  glyph?: ReactNode;
  external?: boolean;
  children: ReactNode;
}) {
  const className =
    'group inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm text-muted transition hover:-translate-y-0.5 hover:border-accent hover:text-accent';
  const inner = (
    <>
      <span aria-hidden className="text-base leading-none transition-transform group-hover:scale-110">
        {glyph}
      </span>
      {children}
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={className}>
      {inner}
    </Link>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-20">
      <ToriiSeparator />
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 pb-10 pt-12 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div className="max-w-sm">
          <div className="flex items-center gap-2 font-semibold">
            <Image
              src="/dojo.png"
              alt=""
              width={1100}
              height={683}
              className="h-7 w-auto"
            />
            <span>{site.name}</span>
          </div>
          <p className="mt-2 text-sm text-muted">{site.description}</p>
        </div>

        <nav
          aria-label="Footer"
          className="flex max-w-xs flex-wrap gap-2 sm:justify-end"
        >
          {nav.map((item) => (
            <FooterTile key={item.href} href={item.href} glyph={NAV_GLYPH[item.href] ?? '•'}>
              {item.label}
            </FooterTile>
          ))}
          <FooterTile href={site.discordUrl} external glyph={<DiscordIcon className="h-4 w-4" />}>
            Discord
          </FooterTile>
          <FooterTile href={site.githubUrl} external glyph={<GitHubIcon className="h-4 w-4" />}>
            GitHub
          </FooterTile>
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
