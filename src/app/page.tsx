import Link from "next/link";
import Image from "next/image";
import { getAllArticles, getAllGuideChapters } from "@/lib/content";
import { ArticleCard } from "@/components/ArticleCard";
import { DiscordIcon } from "@/components/icons";
import { TrainTogether } from "@/components/TrainTogether";
import { site } from "@/lib/site";

/** "Where are you now?" — the dojo meets you at any stage. Each stage carries a
 *  photo of the sensei-in-training, so the cat grows up alongside you. */
const stages = [
  {
    belt: { src: "/belts/belt-white.png", name: "white belt" },
    title: "I've never coded",
    body: "Find out if you even like it — one free evening, zero commitment.",
    cta: "Try code tonight",
    href: "/guide",
    photo: {
      src: "/mascot/nekko-kamae.png",
      alt: "Orange tabby in a ready kendo stance holding a shinai",
    },
  },
  {
    belt: { src: "/belts/belt-green.png", name: "green belt" },
    title: "I'm learning",
    body: "Trade tutorials for building — real projects, a portfolio, a real team.",
    cta: "Start building",
    href: "/guide",
    photo: {
      src: "/mascot/nekko-men.png",
      alt: "Orange tabby in kendo bogu mid overhead strike",
    },
  },
  {
    belt: { src: "/belts/belt-brown.png", name: "brown belt" },
    title: "I'm job hunting",
    body: "Post-bootcamp to signed offer: interviews, résumé, strategy, practice.",
    cta: "Prep the interviews",
    href: "/guide",
    photo: {
      src: "/mascot/nekko-walk.png",
      alt: "Orange tabby walking in, shinai resting on its shoulder",
    },
  },
  {
    belt: { src: "/belts/belt-black.png", name: "black belt" },
    title: "I'm already an engineer",
    body: "Sharpen your craft in the AI era, mentor someone a step behind you.",
    cta: "Keep training",
    href: "/articles",
    accent: true,
    photo: {
      src: "/mascot/nekko-sensei.png",
      alt: "Orange tabby kendo sensei dual-wielding two shinai",
    },
  },
];

