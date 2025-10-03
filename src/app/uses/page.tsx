import Header from '@/app/components/layout/header';
import Footer from '@/app/components/layout/footer';
import Container from '@/app/components/layout/container';
import PageHero from '@/app/components/features/common/PageHero';


export const metadata = {
  title: 'Uses | Islam El Mrabet',
  description: 'Mi setup de desarrollo: hardware, software, librerías y servicios.'
};

type SectionProps = {
  title: string;
  items: string[];
};

function Section({ title, items }: SectionProps) {
  return (
    <section style={{ marginTop: '2rem' }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{title}</h2>
      <div style={{ display: 'grid', gap: '0.75rem', marginTop: '0.75rem' }}>
        {items.map((t) => (
          <div key={t} className="card" style={{ padding: '0.8rem 1rem' }}>
            <p style={{ margin: 0 }}>{t}</p>
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
            <h1 className="display" style={{ fontSize: '2rem', fontWeight: 700 }}>Uses</h1>
            <p style={{ marginTop: '0.5rem', maxWidth: 820, opacity: 0.9 }}>
              Herramientas que uso a diario para construir y mantener proyectos rápidos y estables.
            </p>

            <Section
              title="Editor & Terminal"
              items={[
                'VS Code (Extensiones: ESLint, Prettier, Icons, GitLens)',
                'Terminal: zsh/PowerShell + nvm',
                'WSL (si Windows) para entorno UNIX'
              ]}
            />
            <Section
              title="Frontend"
              items={[
                'React + Next.js (App Router)',
                'Tailwind como utilidades en JSX (sin @apply en CSS)',
                'Framer Motion (animaciones suaves)'
              ]}
            />
            <Section
              title="Backend"
              items={[
                'FastAPI (Python) para APIs ligeras',
                'NestJS cuando necesito estructura enterprise',
                'Autenticación con JWT o NextAuth según caso'
              ]}
            />
            <Section
              title="Datos"
              items={[
                'PostgreSQL y SQL Server',
                'ETL: scripts Python/SQL y validaciones IF NOT EXISTS',
                'Prisma u ORM según proyecto'
              ]}
            />
            <Section
              title="Infra & Deploy"
              items={[
                'Vercel para front/SSR/edge',
                'GitHub Actions para CI donde toque',
                'Netlify/Cloudflare Pages (estáticos)'
              ]}
            />
            <Section
              title="Diseño & Productividad"
              items={[
                'Figma para wireframes UI rápidos',
                'Plausible/Umami para analítica ligera',
                'Linear/Trello para tareas'
              ]}
            />
            <Section
              title="Hardware"
              items={[
                'Portátil con 16GB+ RAM y SSD NVMe',
                'Monitor externo 27" 1440p',
                'Teclado mecánico silencioso'
              ]}
            />
          </Container>
        </div>
      </main>
      <Footer />
    </>
  );
}
