import Header from '@/app/components/layout/header';
import Footer from '@/app/components/layout/footer';
import Section from '@/app/components/layout/section';
import Container from '@/app/components/layout/container';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Section id="home-section">
          <Container>
            <h1 className="text-3xl md:text-4xl font-semibold">Home base</h1>
            <p className="opacity-80 mt-2">Estructura lista. Próximo paso: Hero y secciones.</p>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
