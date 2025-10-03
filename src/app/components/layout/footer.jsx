'use client';
import site from '@/app/config/site';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  const links = site?.author?.links || {};

  return (
    <footer
      style={{
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: '2rem 0',
        marginTop: '4rem',
        background: 'rgba(255,255,255,0.02)',
      }}
    >
      <div
        className="container-base"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          textAlign: 'center',
        }}
      >
        {/* Texto © */}
        <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.7 }}>
          © {year} <strong>{site?.name || 'Islam El Mrabet'}</strong>. Todos los derechos reservados.
        </p>

        {/* Links sociales */}
        <nav
          aria-label="Enlaces sociales"
          style={{
            display: 'flex',
            gap: '1.25rem',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {links.github && (
            <a
              href={links.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="footer-link"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                textDecoration: 'none',
                color: 'inherit',
                opacity: 0.8,
                transition: 'opacity 0.2s ease, transform 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.8')}
            >
              <Github size={18} /> <span>GitHub</span>
            </a>
          )}

          {links.linkedin && (
            <a
              href={links.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="footer-link"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                textDecoration: 'none',
                color: 'inherit',
                opacity: 0.8,
                transition: 'opacity 0.2s ease, transform 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.8')}
            >
              <Linkedin size={18} /> <span>LinkedIn</span>
            </a>
          )}

          {links.email && (
            <a
              href={links.email}
              aria-label="Email"
              className="footer-link"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                textDecoration: 'none',
                color: 'inherit',
                opacity: 0.8,
                transition: 'opacity 0.2s ease, transform 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.8')}
            >
              <Mail size={18} /> <span>Email</span>
            </a>
          )}
        </nav>
      </div>
    </footer>
  );
}
