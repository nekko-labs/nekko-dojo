'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * The footer's signature: a bold full-width ink line that, in the middle, meets
 * the feet of a torii gate drawn in the flat two-tone icon style — a thick
 * charcoal upswept roof (kasagi) sitting on vermilion beams, pillars and base
 * feet. The ink line runs in from both edges and stops at the gate's feet.
 *
 * When the footer scrolls into view the gate *builds itself*: the ink lines draw
 * in from the edges, the feet settle, the pillars grow up out of them, the two
 * beams span across, and the roof drops on top. Skipped for reduced-motion.
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
      {/* the gate — a flat two-tone torii icon. Feet sit on the ink line at the
          box edges; the roof overhangs horizontally (overflow visible). */}
      <svg className="torii" viewBox="0 6 120 119" fill="none">
        {/* hashira — the two pillars, splaying out slightly toward the feet */}
        <path className="t t-pillar t-pillar-l" d="M6 64 H24 L26 112 H4 Z" />
        <path className="t t-pillar t-pillar-r" d="M96 64 H114 L116 112 H94 Z" />
        {/* kutsuishi — chunky base feet; their outer edges meet the ink line */}
        <rect className="t t-foot t-foot-l" x="0" y="112" width="30" height="13" rx="3" />
        <rect className="t t-foot t-foot-r" x="90" y="112" width="30" height="13" rx="3" />
        {/* nuki — tie beam crossing the pillars, overhanging them slightly */}
        <rect className="t t-beam t-nuki" x="0" y="90" width="120" height="13" rx="4" />
        {/* shimaki — straight beam sitting just under the roof */}
        <rect className="t t-beam t-shimaki" x="14" y="52" width="92" height="12" rx="5" />
        {/* kasagi — top lintel: a thick charcoal upswept plank, ends flaring up
            and overhanging the gate on both sides */}
        <path
          className="t t-roof"
          d="M-8 14 Q26 30 60 36 Q94 30 128 14 Q96 42 60 50 Q24 42 -8 14 Z"
        />
      </svg>
      {/* right run of the ink line */}
      <span className="torii-line torii-line-r" />
    </div>
  );
}
