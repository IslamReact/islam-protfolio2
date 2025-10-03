'use client';
import { motion } from 'framer-motion';

function CTA({ href, children, variant = 'primary' }) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm transition';
  const styles = variant === 'primary'
    ? 'bg-[rgb(var(--brand-violet))] text-white hover:brightness-110'
    : 'border border-black/10 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/10';
  return (
    <a href={href} className={`${base} ${styles}`}>{children}</a>
  );
}

function Chip({ children }) {
  return <span className="kbd border-black/10 dark:border-white/15">{children}</span>;
}

export default function Hero() {
  return (
    <section className="section bg-radial bg-grid">
      <div className="container-base grid md:grid-cols-2 gap-10 items-center">
        {/* Columna texto */}
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="text-4xl md:text-5xl font-semibold leading-tight"
          >
            <span className="u2050-gradient-text">Construyo herramientas</span> que ahorran tiempo y dinero.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="mt-4 text-neutral-600 dark:text-neutral-300"
          >
            Full-stack · Automatización · Datos · IA aplicada. React/Next · FastAPI · SQL Server · PostgreSQL.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="mt-6 flex flex-wrap gap-3"
          >
            <CTA href="#proyectos">Ver proyectos</CTA>
            <CTA href="#contacto" variant="secondary">Contactar</CTA>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="mt-6 flex flex-wrap gap-2 text-xs opacity-80"
          >
            {['React', 'Next.js', 'FastAPI', 'SQL Server', 'PostgreSQL', 'ETL', 'Automatización', 'IA aplicada']
              .map((t) => <Chip key={t}>{t}</Chip>)}
          </motion.div>

          <p className="mt-4 text-sm opacity-70">
            Disponible para retos de automatización y apps internas.
          </p>
        </div>

        {/* Columna “señales de valor” */}
        <motion.aside
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card"
          aria-label="Señales de valor"
        >
          <h3 className="text-lg font-medium mb-2">Señales de valor</h3>
          <ul className="space-y-2 text-sm">
            <li>• −42% tiempo de carga en herramienta interna</li>
            <li>• Migraciones SQL masivas con validación automática</li>
            <li>• React + FastAPI con workers y bajo uso de CPU</li>
          </ul>
        </motion.aside>
      </div>
    </section>
  );
}
