/**
 * Data behind the Community pillar, split into three sections:
 *
 *   1. `projects`   — real GitHub / open-source projects you can contribute to.
 *   2. `networking` — communities (Discord, Reddit, ...) to meet people.
 *   3. `jobBoards` + `juniorCompanies` — where to search for a job, and
 *      companies that tend to hire junior / early-career engineers.
 *
 * This is structured data (not prose), rendered by /community. Keep entries
 * accurate and verify URLs before adding. `featured: true` pins a project to
 * the top and surfaces it on the home page.
 */

export type Region = 'Japan' | 'Global';

/** A real open-source project someone can contribute to. */
export type Project = {
  id: string;
  name: string;
  /** Source repository, when it lives on GitHub. */
  github?: string;
  /** Project website / homepage, when it has one. */
  website?: string;
  /** Community server (Discord or Slack invite) to chat with maintainers. */
  community?: string;
  description: string;
  region: Region;
  tags: string[];
  /** Known to welcome newcomers / labels good-first-issues. */
  beginnerFriendly?: boolean;
  /** Pin to the top of the directory and surface on the home page. */
  featured?: boolean;
};

/**
 * The single best link to open for a project (GitHub first, then website, then
 * community server). Used for the home-page featured surface. Every project has
 * at least one of these, so this always returns a real URL.
 */
export function projectPrimaryUrl(p: Project): string {
  return p.github ?? p.website ?? p.community ?? '#';
}

/** A community to meet people and network. */
export type NetworkCommunity = {
  id: string;
  name: string;
  url: string;
  description: string;
  /** Where the community actually lives, shown as a badge. */
  platform: 'Discord' | 'Reddit' | 'Slack' | 'Forum';
  region: Region;
};

/** A place to search for a job, or a company that hires juniors. */
export type JobResource = {
  id: string;
  name: string;
  url: string;
  description: string;
  region: Region;
  /** Whether it's a job board/aggregator or a direct company careers page. */
  kind: 'board' | 'company';
};

// 1. Projects — actual OSS/GitHub projects you can contribute to.
export const projects: Project[] = [
  {
    id: 'open-paw',
    name: 'Open Paw',
    github: 'https://github.com/nekko-labs/open-paw',
    community: 'https://discord.gg/nekkolabs',
    description:
      'Nekko Labs’ local-first AI coding & cowork desktop app, with first-class support for local models (Ollama, LM Studio, vLLM). A modern TypeScript codebase and a great place to contribute alongside our team — say hi in the Discord.',
    region: 'Japan',
    tags: ['TypeScript', 'Desktop', 'Local-first', 'AI'],
    beginnerFriendly: true,
    featured: true,
  },
  {
    id: 'vaizer',
    name: 'Vaizer',
    github: 'https://github.com/nekko-labs/vaizer',
    website: 'https://vaizer.com',
    community: 'https://discord.gg/nekkolabs',
    description:
      'See how your agents work and what they are focused on: break down any skill into a readable workflow graph, and watch long-running agent loops make their way toward a goal. A Next.js + TypeScript project, developed in the open.',
    region: 'Japan',
    tags: ['TypeScript', 'Next.js', 'AI', 'Agents'],
    beginnerFriendly: true,
    featured: true,
  },
  {
    id: 'nekko-mcp',
    name: 'Nekko MCP',
    github: 'https://github.com/nekko-labs/nekko-mcp',
    community: 'https://discord.gg/nekkolabs',
    description:
      'A local-first runtime and manager for MCP servers — run them securely (process or Docker), supervise them, and expose one gateway for any agent harness. TypeScript, developed fully in the open.',
    region: 'Japan',
    tags: ['TypeScript', 'MCP', 'Local-first'],
    beginnerFriendly: true,
  },
  {
    id: 'nekko-journal',
    name: 'Nekko Journal',
    github: 'https://github.com/nekko-labs/nekko-journal',
    community: 'https://discord.gg/nekkolabs',
    description:
      'A calm, anti-streak monthly journaling and goal-tracking app — local-first. Set yearly goals, break them into months, and capture highlights, struggles, and photos. A friendly TypeScript project to get started on.',
    region: 'Japan',
    tags: ['TypeScript', 'Local-first', 'Product'],
    beginnerFriendly: true,
  },
  {
    id: 'nekko-dojo-skills',
    name: 'Nekko Dojo Skills',
    github: 'https://github.com/nekko-labs/nekko-dojo-skills',
    website: 'https://vaizer.com/skills',
    community: 'https://discord.gg/nekkolabs',
    description:
      'The Agent Skills marketplace — official and community Claude skills, installable as a Claude Code plugin marketplace (browse and visualize them on Vaizer). A low-barrier way to make your first open-source contribution by adding a skill, not just code.',
    region: 'Japan',
    tags: ['Claude skills', 'Open Source', 'Beginner'],
    beginnerFriendly: true,
  },
  {
    id: 'misskey',
    name: 'Misskey',
    github: 'https://github.com/misskey-dev/misskey',
    website: 'https://misskey-hub.net',
    community: 'https://discord.gg/Wp8gVStHW3',
    description:
      'A popular Japan-origin, decentralized social platform built with TypeScript/Vue. A large, active OSS project with issues across the difficulty spectrum — good for stretching beyond beginner work once you have your footing.',
    region: 'Japan',
    tags: ['TypeScript', 'Vue', 'Large project'],
  },
  {
    id: 'good-first-issue',
    name: 'Good First Issue',
    website: 'https://goodfirstissue.dev',
    description:
      'An aggregator of beginner-friendly issues across popular open-source projects worldwide. A solid way to find your very first contribution if nothing above fits yet.',
    region: 'Global',
    tags: ['Good first issue', 'Aggregator'],
    beginnerFriendly: true,
  },
];

