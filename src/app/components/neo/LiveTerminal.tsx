'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../styles/TerminalMac.module.css';

export type CommandProject = {
  slug: string;
  title: string;
  aliases?: string[];
};

type Props = {
  projects?: CommandProject[];
  placeholder?: string;
};

export default function LiveTerminal({
  projects = [],
  placeholder = 'open <proyecto>   ·   search <texto>   ·   help',
}: Props) {
  const router = useRouter();

  const [output, setOutput] = useState<string[]>([]);
  const bootIndex = useRef(0);
  const boxRef = useRef<HTMLDivElement | null>(null);

  const [cmd, setCmd] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const histIdx = useRef<number>(-1);

  const suggestions = useMemo(() => {
    const q = cmd.trim().toLowerCase();
    if (!q) return projects.slice(0, 5);
    return rank(projects, q).slice(0, 7);
  }, [projects, cmd]);

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

  useEffect(() => {
    boxRef.current?.scrollTo({ top: 9_999_999, behavior: 'smooth' });
  }, [output]);

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

  function run(raw: string) {
    const line = raw.trim();
    if (!line) return;

    setHistory((h) => [...h, line]);
    histIdx.current = -1;

    pushOut(`$ ${line}`);

    if (line === 'help' || line === '?') {
      pushOut('help> comandos: open <slug|título>, search <texto>, ls, projects, about, uses, contact');
      return;
    }

    if (line === 'ls') {
      const list = projects.map((p) => p.slug).join('  ');
      pushOut(list || '(sin proyectos)');
      return;
    }

    if (line === 'projects') { router.push('/projects'); pushOut('→ /projects'); return; }
    if (line === 'about')    { router.push('/about');    pushOut('→ /about');    return; }
    if (line === 'uses')     { router.push('/uses');     pushOut('→ /uses');     return; }
    if (line === 'contact' || line === 'contacto') {
      router.push('/#contacto'); pushOut('→ /#contacto'); return;
    }

    if (line.startsWith('search ')) {
      const q = line.slice(7).trim();
      if (q) { router.push(`/projects?q=${encodeURIComponent(q)}`); pushOut(`→ search "${q}" en /projects`); }
      return;
    }

    if (line.startsWith('open ')) {
      const term = line.slice(5).trim().toLowerCase();
      const best = rank(projects, term)[0];
      if (best) openProject(best); else pushOut('not found');
      return;
    }

    const best = rank(projects, line.toLowerCase())[0];
    if (best) { openProject(best); return; }

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
      e.preventDefault();
      const best = suggestions[0];
      if (!best) return;
      const trimmed = cmd.trimStart();
      const hasOpen = /^open\s+/i.test(trimmed);
      setCmd(hasOpen ? `open ${best.slug}` : best.slug);
    }
  }

  return (
    <div className={styles.wrap}>
      {/* Barra superior estilo mac */}
      <div className={styles.chrome}>
        <span className={styles.dots} aria-hidden>
          <span className={`${styles.dot} ${styles.dotClose}`} />
          <span className={`${styles.dot} ${styles.dotMin}`} />
          <span className={`${styles.dot} ${styles.dotFull}`} />
        </span>
        <span className={styles.title}>Terminal · proyectos</span>
        <span className={styles.hint}>⌘/Ctrl + L para enfocar · Enter ejecuta</span>
      </div>

      {/* Salida */}
      <div ref={boxRef} className={styles.body}>
        {output.map((line, idx) => (
          <div key={idx}>
            <span style={{ color: 'rgb(var(--accent))' }}>$</span>{' '}
            <span style={{ whiteSpace: 'pre-wrap' }}>{line}</span>
          </div>
        ))}
      </div>

      {/* Prompt */}
      <div className={styles.prompt}>
        <span className={styles.dollar}>$</span>
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
          className={styles.input}
        />
      </div>

      {/* Sugerencias rápidas */}
      {suggestions.length > 0 && (
        <div className={styles.suggestions}>
          {suggestions.map((s) => (
            <button
              key={s.slug}
              onClick={() => openProject(s)}
              className={styles.suggestion}
              title={`Abrir ${s.title}`}
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
  if (!picks.length) {
    lines.splice(
      1,
      0,
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