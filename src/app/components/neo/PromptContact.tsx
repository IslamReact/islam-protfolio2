'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useRef, useState, useEffect } from 'react';
import styles from '../../styles/PromptContact.epic.module.css';

export default function PromptContact() {
  const [prompt, setPrompt] = useState('');
  const [shake, setShake] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);

  // ✅ Mantiene el input activo SIN hacer scroll al montarse / al volver
  useEffect(() => {
    inputRef.current?.focus({ preventScroll: true });
  }, []);

  const suggestions = useMemo(
    () => [
      'Agente que lea 6 Excels y genere SQL validado(PostgreSQL).',
      'Job nocturno: sincronizar SQL Server → PostgreSQL con control de cambios.',
      'Deduplicación de pacientes con reglas y reporte de conflictos.',
      'API FastAPI que normalice CSV clínicos con validaciones.',
      'Dashboard Next.js con KPIs diarios y alertas por umbral (email/Slack).',
      'Conector HL7 en Mirth que mapee a esquema interno y registre errores.',
      'CLI para importar Excel a SQL con preview y rollback por transacción.',
      'Reporte PDF semanal automatizado con gráficos y envío a directores.',
    ],
    []
  );

  function getHint(s: string): string {
    const t = s.trim();
    if (!t) return 'Tip: escribe objetivo + contexto + salida deseada. Ej: “Importar 6 Excels a PostgreSQL con validación y reporte diario”.';
    const low = t.toLowerCase();
    const words = t.split(' ').filter(Boolean);
    const hasGoalLen = t.length >= 18;
    const hasWords = words.length >= 5;
    const techWords = ['sql','excel','api','bot','auto','next','python','postgres','server','hl7','mirth','kpi','dashboard','csv','pdf'];
    const hasTech = techWords.some(k => low.includes(k));

    const tips: string[] = [];
    if (!hasGoalLen) tips.push('objetivo más específico');
    if (!hasWords) tips.push('algo de contexto (datos, volumen, plazos)');
    if (!hasTech) tips.push('tech o formato de salida');

    if (!tips.length) return '¡Perfecto! Pulsa “Contáctame” para enviarlo.';
    return `Mejoraría con: ${tips.join(' · ')}.`;
  }
  const hint = getHint(prompt);

  function submit() {
    const q = prompt.trim();
    if (!q) {
      setShake(true);
      inputRef.current?.focus({ preventScroll: true });
      setTimeout(() => setShake(false), 450);
      return;
    }
    router.push(`/contact?prompt=${encodeURIComponent(q)}`);
  }

  return (
    <section className={styles.wrap} aria-labelledby="cta-title">
      {/* Auras */}
      <div className={styles.auras} aria-hidden>
        <span className={`${styles.blob} ${styles.b1}`} />
        <span className={`${styles.blob} ${styles.b2}`} />
        <span className={`${styles.blob} ${styles.b3}`} />
      </div>

      <div className={styles.inner}>
        <div className={styles.badge}>Islam.AI</div>

        <h2 id="cta-title" className={styles.titleXL}>
          Convierte tu proceso en <span className={styles.grad}>automatización</span>
        </h2>

        <p className={styles.subtitle}>
          Construyo sistemas que trabajan por ti — de verdad. El futuro es la automatización.
        </p>

        <div className={styles.row}>
          <input
            ref={inputRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') submit(); }}
            placeholder='Escribe un prompt: “Quiero un agente que automatice…”'
            className={`${styles.input} ${shake ? styles.shake : ''}`}
            aria-label="Prompt de contacto"
          />
          <button className={styles.ctaBtn} onClick={submit}>
            Contáctame
          </button>
        </div>

        {/* Coach SIEMPRE visible */}
        <div className={styles.coach} role="status" aria-live="polite">
          <div className={styles.coachHead}>
            <span className={styles.spark} aria-hidden>⚡</span>
            <strong>ISLAM·IA</strong>
          </div>
          <p className={styles.coachMsg}>{hint}</p>
        </div>

        {/* Sugerencias siempre visibles */}
        <div className={styles.chips} style={{ marginTop: 8 }}>
          {suggestions.map((s) => (
            <button
              key={s}
              className={styles.chip}
              onClick={() => {
                setPrompt(s);
                // re-foco sin desplazar la página
                setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 0);
              }}
              aria-label={`Usar sugerencia: ${s}`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className={styles.trust}>
          Respondo normalmente en &lt; 24h · Sin spam · Plan claro desde el día 1
        </div>
      </div>
    </section>
  );
}