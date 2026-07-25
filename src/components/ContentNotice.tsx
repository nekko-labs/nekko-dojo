import type { ReactNode } from 'react';

/**
 * The designed surface for "there is no content to read here" moments: an
 * unwritten chapter, a body that failed to compile, or a reading route that
 * errored. Deliberately calm and in-voice rather than a raw stack trace.
 */
export function ContentNotice({
  tone = 'info',
  title,
  children,
  action,
}: {
  tone?: 'info' | 'error';
  title: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div
      role={tone === 'error' ? 'alert' : undefined}
      className={`rounded-2xl border bg-surface p-6 sm:p-8 ${
        tone === 'error' ? 'border-danger/50' : 'border-border'
      }`}
    >
      <p className={`text-base font-black ${tone === 'error' ? 'text-danger' : 'text-fg'}`}>
        {title}
      </p>
      <div className="mt-2 text-sm leading-relaxed text-muted">{children}</div>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
