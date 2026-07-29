import Image from 'next/image';
import { useId } from 'react';
import type { ArticleMeta } from '@/lib/content';

/**
 * Cover art for an article card. Articles with a hero photo get the photo;
 * the rest get a deterministic "dusk cover": a glow wash, a seigaiha wave
 * pattern, and a large type monogram, all derived from the slug so a given
 * article always wears the same cover. Purely decorative — the card's title
 * link carries the meaning, so everything here is hidden from readers.
 */

/** Tiny stable hash so a slug always maps to the same cover variant. */
function hashSlug(slug: string): number {
  let hash = 0;
  for (const char of slug) hash = (hash * 31 + char.charCodeAt(0)) | 0;
  return Math.abs(hash);
}

/** The three dusk glow tokens, reused from the site-wide background layer. */
const GLOWS = ['var(--glow-violet)', 'var(--glow-amber)', 'var(--glow-teal)'] as const;

function DuskCover({ slug, title }: { slug: string; title: string }) {
  const patternId = useId();
  const hash = hashSlug(slug);
  const glow = GLOWS[hash % GLOWS.length];
  // Vary where the light falls so neighbouring covers don't look stamped.
  const glowX = [18, 50, 82][Math.floor(hash / 7) % 3];
  const monogram = [...title][0]?.toUpperCase() ?? 'N';

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden bg-surface-2">
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(130% 130% at ${glowX}% -10%, ${glow}, transparent 62%)` }}
      />
      <svg className="absolute inset-0 h-full w-full text-fg/[0.07]">
        <defs>
          <pattern id={patternId} width="56" height="28" patternUnits="userSpaceOnUse">
            <g fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="28" cy="28" r="26" />
              <circle cx="28" cy="28" r="18" />
              <circle cx="28" cy="28" r="10" />
              <circle cx="0" cy="42" r="26" />
              <circle cx="0" cy="42" r="18" />
              <circle cx="56" cy="42" r="26" />
              <circle cx="56" cy="42" r="18" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
      <span className="absolute -bottom-8 -right-1 select-none font-bold leading-none text-fg/[0.08] text-[8.5rem] motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:-translate-y-2">
        {monogram}
      </span>
    </div>
  );
}

export function ArticleCover({
  article,
  sizes,
  priority = false,
}: {
  article: ArticleMeta;
  /** `sizes` for the underlying next/image when a hero photo exists. */
  sizes: string;
  priority?: boolean;
}) {
  if (!article.hero) return <DuskCover slug={article.slug} title={article.title} />;
  return (
    <Image
      src={article.hero.src}
      // Decorative in card context: the adjacent title link names the article.
      alt=""
      fill
      sizes={sizes}
      priority={priority}
      className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-[1.04]"
    />
  );
}
