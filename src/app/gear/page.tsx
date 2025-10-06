// src/app/gear/page.tsx
import Header from '@/app/components/layout/header';
import Footer from '@/app/components/layout/footer';
import { getGear } from '@/lib/gear';
import GearShowcase from '@/app/components/neo/gear/GearShowcase';

export const metadata = {
  title: 'Tech Gear · Islam El Mrabet',
  description: 'Mi setup de gadgets y equipo diario.'
};

export default async function GearPage() {
  const items = await getGear();
  return (
    <>
      <Header />
      <main id="main-content">
        <section aria-label="Tech Gear" className="container-base">
          <GearShowcase items={items} />
        </section>
      </main>
      <Footer />
    </>
  );
}