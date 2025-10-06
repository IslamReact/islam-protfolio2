// src/app/components/neo/gear/GearShowcase.tsx
'use client';

import { useMemo, useState } from 'react';
import type { GearItem, GearCategory, Usage } from '@/lib/gear';
import styles from '../../../styles/GearShowcase.module.css';
import GearCard from './GetCard';

type Props = { items: GearItem[] };

const CATEGORY_ORDER: GearCategory[] = ['Laptop','Monitor','Keyboard','Mouse','Dock','Microphone','Pad','Accessory'];
const USAGES: Usage[] = ['Daily','Secondary','Backup'];

function hasImage(it: GearItem): boolean {
  return typeof it.image === 'string' && it.image.trim().length > 0;
}

export default function GearShowcase({ items }: Props) {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<'Todos' | GearCategory>('Todos');
  const [useF, setUseF] = useState<'' | Usage>('');

  const categories = useMemo(() => {
    const set = new Set<GearCategory>(items.map(i => i.category));
    return (['Todos', ...CATEGORY_ORDER.filter(c => set.has(c))]) as Array<'Todos'|GearCategory>;
  }, [items]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return items.filter(i => {
      const okCat = cat === 'Todos' ? true : i.category === cat;
      const okUse = useF ? i.usage === useF : true;
      const haystack = [
        i.name, i.brand ?? '', i.model ?? '',
        ...Object.entries(i.specs ?? {}).map(([k,v]) => `${k}:${String(v)}`),
        i.notes ?? ''
      ].join(' ').toLowerCase();
      const okQ = !s || haystack.includes(s);
      return okCat && okUse && okQ;
    });
  }, [items, q, cat, useF]);

  // Agrupar por categoría (solo con imagen)
  const groups = useMemo(() => {
    const map = new Map<GearCategory, GearItem[]>();
    for (const c of CATEGORY_ORDER) map.set(c, []);
    for (const it of filtered) {
      if (hasImage(it)) map.get(it.category)!.push(it);
    }
    return Array.from(map.entries()).filter(([,arr]) => arr.length > 0);
  }, [filtered]);

  return (
    <div className={`neon-card ${styles.wrap}`}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.overline}>Tech Gear</div>
        <h1 className={styles.title}>Mi <span className="grad-main">setup</span> diario</h1>
        <p className={styles.sub}>Gadgets y equipo que uso realmente. Busca, filtra y explora detalles.</p>
      </div>

      {/* Command bar */}
      <div className={styles.command}>
        <input
          className={styles.input}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por nombre, marca, modelo o specs…"
          aria-label="Buscar gear"
        />
        <div className={styles.filters}>
          <div className={styles.chips}>
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setCat(c)}
                aria-pressed={c === cat}
                className={c === cat ? 'btn-primary' : 'btn-ghost'}
              >
                {c}
              </button>
            ))}
          </div>
          <div className={styles.usage}>
            <button
              className={!useF ? 'btn-primary' : 'btn-ghost'}
              aria-pressed={!useF}
              onClick={() => setUseF('')}
            >Todos</button>
            {USAGES.map(u => (
              <button
                key={u}
                className={useF === u ? 'btn-primary' : 'btn-ghost'}
                aria-pressed={useF === u}
                onClick={() => setUseF(u)}
              >{u}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Grupos */}
      <div className={styles.groups}>
        {groups.map(([category, arr]) => (
          <section key={category} aria-labelledby={`h-${category}`} className={styles.group}>
            <header className={styles.groupHead}>
              <h2 id={`h-${category}`}>{category}</h2>
              <span className={styles.count}>{arr.length} ítem(s)</span>
            </header>
            <div className={styles.grid}>
              {arr.map(it => (
                // arr ya viene filtrado con imagen; extra guard por si acaso
                hasImage(it) ? <GearCard key={it.slug} item={it} /> : null
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}