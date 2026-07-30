'use client';

/**
 * PostHog product analytics — OPTIONAL and privacy-conscious.
 *
 * Initializes only when NEXT_PUBLIC_POSTHOG_KEY is set, so the site runs fine
 * without analytics. Configured to be light on tracking: no autocapture, no
 * session recording, person profiles only for identified events, and it respects
 * the browser's Do Not Track. We capture a small set of explicit product events
 * (see lib/analytics.ts): skill views, install clicks, upvotes, and feedback.
 */

import { useEffect } from 'react';
import { initPostHog } from '@/lib/analytics';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initPostHog();
  }, []);
  return <>{children}</>;
}
