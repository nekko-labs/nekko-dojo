/**
 * Curated open-source projects and communities where learners can gain real
 * team experience — beyond solo portfolio projects. Japan-focused first.
 *
 * This is structured data (not prose), rendered by the Community pillar.
 * Keep entries accurate; verify URLs before adding. `featured: true` pins an
 * entry to the top. The first two featured entries are intentional:
 * findadoc.jp and the Nekko Labs OSS community.
 */

export type CommunityType = 'oss-project' | 'community';
export type Region = 'Japan' | 'Global';

export type Community = {
  id: string;
  name: string;
  url: string;
  description: string;
  type: CommunityType;
  region: Region;
  tags: string[];
  /** Known to welcome newcomers / labels good-first-issues. */
  beginnerFriendly?: boolean;
  /** Pin to the top of the directory. */
  featured?: boolean;
};

export const communities: Community[] = [
  {
    id: 'findadoc',
    name: 'Find a Doc Japan',
    url: 'https://findadoc.jp',
    description:
      'An open-source, NPO-run directory helping people in Japan find healthcare providers who can support them in their language. A welcoming, well-organized codebase (TypeScript/Vue/GraphQL) that has helped 225+ engineers learn by contributing — several landed jobs through it. The best place to get real team experience as a career-changer.',
    type: 'oss-project',
    region: 'Japan',
    tags: ['TypeScript', 'Vue', 'GraphQL', 'NPO', 'good first issue'],
    beginnerFriendly: true,
    featured: true,
  },
  {
    id: 'nekko-oss',
    name: 'Nekko Labs Open Source',
    url: 'https://nekkolabs.com',
    description:
      'Nekko Labs builds in the open. Join the community to contribute to our projects alongside working engineers, pair on issues, and learn how a real team ships software. Start in the Discord to find an issue that fits you.',
    type: 'community',
    region: 'Japan',
    tags: ['TypeScript', 'Open Source', 'Mentorship', 'Discord'],
    beginnerFriendly: true,
    featured: true,
  },
  {
    id: 'nekko-notes',
    name: 'Nekko Notes',
    url: 'https://nekkolabs.com',
    description:
      'An AI-first, local-first notetaking app built by Nekko Labs — a real TypeScript product with a real team. A great project to contribute to once you have the basics, and to practice working in a modern codebase. Ask in the Discord to get started.',
    type: 'oss-project',
    region: 'Japan',
    tags: ['TypeScript', 'React', 'Open Source'],
    beginnerFriendly: true,
  },
  {
    id: 'tokyodev',
    name: 'TokyoDev',
    url: 'https://www.tokyodev.com',
    description:
      'A long-running community and resource hub for international software developers in Japan — jobs, salary data, and a busy Discord. Great for understanding the market and meeting people already working in the industry here.',
    type: 'community',
    region: 'Japan',
    tags: ['Community', 'Jobs', 'Discord', 'For developers in Japan'],
    beginnerFriendly: true,
  },
  {
    id: 'japandev',
    name: 'Japan Dev',
    url: 'https://japan-dev.com',
    description:
      'A curated job board and guides focused on developer-friendly companies in Japan. Useful once you are ready to start applying, and for learning what teams here actually look for.',
    type: 'community',
    region: 'Japan',
    tags: ['Jobs', 'Guides', 'For developers in Japan'],
  },
  {
    id: 'misskey',
    name: 'Misskey',
    url: 'https://github.com/misskey-dev/misskey',
    description:
      'A popular Japan-origin, decentralized social platform built with TypeScript/Vue. A large, active OSS project with issues across the difficulty spectrum — good for stretching beyond beginner work once you have your footing.',
    type: 'oss-project',
    region: 'Japan',
    tags: ['TypeScript', 'Vue', 'Large project'],
  },
  {
    id: 'good-first-issue',
    name: 'Good First Issue',
    url: 'https://goodfirstissue.dev',
    description:
      'An aggregator of beginner-friendly issues across popular open-source projects worldwide. A solid way to find your very first contribution if nothing above fits yet.',
    type: 'community',
    region: 'Global',
    tags: ['Good first issue', 'Aggregator'],
    beginnerFriendly: true,
  },
];

export function getFeaturedCommunities(): Community[] {
  return communities.filter((c) => c.featured);
}

export function getAllCommunities(): Community[] {
  // Featured first, then the rest in declared order.
  return [...communities].sort(
    (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
  );
}
