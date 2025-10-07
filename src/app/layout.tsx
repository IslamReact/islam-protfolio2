// app/layout.tsx
import './globals.css';
import { Inter, Sora } from 'next/font/google';
import site from '@/app/config/site';
import SeoJsonLd from '@/app/components/seo/SeoJsonLd';
import ThemeProvider from '@/app/components/theme/ThemeProvider';
import { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const sora = Sora({ subsets: ['latin'], variable: '--font-sora' });

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} – ${site.title}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: site.keywords,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} – ${site.title}`,
    description: site.description,
    images: [
      {
        url: site.image,
        width: 1200,
        height: 630,
        alt: `${site.name} – OG`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: site.twitter || undefined,
    site: site.twitter || undefined,
    title: `${site.name} – ${site.title}`,
    description: site.description,
    images: [site.image],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${sora.variable} min-h-dvh bg-neutral-950 text-neutral-100 antialiased selection:bg-cyan-500/30`}
      >
        <ThemeProvider>
          {/* Glow 2050 Neon (no captura eventos) */}
          <div className="pointer-events-none fixed inset-0 -z-10 opacity-30 [background:radial-gradient(1200px_600px_at_10%_-20%,#7c3aed33,transparent),radial-gradient(1000px_500px_at_90%_-10%,#06b6d433,transparent)]" />

          {/* Accesibilidad: saltar al contenido */}
          <a href="#main-content" className="skip-link">
            Saltar al contenido principal
          </a>

          {/* Contenido */}
          <main id="main-content">{children}</main>

          {/* JSON-LD global */}
          <SeoJsonLd />

          {/* Analytics opcional */}
          {process.env.NODE_ENV === 'production' && (
            <>
              {/*
              <Script
                defer
                data-domain={new URL(site.url).host}
                src="https://plausible.io/js/script.js"
              />
              */}
            </>
          )}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
