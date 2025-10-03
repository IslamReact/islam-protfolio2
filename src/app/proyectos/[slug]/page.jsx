import Image from 'next/image';
import Link from 'next/link';
import Header from '@/app/components/layout/header';
import Footer from '@/app/components/layout/footer';
import Container from '@/app/components/layout/container';
import { getAllSlugs, getProjectBySlug } from '@/lib/projects';

// Pre-render estático: genera las rutas
export function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }));
}

// SEO dinámico por proyecto
export function generateMetadata({ params }) {
  const p = getProjectBySlug(params.slug);
  if (!p) return { title: 'Proyecto no encontrado' };
  const title = `${p.title} – Proyecto`;
  const description = p.summary || 'Proyecto';
  const images = p.cover ? [{ url: p.cover, width: 1200, height: 630, alt: p.title }] : [];
  return {
    title,
    description,
    openGraph: { title, description, images, type: 'article' },
    twitter: { card: 'summary_large_image' }
  };
}

export default function ProjectPage({ params }) {
  const p = getProjectBySlug(params.slug);
  if (!p) {
    return (
      <>
        <Header />
        <main className="section">
          <Container>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 600 }}>Proyecto no encontrado</h1>
            <p style={{ marginTop: '0.5rem' }}>
              <Link href="/">Volver al inicio</Link>
            </p>
          </Container>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        {/* Hero del proyecto */}
        <section className="section" style={{ paddingTop: '3.5rem', paddingBottom: '2rem' }}>
          <Container>
            <h1 className="display" style={{ fontSize: '2.25rem', fontWeight: 700, lineHeight: 1.1 }}>{p.title}</h1>
            <p style={{ marginTop: '0.5rem', maxWidth: 820, opacity: 0.85 }}>{p.summary}</p>

            {/* meta: stack + métrica */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.75rem', opacity: 0.85 }}>
              {Array.isArray(p.stack) && p.stack.map(s => (
                <span key={s} className="kbd">{s}</span>
              ))}
              {p.metric && <span className="kbd">{p.metric}</span>}
            </div>

            {/* enlaces */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem' }}>
              {p.links?.demo && <Link className="underline" href={p.links.demo}>Demo</Link>}
              {p.links?.code && <Link className="underline" href={p.links.code}>Código</Link>}
            </div>
          </Container>
        </section>

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
                  priority
                />
              </div>
            </Container>
          </section>
        )}

        {/* STAR */}
        {p.star && (
          <section className="section">
            <Container>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>Caso (método STAR)</h2>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div className="card"><strong>Situación:</strong><p style={{ margin: '0.5rem 0 0' }}>{p.star.s}</p></div>
                <div className="card"><strong>Tarea:</strong><p style={{ margin: '0.5rem 0 0' }}>{p.star.t}</p></div>
                <div className="card"><strong>Acción:</strong><p style={{ margin: '0.5rem 0 0' }}>{p.star.a}</p></div>
                <div className="card"><strong>Resultado:</strong><p style={{ margin: '0.5rem 0 0' }}>{p.star.r}</p></div>
              </div>
            </Container>
          </section>
        )}

        {/* Galería (opcional) */}
        {Array.isArray(p.images) && p.images.length > 0 && (
          <section className="section" style={{ paddingTop: 0 }}>
            <Container>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Galería</h3>
              <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
                {p.images.map(img => (
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
      </main>
      <Footer />
    </>
  );
}
