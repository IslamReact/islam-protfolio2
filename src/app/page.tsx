import Header from '@/app/components/layout/header';
import Footer from '@/app/components/layout/footer';

import FuturisticHero from '@/app/components/neo/FuturisticHero';
import SkillGraph from '@/app/components/neo/SkillGraph';
import LiveTerminal from '@/app/components/neo/LiveTerminal';
import TimelineIA from '@/app/components/neo/TimelineIA';
import PromptContact from '@/app/components/neo/PromptContact';

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content">
        {/* HERO inmersivo con partículas + typewriter */}
        <section aria-label="Hero Islam.AI">
          <FuturisticHero />
        </section>

        {/* Grafo de habilidades (IA + Datos + Front/Back) */}
        <section aria-label="SkillGraph" style={{ padding: '24px 0' }}>
          <div className="container-base">
            <SkillGraph />
          </div>
        </section>

        {/* Terminal viva de proyectos */}
        <section id="proyectos" aria-label="Proyectos en vivo" style={{ padding: '16px 0' }}>
          <div className="container-base">
            <LiveTerminal />
          </div>
        </section>

        {/* Timeline narrativo como versiones de un sistema IA */}
        <section aria-label="Timeline IA" style={{ padding: '24px 0' }}>
          <div className="container-base">
            <TimelineIA />
          </div>
        </section>

        {/* Prompt de contacto estilo chat/IA */}
        <section id="contacto" aria-label="Contacto por prompt" style={{ padding: '24px 0 56px' }}>
          <div className="container-base">
            <PromptContact />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
