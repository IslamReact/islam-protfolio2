import './globals.css';
import { Inter, Sora } from 'next/font/google';
import site from '@/app/config/site';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const sora  = Sora({ subsets: ['latin'], variable: '--font-sora' });

export const metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} – ${site.title}`,
  description: site.description,
  openGraph: { title: `${site.name} – ${site.title}`, description: site.description, url: site.url, siteName: site.name },
  twitter: { card: 'summary_large_image' },
};

import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} ${sora.variable}`}>
        <a href="#main-content" className="skip-link">Saltar al contenido principal</a>
        {children}
      </body>
    </html>
  );
}
