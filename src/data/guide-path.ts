/**
 * Per-section flavor for the Guide path: the marker emoji, the "new moves"
 * each section unlocks (the concrete abilities you walk away with), and the
 * rank belt earned at the big milestones. Keyed by the `section` frontmatter
 * value of the guide chapters; a section without an entry still renders, just
 * without a moves callout. Update this when chapters move between sections.
 */

export type GuideRank = {
  /** Belt image under /public/belts. */
  src: string;
  name: string;
};

export type GuideSectionMeta = {
  emoji: string;
  /** Abilities unlocked by finishing the section, shown as "New moves". */
  moves: string[];
  /** Awarded at milestone sections only, like a real dojo. */
  belt?: GuideRank;
};

export const guideSectionMeta: Record<string, GuideSectionMeta> = {
  'Getting Started': {
    emoji: '🌱',
    moves: [
      'Explain why engineering is a real path for you',
      'Run your first lines of code',
      'Decide if this career fits before betting on it',
    ],
    belt: { src: '/belts/belt-white.png', name: 'white belt' },
  },
  Foundations: {
    emoji: '📚',
    moves: [
      'Pick your training route: bootcamp or self-taught',
      'Study to a plan instead of tutorial-hopping',
    ],
  },
  'Building Real Things': {
    emoji: '🔨',
    moves: [
      'Build and deploy a real app end to end',
      'Show a portfolio that is not tutorials',
      'Ship code with a real team',
    ],
    belt: { src: '/belts/belt-green.png', name: 'green belt' },
  },
  'Interview Prep': {
    emoji: '⚔️',
    moves: [
      'Solve DS&A problems out loud',
      'Whiteboard a system design',
      'Walk a full interview loop without surprises',
    ],
    belt: { src: '/belts/belt-brown.png', name: 'brown belt' },
  },
  'Landing the Job': {
    emoji: '🎯',
    moves: [
      'Target companies with a tiered strategy',
      'Send applications that survive the screen',
    ],
  },
  Practice: {
    emoji: '🥋',
    moves: ['Prove it: solve real interview questions end to end'],
    belt: { src: '/belts/belt-black.png', name: 'black belt' },
  },
};
