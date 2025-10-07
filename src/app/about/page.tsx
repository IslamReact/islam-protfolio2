import Header from '@/app/components/layout/header';
import Footer from '@/app/components/layout/footer';
import { getAbout } from '@/lib/about';
import { getExperience } from '@/././lib/experiencie';
import AboutHero from '@/app/components/neo/about/AboutHero';
import SkillsPulse from '@/app/components/neo/about/SkillsPulse';
import AboutFactsCompact from '@/app/components/neo/about/AboutFactsCompact';
import AboutBioCompact from '@/app/components/neo/about/AboutBioCompact';
import HighlightsGrid from '@/app/components/neo/about/HightlightsGrid';
import TimelineIA from '@/app/components/neo/TimelineIA';
import ExperienceTeaser from '@/app/components/neo/experience/ExperienceTeaser';

export const metadata = {
  title: 'Sobre mí · Islam El Mrabet',
  description: 'Quién soy, cómo trabajo y en qué creo.'
};

export default async function AboutPage() {
  const about = await getAbout();
  const { items: xp } = await getExperience();

  return (
    <>
      <Header />
      <main id="main-content">
        {/* HERO */}
        <section style={{ padding: '28px 0 18px' }}>
          <div className="container-base">
            <AboutHero about={about} />
          </div>
        </section>

        {/* FACTS + BIO */}
        <section aria-label="Bio" style={{ padding: '10px 0 26px' }}>
          <div className="container-base about-two-col">
            <AboutFactsCompact facts={about.facts || {}} />
            <AboutBioCompact bio={about.bio || []} />
          </div>
        </section>

        {/* SKILLS */}
        <section aria-label="Skills" style={{ padding: '6px 0 26px' }}>
          <div className="container-base">
            <SkillsPulse core={about.skills?.core ?? []} tools={about.skills?.tools ?? []} />
          </div>
        </section>

        {/* EXPERIENCIA (teaser dentro de Sobre mí) */}
        <section aria-label="Experiencia" style={{ padding: '6px 0 26px' }}>
          <div className="container-base">
            <ExperienceTeaser items={xp} limit={3} />
          </div>
        </section>

        {/* Timeline narrativo como versiones de un sistema IA */}
        <section aria-label="Timeline IA" style={{ padding: '24px 0' }}>
          <div className="container-base">
            <TimelineIA />
          </div>
        </section>

        {/* CTA final */}
        <section style={{ padding: '0 0 56px' }}>
          <div className="container-base">
            <div className="neon-card" style={{ padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
              <div>
                <div style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: 12, color: 'rgba(6,182,212,.85)' }}>
                  Ready to build?
                </div>
                <h3 style={{ fontWeight: 800, fontSize: 20 }}>Ve mis <span className="grad-main">proyectos</span> o cuéntame tu idea</h3>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <a href="/projects" className="btn-primary">Ver proyectos</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Responsive limpio (sin selectores raros) */}
      <style>{`
        .about-two-col{
          display:grid; gap:14px; grid-template-columns:1.1fr .9fr;
        }
        @media (max-width:1100px){
          .about-two-col{ grid-template-columns:1fr; }
        }
      `}</style>
    </>
  );
}