import { compileMDX } from 'next-mdx-remote/rsc';
import { mdxOptions } from '@/lib/mdx';
import { mdxComponents } from './mdx-components';
import { ContentNotice } from './ContentNotice';
import { site } from '@/lib/site';

/**
 * Async server component that compiles and renders an MDX body string with our
 * shared plugins (GFM, slugged headings, shiki) and component overrides.
 *
 * A blank body or a body that fails to compile degrades to a designed notice
 * instead of taking the whole reading page down with it — the header, chapter
 * navigation and CTA around it stay usable.
 */
export async function Mdx({ source }: { source: string }) {
  if (source.trim().length === 0) {
    return (
      <ContentNotice title="This one is still being written">
        There is no text here yet. It is on the mat and coming soon — the Discord hears about new
        chapters and essays first.
      </ContentNotice>
    );
  }

  try {
    const { content } = await compileMDX({
      source,
      components: mdxComponents,
      options: mdxOptions,
    });
    return content;
  } catch (error) {
    console.error('[mdx] failed to compile a content body', error);
    return (
      <ContentNotice tone="error" title="We couldn’t render this page">
        Something in this document is malformed, so we stopped rather than showing you half of it.
        We&apos;ve logged it — tell us in{' '}
        <a
          href={site.discordUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-accent hover:text-accent-hover"
        >
          the Discord
        </a>{' '}
        if it sticks around.
      </ContentNotice>
    );
  }
}
