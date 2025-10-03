import Header from '@/app/components/layout/header';
import Footer from '@/app/components/layout/footer';
import Container from '@/app/components/layout/container';
import PageHero from '@/app/components/features/common/PageHero';

export const metadata = {
  title: 'Uses',
  description:
    'Mi stack y setup: editor, librerías, backend, datos, infra y hardware para construir rápido y con calidad.',
  alternates: { canonical: '/uses' },
  openGraph: {
    title: 'Uses · Islam El Mrabet',
    description:
      'Herramientas que uso a diario para construir productos rápidos y estables.',
    images: [{ url: '/og-default.png', width: 1200, height: 630 }],
  },
};

// ✅ Componente Section sin TypeScript
type SectionProps = {
  title: string;
  items: string[];
};

function Section({ title, items }: SectionProps) {
  return (
    <section style={{ marginTop: '2.5rem' }}>
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          marginBottom: '1rem',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          paddingBottom: '0.4rem',
        }}
      >
        {title}
      </h2>
      <div style={{ display: 'grid', gap: '0.75rem', marginTop: '0.75rem' }}>
        {items.map((t) => (
          <div
            key={t}
            className="card-3d"
            style={{
              padding: '0.9rem 1rem',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '0.75rem',
            }}
          >
            <p style={{ margin: 0, opacity: 0.9 }}>{t}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function UsesPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          badgeText="Stack & Setup"
          title={'Mis <span class="grad-main">herramientas</span> de trabajo diarias'}
          subtitle="Editor, terminal, librerías, backend, datos, infraestructura y hardware con los que soy más rápido y fiable."
          ctaHref="/#contacto"
          ctaLabel="¿Hablamos? ›"
        />

        <div className="section" style={{ paddingTop: '3.5rem' }}>
          <Container>
            <h1
              className="display"
              style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}
            >
              Uses
            </h1>
            <p
              style={{
                marginTop: '0.5rem',
                maxWidth: 820,
                opacity: 0.9,
                fontSize: '1.1rem',
                lineHeight: 1.6,
              }}
            >
              Herramientas que uso a diario para construir y mantener proyectos rápidos,
              escalables y con impacto real en negocio.
            </p>

            <Section
              title="Editor & Terminal"
              items={[
                'VS Code (Extensiones: ESLint, Prettier, Icons, GitLens)',
                'Terminal: zsh/PowerShell + nvm',
                'WSL (si uso Windows) para entorno UNIX',
              ]}
            />
            <Section
              title="Frontend"
              items={[
                'React + Next.js (App Router)',
                'Tailwind en JSX (sin @apply)',
                'Framer Motion para animaciones suaves',
              ]}
            />
            <Section
              title="Backend"
              items={[
                'FastAPI (Python) para APIs ligeras',
                'NestJS para estructuras enterprise',
                'Autenticación con JWT o NextAuth',
              ]}
            />
            <Section
              title="Datos"
              items={[
                'PostgreSQL y SQL Server',
                'ETL: scripts Python/SQL con validaciones IF NOT EXISTS',
                'Prisma u otro ORM según el caso',
              ]}
            />
            <Section
              title="Infra & Deploy"
              items={[
                'Vercel para front/SSR/edge',
                'GitHub Actions para CI/CD',
                'Netlify o Cloudflare Pages (estáticos)',
              ]}
            />
            <Section
              title="Diseño & Productividad"
              items={[
                'Figma para wireframes rápidos',
                'Plausible o Umami para analítica ligera',
                'Linear o Trello para gestión de tareas',
              ]}
            />
            <Section
              title="Hardware"
              items={[
                'Portátil con 16GB+ RAM y SSD NVMe',
                'Monitor externo 27" 1440p',
                'Teclado mecánico silencioso',
              ]}
            />
          </Container>
        </div>
      </main>
      <Footer />
    </>
  );
}
