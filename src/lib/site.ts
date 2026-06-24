/**
 * Site-wide configuration: brand, nav, external links.
 * Public values come from NEXT_PUBLIC_* env with safe fallbacks so the site
 * always builds, even without an env file.
 */

export const site = {
  name: 'Nekko Dojo',
  tagline: 'Train into tech. Grow your engineering career.',
  description:
    'Director-level perspective on engineering and AI, a step-by-step guide for switching into software development in Japan, and a directory of real-world open-source projects and communities to learn on a real team.',
  // Absolute URL used for metadata. Dojo lives under /dojo on the main domain.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nekkolabs.com',
  discordUrl:
    process.env.NEXT_PUBLIC_DISCORD_URL ?? 'https://discord.gg/nekkolabs',
  parentName: 'Nekko Labs',
  parentUrl: 'https://nekkolabs.com',
} as const;

export const nav: ReadonlyArray<{ label: string; href: string }> = [
  { label: 'Articles', href: '/articles' },
  { label: 'The Guide', href: '/guide' },
  { label: 'Skills', href: '/skills' },
  { label: 'Community', href: '/community' },
];

// The app is served under /dojo (see next.config.mjs `basePath`). Next applies
// basePath automatically to <Link> and assets, but NOT to plain `fetch()`. Use
// this when calling our own API routes from client components.
export const basePath = '/dojo';

export function withBasePath(path: string): string {
  return `${basePath}${path.startsWith('/') ? '' : '/'}${path}`;
}
