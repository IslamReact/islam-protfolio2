'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';

export default function ProjectCardAnimated({ p = {}, index = 0 }) {
  const ref = useRef(null);

  // 🛡️ fallback seguro: si p no existe, evita renderizar
  if (!p || typeof p !== 'object') {
    return null;
  }

  // 🔧 Desestructuramos con valores por defecto
  const {
    slug = '',
    title = 'Proyecto sin título',
    summary = '',
    highlights = [],
    stack = [],
    metric = '',
    links = {}
  } = p;

  function onMove(e) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const cx = x / r.width - 0.5;
    const cy = y / r.height - 0.5;
    const rotateX = (+cy * 6).toFixed(2);
    const rotateY = (-cx * 6).toFixed(2);

    el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
    const deg = Math.atan2(cy, cx) * (180 / Math.PI) + 90;
    el.style.setProperty('--deg', `${deg}deg`);
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = `rotateX(0deg) rotateY(0deg)`;
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20% 0px' }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.25) }}
      className="card-3d"
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        background: 'color-mix(in oklab, rgb(var(--bg)) 70%, rgb(255 255 255) 30%)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '1rem',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <h3 style={{ fontSize: '1.125rem', fontWeight: 600, lineHeight: 1.25 }}>
        <Link href={`/proyectos/${slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          {title}
        </Link>
      </h3>

      {summary && (
        <p style={{ marginTop: '0.5rem', opacity: 0.8, fontSize: '0.95rem' }}>{summary}</p>
      )}

      {Array.isArray(highlights) && highlights.length > 0 && (
        <ul style={{ marginTop: '0.75rem', fontSize: '0.95rem', lineHeight: 1.5 }}>
          {highlights.map((h) => (
            <li key={h}>• {h}</li>
          ))}
        </ul>
      )}

      {Array.isArray(stack) && stack.length > 0 && (
        <div
          style={{
            marginTop: '1rem',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            opacity: 0.8,
            fontSize: '0.8rem',
          }}
        >
          {stack.map((s) => (
            <span
              key={s}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                border: '1px solid rgba(255,255,255,0.15)',
                padding: '2px 6px',
                borderRadius: '6px',
                fontFamily:
                  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
              }}
            >
              {s}
            </span>
          ))}
        </div>
      )}

      {metric && (
        <p style={{ marginTop: '0.75rem', opacity: 0.7, fontSize: '0.8rem' }}>{metric}</p>
      )}

      <div
        style={{
          marginTop: 'auto',
          paddingTop: '1rem',
          display: 'flex',
          gap: '0.75rem',
          flexWrap: 'wrap',
        }}
      >
        <Link href={`/proyectos/${slug}`} className="underline">
          Ver proyecto
        </Link>
        {links?.demo && (
          <Link href={links.demo} className="underline">
            Demo
          </Link>
        )}
        {links?.code && (
          <Link href={links.code} className="underline">
            Código
          </Link>
        )}
      </div>
    </motion.article>
  );
}
