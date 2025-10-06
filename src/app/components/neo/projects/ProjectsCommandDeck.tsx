// src/app/components/neo/projects/ProjectsCommandDeck.tsx
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { Project } from '@/lib/projects';

type Props = { items: Project[] };

// Si despliegas bajo subruta, define en .env.local: NEXT_PUBLIC_BASE_PATH=/mi-subruta
const basePrefix = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(/\/$/, '');

export default function ProjectsCommandDeck({ items }: Props) {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<'Todos' | Project['category']>('Todos');
  const [selected, setSelected] = useState<Project | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Atajos: ⌘K buscar, ESC cerrar, ← → navegar
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') setSelected((s) => (s ? null : s));
      if (selected) {
        if (e.key === 'ArrowRight') nav(+1);
        if (e.key === 'ArrowLeft') nav(-1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const categories = useMemo(() => {
    const set = new Set<Project['category']>(items.map((i) => i.category));
    return (['Todos', ...Array.from(set)] as Array<'Todos' | Project['category']>);
  }, [items]);

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    let list = items.filter((p) => (cat === 'Todos' ? true : p.category === cat));
    if (qq) {
      list = list.filter((p) =>
        (p.title + ' ' + p.summary + ' ' + (p.stack ?? []).join(' ')).toLowerCase().includes(qq)
      );
    }
    return list;
  }, [items, q, cat]);

  function nav(delta: number) {
    if (!selected) return;
    const list = filtered.length ? filtered : items;
    const i = list.findIndex((p) => p.slug === selected.slug);
    const next = list[(i + delta + list.length) % list.length];
    setSelected(next);
  }

  // Fondo reactivo sutil
  const bg = useMemo(() => {
    const a = selected?.accent?.[0] ?? '#7c3aed';
    const b = selected?.accent?.[1] ?? '#06b6d4';
    return `radial-gradient(900px 300px at 0% 0%, ${rgbaFromHex(a, 0.22)}, transparent),
            radial-gradient(900px 300px at 100% 0%, ${rgbaFromHex(b, 0.22)}, transparent)`;
  }, [selected]);

  return (
    <div className="pcd-root neon-card" style={{ padding: 16, backgroundImage: bg, backgroundBlendMode: 'screen' }}>
      {/* Head */}
      <div className="pcd-head">
        <div>
          <div className="pcd-overline">Projects Command Deck</div>
          <h1 className="pcd-title">
            Portafolio <span className="grad-main">futurista</span>, claro y accionable
          </h1>
          <p className="pcd-sub">Busca como “command palette”, filtra por categoría y abre un <strong>case study</strong>.</p>
        </div>
        <div className="pcd-shortcuts">
          <kbd className="pcd-kbd">⌘</kbd>
          <kbd className="pcd-kbd">K</kbd>
          <span className="pcd-shortcuts-hint">buscar</span>
        </div>
      </div>

      {/* Command bar */}
      <div className="pcd-command neon-card">
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por título, tag o descripción… (⌘K)"
          aria-label="Buscar proyectos"
          className="pcd-input"
        />
        <div className="pcd-filters">
          {categories.map((c) => {
            const active = c === cat;
            return (
              <button key={c} onClick={() => setCat(c)} aria-pressed={active} className={active ? 'btn-primary pcd-chip' : 'btn-ghost pcd-chip'}>
                {c}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      <div className="pcd-grid">
        {(filtered.length ? filtered : items).map((p) => (
          <button
            key={p.slug}
            className="pcd-card neon-card"
            onClick={() => setSelected(p)}
            onMouseMove={(e) => tilt(e)}
            onMouseLeave={(e) => resetTilt(e)}
            aria-label={`Abrir ${p.title}`}
          >
            <figure className="pcd-thumb">
              {p.cover ? (
                <img src={`${basePrefix}${p.cover}`} alt={p.title} className="pcd-img" />
              ) : (
                <FallbackVisual title={p.title} a={p.accent?.[0]} b={p.accent?.[1]} />
              )}
            </figure>
            <div className="pcd-card-body">
              <h3 className="pcd-card-title">
                {p.title} {p.year && <span className="pcd-year">· {p.year}</span>}
              </h3>
              <p className="pcd-card-summary">{p.summary}</p>
              <div className="pcd-tags">
                <span className="pcd-badge">{p.category}</span>
                {(p.stack ?? []).slice(0, 3).map((t) => (
                  <span className="pcd-tag" key={t}>{t}</span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Drawer */}
      {selected && (
        <div className="pcd-drawer-overlay" role="dialog" aria-modal="true" onClick={() => setSelected(null)}>
          <article className="pcd-drawer neon-card" onClick={(e) => e.stopPropagation()}>
            <header className="pcd-drawer-head">
              <h2 className="pcd-drawer-title">
                {selected.title} {selected.year && <span className="pcd-year">· {selected.year}</span>}
              </h2>
              <div className="pcd-drawer-actions">
                <button className="btn-ghost" onClick={() => nav(-1)} aria-label="Anterior">←</button>
                <button className="btn-ghost" onClick={() => nav(+1)} aria-label="Siguiente">→</button>
                <button className="btn-ghost" onClick={() => setSelected(null)} aria-label="Cerrar">✕</button>
              </div>
            </header>

            <div className="pcd-drawer-grid">
              <figure className="pcd-drawer-media">
                {selected.cover ? (
                  <img src={`${basePrefix}${selected.cover}`} alt={selected.title} className="pcd-img" />
                ) : (
                  <FallbackVisual title={selected.title} a={selected.accent?.[0]} b={selected.accent?.[1]} />
                )}
              </figure>

              <div className="pcd-drawer-body">
                <p className="pcd-card-summary">{selected.summary}</p>

                {selected.metrics?.length ? (
                  <div className="pcd-metrics">
                    {selected.metrics.map((m) => (
                      <div className="pcd-metric" key={m.label}>
                        <div className="pcd-metric-value gradient-text">{m.value}</div>
                        <div className="pcd-metric-label">{m.label}</div>
                      </div>
                    ))}
                  </div>
                ) : null}

                <div className="pcd-tags" style={{ marginTop: 8 }}>
                  <span className="pcd-badge">{selected.category}</span>
                  {(selected.stack ?? []).map((t) => (
                    <span className="pcd-tag" key={t}>{t}</span>
                  ))}
                </div>

                <div className="pcd-ctas">
                  {selected.links?.code ? (
                    <a href={selected.links.code} className="btn-primary">Abrir</a>
                  ) : (
                    <a href="/contact" className="btn-primary">Pedir demo</a>
                  )}
                  <a href={selected.links?.demo || '/videos'} className="btn-ghost">Ver demo</a>
                </div>
              </div>
            </div>
          </article>
        </div>
      )}

      {/* estilos locales */}
      <style>{`
        .pcd-root{ position:relative; overflow:hidden }
        .pcd-overline{ text-transform:uppercase; letter-spacing:.2em; font-size:12px; color:rgba(6,182,212,.8); margin-bottom:4px }
        .pcd-title{ font-size:26px; font-weight:800; letter-spacing:-.2px }
        .pcd-sub{ color:rgba(var(--text),.82); margin-top:6px }

        .pcd-head{ display:flex; justify-content:space-between; align-items:end; gap:12px; flex-wrap:wrap; margin-bottom:12px }
        .pcd-shortcuts{ display:flex; align-items:center; gap:8px }
        .pcd-kbd{ display:inline-flex; align-items:center; justify-content:center; min-width:22px; height:22px; padding:0 6px; border-radius:6px; border:1px solid rgba(255,255,255,.2); font-size:12px; color:rgba(255,255,255,.9); background:rgba(255,255,255,.05) }
        .pcd-shortcuts-hint{ font-size:12px; color:rgba(var(--text),.7) }

        .pcd-command{ display:grid; gap:10px; padding:12px; margin-bottom:14px }
        .pcd-input{ width:100%; border-radius:12px; border:1px solid rgba(var(--text),.14); background:rgba(255,255,255,.03); color:inherit; padding:12px 14px; outline:none }
        .pcd-filters{ display:flex; flex-wrap:wrap; gap:8px }

        .pcd-grid{ display:grid; gap:12px; grid-template-columns:repeat(3, minmax(0,1fr)) }
        .pcd-card{ display:flex; flex-direction:column; text-align:left; cursor:pointer; padding:10px; transition:transform .15s ease, box-shadow .15s ease }
        .pcd-card:hover{ transform:translateY(-2px) }
        .pcd-thumb{ border-radius:12px; border:1px solid rgba(var(--text),.12); background:rgba(255,255,255,.02); overflow:hidden; aspect-ratio:16/9 }
        .pcd-img{ width:100%; height:100%; object-fit:cover; display:block; filter:saturate(1.06) contrast(1.02) }
        .pcd-card-body{ padding:10px 6px 2px }
        .pcd-card-title{ font-weight:700; display:flex; align-items:baseline; gap:8px; flex-wrap:wrap }
        .pcd-card-summary{ color:rgba(var(--text),.86); font-size:14px; line-height:1.55 }
        .pcd-year{ font-size:12px; color:rgba(var(--text),.6) }

        .pcd-tags{ margin-top:8px; display:flex; flex-wrap:wrap; gap:6px }
        .pcd-badge{ display:inline-flex; align-items:center; border-radius:999px; border:1px solid rgba(var(--text),.14); background:rgba(255,255,255,.03); padding:6px 10px; font-size:11px; color:rgba(var(--text),.92) }
        .pcd-tag{ display:inline-flex; align-items:center; border-radius:8px; border:1px solid rgba(var(--text),.12); background:rgba(255,255,255,.02); padding:4px 8px; font-size:11px; color:rgba(var(--text),.86) }

        .pcd-drawer-overlay{ position:fixed; inset:0; backdrop-filter:blur(6px); background:rgba(0,0,0,.35); display:flex; align-items:flex-end; z-index:60 }
        .pcd-drawer{ width:100%; max-height:86vh; overflow:auto; border-radius:20px 20px 0 0; padding:16px }
        .pcd-drawer-head{ display:flex; justify-content:space-between; align-items:center; gap:10px; padding-bottom:10px; border-bottom:1px solid rgba(var(--text),.12) }
        .pcd-drawer-title{ font-size:22px; font-weight:800 }
        .pcd-drawer-actions{ display:flex; gap:8px }

        .pcd-drawer-grid{ display:grid; gap:14px; grid-template-columns:1.1fr .9fr; align-items:stretch; padding-top:12px }
        .pcd-drawer-media{ border-radius:12px; border:1px solid rgba(var(--text),.12); background:rgba(255,255,255,.02); overflow:hidden; aspect-ratio:16/9 }
        .pcd-drawer-body{ display:flex; flex-direction:column; gap:10px }
        .pcd-metrics{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:10px }
        .pcd-metric{ border:1px solid rgba(var(--text),.12); border-radius:12px; background:rgba(255,255,255,.02); padding:12px }
        .pcd-metric-value{ font-size:24px; font-weight:800; line-height:1 }
        .pcd-metric-label{ font-size:12px; color:rgba(var(--text),.6); margin-top:4px }
        .pcd-ctas{ display:flex; gap:10px; flex-wrap:wrap; margin-top:8px }

        @media (max-width:1100px){
          .pcd-grid{ grid-template-columns:repeat(2, minmax(0,1fr)) }
          .pcd-drawer-grid{ grid-template-columns:1fr }
        }
        @media (max-width:720px){
          .pcd-grid{ grid-template-columns:1fr }
        }
        @media (prefers-reduced-motion:reduce){
          .pcd-card, .pcd-drawer { transition:none !important }
        }
      `}</style>
    </div>
  );
}

/* === Utils === */
function FallbackVisual({ a, b, title }: { a?: string; b?: string; title: string }) {
  const A = a || '#7c3aed', B = b || '#06b6d4';
  return (
    <div aria-hidden style={{
      width:'100%', height:'100%', background:`linear-gradient(135deg, ${A}, ${B})`,
      display:'grid', placeItems:'center', color:'rgba(255,255,255,.95)', fontWeight:800, letterSpacing:.3
    }}>
      {title}
    </div>
  );
}
function rgbaFromHex(hex: string, a = .22) {
  const h = hex.replace('#','');
  const n = parseInt(h.length === 3 ? h.split('').map(c=>c+c).join('') : h, 16);
  const r = (n>>16)&255, g = (n>>8)&255, b = n&255;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
function tilt(e: React.MouseEvent<HTMLButtonElement>) {
  const el = e.currentTarget as HTMLButtonElement;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  el.style.transform = `translateY(-2px) rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg)`;
}
function resetTilt(e: React.MouseEvent<HTMLButtonElement>) {
  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
}
