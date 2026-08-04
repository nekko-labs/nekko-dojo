import type { Metadata } from 'next';
import { Zen_Maru_Gothic } from 'next/font/google';
import './globals.css';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { PostHogProvider } from '@/components/PostHogProvider';
import { MotionProvider } from '@/components/motion';
import { site } from '@/lib/site';
import { Analytics } from '@vercel/analytics/next';

// Rounded, friendly type — the dojo's voice. Latin subset only (content is
// English); Japanese glyphs still resolve via the system fallback stack.
// Zen Maru Gothic ships hundreds of unicode-range slices, so preloading is off:
// the browser fetches only the ranges the page actually renders.
const zenMaru = Zen_Maru_Gothic({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-zen-maru',
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  // Inherited by every route. Individual pages set their own canonical, since a
  // site-wide one here would canonicalize every route to the home page.
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    title: site.name,
    description: site.description,
    siteName: site.name,
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/dojo.png', width: 1100, height: 683, alt: `${site.name}: ${site.tagline}` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.name,
    description: site.description,
    images: ['/dojo.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={zenMaru.variable}>
      <body className="min-h-screen bg-bg text-fg antialiased">
        {/* Points LLM-facing crawlers at the plain-text site summary. Rendered
            here rather than via metadata.alternates.types, which Next does not
            currently emit; React hoists this into <head>. */}
        <link
          rel="alternate"
          type="text/plain"
          href="/llms.txt"
          title={`${site.name} for LLMs`}
        />
        {/* Decorative dusk glow behind everything */}
        <div data-dusk-glow aria-hidden="true">
          <span className="glow-1" />
          <span className="glow-2" />
          <span className="glow-3" />
        </div>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg"
        >
          Skip to content
        </a>
        <PostHogProvider>
          <SiteHeader />
          <main id="main">
            <MotionProvider>{children}</MotionProvider>
          </main>
          <SiteFooter />
        </PostHogProvider>
        <Analytics />
      </body>
    </html>
  );
}
