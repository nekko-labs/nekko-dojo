import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const projectRoot = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Nekko Dojo is served at its own subdomain (dojo.nekkolabs.com), so it lives
  // at the domain root — no basePath.
  reactStrictMode: true,
  // Other lockfiles exist higher up the tree (C:\Users\phili). Pin the tracing
  // root to this project so file tracing for deployment is correct.
  outputFileTracingRoot: projectRoot,
  // MDX is compiled at the component level via next-mdx-remote (see lib/mdx.ts),
  // so no @next/mdx page extension wiring is needed here.
  async redirects() {
    return [
      // /community was split into /projects and /get-hired on 2026-08-28. The
      // site is live and the old path is linked from articles and elsewhere, so
      // it lands on its closest successor rather than 404ing.
      { source: '/community', destination: '/projects', permanent: true },
      // Agentic Coding is a nav group, not a page: it has no index of its own.
      { source: '/agentic-coding', destination: '/agentic-coding/skills', permanent: true },
    ];
  },
};

export default nextConfig;
