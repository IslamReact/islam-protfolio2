'use client';

import { useState } from 'react';

export default function ContactSection() {
  const [sending, setSending] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (sending) return;

    const form = e.currentTarget;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    const subject = encodeURIComponent(`Contacto portfolio – ${name}`);
    const body = encodeURIComponent(`Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`);
    const mailto = `mailto:tuemail@example.com?subject=${subject}&body=${body}`;

    setSending(true);
    window.location.href = mailto;
    setTimeout(() => setSending(false), 1200);
  }

  return (
    <section id="contacto" className="section">
      <div className="container-base">
        <h2 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '1rem' }}>
          Contacto
        </h2>

        <form onSubmit={handleSubmit}
              style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: '1fr', maxWidth: 720 }}>
          <input className="card" name="name" placeholder="Tu nombre" required
                 aria-label="Tu nombre" />
          <input className="card" type="email" name="email" placeholder="Tu email" required
                 aria-label="Tu email" />
          <textarea className="card" name="message" rows={5}
                    placeholder="¿En qué te puedo ayudar?" required
                    aria-label="Mensaje" />
          <button type="submit"
                  disabled={sending}
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.25rem',
                    borderRadius: '1rem',
                    background: 'rgb(var(--brand-violet))',
                    color: '#fff',
                    border: 'none',
                    cursor: sending ? 'not-allowed' : 'pointer',
                    opacity: sending ? 0.8 : 1
                  }}>
            {sending ? 'Abriendo correo…' : 'Enviar'}
          </button>
          <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>
            Consejo: reemplaza <code>tuemail@example.com</code> por tu correo real en el código.
          </p>
        </form>

        <div style={{ marginTop: '1rem', fontSize: '0.9rem', opacity: 0.85 }}>
          <p><strong>¿Quieres envío real sin abrir correo?</strong> Te preparo una ruta <code>/api/contact</code> con un servicio ligero (p. ej., Resend) y variables de entorno. Tú eliges cuándo dar ese paso.</p>
        </div>
      </div>
    </section>
  );
}
