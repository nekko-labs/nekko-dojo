/**
 * The Community page's "Helpful tools" section is fed by Vaizer's public
 * skills catalog API, so Dojo never hand-maintains the tool list: publish a
 * skill on Vaizer and it shows up here. The fetch is cached for an hour and
 * degrades to a small static fallback (mirroring the catalog's flagship
 * entries) when Vaizer is unreachable, so the page always builds and renders.
 */

export type VaizerSkill = {
  slug: string;
  name: string;
  description: string;
  tier: string;
  tierLabel: string;
  author: string;
  /** Absolute URL of the skill's page on Vaizer. */
  url: string;
};

const VAIZER_URL = process.env.NEXT_PUBLIC_VAIZER_URL || 'https://vaizer.app';

export const vaizerSkillsUrl = `${VAIZER_URL}/skills`;

/** Mirrors the catalog's flagship entries; used when the live fetch fails. */
const FALLBACK_SKILLS: VaizerSkill[] = [
  {
    slug: 'resume-checker',
    name: 'Resume Checker',
    description:
      'Check a resume against automated candidate-screening (ATS) signals and AI-centric job expectations, score it against specific job postings, then interactively apply fixes and see exactly what changed.',
    tier: 'nekko-official',
    tierLabel: 'Nekko official',
    author: 'Nekko Labs',
    url: `${VAIZER_URL}/skills/resume-checker`,
  },
  {
    slug: 'impeccable',
    name: 'Impeccable',
    description:
      'Paul Bakaus’s design language for AI harnesses: a shared vocabulary plus 46 deterministic detector rules that keep your agent’s UI work from sliding into slop. Not a Nekko Labs skill.',
    tier: 'curated',
    tierLabel: 'Curated',
    author: 'Paul Bakaus',
    url: `${VAIZER_URL}/skills/impeccable`,
  },
];

function isVaizerSkill(value: unknown): value is VaizerSkill {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.slug === 'string' &&
    typeof v.name === 'string' &&
    typeof v.description === 'string' &&
    typeof v.tier === 'string' &&
    typeof v.tierLabel === 'string' &&
    typeof v.author === 'string' &&
    typeof v.url === 'string'
  );
}

/** The live tool list from Vaizer, or the static fallback. Never throws. */
export async function getHelpfulTools(): Promise<VaizerSkill[]> {
  try {
    const res = await fetch(`${VAIZER_URL}/api/skills`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return FALLBACK_SKILLS;
    const data: unknown = await res.json();
    const skills =
      typeof data === 'object' && data !== null && Array.isArray((data as { skills?: unknown }).skills)
        ? (data as { skills: unknown[] }).skills.filter(isVaizerSkill)
        : [];
    return skills.length > 0 ? skills : FALLBACK_SKILLS;
  } catch {
    return FALLBACK_SKILLS;
  }
}
