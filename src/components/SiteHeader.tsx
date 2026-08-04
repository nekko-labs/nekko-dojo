import Link from 'next/link';
import Image from 'next/image';
import { nav, site } from '@/lib/site';
import { DiscordIcon, GitHubIcon, NAV_ICONS } from './icons';
import { NavLink } from './NavLink';
import { MobileNav } from './MobileNav';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-bg/70 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="/"
          className="site-logo flex items-center gap-2.5 text-lg font-black tracking-tight"
        >
          <Image
            src="/dojo.png"
            alt=""
            width={1100}
            height={683}
            sizes="2.5rem"
            className="logo-mark h-9 w-auto sm:h-10"
          />
          <span className="whitespace-nowrap">{site.name}</span>
        </Link>

        {/* The inline nav needs room for icon + label pills plus the wordmark,
            so it waits for md; below that the mobile menu takes over. */}
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex md:gap-1.5 lg:gap-2">
          {nav.map((item) => {
            const Icon = NAV_ICONS[item.href];
            return (
              <NavLink
                key={item.href}
                href={item.href}
                className="nav-link relative inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-bold text-muted transition-colors hover:bg-surface-2 hover:text-fg"
              >
                {Icon && (
                  <span className="nav-ico" aria-hidden="true">
                    <Icon className="h-4 w-4" />
                  </span>
                )}
                {item.label}
              </NavLink>
            );
          })}
          <a
            href={site.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Nekko Dojo on GitHub"
            className="nav-link ml-1 inline-flex items-center rounded-full p-2 text-muted transition-colors hover:bg-surface-2 hover:text-fg"
          >
            <span className="nav-ico" aria-hidden="true">
              <GitHubIcon className="h-5 w-5" />
            </span>
          </a>
          <a
            href={site.discordUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-discord ml-1 hidden items-center gap-2 rounded-full bg-fg px-4 py-2.5 text-sm font-bold text-bg transition-transform hover:-translate-y-0.5 md:inline-flex lg:px-5"
          >
            <span className="cta-ico" aria-hidden="true">
              <DiscordIcon className="h-4 w-4" />
            </span>
            Join the Discord
          </a>
        </nav>

        <MobileNav />
      </div>
    </header>
  );
}
