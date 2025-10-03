import { ImageResponse } from 'next/og';

// 1200x630 recomendado por OG
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get('title') || 'Islam El Mrabet').slice(0, 100);
  const desc  = (searchParams.get('desc')  || 'Full-Stack & Automation').slice(0, 200);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '48px',
          background: 'linear-gradient(135deg, #0b0b0f 0%, #141422 60%, #0a2730 100%)',
          color: 'white',
          fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu'
        }}
      >
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: 16,
            backgroundImage: 'linear-gradient(90deg, #7c3aed, #06b6d4)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent'
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: 28, opacity: 0.9, maxWidth: '1000px' }}>
          {desc}
        </div>
        <div style={{ marginTop: 'auto', fontSize: 18, opacity: 0.8 }}>
          islamelmrabet • portfolio
        </div>
      </div>
    ),
    { ...size }
  );
}
