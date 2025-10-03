import './globals.css';
import { Inter } from 'next/font/google';
import site from '@/app/config/site';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
