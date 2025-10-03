import fs from 'node:fs';
import path from 'node:path';
import Link from 'next/link';
import ProjectCardAnimated from './ProjectCardAnimated';

function getProjects() {
  const dir = path.join(process.cwd(), 'src', 'content', 'projects');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
  const list = files.map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8')));
  return list.sort((a, b) => a.title.localeCompare(b.title));
}

export default function ProjectGrid() {
  const projects = getProjects();
  return (
    <div
      style={{ display: 'grid', gap: '1.5rem' }}
      className="sm:grid-cols-2 lg:grid-cols-3 grid"
    >
      {projects.map((p, i) => (
        <Link key={p.slug} href={`/proyectos/${p.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <ProjectCardAnimated p={p} index={i} />
        </Link>
      ))}
    </div>
  );
}
