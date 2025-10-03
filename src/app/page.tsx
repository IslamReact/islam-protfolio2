import Header from '@/app/components/layout/header';
import Footer from '@/app/components/layout/footer';
import Hero from '@/app/components/features/home/Hero';
import ProjectsSection from '@/app/components/features/home/ProjectSection';
import AboutSection from '@/app/components/features/home/AboutSection';
import ContactSection from '@/app/components/features/home/ContactSection';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}