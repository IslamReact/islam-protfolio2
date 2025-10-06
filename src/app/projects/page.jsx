// src/app/projects/page.tsx
import Header from '@/app/components/layout/header';
import Footer from '@/app/components/layout/footer';
import ProjectsCommandDeck from '@/app/components/neo/projects/ProjectsCommandDeck';
import { getProjects } from '@/lib/projects';

export const metadata = {
  title: 'Projects · Islam El Mrabet',
  description: 'Futuristic, clean projects showcase focused on impact.',
};

export default async function ProjectsPage() {
  const items = await getProjects();

  return (
    <>
      <Header />
      <main id="main-content">
        <section aria-label="Projects Command Deck" style={{ padding: '28px 0 56px' }}>
          <div className="container-base">
            <ProjectsCommandDeck items={items} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
