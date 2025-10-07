'use client';

const STEPS = [
  {
    v: 'v1.0',
    title: 'Base técnica',
    desc: 'Fundamentos de frontend/backend, SQL, Android y despliegues.',
    year: '2022',
  },
  {
    v: 'v2.0',
    title: 'Automatización de datos',
    desc: 'Excel→SQL, pipelines, validaciones y utilidades multi-dialecto.',
    year: '2023',
  },
  {
    v: 'v3.0',
    title: 'Productos vivos',
    desc: 'FocusTogether, CookConnect POS, arquitectura más sólida.',
    year: '2024',
  },
  {
    v: 'v4.0',
    title: 'Sistemas en sanidad',
    desc: 'HIS Hospitalario: flujos hospitalarios, integracion de sistemas y canales, implantacion; reducción de tiempos x5.',
    year: '2025',
  },
];

export default function TimelineIA() {
  return (
    <div className="neon-card" style={{ padding: 16 }}>
      <div
        style={{
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          fontSize: 12,
          color: 'rgba(6, 182, 212, 0.8)',
          marginBottom: 6,
        }}
      >
        Evolución del sistema
      </div>
      <h2 style={{ fontWeight: 700, fontSize: 20, marginBottom: 8 }}>
        Roadmap personal
      </h2>

      <ol className="timeline-ia" style={{ position: 'relative', paddingLeft: 14 }}>
        {STEPS.map((s) => (
          <li key={s.v} style={{ marginBottom: 14, position: 'relative' }}>
            <span
              aria-hidden
              style={{
                position: 'absolute',
                left: -15,
                top: 8,
                width: 8,
                height: 8,
                borderRadius: 999,
                background:
                  'linear-gradient(90deg, rgb(var(--grad-1)), rgb(var(--grad-2)))',
              }}
            />
            <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', flexWrap: 'wrap' }}>
              <span className="grad-main" style={{ fontWeight: 800 }}>{s.v}</span>
              <span style={{ fontWeight: 700 }}>{s.title}</span>
              <span style={{ color: 'rgba(var(--text), 0.6)', fontSize: 12 }}>({s.year})</span>
            </div>
            <p style={{ color: 'rgba(var(--text), 0.82)', fontSize: 14, marginTop: 4 }}>{s.desc}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
