import Header from '@/app/components/layout/header';
import Footer from '@/app/components/layout/footer';
import PageHero from '@/app/components/features/common/PageHero';

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          badgeText="404"
          title={'Página <span class="grad-main">no encontrada</span>'}
          subtitle="Puede que el enlace esté roto o que la página haya sido movida."
          ctaHref="/"
          ctaLabel="Volver al inicio ›"
          rightPlaceholder={false}
        />
      </main>
      <Footer />
    </>
  );
}
