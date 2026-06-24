import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <div className="text-4xl" aria-hidden>
        🐱
      </div>
      <h1 className="mt-4 text-2xl font-bold tracking-tight">This page wandered off</h1>
      <p className="mt-2 text-muted">We couldn&apos;t find what you were looking for.</p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-medium text-accent-fg transition-colors hover:bg-accent-hover"
      >
        Back home
      </Link>
    </div>
  );
}
