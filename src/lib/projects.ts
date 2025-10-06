// src/lib/projects.ts
import fs from 'fs/promises';
import path from 'path';

export type Project = {
  slug: string;
  title: string;
  summary: string;
  year?: number | string;
  stack: string[];
  category: 'Frontend' | 'Backend' | 'Datos/SQL' | 'Mobile' | 'Sanidad';
  links?: { demo?: string; code?: string };
  cover?: string;                 // Debe apuntar a /public (p.ej. /projects/slug/cover.webp)
  accent?: [string, string];
  metrics?: { label: string; value: string }[];
};

export async function getProjects(): Promise<Project[]> {
  const dir = path.join(process.cwd(), 'src', 'content', 'projects');
  const entries = await fs.readdir(dir, { withFileTypes: true });

  // coge todos los .json
  const files = entries.filter((e) => e.isFile() && e.name.endsWith('.json'));

  const items = await Promise.all(
    files.map(async (f) => {
      const raw = await fs.readFile(path.join(dir, f.name), 'utf8');
      const data = JSON.parse(raw) as Partial<Project>;
      const slug = data.slug || f.name.replace(/\.json$/i, '');
      return {
        slug,
        title: data.title ?? slug,
        summary: data.summary ?? '',
        year: data.year,
        stack: data.stack ?? [],
        category: (data.category as Project['category']) ?? 'Frontend',
        links: data.links ?? {},
        cover: data.cover,
        accent: (data.accent as [string, string]) ?? ['#7c3aed', '#06b6d4'],
        metrics: data.metrics ?? [],
      } as Project;
    })
  );

  // Orden: año desc, luego alfabético
  return items.sort((a, b) => (Number(b.year) || 0) - (Number(a.year) || 0) || a.title.localeCompare(b.title));
}
