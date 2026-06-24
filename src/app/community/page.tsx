import type { Metadata } from 'next';
import { getAllCommunities } from '@/data/communities';
import { ProjectCard } from '@/components/ProjectCard';
import { DiscordCTA } from '@/components/DiscordCTA';

export const metadata: Metadata = {
  title: 'Community & Projects',
  description:
    'Curated open-source projects and communities — especially in Japan — where you can gain real experience working on a team, not just personal projects.',
};

export default function CommunityPage() {
  const communities = getAllCommunities();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Community &amp; Projects</h1>
        <p className="mt-3 text-lg text-muted">
          The fastest way to grow is to work on a real team. These are open-source projects
          and communities — especially in Japan — where you can contribute alongside other
          engineers and get professional experience beyond personal projects.
        </p>
      </header>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {communities.map((community) => (
          <ProjectCard key={community.id} community={community} />
        ))}
      </div>

      <p className="mt-8 text-sm text-muted">
        Know a welcoming project or community we should add? Tell us in the Discord.
      </p>

      <div className="mt-12">
        <DiscordCTA />
      </div>
    </div>
  );
}
