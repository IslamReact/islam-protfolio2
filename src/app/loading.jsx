export default function RootLoading() {
  return (
    <div className="container-base" style={{ padding: '6rem 0 3rem' }}>
      <div
        style={{
          height: 36, width: 130, borderRadius: 999,
          background: 'rgba(255,255,255,0.06)', marginBottom: 16
        }}
      />
      <div style={{ height: 64, width: '60%', borderRadius: 12, background: 'rgba(255,255,255,0.06)' }} />
      <div style={{ height: 18, width: '48%', borderRadius: 8, background: 'rgba(255,255,255,0.06)', marginTop: 12 }} />
      <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', marginTop: 32 }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} style={{ height: 140, borderRadius: 16, background: 'rgba(255,255,255,0.06)' }} />
        ))}
      </div>
    </div>
  );
}
