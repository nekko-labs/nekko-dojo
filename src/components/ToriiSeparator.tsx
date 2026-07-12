'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * The footer's signature: a bold full-width ink line that, in the middle, meets
 * the feet of a torii gate. The gate is drawn in the flat two-tone icon style —
 * a dark charcoal upswept roof (kasagi) sitting on vermilion beams, pillars and
 * base feet. The ink line runs in from both edges and stops at the gate's feet;
 * there is no line beneath the gate, so the line *carries* it. Each piece of the
 * gate rises into place, bottom-up, when the footer scrolls into view (skipped
 * for reduced-motion).
 */
export function ToriiSeparator() {
  const ref = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDrawn(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="torii-sep" data-drawn={drawn ? 'true' : 'false'} aria-hidden>
      {/* left run of the ink line, growing outward from the gate */}
      <span className="torii-line torii-line-l" />
      {/* the gate itself — a flat two-tone torii icon. Charcoal upswept roof,
          vermilion beams / pillars / feet. Pieces rise in bottom-up. */}
      <svg className="torii" viewBox="-6 4 132 108" fill="none">
        {/* base feet (kutsuishi) — the pillars stand on these; they sit on the line */}
        <rect className="t t-foot t-foot-l" x="18" y="103" width="24" height="9" rx="2.5" />
        <rect className="t t-foot t-foot-r" x="78" y="103" width="24" height="9" rx="2.5" />
        {/* hashira — the two pillars, splaying out slightly toward the feet */}
        <path className="t t-pillar t-pillar-l" d="M26 41 H37 L36 104 H23 Z" />
        <path className="t t-pillar t-pillar-r" d="M83 41 H94 L97 104 H84 Z" />
        {/* nuki — tie beam crossing the pillars, overhanging slightly */}
        <rect className="t t-beam t-nuki" x="10" y="70" width="100" height="10" rx="3" />
        {/* shimaki — straight beam sitting just under the roof */}
        <rect className="t t-beam t-shimaki" x="6" y="30" width="108" height="10" rx="3" />
        {/* kasagi — top lintel: a charcoal upswept curved plank overhanging the gate */}
        <path className="t t-roof" d="M-2 12 Q60 30 122 12 L122 21 Q60 37 -2 21 Z" />
      </svg>
      {/* right run of the ink line */}
      <span className="torii-line torii-line-r" />
    </div>
  );
}
