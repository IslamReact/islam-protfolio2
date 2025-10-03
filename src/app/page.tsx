import Header from '@/app/components/layout/header';
import Footer from '@/app/components/layout/footer';
import Hero from '@/app/components/features/home/Hero';
import ProjectsSection from '@/app/components/features/home/ProjectSection';
import AboutSection from '@/app/components/features/home/AboutSection';
import Highlights from '@/app/components/features/home/Highlights';
import ContactSection from '@/app/components/features/home/ContactSection';

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <Highlights />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}