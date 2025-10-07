'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { UseItem, UseCategory } from '@/lib/uses';
import styles from '../../../styles/UsesLoadout.module.css';

type Props = { items: UseItem[] };

export default function UsesLoadout({ items }: Props) {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<'Todos' | UseCategory>('Todos');
  const inputRef = useRef<HTMLInputElement | null>(null);

  // ⌘/Ctrl + K → enfocar búsqueda
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

  // Filtro (sin plataformas)
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

  // Agrupar por categoría
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
      <div className={`neon-card ${styles.wrap}`}>
        <div className={styles.hero}>
          <div className={styles.overline}>Loadout · Uses</div>
          <h1 className={styles.title}>Sin datos aún</h1>
          <p className={styles.sub}>
            Añade contenido en <code>src/content/uses.json</code> o en{' '}
            <code>src/content/uses/*.json</code>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`neon-card ${styles.wrap}`}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.overline}>Loadout · Uses</div>
        <h1 className={styles.title}>
          Mi <span className="grad-main">setup</span> favorito
        </h1>
        <p className={styles.sub}>
          Hardware y herramientas que uso a diario. Filtra, busca y copia snippets.
        </p>
      </div>

      {/* Command bar */}
      <div className={`neon-card ${styles.command}`}>
        <div className={styles.searchRow}>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por nombre, tag o descripción… (⌘K)"
            aria-label="Buscar"
            className={styles.input}
          />
          {q && (
            <button
              className="btn-ghost"
              onClick={() => setQ('')}
              aria-label="Limpiar búsqueda"
            >
              Limpiar
            </button>
          )}
          <div className={styles.hint}>
            <kbd className={styles.kbd}>⌘</kbd>
            <kbd className={styles.kbd}>K</kbd>
            <span>buscar</span>
          </div>
        </div>

        {/* Filtros (categorías) */}
        <div className={styles.filters}>
          {categories.map((c) => {
            const active = c === cat;
            return (
              <button
                key={c}
                onClick={() => setCat(c)}
                aria-pressed={active}
                className={`${styles.catChip} ${active ? styles.catChipActive : ''}`}
              >
                <span className={styles.dot} aria-hidden />
                {c}
              </button>
            );
          })}
          <span className={styles.count} aria-live="polite">
            {filtered.length} resultado{filtered.length === 1 ? '' : 's'}
          </span>
        </div>
      </div>

      {/* Grupos por categoría */}
      <div className={styles.groups}>
        {groups.map(([category, list]) => (
          <section key={category} aria-labelledby={`h-${category}`} className={styles.group}>
            <header className={styles.groupHead}>
              <div className={styles.groupTitleWrap}>
                <span className={styles.groupIcon} aria-hidden>
                  {iconForCategory(category)}
                </span>
                <h2 id={`h-${category}`} className={styles.groupTitle}>
                  {category}
                </h2>
              </div>
              <span className={styles.groupCount}>{list.length} ítem(s)</span>
            </header>

            <div className={styles.grid}>
              {list.map((i) => (
                <UseCard key={i.slug} item={i} />
              ))}
            </div>
          </section>
        ))}
      </div>
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

  const hasIcon = !!item.icon;
  const isEmoji = hasIcon && !item.icon!.startsWith('/');

  return (
    <article
      className={styles.card}
      onClick={() => item.link && window.open(item.link, '_blank', 'noopener')}
      role={item.link ? 'link' : undefined}
      tabIndex={item.link ? 0 : -1}
      onKeyDown={(e) => {
        if (item.link && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          window.open(item.link, '_blank', 'noopener');
        }
      }}
    >
      <span aria-hidden className={styles.glow} />

      {/* Header */}
      <div className={styles.cardTop}>
        <div className={styles.iconWrap} aria-hidden>
          {hasIcon ? (
            isEmoji ? (
              <span className={styles.emoji}>{item.icon}</span>
            ) : (
              <img src={item.icon!} alt="" width={28} height={28} className={styles.iconImg} />
            )
          ) : (
            <span className={styles.emoji}>🛠️</span>
          )}
        </div>

        <div className={styles.titleBlock}>
          <div className={styles.cardTitle}>{item.name}</div>
          <div className={styles.metaLine}>
            {item.badge ? <span className={styles.badge}>{item.badge}</span> : null}
            <span className={styles.category}>{item.category}</span>
          </div>
        </div>

        {item.link ? (
          <span className={styles.openHint} aria-hidden>↗</span>
        ) : null}
      </div>

      {/* Descripción */}
      <p className={styles.desc}>{item.description}</p>

      {/* Tags */}
      {(item.tags?.length ?? 0) > 0 && (
        <div className={styles.tags}>
          {item.tags!.map((t) => (
            <span key={t} className={styles.tag}>{t}</span>
          ))}
        </div>
      )}

      {/* Snippet */}
      {item.snippet ? (
        <div className={styles.snippet}>
          <pre className={styles.pre} aria-label={`Snippet de ${item.name}`}>
{item.snippet}
          </pre>
          <button
            onClick={(e) => {
              e.stopPropagation();
              copySnippet();
            }}
            className={`btn-ghost ${styles.copyBtn}`}
            aria-label="Copiar snippet"
            title="Copiar snippet"
          >
            {copied ? '✓ Copiado' : 'Copiar'}
          </button>
        </div>
      ) : null}
    </article>
  );
}

/* ====== Iconos de grupo (emojis simples, sin dependencias) ====== */
function iconForCategory(cat: string): string {
  switch (cat) {
    case 'Design':
      return '🎨';
    case 'Dev':
      return '🧩';
    case 'Productivity':
      return '⚡';
    case 'Writing':
      return '✍️';
    case 'Browser':
      return '🌐';
    case 'Terminal':
      return '⌨️';
    case 'Cloud':
      return '☁️';
    default:
      return '🛠️';
  }
}