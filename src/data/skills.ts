/**
 * The Agent Skills hub catalog.
 *
 * Three sources/tiers:
 *  - `nekko-official` — built & reviewed by Nekko Labs; safe to run when connected.
 *  - `community`      — submitted publicly via PR to the marketplace repo; passes
 *                       automated checks + human review; audit before use.
 *  - `curated`        — great external skills (e.g. Anthropic's). Linked with
 *                       attribution, NOT re-hosted — install from their source.
 *
 * Installable skills (nekko-official + community) live in the marketplace repo
 * `nekkolabs/nekko-dojo-skills` and carry an `installCommand`. Curated entries
 * link out via `sourceUrl` and have no install command in our channel.
 *
 * This is structured, typed data (v1). A future enhancement can generate it
 * from the marketplace's `catalog.json`. Vote counts are NOT stored here —
 * they come from Supabase at request time (see `lib/votes.ts`).
 */

export type SkillSource = 'nekko-official' | 'community' | 'curated';

export type SkillCategory =
  | 'research'
  | 'writing'
  | 'coding'
  | 'data'
  | 'design'
  | 'productivity'
  | 'devops';

export type Skill = {
  id: string;
  name: string;
  slug: string;
  /** One-line summary used on cards and as the meta description. */
  description: string;
  /** Longer prose for the detail page (optional). */
  longDescription?: string;
  category: SkillCategory;
  tags: string[];
  source: SkillSource;
  author: string;
  /** Link to the skill's source (our repo, or the external origin for curated). */
  sourceUrl: string;
  /** Present for skills installable via our marketplace. */
  installCommand?: string;
  /** Known to be approachable for newcomers. */
  beginnerFriendly?: boolean;
  /** Pin toward the top. */
  featured?: boolean;
};

/** The marketplace these skills install from. */
export const skillsMarketplace = {
  name: 'nekko-dojo-skills',
  repoUrl: 'https://github.com/nekkolabs/nekko-dojo-skills',
  addCommand: '/plugin marketplace add nekkolabs/nekko-dojo-skills',
} as const;

export const sourceLabels: Record<SkillSource, string> = {
  'nekko-official': 'Nekko official',
  community: 'Community',
  curated: 'Curated',
};

export const categoryLabels: Record<SkillCategory, string> = {
  research: 'Research',
  writing: 'Writing',
  coding: 'Coding',
  data: 'Data',
  design: 'Design',
  productivity: 'Productivity',
  devops: 'DevOps',
};

export const skills: Skill[] = [
  {
    id: 'domain-finder',
    name: 'Domain Finder',
    slug: 'domain-finder',
    description:
      'Brainstorm startup/project names, check domain availability across TLDs via RDAP, and vet brand/trademark conflicts.',
    longDescription:
      'A three-stage naming workflow: (1) generate brandable name candidates and synonyms from your concept, (2) check domain availability across any TLD using RDAP (the modern, structured successor to WHOIS — it resolves endpoints from IANA’s registry, so any TLD with a public RDAP service works), and (3) research brand/trademark conflicts for the survivors and produce a ranked shortlist. The bundled checker is dependency-free, validates input, handles internationalized (Japanese) domains, and is rate-limit friendly.',
    category: 'research',
    tags: ['domains', 'naming', 'branding', 'rdap', 'startup', 'trademark'],
    source: 'nekko-official',
    author: 'Nekko Labs',
    sourceUrl:
      'https://github.com/nekkolabs/nekko-dojo-skills/tree/main/plugins/domain-finder',
    installCommand: '/plugin install domain-finder@nekko-dojo-skills',
    beginnerFriendly: true,
    featured: true,
  },
  // --- Curated external skills (link-only, attributed) ---
  {
    id: 'anthropic-skill-creator',
    name: 'Skill Creator',
    slug: 'skill-creator',
    description:
      'Anthropic’s official skill for creating, editing, and improving Agent Skills — scaffolds a SKILL.md and bundled resources.',
    category: 'productivity',
    tags: ['skills', 'authoring', 'meta', 'official'],
    source: 'curated',
    author: 'Anthropic',
    sourceUrl: 'https://github.com/anthropics/skills',
    featured: true,
  },
  {
    id: 'anthropic-pdf',
    name: 'PDF Tools',
    slug: 'pdf-tools',
    description:
      'Anthropic’s official skill for working with PDFs — extract text and tables, fill forms, merge, split, and create documents.',
    category: 'data',
    tags: ['pdf', 'documents', 'extraction', 'official'],
    source: 'curated',
    author: 'Anthropic',
    sourceUrl: 'https://github.com/anthropics/skills',
  },
  {
    id: 'anthropic-mcp-builder',
    name: 'MCP Builder',
    slug: 'mcp-builder',
    description:
      'Anthropic’s official skill for building Model Context Protocol (MCP) servers that connect agents to external tools and data.',
    category: 'devops',
    tags: ['mcp', 'integrations', 'servers', 'official'],
    source: 'curated',
    author: 'Anthropic',
    sourceUrl: 'https://github.com/anthropics/skills',
  },
];

const sourceRank: Record<SkillSource, number> = {
  'nekko-official': 0,
  curated: 1,
  community: 2,
};

/** All skills, featured first, then by source tier, then by name. */
export function getAllSkills(): Skill[] {
  return [...skills].sort(
    (a, b) =>
      Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
      sourceRank[a.source] - sourceRank[b.source] ||
      a.name.localeCompare(b.name),
  );
}

export function getFeaturedSkills(): Skill[] {
  return getAllSkills().filter((s) => s.featured);
}

export function getSkillBySlug(slug: string): Skill | undefined {
  return skills.find((s) => s.slug === slug);
}

/** Distinct categories present in the catalog, in label order. */
export function getUsedCategories(): SkillCategory[] {
  const present = new Set(skills.map((s) => s.category));
  return (Object.keys(categoryLabels) as SkillCategory[]).filter((c) => present.has(c));
}
