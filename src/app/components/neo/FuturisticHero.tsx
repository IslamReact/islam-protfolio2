'use client';

import Link from 'next/link';
import styles from '../../styles/AppleHero.module.css';
import { useEffect, useRef, useState } from 'react';

export default function FuturisticHero() {
  const full = 'Islam.AI — Diseño • Datos • Automatización';

  // Estado para el texto y la fase
  const [typed, setTyped] = useState('');
  const [i, setI] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'deleting'>('typing');
  const tRef = useRef<number | null>(null);

  useEffect(() => {
    // limpia cualquier timeout anterior
    if (tRef.current) window.clearTimeout(tRef.current);

    // velocidades y pausas
    const typeSpeed = 28;
    const deleteSpeed = 18;
    const endPause = 1200;   // pausa al terminar de escribir
    const startPause = 600;  // pausa al vaciar y antes de volver a escribir

    if (phase === 'typing') {
      if (i < full.length) {
        tRef.current = window.setTimeout(() => {
          setTyped(full.slice(0, i + 1));
          setI(i + 1);
        }, typeSpeed);
      } else {
        // alcanzado el final: pausa y cambia a borrar
        tRef.current = window.setTimeout(() => setPhase('deleting'), endPause);
      }
    } else {
      // deleting
      if (i > 0) {
        tRef.current = window.setTimeout(() => {
          setTyped(full.slice(0, i - 1));
          setI(i - 1);
        }, deleteSpeed);
      } else {
        // vacío: pausa y vuelve a escribir
        tRef.current = window.setTimeout(() => setPhase('typing'), startPause);
      }
    }

    return () => {
      if (tRef.current) {
        window.clearTimeout(tRef.current);
        tRef.current = null;
      }
    };
  }, [i, phase, full]);

  return (
    <div className={styles.wrap}>
      {/* fondos suaves */}
      <div className={styles.bg} aria-hidden />

      <div className="container-base">
        <div className={styles.inner}>
          {/* overline */}
          <div className={styles.overline}>
            Diseño · IA · Datos · Automatización
          </div>

          {/* título grande, al estilo Apple */}
          <h1 className={styles.title}>
            <span className={styles.subtle}>Hola, soy</span>
            <span className={styles.nameLine}>
              <span className={styles.name}>Islam</span>{' '}
              <span className={styles.grad}>El&nbsp;Mrabet</span>
            </span>
            <span className={styles.claim}>
              convierto ideas en productos{' '}
              <em>claros</em>, <em>rápidos</em> y <em>escalables</em>.
            </span>
          </h1>

          {/* copy breve */}
          <p className={styles.lead}>
            Full-stack con foco en <strong>experiencia</strong> ,{' '}
            <strong>datos</strong> e <span className={styles.grad}>IA</span>. Trabajo con Next.js, TypeScript y SQL
            para construir interfaces cuidadas y sistemas que soportan negocio.
          </p>

          {/* línea "terminal" animada */}
          <div
            style={{
              fontFamily:
                'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
              color: 'rgba(var(--text), 0.9)',
              fontSize: 14,
              opacity: 0.95,
            }}
          >
            <span style={{ color: 'rgb(124,58,237)' }}>›</span>{' '}
            {typed}
            <span style={{ animation: 'blink 1s step-start infinite' }}>|</span>
          </div>

          {/* CTAs */}
          <div className={styles.ctas}>
            <Link href="/projects" className={`${styles.btn} ${styles.btnPrimary}`}>
              Ver proyectos
            </Link>
            <a href="#contacto" className={`${styles.btn} ${styles.btnGhost}`}>
              Escríbeme un prompt
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}