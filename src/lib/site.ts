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

/** A single destination in the primary nav. */
export type NavLeaf = { label: string; href: string };

/**
 * A labelled group of destinations. The group itself has no page of its own:
 * it is a menu trigger in the desktop header and a heading in the mobile
 * panel, so adding a sibling to `items` needs no nav-component change.
 */
export type NavGroup = { label: string; items: ReadonlyArray<NavLeaf> };

export type NavEntry = NavLeaf | NavGroup;

export const isNavGroup = (entry: NavEntry): entry is NavGroup => 'items' in entry;

/** Every leaf in the nav, groups flattened, in reading order. */
export const navLeaves = (entries: ReadonlyArray<NavEntry>): NavLeaf[] =>
  entries.flatMap((entry) => (isNavGroup(entry) ? [...entry.items] : [entry]));

export const nav: ReadonlyArray<NavEntry> = [
  { label: 'Articles', href: '/articles' },
  { label: 'Courses', href: '/courses' },
  { label: 'Get Hired', href: '/get-hired' },
  { label: 'Projects', href: '/projects' },
  {
    label: 'Agentic Coding',
    items: [{ label: 'Agent Skills', href: '/agentic-coding/skills' }],
  },
];
