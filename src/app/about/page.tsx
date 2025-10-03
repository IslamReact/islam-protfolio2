import Header from '@/app/components/layout/header';
import Footer from '@/app/components/layout/footer';
import Container from '@/app/components/layout/container';
import PageHero from '@/app/components/features/common/PageHero';
import Link from 'next/link';

export const metadata = {
  title: 'Sobre mí',
  description:
    'Trayectoria y enfoque: automatización, datos e IA aplicada. Construyo productos rápidos, medibles y listos para negocio.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'Sobre mí · Islam El Mrabet',
    description:
      'Automatización, datos e IA aplicada. Enfoque en impacto, DX y rendimiento.',
    images: [{ url: '/og-default.png', width: 1200, height: 630 }]
  }
};

export default function AboutPage() {
  const signals = [
    'Optimización de herramientas internas (−42% tiempo de carga).',
    'Migraciones masivas SINA (ORMA_*, VITA_*) con validación y auditoría.',
    'Stack: React/Next, FastAPI, SQL Server/PostgreSQL, ETL.',
    'Arquitectura pragmática: DX, performance y métricas primero.',
    'Actualmente: IA aplicada y automatización de procesos.'
  ];

  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          badgeText="Sobre mí"
          title={'Soy Islam, desarrollador <span class="grad-main">full-stack</span> orientado a automatización y datos.'}
          subtitle="Construyo productos rápidos, medibles y listos para negocio. React/Next · FastAPI · SQL Server/PostgreSQL · ETL e IA aplicada."
          ctaHref="/#proyectos"
          ctaLabel="Ver proyectos ›"
        />

        {/* Señales de credibilidad */}
        <section className="section" style={{ paddingTop: 0 }}>
          <Container>
            <h2
              className="display"
              style={{ fontSize: '1.75rem', fontWeight: 700, lineHeight: 1.2, marginBottom: '1rem' }}
            >
              Señales de impacto
            </h2>

            <div
              style={{
                display: 'grid',
                gap: '1rem',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))'
              }}
            >
              {signals.map((t) => (
                <div
                  key={t}
                  className="card-3d"
                  style={{
                    padding: '1rem',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '1rem'
                  }}
                >
                  <p style={{ margin: 0, fontSize: '0.98rem', lineHeight: 1.6 }}>{t}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Timeline breve */}
        <section className="section" style={{ paddingTop: '1.5rem' }}>
          <Container>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>Timeline</h2>

            {/* Dos columnas: año a la izquierda, detalle a la derecha */}
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div
                className="card"
                style={{
                  padding: '0.9rem 1rem',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '0.75rem'
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '0.75rem' }}>
                  <strong>2025</strong>
                  <p style={{ margin: 0 }}>
                    Excel→SQL, FocusTogether, migraciones SINA; profundizando en IA aplicada.
                  </p>
                </div>
              </div>

              <div
                className="card"
                style={{
                  padding: '0.9rem 1rem',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '0.75rem'
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '0.75rem' }}>
                  <strong>2024</strong>
                  <p style={{ margin: 0 }}>
                    Automatización y ETL en entornos internos; foco en rendimiento front y DX.
                  </p>
                </div>
              </div>

              <div
                className="card"
                style={{
                  padding: '0.9rem 1rem',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '0.75rem'
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '0.75rem' }}>
                  <strong>Antes</strong>
                  <p style={{ margin: 0 }}>
                    Base sólida en React, APIs con Python (FastAPI) y SQL. Empuje en datos e
                    integraciones.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* CTA secundaria */}
        <section className="section" style={{ paddingTop: 0 }}>
          <Container>
            <div
              className="card-3d"
              style={{
                padding: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '1rem'
              }}
            >
              <div>
                <h3 style={{ margin: 0, fontWeight: 700 }}>¿Te encaja mi perfil?</h3>
                <p style={{ margin: '0.25rem 0 0', opacity: 0.85 }}>
                  Hablemos sobre cómo automatizar y medir impacto en tus procesos clave.
                </p>
                <Link href="/#contacto" className="cta-glow">Contactar ›</Link>
                <Link href="/#contacto" className="cta-glow">Contactar ›</Link>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
