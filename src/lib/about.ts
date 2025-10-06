// src/lib/about.ts
import fs from 'fs/promises';
import path from 'path';

export type AboutData = {
  name: string;
  title?: string;
  tagline?: string;
  avatar?: string; // p.ej. /about/avatar.jpeg
  facts?: Record<string, string>;
  bio?: string[];
  skills?: { core?: string[]; tools?: string[] };
  values?: string[];
  highlights?: { label: string; detail?: string; year?: string | number }[];
};

export async function getAbout(): Promise<AboutData> {
  const fp = path.join(process.cwd(), 'src', 'content', 'about' , 'about.json');

  // 1) leer archivo
  let raw: string;
  try {
    raw = await fs.readFile(fp, 'utf8');
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new Error(
      `about.json no encontrado en ${fp}.\n` +
      `Crea el archivo. Ejemplo mínimo:\n` +
      `{\n  "name": "Islam El Mrabet",\n  "avatar": "/about/avatar.jpeg"\n}\n` +
      `Error: ${msg}`
    );
  }

  // 2) parsear JSON
  let dataUnknown: unknown;
  try {
    dataUnknown = JSON.parse(raw) as unknown;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new Error(`about.json inválido (JSON mal formado). Error: ${msg}`);
  }

  // 3) validar/normalizar
  const about = parseAbout(dataUnknown);
  return about;
}

/* ==================== Validación segura (sin any) ==================== */

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function asString(v: unknown): string | undefined {
  return typeof v === 'string' ? v : undefined;
}

function asStringArray(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  const out: string[] = [];
  for (const x of v) if (typeof x === 'string') out.push(x);
  return out;
}

function asFacts(v: unknown): Record<string, string> {
  if (!isRecord(v)) return {};
  const out: Record<string, string> = {};
  for (const [k, val] of Object.entries(v)) {
    if (typeof val === 'string') out[k] = val;
  }
  return out;
}

function asSkills(v: unknown): { core?: string[]; tools?: string[] } {
  if (!isRecord(v)) return { core: [], tools: [] };
  return {
    core: asStringArray(v.core),
    tools: asStringArray(v.tools),
  };
}

function asHighlights(v: unknown): { label: string; detail?: string; year?: string | number }[] {
  if (!Array.isArray(v)) return [];
  const out: { label: string; detail?: string; year?: string | number }[] = [];
  for (const it of v) {
    if (!isRecord(it)) continue;
    const label = asString(it.label);
    if (!label) continue; // label es obligatorio
    const detail = asString(it.detail);
    const yearVal = it.year;
    const year =
      typeof yearVal === 'string' || typeof yearVal === 'number' ? yearVal : undefined;
    out.push({ label, detail, year });
  }
  return out;
}

function parseAbout(x: unknown): AboutData {
  if (!isRecord(x)) {
    throw new Error('about.json debe ser un objeto JSON (no un array).');
  }

  const name = asString(x.name)?.trim();
  if (!name) throw new Error('about.json: falta "name" (string).');

  const title = asString(x.title);
  const tagline = asString(x.tagline);
  const avatar = asString(x.avatar);

  const facts = asFacts(x.facts);
  const bio = asStringArray(x.bio);
  const skills = asSkills(x.skills);
  const values = asStringArray(x.values);
  const highlights = asHighlights(x.highlights);

  return {
    name,
    title,
    tagline,
    avatar,
    facts,
    bio,
    skills,
    values,
    highlights,
  };
}
