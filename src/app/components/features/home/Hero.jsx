'use client';
import { motion } from 'framer-motion';
import HeroIllustration from './HelloIlustration';

function Badge({ children }) {
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        fontSize: 12, padding: '6px 10px', borderRadius: 999,
        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)'
      }}
      aria-label="estado"
    >
      <span style={{
        width: 10, height: 10, borderRadius: '50%', background: 'rgb(var(--accent-1))',
        boxShadow: '0 0 8px rgba(21,210,132,0.7)'
      }}/>
      Disponible para proyectos
    </span>
  );
}

function CTA({ href, children }) {
  return (
    <a
      href={href}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        padding: '12px 18px', borderRadius: 12, fontWeight: 600,
        background: 'linear-gradient(90deg, rgb(var(--accent-1)), rgb(var(--accent-3)))',
        color: '#0b0d11', textDecoration: 'none',
        boxShadow: '0 0 0 rgba(0,0,0,0)', position: 'relative'
      }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 40px rgba(21,210,132,0.35)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 0 rgba(0,0,0,0)'; }}
    >
      {children}
    </a>
  );
}

export default function Hero() {
  return (
    <section className="section" style={{ paddingTop: '6rem', paddingBottom: '5rem', position: 'relative', overflow: 'hidden' }}>
<div
  className="container-base"
  style={{
    display: 'grid',
    gridTemplateColumns: '1.1fr 0.9fr',
    gap: 32,
    alignItems: 'center'   // <-- centra verticalmente texto e ilustración
  }}
>
        {/* Columna izquierda: TU contenido */}
        <div>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Badge>Disponible para proyectos</Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="display"
            style={{ fontSize: '52px', lineHeight: 1.05, fontWeight: 800, marginTop: 16, marginBottom: 8 }}
          >
            Construyo <span className="grad-main">herramientas</span> que ahorran tiempo y dinero.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            style={{ color: 'rgba(232,234,237,0.8)', maxWidth: 560, fontSize: 18 }}
          >
            Full-stack · Automatización · Datos · IA aplicada. React/Next · FastAPI · SQL Server · PostgreSQL.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}
          >
            <CTA href="#proyectos">Ver proyectos ›</CTA>
            <a href="#contacto" className="kbd" aria-label="Ir a contacto">Contactar</a>
          </motion.div>
        </div>

        {/* Columna derecha: placeholder visual (igual que antes) */}
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
          <HeroIllustration />
          </motion.div>
      </div>

      {/* Iconos fantasma (igual que antes) */}
      <div aria-hidden style={{ position: 'absolute', left: '6%', bottom: '18%', opacity: 0.08, transform: 'rotate(-8deg)', fontSize: 48 }}>⚡</div>
      <div aria-hidden style={{ position: 'absolute', right: '4%', top: '22%', opacity: 0.08, transform: 'rotate(10deg)', fontSize: 44 }}>📐</div>
      <div aria-hidden style={{ position: 'absolute', left: '12%', top: '30%', opacity: 0.08, transform: 'rotate(-6deg)', fontSize: 42 }}>📝</div>
    </section>
  );
}
