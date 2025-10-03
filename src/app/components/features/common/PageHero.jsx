'use client';
import { motion } from 'framer-motion';

export default function PageHero({
  badgeText,               // string | null
  title,                   // string (puede contener <span className="grad-main">...</span>)
  subtitle,                // string
  ctaHref, ctaLabel,       // opcional
  rightPlaceholder = true  // dibuja la caja visual a la derecha
}) {
  return (
    <section className="page-section">
      <div className="container-base page-hero-grid">
        {/* Columna izquierda */}
        <div>
          {badgeText ? (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <span className="badge"><span className="badge-dot" />{badgeText}</span>
            </motion.div>
          ) : null}

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="display h1-hero"
            dangerouslySetInnerHTML={{ __html: title }}
          />

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="subtitle"
            >
              {subtitle}
            </motion.p>
          )}

          {ctaHref && ctaLabel && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 }}
              style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}
            >
              <a href={ctaHref} className="cta-glow">{ctaLabel}</a>
            </motion.div>
          )}
        </div>

        {/* Columna derecha: placeholder visual (consistente con el Hero) */}
        {rightPlaceholder && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            aria-hidden
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <div
              style={{
                width: '80%', maxWidth: 520, aspectRatio: '16/9',
                borderRadius: 24,
                background:
                  'radial-gradient(120% 120% at 20% 20%, rgba(89,192,245,0.18), transparent 60%), ' +
                  'radial-gradient(120% 120% at 80% 60%, rgba(168,130,255,0.22), transparent 60%), ' +
                  'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: 'var(--shadow-soft)'
              }}
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}
