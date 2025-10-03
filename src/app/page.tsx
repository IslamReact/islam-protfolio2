import Header from '@/app/components/layout/header';
import Footer from '@/app/components/layout/footer';
import Hero from '@/app/components/features/home/Hero';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        {/* Próximas secciones: señales, proyectos, contacto… (las añadiremos en siguientes partes) */}
      </main>
      <Footer />
    </>
  );
}