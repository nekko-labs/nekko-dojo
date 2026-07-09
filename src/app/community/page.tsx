import type { Metadata } from 'next';
import {
  getAllProjects,
  networking,
  jobBoards,
  juniorCompanies,
} from '@/data/communities';
import { ProjectCard } from '@/components/ProjectCard';
import { LinkTile } from '@/components/LinkTile';
import { DiscordCTA } from '@/components/DiscordCTA';

export const metadata: Metadata = {
  title: 'Community',
  description:
    'You don’t train alone. Get unstuck fast, ship on real open-source teams, practice interviews with the community, then mentor the next person — plus job boards and companies hiring junior engineers in Japan.',
};

/** What the dojo community actually gives you, in order of the journey. */
const benefits = [
  {
    emoji: '🆘',
    title: 'Get unstuck, fast',
    body: 'Ask anything in the Discord — someone a few steps ahead has hit your exact wall.',
  },
  {
    emoji: '🚢',
    title: 'Ship with real teams',
    body: 'Find a Doc Japan, Open Paw and more — open-source projects where 225+ people have gained real team experience.',
  },
  {
    emoji: '🎓',
    title: 'Practice with the sensei',
    body: 'Mock interviews, whiteboarding sessions, and résumé reviews — free, run by the community.',
  },
  {
    emoji: '🔁',
    title: 'Then give it back',
    body: 'Hired members stick around to mentor, review, and answer — that’s what makes it a dojo.',
    accent: true,
  },
];

export default function CommunityPage() {
  const projects = getAllProjects();

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
          You don&apos;t train alone. 🤝
        </h1>
        <p className="mt-4 text-base font-medium leading-relaxed text-muted sm:text-lg">
          Struggling solo is the #1 way people quit. In the dojo you get unstuck
          in minutes, ship on real open-source teams, and — once you&apos;re
          further along — help the next person through the door. Everything below
          is especially useful for engineers building a career in Japan.
        </p>
      </header>

      {/* How the community carries you */}
      <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
        {benefits.map((benefit) => (
          <li key={benefit.title} className="flex items-start gap-4 border-t border-border pt-5">
            <span className="text-xl" aria-hidden>
              {benefit.emoji}
            </span>
            <div>
              <p
                className="text-base font-black"
                style={benefit.accent ? { color: 'var(--accent)' } : undefined}
              >
                {benefit.title}
              </p>
              <p className="mt-1 text-sm font-medium leading-relaxed text-muted">{benefit.body}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* On-page section nav — handy on mobile */}
      <nav className="mt-12 flex flex-wrap gap-2 text-sm font-bold">
        <a
          href="#projects"
          className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-muted transition-colors hover:border-accent hover:text-fg"
        >
          Projects
        </a>
        <a
          href="#networking"
          className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-muted transition-colors hover:border-accent hover:text-fg"
        >
          Networking
        </a>
        <a
          href="#jobs"
          className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-muted transition-colors hover:border-accent hover:text-fg"
        >
          Job boards
        </a>
      </nav>

      {/* 1. Projects */}
      <section id="projects" className="mt-12 scroll-mt-20">
        <h2 className="text-2xl font-black tracking-tight">Projects to contribute to</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Real GitHub / open-source projects where you can work on a team, ship
          code that ships, and build a portfolio that actually counts.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* 2. Networking */}
      <section id="networking" className="mt-14 scroll-mt-20">
        <h2 className="text-2xl font-black tracking-tight">Networking</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Communities where you can ask questions, hear about openings before
          they hit the boards, and meet people already working in tech here.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {networking.map((c) => (
            <LinkTile
              key={c.id}
              href={c.url}
              name={c.name}
              description={c.description}
              badge={c.platform}
              section="networking"
              kind={c.platform.toLowerCase()}
            />
          ))}
        </div>
      </section>

      {/* 3. Jobs */}
      <section id="jobs" className="mt-14 scroll-mt-20">
        <h2 className="text-2xl font-black tracking-tight">
          Where to search for a job
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Foreigner-friendly job boards first, then companies that run
          English-friendly teams and tend to hire junior and early-career
          engineers.
        </p>

        <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-muted">
          Job boards
        </h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {jobBoards.map((b) => (
            <LinkTile
              key={b.id}
              href={b.url}
              name={b.name}
              description={b.description}
              badge={b.region === 'Japan' ? 'Japan' : 'Global'}
              section="job-boards"
              kind="board"
            />
          ))}
        </div>

        <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-muted">
          Companies that hire juniors
        </h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {juniorCompanies.map((c) => (
            <LinkTile
              key={c.id}
              href={c.url}
              name={c.name}
              description={c.description}
              badge="Junior friendly"
              section="companies"
              kind="company"
            />
          ))}
        </div>
      </section>

      <p className="mt-10 text-sm text-muted">
        Know a welcoming project, community, or employer we should add? Tell us
        in the Discord.
      </p>

      <div className="mt-8">
        <DiscordCTA />
      </div>
    </div>
  );
}
