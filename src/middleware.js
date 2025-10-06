import { NextResponse } from 'next/server';

export function middleware(req) {
  const res = NextResponse.next();
  const isDev = process.env.NODE_ENV !== 'production';

  // --- Seguridad común ---
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('X-XSS-Protection', '1; mode=block');
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');

  // --- CSP adaptada a entorno ---
  // Nota: Next injecta scripts inline y usa WebSocket/HMR en dev.
  // En producción evitamos 'unsafe-eval' y dejamos 'unsafe-inline' para compatibilidad con los inlines de Next.
  const cspDev = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data: https:",
    "connect-src 'self' ws: wss: http: https:",
    "frame-ancestors 'none'"
  ].join('; ');

  const cspProd = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'", // mantener inline por compat con Next (sin nonce)
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data: https:",
    "connect-src 'self' https:",
    "frame-ancestors 'none'"
  ].join('; ');

  res.headers.set('Content-Security-Policy', isDev ? cspDev : cspProd);

  return res;
}

export const config = {
  // Excluir estáticos para evitar sobrecarga
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
