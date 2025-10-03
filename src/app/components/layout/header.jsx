'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useTheme from '@/hooks/useTheme';
import { nav } from '@/app/config/nav';

export default function Header() {
  const { toggle } = useTheme();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <header
      role="banner"
      style={{
        position: 'sticky', top: 0, zIndex: 40,
        backdropFilter: 'blur(8px)',
        background: 'rgba(16,18,22,0.72)',
        borderBottom: '1px solid rgba(255,255,255,0.08)'
      }}
    >
      {/* Barra principal */}
      <div className="container-base"
           style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', height: 64 }}>
        {/* Izquierda: logo */}
        <div style={{ justifySelf: 'start' }}>
          <Link href="/" aria-label="Inicio" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 700 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                width: 12, height: 12, borderRadius: 3,
                background: 'linear-gradient(135deg, rgb(var(--accent-1)), rgb(var(--accent-3)))',
                boxShadow: '0 0 12px rgba(168,130,255,0.45)'
              }}/>
              Islam <span className="grad-main">El Mrabet</span>
            </span>
          </Link>
        </div>

        {/* Centro: navegación (DESKTOP) */}
        <nav aria-label="Navegación principal"
             className="only-desktop"
             style={{ justifySelf: 'center', alignItems: 'center', gap: 40 }}>
          {nav.map((i) => (
            <a key={i.href}
               href={i.href}
               title={i.label}
               style={{
                 textDecoration: 'none',
                 color: 'rgba(232,234,237,0.86)',
                 fontSize: 18,
                 letterSpacing: 0.2,
                 position: 'relative'
               }}
               className="nav-link">
              {i.label}
            </a>
          ))}
        </nav>

        {/* Derecha: luna + hamburger (la luna siempre, hamburger solo móvil) */}
        <div style={{ justifySelf: 'end', display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={toggle} aria-label="Cambiar tema"
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 32, height: 32, borderRadius: 8,
                    border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: 'inherit'
                  }}>
            ☾
          </button>
          <button onClick={() => setOpen(!open)}
                  aria-label="Abrir menú" aria-expanded={open} aria-controls="mobile-menu"
                  className="only-mobile"
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 32, height: 32, borderRadius: 8,
                    border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: 'inherit'
                  }}>
            ☰
          </button>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {open && (
        <div id="mobile-menu" role="dialog" aria-modal="true"
             className="only-mobile"
             style={{ borderTop: '1px solid rgba(255,255,255,0.08)', background: 'rgba(16,18,22,0.96)' }}>
          <nav className="container-base" aria-label="Menú móvil"
               style={{ display: 'flex', flexDirection: 'column', padding: '10px 0' }}>
            {nav.map((i) => (
              <a key={i.href}
                 href={i.href}
                 title={i.label}
                 onClick={() => setOpen(false)}
                 style={{
                   padding: '10px 0',
                   textDecoration: 'none',
                   color: 'rgba(232,234,237,0.92)',
                   fontSize: 16
                 }}>
                {i.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
