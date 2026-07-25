'use client';

import { ReadingErrorBoundary } from '@/components/ReadingErrorBoundary';

export default function GuideChapterError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ReadingErrorBoundary error={error} reset={reset} backHref="/guide" backLabel="The Guide" />
  );
}
