import fs from 'node:fs';
import path from 'node:path';

const DIR = path.join(process.cwd(), 'src', 'content', 'projects');

function readJsonSafe(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    console.error('[projects] JSON inválido:', filePath, e?.message);
    return null;
  }
}

function normalize(p) {
  const links = (p && typeof p === 'object' && p.links && typeof p.links === 'object') ? p.links : {};
  return {
    slug: p?.slug ?? '',
    title: p?.title ?? 'Sin título',
    summary: p?.summary ?? '',
    highlights: Array.isArray(p?.highlights) ? p.highlights : [],
    stack: Array.isArray(p?.stack) ? p.stack : [],
    metric: p?.metric ?? '',
    links, // <- SIEMPRE objeto
    cover: p?.cover ?? '',
    star: p?.star ?? null,
    images: Array.isArray(p?.images) ? p.images : []
  };
}

export function getAllProjects() {
  if (!fs.existsSync(DIR)) return [];
  const files = fs.readdirSync(DIR).filter(f => f.endsWith('.json'));
  return files
    .map((f) => readJsonSafe(path.join(DIR, f)))
    .filter(Boolean)
    .map(normalize)
    .filter(p => typeof p.slug === 'string' && p.slug.trim().length > 0)
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getAllSlugs() {
  return getAllProjects().map(p => p.slug).filter(Boolean);
}

export function getProjectBySlug(slug) {
  if (typeof slug !== 'string') return null;
  return getAllProjects().find(p => p.slug === slug) || null;
}
