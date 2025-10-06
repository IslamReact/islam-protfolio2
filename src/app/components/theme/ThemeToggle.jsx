'use client';
import { useEffect, useState } from 'react';

const THEME_KEY = 'theme';

export default function ThemeToggle() {
  const [mode, setMode] = useState('system'); // 'light' | 'dark' | 'system'

  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY) || 'system';
    setMode(saved);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (mode === 'system') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', mode);
    }
    localStorage.setItem(THEME_KEY, mode);
  }, [mode]);

  return (
    <div style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
      <button
        type="button"
        aria-label="Tema claro"
        onClick={() => setMode('light')}
        className="kbd"
        style={{ opacity: mode === 'light' ? 1 : 0.7 }}
      >
        ☀️
      </button>
      <button
        type="button"
        aria-label="Tema del sistema"
        onClick={() => setMode('system')}
        className="kbd"
        style={{ opacity: mode === 'system' ? 1 : 0.7 }}
      >
        🖥️
      </button>
      <button
        type="button"
        aria-label="Tema oscuro"
        onClick={() => setMode('dark')}
        className="kbd"
        style={{ opacity: mode === 'dark' ? 1 : 0.7 }}
      >
        🌙
      </button>
    </div>
  );
}
