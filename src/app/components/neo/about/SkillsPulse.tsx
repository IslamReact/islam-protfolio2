// src/app/components/neo/about/SkillsPulse.tsx
'use client';

import { useMemo, useState } from 'react';

export default function SkillsPulse({ core = [], tools = [] }: { core?: string[]; tools?: string[] }) {
  const [q, setQ] = useState('');
  const all = useMemo(() => [
    ...core.map((x) => ({ label: x, tier: 'Core' })),
    ...tools.map((x) => ({ label: x, tier: 'Tools' })),
  ], [core, tools]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return all;
    return all.filter((t) => t.label.toLowerCase().includes(s));
  }, [all, q]);

  return (
    <div className="neon-card" style={{ padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 12, flexWrap: 'wrap', marginBottom: 10 }}>
        <div>
          <div style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: 12, color: 'rgba(6,182,212,.85)' }}>Skills</div>
          <h2 style={{ fontWeight: 800, fontSize: 20 }}>Stack & herramientas</h2>
          <p style={{ color: 'rgba(var(--text),.8)' }}>Busca y pasa el cursor: pulso reactivo.</p>
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Filtrar skills…"
          aria-label="Filtrar skills"
          style={{
            minWidth: 220,
            borderRadius: 12,
            border: '1px solid rgba(var(--text), .14)',
            background: 'rgba(255,255,255,.03)',
            color: 'inherit',
            padding: '10px 12px',
            outline: 'none'
          }}
        />
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {filtered.map((t) => (
          <span
            key={`${t.tier}-${t.label}`}
            className="btn-ghost"
            style={{
              padding: '10px 12px',
              borderRadius: 999,
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseMove={(e) => {
              const el = e.currentTarget as HTMLSpanElement;
              const r = el.getBoundingClientRect();
              const x = e.clientX - r.left, y = e.clientY - r.top;
              el.style.setProperty('--x', `${x}px`);
              el.style.setProperty('--y', `${y}px`);
            }}
          >
            <em style={{ opacity: .7, fontStyle: 'normal', marginRight: 6 }}>{t.tier} ·</em>
            {t.label}
            <i aria-hidden style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: 'radial-gradient(120px 60px at var(--x) var(--y), rgba(6,182,212,.15), transparent)',
              opacity: 0, transition: 'opacity .15s ease'
            }} className="pulse" />
          </span>
        ))}
      </div>

      <style>{`
        .btn-ghost:hover .pulse { opacity: 1 }
      `}</style>
    </div>
  );
}
