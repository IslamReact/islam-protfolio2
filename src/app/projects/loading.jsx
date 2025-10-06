import Container from '@/app/components/layout/container';

export default function ProjectLoading() {
  return (
    <section className="section" style={{ paddingTop: '3.5rem' }}>
      <Container>
        <div style={{ height: 40, width: '50%', borderRadius: 12, background: 'rgba(255,255,255,0.06)' }} />
        <div style={{ height: 16, width: '70%', borderRadius: 8, background: 'rgba(255,255,255,0.06)', marginTop: 12 }} />

        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} style={{ width: 80, height: 28, borderRadius: 8, background: 'rgba(255,255,255,0.06)' }} />
          ))}
        </div>

        <div style={{ height: 360, borderRadius: 16, background: 'rgba(255,255,255,0.06)', marginTop: 24 }} />
      </Container>
    </section>
  );
}
