/**
 * Site-wide configuration: brand, nav, external links.
 * Public values come from NEXT_PUBLIC_* env with safe fallbacks so the site
 * always builds, even without an env file.
 */

export const site = {
  name: 'Nekko Dojo',
  tagline: 'Train into tech. Grow your engineering career.',
  description:
    'On a mission to help you break into software engineering and never stop growing. Learn in a community of career-changers and working engineers, guided by experienced leaders who have done the hiring.',
  // Absolute URL used for metadata. Dojo lives at its own subdomain.
  // Use `||` (not `??`) so an empty-string env var falls back too — Vercel
  // currently has these set to "", which `??` would pass straight through.
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://dojo.nekkolabs.com',
  discordUrl:
    process.env.NEXT_PUBLIC_DISCORD_URL || 'https://discord.gg/nekkolabs',
  githubUrl:
    process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/nekko-labs/nekko-dojo',
  parentName: 'Nekko Labs',
  parentUrl: 'https://nekkolabs.com',
} as const;

export const nav: ReadonlyArray<{ label: string; href: string }> = [
  { label: 'Articles', href: '/articles' },
  { label: 'The Guide', href: '/guide' },
  { label: 'Skills', href: '/skills' },
  { label: 'Community', href: '/community' },
];
