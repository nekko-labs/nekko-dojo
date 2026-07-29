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
 * the top of the directory.
 *
 * A project's `description` here is the fallback: at render time the
 * directory pulls fresher copy from the project's own README when it has a
 * GitHub repo (see `lib/github-readme.ts`). Its `art` is a small graphic from
 * the project itself (a shot of its own site), so a reader can see what the
 * thing *is* before deciding to open it. Recapture it when a project rebrands
 * or redesigns.
 */

export type Region = 'Japan' | 'Global';

/** A small graphic from the project, shown at the top of its card. */
export type ProjectArt = {
  /** Lives in `public/projects/`, 16:9, captured from the project's own site. */
  src: string;
  /** What the graphic shows, for readers who can't see it. */
  alt: string;
};

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
  /** Marketing graphic from the project, so the card shows what it is. */
  art?: ProjectArt;
  /** Known to welcome newcomers / labels good-first-issues. */
  beginnerFriendly?: boolean;
  /** Pin to the top of the directory. */
  featured?: boolean;
};

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
    id: 'kotrain',
    name: 'Kotrain',
    github: 'https://github.com/nekko-labs/kotrain',
    website: 'https://kotrain.com',
    community: 'https://discord.gg/nekkolabs',
    description:
      'Nekko Labs’ local-first AI coding and cowork desktop app: point it at Ollama, LM Studio or vLLM in one click, or bring your own cloud keys. A modern TypeScript codebase and a great place to contribute alongside our team; say hi in the Discord.',
    region: 'Japan',
    tags: ['TypeScript', 'Desktop', 'Local-first', 'AI'],
    art: {
      src: '/projects/kotrain.webp',
      alt: 'Kotrain’s site: “Train your models. Run your agents. Own your machine.”',
    },
    beginnerFriendly: true,
    featured: true,
  },
  {
    id: 'vaizer',
    name: 'Vaizer',
    github: 'https://github.com/nekko-labs/vaizer',
    website: 'https://vaizer.app',
    community: 'https://discord.gg/nekkolabs',
    description:
      'Agent and prompt management, made visible: read any skill as a workflow graph before you run it, version the prompts behind it, and watch long-running agent loops from one HUD. A Next.js + TypeScript project, developed in the open.',
    region: 'Japan',
    tags: ['TypeScript', 'Next.js', 'AI', 'Agents'],
    art: {
      src: '/projects/vaizer.webp',
      alt: 'Vaizer’s site: a skill drawn as a workflow graph of command, context, tool and loop nodes',
    },
    beginnerFriendly: true,
    featured: true,
  },
  {
    id: 'hypergate',
    name: 'Hypergate',
    github: 'https://github.com/nekko-labs/hypergate',
    website: 'https://hypergate.app',
    community: 'https://discord.gg/nekkolabs',
    description:
      'Every MCP server, one gate: a local-first runtime and manager that runs MCP servers securely (process or Docker), supervises them, and puts a single gateway endpoint in front of any agent harness. A TypeScript daemon plus a Rust desktop shell, developed fully in the open.',
    region: 'Japan',
    tags: ['TypeScript', 'Rust', 'MCP', 'Local-first'],
    art: {
      src: '/projects/hypergate.webp',
      alt: 'Hypergate’s site: “Every MCP server. One gate.” over a glowing gate ring',
    },
    beginnerFriendly: true,
  },
  {
    id: 'getsu',
    name: 'Getsu',
    github: 'https://github.com/nekko-labs/getsu',
    // getsu.app is bought and attached to the deployment, but its DNS is still
    // parked at the registrar, so link the live URL until that lands.
    website: 'https://getsu-chi.vercel.app',
    community: 'https://discord.gg/nekkolabs',
    description:
      'A calm, anti-streak monthly journaling and goal-tracking app, local-first. Set goals for the year, place each on the month where it will happen, and capture that month’s highlights, struggles and photos. A friendly TypeScript project to get started on.',
    region: 'Japan',
    tags: ['TypeScript', 'Local-first', 'Product'],
    art: {
      src: '/projects/getsu.webp',
      alt: 'Getsu’s site: a crescent-moon cat mark above “A life you can look back on, one month at a time”',
    },
    beginnerFriendly: true,
  },
  {
    id: 'nekko-dojo-skills',
    name: 'Nekko Dojo Skills',
    github: 'https://github.com/nekko-labs/nekko-dojo-skills',
    website: 'https://vaizer.app/skills',
    community: 'https://discord.gg/nekkolabs',
    description:
      'The Agent Skills hub: official and community Claude skills, installable as a Claude Code plugin marketplace (browse and visualize them on Vaizer). A low-barrier way to make your first open-source contribution by adding a skill, not just code.',
    region: 'Japan',
    tags: ['Claude skills', 'Open Source', 'Beginner'],
    art: {
      src: '/projects/nekko-dojo-skills.webp',
      alt: 'The skills catalog on Vaizer: searchable cards for Domain Finder, nyaa and Resume Checker',
    },
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
    art: {
      src: '/projects/misskey.webp',
      alt: 'Misskey’s site: “Create. Connect. with Misskey.” beside its green 3D logo',
    },
  },
  {
    id: 'good-first-issue',
    name: 'Good First Issue',
    website: 'https://goodfirstissue.dev',
    description:
      'An aggregator of beginner-friendly issues across popular open-source projects worldwide. A solid way to find your very first contribution if nothing above fits yet.',
    region: 'Global',
    tags: ['Good first issue', 'Aggregator'],
    art: {
      src: '/projects/good-first-issue.webp',
      alt: 'Good First Issue: beginner-friendly issues listed per repository, browsable by language',
    },
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

/** Projects sorted with featured entries first. */
export function getAllProjects(): Project[] {
  return [...projects].sort(
    (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
  );
}