// 2. Networking — communities to meet people already in the industry.
export const networking: NetworkCommunity[] = [
  {
    id: 'nekko-discord',
    name: 'Nekko Labs Discord',
    url: 'https://discord.gg/nekkolabs',
    description:
      'Our community for people switching into tech. Get unstuck, find your first real issue, and meet other career-changers and working engineers. Bring your questions.',
    platform: 'Discord',
    region: 'Japan',
  },
  {
    id: 'tokyodev-discord',
    name: 'TokyoDev',
    url: 'https://discord.com/invite/seUNe38YgV',
    description:
      'A busy Discord of 8,000+ international software developers in Japan. Job leads, salary talk, meetups, and honest advice on building a career here. One of the best rooms to be in.',
    platform: 'Discord',
    region: 'Japan',
  },
  {
    id: 'japandev-reddit',
    name: 'Japan Dev',
    url: 'https://www.reddit.com/r/JapanDev/',
    description:
      'Japan Dev runs its community on Reddit (r/JapanDev) rather than Discord — a good place to follow developer-friendly companies, ask questions, and read others’ experiences breaking into tech in Japan.',
    platform: 'Reddit',
    region: 'Japan',
  },
];

// 3a. Job boards — where to search, foreigner-friendly first.
export const jobBoards: JobResource[] = [
  {
    id: 'tokyodev',
    name: 'TokyoDev',
    url: 'https://www.tokyodev.com',
    description:
      'Curated software jobs in Japan for English speakers, many with visa sponsorship. The go-to board for international developers here.',
    region: 'Japan',
    kind: 'board',
  },
  {
    id: 'japandev',
    name: 'Japan Dev',
    url: 'https://japan-dev.com',
    description:
      'A curated board of developer-friendly companies in Japan, with guides on what teams actually look for.',
    region: 'Japan',
    kind: 'board',
  },
  {
    id: 'indeed',
    name: 'Indeed Japan',
    url: 'https://jp.indeed.com',
    description:
      'The largest job site in Japan by volume. Filter by English-required or remote roles — huge reach, so search precisely.',
    region: 'Japan',
    kind: 'board',
  },
  {
    id: 'gaijinpot',
    name: 'GaijinPot Jobs',
    url: 'https://jobs.gaijinpot.com',
    description:
      'Japan’s biggest English job board. Every listing is open to foreigners and many offer visa sponsorship.',
    region: 'Japan',
    kind: 'board',
  },
  {
    id: 'careercross',
    name: 'CareerCross',
    url: 'https://www.careercross.com',
    description:
      'A bilingual board with strong filters for English-only roles and visa support. Good for IT and engineering positions.',
    region: 'Japan',
    kind: 'board',
  },
  {
    id: 'daijob',
    name: 'Daijob',
    url: 'https://www.daijob.com',
    description:
      'A long-running bilingual board connecting foreign talent with global companies in Japan. Most roles expect some Japanese.',
    region: 'Japan',
    kind: 'board',
  },
  {
    id: 'wantedly',
    name: 'Wantedly',
    url: 'https://www.wantedly.com',
    description:
      'Where Japanese startups and tech companies recruit. Much of it is in Japanese, but it’s the best way to discover smaller teams.',
    region: 'Japan',
    kind: 'board',
  },
  {
    id: 'jobsinjapan',
    name: 'Jobs in Japan',
    url: 'https://jobsinjapan.com',
    description:
      'An English-friendly board covering tech and non-tech roles across Japan, including entry-level positions.',
    region: 'Japan',
    kind: 'board',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn Jobs',
    url: 'https://www.linkedin.com/jobs',
    description:
      'Set your location to Japan and filter for English roles. Great for reaching recruiters at international companies.',
    region: 'Global',
    kind: 'board',
  },
];

