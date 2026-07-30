import type { CSSProperties, ReactNode } from 'react';
import { ScrollReveal, MotionProvider, Stagger, StaggerItem } from './motion-client';

export { MotionProvider, Stagger, StaggerItem };

type Direction = 'up' | 'down' | 'left' | 'right';

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
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: 'div' | 'span' | 'p' | 'header' | 'section' | 'ul' | 'ol' | 'li';
  direction?: Direction;
  distance?: number;
  delay?: number;
  duration?: number;
  rotate?: number;
  spring?: boolean;
  load?: boolean;
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
    const Tag = as;
    return (
      <Tag className={`${className ?? ''} reveal-load${spring ? ' reveal-load-spring' : ''}`.trim()} style={cssStyle}>
        {children}
      </Tag>
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
