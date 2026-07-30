'use client';

/**
 * Thin wrapper over PostHog capture. The SDK is loaded only after the
 * provider's effect runs, and events queue behind that same import promise.
 */

export type AnalyticsEvent =
  | 'skill_viewed'
  | 'skill_install_clicked'
  | 'skill_downloaded'
  | 'skill_upvoted'
  | 'skill_feedback_submitted'
  | 'community_link_clicked';

type PostHog = typeof import('posthog-js').default;
let posthogPromise: Promise<PostHog | null> | null = null;

function optedOut(): boolean {
  if (typeof window === 'undefined' || !process.env.NEXT_PUBLIC_POSTHOG_KEY) return true;
  const dnt =
    navigator.doNotTrack ??
    (window as { doNotTrack?: string }).doNotTrack ??
    (navigator as { msDoNotTrack?: string }).msDoNotTrack;
  return dnt === '1' || dnt === 'yes';
}

function loadPostHog(): Promise<PostHog | null> {
  if (!posthogPromise) {
    posthogPromise = optedOut()
      ? Promise.resolve(null)
      : import('posthog-js').then(({ default: posthog }) => {
          posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
            api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://eu.i.posthog.com',
            autocapture: false,
            capture_pageview: true,
            capture_pageleave: true,
            disable_session_recording: true,
            person_profiles: 'identified_only',
          });
          return posthog;
        });
  }
  return posthogPromise;
}

export function initPostHog() {
  void loadPostHog();
}

export function capture(event: AnalyticsEvent, props?: Record<string, unknown>) {
  void loadPostHog()
    .then((posthog) => posthog?.capture(event, props))
    .catch(() => {
      /* analytics must never break the UI */
    });
}
