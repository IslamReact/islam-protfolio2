// src/lib/gear.ts
import fs from 'fs/promises';
import path from 'path';

export type GearCategory =
  | 'Monitor' | 'Laptop' | 'Keyboard' | 'Mouse' | 'Dock' | 'Microphone' | 'Pad' | 'Accessory';

export type Usage = 'Daily' | 'Secondary' | 'Backup';

export type GearItem = {
  slug: string;
  name: string;
  brand?: string;
  model?: string;
  category: GearCategory;
  icon?: string;   // emoji o /ruta en public
  image?: string;  // /gear/...
  usage?: Usage;
  specs?: Record<string, string | number | boolean>;
  link?: string;
  notes?: string;
};

export async function getGear(): Promise<GearItem[]> {
  const fp = path.join(process.cwd(), 'src', 'content', 'gear' ,'gear.json');

  const raw = await fs.readFile(fp, 'utf8').catch((err: unknown) => {
    const msg = err instanceof Error ? err.message : String(err);
    throw new Error(`gear.json no encontrado en ${fp}. Error: ${msg}`);
  });

  const dataUnknown: unknown = JSON.parse(raw);
  if (!Array.isArray(dataUnknown)) {
    throw new Error('gear.json debe ser un array de items.');
  }

  const items: GearItem[] = [];
  for (const it of dataUnknown) {
    const parsed = parseGearItem(it);
    items.push(parsed);
  }

  return sortGear(items);
}

/* ---------------- helpers ---------------- */
function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}
function asString(v: unknown): string | undefined {
  return typeof v === 'string' ? v : undefined;
}
function asBool(v: unknown): boolean | undefined {
  return typeof v === 'boolean' ? v : undefined;
}
function asNumber(v: unknown): number | undefined {
  return typeof v === 'number' ? v : undefined;
}
function asSpecs(v: unknown): Record<string, string | number | boolean> | undefined {
  if (!isRecord(v)) return undefined;
  const out: Record<string, string | number | boolean> = {};
  for (const [k, val] of Object.entries(v)) {
    if (typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean') {
      out[k] = val;
    }
  }
  return out;
}
const CATS: GearCategory[] = ['Monitor','Laptop','Keyboard','Mouse','Dock','Microphone','Pad','Accessory'];
function asCategory(v: unknown): GearCategory {
  const s = asString(v) ?? '';
  if (CATS.includes(s as GearCategory)) return s as GearCategory;
  throw new Error(`Categoría inválida "${s}". Usa una de: ${CATS.join(', ')}`);
}
const USAGES: Usage[] = ['Daily','Secondary','Backup'];
function asUsage(v: unknown): Usage | undefined {
  const s = asString(v);
  if (!s) return undefined;
  if (USAGES.includes(s as Usage)) return s as Usage;
  throw new Error(`Uso inválido "${s}". Usa: ${USAGES.join(', ')}`);
}

function parseGearItem(x: unknown): GearItem {
  if (!isRecord(x)) throw new Error('Cada item debe ser un objeto.');
  const slug = (asString(x.slug) ?? '').trim();
  const name = (asString(x.name) ?? '').trim();
  if (!slug) throw new Error('Item sin "slug".');
  if (!name) throw new Error(`Item "${slug}" sin "name".`);

  return {
    slug,
    name,
    brand: asString(x.brand),
    model: asString(x.model),
    category: asCategory(x.category),
    icon: asString(x.icon),
    image: asString(x.image),
    usage: asUsage(x.usage),
    specs: asSpecs(x.specs),
    link: asString(x.link),
    notes: asString(x.notes),
  };
}

function sortGear(items: GearItem[]): GearItem[] {
  const order: GearCategory[] = ['Laptop','Monitor','Keyboard','Mouse','Dock','Microphone','Pad','Accessory'];
  const usageWeight: Record<Usage, number> = { Daily: 0, Secondary: 1, Backup: 2 };
  return [...items].sort((a, b) => {
    const ca = order.indexOf(a.category);
    const cb = order.indexOf(b.category);
    if (ca !== cb) return ca - cb;
    const ua = a.usage ? usageWeight[a.usage] : 9;
    const ub = b.usage ? usageWeight[b.usage] : 9;
    if (ua !== ub) return ua - ub;
    return a.name.localeCompare(b.name);
  });
}