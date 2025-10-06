// src/app/components/neo/about/AboutHero.tsx
'use client';

import type { AboutData } from '@/lib/about';
import styles from '@/app/styles/AboutHero.module.css';

export default function AboutHero({ about }: { about: AboutData }) {
  return (
    <div className={`neon-card ${styles.aboutHero}`}>
      <div className={styles.inner}>
        {/* Avatar */}
        <div aria-hidden className={styles.avatar}>
          {about.avatar ? (
            <img src={about.avatar} alt="" width={92} height={92} className={styles.avatarImg} />
          ) : (
            <div className={styles.avatarFallback}>IE</div>
          )}
        </div>

        {/* Intro */}
        <div>
          <div className={styles.overline}>Sobre mí</div>
          <h1 className={styles.title}>
            Hola, soy <span className="grad-main">{about.name}</span>
          </h1>
          {about.title && <div className={styles.subtitle}>{about.title}</div>}
          {about.tagline && <p className={styles.tagline}>{about.tagline}</p>}

          <div className={styles.ctas}>
            <a href="/contact" className="btn-primary">Contacto</a>
          </div>
        </div>
      </div>

      <div aria-hidden className={styles.glow} />
    </div>
  );
}
