export default function Highlights() {
  const items = [
    { t: '−42% tiempo de carga', d: 'Herramienta interna optimizada (React + FastAPI).' },
    { t: '+99.8% integridad', d: 'Migraciones SINA (ORMA_*, VITA_*) con validación.' },
    { t: 'Apps internas medibles', d: 'KPIs claros, trazabilidad y costes bajo control.' }
  ];
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container-base" style={{ display: 'grid', gap: 16 }}>
        <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          {items.map(i => (
            <div key={i.t} className="card-3d" style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '1rem',
              padding: '1rem'
            }}>
              <p style={{ margin: 0, fontWeight: 600 }}>{i.t}</p>
              <p style={{ margin: '6px 0 0', opacity: 0.8 }}>{i.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
