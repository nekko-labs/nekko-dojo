import type { Metadata } from 'next';
import {
  getAllProjects,
  networking,
  jobBoards,
  juniorCompanies,
} from '@/data/communities';
import { CommunityDirectory } from '@/components/CommunityDirectory';
import { LinkTile } from '@/components/LinkTile';
import { DiscordCTA } from '@/components/DiscordCTA';
import { Reveal, Stagger, StaggerItem } from '@/components/motion';
import { withReadmeDescriptions } from '@/lib/github-readme';
import { getHelpfulTools, vaizerSkillsUrl } from '@/lib/vaizer-skills';

export const metadata: Metadata = {
  title: 'Community',
  description:
    'You don’t train alone. Get unstuck fast, ship on real open-source teams, grab the tools that pull their weight in the job hunt, then mentor the next person; plus job boards and companies hiring junior engineers in Japan.',
  alternates: { canonical: '/community' },
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
    body: 'Kotrain, Misskey and more — real open-source projects where you gain genuine team experience.',
  },
  {
    emoji: '🎯',
    title: 'Interview practice, incoming',
    body: 'We’re building a dedicated interview-practice tool for the dojo. Discord members hear about it (and try it) first.',
  },
  {
    emoji: '🔁',
    title: 'Then give it back',
    body: 'Hired members stick around to mentor, review, and answer — that’s what makes it a dojo.',
    accent: true,
  },
];

export default async function CommunityPage() {
  const [projects, tools] = await Promise.all([
    withReadmeDescriptions(getAllProjects()),
    getHelpfulTools(),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      <Reveal as="header" load className="max-w-2xl">
        <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
          You don&apos;t train alone. 🤝
        </h1>
        <p className="mt-4 text-base font-medium leading-relaxed text-muted sm:text-lg">
          Struggling solo is the #1 way people quit. In the dojo you get unstuck
          in minutes, ship on real open-source teams, and — once you&apos;re
          further along — help the next person through the door. Everything below
          is especially useful for engineers building a career in Japan.
        </p>
      </Reveal>

      {/* How the community carries you */}
      <Stagger as="ul" load delay={0.15} className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
        {benefits.map((benefit) => (
          <StaggerItem
            as="li"
            key={benefit.title}
            className="flex items-start gap-4 border-t border-border pt-5"
          >
            <span className="text-xl" aria-hidden>
              {benefit.emoji}
            </span>
            <div>
              <p className={`text-base font-black ${benefit.accent ? 'text-accent' : ''}`}>
                {benefit.title}
              </p>
              <p className="mt-1 text-sm font-medium leading-relaxed text-muted">{benefit.body}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      {/* 1-3. The filterable directory: projects, networking, job resources */}
      <CommunityDirectory
        projects={projects}
        networking={networking}
        jobBoards={jobBoards}
        juniorCompanies={juniorCompanies}
      />

      {/* 4. Helpful tools: fed live by Vaizer's skills catalog */}
      <section id="tools" className="mt-14 scroll-mt-20">
        <Reveal>
          <h2 className="text-2xl font-black tracking-tight">Helpful tools</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            Agent skills that pull their weight in the job hunt and daily dev
            work, pulled live from{' '}
            <a
              href={vaizerSkillsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-accent hover:underline"
            >
              Vaizer
            </a>
            , our skills hub. Open one to see exactly how it runs before you
            install it. Entries marked Curated are great third-party skills,
            credited to their authors; the rest are built by Nekko Labs.
          </p>
        </Reveal>
        <Stagger className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <StaggerItem key={tool.slug} className="h-full">
              <LinkTile
                href={tool.url}
                name={tool.name}
                description={tool.description}
                badge={
                  tool.tier === 'nekko-official'
                    ? tool.tierLabel
                    : `${tool.tierLabel} · by ${tool.author}`
                }
                section="tools"
                kind="skill"
              />
            </StaggerItem>
          ))}
        </Stagger>
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
