'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * The footer's signature: a bold full-width ink line that rises, in the middle,
 * into the outline of a giant torii gate. The line and the gate draw themselves
 * in when the footer scrolls into view (skipped for reduced-motion).
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
      <svg
        className="torii"
        viewBox="0 0 520 232"
        fill="none"
        stroke="currentColor"
        strokeWidth={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* kasagi — top lintel, upswept ends */}
        <path className="t t1" pathLength={1} d="M148 56 L168 70 Q260 44 352 70 L372 56" />
        {/* nuki — tie beam */}
        <path className="t t2" pathLength={1} d="M170 120 L350 120" />
        {/* gakuzuka — centre strut */}
        <path className="t t3" pathLength={1} d="M260 120 L260 64" />
        {/* hashira — the two pillars, leaning slightly in */}
        <path className="t t4" pathLength={1} d="M200 226 L210 60" />
        <path className="t t5" pathLength={1} d="M320 226 L310 60" />
      </svg>
      <div className="torii-line" />
    </div>
  );
}
