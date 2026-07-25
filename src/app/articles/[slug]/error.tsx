'use client';

import { ReadingErrorBoundary } from '@/components/ReadingErrorBoundary';

export default function ArticleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ReadingErrorBoundary error={error} reset={reset} backHref="/articles" backLabel="All articles" />
  );
}
