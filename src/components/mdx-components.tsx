import Link from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';
import { AuthorBio } from './AuthorBio';

/**
 * Component overrides passed to next-mdx-remote when rendering article/guide
 * bodies. Internal links use next/link; external links open safely in a new tab.
 * Components listed here can also be used by name inside an MDX body.
 */

function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href) || href.startsWith('mailto:');
}

function Anchor({ href = '', children, ...rest }: ComponentPropsWithoutRef<'a'>) {
  if (isExternal(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}

export const mdxComponents = {
  a: Anchor,
  AuthorBio,
};
