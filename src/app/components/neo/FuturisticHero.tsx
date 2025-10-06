'use client';

import { useEffect, useState } from 'react';

export default function FuturisticHero() {
  const [typed, setTyped] = useState('');
  const full = 'Islam.AI — Diseño • Datos • Automatización';

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setTyped(full.slice(0, i++));
      if (i > full.length) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, []);

  return (
    <section style={{ padding: '56px 0 24px' }}>
      <div className="container-base">
        <div className="neon-card" style={{ padding: 24, overflow: 'hidden' }}>
          <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
              <Badge>Frontend • Backend</Badge>
              <Badge>SQL • FastAPI</Badge>
              <Badge>Sanidad · SINA</Badge>
            </div>

            <h1 style={{ fontSize: 46, lineHeight: 1.05, fontWeight: 900, letterSpacing: -0.4 }}>
              <span className="grad-main">Islam</span> El Mrabet
            </h1>

            <p style={{ color: 'rgba(var(--text), 0.86)', fontSize: 18, lineHeight: 1.55, maxWidth: 780 }}>
              Construyo sistemas y experiencias que combinan <strong>IA</strong>, <strong>datos</strong> y <strong>diseño</strong>,
              llevando equipos de un <em>Excel</em> a un producto <strong>rápido</strong>, <strong>usable</strong> y <strong>escalable</strong>.
            </p>

            <div style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace', color: 'rgba(var(--text), 0.9)', fontSize: 14, opacity: 0.95 }}>
              <span style={{ color: 'rgb(124,58,237)' }}>›</span> {typed}
              <span style={{ animation: 'blink 1s step-start infinite' }}>|</span>
            </div>

            {/* CTAs actualizados */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 6, justifyContent: 'center' }}>
              <a href="/projects" className="btn-primary">Ver Proyectos</a>
              <a href="#contacto" className="btn-ghost">Escríbeme un prompt</a>
            </div>
          </div>

          <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
        </div>
      </div>
    </section>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: 999,
        border: '1px solid rgba(var(--text), 0.14)',
        background: 'rgba(255,255,255,0.03)',
        padding: '6px 10px',
        fontSize: 12,
        color: 'rgba(var(--text), 0.92)',
      }}
    >
      {children}
    </span>
  );
}