export default function HomePage() {
  const latestArticles = getAllArticles().slice(0, 3);
  const chapterCount = getAllGuideChapters().length;

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      {/* Hero */}
      <section className="grid items-center gap-12 pb-14 pt-24 sm:pb-20 sm:pt-32 lg:min-h-[72vh] lg:grid-cols-[1fr_1.12fr] lg:gap-10">
        {/* Copy — left of the sensei on desktop, centered on mobile */}
        <div className="text-center lg:text-left">
          <h1 className="max-w-2xl text-4xl font-black leading-[1.12] tracking-tight sm:text-5xl">
            Start from anywhere.
            <br />
            Never stop <span className="text-accent">growing.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg font-medium leading-relaxed text-muted lg:mx-0">
            Learn to code, land your first engineering job, and keep leveling
            up. Join our community where you don&apos;t have to do it alone.
          </p>
        </div>

        {/* The sensei — dual-wielding mascot, to the right of the title */}
        <div className="flex justify-end">
          <Image
            src="/mascot/nekko-sensei.png"
            alt="Nekko, the orange tabby kendo sensei, dual-wielding two shinai"
            width={1984}
            height={1200}
            priority
            className="h-auto w-full max-w-lg drop-shadow-2xl lg:max-w-none"
          />
        </div>
      </section>

      {/* Where are you now? — a flowing path, the sensei switching sides at
          each stage, threaded together by a dotted spine */}
      <section className="mt-40 sm:mt-56">
        <h2 className="text-center text-3xl font-black">Where are you now?</h2>
        <p className="mx-auto mt-3 max-w-lg text-center text-base font-medium leading-relaxed text-muted">
          The dojo meets you wherever you are — there&apos;s a mat for every
          stage.
        </p>

        <div className="relative mx-auto mt-16 max-w-4xl">
          {/* the dotted path, weaving down the page. Its swing points land at
              each belt's row (right, left, right, left) so a belt sits on the
              line out toward its cat. non-scaling-stroke keeps the dots round. */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block"
            aria-hidden
          >
            <path
              d="M 68 12.5 C 68 25 32 25 32 37.5 C 32 50 68 50 68 62.5 C 68 75 32 75 32 87.5"
              fill="none"
              stroke="rgba(244,241,234,0.3)"
              strokeWidth="2"
              strokeDasharray="2 9"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <div className="flex flex-col gap-16 sm:block">
            {stages.map((stage, i) => {
              // even rows swing right, odd rows swing left — matching the path
              const flip = i % 2 === 1;
              return (
                <div
                  key={stage.title}
                  className={
                    "relative flex flex-col items-center gap-4 sm:h-[300px] sm:flex-row sm:gap-0 " +
                    (flip ? "sm:justify-start" : "sm:justify-end")
                  }
                >
                  {/* the rank belt, sitting on the dotted line at its swing point */}
                  <span
                    className={
                      "z-10 flex flex-col items-center sm:absolute sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 " +
                      (flip ? "sm:left-[32%]" : "sm:left-[68%]")
                    }
                    aria-hidden
                  >
                    <Image
                      src={stage.belt.src}
                      alt=""
                      width={200}
                      height={170}
                      className="w-20 drop-shadow-lg"
                    />
                    <span className="mt-1 text-[11px] font-bold uppercase tracking-wide text-muted">
                      {stage.belt.name}
                    </span>
                  </span>

                  {/* copy — to the inner side of the belt, toward the centre */}
                  <div
                    className={
                      "text-center sm:absolute sm:top-1/2 sm:max-w-[38%] sm:-translate-y-1/2 " +
                      (flip
                        ? "sm:left-[38%] sm:text-left"
                        : "sm:right-[38%] sm:text-right")
                    }
                  >
                    <h3
                      className="text-xl font-black leading-snug"
                      style={
                        stage.accent ? { color: "var(--accent)" } : undefined
                      }
                    >
                      {stage.title}
                    </h3>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-muted">
                      {stage.body}
                    </p>
                    <Link
                      href={stage.href}
                      className="mt-3 inline-block text-sm font-bold text-accent hover:underline"
                    >
                      {stage.cta} →
                    </Link>
                  </div>

                  {/* the sensei-in-training — same side as the belt swing, just
                      beyond it so the line reaches the cat */}
                  <div className="w-full sm:w-auto">
                    <Image
                      src={stage.photo.src}
                      alt={stage.photo.alt}
                      width={480}
                      height={360}
                      sizes="(min-width: 640px) 14rem, 60vw"
                      className="mx-auto h-auto w-full max-w-[13rem] drop-shadow-xl sm:max-h-[270px] sm:w-auto"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* You don't train alone — interactive, auto-rotating, parallax hero */}
      <TrainTogether />

      {/* Training never stops — latest articles, in full detail */}
      {latestArticles.length > 0 && (
        <section className="mt-32 sm:mt-40">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-black">Fresh from the dojo 📖</h2>
              <p className="mt-2 max-w-xl text-base font-medium leading-relaxed text-muted">
                Field notes on engineering, AI, and building a career in Japan,
                written by people doing the work.
              </p>
            </div>
            <Link
              href="/articles"
              className="shrink-0 text-sm font-bold text-accent hover:underline"
            >
              All articles →
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {latestArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* Closing CTA */}
      <section className="mt-36 pb-28 text-center sm:mt-44">
        <Image
          src="/dojo.png"
          alt=""
          width={1100}
          height={683}
          className="mx-auto h-auto w-full max-w-[16rem] drop-shadow-2xl"
        />
        <h2 className="mx-auto mt-6 max-w-2xl text-4xl font-black leading-tight">
          Wherever you are on the path, the dojo door is open.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-base font-medium leading-relaxed text-muted">
          Total beginners, job hunters, and working engineers — same mat, same
          community.
          {chapterCount > 0 ? ` ${chapterCount} chapters and counting.` : ""}
        </p>
        <a
          href={site.discordUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-fg px-8 py-3.5 text-base font-bold text-bg transition-transform hover:-translate-y-0.5"
        >
          <DiscordIcon className="h-5 w-5" />
          Join the Discord
        </a>
      </section>
    </div>
  );
}
