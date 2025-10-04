'use client';
import { useEffect } from 'react';
import Header from '@/app/components/layout/header';
import Footer from '@/app/components/layout/footer';
import PageHero from '@/app/components/features/common/PageHero';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error('[App Error]', error);
  }, [error]);

  return (
    <html lang="es">
      <body>
        <Header />
        <main id="main-content">
          <PageHero
            badgeText="500"
            title={'Algo <span class="grad-main">salió mal</span>'}
            subtitle="Hemos registrado el error. Puedes intentar recargar o volver al inicio."
            ctaHref="/"
            ctaLabel="Volver al inicio ›"
            rightPlaceholder={false}
          />
          <div className="container-base" style={{ paddingBottom: '2rem' }}>
            <button className="cta-glow" onClick={() => reset?.()}>
              Reintentar
            </button>
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
