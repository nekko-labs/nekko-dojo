'use client';

import { useEffect, useState } from 'react';

/**
 * A hairline progress bar pinned under the site header showing how far through
 * the article body the reader is. Purely decorative feedback — the same
 * information is available from the scrollbar — so it is hidden from AT.
 */
export function ReadingProgress({ targetId }: { targetId: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const { top, height } = target.getBoundingClientRect();
      // How much of the body has scrolled past the bottom of the header.
      const readable = Math.max(1, height - window.innerHeight * 0.4);
      const scrolled = Math.min(Math.max(-top, 0), readable);
      setProgress(scrolled / readable);
    };
    const schedule = () => {
      if (frame === 0) frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [targetId]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-20 z-20 h-0.5" aria-hidden="true">
      <div
        className="h-full origin-left bg-accent transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
