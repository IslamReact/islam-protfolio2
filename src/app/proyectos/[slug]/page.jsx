import Image from 'next/image';
import Link from 'next/link';
import Header from '@/app/components/layout/header';
import Footer from '@/app/components/layout/footer';
import Container from '@/app/components/layout/container';
import { getAllSlugs, getProjectBySlug } from '@/lib/projects';
import PageHero from '@/app/components/features/common/PageHero';
import site from '@/app/config/site';

// Pre-render estático: genera las rutas
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

// SEO dinámico por proyecto
export function generateMetadata({ params }) {
  const p = getProjectBySlug(params.slug);
  if (!p) {
    return {
      title: 'Proyecto no encontrado',
      alternates: { canonical: `/proyectos/${params.slug}` },
    };
  }

  const title = `${p.title} – Proyecto`;
  const description = p.summary || 'Proyecto';
  const og = `/api/og?title=${encodeURIComponent(p.title)}&desc=${encodeURIComponent(
    description
  )}`;

  return {
    title,
    description,
    alternates: { canonical: `/proyectos/${p.slug}` },
    openGraph: {
      title,
      description,
      images: [{ url: p.cover || og, width: 1200, height: 630, alt: p.title }],
      type: 'article',
    },
    twitter: { card: 'summary_large_image', images: [p.cover || og] },
  };
}

export default function ProjectPage({ params }) {
  const p = getProjectBySlug(params.slug);

  // 🔴 NOT FOUND: no usar p.* aquí
  if (!p) {
    return (
      <>
        <Header />
        <main id="main-content">
          <PageHero
            badgeText="Proyecto"
            title={'Proyecto <span class="grad-main">no encontrado</span>'}
            subtitle="El recurso que buscas no existe o fue movido."
            ctaHref="/"
            ctaLabel="Volver al inicio ›"
            rightPlaceholder={false}
          />
          <section className="section" style={{ paddingTop: 0 }}>
            <Container>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 600 }}>Proyecto no encontrado</h1>
              <p style={{ marginTop: '0.5rem' }}>
                <Link href="/">Volver al inicio</Link>
              </p>
            </Container>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  // ✅ Proyecto encontrado
  const titleHtml = p.title; // seguro (no metemos etiquetas)
  return (
    <>
      <Header />
      <main id="main-content">
        {/* Hero del proyecto (consistente) */}
        <PageHero
          badgeText="Proyecto"
          title={titleHtml}
          subtitle={p.summary || ''}
          ctaHref={p.links?.demo || p.links?.code || '/#contacto'}
          ctaLabel={p.links?.demo ? 'Ver demo ›' : p.links?.code ? 'Ver código ›' : 'Contactar ›'}
          rightPlaceholder={true}
        />

        {/* Imagen cover */}
        {p.cover && (
          <section style={{ paddingBottom: '2rem' }}>
            <Container>
              <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <Image
                  src={p.cover}
                  alt={p.title}
                  width={1600}
                  height={900}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  sizes="(min-width: 1024px) 1024px, 100vw"
                  priority
                />
              </div>
            </Container>
          </section>
        )}

        {/* Meta: stack + métrica */}
        {(Array.isArray(p.stack) && p.stack.length > 0) || p.metric ? (
          <section className="section" style={{ paddingTop: 0 }}>
            <Container>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  marginTop: '0.75rem',
                  opacity: 0.85,
                }}
              >
                {Array.isArray(p.stack) &&
                  p.stack.map((s) => (
                    <span key={s} className="kbd">
                      {s}
                    </span>
                  ))}
                {p.metric && <span className="kbd">{p.metric}</span>}
              </div>

              {/* enlaces */}
              {(p.links?.demo || p.links?.code) && (
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem' }}>
                  {p.links?.demo && (
                    <Link className="underline" href={p.links.demo}>
                      Demo
                    </Link>
                  )}
                  {p.links?.code && (
                    <Link className="underline" href={p.links.code}>
                      Código
                    </Link>
                  )}
                </div>
              )}
            </Container>
          </section>
        ) : null}

        {/* STAR */}
        {p.star && (
          <section className="section">
            <Container>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>
                Caso (método STAR)
              </h2>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div className="card">
                  <strong>Situación:</strong>
                  <p style={{ margin: '0.5rem 0 0' }}>{p.star.s}</p>
                </div>
                <div className="card">
                  <strong>Tarea:</strong>
                  <p style={{ margin: '0.5rem 0 0' }}>{p.star.t}</p>
                </div>
                <div className="card">
                  <strong>Acción:</strong>
                  <p style={{ margin: '0.5rem 0 0' }}>{p.star.a}</p>
                </div>
                <div className="card">
                  <strong>Resultado:</strong>
                  <p style={{ margin: '0.5rem 0 0' }}>{p.star.r}</p>
                </div>
              </div>
            </Container>
          </section>
        )}

        {/* Galería (opcional) */}
        {Array.isArray(p.images) && p.images.length > 0 && (
          <section className="section" style={{ paddingTop: 0 }}>
            <Container>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
                Galería
              </h3>
              <div
                style={{
                  display: 'grid',
                  gap: '1rem',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                }}
              >
                {p.images.map((img) => (
                  <div key={img.src} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                    <Image
                      src={img.src}
                      alt={img.alt || p.title}
                      width={img.width || 1280}
                      height={img.height || 720}
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* JSON-LD del proyecto */}
        <ProjectJsonLd p={p} />
      </main>
      <Footer />
    </>
  );
}

function ProjectJsonLd({ p }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: p.title,
    description: p.summary,
    url: `${site.url}/proyectos/${p.slug}`,
    image: p.cover ? `${site.url}${p.cover}` : undefined,
    inLanguage: 'es-ES',
    keywords: (p.stack || []).join(', '),
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
