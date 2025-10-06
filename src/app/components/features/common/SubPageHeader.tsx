// Server Component
import type { ReactNode } from 'react';

type Props = {
  eyebrow?: string;
  title?: ReactNode;            // permite texto o JSX
  subtitle?: string;
  meta?: string[];              // <- importante
  actions?: ReactNode;
  align?: 'left' | 'center';
  compact?: boolean;
};

export default function SubpageHeader({
  eyebrow,
  title,
  subtitle,
  meta = [],                     // ya es string[] por el tipo
  actions = null,
  align = 'left',
  compact = false
}: Props) {
  const sectionPad = compact ? { padding: '2.5rem 0 1.75rem' } : { padding: '3.5rem 0 2.5rem' };
  const centered = align === 'center';

  return (
    <section className="section" style={{ ...sectionPad, paddingBottom: 0 }}>
      <div className="container-base" style={{ textAlign: centered ? 'center' : 'left' }}>
        {eyebrow && (
          <div
            className="badge"
            style={{
              display: 'inline-flex',
              marginBottom: 8,
              background: 'rgba(var(--bg), var(--panel-alpha))',
              border: '1px solid rgba(var(--text), var(--border-alpha))',
            }}
          >
            <span
              aria-hidden
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: 'linear-gradient(90deg, rgb(var(--grad-1)), rgb(var(--grad-2)))',
                boxShadow: '0 0 8px rgba(168,130,255,0.5)',
                marginRight: 8,
              }}
            />
            {eyebrow}
          </div>
        )}

        <h1
          className="display"
          style={{ fontSize: 'clamp(1.8rem, 1.2rem + 2vw, 2.4rem)', margin: '6px 0 4px' }}
        >
          {title}
        </h1>

        {subtitle && (
          <p
            style={{
              color: 'rgba(var(--text), 0.8)',
              marginTop: 6,
              lineHeight: 1.65,
              maxWidth: 840,
              marginLeft: centered ? 'auto' : 0,
              marginRight: centered ? 'auto' : 0,
            }}
          >
            {subtitle}
          </p>
        )}

        {meta.length > 0 && (
          <div
            style={{
              display: 'flex',
              gap: 8,
              flexWrap: 'wrap',
              marginTop: 14,
              justifyContent: centered ? 'center' : 'flex-start',
            }}
          >
            {meta.map((m) => (
              <span
                key={m}
                className="kbd"
                style={{
                  background: 'rgba(var(--bg), var(--panel-alpha))',
                  borderColor: 'rgba(var(--text), 0.2)',
                }}
              >
                {m}
              </span>
            ))}
          </div>
        )}

        {actions && (
          <div
            style={{
              marginTop: 18,
              display: 'flex',
              gap: 10,
              justifyContent: centered ? 'center' : 'flex-start',
              flexWrap: 'wrap',
            }}
          >
            {actions}
          </div>
        )}
      </div>
    </section>
  );
}
