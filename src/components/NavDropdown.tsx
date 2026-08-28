'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavGroup } from '@/lib/site';
import { NAV_ICONS } from './icons';
import { isActivePath } from './NavLink';

/**
 * The desktop header's menu for a nav group: a trigger pill that opens a small
 * panel of the group's destinations. The group has no page of its own, so the
 * trigger is a button rather than a link, and it wears the current-section
 * belt whenever any child route is active.
 *
 * Behaves as a menu button: Enter/Space/ArrowDown open it, arrows and Home/End
 * move through the items, Escape closes and returns focus to the trigger, and
 * a pointer press anywhere outside closes it. Below `md` this component is not
 * rendered at all: MobileNav lists the same children inline instead.
 */
export function NavDropdown({ group, className }: { group: NavGroup; className?: string }) {
  const [open, setOpen] = useState(false);
  /** Item awaiting focus, applied after the menu has actually rendered. */
  const [pendingFocus, setPendingFocus] = useState<number | null>(null);
  const pathname = usePathname();
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const Icon = NAV_ICONS[group.label];
  const active = group.items.some((item) => isActivePath(pathname, item.href));

  const close = useCallback((returnFocus = false) => {
    setOpen(false);
    // Drop any queued focus so it can't fire into the next open.
    setPendingFocus(null);
    if (returnFocus) triggerRef.current?.focus();
  }, []);

  /**
   * Open (if needed) and queue focus for the item at `index`, wrapping both
   * ways. The focus is queued rather than applied here because on the first
   * open the menu has not rendered yet, so its refs are still empty.
   */
  const focusItem = useCallback(
    (index: number) => {
      const count = group.items.length;
      setOpen(true);
      setPendingFocus(((index % count) + count) % count);
    },
    [group.items.length],
  );

  // Apply a queued focus once the menu is on the page and its refs are filled.
  useEffect(() => {
    if (!open || pendingFocus === null) return;
    itemRefs.current[pendingFocus]?.focus();
    setPendingFocus(null);
  }, [open, pendingFocus]);

  // Close on Escape and on any pointer press outside the trigger or panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      e.stopPropagation();
      close(true);
    };
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [open, close]);

  // A route change means the visitor followed a link; the menu has done its job.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const onTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusItem(0);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      focusItem(group.items.length - 1);
    }
  };

  const onItemKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusItem(index + 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      focusItem(index - 1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      focusItem(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      focusItem(group.items.length - 1);
    } else if (e.key === 'Tab') {
      close();
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={open ? menuId : undefined}
        aria-current={active ? 'page' : undefined}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onTriggerKeyDown}
        className={className}
      >
        {Icon && (
          <span className="nav-ico" aria-hidden="true">
            <Icon className="h-4 w-4" />
          </span>
        )}
        {group.label}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          data-open={open ? 'true' : 'false'}
          className="nav-caret h-3 w-3 opacity-70"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label={group.label}
          className="nav-menu absolute right-0 top-full z-40 mt-2 min-w-56 rounded-2xl border border-border bg-bg p-1.5 shadow-xl"
        >
          {group.items.map((item, index) => {
            const ItemIcon = NAV_ICONS[item.href];
            return (
              <Link
                key={item.href}
                href={item.href}
                role="menuitem"
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                onKeyDown={(e) => onItemKeyDown(e, index)}
                onClick={() => close()}
                aria-current={isActivePath(pathname, item.href) ? 'page' : undefined}
                className="mnav-item flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-bold text-muted transition-colors hover:bg-surface-2 hover:text-fg"
              >
                {ItemIcon && (
                  <span className="nav-ico" aria-hidden="true">
                    <ItemIcon className="h-4 w-4" />
                  </span>
                )}
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
