/**
 * The dojo's courses. The Guide is the flagship (its chapters live in
 * `content/guide` and render at `/guide`); Applied AI Engineer is the second
 * course, still being written, and renders a teaser at
 * `/courses/applied-ai-engineer`.
 *
 * A course marked `coming-soon` has no chapters yet: its page sells the
 * curriculum and points at the Discord so people hear when it opens.
 */

export type CourseStatus = 'live' | 'coming-soon';

export type Course = {
  /** Stable id, also the analytics label. */
  id: string;
  /** Where the course overview lives. */
  href: string;
  name: string;
  /**
   * The answer to "What do you want to learn?" on the `/courses` chooser. This
   * is the headline a visitor actually picks between, so it names the outcome
   * rather than the product.
   */
  answer: string;
  /** Which of the two ways this is, shown as the chooser eyebrow. */
  track: string;
  /** One or two lines on the chooser, shorter than `description`. */
  pitch: string;
  /** One line under the title on the course page. */
  tagline: string;
  /** Two or three sentences: what it is and what it gets you. */
  description: string;
  /** Who should walk this one. */
  audience: string;
  status: CourseStatus;
  /**
   * Which diffuse glow token tints this course's chooser panel: `--glow-amber`
   * or `--glow-violet`. A soft background glow is the one place violet is
   * allowed (STYLESEED 1.4), and it is what tells the two paths apart now that
   * the panels have no borders.
   */
  glow: 'amber' | 'violet';
  /* No `emoji` here on purpose: a course card is a link, and STYLESEED 4.1
     bans emoji as icons inside interactive controls. The mascot and rank
     belt carry the illustration instead. */
  belt: { src: string; name: string };
  /**
   * The mascot's real intrinsic size, so the reserved box matches the art and
   * nothing shifts when it loads. The cats are not all the same shape: kamae is
   * portrait, sensei is landscape, which is why the chooser gives them a fixed
   * slot to stand in rather than a shared width.
   */
  mascot: { src: string; alt: string; width: number; height: number };
};

export const courses: readonly Course[] = [
  {
    id: 'the-guide',
    href: '/guide',
    name: 'The Guide',
    answer: 'Become an expert in coding',
    track: 'The classic way',
    pitch:
      'Start from zero, learn the craft properly, and walk out with a real engineering job.',
    tagline: 'From never having coded to your first engineering job.',
    description:
      'The flagship path, expanded from the workflow Philip has used to help people in Japan switch careers into engineering. Walk it stop by stop: learn to code, build real things, survive the interview loop, and sign the offer.',
    audience: 'Career-changers, beginners, and job hunters',
    status: 'live',
    glow: 'amber',
    belt: { src: '/belts/belt-white.png', name: 'white belt' },
    mascot: {
      src: '/mascot/nekko-kamae.png',
      alt: 'Orange tabby in a ready kendo stance holding a shinai',
      width: 767,
      height: 1000,
    },
  },
  {
    id: 'applied-ai-engineer',
    href: '/courses/applied-ai-engineer',
    name: 'Applied AI Engineer',
    answer: 'Learn the new Agentic Coding way',
    track: 'The agentic way',
    pitch:
      'Already build software? Learn to direct agents instead of out-typing them, and stay the person who decides.',
    tagline: 'Engineering when the code writes itself.',
    description:
      'The second course, for people who can already build software and can feel the job changing under them. Learn to direct agents instead of out-typing them: specs machines can execute, harnesses that make autonomy safe, and verification sharp enough to trust the output.',
    audience: 'Working engineers, and anyone who finished The Guide',
    status: 'coming-soon',
    glow: 'violet',
    belt: { src: '/belts/belt-black.png', name: 'black belt' },
    mascot: {
      src: '/mascot/nekko-sensei.png',
      alt: 'Orange tabby kendo sensei dual-wielding two shinai',
      width: 1463,
      height: 1200,
    },
  },
];

export function getCourse(id: string): Course | undefined {
  return courses.find((course) => course.id === id);
}

/* -------------------------------------------------------------------------
 * Applied AI Engineer: the syllabus shown on its teaser page.
 * ---------------------------------------------------------------------- */

/** The role shift the course exists to answer, as a before/after read. */
export const roleShift: ReadonlyArray<{ before: string; after: string }> = [
  {
    before: 'You were hired to write the code.',
    after:
      'You are hired to decide what should exist and to prove the result is correct.',
  },
  {
    before: 'Your title named a layer: frontend, backend, mobile, platform.',
    after:
      'Your title names a loop. The layer is whatever this week’s problem needs.',
  },
  {
    before: 'You reviewed a teammate’s pull request once a day.',
    after:
      'You review machine output at volume, and design the checks that catch what you will never read.',
  },
  {
    before: 'You owned a service.',
    after:
      'You own a harness: the context, tools, tests and guardrails that service gets built and maintained by.',
  },
  {
    before: 'Seniority meant years of pattern recall.',
    after:
      'Seniority means judgment, verification and taste, and juniors are now expected to have them on day one.',
  },
  {
    before: 'You estimated in weeks of typing.',
    after:
      'You estimate in iterations of a loop, and your job is to make each iteration cheaper.',
  },
];

