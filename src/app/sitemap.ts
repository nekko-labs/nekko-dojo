import type { MetadataRoute } from 'next';
import { getAllArticles, getAllGuideChapters } from '@/lib/content';
import { courses } from '@/data/courses';
import { site } from '@/lib/site';

/**
 * sitemap.xml — built from the content layer, so new articles, guide chapters,
 * and courses appear without anyone remembering to edit a list.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${site.url}${path}`;

  const staticPages: MetadataRoute.Sitemap = [
    { url: url('/'), changeFrequency: 'weekly', priority: 1 },
    { url: url('/articles'), changeFrequency: 'weekly', priority: 0.9 },
    { url: url('/courses'), changeFrequency: 'weekly', priority: 0.9 },
    { url: url('/guide'), changeFrequency: 'weekly', priority: 0.9 },
    { url: url('/community'), changeFrequency: 'monthly', priority: 0.7 },
  ];

  const articles: MetadataRoute.Sitemap = getAllArticles().map((article) => ({
    url: url(`/articles/${article.slug}`),
    lastModified: article.date || undefined,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const chapters: MetadataRoute.Sitemap = getAllGuideChapters().map((chapter) => ({
    url: url(`/guide/${chapter.slug}`),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const coursePages: MetadataRoute.Sitemap = courses
    .filter((course) => course.href.startsWith('/courses/'))
    .map((course) => ({
      url: url(course.href),
      changeFrequency: 'monthly',
      priority: 0.8,
    }));

  return [...staticPages, ...coursePages, ...articles, ...chapters];
}
