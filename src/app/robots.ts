import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

/**
 * robots.txt — everyone is welcome, including AI crawlers and answer engines.
 * The dojo's whole point is being found by career-changers, wherever they ask.
 */

// Search, social unfurl, and AI/answer-engine crawlers we explicitly welcome.
// A blanket `*` allow already covers them; naming them is a clear signal for
// the crawlers (notably the AI ones) that check for their own token first.
const NAMED_CRAWLERS = [
  // Search
  'Googlebot',
  'Bingbot',
  'DuckDuckBot',
  // Social unfurls
  'Twitterbot',
  'facebookexternalhit',
  // AI crawlers and answer engines
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot',
  'Applebot-Extended',
  'cohere-ai',
  'Meta-ExternalAgent',
  'Bytespider',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      ...NAMED_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/' })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
