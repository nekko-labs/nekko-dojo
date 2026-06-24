import { compileMDX } from 'next-mdx-remote/rsc';
import { mdxOptions } from '@/lib/mdx';
import { mdxComponents } from './mdx-components';

/**
 * Async server component that compiles and renders an MDX body string with our
 * shared plugins (GFM, slugged headings, shiki) and component overrides.
 */
export async function Mdx({ source }: { source: string }) {
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: mdxOptions,
  });
  return content;
}
