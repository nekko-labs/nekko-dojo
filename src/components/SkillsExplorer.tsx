'use client';

import { useMemo, useState } from 'react';
import {
  categoryLabels,
  sourceBadges,
  sourceLabels,
  type Skill,
  type SkillCategory,
  type SkillSource,
} from '@/data/skills';
import { SkillCard } from './SkillCard';

export type SkillWithVotes = { skill: Skill; voteCount: number };

/**
 * Client-side catalog browser: free-text search plus category and tier
 * filters over the (small, in-memory) skills list. Data is passed in from the
 * server page so vote counts are server-rendered.
 */
export function SkillsExplorer({
  items,
  categories,
}: {
  items: SkillWithVotes[];
  categories: SkillCategory[];
}) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<SkillCategory | 'all'>('all');
  const [source, setSource] = useState<SkillSource | 'all'>('all');

  const sources: SkillSource[] = useMemo(() => {
    const present = new Set(items.map((i) => i.skill.source));
    return (['nekko-official', 'community', 'curated'] as SkillSource[]).filter((s) =>
      present.has(s),
    );
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter(({ skill }) => {
      if (category !== 'all' && skill.category !== category) return false;
      if (source !== 'all' && skill.source !== source) return false;
      if (!q) return true;
      const haystack = [skill.name, skill.description, skill.author, ...skill.tags]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [items, query, category, source]);

  const chip = (active: boolean) =>
    `rounded-full border px-3 py-1 text-sm transition-colors ${
      active
        ? 'border-accent bg-accent/12 text-accent'
        : 'border-border text-muted hover:border-accent hover:text-accent'
    }`;

  return (
    <div>
      <div className="flex flex-col gap-4">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search skills…"
          aria-label="Search skills"
          className="w-full rounded-full border border-border bg-surface px-4 py-2 text-sm outline-none focus:border-accent"
        />

        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by tier">
          <button type="button" onClick={() => setSource('all')} className={chip(source === 'all')}>
            All tiers
          </button>
          {sources.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSource(s)}
              className={chip(source === s)}
            >
              {sourceBadges[s]} {sourceLabels[s]}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          <button
            type="button"
            onClick={() => setCategory('all')}
            className={chip(category === 'all')}
          >
            All categories
          </button>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={chip(category === c)}
            >
              {categoryLabels[c]}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-muted" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? 'skill' : 'skills'}
      </p>

      {filtered.length === 0 ? (
        <p className="mt-8 text-muted">No skills match your filters yet.</p>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(({ skill, voteCount }) => (
            <SkillCard key={skill.id} skill={skill} voteCount={voteCount} />
          ))}
        </div>
      )}
    </div>
  );
}
