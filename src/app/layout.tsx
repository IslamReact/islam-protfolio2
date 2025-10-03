import './globals.css';
import { Inter, Sora } from 'next/font/google';
import site from '@/app/config/site';
import SeoJsonLd from '@/app/components/seo/SeoJsonLd';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const sora  = Sora({ subsets: ['latin'], variable: '--font-sora' });

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} – ${site.title}`,
    template: `%s · ${site.name}`
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
    images: [{ url: site.image, width: 1200, height: 630, alt: `${site.name} – OG` }]
  },
  twitter: {
    card: 'summary_large_image',
    creator: site.twitter || undefined,
    site: site.twitter || undefined,
    title: `${site.name} – ${site.title}`,
    description: site.description,
    images: [site.image]
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' }
  }
};

import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} ${sora.variable}`}>
        <a href="#main-content" className="skip-link">Saltar al contenido principal</a>

        {children}

        {/* JSON-LD global (Person + WebSite) */}
        <SeoJsonLd />

        {/* Analytics (si activaste Plausible/Umami antes, déjalo aquí) */}
        {process.env.NODE_ENV === 'production' && (
          <>
            {/* Ejemplo Plausible (si quieres): 
            <Script defer data-domain={new URL(site.url).host} src="https://plausible.io/js/script.js" /> */}
          </>
        )}
      </body>
    </html>
  );
}
