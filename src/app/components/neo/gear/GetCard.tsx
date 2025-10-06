// src/app/components/neo/gear/GetCard.tsx
'use client';

import { useMemo, useState } from 'react';
import type { JSX, SVGProps } from 'react';
import type { GearItem, GearCategory } from '@/lib/gear';
import styles from '../../../styles/GearCard.module.css';

const basePrefix = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(/\/$/, '');

/* ========= ICONOS POR CATEGORÍA (con nombre para ESLint) ========= */
type IconComp = (props: SVGProps<SVGSVGElement>) => JSX.Element;

function LaptopIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden {...props}>
      <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8H4V6z" />
      <path d="M2 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2H2z" />
    </svg>
  );
}
function MonitorIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden {...props}>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8" />
    </svg>
  );
}
function KeyboardIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden {...props}>
      <rect x="3" y="7" width="18" height="10" rx="2" />
      <path d="M7 10h2M11 10h2M15 10h2M7 13h10" />
    </svg>
  );
}
function MouseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden {...props}>
      <rect x="7" y="3" width="10" height="18" rx="5" />
      <path d="M12 3v5" />
    </svg>
  );
}
function DockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden {...props}>
      <rect x="4" y="8" width="16" height="8" rx="2" />
      <path d="M6 16v2h12v-2" />
    </svg>
  );
}
function MicrophoneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden {...props}>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11v1a7 7 0 0 0 14 0v-1M12 19v2" />
    </svg>
  );
}
function PadIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden {...props}>
      <rect x="4" y="5" width="16" height="14" rx="3" />
    </svg>
  );
}
function AccessoryIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden {...props}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14l-5-4.87 6.91-1.01z" />
    </svg>
  );
}

const ICONS: Record<GearCategory, IconComp> = {
  Laptop: LaptopIcon,
  Monitor: MonitorIcon,
  Keyboard: KeyboardIcon,
  Mouse: MouseIcon,
  Dock: DockIcon,
  Microphone: MicrophoneIcon,
  Pad: PadIcon,
  Accessory: AccessoryIcon,
};

/* ======================= CARD ======================= */
export default function GearCard({ item }: { item: GearItem }) {
  // Mostrar <figure> solo si hay ruta y la imagen carga bien
  const [imgOk, setImgOk] = useState(
    typeof item.image === 'string' && item.image.trim().length > 0
  );

  const brandModel = useMemo(
    () => [item.brand, item.model].filter(Boolean).join(' · '),
    [item.brand, item.model]
  );

  const Icon = ICONS[item.category] ?? AccessoryIcon;

  return (
    <article className={`${styles.card} neon-card`} data-cat={item.category}>
      {/* Halo degradado */}
      <span aria-hidden className={styles.glow} />

      {/* Header */}
      <header className={styles.top}>
        <span className={styles.iconBadge} aria-hidden>
          <Icon />
        </span>
        <div className={styles.titleBlock}>
          <h3 className={styles.title}>{item.name}</h3>
          {brandModel && <div className={styles.sub}>{brandModel}</div>}
        </div>
        {item.usage ? (
          <span className={`${styles.usage} ${styles['u' + item.usage]}`}>{item.usage}</span>
        ) : null}
      </header>

      {/* Imagen (opcional) */}
      {imgOk && item.image ? (
        <figure className={styles.thumb}>
          <img
            src={`${basePrefix}${item.image}`}
            alt={item.name}
            className={styles.img}
            loading="lazy"
            decoding="async"
            onError={() => setImgOk(false)}
          />
        </figure>
      ) : null}

      {/* Descripción */}
      {item.notes ? <p className={styles.notes}>{item.notes}</p> : null}

      {/* Specs */}
      {item.specs && Object.keys(item.specs).length > 0 ? (
        <div className={styles.chips}>
          {Object.entries(item.specs).map(([k, v]) => (
            <span key={k} className={styles.chip}>
              <span className={styles.k}>{k}</span>
              <span className={styles.v}>{String(v)}</span>
            </span>
          ))}
        </div>
      ) : null}
    </article>
  );
}