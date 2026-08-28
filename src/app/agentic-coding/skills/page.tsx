import type { Metadata } from 'next';
import { LinkTile } from '@/components/LinkTile';
import { DiscordCTA } from '@/components/DiscordCTA';
import { Reveal, Stagger, StaggerItem } from '@/components/motion';
import { getAgentSkills, vaizerSkillsUrl } from '@/lib/vaizer-skills';

export const metadata: Metadata = {
  title: 'Agent Skills',
  description:
    'Agent skills that pull their weight in the job hunt and in daily dev work, pulled live from Vaizer. Open one to see exactly how it runs before you install it.',
  alternates: { canonical: '/agentic-coding/skills' },
};

export default async function AgentSkillsPage() {
  const skills = await getAgentSkills();

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      <Reveal as="header" load className="max-w-2xl">
        <h1 className="text-3xl font-black tracking-tight sm:text-5xl">Agent skills. 🛠️</h1>
        <p className="mt-4 text-base font-medium leading-relaxed text-muted sm:text-lg">
          Skills teach a coding agent to do one job properly, the same way every time.
          These are the ones that earn their keep in the job hunt and in daily dev work,
          pulled live from{' '}
          <a
            href={vaizerSkillsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-accent hover:underline"
          >
            Vaizer
          </a>
          , our skills hub. Open one to see exactly how it runs before you install it.
        </p>
        <p className="mt-4 text-sm text-muted">
          Entries marked Curated are great third-party skills, credited to their authors.
          The rest are built by Nekko Labs.
        </p>
      </Reveal>

      <Stagger className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill) => (
          <StaggerItem key={skill.slug} className="h-full">
            <LinkTile
              href={skill.url}
              name={skill.name}
              description={skill.description}
              badge={
                skill.tier === 'nekko-official'
                  ? skill.tierLabel
                  : `${skill.tierLabel} · by ${skill.author}`
              }
              section="agent-skills"
              kind="skill"
            />
          </StaggerItem>
        ))}
      </Stagger>

      <p className="mt-10 text-sm text-muted">
        Built a skill worth sharing? Add it on{' '}
        <a
          href={vaizerSkillsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-accent hover:underline"
        >
          Vaizer
        </a>{' '}
        and it shows up here.
      </p>

      <div className="mt-8">
        <DiscordCTA />
      </div>
    </div>
  );
}
