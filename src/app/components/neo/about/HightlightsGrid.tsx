// src/app/components/neo/about/HighlightsGrid.tsx
type Item = { label: string; detail?: string; year?: string | number };

export default function HighlightsGrid({ highlights }: { highlights: Item[] }) {
  return (
    <div className="neon-card" style={{ padding: 14 }}>
      <h2 style={{ fontWeight: 800, fontSize: 18, marginBottom: 10 }}>Highlights</h2>
      <div style={{ display: 'grid', gap: 10, gridTemplateColumns: 'repeat(3, minmax(0,1fr))' }}>
        {highlights.map((h) => (
          <article key={h.label} className="neon-card" style={{ padding: 12 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
              <strong style={{ fontWeight: 800 }}>{h.label}</strong>
              <span style={{ fontSize: 12, color: 'rgba(var(--text),.65)' }}>{h.year}</span>
            </div>
            {h.detail && <p style={{ marginTop: 6, color: 'rgba(var(--text),.85)', fontSize: 14, lineHeight: 1.5 }}>{h.detail}</p>}
          </article>
        ))}
      </div>

      <style>{`
        @media (max-width: 1100px){ div[style*="grid-template-columns: 'repeat(3"] { grid-template-columns: repeat(2, minmax(0,1fr)) !important; } }
        @media (max-width: 720px){  div[style*="grid-template-columns: 'repeat(3"], div[style*="grid-template-columns: repeat(2"] { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
