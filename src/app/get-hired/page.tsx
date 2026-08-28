import type { Metadata } from 'next';
import Link from 'next/link';
import { networking, jobBoards, juniorCompanies } from '@/data/communities';
import { Directory, type DirectorySection } from '@/components/Directory';
import { ContentNotice } from '@/components/ContentNotice';
import { OpenSourceEdge } from '@/components/OpenSourceEdge';
import { DiscordCTA } from '@/components/DiscordCTA';
import { Reveal } from '@/components/motion';

export const metadata: Metadata = {
  title: 'Get Hired',
  description:
    'The workflow for landing an engineering job in Japan, plus the job boards, junior-friendly companies, and communities worth knowing about. We are not a job board and not a dispatch agency: you apply directly.',
  alternates: { canonical: '/get-hired' },
};

export default function GetHiredPage() {
  const sections: DirectorySection[] = [
    {
      id: 'job-boards',
      kind: 'links',
      analytics: 'job-boards',
      title: 'Job boards',
      blurb:
        'Foreigner-friendly boards first. These are public listings we neither own nor profit from; apply through them directly.',
      items: jobBoards.map((board) => ({
        id: board.id,
        url: board.url,
        name: board.name,
        description: board.description,
        badge: board.region === 'Japan' ? 'Japan' : 'Global',
        kind: 'board',
        region: board.region,
      })),
    },
    {
      id: 'companies',
      kind: 'links',
      analytics: 'companies',
      title: 'Companies that hire juniors',
      blurb:
        'Companies that run English-friendly teams and tend to hire junior and early-career engineers. Go straight to their own careers pages.',
      items: juniorCompanies.map((company) => ({
        id: company.id,
        url: company.url,
        name: company.name,
        description: company.description,
        badge: 'Junior friendly',
        kind: 'company',
        region: company.region,
      })),
    },
    {
      id: 'networking',
      kind: 'links',
      analytics: 'networking',
      title: 'Networking',
      blurb:
        'Communities where you can ask questions, hear about openings before they hit the boards, and meet people already working in tech here.',
      items: networking.map((community) => ({
        id: community.id,
        url: community.url,
        name: community.name,
        description: community.description,
        badge: community.platform,
        kind: community.platform.toLowerCase(),
        region: community.region,
      })),
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      <Reveal as="header" load className="max-w-2xl">
        <h1 className="text-3xl font-black tracking-tight sm:text-5xl">Get hired. 🎯</h1>
        <p className="mt-4 text-base font-medium leading-relaxed text-muted sm:text-lg">
          The course covers how to apply: sharpening your résumé, sequencing interviews so
          your dream company isn&apos;t your first, and what the loop actually looks like.
          This page is the map that goes with it: where to look, and who tends to hire
          people early in their career.
        </p>
        <p className="mt-4 text-sm text-muted">
          The workflow itself lives in{' '}
          <Link
            href="/guide/get-ready-to-apply"
            className="font-bold text-accent hover:underline"
          >
            Chapter 10, Get Ready to Apply
          </Link>
          .
        </p>
      </Reveal>

      <div className="mt-10">
        <ContentNotice title="We are not a job board, and we are not a 派遣 agency.">
          <p>
            Nekko Dojo does not place anyone, hold roles of its own, or take a cut. No
            hakken (派遣) dispatch, no paid placement (有料職業紹介). Nothing below is a
            listing we control or profit from.
          </p>
          <p className="mt-3">
            What you get is the workflow from the course, plus a curated set of public job
            boards and companies known to hire early-career engineers, so you know where to
            look. You apply directly, on your own terms.
          </p>
        </ContentNotice>
      </div>

      <OpenSourceEdge />

      <Directory
        sections={sections}
        emptyHint="Nothing matches that filter yet. Clear it, or tell us in the Discord what we should add."
      />

      <p className="mt-10 text-sm text-muted">
        Know a welcoming employer or community we should add? Tell us in the Discord.
      </p>

      <div className="mt-8">
        <DiscordCTA />
      </div>
    </div>
  );
}
