/**
 * Client-side motion primitives for scroll-triggered reveals and staggered
 * lists. The `load` path lives in motion.tsx as server-rendered markup with
 * CSS keyframes, so above-the-fold content paints without waiting for this
 * module to download or hydrate.
 */
'use client';

import type { CSSProperties, ReactNode } from 'react';
import { MotionConfig, motion, useReducedMotion, type Transition, type Variants } from 'motion/react';

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
/** Trigger slightly before elements are fully visible; animate once only. */
export const VIEWPORT = { once: true, margin: '-80px' as const };
/** A soft, non-cartoonish settle for images and other focal elements. */
export const SOFT_SPRING = { type: 'spring', stiffness: 80, damping: 13, mass: 0.9 } as const;

export type Direction = 'up' | 'down' | 'left' | 'right';
const TAGS = {
  div: motion.div,
  span: motion.span,
  p: motion.p,
  header: motion.header,
  section: motion.section,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
} as const;
export type Tag = keyof typeof TAGS;

function offsetFor(direction: Direction, distance: number): { x?: number; y?: number } {
  switch (direction) {
    case 'up':
      return { y: distance };
    case 'down':
      return { y: -distance };
    case 'left':
      return { x: -distance };
    case 'right':
      return { x: distance };
  }
}

export function MotionProvider({ children }: { children: ReactNode }) {
  // Keep scroll reveals consistent with the user's reduced-motion preference;
  // load reveals apply the same policy in their server-rendered CSS.
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

export function ScrollReveal({
  children,
  className,
  style,
  as = 'div',
  direction = 'up',
  distance = 20,
  delay = 0,
  duration = 0.65,
  rotate = 0,
  spring = false,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: Tag;
  direction?: Direction;
  /** Travel distance in px; keep small (16-24). */
  distance?: number;
  /** Delay in seconds before the reveal begins. */
  delay?: number;
  /** Duration in seconds for the standard eased reveal. */
  duration?: number;
  /** Initial rotation in degrees, settling to 0 (use tiny values). */
  rotate?: number;
  /** Use a soft spring settle for images and other quiet focal elements. */
  spring?: boolean;
}) {
  const reduced = useReducedMotion();
  const Component = TAGS[as] as typeof motion.div;
  const hidden = reduced
    ? { opacity: 0 }
    : { opacity: 0, ...offsetFor(direction, distance), ...(rotate ? { rotate } : {}) };
  const visible = { opacity: 1, x: 0, y: 0, rotate: 0 };
  const movement: Transition = spring && !reduced ? { ...SOFT_SPRING, delay } : { duration, ease: EASE, delay };
  const transition: Transition = {
    ...movement,
    opacity: { duration: spring ? 0.5 : duration, ease: EASE, delay },
  };

  return (
    <Component
      className={className}
      style={style}
      initial={hidden}
      transition={transition}
      whileInView={visible}
      viewport={VIEWPORT}
    >
      {children}
    </Component>
  );
}

export function Stagger({
  children,
  className,
  as = 'div',
  delay = 0,
  gap = 0.08,
  load = false,
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
  /** Seconds to wait before the first child enters. */
  delay?: number;
  /** Seconds between each child's entrance. */
  gap?: number;
  /** Animate the stagger on mount instead of when scrolled into view. */
  load?: boolean;
}) {
  const Component = TAGS[as] as typeof motion.div;
  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: gap, delayChildren: delay } },
  };

  return (
    <Component
      className={className}
      variants={container}
      initial="hidden"
      {...(load ? { animate: 'visible' } : { whileInView: 'visible', viewport: VIEWPORT })}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({
  children,
  className,
  as = 'div',
  instant = false,
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
  /** Render immediately without an entrance animation. */
  instant?: boolean;
}) {
  const reduced = useReducedMotion();
  const Component = TAGS[as] as typeof motion.div;
  const item: Variants = {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };

  return (
    <Component className={className} variants={item} {...(instant ? { initial: false } : {})}>
      {children}
    </Component>
  );
}
