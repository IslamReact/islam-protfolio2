'use client';

import { useEffect, useRef } from 'react';

const NODES = [
  { id: 'Islam.AI', weight: 1.4 },
  { id: 'React', weight: 1.0 },
  { id: 'FastAPI', weight: 0.9 },
  { id: 'SQL', weight: 1.1 },
  { id: 'SINA', weight: 0.9 },
  { id: 'Automations', weight: 1.0 },
  { id: 'Design', weight: 0.8 },
  { id: 'Next.js', weight: 0.9 },
  { id: 'Tailwind', weight: 0.8 },
  { id: 'PostgreSQL', weight: 0.85 },
  { id: 'SQL Server', weight: 0.85 },
];

const LINKS: [number, number][] = [
  [0,1],[0,2],[0,3],[0,6],
  [1,7],[1,8],
  [2,3],
  [3,9],[3,10],
  [4,3],[4,5],
  [5,1],[5,2],
  [6,1],
];

export default function SkillGraph() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = 340);
    let mounted = true;

    const onResize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = 340;
    };

    const nodes = NODES.map((n, i) => ({
      ...n,
      x: Math.cos((i / NODES.length) * Math.PI * 2) * (w * 0.28) + w / 2,
      y: Math.sin((i / NODES.length) * Math.PI * 2) * (h * 0.28) + h / 2,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }));

    const loop = () => {
      ctx.clearRect(0, 0, w, h);

      // Links
      ctx.lineWidth = 1;
      for (const [a, b] of LINKS) {
        const A = nodes[a], B = nodes[b];
        ctx.strokeStyle = 'rgba(6,182,212,0.18)';
        ctx.beginPath();
        ctx.moveTo(A.x, A.y);
        ctx.lineTo(B.x, B.y);
        ctx.stroke();
      }

      // Nodes
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 40 || n.x > w - 40) n.vx *= -1;
        if (n.y < 40 || n.y > h - 40) n.vy *= -1;

        const r = 6 + n.weight * 6;
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 2.2);
        g.addColorStop(0, 'rgba(124,58,237,0.5)');
        g.addColorStop(1, 'rgba(255,255,255,0.0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.font = '12px ui-monospace, SFMono-Regular, Menlo, Monaco';
        ctx.textAlign = 'center';
        ctx.fillText(n.id, n.x, n.y - (r + 8));
      }

      if (mounted) raf.current = requestAnimationFrame(loop);
    };

    const ro = new ResizeObserver(onResize);
    ro.observe(canvas);
    loop();

    return () => {
      mounted = false;
      if (raf.current) cancelAnimationFrame(raf.current);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="neon-card" style={{ padding: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 8 }}>
        <div>
          <div
            style={{
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              fontSize: 12,
              color: 'rgba(6, 182, 212, 0.8)',
              marginBottom: 4,
            }}
          >
            Mapa mental
          </div>
          <h2 style={{ fontWeight: 700, fontSize: 20 }}>Tecnologías conectadas</h2>
        </div>
        <span className="grad-main" style={{ fontWeight: 700 }}>Islam.AI</span>
      </div>
      <canvas ref={ref} style={{ width: '100%', height: 340, borderRadius: 12 }} />
    </div>
  );
}
