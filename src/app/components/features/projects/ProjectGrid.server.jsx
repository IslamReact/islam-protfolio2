import fs from 'node:fs';
import path from 'node:path';
import ProjectCardAnimated from './ProjectCardAnimated';

const DIR = path.join(process.cwd(), 'src', 'content', 'projects');

function readJsonSafe(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    console.error('[ProjectGrid] JSON inválido:', filePath, e?.message);
    return null;
  }
}

function normalize(p) {
  if (!p || typeof p !== 'object') return null;
  return {
    slug: typeof p.slug === 'string' ? p.slug : '',
    title: typeof p.title === 'string' ? p.title : 'Sin título',
    summary: typeof p.summary === 'string' ? p.summary : '',
    highlights: Array.isArray(p.highlights) ? p.highlights : [],
    stack: Array.isArray(p.stack) ? p.stack : [],
    metric: typeof p.metric === 'string' ? p.metric : '',
    links: p.links && typeof p.links === 'object' ? p.links : {},
    cover: typeof p.cover === 'string' ? p.cover : '',
    star: p.star ?? null,
    images: Array.isArray(p.images) ? p.images : [],
  };
}

function getProjects() {
  if (!fs.existsSync(DIR)) {
    console.warn('[ProjectGrid] 📁 No existe la carpeta:', DIR);
    return [];
  }
  const files = fs.readdirSync(DIR).filter((f) => f.endsWith('.json'));
  const list = files
    .map((f) => readJsonSafe(path.join(DIR, f)))
    .filter(Boolean)
    .map(normalize)
    .filter(Boolean)
    .filter((p) => p.slug.trim().length > 0)
    .sort((a, b) => a.title.localeCompare(b.title));

  console.log('📁 Projects cargados:', list.length);
  return list;
}

export default function ProjectGrid() {
  const projects = getProjects();

  if (projects.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', opacity: 0.8 }}>
        <p>⚠️ No se encontraron proyectos en <code>src/content/projects/</code>.</p>
      </div>
    );
  }

  // 🔍 Lista simple SIEMPRE visible para diagnóstico
  return (
    <>
      {/* Grid real con tarjetas */}
      <div style={{ display: 'grid', gap: '1.5rem' }} className="sm:grid-cols-2 lg:grid-cols-3 grid">
        {projects.map((p, i) => (
          <ProjectCardAnimated key={(p.slug || p.title || i) + i} p={p} index={i} />
        ))}
      </div>
    </>
  );
}
