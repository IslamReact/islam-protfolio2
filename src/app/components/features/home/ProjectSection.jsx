import ProjectGrid from '@/app/components/features/projects/ProjectGrid';

export default function ProjectsSection() {
  return (
    <section id="proyectos" style={{ padding: '4rem 0' }}>
      <div className="container-base">
        <h2 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '2rem' }}>
          Proyectos destacados
        </h2>
        <ProjectGrid />
      </div>
    </section>
  );
}
