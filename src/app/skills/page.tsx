import type { Metadata } from 'next';
import { getAllSkills, getUsedCategories, skillsMarketplace } from '@/data/skills';
import { getVoteCounts } from '@/lib/votes';
import { InstallCommand } from '@/components/InstallCommand';
import { SkillsExplorer, type SkillWithVotes } from '@/components/SkillsExplorer';
import { GitHubIcon } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Skills',
  description:
    'An Agent Skills hub for Claude Code — browse, upvote, download, and install skills built by Nekko Labs and the community.',
};

// Rebuild periodically so newly added skills and vote counts stay fresh.
export const revalidate = 3600;

export default async function SkillsPage() {
  const skills = getAllSkills();
  const counts = await getVoteCounts();
  const items: SkillWithVotes[] = skills.map((skill) => ({
    skill,
    voteCount: counts[skill.id] ?? 0,
  }));

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Skills</h1>
        <p className="mt-3 text-lg text-muted">
          An Agent Skills hub for Claude Code. Browse skills built by Nekko Labs and the
          community, upvote the ones you like, and install them straight into your agent —
          or grab any skill as a <code className="font-mono text-sm">.zip</code> to read and
          run yourself.
        </p>
      </header>

      {/* Add-the-marketplace primer */}
      <div className="mt-8 rounded-2xl border border-border bg-surface p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-semibold tracking-tight">Install from the marketplace</h2>
            <p className="mt-1 text-sm text-muted">
              Add the marketplace once in Claude Code, then install any skill by name.
            </p>
          </div>
          <a
            href={skillsMarketplace.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover"
          >
            <GitHubIcon className="h-4 w-4" /> View the repo
          </a>
        </div>
        <div className="mt-4">
          <InstallCommand command={skillsMarketplace.addCommand} label="Add the marketplace (once)" />
        </div>
      </div>

      {/* Trust tiers */}
      <p className="mt-6 text-sm text-muted">
        <span className="font-medium text-fg">🟣 Nekko official</span> — built &amp; reviewed by
        Nekko Labs.{' '}
        <span className="font-medium text-fg">🟢 Community</span> — submitted via PR; audit before
        you run it.{' '}
        <span className="font-medium text-fg">🔗 Curated</span> — great external skills, linked to
        their source.
      </p>

      <div className="mt-10">
        <SkillsExplorer items={items} categories={getUsedCategories()} />
      </div>
    </div>
  );
}
