export async function POST(req) {
  try {
    const data = await req.json();
    const name = (data.name || '').trim();
    const email = (data.email || '').trim();
    const message = (data.message || '').trim();
    const honey = (data.website || '').trim(); // honeypot

    if (honey) {
      return new Response(JSON.stringify({ ok: true }), { status: 200 }); // bot ignorado
    }
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ ok: false, error: 'Faltan campos' }), { status: 400 });
    }

    // ==== ENVÍO CON RESEND (opcional) ====
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      // Si no hay clave, hacemos “mock” para que puedas probar sin costes.
      console.log('[MOCK EMAIL]', { name, email, message });
      return new Response(JSON.stringify({ ok: true, mock: true }), { status: 200 });
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio <onboarding@resend.dev>',
        to: ['tuemail@example.com'], // <-- cambia a tu email real
        subject: `Contacto portfolio – ${name}`,
        text: `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('[RESEND ERROR]', text);
      return new Response(JSON.stringify({ ok: false, error: 'No se pudo enviar' }), { status: 500 });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ ok: false, error: 'Error inesperado' }), { status: 500 });
  }
}
