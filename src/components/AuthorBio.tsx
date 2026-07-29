import { site } from '@/lib/site';

/**
 * Short "written by" card for the foot of an article body.
 *
 * The copy mirrors the founder section on nekkolabs.com so the bio reads as the
 * same person in both places — update them together. Only Philip has a bio so
 * far; a second author means giving this component an `author` prop rather than
 * dropping `<AuthorBio />` into their article as-is.
 *
 * Headings are deliberately plain elements: `.prose h2`/`h3` in globals.css are
 * unlayered, so they would beat any `text-*` size utility used here.
 */
export function AuthorBio() {
  return (
    <section className="rounded-2xl border border-border bg-surface p-6">
      <span className="text-xs font-semibold uppercase tracking-wide text-muted">
        Written by
      </span>
      <div className="mt-2 text-lg font-semibold tracking-tight">Philip Ermish</div>
      <div className="text-sm text-accent">
        Founder &amp; CEO,{' '}
        <a
          href={site.parentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium"
        >
          {site.parentName}
        </a>
      </div>
      <p className="mt-3 text-sm text-muted">
        Originally from the US, now home in Japan for 6+ years, with experience across
        10+ software companies leading product delivery, mentoring leaders, and helping
        people navigate this new AI space.
      </p>
      <p className="mt-4 text-xs text-muted">
        <span className="font-semibold text-fg">Journey:</span> SWE → Tech Lead → CTO
        (startup) → Eng Manager → Eng Director → Co-Founder (NPO) → Founder (Nekko Labs)
      </p>
    </section>
  );
}
