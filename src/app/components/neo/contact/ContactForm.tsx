// src/app/components/neo/contact/ContactForm.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import styles from '../../../styles/ContactForm.chat.module.css'; // ⬅️ CSS chat

const FORMSPREE_ID: string = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? '';

export default function ContactForm({ initialPrompt = '' }: { initialPrompt?: string }) {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [msg, setMsg]   = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError]   = useState<string>('');
  const [sentAt, setSentAt] = useState<Date | null>(null);

  // ISLAM·IA (animación)
  const [aiFull, setAiFull]     = useState<string>('');
  const [aiTyped, setAiTyped]   = useState<string>('');
  const [aiTyping, setAiTyping] = useState<boolean>(false);
  const typerId = useRef<number | null>(null);

  useEffect(() => {
    if (initialPrompt && !msg) setMsg(initialPrompt);
  }, [initialPrompt, msg]);

  useEffect(() => {
    if (!aiTyping || !aiFull) return;
    if (typerId.current) window.clearInterval(typerId.current);
    let i = 0;
    setAiTyped('');
    typerId.current = window.setInterval(() => {
      i += 1;
      setAiTyped(aiFull.slice(0, i));
      if (i >= aiFull.length && typerId.current) {
        window.clearInterval(typerId.current);
        typerId.current = null;
        setAiTyping(false);
      }
    }, 32);
    return () => {
      if (typerId.current) {
        window.clearInterval(typerId.current);
        typerId.current = null;
      }
    };
  }, [aiFull, aiTyping]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // ✅ Requiere nombre, email y mensaje antes de enviar
    if (!name.trim() || !mail.trim() || !msg.trim()) {
      setStatus('error');
      setError('Por favor, completa nombre, email y mensaje.');
      e.currentTarget.reportValidity(); // muestra ayudas del navegador si faltan
      return;
    }

    if (!FORMSPREE_ID) {
      setStatus('error');
      setError('Falta NEXT_PUBLIC_FORMSPREE_ID (.env.local o Vercel).');
      return;
    }

    setStatus('sending');
    setError('');
    try {
      const fd = new FormData();
      fd.append('name', name);
      fd.append('email', mail);
      fd.append('message', msg);
      fd.append('subject', 'Contacto web · islamelmrabet.dev');
      if (typeof window !== 'undefined') fd.append('page', window.location.href);

      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: fd,
      });

      if (res.ok) {
        setStatus('success');
        setSentAt(new Date());
        setAiFull(buildAiReply(name, msg, mail));
        setAiTyping(true);
        setName('');
        setMail('');
        setMsg('');
        return;
      }
      const data: unknown = await res.json().catch(() => ({}));
      setError(getFormspreeErrorMessage(data) ?? `Error ${res.status}`);
      setStatus('error');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
      setStatus('error');
    }
  }

  function replayAi() {
    if (aiFull) setAiTyping(true);
  }

  return (
    <div className={`neon-card ${styles.wrap}`}>
      <div className={styles.hero}>
        <div className={styles.overline}>Contacto</div>
        <h1 className={styles.title}>Cuéntame tu idea</h1>
        <p className={styles.sub}>Objetivo, alcance, plazos y cualquier ejemplo que tengas.</p>
      </div>

      {status === 'success' && (
        <div>
        </div>
      )}
      {status === 'error' && (
        <div className={`${styles.alert} ${styles.alertError}`} role="alert">
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
          <button
            type="submit"
            className={`btn-primary ${styles.ctaPrimary}`}
            disabled={status === 'sending' || !name.trim() || !mail.trim() || !msg.trim()}
            data-busy={status === 'sending'}
          >
            {status === 'sending' && <span className={styles.spinner} aria-hidden />}
            {status === 'sending' ? 'Enviando…' : 'Enviar'}
          </button>
        </div>

        <p className={styles.note}>
          Este formulario usa Formspree. Recibirás un email con los detalles que envías.
        </p>
      </form>

      {/* Chat burbujas */}
      {aiFull && (
        <div className={`neon-card ${styles.chat}`}>
          {/* Usuario (derecha) */}
          <div className={`${styles.chatRow} ${styles.me}`}>
            <div className={`${styles.bubble} ${styles.bubbleMe}`}>
              <div className={styles.bubbleText}>
                {aiSourceFromUser(name, mail)}
              </div>
              <div className={styles.meta}>
                {sentAt ? formatTime(sentAt) : ''}
              </div>
            </div>
            <div className={`${styles.avatar} ${styles.avatarMe}`} aria-hidden>
              {initialsFrom(name || 'Tú')}
            </div>
          </div>

          {/* ISLAM·IA (izquierda) */}
          <div className={`${styles.chatRow} ${styles.ai}`}>
            <div className={`${styles.avatar} ${styles.avatarAi}`} aria-hidden>🤖</div>
            <div className={`${styles.bubble} ${styles.bubbleAi}`}>
              <div className={`${styles.bubbleText} ${styles.mono}`}>
                {aiTyped}
                {aiTyping && <span className={styles.caret} aria-hidden />}
              </div>
              <div className={styles.meta}>
                ISLAM·IA · {sentAt ? formatTime(sentAt) : ''}
                <button className={`${styles.replay} btn-ghost`} onClick={replayAi} aria-label="Repetir animación">Repetir</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ===== Helpers ===== */
function buildAiReply(n: string, m: string, email: string): string {
  const nombre = (n || 'amigo/a').trim();
  const resumen = m.trim().slice(0, 160);
  const correo  = email.trim() || 'tu correo';
  return [
    `Gracias por tu solicitud, ${nombre} 👋`,
    `He recibido tu mensaje y ya estoy analizándolo.`,
    resumen ? `Resumen rápido: "${resumen}"` : `Resumen rápido: (sin contenido)`,
    `Te escribiré a ${correo} con los siguientes pasos y un plan claro.`
  ].join('\n');
}
function aiSourceFromUser(n: string, e: string): string {
  const nombre = (n || 'Tú').trim();
  const correo = (e || '').trim();
  return correo ? `${nombre} · ${correo}` : `${nombre}`;
}
function initialsFrom(s: string): string {
  const p = s.trim().split(/\s+/).filter(Boolean);
  const two = (p[0]?.[0] || '') + (p[1]?.[0] || '');
  return (two || p[0]?.slice(0, 2) || 'TÚ').toUpperCase();
}
function formatTime(d: Date): string {
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${hh}:${mm}`;
}

/* ===== type guards errores Formspree ===== */
function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}
function isFormspreeError(v: unknown): v is { message: string } {
  return isRecord(v) && typeof (v as { message?: unknown }).message === 'string';
}
function getFormspreeErrorMessage(data: unknown): string | undefined {
  if (!isRecord(data)) return undefined;
  const errs = (data as { errors?: unknown }).errors;
  if (!Array.isArray(errs)) return undefined;
  const first = errs.find((e) => isFormspreeError(e));
  return first?.message;
}