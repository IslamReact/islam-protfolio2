// src/app/about/page.tsx
import Header from '@/app/components/layout/header';
import Footer from '@/app/components/layout/footer';
import { getAbout } from '@/lib/about';
import AboutHero from '@/app/components/neo/about/AboutHero';
import SkillsPulse from '@/app/components/neo/about/SkillsPulse';
import AboutFactsCompact from '@/app/components/neo/about/AboutFactsCompact';
import AboutBioCompact from '@/app/components/neo/about/AboutBioCompact';
import HighlightsGrid from '@/app/components/neo/about/HightlightsGrid';

export const metadata = {
  title: 'Sobre mí · Islam El Mrabet',
  description: 'Quién soy, cómo trabajo y en qué creo.'
};

export default async function AboutPage() {
  const about = await getAbout();

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

        {/* VALUES + HIGHLIGHTS */}
        <section aria-label="Valores y logros" style={{ padding: '6px 0 40px' }}>
          <div className="container-base about-two-col">
            {/* Valores */}
            <div className="neon-card" style={{ padding: 14 }}>
              <h2 style={{ fontWeight: 800, fontSize: 18, marginBottom: 10 }}>Valores</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {(about.values || []).map((v) => (
                  <span key={v} className="btn-ghost" style={{ padding: '8px 12px', borderRadius: 999 }}>
                    {v}
                  </span>
                ))}
              </div>
            </div>

            {/* Highlights compactos */}
            <HighlightsGrid highlights={about.highlights || []} />
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
