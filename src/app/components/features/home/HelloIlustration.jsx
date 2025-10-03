'use client';
import { useRef } from 'react';

export default function HeroIllustration() {
  const ref = useRef(null);

  function onMove(e) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    const tx = (x * 12).toFixed(2);
    const ty = (y * 12).toFixed(2);
    el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
  }
  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'translate3d(0,0,0)';
  }

  return (
    <div
      aria-hidden
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ width: '100%', maxWidth: 620, aspectRatio: '16/9', background: 'transparent' }}
    >
      <svg
        ref={ref}
        viewBox="0 0 1000 560"
        width="100%"
        height="100%"
        role="img"
        aria-label="Ilustración decorativa"
        style={{ display: 'block' }}
      >
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgb(var(--accent-2))" />
            <stop offset="100%" stopColor="rgb(var(--accent-1))" />
          </linearGradient>
          <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgb(var(--accent-3))" />
            <stop offset="100%" stopColor="rgb(var(--accent-2))" />
          </linearGradient>
          <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(-20)">
            <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(255,255,255,0.28)" strokeWidth="1" />
          </pattern>
          {/* sombras suaves para separar visualmente */}
          <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="rgba(0,0,0,0.35)" />
          </filter>
          <filter id="edgeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="rgba(255,255,255,0.8)" />
          </filter>
        </defs>

        {/* sombra general del conjunto */}
        <ellipse cx="640" cy="420" rx="160" ry="22" fill="rgba(0,0,0,0.35)" />

        {/*
         * DISTRIBUCIÓN: triángulo IZQ (x≈420), V CENTRO (x≈660), rayo DERECHA (x≈840)
         * y alturas distintas para que no se monten.
         */}

        {/* Triángulo */}
        <g transform="translate(420 140) scale(1.05)" filter="url(#softShadow)">
          <polygon points="0,0 120,210 -120,210" fill="url(#g1)" opacity="0.95" />
          <polygon points="0,0 120,210 -120,210" fill="url(#hatch)" opacity="0.65" />
          <polygon
            points="0,0 120,210 -120,210"
            fill="none"
            stroke="rgba(255,255,255,0.95)"
            strokeWidth="8"
            strokeLinejoin="round"
            filter="url(#edgeGlow)"
          />
        </g>

        {/* V (centrada y un poco más alta) */}
        <g transform="translate(660 90) scale(1.08)" filter="url(#softShadow)">
          <path d="M -100 0 L -15 220 L 85 0" fill="none" stroke="rgba(255,255,255,0.92)" strokeWidth="32" strokeLinecap="round" />
          <path d="M -100 0 L -15 220 L 85 0" stroke="url(#g2)" strokeWidth="22" fill="none" strokeLinecap="round" />
          <path d="M -100 0 L -15 220 L 85 0" stroke="url(#hatch)" strokeWidth="10" fill="none" strokeLinecap="round" opacity="0.6" />
        </g>

        {/* Rayo (más a la derecha y ligeramente más bajo) */}
        <g transform="translate(840 150) rotate(-7) scale(1.02)" filter="url(#softShadow)">
          <path d="M0 0 L46 0 L22 68 L80 68 L-10 176 L12 98 L-34 98 Z" fill="url(#g2)" opacity="0.98" />
          <path d="M0 0 L46 0 L22 68 L80 68 L-10 176 L12 98 L-34 98 Z" fill="url(#hatch)" opacity="0.6" />
          <path
            d="M0 0 L46 0 L22 68 L80 68 L-10 176 L12 98 L-34 98 Z"
            fill="none"
            stroke="rgba(255,255,255,0.96)"
            strokeWidth="7"
            filter="url(#edgeGlow)"
          />
        </g>
      </svg>
    </div>
  );
}
