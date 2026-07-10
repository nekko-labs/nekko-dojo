'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * The footer's signature: a bold full-width ink line that, in the middle, rises
 * into the outline of a giant torii gate. The line runs in from both edges and
 * turns straight up into the pillars — there is no line segment beneath the gate,
 * so the line *becomes* the gate. The pillars poke up through the top lintel.
 * Everything draws itself in when the footer scrolls into view (skipped for
 * reduced-motion).
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
      {/* the gate itself — pillars rise straight up out of the line and poke
          through the lintel; there is deliberately no beam under the pillars */}
      <svg
        className="torii"
        viewBox="0 0 120 190"
        fill="none"
        stroke="currentColor"
        strokeWidth={7}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* hashira — the two pillars, rising from the baseline, leaning slightly in */}
        <path className="t t4" pathLength={1} d="M0 188 L6 20" />
        <path className="t t5" pathLength={1} d="M120 188 L114 20" />
        {/* kasagi — top lintel, upswept ends, overhanging the pillars */}
        <path className="t t1" pathLength={1} d="M-20 30 L-4 44 Q60 22 124 44 L140 30" />
        {/* nuki — tie beam */}
        <path className="t t2" pathLength={1} d="M-2 94 L122 94" />
        {/* gakuzuka — centre strut */}
        <path className="t t3" pathLength={1} d="M60 94 L60 36" />
      </svg>
      {/* right run of the ink line */}
      <span className="torii-line torii-line-r" />
    </div>
  );
}
