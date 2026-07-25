'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { nav, site } from '@/lib/site';
import { DiscordIcon, GitHubIcon } from './icons';

/** Elements outside the menu that are hidden from AT and pointer while it is open. */
const BACKGROUND_SELECTOR = '#main, footer, [data-dusk-glow]';

/** Focusable descendants of the open panel, in DOM order. */
function focusableWithin(root: HTMLElement): HTMLElement[] {
  return Array.from(
    root.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
  ).filter((el) => el.offsetParent !== null || el === document.activeElement);
}

/**
 * Compact nav for small screens: a hamburger toggle that drops a full-width
 * panel of the site links below the header. The inline desktop nav is hidden
 * at this breakpoint, so the two never fight for the same row.
 *
 * The panel behaves as a modal dialog: Escape closes it, Tab is trapped inside
 * it, focus moves to the panel on open and back to the toggle on close, and
 * the rest of the page is made inert while it is open.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  /** Set while closing so focus only returns to the trigger on a real close. */
  const wasOpen = useRef(false);

  const close = useCallback(() => setOpen(false), []);

  // Escape to close, and Tab cycles within the panel while it is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        close();
        return;
      }
      if (e.key !== 'Tab') return;
      const panel = panelRef.current;
      if (!panel) return;
      const items = focusableWithin(panel);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || !panel.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close]);

  // Take the rest of the page out of the a11y tree and lock body scroll.
  useEffect(() => {
    if (!open) return;
    const background = Array.from(document.querySelectorAll<HTMLElement>(BACKGROUND_SELECTOR));
    for (const el of background) {
      el.setAttribute('inert', '');
      el.setAttribute('aria-hidden', 'true');
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      for (const el of background) {
        el.removeAttribute('inert');
        el.removeAttribute('aria-hidden');
      }
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  // Move focus into the panel on open, and back to the toggle on close.
  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      const panel = panelRef.current;
      if (!panel) return;
      (focusableWithin(panel)[0] ?? panel).focus();
      return;
    }
    if (wasOpen.current) {
      wasOpen.current = false;
      triggerRef.current?.focus();
    }
  }, [open]);

  return (
    <div className="sm:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls={open ? panelId : undefined}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center rounded-full p-2 text-muted transition-colors hover:bg-surface-2 hover:text-fg"
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-6 w-6">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-6 w-6">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        )}
      </button>

      {open && (
        <>
          {/* Click-off surface; the panel itself carries the dialog semantics. */}
          <div
            className="fixed inset-x-0 bottom-0 top-20 bg-scrim"
            aria-hidden="true"
            onClick={close}
          />
          <div
            ref={panelRef}
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            tabIndex={-1}
            className="absolute inset-x-0 top-full border-b border-border bg-bg shadow-xl"
          >
            <nav aria-label="Mobile" className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className="rounded-lg px-3 py-2.5 text-base font-bold text-muted transition-colors hover:bg-surface-2 hover:text-fg"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={site.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-base font-bold text-muted transition-colors hover:bg-surface-2 hover:text-fg"
              >
                <GitHubIcon className="h-5 w-5" />
                GitHub
              </a>
              <a
                href={site.discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-fg px-5 py-3 text-base font-bold text-bg"
              >
                <DiscordIcon className="h-4 w-4" />
                Join the Discord
              </a>
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
