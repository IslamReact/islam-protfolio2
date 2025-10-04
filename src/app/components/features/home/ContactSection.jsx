'use client';
import { useEffect, useMemo, useState } from 'react';
import site from '@/app/config/site';

export default function ContactSection() {
  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
  const actionUrl = formspreeId ? `https://formspree.io/f/${formspreeId}` : null;

  const [state, setState] = useState({ sending: false, ok: false, error: '' });

  // Prefill subject utilitario
  const subject = useMemo(
    () => encodeURIComponent('Contacto desde tu portfolio'),
    []
  );

  function onSubmit(e) {
    if (!actionUrl) return; // si no hay formspree, no interceptamos
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot anti-spam
    if (data.get('website')) {
      setState({ sending: false, ok: true, error: '' });
      form.reset();
      return;
    }

    setState((s) => ({ ...s, sending: true, error: '' }));

    fetch(actionUrl, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
      .then(async (res) => {
        const json = await res.json().catch(() => ({}));
        if (res.ok) {
          setState({ sending: false, ok: true, error: '' });
          form.reset();
        } else {
          throw new Error(json?.error || 'No se pudo enviar el mensaje');
        }
      })
      .catch((err) => {
        setState({ sending: false, ok: false, error: err.message || 'Error desconocido' });
      });
  }

  // Mensaje autodesaparece
  useEffect(() => {
    if (state.ok || state.error) {
      const t = setTimeout(() => setState((s) => ({ ...s, ok: false, error: '' })), 4000);
      return () => clearTimeout(t);
    }
  }, [state.ok, state.error]);

  return (
    <section id="contacto" className="section" style={{ paddingTop: '3.5rem' }}>
      <div className="container-base" style={{ display: 'grid', gap: '1.25rem' }}>
        <h2 className="display" style={{ fontSize: '1.75rem', fontWeight: 800 }}>
          Contacto
        </h2>
        <p style={{ marginTop: '0.25rem', maxWidth: 780, opacity: 0.9 }}>
          ¿Quieres acelerar un flujo, automatizar un proceso o revisar un proyecto? Escríbeme.
        </p>

        <div
          className="card-3d"
          style={{
            padding: '1.25rem',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '1rem',
          }}
        >
          {actionUrl ? (
            <form onSubmit={onSubmit} action={actionUrl} method="POST" noValidate>
              {/* Honeypot (no rellenar) */}
              <input type="text" name="website" tabIndex="-1" autoComplete="off" style={{ display: 'none' }} />

              <div style={{ display: 'grid', gap: '0.9rem' }}>
                <div style={{ display: 'grid', gap: '0.4rem' }}>
                  <label htmlFor="name">Nombre</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Tu nombre"
                    style={inputStyle}
                  />
                </div>

                <div style={{ display: 'grid', gap: '0.4rem' }}>
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    inputMode="email"
                    required
                    placeholder="tu@email.com"
                    style={inputStyle}
                  />
                </div>

                <div style={{ display: 'grid', gap: '0.4rem' }}>
                  <label htmlFor="message">Mensaje</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Cuéntame brevemente el objetivo y el contexto…"
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <button
                    type="submit"
                    disabled={state.sending}
                    className="cta-glow"
                    style={{ opacity: state.sending ? 0.7 : 1 }}
                  >
                    {state.sending ? 'Enviando…' : 'Enviar mensaje'}
                  </button>
                  {/* Fallback directo a email por si el usuario prefiere */}
                  {site?.author?.links?.email && (
                    <a
                      href={`${site.author.links.email}?subject=${subject}`}
                      className="kbd"
                      aria-label="Enviar email directo"
                    >
                      o escribir por email
                    </a>
                  )}
                </div>

                {/* Mensajes */}
                {state.ok && (
                  <p role="status" style={{ margin: 0, color: 'rgb(21 210 132)' }}>
                    ✅ Mensaje enviado. ¡Gracias! Te responderé en breve.
                  </p>
                )}
                {state.error && (
                  <p role="alert" style={{ margin: 0, color: 'rgb(255 120 120)' }}>
                    ⚠️ {state.error}
                  </p>
                )}
              </div>
            </form>
          ) : (
            // Fallback sin Formspree: solo botón Email bonito
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <p style={{ margin: 0, opacity: 0.9 }}>
                <strong>Formulario desactivado.</strong> Añade <code>NEXT_PUBLIC_FORMSPREE_ID</code> si quieres usarlo.
              </p>
              {site?.author?.links?.email && (
                <a href={`${site.author.links.email}?subject=${subject}`} className="cta-glow">
                  Enviar email
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const inputStyle = {
  appearance: 'none',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '0.6rem',
  color: 'inherit',
  padding: '0.7rem 0.9rem',
  outline: 'none',
};
