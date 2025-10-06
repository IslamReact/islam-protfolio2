// src/app/components/neo/LiveTerminal.tsx
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export type CommandProject = {
  slug: string;
  title: string;
  aliases?: string[];
};

type Props = {
  /** Pásame tus proyectos ya cargados (slug + title). */
  projects?: CommandProject[];
  /** Texto del placeholder en la línea de comandos. */
  placeholder?: string;
};

export default function LiveTerminal({
  projects = [],
  placeholder = 'open <proyecto>   ·   search <texto>   ·   help',
}: Props) {
  const router = useRouter();

  /** ------- Estado de salida (logs) ------- */
  const [output, setOutput] = useState<string[]>([]);
  const bootIndex = useRef(0);
  const boxRef = useRef<HTMLDivElement | null>(null);

  /** ------- Línea de comando ------- */
  const [cmd, setCmd] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const histIdx = useRef<number>(-1);

  /** ------- Sugerencias (en vivo) ------- */
  const suggestions = useMemo(() => {
    const q = cmd.trim().toLowerCase();
    if (!q) return projects.slice(0, 5);
    return rank(projects, q).slice(0, 7);
  }, [projects, cmd]);

  /** ------- Boot animado (como el original) ------- */
  useEffect(() => {
    const LINES = makeBootLines(projects);
    const id = setInterval(() => {
      setOutput((prev) => {
        const next = [...prev, LINES[bootIndex.current]];
        bootIndex.current = Math.min(bootIndex.current + 1, LINES.length - 1);
        return next;
      });
      if (bootIndex.current >= LINES.length - 1) clearInterval(id);
    }, 450);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Auto-scroll al final cuando hay nuevas líneas */
  useEffect(() => {
    boxRef.current?.scrollTo({ top: 9_999_999, behavior: 'smooth' });
  }, [output]);

  /** Acceso rápido para enfocar el comando: ⌘/Ctrl + L */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        (document.getElementById('terminal-input') as HTMLInputElement | null)?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /** ------- Ejecución de comandos ------- */
  function run(raw: string) {
    const line = raw.trim();
    if (!line) return;

    // añade a historial
    setHistory((h) => [...h, line]);
    histIdx.current = -1;

    // log de entrada
    pushOut(`$ ${line}`);

    // comandos
    if (line === 'help' || line === '?') {
      pushOut('help> comandos: open <slug|título>, search <texto>, ls, projects, about, uses, contact');
      return;
    }

    if (line === 'ls') {
      const list = projects.map((p) => p.slug).join('  ');
      pushOut(list || '(sin proyectos)');
      return;
    }

    if (line === 'projects') {
      router.push('/projects');
      pushOut('→ /projects');
      return;
    }
    if (line === 'about') {
      router.push('/about');
      pushOut('→ /about');
      return;
    }
    if (line === 'uses') {
      router.push('/uses');
      pushOut('→ /uses');
      return;
    }
    if (line === 'contact' || line === 'contacto') {
      router.push('/#contacto');
      pushOut('→ /#contacto');
      return;
    }

    // search
    if (line.startsWith('search ')) {
      const q = line.slice(7).trim();
      if (q) {
        router.push(`/projects?q=${encodeURIComponent(q)}`);
        pushOut(`→ search "${q}" en /projects`);
      }
      return;
    }

    // open
    if (line.startsWith('open ')) {
      const term = line.slice(5).trim().toLowerCase();
      const best = rank(projects, term)[0];
      if (best) {
        openProject(best);
      } else {
        pushOut('not found');
      }
      return;
    }

    // sin prefijo: intenta abrir por match; si no, busca
    const best = rank(projects, line.toLowerCase())[0];
    if (best) {
      openProject(best);
      return;
    }
    router.push(`/projects?q=${encodeURIComponent(line)}`);
    pushOut(`→ search "${line}" en /projects`);
  }

  function openProject(p: CommandProject) {
    router.push(`/projects#${encodeURIComponent(p.slug)}`);
    pushOut(`→ open ${p.slug}`);
  }

  function pushOut(line: string) {
    setOutput((prev) => [...prev, line]);
  }

  /** ------- Gestión de teclado en input ------- */
  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = cmd;
      setCmd('');
      run(value);
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length) {
        if (histIdx.current === -1) histIdx.current = history.length - 1;
        else histIdx.current = Math.max(0, histIdx.current - 1);
        setCmd(history[histIdx.current] ?? '');
      }
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (history.length) {
        if (histIdx.current === -1) return;
        histIdx.current = Math.min(history.length - 1, histIdx.current + 1);
        setCmd(history[histIdx.current] ?? '');
      }
      return;
    }
    if (e.key === 'Tab') {
      // autocompletar con la mejor sugerencia
      e.preventDefault();
      const best = suggestions[0];
      if (!best) return;
      // si el usuario empezó con "open " mantenemos eso
      const trimmed = cmd.trimStart();
      const hasOpen = /^open\s+/i.test(trimmed);
      setCmd(hasOpen ? `open ${best.slug}` : best.slug);
    }
  }

  return (
    <div className="neon-card" style={{ padding: 12 }}>
      {/* Header ventana */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <span style={{ width: 8, height: 8, borderRadius: 999, background: 'rgb(244,63,94)' }} />
        <span style={{ width: 8, height: 8, borderRadius: 999, background: 'rgb(250,204,21)' }} />
        <span style={{ width: 8, height: 8, borderRadius: 999, background: 'rgb(34,197,94)' }} />
        <span style={{ marginLeft: 8, fontWeight: 700 }}>Terminal · proyectos</span>
        <span style={{ marginLeft: 'auto', fontSize: 12, color: 'rgba(var(--text),.65)' }}>
          ⌘/Ctrl + L para enfocar · Enter ejecuta
        </span>
      </div>

      {/* Salida */}
      <div
        ref={boxRef}
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(var(--text), 0.08)',
          borderRadius: 10,
          padding: 12,
          height: 200,
          overflow: 'auto',
          fontFamily:
            'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          fontSize: 13,
          color: 'rgba(255,255,255,0.92)',
          display: 'grid',
          alignContent: 'start',
          gap: 4,
        }}
      >
        {output.map((line, idx) => (
          <div key={idx}>
            <span style={{ color: 'rgb(6,182,212)' }}>$</span>{' '}
            <span style={{ whiteSpace: 'pre-wrap' }}>{line}</span>
          </div>
        ))}
      </div>

      {/* Línea de comandos */}
      <div
        style={{
          marginTop: 8,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          border: '1px solid rgba(var(--text), 0.08)',
          background: 'rgba(255,255,255,0.03)',
          borderRadius: 10,
          padding: '8px 10px',
          fontFamily:
            'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        }}
      >
        <span style={{ color: 'rgb(6,182,212)', fontWeight: 700 }}>$</span>
        <input
          id="terminal-input"
          value={cmd}
          onChange={(e) => setCmd(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          aria-label="Línea de comandos"
          style={{
            flex: 1,
            background: 'transparent',
            border: 0,
            outline: 'none',
            color: 'inherit',
            fontSize: 13,
          }}
        />
      </div>

      {/* Sugerencias rápidas debajo del prompt */}
      {suggestions.length > 0 && (
        <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {suggestions.map((s) => (
            <button
              key={s.slug}
              onClick={() => openProject(s)}
              className="btn-ghost"
              title={`Abrir ${s.title}`}
              style={{ padding: '6px 10px', fontFamily: 'inherit', fontSize: 12 }}
            >
              <strong>{s.title}</strong>&nbsp;<code style={{ opacity: 0.8 }}>{s.slug}</code>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ===================== Utils ===================== */

function makeBootLines(projects: CommandProject[]): string[] {
  const picks = projects.slice(0, 4);
  const lines: string[] = [
    'boot> initializing projects…',
    ...picks.map((p) => `ok   ${p.title}: #${p.slug}`),
    'tip  escribe: open <slug> · ls · search <texto> · help',
  ];
  // fallback si no hay proyectos
  if (!picks.length) {
    lines.splice(1, 0,
      'ok   Excel→SQL: multi-dialecto (PG · SQL Server · MySQL)',
      'ok   FocusTogether: rooms + pomodoro + métricas',
      'ok   CookConnect POS: Android · tickets · mesas',
      'ok   SINA automations: beneficios · horarios · vitales',
    );
  }
  return lines;
}

function rank(arr: CommandProject[], q: string): CommandProject[] {
  const s = q.toLowerCase();
  return [...arr].sort((a, b) => score(b, s) - score(a, s));
}
function score(p: CommandProject, s: string): number {
  const slug = p.slug.toLowerCase();
  const title = p.title.toLowerCase();
  const aliases = (p.aliases || []).map((x) => x.toLowerCase());

  if (slug === s || title === s || aliases.includes(s)) return 1000;
  if (slug.startsWith(s)) return 900;
  if (title.startsWith(s)) return 850;

  let sc = 0;
  if (slug.includes(s)) sc += 500;
  if (title.includes(s)) sc += 400;
  for (const al of aliases) if (al.includes(s)) sc += 350;

  return sc;
}
