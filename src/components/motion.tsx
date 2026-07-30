/**
 * Motion primitives for the Dusk Dojo animation language: quiet, once-only
 * reveals and gently staggered grids. Above-the-fold `load` reveals render as
 * plain server HTML plus CSS keyframes, so the page paints without waiting for
 * the motion/react client bundle. Scroll-triggered reveals stay on motion/react
 * and retain their viewport behavior.
 */

import type { CSSProperties, ReactNode } from 'react';
import {
  ScrollReveal,
  MotionProvider,
  Stagger,
  StaggerItem,
  type Direction,
  type Tag,
} from './motion-client';

export { MotionProvider, Stagger, StaggerItem };

export function Reveal({
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
  load = false,
  noFade = false,
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
  /** Animate on mount instead of on scroll into view. */
  load?: boolean;
  /** Keep opacity at 1 and animate only the transform. */
  noFade?: boolean;
}) {
  if (load) {
    const cssStyle = {
      ...style,
      '--reveal-delay': `${delay}s`,
      '--reveal-duration': `${spring ? 0.65 : duration}s`,
      '--reveal-x': direction === 'left' ? `-${distance}px` : direction === 'right' ? `${distance}px` : '0px',
      '--reveal-y': direction === 'up' ? `${distance}px` : direction === 'down' ? `-${distance}px` : '0px',
      '--reveal-rotate': `${rotate}deg`,
    } as CSSProperties;
    const Component = as;
    return (
      <Component
        className={`${className ?? ''} reveal-load${spring ? ' reveal-load-spring' : ''}${noFade ? ' reveal-load-no-fade' : ''}`.trim()}
        style={cssStyle}
      >
        {children}
      </Component>
    );
  }

  return (
    <ScrollReveal
      className={className}
      style={style}
      as={as}
      direction={direction}
      distance={distance}
      delay={delay}
      duration={duration}
      rotate={rotate}
      spring={spring}
    >
      {children}
    </ScrollReveal>
  );
}
