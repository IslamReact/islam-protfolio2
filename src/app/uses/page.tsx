// src/app/uses/page.tsx
import Header from '@/app/components/layout/header';
import Footer from '@/app/components/layout/footer';
import UsesLoadout from '@/app/components/neo/uses/usesLoadout';
import { getUses } from '@/lib/uses';

export const metadata = {
  title: 'Uses · Islam El Mrabet',
  description: 'Mi loadout: hardware, software, AI y flujo de trabajo.',
};

export default async function UsesPage() {
  const items = await getUses(); // lee de src/content/uses/*.json o usa fallback

  return (
    <>
      <Header />
      <main id="main-content">
        <section aria-label="Uses Loadout" style={{ padding: '28px 0 56px' }}>
          <div className="container-base">
            <UsesLoadout items={items} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