/**
 * What the course teaches, in order. These are the stages of the same walked
 * path The Guide uses (see `guideSectionMeta`), so the two courses render
 * through one component: an emoji gate, a body, the moves the stage unlocks,
 * and a rank at the milestones.
 *
 * Ranks are dan grades rather than coloured belts on purpose. This course
 * starts where The Guide ends, at black belt, so there is no colour left to
 * award: you grade up inside the black belt instead.
 */
export const modules: ReadonlyArray<{
  emoji: string;
  title: string;
  body: string;
  outcomes: string[];
  belt?: { src: string; name: string };
}> = [
  {
    emoji: '🧠',
    title: 'How agents actually work',
    body: 'Under the marketing, an agent is a loop: context in, tool calls out, repeat until done. Learn the moving parts so the failures stop being mysterious.',
    outcomes: [
      'Reason about context, tools and the agent loop',
      'Predict where an agent will go wrong before it does',
      'Pick the right model and effort for the job',
    ],
  },
  {
    emoji: '📐',
    title: 'Spec-driven development',
    body: 'The bottleneck moved from typing to intent. A vague ask produces confident, wrong software very quickly. Writing a spec a machine can execute is the new core skill.',
    outcomes: [
      'Turn a fuzzy request into an executable spec',
      'Slice work into reviewable, independently testable units',
      'Keep the spec as the source of truth as the code drifts',
    ],
    belt: { src: '/belts/belt-black.png', name: 'shodan, 1st dan' },
  },
  {
    emoji: '🔧',
    title: 'Building the harness',
    body: 'This is the fast-growing role. Somebody has to build the thing the agents run inside: the tools they can call, the context they get, the permissions they do not, and the feedback that tells them they failed.',
    outcomes: [
      'Design tools, skills and MCP servers agents can use well',
      'Engineer context: what to load, what to leave out',
      'Set permission boundaries and blast-radius limits',
      'Close the loop with tests, linters and CI the agent can read',
    ],
  },
  {
    emoji: '🔍',
    title: 'Verification at volume',
    body: 'AI produces plausible code. Deciding whether plausible code is correct, safe and maintainable is no longer a senior nicety; it is the job. And you cannot read all of it, so you have to design what catches the rest.',
    outcomes: [
      'Read code faster and more ruthlessly than you write it',
      'Build evals and test strategy for non-deterministic output',
      'Review a large diff without pretending you read every line',
      'Spot the subtle bug, the security hole, the design that will not scale',
    ],
    belt: { src: '/belts/belt-black.png', name: 'nidan, 2nd dan' },
  },
  {
    emoji: '🎼',
    title: 'Orchestration: running a fleet',
    body: 'One agent is a tool. Five agents in parallel is an engineering problem: isolation, merge conflicts, cost, and knowing when to stop the line.',
    outcomes: [
      'Run parallel work safely with worktrees and isolation',
      'Decompose a task into work that fans out cleanly',
      'Measure cost and quality per iteration, and cut what is not paying',
    ],
  },
  {
    emoji: '🏛️',
    title: 'Architecture and taste in the loop',
    body: 'Agents write inside your architecture. They will not fix it, and they will happily scale a bad boundary to fifty files. System design got more leveraged, not less.',
    outcomes: [
      'Design boundaries that survive code you did not type',
      'Keep a codebase legible to humans and machines at once',
      'Decide what not to build, and defend it',
    ],
    belt: { src: '/belts/belt-black.png', name: 'sandan, 3rd dan' },
  },
];

/** The reassuring half of the pitch: the fundamentals that did not move. */
export const stillMatters: ReadonlyArray<{ title: string; body: string }> = [
  {
    title: 'Reading code',
    body: 'Promoted from warm-up exercise to the main event. Everything downstream of an agent is a review, and you cannot review what you cannot read.',
  },
  {
    title: 'System design',
    body: 'Boundaries, data models, failure modes. The generated code lives inside decisions only you are making.',
  },
  {
    title: 'Debugging',
    body: 'Something will break at 2am, and the thing that wrote it will not be the thing that explains it. Tracing a fault to its cause is still a human skill.',
  },
  {
    title: 'The fundamentals under the syntax',
    body: 'How the network, the database, the browser and memory actually behave. AI fills in syntax; it cannot fill in your mental model, and without one you cannot tell good output from confident nonsense.',
  },
  {
    title: 'Product judgment',
    body: 'Deciding what is worth building, what "good enough" means here, and what to cut. AI will build the wrong thing beautifully.',
  },
  {
    title: 'Working with people',
    body: 'Specs, reviews, disagreement, persuasion. The team is still where software actually ships.',
  },
];

/** And the honest half: what stopped being a moat. */
export const stoppedMattering: readonly string[] = [
  'Hand-writing boilerplate, glue and the tenth component that looks like the last nine',
  'Syntax recall for a library you touch twice a year',
  'Being the fastest first-draft author on the team',
  'Guarding knowledge that is now one good prompt away',
];
