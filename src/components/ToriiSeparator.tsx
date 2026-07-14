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
      <svg className="torii" viewBox="0 0 120 128" fill="none">
        {/* hashira — the two long pillars, splaying out slightly toward the feet.
            Both crossbeams sit high, so most of the pillar is open leg below. */}
        <path className="t t-pillar t-pillar-l" d="M15 30 H28 L25 116 H9 Z" />
        <path className="t t-pillar t-pillar-r" d="M92 30 H105 L111 116 H95 Z" />
        {/* kutsuishi — small charcoal base feet; outer edges meet the ink line */}
        <rect className="t t-foot t-foot-l" x="0" y="116" width="30" height="11" rx="2.5" />
        <rect className="t t-foot t-foot-r" x="90" y="116" width="30" height="11" rx="2.5" />
        {/* nuki — tie beam crossing the pillars high up, overhanging them slightly */}
        <rect className="t t-beam t-nuki" x="4" y="50" width="112" height="8" rx="3" />
        {/* gakuzuka — short central strut linking the tie beam up to the roof beam */}
        <rect className="t t-strut" x="56" y="37" width="8" height="13" rx="1.5" />
        {/* shimaki — straight beam sitting just under the roof */}
        <rect className="t t-beam t-shimaki" x="12" y="30" width="96" height="7" rx="3.5" />
        {/* kasagi — top lintel: a slim charcoal upswept plank, ends sweeping up
            and overhanging the gate on both sides */}
        <path
          className="t t-roof"
          d="M-12 6 Q22 16 60 20 Q98 16 132 6 L132 15 Q98 26 60 30 Q22 26 -12 15 Z"
        />
      </svg>
      {/* right run of the ink line */}
      <span className="torii-line torii-line-r" />
    </div>
  );
}
