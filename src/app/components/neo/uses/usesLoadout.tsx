// src/app/components/neo/UsesLoadout.tsx
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { UseItem, UseCategory } from '@/lib/uses';

type Props = { items: UseItem[] };

export default function UsesLoadout({ items }: Props) {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<'Todos' | UseCategory>('Todos');
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Acceso rápido: ⌘/Ctrl + K para enfocar búsqueda
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') inputRef.current?.blur();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Categorías dinámicas
  const categories = useMemo(() => {
    const set = new Set<UseCategory>(items.map((i) => i.category));
    return (['Todos', ...Array.from(set)] as Array<'Todos' | UseCategory>);
  }, [items]);

  // Filtro (por categoría y texto). ← SIN plataformas
  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    return items.filter((i) => {
      const okCat = cat === 'Todos' ? true : i.category === cat;
      const okQ =
        !qq ||
        (i.name + ' ' + i.description + ' ' + (i.tags || []).join(' '))
          .toLowerCase()
          .includes(qq);
      return okCat && okQ;
    });
  }, [items, q, cat]);

  // Agrupar por categoría para el render
  const groups = useMemo(() => {
    const m = new Map<string, UseItem[]>();
    for (const it of filtered) {
      const key = it.category || 'Other';
      if (!m.has(key)) m.set(key, []);
      m.get(key)!.push(it);
    }
    return Array.from(m.entries()); // [ [cat, UseItem[]], ... ]
  }, [filtered]);

  // Empty state
  if (!items || !items.length) {
    return (
      <div className="neon-card" style={{ padding: 16 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800 }}>Sin datos aún</h1>
        <p style={{ color: 'rgba(var(--text),0.8)' }}>
          Añade contenido en <code>src/content/uses.json</code> o en{' '}
          <code>src/content/uses/*.json</code>.
        </p>
      </div>
    );
  }

  return (
    <div className="neon-card" style={{ padding: 16 }}>
      {/* Cabecera */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'end',
          gap: 12,
          flexWrap: 'wrap',
          marginBottom: 12,
        }}
      >
        <div>
          <div
            style={{
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              fontSize: 12,
              color: 'rgba(6, 182, 212, 0.8)',
            }}
          >
            Loadout · Uses
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: -0.2 }}>
            Mi <span className="grad-main">setup</span> favorito
          </h1>
          <p style={{ color: 'rgba(var(--text), 0.82)', marginTop: 6 }}>
            Hardware y herramientas que uso a diario. Filtra, busca y copia snippets.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <kbd className="kbd">⌘</kbd>
          <kbd className="kbd">K</kbd>
          <span style={{ fontSize: 12, color: 'rgba(var(--text), 0.7)' }}>buscar</span>
        </div>
      </div>

      {/* Command bar */}
      <div
        className="neon-card"
        style={{ padding: 12, display: 'grid', gap: 10, marginBottom: 14 }}
      >
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por nombre, tag o descripción… (⌘K)"
          aria-label="Buscar"
          style={{
            width: '100%',
            borderRadius: 12,
            border: '1px solid rgba(var(--text), 0.14)',
            background: 'rgba(255,255,255,0.03)',
            color: 'inherit',
            padding: '12px 14px',
            outline: 'none',
          }}
        />

        {/* Filtros (SOLO categorías) */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {categories.map((c) => {
            const active = c === cat;
            return (
              <button
                key={c}
                onClick={() => setCat(c)}
                aria-pressed={active}
                className={active ? 'btn-primary' : 'btn-ghost'}
                style={{ padding: '8px 12px' }}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grupos por categoría */}
      <div style={{ display: 'grid', gap: 16 }}>
        {groups.map(([category, list]) => (
          <section key={category} aria-labelledby={`h-${category}`}>
            <header
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                gap: 10,
                marginBottom: 8,
              }}
            >
              <h2 id={`h-${category}`} style={{ fontSize: 18, fontWeight: 800 }}>
                {category}
              </h2>
              <span style={{ fontSize: 12, color: 'rgba(var(--text), 0.6)' }}>
                {list.length} ítem(s)
              </span>
            </header>

            <div className="uses-grid">
              {list.map((i) => (
                <UseCard key={i.slug} item={i} />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Responsivo + utilidades */}
      <style>{`
        .kbd{display:inline-flex;align-items:center;justify-content:center;min-width:22px;height:22px;padding:0 6px;border-radius:6px;border:1px solid rgba(255,255,255,.2);font-size:12px;color:rgba(255,255,255,.9);background:rgba(255,255,255,.05)}
        .uses-grid{ display:grid; gap:12px; grid-template-columns:repeat(3, minmax(0,1fr)) }
        @media (max-width: 1100px){
          .uses-grid{ grid-template-columns:repeat(2, minmax(0,1fr)) }
        }
        @media (max-width: 720px){
          .uses-grid{ grid-template-columns:1fr }
        }
      `}</style>
    </div>
  );
}

/* ====== Tarjeta individual ====== */
function UseCard({ item }: { item: UseItem }) {
  const [copied, setCopied] = useState(false);

  async function copySnippet() {
    if (!item.snippet) return;
    try {
      await navigator.clipboard.writeText(item.snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // noop
    }
  }

  return (
    <article
      className="neon-card"
      style={{
        padding: 12,
        display: 'grid',
        gap: 10,
        alignContent: 'start',
        cursor: item.link ? 'pointer' : 'default',
      }}
      onClick={() => item.link && window.open(item.link, '_blank', 'noopener')}
      onMouseMove={(e) => tilt(e)}
      onMouseLeave={(e) => resetTilt(e)}
    >
      {/* Header */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        {item.icon && item.icon.startsWith('/') ? (
          <img
            src={item.icon}
            alt=""
            width={28}
            height={28}
            style={{ borderRadius: 6, objectFit: 'cover' }}
          />
        ) : (
          <span aria-hidden style={{ fontSize: 20 }}>
            {item.icon || '🛠️'}
          </span>
        )}
        <div style={{ display: 'grid' }}>
          <div style={{ fontWeight: 800, lineHeight: 1.1 }}>{item.name}</div>
          <div style={{ fontSize: 12, color: 'rgba(var(--text), 0.6)' }}>
            {item.badge ? `${item.badge} · ` : ''}
            {item.category}
          </div>
        </div>
      </div>

      {/* Body */}
      <p style={{ color: 'rgba(var(--text), 0.86)', fontSize: 14, lineHeight: 1.55 }}>
        {item.description}
      </p>

      {/* Tags (SIN plataformas) */}
      {(item.tags?.length ?? 0) > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {item.tags!.map((t) => (
            <span
              key={t}
              style={{
                fontSize: 11,
                border: '1px solid rgba(var(--text), 0.12)',
                borderRadius: 8,
                padding: '4px 8px',
                background: 'rgba(255,255,255,0.02)',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      )}

      {/* Snippet */}
      {item.snippet ? (
        <div
          className="neon-card"
          style={{
            padding: 10,
            position: 'relative',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(var(--text), 0.12)',
          }}
        >
          <pre
            style={{
              margin: 0,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              fontFamily:
                'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
              fontSize: 12.5,
              lineHeight: 1.45,
              color: 'rgba(var(--text), 0.95)',
            }}
          >
{item.snippet}
          </pre>
          <button
            onClick={(e) => {
              e.stopPropagation();
              copySnippet();
            }}
            className="btn-ghost"
            aria-label="Copiar snippet"
            title="Copiar snippet"
            style={{ position: 'absolute', top: 8, right: 8 }}
          >
            {copied ? '✓ Copiado' : 'Copiar'}
          </button>
        </div>
      ) : null}
    </article>
  );
}

/* ====== Utils micro-tilt ====== */
function tilt(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget as HTMLElement;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  el.style.transform = `translateY(-2px) rotateX(${(-y * 3).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg)`;
}
function resetTilt(e: React.MouseEvent<HTMLElement>) {
  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
}
