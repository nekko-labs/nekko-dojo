import type { PluggableList } from 'unified';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode, { type Options as PrettyCodeOptions } from 'rehype-pretty-code';

const prettyCodeOptions: PrettyCodeOptions = {
  // Dual theme: shiki emits --shiki-light / --shiki-dark CSS vars that
  // globals.css flips with prefers-color-scheme.
  theme: { light: 'github-light', dark: 'github-dark-dimmed' },
  keepBackground: false,
};

/**
 * Shared MDX compile options for next-mdx-remote (RSC `compileMDX`).
 * GFM for tables/strikethrough, slugged headings with wrap-anchors, and
 * shiki-powered syntax highlighting.
 */
const remarkPlugins: PluggableList = [remarkGfm];

const rehypePlugins: PluggableList = [
  rehypeSlug,
  [rehypePrettyCode, prettyCodeOptions],
  [rehypeAutolinkHeadings, { behavior: 'wrap', properties: { className: ['heading-anchor'] } }],
];

export const mdxOptions = {
  mdxOptions: {
    remarkPlugins,
    rehypePlugins,
  },
};
