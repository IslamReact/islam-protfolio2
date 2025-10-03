import Header from '@/app/components/layout/header';
import Footer from '@/app/components/layout/footer';
import Container from '@/app/components/layout/container';

export const metadata = {
  title: 'Sobre mí | Islam El Mrabet',
  description: 'Trayectoria, enfoque y señales de credibilidad.'
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="section" style={{ paddingTop: '3.5rem' }}>
          <Container>
            <h1 className="display" style={{ fontSize: '2.25rem', fontWeight: 700, lineHeight: 1.1 }}>
              Sobre mí
            </h1>
            <p style={{ marginTop: '0.75rem', maxWidth: 820, opacity: 0.9 }}>
              Desarrollador full-stack con foco en <strong>automatización</strong>, <strong>datos</strong> e <strong>IA aplicada</strong>.
              Construyo productos <em>rápidos</em>, <em>medibles</em> y listos para negocio.
            </p>

            {/* Señales de credibilidad */}
            <div style={{ display: 'grid', gap: '1rem', marginTop: '1.5rem' }}>
              {[
                'Optimización de herramientas internas (-42% tiempo de carga).',
                'Migraciones masivas SINA (ORMA_*, VITA_*), validación y auditoría.',
                'Stack: React/Next, FastAPI, SQL Server/PostgreSQL, ETL.',
                'Arquitectura pragmática: DX, performance y métricas primero.',
                'Actualmente: IA aplicada y automatización de procesos.'
              ].map((t) => (
                <div key={t} className="card" style={{ padding: '0.9rem 1rem' }}>
                  <p style={{ margin: 0, fontSize: '0.95rem' }}>{t}</p>
                </div>
              ))}
            </div>

            {/* Timeline breve */}
            <div style={{ marginTop: '2rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Timeline</h2>
              <ul style={{ margin: '0.75rem 0 0 1.25rem', lineHeight: 1.8 }}>
                <li><strong>2025</strong> — Excel→SQL, FocusTogether, migraciones SINA; profundizando en IA.</li>
                <li><strong>2024</strong> — Proyectos internos de automatización y ETL; rendimiento front.</li>
                <li><strong>Antes</strong> — Base sólida en React, APIs con Python (FastAPI) y SQL.</li>
              </ul>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
