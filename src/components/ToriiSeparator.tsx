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
      {/* left run of the ink line, drawing in from the edge toward the foot */}
      <span className="torii-line torii-line-l" />
      {/* the gate — a flat two-tone torii icon. The outer edges of the feet sit
          at the box edges so the ink line flows straight into them; the roof
          overhangs horizontally (overflow visible). */}
      <svg className="torii" viewBox="0 0 120 132" fill="none">
        {/* hashira — the two pillars, splaying out slightly toward the feet */}
        <path className="t t-pillar t-pillar-l" d="M8 48 H26 L28 120 H6 Z" />
        <path className="t t-pillar t-pillar-r" d="M94 48 H112 L114 120 H92 Z" />
        {/* kutsuishi — chunky charcoal base feet; outer edges meet the ink line */}
        <rect className="t t-foot t-foot-l" x="0" y="118" width="34" height="14" rx="3" />
        <rect className="t t-foot t-foot-r" x="86" y="118" width="34" height="14" rx="3" />
        {/* nuki — tie beam crossing the pillars, overhanging them slightly */}
        <rect className="t t-beam t-nuki" x="2" y="90" width="116" height="14" rx="4" />
        {/* gakuzuka — short central strut linking the tie beam up to the roof */}
        <rect className="t t-strut" x="54" y="52" width="12" height="40" rx="2" />
        {/* shimaki — straight beam sitting just under the roof */}
        <rect className="t t-beam t-shimaki" x="8" y="40" width="104" height="13" rx="5" />
        {/* kasagi — top lintel: a thick charcoal upswept plank, ends sweeping up
            and overhanging the gate on both sides */}
        <path
          className="t t-roof"
          d="M-10 16 Q25 25 60 29 Q95 25 130 16 L130 31 Q95 41 60 45 Q25 41 -10 31 Z"
        />
      </svg>
      {/* right run of the ink line */}
      <span className="torii-line torii-line-r" />
    </div>
  );
}
