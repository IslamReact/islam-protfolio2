'use client';
import Link from 'next/link';
import useTheme from '@/hooks/useTheme';
import { nav } from '@/app/config/nav';

export default function Header() {
  const { dark, toggle } = useTheme();
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 dark:border-white/10 backdrop-blur bg-white/70 dark:bg-[rgb(10_10_11/_0.7)]">
      <div className="container-base flex items-center justify-between h-16">
        <Link href="/" className="font-semibold" aria-label="Inicio">
          Islam <span className="u2050-gradient-text">El Mrabet</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm" aria-label="Navegación principal" role="navigation">
          {nav.map((i) => (
            <a key={i.href} href={i.href} title={i.label}>{i.label}</a>
          ))}
          <button onClick={toggle} className="kbd" aria-label="Cambiar tema">
            {dark ? 'dark' : 'light'}
          </button>
        </nav>
      </div>
    </header>
  );
}
