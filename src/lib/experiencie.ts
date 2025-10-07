import fs from 'fs/promises';
import path from 'path';

export type WorkItem = {
  company: string;
  role: string;
  start: string;           // YYYY-MM
  end: string | null;      // null = actualidad
  location?: string;
  mode?: 'Presencial' | 'Híbrido' | 'Remoto' | string;
  summary?: string;
  stack?: string[];
  highlights?: string[];
  links?: { company?: string; project?: string };
  accent?: [string, string]; // degradado opcional
};

export type ExperienceData = { items: WorkItem[] };

export async function getExperience(): Promise<ExperienceData> {
  const fp = path.join(process.cwd(), 'src', 'content', 'experience.json');
  try {
    const raw = await fs.readFile(fp, 'utf8');
    const json = JSON.parse(raw) as ExperienceData;
    return normalize(json);
  } catch {
    // Fallback mínimo (por si faltan datos en local)
    return normalize({
      items: [
        {
          company: 'Lãberit',
          role: 'HIS Project Consultant',
          start: '2024-03',
          end: null,
          location: 'Valencia, España',
          mode: 'Presencial',
          summary: 'Implementation Specialist para SINA HIS: configuración, integración y optimización de flujos de datos clínicos.',
          stack: ['SQL Server', 'PostgreSQL', 'HL7', 'Mirth Connect', 'PACS', 'Integraciones'],
          highlights: [
            'Mapeos y migraciones entre ORMA_* / VITA_* y sistemas externos',
            'Queries, validaciones e índices para rendimiento',
            'Interfaces HL7 (ADT/ORM/ORU) en Mirth Connect',
            'Integración con PACS y catálogos externos',
            'Toma de requisitos y puesta en producción'
          ],
          links: { company: 'https://www.laberit.com', project: '/projects/data-migration-suite' },
          accent: ['#7c3aed', '#06b6d4']
        }
      ]
    });
  }
}

function normalize(d: ExperienceData): ExperienceData {
  const items = Array.isArray(d.items) ? d.items : [];
  return {
    items: items.map((it) => ({
      company: it.company,
      role: it.role,
      start: it.start,
      end: it.end ?? null,
      location: it.location ?? '',
      mode: it.mode ?? '',
      summary: it.summary ?? '',
      stack: it.stack ?? [],
      highlights: it.highlights ?? [],
      links: it.links ?? {},
      accent: it.accent ?? ['#7c3aed', '#06b6d4']
    }))
  };
}