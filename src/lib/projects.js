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

export function getAllProjects() {
  if (!fs.existsSync(DIR)) {
    console.warn('[projects] Carpeta no encontrada:', DIR);
    return [];
  }
  const files = fs.readdirSync(DIR).filter(f => f.endsWith('.json'));
  const list = files
    .map((f) => readJsonSafe(path.join(DIR, f)))
    .filter(Boolean)
    .filter(p => typeof p.slug === 'string' && p.slug.trim().length > 0); // << valida slug
  return list.sort((a, b) => a.title.localeCompare(b.title));
}

export function getAllSlugs() {
  return getAllProjects()
    .map(p => p.slug)
    .filter(s => typeof s === 'string' && s.trim().length > 0); // << sólo strings
}

export function getProjectBySlug(slug) {
  if (typeof slug !== 'string') return null;
  return getAllProjects().find(p => p.slug === slug) || null;
}
