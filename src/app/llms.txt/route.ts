import { getAllArticles, getGuideSections } from '@/lib/content';
import { courses } from '@/data/courses';
import { site } from '@/lib/site';

/**
 * /llms.txt — the llmstxt.org convention: a plain-text map of the site for LLMs
 * and answer engines. Generated from the content layer so it never drifts from
 * the articles and guide chapters that actually exist.
 */

export const dynamic = 'force-static';

function line(title: string, path: string, description: string): string {
  const suffix = description ? `: ${description}` : '';
  return `- [${title}](${site.url}${path})${suffix}`;
}

export function GET(): Response {
  const articles = getAllArticles();
  const sections = getGuideSections();

  const body = `# ${site.name}

> ${site.tagline} ${site.description}

Nekko Dojo ("dojo" = training hall) is the learning arm of ${site.parentName}. It exists to get people into software engineering and keep them growing once they are in, with a bias toward career-changers in Japan (often coming from English teaching). Everything is free to read, and the community lives in Discord.

## What is here

- **Courses**: structured paths through the dojo. The Guide is the flagship, taking you from never having coded to your first engineering job. Applied AI Engineer teaches you to direct agents once you can already build.
- **Articles**: director-level perspective on engineering, AI, and how to grow a career while the market shifts.
- **Community**: a curated directory of real open-source projects and communities where you get professional team experience beyond personal projects.

## Pages

${line('Home', '/', 'what the dojo is and where to start')}
${line('Courses', '/courses', 'the two paths through the dojo')}
${line('Articles', '/articles', 'every article, newest first')}
${line('The Guide', '/guide', 'the flagship course, chapter by chapter')}
${line('Community', '/community', 'open-source projects and communities to learn in')}

## Courses

${courses
  .map(
    (course) =>
      `${line(course.name, course.href, course.tagline)} For: ${course.audience}. Status: ${
        course.status === 'live' ? 'available now' : 'in progress, not open yet'
      }.`,
  )
  .join('\n')}

## The Guide, chapter by chapter

${sections
  .map(
    ({ section, chapters }) =>
      `### ${section}\n\n${chapters
        .map((chapter) => line(chapter.title, `/guide/${chapter.slug}`, chapter.description))
        .join('\n')}`,
  )
  .join('\n\n')}

## Articles

${articles
  .map(
    (article) =>
      `${line(article.title, `/articles/${article.slug}`, article.description)} (${article.date}, ${article.readingMinutes} min, by ${article.author})`,
  )
  .join('\n')}

## Elsewhere

- [Discord](${site.discordUrl}): the community, and the place to ask questions.
- [GitHub](${site.githubUrl}): the dojo's source.
- [${site.parentName}](${site.parentUrl}): the consulting firm behind the dojo.
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
