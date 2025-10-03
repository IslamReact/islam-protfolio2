export default function AboutSection() {
  return (
    <section id="about" className="section">
      <div className="container-base">
        <h2 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '1rem' }}>
          Sobre mí
        </h2>
        <p style={{ maxWidth: 720, lineHeight: 1.6, opacity: 0.9 }}>
          Soy desarrollador full-stack con foco en <strong>automatización</strong>, <strong>datos</strong> e <strong>IA aplicada</strong>.
          Me gusta construir productos <em>rápidos</em>, <em>medibles</em> y <em>listos para negocio</em>.
        </p>

        <div style={{ display: 'grid', gap: '1rem', marginTop: '1.25rem' }}>
          {[
            'He optimizado herramientas internas reduciendo tiempos de carga y errores de operación.',
            'Experiencia real en migraciones masivas (SINA Suite: ORMA_*, VITA_*…) con control y auditoría.',
            'Stack: React/Next, FastAPI (Python), SQL Server/PostgreSQL, ETL y automatisación.',
            'Mentalidad de producto: priorizo impacto, DX y escalabilidad.',
            'Ahora mismo: construyendo un portfolio de nivel y profundizando en IA aplicada.'
          ].map((t) => (
            <div key={t} className="card" style={{ padding: '0.75rem 1rem' }}>
              <p style={{ margin: 0, fontSize: '0.95rem' }}>{t}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
