'use client';

import { useEffect, useState } from 'react';
import styles from '../../../styles/ContactForm.module.css';

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID as string | undefined;

export default function ContactForm({ initialPrompt = '' }: { initialPrompt?: string }) {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [msg, setMsg] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (initialPrompt && !msg) setMsg(initialPrompt);
  }, [initialPrompt, msg]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!FORMSPREE_ID) {
      setStatus('error');
      setError('Falta la variable NEXT_PUBLIC_FORMSPREE_ID (configúrala en .env.local o Vercel).');
      return;
    }

    setStatus('sending');
    setError('');

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', mail);
      formData.append('message', msg);
      formData.append('subject', `Contacto web · ${name || 'Nuevo proyecto'}`);
      if (typeof window !== 'undefined') formData.append('page', window.location.href);

      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });

      if (res.ok) {
        setStatus('success');
        setName('');
        setMail('');
        setMsg('');
      } else {
        const data: unknown = await res.json().catch(() => ({}));
        const msg =
          (isRecord(data) && Array.isArray(data.errors) && data.errors[0]?.message) ||
          `Error ${res.status}`;
        setError(String(msg));
        setStatus('error');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
      setStatus('error');
    }
  }

  return (
    <div className={`neon-card ${styles.wrap}`}>
      <div className={styles.hero}>
        <div className={styles.overline}>Contacto</div>
        <h1 className={styles.title}>Cuéntame tu idea</h1>
        <p className={styles.sub}>Objetivo, alcance, plazos y cualquier ejemplo que tengas.</p>
      </div>

      {/* Avisos de estado */}
      {status === 'success' && (
        <div className="neon-card" style={{ padding: 12, marginBottom: 10 }}>
          ✅ ¡Mensaje enviado! Te responderé pronto.
        </div>
      )}
      {status === 'error' && (
        <div className="neon-card" style={{ padding: 12, marginBottom: 10 }}>
          ❌ No se pudo enviar: {error}
        </div>
      )}

      <form onSubmit={submit} className={styles.form} noValidate>
        <div className={styles.grid}>
          <label className={styles.field}>
            <span>Tu nombre</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre y apellidos"
              required
              name="name"
              autoComplete="name"
            />
          </label>
          <label className={styles.field}>
            <span>Tu email</span>
            <input
              type="email"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              placeholder="tucorreo@ejemplo.com"
              required
              name="email"
              autoComplete="email"
            />
          </label>
        </div>

        <label className={styles.field}>
          <span>Mensaje</span>
          <textarea
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Escribe aquí (el prompt se pegó automáticamente si venías con él)…"
            rows={8}
            required
            name="message"
          />
        </label>

        <div className={styles.ctas}>
          <button type="submit" className="btn-primary" disabled={status === 'sending'}>
            {status === 'sending' ? 'Enviando…' : 'Enviar'}
          </button>
          <a href="/projects" className="btn-ghost">Ver proyectos</a>
        </div>

        <p className={styles.note}>
          Este formulario usa Formspree. Recibirás un email con los detalles que envías.
        </p>
      </form>
    </div>
  );
}

/* ---------- utils de tipos ---------- */
function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}