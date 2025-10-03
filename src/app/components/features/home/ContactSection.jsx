'use client';

import { useState } from 'react';

export default function ContactSection() {
  const [sending, setSending] = useState(false);
  const [ok, setOk] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (sending) return;

    const form = e.currentTarget;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const website = form.website.value.trim(); // honeypot

    if (!name || !email || !message) return;

    try {
      setSending(true);
      setOk(null);

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, website }),
      });

      const data = await res.json();
      if (res.ok && data.ok) {
        setOk(true);
        form.reset();
      } else {
        setOk(false);
      }
    } catch {
      setOk(false);
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contacto" className="section">
      <div className="container-base">
        <h2 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '1rem' }}>Contacto</h2>

        <form onSubmit={handleSubmit}
              style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: '1fr', maxWidth: 720 }}>
          {/* honeypot */}
          <input type="text" name="website" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

          <input className="card" name="name" placeholder="Tu nombre" required aria-label="Tu nombre" />
          <input className="card" type="email" name="email" placeholder="Tu email" required aria-label="Tu email" />
          <textarea className="card" name="message" rows={5} placeholder="¿En qué te puedo ayudar?" required aria-label="Mensaje" />

          <button type="submit" disabled={sending}
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    gap: '0.5rem', padding: '0.75rem 1.25rem',
                    borderRadius: '1rem', background: 'rgb(var(--brand-violet))',
                    color: '#fff', border: 'none', cursor: sending ? 'not-allowed' : 'pointer',
                    opacity: sending ? 0.8 : 1
                  }}>
            {sending ? 'Enviando…' : 'Enviar'}
          </button>

          {ok === true && <p style={{ color: 'green', fontSize: '0.9rem' }}>¡Mensaje enviado! (Revisa tu email — si estás en modo mock, configura RESEND_API_KEY.)</p>}
          {ok === false && <p style={{ color: 'crimson', fontSize: '0.9rem' }}>No se pudo enviar. Inténtalo más tarde.</p>}
        </form>
      </div>
    </section>
  );
}
