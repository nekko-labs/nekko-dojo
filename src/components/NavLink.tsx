'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/** A section link is current for its index route and everything under it. */
export function isActivePath(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * A primary-nav link that knows whether the visitor is currently inside its
 * section and says so with aria-current. The styling hooks in globals.css
 * (.nav-link, .mnav-item) key off the attribute, so the announcement and the
 * amber belt underline can never disagree.
 */
export function NavLink({
  href,
  className,
  onClick,
  children,
}: {
  href: string;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActivePath(pathname, href) ? 'page' : undefined}
      className={className}
    >
      {children}
    </Link>
  );
}
