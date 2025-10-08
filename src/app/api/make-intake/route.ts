// src/app/api/make-intake/route.ts
import { NextResponse } from 'next/server';

type IntakePayload = {
  name?: string;
  email: string;
  message: string;
  subject?: string;
  page?: string;
  source?: 'formspree' | 'web' | 'manual' | string;
};

function isLikelyEmail(s: string): boolean {
  // Validación mínima sin regex complejo: contiene @ y un punto después
  const at = s.indexOf('@');
  const dot = s.lastIndexOf('.');
  return at > 0 && dot > at + 1 && dot < s.length - 1;
}

function sameSiteOrSecretOk(req: Request): { ok: boolean; reason?: string } {
  const expected = process.env.MAKE_SHARED_SECRET;
  const got = req.headers.get('x-shared-secret');
  if (expected && got && got === expected) return { ok: true, reason: 'secret' };

  // Fallback: aceptar llamadas del mismo sitio (desde el frontend propio)
  const secFetchSite = req.headers.get('sec-fetch-site'); // 'same-origin'|'same-site'|'cross-site'|null
  if (secFetchSite && (secFetchSite === 'same-origin' || secFetchSite === 'same-site')) {
    return { ok: true, reason: 'same-site' };
  }

  return { ok: false, reason: 'no-secret-and-not-same-site' };
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as IntakePayload;

    // Validación mínima
    const email = (body?.email || '').trim();
    const message = (body?.message || '').trim();
    if (!email || !message) {
      return NextResponse.json({ ok: false, error: 'Missing fields: email and message' }, { status: 400 });
    }
    if (!isLikelyEmail(email)) {
      return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 });
    }
    if (message.length > 5000) {
      return NextResponse.json({ ok: false, error: 'Message too long' }, { status: 413 });
    }

    // Seguridad básica
    const gate = sameSiteOrSecretOk(req);
    if (!gate.ok) {
      return NextResponse.json({ ok: false, error: 'Forbidden: bad origin or missing secret' }, { status: 403 });
    }

    const url = process.env.MAKE_INTAKE_WEBHOOK_URL;
    if (!url) {
      return NextResponse.json({ ok: false, error: 'Missing MAKE_INTAKE_WEBHOOK_URL' }, { status: 500 });
    }

    // Reenviar a Make
    const r = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Mandamos el secreto a Make para poder filtrarlo allí también (doble capa)
        'X-Shared-Secret': process.env.MAKE_SHARED_SECRET || ''
      },
      body: JSON.stringify({
        name: (body.name || '').trim(),
        email,
        message,
        subject: body.subject || 'Contacto web',
        page: body.page || '',
        source: body.source || 'web',
        receivedAt: new Date().toISOString(),
        userAgent: req.headers.get('user-agent') ?? '',
        origin: req.headers.get('origin') ?? req.headers.get('referer') ?? ''
      }),
      redirect: 'manual'
    });

    if (!r.ok) {
      const txt = await r.text().catch(() => '');
      return NextResponse.json({ ok: false, error: `Make responded ${r.status}`, details: txt }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}