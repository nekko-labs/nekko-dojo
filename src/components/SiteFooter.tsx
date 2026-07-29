import Link from 'next/link';
import Image from 'next/image';
import { nav, site } from '@/lib/site';
import { DiscordCTA } from './DiscordCTA';
import { DiscordIcon, GitHubIcon, GlobeIcon } from './icons';
import { ToriiSeparator } from './ToriiSeparator';

/**
 * Site footer: brand block with the Discord CTA, then two link columns
 * (site navigation, community destinations), then a legal strip with the
 * mascot strolling along the top of it. Icons are SVGs from icons.tsx —
 * never emoji — per STYLESEED rule 4.1.
 */

const COMMUNITY_LINKS = [
  { label: 'Discord', href: site.discordUrl, Icon: DiscordIcon },
  { label: 'GitHub', href: site.githubUrl, Icon: GitHubIcon },
  { label: site.parentName, href: site.parentUrl, Icon: GlobeIcon },
] as const;

function ColumnHeading({ children }: { children: string }) {
  return <h2 className="text-sm font-semibold">{children}</h2>;
}

export function SiteFooter() {
  return (
    <footer className="mt-24">
      <ToriiSeparator />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-14 pt-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-[minmax(0,1fr)_auto_auto] lg:gap-20">
        <div className="max-w-sm sm:col-span-2 lg:col-span-1">
          <Link href="/" className="inline-flex items-center gap-2 font-semibold">
            <Image src="/dojo.png" alt="" width={1100} height={683} className="h-7 w-auto" />
            <span>{site.name}</span>
          </Link>
          <p className="mt-3 text-sm text-muted">{site.tagline}</p>
          <DiscordCTA variant="button" className="mt-5" />
        </div>

        <nav aria-label="Footer">
          <ColumnHeading>Explore</ColumnHeading>
          <ul className="mt-4 space-y-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-muted transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <ColumnHeading>Community</ColumnHeading>
          <ul className="mt-4 space-y-3">
            {COMMUNITY_LINKS.map(({ label, href, Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-accent"
                >
                  <Icon className="h-4 w-4 text-subtle transition-colors group-hover:text-accent" />
                  {label}
                  <span className="sr-only">(opens in new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative border-t border-border">
        {/* The mascot strolls along the wall above the legal strip. */}
        <Image
          src="/mascot/nekko-walk.png"
          alt=""
          aria-hidden
          width={761}
          height={1000}
          className="pointer-events-none absolute -top-12 right-6 h-12 w-auto sm:right-10"
        />
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-5 py-5 text-xs text-muted sm:px-8">
          <p>
            A{' '}
            <a
              href={site.parentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-fg"
            >
              {site.parentName}
              <span className="sr-only">(opens in new tab)</span>
            </a>{' '}
            project.
          </p>
          <p>
            © {new Date().getFullYear()} {site.parentName}
          </p>
        </div>
      </div>
    </footer>
  );
}
