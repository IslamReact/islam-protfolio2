// src/app/components/neo/gear/GearCard.tsx
import type { GearItem } from '@/lib/gear';
import styles from '..//../../styles/GearCard.module.css';

export default function GearCard({ item }: { item: GearItem }) {
  return (
    <article className={`neon-card ${styles.card}`}>
      <figure className={styles.media}>
        {item.image ? (
          <img src={item.image} alt={item.name} className={styles.img} />
        ) : (
          <div className={styles.fallback} aria-hidden>{item.icon || '🧩'}</div>
        )}
      </figure>

      <div className={styles.body}>
        <div className={styles.top}>
          <h3 className={styles.title}>{item.name}</h3>
          {item.usage && <span className={styles.badge}>{item.usage}</span>}
        </div>

        <p className={styles.meta}>
          {item.brand && <strong>{item.brand}</strong>} {item.model ? `· ${item.model}` : ''}
        </p>

        {item.notes && <p className={styles.notes}>{item.notes}</p>}

        {item.specs && (
          <div className={styles.specs}>
            {Object.entries(item.specs).map(([k, v]) => (
              <span key={k} className={styles.spec}>{k}: {String(v)}</span>
            ))}
          </div>
        )}

        <div className={styles.ctas}>
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
              aria-label={`Ver ${item.name}`}
            >
              Ver producto
            </a>
          )}
        </div>
      </div>
    </article>
  );
}