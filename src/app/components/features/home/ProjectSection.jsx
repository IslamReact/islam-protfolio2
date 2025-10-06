import { Suspense } from 'react';
import ProjectGrid from '@/app/components/features/projects/ProjectGrid.server';
import ProjectGridLoading from '@/app/components/features/projects/ProjectGridLoading';

export default function ProjectsSection() {
  return (
    <section
      id="proyectos"
      className="section"
      style={{
        padding: '5rem 0',
        background: 'rgba(255,255,255,0.02)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="container-base" style={{ textAlign: 'center' }}>
        <h2
          style={{
            fontSize: '2rem',
            fontWeight: 800,
            marginBottom: '0.75rem',
            letterSpacing: '-0.02em',
          }}
        >
          🚀 Proyectos destacados
        </h2>

        <p
          style={{
            fontSize: '1.05rem',
            opacity: 0.8,
            maxWidth: '700px',
            margin: '0 auto 3rem',
            lineHeight: 1.6,
          }}
        >
          Algunos de los productos que he construido con foco en automatización, rendimiento y
          resultados medibles en negocio.
        </p>

        <Suspense fallback={<ProjectGridLoading count={6} />}>
          <ProjectGrid />
        </Suspense>

        <div style={{ marginTop: '3rem' }}>
          <a
            href="/#contacto"
            className="cta-glow"
            style={{
              padding: '0.9rem 2rem',
              borderRadius: '0.75rem',
              fontSize: '1rem',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            📬 Hablemos de tu proyecto
          </a>
        </div>
      </div>
    </section>
  );
}
