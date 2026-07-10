'use client';

import { useEffect, useRef, useState } from 'react';
import { site } from '@/lib/site';
import { DiscordIcon } from './icons';

/** How the community carries you — the "you don't train alone" band. */
const benefits = [
  {
    emoji: '🆘',
    title: 'Get unstuck, fast',
    body: 'Ask anything — someone a few steps ahead has hit your exact wall, and answers come in minutes, not days.',
  },
  {
    emoji: '🚢',
    title: 'Ship with real teams',
    body: 'Open Paw, Misskey and more — real open-source projects where you gain genuine team experience, not just solo side projects.',
  },
  {
    emoji: '🎓',
    title: 'Practice with the sensei',
    body: 'Mock interviews, whiteboarding sessions, and résumé reviews — free, in the community, with people who have done the hiring.',
  },
  {
    emoji: '🔁',
    title: 'Then give it back',
    body: 'Hired members stick around to mentor, review, and answer — that is what turns a group chat into a dojo.',
    accent: true,
  },
];

const ROTATE_MS = 4600;

export function TrainTogether() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const prefersReduced = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Auto-rotate through the panels; pause on hover/focus/manual pick.
  useEffect(() => {
    if (paused || prefersReduced()) return;
    const id = window.setInterval(
      () => setActive((a) => (a + 1) % benefits.length),
      ROTATE_MS,
    );
    return () => window.clearInterval(id);
  }, [paused, active]);

  // Parallax: expose a normalised scroll progress as --p on the section.
  useEffect(() => {
    if (prefersReduced()) return;
    const el = sectionRef.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const center = rect.top + rect.height / 2;
      const p = (vh / 2 - center) / (vh / 2 + rect.height / 2);
      el.style.setProperty('--p', String(Math.max(-1, Math.min(1, p))));
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const pick = (i: number) => {
    setActive(i);
    setPaused(true);
  };

  const current = benefits[active];

  return (
    <section
      ref={sectionRef}
      className="train-hero mt-32 sm:mt-40"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        className="relative overflow-hidden rounded-[2rem] border border-border"
        style={{ background: 'linear-gradient(135deg, var(--dusk-2), var(--dusk-3))' }}
      >
        <div className="train-glow train-glow-a" aria-hidden />
        <div className="train-glow train-glow-b" aria-hidden />

        <div className="relative grid gap-10 p-7 sm:p-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* Left: heading, tappable list, CTA */}
          <div>
            <h2 className="text-4xl font-black leading-[1.05] sm:text-5xl">
              You don&apos;t train alone. 🤝
            </h2>
            <p className="mt-4 max-w-md text-base font-medium leading-relaxed text-muted">
              Struggling solo is the #1 way people quit. In the dojo you get unstuck
              in minutes, ship on real teams, and help the next person through the door.
            </p>

            <ul className="mt-8 flex flex-col gap-1">
              {benefits.map((b, i) => {
                const on = i === active;
                return (
                  <li key={b.title}>
                    <button
                      type="button"
                      onClick={() => pick(i)}
                      aria-pressed={on}
                      className="group relative flex w-full items-center gap-3 overflow-hidden rounded-2xl px-4 py-3 text-left transition-colors"
                      style={{ background: on ? 'color-mix(in srgb, var(--fg) 9%, transparent)' : 'transparent' }}
                    >
                      <span className="text-xl" aria-hidden>
                        {b.emoji}
                      </span>
                      <span
                        className="text-sm font-black transition-colors"
                        style={on && b.accent ? { color: 'var(--accent)' } : { color: on ? 'var(--fg)' : 'var(--muted)' }}
                      >
                        {b.title}
                      </span>
                      {on && (
                        <span
                          key={`${active}-${paused}`}
                          className="train-underline"
                          data-paused={paused ? 'true' : 'false'}
                          style={{ animationDuration: `${ROTATE_MS}ms` }}
                          aria-hidden
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            <a
              href={site.discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-accent-fg transition-transform hover:-translate-y-0.5"
            >
              <DiscordIcon className="h-4 w-4" />
              Join the Discord
            </a>
          </div>

          {/* Right: the rotating showcase */}
          <div className="relative flex min-h-[260px] flex-col justify-center">
            <div className="train-emoji" aria-hidden>
              {current.emoji}
            </div>
            <div key={active} className="train-fade relative">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-subtle">
                {String(active + 1).padStart(2, '0')} / {String(benefits.length).padStart(2, '0')}
              </p>
              <h3
                className="mt-3 text-3xl font-black leading-tight sm:text-[2.1rem]"
                style={current.accent ? { color: 'var(--accent)' } : undefined}
              >
                {current.title}
              </h3>
              <p className="mt-3 max-w-sm text-base font-medium leading-relaxed text-muted">
                {current.body}
              </p>
            </div>
            <div className="relative mt-8 flex gap-2">
              {benefits.map((b, i) => (
                <button
                  key={b.title}
                  type="button"
                  onClick={() => pick(i)}
                  aria-label={`Show: ${b.title}`}
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: i === active ? '30px' : '8px',
                    background: i === active ? 'var(--accent)' : 'color-mix(in srgb, var(--fg) 22%, transparent)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
