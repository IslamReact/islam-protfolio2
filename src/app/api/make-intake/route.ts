// src/app/api/make-intake/route.ts
import { NextResponse } from 'next/server';

type IntakePayload = {
  name: string;
  email: string;
  message: string;
  subject?: string;
  page?: string;
  source?: 'formspree' | 'manual' | string;
};

export async function POST(req: Request) {
  try {
    const body: IntakePayload = await req.json();

    // Validación mínima
    if (!body?.email || !body?.message) {
      return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 });
    }

    const url = process.env.MAKE_INTAKE_WEBHOOK_URL;
    if (!url) {
      return NextResponse.json({ ok: false, error: 'Missing MAKE_INTAKE_WEBHOOK_URL' }, { status: 500 });
    }

    // Reenvía a Make como JSON
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // añade timestamp y userAgent para contexto
      body: JSON.stringify({
        ...body,
        receivedAt: new Date().toISOString(),
        userAgent: req.headers.get('user-agent') ?? '',
      }),
      // Importante: no sigas redirects
      redirect: 'manual',
    });

    return NextResponse.json({ ok: r.ok });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}