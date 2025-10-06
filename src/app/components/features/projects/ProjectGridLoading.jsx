export default function ProjectGridLoading({ count = 6 }) {
  return (
    <div
      style={{ display: 'grid', gap: '1.5rem' }}
      className="sm:grid-cols-2 lg:grid-cols-3 grid"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="card-3d"
          style={{
            height: '260px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '1rem',
            border: '1px solid rgba(255,255,255,0.08)',
            animation: 'pulse 1.5s infinite ease-in-out',
          }}
        >
          <div
            style={{
              width: '70%',
              height: '20px',
              background: 'rgba(255,255,255,0.08)',
              borderRadius: '8px',
              margin: '1.25rem auto 0.5rem auto',
            }}
          />
          <div
            style={{
              width: '85%',
              height: '14px',
              background: 'rgba(255,255,255,0.06)',
              borderRadius: '8px',
              margin: '0 auto',
            }}
          />
          <div
            style={{
              width: '60%',
              height: '14px',
              background: 'rgba(255,255,255,0.06)',
              borderRadius: '8px',
              margin: '0.75rem auto 0',
            }}
          />
        </div>
      ))}
    </div>
  );
}
