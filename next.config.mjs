import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const projectRoot = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Nekko Dojo is served under nekkolabs.com/dojo as a separately-deployed app.
  // basePath prefixes all routes and assets; the main site rewrites /dojo/* here.
  basePath: '/dojo',
  reactStrictMode: true,
  // Other lockfiles exist higher up the tree (C:\Users\phili). Pin the tracing
  // root to this project so file tracing for deployment is correct.
  outputFileTracingRoot: projectRoot,
  // MDX is compiled at the component level via next-mdx-remote (see lib/mdx.ts),
  // so no @next/mdx page extension wiring is needed here.
};

export default nextConfig;
