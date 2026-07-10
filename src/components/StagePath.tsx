'use client';

import { useId, useRef, type RefObject } from 'react';
import { motion, useReducedMotion, useScroll } from 'motion/react';

/**
 * The dotted spine weaving between the "Where are you now?" stages, drawn in
 * as the user scrolls through the section (scrub-style, tied to scroll
 * progress rather than a timed tween). The visible path keeps its original
 * dotted stroke; a solid path inside an SVG mask does the actual drawing so
 * the dots are revealed instead of being re-dashed. Under reduced motion the
 * path renders fully drawn.
 */

const PATH_D = 'M 68 12.5 C 68 25 32 25 32 37.5 C 32 50 68 50 68 62.5 C 68 75 32 75 32 87.5';

export function StagePath() {
  const ref = useRef<SVGSVGElement>(null);
  const maskId = useId();
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    // SVG elements measure fine for scroll offsets; motion's types only
    // accept HTMLElement refs, hence the cast.
    target: ref as unknown as RefObject<HTMLElement>,
    offset: ['start 0.7', 'end 0.75'],
  });

  return (
    <svg
      ref={ref}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block"
      aria-hidden
    >
      {!reduced && (
        <mask id={maskId} maskUnits="userSpaceOnUse">
          {/* Solid drawing edge; wide enough to cover the dotted stroke. */}
          <motion.path
            d={PATH_D}
            fill="none"
            stroke="#fff"
            strokeWidth="6"
            strokeLinecap="round"
            style={{ pathLength: scrollYProgress }}
          />
        </mask>
      )}
      <path
        d={PATH_D}
        fill="none"
        stroke="rgba(244,241,234,0.3)"
        strokeWidth="2"
        strokeDasharray="2 9"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        mask={reduced ? undefined : `url(#${maskId})`}
      />
    </svg>
  );
}
