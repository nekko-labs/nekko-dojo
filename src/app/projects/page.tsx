import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllProjects } from '@/data/communities';
import { Directory, type DirectorySection } from '@/components/Directory';
import { DiscordCTA } from '@/components/DiscordCTA';
import { Reveal } from '@/components/motion';
import { withReadmeDescriptions } from '@/lib/github-readme';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Real open-source projects where you can work on a team, ship code that ships, and build the one thing almost no other junior applicant has: proof you can contribute alongside other engineers.',
  alternates: { canonical: '/projects' },
};

export default async function ProjectsPage() {
  const projects = await withReadmeDescriptions(getAllProjects());

  const sections: DirectorySection[] = [
    {
      id: 'projects',
      kind: 'projects',
      analytics: 'projects',
      title: 'Projects to contribute to',
      blurb:
        'Each of these welcomes newcomers and labels issues you can actually start on. Pick one, read its contributing guide, and take a good first issue.',
      items: projects,
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      <Reveal as="header" load className="max-w-2xl">
        <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
          Train on a real team. 🚢
        </h1>
        <p className="mt-4 text-base font-medium leading-relaxed text-muted sm:text-lg">
          Solo projects teach you to write code. These teach you the job: reading a
          codebase you didn&apos;t write, surviving code review, shipping to people who
          notice when it breaks. Once a pull request of yours is merged, you have
          something almost no other junior applicant does.
        </p>
        <p className="mt-4 text-sm text-muted">
          New to this?{' '}
          <Link
            href="/guide/get-involved-in-the-community"
            className="font-bold text-accent hover:underline"
          >
            Chapter 6 of the guide
          </Link>{' '}
          walks through making your first contribution, step by step.
        </p>
      </Reveal>

      <Directory
        sections={sections}
        noun="projects"
        emptyHint="No projects in that region yet. Clear the filter, or tell us in the Discord which one we should add."
      />

      <p className="mt-10 text-sm text-muted">
        Know a welcoming project we should add? Tell us in the Discord.
      </p>

      <div className="mt-8">
        <DiscordCTA />
      </div>
    </div>
  );
}
