import type { Project } from '@/data/communities';

/**
 * README-driven project descriptions for the Community directory. Instead of
 * hand-writing card copy that drifts out of date, each project card pulls its
 * description from the project's own public README (the `## Overview` section
 * when present, else the first real prose paragraph). Fetches are cached for
 * an hour and every failure falls back to the typed description in
 * `data/communities.ts`, so the page always builds and renders without
 * network access or tokens.
 */

const REVALIDATE_SECONDS = 3600;
const MAX_LENGTH = 300;

/** Extract `owner/repo` from a github.com URL. */
function parseRepo(githubUrl: string): { owner: string; repo: string } | null {
  const m = /^https:\/\/github\.com\/([^/]+)\/([^/#?]+)/.exec(githubUrl);
  if (!m) return null;
  return { owner: m[1], repo: m[2].replace(/\.git$/, '') };
}

/** Strip markdown/HTML syntax down to plain sentence text. */
function plainText(md: string): string {
  return md
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '') // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // links -> text
    .replace(/<[^>]+>/g, '') // html tags
    .replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, '$1') // bold/italic
    .replace(/`([^`]*)`/g, '$1') // inline code
    .replace(/\s+/g, ' ')
    .trim();
}

/** True for blocks that aren't prose (badges, tables, headings, quotes, code). */
function isNoise(block: string): boolean {
  const t = block.trim();
  return (
    t.length === 0 ||
    /^[#>|`~<!-]/.test(t) ||
    t.startsWith('[![') ||
    t.startsWith('![')
  );
}

/** Trim to a card-sized excerpt, preferring a sentence boundary. */
function excerpt(text: string): string {
  if (text.length <= MAX_LENGTH) return text;
  const cut = text.slice(0, MAX_LENGTH);
  const sentenceEnd = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('.'));
  if (sentenceEnd > MAX_LENGTH * 0.5) return cut.slice(0, sentenceEnd + 1);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
}

/** The body of the `## Overview` section, or null when the README has none. */
function overviewSection(readme: string): string | null {
  const lines = readme.split(/\r?\n/);
  const start = lines.findIndex((line) => /^##\s+overview\s*$/i.test(line.trim()));
  if (start === -1) return null;
  const rest = lines.slice(start + 1);
  const end = rest.findIndex((line) => /^#{1,6}\s/.test(line));
  return rest.slice(0, end === -1 ? undefined : end).join('\n');
}

/**
 * Pull the overview prose out of a README: the body of a `## Overview`
 * section when the repo provides one, otherwise the first real paragraph.
 * Exported for tests; returns null when nothing usable is found.
 */
export function extractOverview(readme: string): string | null {
  const source = overviewSection(readme) ?? readme;

  for (const block of source.split(/\r?\n\s*\r?\n/)) {
    if (isNoise(block)) continue;
    const text = plainText(block);
    if (text.length >= 80) return excerpt(text);
  }
  return null;
}

/** Fetch a repo's README and extract its overview. Null on any failure. */
export async function fetchReadmeOverview(githubUrl: string): Promise<string | null> {
  const repo = parseRepo(githubUrl);
  if (!repo) return null;
  try {
    const res = await fetch(
      `https://raw.githubusercontent.com/${repo.owner}/${repo.repo}/HEAD/README.md`,
      { next: { revalidate: REVALIDATE_SECONDS } },
    );
    if (!res.ok) return null;
    return extractOverview(await res.text());
  } catch {
    return null;
  }
}

/**
 * The directory's projects with README-sourced descriptions where available.
 * The typed data stays the curation/ordering layer and the fallback copy.
 */
export async function withReadmeDescriptions(projects: Project[]): Promise<Project[]> {
  return Promise.all(
    projects.map(async (project) => {
      if (!project.github) return project;
      const overview = await fetchReadmeOverview(project.github);
      return overview ? { ...project, description: overview } : project;
    }),
  );
}
