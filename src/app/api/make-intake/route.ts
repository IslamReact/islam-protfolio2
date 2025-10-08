import { NextResponse, NextRequest } from 'next/server';

type IntakePayload = {
  name?: string;
  email: string;
  message: string;
  subject?: string;
  page?: string;
  source?: 'formspree' | 'manual' | string;
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST,OPTIONS',
  'Access-Control-Allow-Headers': 'content-type,x-shared-secret',
} as const;

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  try {
    const body: IntakePayload = await req.json();

    // Validación mínima
    if (!body?.email || !body?.message) {
      return NextResponse.json(
        { ok: false, error: 'Missing fields: email and message are required' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Secreto opcional (solo si lo configuras)
    const expectedSecret = process.env.MAKE_SHARED_SECRET;
    const gotSecret = req.headers.get('x-shared-secret') ?? '';
    if (expectedSecret && gotSecret !== expectedSecret) {
      return NextResponse.json(
        { ok: false, error: 'Forbidden: bad x-shared-secret' },
        { status: 403, headers: corsHeaders }
      );
    }

    // URL del webhook (acepta dos nombres por comodidad)
    const HOOK =
      process.env.MAKE_INTAKE_WEBHOOK_URL ||
      process.env.MAKE_WEBHOOK_URL;
    if (!HOOK) {
      return NextResponse.json(
        { ok: false, error: 'Missing MAKE_INTAKE_WEBHOOK_URL or MAKE_WEBHOOK_URL' },
        { status: 500, headers: corsHeaders }
      );
    }

    // Metadatos útiles
    const meta = {
      receivedAt: new Date().toISOString(),
      userAgent: req.headers.get('user-agent') ?? '',
      ip: req.headers.get('x-forwarded-for') ?? '',
      referer: req.headers.get('referer') ?? '',
    };

    // Reenvía a Make como JSON
    const r = await fetch(HOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...body, ...meta }),
      redirect: 'manual',
      cache: 'no-store',
    });

    return NextResponse.json(
      { ok: r.ok, status: r.status },
      { status: 200, headers: corsHeaders }
    );
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : String(err) },
      { status: 500, headers: corsHeaders }
    );
  }
}