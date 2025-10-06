// src/app/components/neo/about/AboutBioCompact.tsx
'use client';

import { useMemo, useState } from 'react';

export default function AboutBioCompact({ bio }: { bio: string[] }) {
  const [open, setOpen] = useState(false);

  // 3 beats ultra escaneables (si hay más, van colapsados)
  const beats = useMemo(() => (bio || []).slice(0, 3), [bio]);
  const rest  = useMemo(() => (bio || []).slice(3), [bio]);

  return (
    <div className="neon-card" style={{ padding: 14 }}>
      <h2 style={{ fontWeight: 800, fontSize: 18, marginBottom: 10 }}>Bio</h2>

      {/* Bullets breves */}
      <ul style={{ margin: 0, paddingLeft: 18, display: 'grid', gap: 8 }}>
        {beats.map((b, i) => (
          <li key={i} style={{ color: 'rgba(var(--text),.9)', lineHeight: 1.55 }}>{b}</li>
        ))}
      </ul>

      {/* Colapsable para el resto */}
      {rest.length > 0 && (
        <div style={{ marginTop: 10 }}>
          {!open ? (
            <button className="btn-ghost" onClick={() => setOpen(true)} aria-expanded={open}>
              Ver más
            </button>
          ) : (
            <>
              <div style={{ display: 'grid', gap: 8, marginTop: 8 }}>
                {rest.map((p, i) => (
                  <p key={i} style={{ color: 'rgba(var(--text),.86)', lineHeight: 1.6 }}>{p}</p>
                ))}
              </div>
              <button className="btn-ghost" style={{ marginTop: 8 }} onClick={() => setOpen(false)} aria-expanded={open}>
                Ver menos
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
