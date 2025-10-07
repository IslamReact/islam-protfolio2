// src/app/components/neo/about/ExperienceTeaser.tsx
import type { WorkItem } from '@/lib/experiencie';
import styles from '../../../styles/Experience.module.css';
import type React from 'react';

type Props = {
  items: WorkItem[];
  limit?: number; // por defecto 3
};

interface CSSVars extends React.CSSProperties {
  '--a'?: string;
  '--b'?: string;
}

export default function ExperienceTeaser({ items, limit = 3 }: Props) {
  const ordered: WorkItem[] = [...items].sort((a, b) =>
    b.start > a.start ? 1 : b.start < a.start ? -1 : 0
  );
  const list: WorkItem[] = ordered.slice(0, limit);

  return (
    <section className={styles.wrap} aria-label="Experiencia laboral">
      {/* Cabecera */}
      <div className={styles.head}>
        <div>
          <div className={styles.overline}>Experiencia</div>
          <h2 className={styles.title}>
            Carrera <span className="grad-main">profesional</span>
          </h2>
          <p className={styles.sub}>Implementación HIS, integraciones y datos clínicos.</p>
        </div>
      </div>

      {/* Lista horizontal con línea integrada vía ::before */}
      <ol className={styles.list}>
        {list.map((it: WorkItem) => {
          const vars: CSSVars = {
            '--a': it.accent?.[0] ?? '#7c3aed',
            '--b': it.accent?.[1] ?? '#06b6d4',
          };
          return (
            <li key={`${it.company}-${it.start}`} className={styles.row} style={vars}>
              {/* Nodo alineado a la línea */}
              <span className={styles.node} aria-hidden />

              {/* Contenido estirado */}
              <article className={`${styles.card} neon-card`}>
                <header className={styles.top}>
                  <div className={styles.roleLine}>
                    <h3 className={styles.role}>{it.role}</h3>
                    <span className={styles.at}>en</span>
                    <span className={styles.company}>
                      {it.links?.company ? (
                        <a href={it.links.company} target="_blank" rel="noopener">
                          {it.company} ↗
                        </a>
                      ) : (
                        it.company
                      )}
                    </span>
                  </div>

                  <div className={styles.meta}>
                    <span>{formatRange(it.start, it.end)}</span>
                    {it.location ? (
                      <>
                        <span className={styles.sep} aria-hidden>·</span>
                        <span>{it.location}</span>
                      </>
                    ) : null}
                    {it.mode ? (
                      <>
                        <span className={styles.sep} aria-hidden>·</span>
                        <span>{it.mode}</span>
                      </>
                    ) : null}
                  </div>
                </header>

                {it.summary ? <p className={styles.summary}>{it.summary}</p> : null}

                {it.highlights?.length ? (
                  <ul className={styles.points}>
                    {it.highlights.slice(0, 3).map((h: string) => (
                      <li key={h}>
                        <span className={styles.bullet} aria-hidden>◆</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {it.stack?.length ? (
                  <div className={styles.tags}>
                    {it.stack.slice(0, 6).map((t: string) => (
                      <span key={t} className={styles.tag}>{t}</span>
                    ))}
                  </div>
                ) : null}

                <div className={styles.ctas}>
                  <a className="btn-ghost" href="/contact">Contactar</a>
                </div>

                <span className={styles.glow} aria-hidden />
              </article>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/* ===== utils fecha ===== */
function parseYM(s: string): Date {
  const [y, m] = s.split('-').map(Number);
  return new Date(y, (m || 1) - 1, 1);
}
function formatRange(start: string, end: string | null): string {
  const d1 = parseYM(start);
  const d2 = end ? parseYM(end) : new Date();
  const fmt = new Intl.DateTimeFormat('es-ES', { month: 'short', year: 'numeric' });
  const span = humanDuration(d1, d2);
  const endTxt = end ? fmt.format(d2) : 'actualidad';
  return `${fmt.format(d1)} – ${endTxt} · ${span}`;
}
function humanDuration(a: Date, b: Date): string {
  let months = (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth());
  if (months < 0) months = 0;
  const years = Math.floor(months / 12);
  const rem = months % 12;
  const y = years ? `${years} año${years > 1 ? 's' : ''}` : '';
  const m = rem ? `${rem} mes${rem > 1 ? 'es' : ''}` : '';
  return [y, m].filter(Boolean).join(' ');
}