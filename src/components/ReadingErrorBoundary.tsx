'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ContentNotice } from './ContentNotice';

/**
 * Shared body for the reading routes' `error.tsx` boundaries: the backstop for
 * anything the page throws that `Mdx` didn't already catch (a missing file, a
 * broken plugin, a data read that failed). Offers a retry and a way back.
 */
export function ReadingErrorBoundary({
  error,
  reset,
  backHref,
  backLabel,
}: {
  error: Error & { digest?: string };
  reset: () => void;
  backHref: string;
  backLabel: string;
}) {
  useEffect(() => {
    console.error('[reading] page failed to render', error);
  }, [error]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <ContentNotice
        tone="error"
        title="This page didn’t load"
        action={
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-accent-fg transition-colors hover:bg-accent-hover"
            >
              Try again
            </button>
            <Link
              href={backHref}
              className="inline-flex items-center rounded-full border border-border px-5 py-2.5 text-sm font-bold text-muted transition-colors hover:border-accent hover:text-fg"
            >
              {backLabel}
            </Link>
          </div>
        }
      >
        Something went wrong while rendering this text. Retrying usually fixes it; if not, the rest
        of the dojo is still open.
        {error.digest && <span className="mt-2 block text-xs text-subtle">Ref: {error.digest}</span>}
      </ContentNotice>
    </div>
  );
}
