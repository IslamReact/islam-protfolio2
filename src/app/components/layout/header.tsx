'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { nav as NAV } from '@/app/config/nav';

export default function Header() {
  const pathname = usePathname();

  // === Estado UI
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // === Tema: 'light' | 'dark' | 'system'
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const prefersDark = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }, []);

  function applyTheme(next: 'light' | 'dark' | 'system') {
    const root = document.documentElement;
    if (next === 'system') {
      root.removeAttribute('data-theme');
      root.classList.toggle('dark', prefersDark);
    } else {
      root.setAttribute('data-theme', next);
      root.classList.toggle('dark', next === 'dark');
    }
  }

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const initial =
      saved === 'light' || saved === 'dark' || saved === 'system'
        ? (saved as 'light' | 'dark' | 'system')
        : 'system';
    setTheme(initial);
    requestAnimationFrame(() => applyTheme(initial));

    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      if ((saved ?? 'system') === 'system') applyTheme('system');
    };
    mql.addEventListener?.('change', onChange);
    return () => mql.removeEventListener?.('change', onChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toggleTheme(e?: React.MouseEvent<HTMLButtonElement>) {
    const next = e?.altKey ? 'system' : theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
    applyTheme(next);
  }

  // Cerrar menú en cambios de ruta o en escritorio
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Sticky bg al hacer scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Bloquear scroll de la página cuando el panel móvil está abierto
  useEffect(() => {
    document.body.classList.toggle('no-scroll', open);
    return () => document.body.classList.remove('no-scroll');
  }, [open]);

  const nav = NAV;
  const isActive = (href: string) => (href.includes('#') ? false : pathname === href);

  const headerStyle: React.CSSProperties = {
    position: 'sticky',
    top: 0,
    zIndex: 40,
    // el color final lo fuerza el CSS cuando [data-open="true"]
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    background: scrolled ? 'rgba(var(--bg), 0.78)' : 'rgba(var(--bg), 0.62)',
    borderBottom: scrolled
      ? '1px solid rgba(var(--text), var(--border-alpha))'
      : '1px solid rgba(var(--text), 0.10)',
    transition: 'background 180ms ease, border-color 180ms ease',
  };

  return (
    <header role="banner" style={headerStyle} data-open={open}>
      <div
        className="container-base"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          height: 64,
          gap: 12,
        }}
      >
        {/* Logo */}
        <div style={{ justifySelf: 'start' }}>
          <Link href="/" aria-label="Inicio" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 700 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span
                aria-hidden
                style={{
                  width: 12, height: 12, borderRadius: 3,
                  background: 'linear-gradient(135deg, rgb(var(--grad-1)), rgb(var(--grad-2)))',
                  boxShadow: '0 0 12px rgba(168,130,255,0.45)',
                }}
              />
              Islam <span className="grad-main">El Mrabet</span>
            </span>
          </Link>
        </div>

        {/* Nav desktop */}
        <nav
          aria-label="Navegación principal"
          className="only-desktop"
          style={{ justifySelf: 'center', alignItems: 'center', gap: 25, display: 'flex' }}
        >
          {nav.map((i) => {
            const active = isActive(i.href);
            const common: React.CSSProperties = {
              textDecoration: 'none',
              color: active ? 'rgba(var(--text), 1)' : 'rgba(var(--text), 0.86)',
              fontSize: 15,
              letterSpacing: 0.2,
              position: 'relative',
            };
            return i.href.includes('#') ? (
              <a key={i.href} href={i.href} title={i.label} className="nav-link" style={common}>
                {i.label}
              </a>
            ) : (
              <Link
                key={i.href}
                href={i.href}
                title={i.label}
                className="nav-link"
                aria-current={active ? 'page' : undefined}
                style={common}
              >
                {i.label}
                {active && (
                  <span
                    aria-hidden
                    style={{
                      position: 'absolute', left: 0, right: 0, bottom: -6,
                      height: 2, borderRadius: 2,
                      background: 'linear-gradient(90deg, rgb(var(--grad-1)), rgb(var(--grad-2)))',
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Acciones */}
        <div style={{ justifySelf: 'end', display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={toggleTheme}
            aria-label="Cambiar tema (Alt = sistema)"
            title={theme === 'system' ? 'Tema: Sistema (Alt+click para mantenerlo)' : `Tema: ${theme} (Alt+click para Sistema)`}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 36, height: 36, borderRadius: 8,
              border: '1px solid rgba(var(--text), 0.2)',
              background: 'transparent', color: 'inherit', fontSize: 18,
            }}
          >
            {theme === 'dark' ? '☀️' : theme === 'light' ? '🌙' : prefersDark ? '☀️' : '🌙'}
          </button>

          <button
            onClick={() => setOpen(!open)}
            aria-label="Abrir menú"
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="only-mobile"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 36, height: 36, borderRadius: 8,
              border: '1px solid rgba(var(--text), 0.2)',
              background: 'transparent', color: 'inherit', fontSize: 18,
            }}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Backdrop */}
      <div
        className="mobile-backdrop only-mobile"
        data-open={open}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

      {/* Panel */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        className="mobile-panel only-mobile"
        data-open={open}
      >
        <nav className="container-base" aria-label="Menú móvil" style={{ display: 'flex', flexDirection: 'column', padding: '10px 0', gap: 6 }}>
          {NAV.map((i) =>
            i.href.includes('#') ? (
              <a key={i.href} href={i.href} title={i.label} onClick={() => setOpen(false)} className="mobile-link">
                {i.label}
              </a>
            ) : (
              <Link key={i.href} href={i.href} title={i.label} onClick={() => setOpen(false)} className="mobile-link">
                {i.label}
              </Link>
            )
          )}
        </nav>
      </div>
    </header>
  );
}