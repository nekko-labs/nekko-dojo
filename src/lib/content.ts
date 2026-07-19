import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

/**
 * Content layer — the single source of truth for reading MDX off disk.
 * Pages should import from here rather than touching the filesystem or
 * parsing frontmatter ad-hoc. Swapping to a CMS later means reimplementing
 * these functions only.
 */

const CONTENT_DIR = path.join(process.cwd(), 'content');
const ARTICLES_DIR = path.join(CONTENT_DIR, 'articles');
const GUIDE_DIR = path.join(CONTENT_DIR, 'guide');

const WORDS_PER_MINUTE = 200;

export type ArticleMeta = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO yyyy-mm-dd
  tags: string[];
  author: string;
  draft: boolean;
  readingMinutes: number;
};

export type GuideChapterMeta = {
  slug: string;
  title: string;
  description: string;
  order: number;
  section: string;
  draft: boolean;
  readingMinutes: number;
};

export type Loaded<TMeta> = { meta: TMeta; body: string };

function readMdxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));
}

function readingMinutes(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

function asString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === 'string') : [];
}

function asBool(value: unknown): boolean {
  return value === true;
}

/**
 * Coerce a frontmatter date to a `yyyy-mm-dd` string. YAML parses an unquoted
 * ISO date (e.g. `date: 2026-06-18`) into a Date object, not a string, so a
 * plain `asString` would drop it. Handle both the Date and already-string cases.
 */
function asDateString(value: unknown): string {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  return typeof value === 'string' ? value : '';
}

// --- Articles ---------------------------------------------------------------

function parseArticle(file: string): Loaded<ArticleMeta> {
  const slug = file.replace(/\.mdx$/, '');
  const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), 'utf8');
  const { data, content } = matter(raw);
  return {
    body: content,
    meta: {
      slug,
      title: asString(data.title, slug),
      description: asString(data.description),
      date: asDateString(data.date),
      tags: asStringArray(data.tags),
      author: asString(data.author, 'Philip'),
      draft: asBool(data.draft),
      readingMinutes: readingMinutes(content),
    },
  };
}

export function getAllArticles(includeDrafts = false): ArticleMeta[] {
  return readMdxFiles(ARTICLES_DIR)
    .map((file) => parseArticle(file).meta)
    .filter((meta) => includeDrafts || !meta.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1)); // newest first
}

export function getArticle(slug: string): Loaded<ArticleMeta> | null {
  const file = `${slug}.mdx`;
  if (!fs.existsSync(path.join(ARTICLES_DIR, file))) return null;
  return parseArticle(file);
}

// --- Guide ------------------------------------------------------------------

function chapterSlugFromFile(file: string): string {
  // Strip the NN- ordering prefix and the .mdx extension.
  return file.replace(/\.mdx$/, '').replace(/^\d+[-_]/, '');
}

function parseChapter(file: string): Loaded<GuideChapterMeta> {
  const raw = fs.readFileSync(path.join(GUIDE_DIR, file), 'utf8');
  const { data, content } = matter(raw);
  const prefixMatch = file.match(/^(\d+)[-_]/);
  const orderFromPrefix = prefixMatch ? Number(prefixMatch[1]) : Number.MAX_SAFE_INTEGER;
  return {
    body: content,
    meta: {
      slug: chapterSlugFromFile(file),
      title: asString(data.title, file),
      description: asString(data.description),
      order: typeof data.order === 'number' ? data.order : orderFromPrefix,
      section: asString(data.section, 'Guide'),
      draft: asBool(data.draft),
      readingMinutes: readingMinutes(content),
    },
  };
}

export function getAllGuideChapters(includeDrafts = false): GuideChapterMeta[] {
  return readMdxFiles(GUIDE_DIR)
    .map((file) => parseChapter(file).meta)
    .filter((meta) => includeDrafts || !meta.draft)
    .sort((a, b) => a.order - b.order);
}

export function getGuideChapter(slug: string): Loaded<GuideChapterMeta> | null {
  const file = readMdxFiles(GUIDE_DIR).find((f) => chapterSlugFromFile(f) === slug);
  if (!file) return null;
  return parseChapter(file);
}

/** Previous/next chapters in reading order, for chapter footer navigation. */
export function getAdjacentChapters(slug: string): {
  prev: GuideChapterMeta | null;
  next: GuideChapterMeta | null;
} {
  const all = getAllGuideChapters();
  const index = all.findIndex((c) => c.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? all[index - 1] : null,
    next: index < all.length - 1 ? all[index + 1] : null,
  };
}

/** Chapters grouped by `section`, preserving reading order within each group. */
export function getGuideSections(): { section: string; chapters: GuideChapterMeta[] }[] {
  const groups = new Map<string, GuideChapterMeta[]>();
  for (const chapter of getAllGuideChapters()) {
    const list = groups.get(chapter.section) ?? [];
    list.push(chapter);
    groups.set(chapter.section, list);
  }
  return Array.from(groups, ([section, chapters]) => ({ section, chapters }));
}
