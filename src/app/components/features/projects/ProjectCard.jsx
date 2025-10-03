import Link from 'next/link';

export default function ProjectCard({ p }) {
  return (
    <article
      className="rounded-2xl border"
      style={{
        background: 'color-mix(in oklab, rgb(var(--bg)) 70%, rgb(255 255 255) 30%)',
        borderColor: 'rgb(var(--card-border))',
        boxShadow: 'var(--shadow-soft)',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>{p.title}</h3>
      <p style={{ marginTop: '0.5rem', opacity: 0.8, fontSize: '0.95rem' }}>{p.summary}</p>

      {Array.isArray(p.highlights) && p.highlights.length > 0 && (
        <ul style={{ marginTop: '0.75rem', fontSize: '0.95rem', lineHeight: 1.5 }}>
          {p.highlights.map((h) => <li key={h}>• {h}</li>)}
        </ul>
      )}

      {Array.isArray(p.stack) && p.stack.length > 0 && (
        <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem', opacity: 0.8, fontSize: '0.8rem' }}>
          {p.stack.map((s) => (
            <span
              key={s}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                border: '1px solid rgba(0,0,0,0.1)',
                padding: '2px 6px',
                borderRadius: '6px',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
              }}
              className="dark:border-[rgba(255,255,255,0.15)]"
            >
              {s}
            </span>
          ))}
        </div>
      )}

      {p.metric && <p style={{ marginTop: '0.75rem', opacity: 0.7, fontSize: '0.8rem' }}>{p.metric}</p>}

      <div style={{ marginTop: 'auto', paddingTop: '1rem', display: 'flex', gap: '0.75rem' }}>
        {p.links?.demo && (
          <Link href={p.links.demo} className="underline">Demo</Link>
        )}
        {p.links?.code && (
          <Link href={p.links.code} className="underline">Código</Link>
        )}
      </div>
    </article>
  );
}
