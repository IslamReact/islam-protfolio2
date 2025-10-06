// src/lib/uses.ts
import fs from 'fs/promises';
import path from 'path';

export type UseCategory =
  | 'Hardware' | 'Desk' | 'Editor' | 'Terminal' | 'Frontend' | 'Backend'
  | 'Datos/SQL' | 'AI' | 'Design' | 'Productivity' | 'Recording' | 'Browser' | 'Other';

export type UseItem = {
  slug: string;
  name: string;
  description: string;
  category: UseCategory;
  link?: string;
  tags?: string[];
  badge?: string;
  snippet?: string;
  icon?: string; // emoji o ruta a /public
  year?: number | string;
};

const ORDER: UseCategory[] = [
  'Hardware','Desk','Editor','Terminal','Frontend','Backend','Datos/SQL',
  'AI','Design','Productivity','Recording','Browser','Other'
];

const DEFAULT_USES: UseItem[] = [
  { slug:'vscode', name:'VS Code', description:'Editor principal.', category:'Editor',}
];

export async function getUses(): Promise<UseItem[]> {
  const root = process.cwd();
  const singlePath = path.join(root, 'src', 'content', 'uses' , 'uses.json');
  const dirPath    = path.join(root, 'src', 'content', 'uses');

  // 1) intenta único JSON
  const single = await readSingleJson(singlePath);
  if (single.length) return sortUses(single);

  // 2) intenta carpeta con múltiples JSON
  const multi = await readDirJsons(dirPath);
  if (multi.length) return sortUses(multi);

  // 3) fallback
  return sortUses(DEFAULT_USES);
}

/* ---------- Helpers ---------- */

async function readSingleJson(filePath: string): Promise<UseItem[]> {
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    const json = JSON.parse(raw);
    const arr = Array.isArray(json)
      ? json
      : Array.isArray(json.items) ? json.items
      : Array.isArray(json.data)  ? json.data
      : Array.isArray(json.uses)  ? json.uses
      : [];
    return normalizeMany(arr);
  } catch {
    return [];
  }
}

async function readDirJsons(dirPath: string): Promise<UseItem[]> {
  try {
    const stat = await fs.stat(dirPath).catch(() => null);
    if (!stat?.isDirectory()) return [];
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    const files = entries.filter(e => e.isFile() && e.name.endsWith('.json'));
    const items: UseItem[] = [];
    for (const f of files) {
      try {
        const raw = await fs.readFile(path.join(dirPath, f.name), 'utf8');
        const json = JSON.parse(raw);
        const merged = { slug: f.name.replace(/\.json$/i,''), ...json };
        const item = normalizeUse(merged);
        if (item) items.push(item);
      } catch {
        // ignora archivo corrupto
      }
    }
    return items;
  } catch {
    return [];
  }
}

function normalizeMany(arr: unknown[]): UseItem[] {
  const out: UseItem[] = [];
  for (const it of arr) {
    const n = normalizeUse(it);
    if (n) out.push(n);
  }
  return out;
}

function normalizeUse(u: unknown): UseItem | null {
  if (!u || typeof u !== 'object') return null;

  // Type guard for object with string keys
  const obj = u as Record<string, unknown>;

  let slug = safeString(obj.slug);
  let name = safeString(obj.name);

  // Deriva slug si falta
  if (!slug && name) slug = toSlug(name);
  // Deriva name si falta
  if (!name && slug) name = toTitle(slug);

  if (!slug && !name) return null; // inválido: no hay nada util

  const category = (obj.category as UseCategory) ?? 'Other';

  return {
    slug,
    name,
    description: safeString(obj.description),
    category,
    link: obj.link ? String(obj.link) : undefined,
    tags: Array.isArray(obj.tags) ? obj.tags.map((t) => String(t)) : [],
    badge: obj.badge ? String(obj.badge) : undefined,
    snippet: obj.snippet ? String(obj.snippet) : undefined,
    icon: obj.icon ? String(obj.icon) : undefined,
    year: typeof obj.year === 'string' || typeof obj.year === 'number' ? obj.year : undefined,
  };
}

function safeString(v: unknown): string {
  return typeof v === 'string' ? v : '';
}

function toSlug(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'') // acentos fuera
    .replace(/[^a-z0-9]+/g,'-')
    .replace(/(^-|-$)/g,'');
}

function toTitle(slug: string): string {
  return slug
    .replace(/[-_]+/g,' ')
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

function sortUses(items: UseItem[]) {
  return items.sort((a, b) => {
    const ca = ORDER.indexOf(a.category ?? 'Other');
    const cb = ORDER.indexOf(b.category ?? 'Other');
    if (ca !== cb) return ca - cb;
    const y = (Number(b.year) || 0) - (Number(a.year) || 0);
    if (y !== 0) return y;
    return a.name.localeCompare(b.name);
  });
}
