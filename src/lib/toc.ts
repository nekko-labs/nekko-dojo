import GithubSlugger from 'github-slugger';

/**
 * Heading extraction for the reading pages' table of contents.
 *
 * Slugs are produced with the same `github-slugger` that `rehype-slug` uses
 * when compiling the MDX, so the ids here always match the ids in the rendered
 * body (including its de-duplication of repeated headings).
 */

export type TocEntry = {
  id: string;
  title: string;
  /** Heading level: 2 or 3. Deeper headings are ignored — the TOC stays shallow. */
  depth: 2 | 3;
};

const HEADING = /^(#{2,3})\s+(.+?)\s*#*\s*$/;
const FENCE = /^\s*(```|~~~)/;

/** Strip the inline markdown (links, emphasis, code) a heading may contain. */
function plainText(markdown: string): string {
  return markdown
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_`]/g, '')
    .trim();
}

/** The `##`/`###` headings of an MDX body, in document order. */
export function getTableOfContents(body: string): TocEntry[] {
  const slugger = new GithubSlugger();
  const entries: TocEntry[] = [];
  let inFence = false;

  for (const line of body.split('\n')) {
    if (FENCE.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = HEADING.exec(line);
    if (!match) continue;

    const title = plainText(match[2]);
    if (!title) continue;

    entries.push({
      id: slugger.slug(title),
      title,
      depth: match[1].length === 2 ? 2 : 3,
    });
  }

  return entries;
}