// 3b. Companies that tend to hire junior / early-career engineers and run
//     English-friendly environments in Japan. Direct careers pages.
export const juniorCompanies: JobResource[] = [
  {
    id: 'mercari',
    name: 'Mercari',
    url: 'https://careers.mercari.com/en/',
    description:
      'Japan’s biggest C2C marketplace. English-friendly engineering org with new-grad and early-career programs.',
    region: 'Japan',
    kind: 'company',
  },
  {
    id: 'rakuten',
    name: 'Rakuten',
    url: 'https://global.rakuten.com/corp/careers/',
    description:
      'English is the official in-company language. Large-scale hiring including new grads across many engineering teams.',
    region: 'Japan',
    kind: 'company',
  },
  {
    id: 'lycorp',
    name: 'LY Corporation (LINE / Yahoo)',
    url: 'https://careers.lycorp.co.jp/en',
    description:
      'The company behind LINE and Yahoo! Japan. Broad engineering hiring, including early-career and new-grad tracks.',
    region: 'Japan',
    kind: 'company',
  },
  {
    id: 'paypay',
    name: 'PayPay',
    url: 'https://paypay-corp.co.jp/recruit/en',
    description:
      'Japan’s leading QR-payments app, built by a highly international team. Actively hires engineers, English OK.',
    region: 'Japan',
    kind: 'company',
  },
  {
    id: 'woven',
    name: 'Woven by Toyota',
    url: 'https://woven.toyota/en/careers/',
    description:
      'Toyota’s mobility software arm. Diverse, English-first teams and one of the more accessible routes for international engineers.',
    region: 'Japan',
    kind: 'company',
  },
  {
    id: 'freee',
    name: 'freee',
    url: 'https://jobs.freee.co.jp',
    description:
      'A leading Japanese SaaS company with international developers and English documentation across engineering.',
    region: 'Japan',
    kind: 'company',
  },
  {
    id: 'moneyforward',
    name: 'Money Forward',
    url: 'https://recruit.moneyforward.com/en',
    description:
      'A fintech SaaS company (personal finance + B2B accounting) with a growing, English-friendly engineering org.',
    region: 'Japan',
    kind: 'company',
  },
];

/** Projects surfaced on the home page ("Get real experience"). */
export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

/** Projects sorted with featured entries first. */
export function getAllProjects(): Project[] {
  return [...projects].sort(
    (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
  );
}
