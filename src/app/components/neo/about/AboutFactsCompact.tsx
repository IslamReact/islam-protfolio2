// src/app/components/neo/about/AboutFactsCompact.tsx
type Props = { facts: Record<string, string> };

export default function AboutFactsCompact({ facts }: Props) {
  const items = Object.entries(facts || {});
  return (
    <div className="neon-card" style={{ padding: 14 }}>
      <h2 style={{ fontWeight: 800, fontSize: 18, marginBottom: 10 }}>Datos rápidos</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {items.map(([k, v]) => (
          <span key={k} className="btn-ghost" style={{ padding: '8px 12px', borderRadius: 999, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span aria-hidden>{iconFor(k)}</span>
            <strong style={{ fontWeight: 700 }}>{k}:</strong> <span style={{ opacity: .9 }}>{v}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function iconFor(k: string) {
  const s = k.toLowerCase();
  if (s.includes('ubicación') || s.includes('location')) return '📍';
  if (s.includes('idiomas') || s.includes('languages')) return '🗣️';
  if (s.includes('enfoque') || s.includes('focus')) return '🎯';
  if (s.includes('rol') || s.includes('title')) return '💼';
  return 'ℹ️';
}
