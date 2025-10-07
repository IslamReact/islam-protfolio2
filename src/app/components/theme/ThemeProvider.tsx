// src/app/components/theme/ThemeProvider.tsx
'use client';

import { useEffect, useLayoutEffect, useState } from 'react';

type ThemeMode = 'light' | 'dark' | 'system';
const THEME_KEY = 'theme';

declare global {
  interface Window {
    __setTheme?: (t: ThemeMode) => void; // debug opcional
  }
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  // 1) Dark por defecto + lee preferencia guardada
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return 'dark';
    const saved = window.localStorage.getItem(THEME_KEY) as ThemeMode | null;
    return saved === 'light' || saved === 'dark' || saved === 'system' ? saved : 'dark';
  });

  // 2) Detecta preferencia del SO
  const [osDark, setOsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e: MediaQueryListEvent) => setOsDark(e.matches);
    mql.addEventListener?.('change', onChange);
    return () => mql.removeEventListener?.('change', onChange);
  }, []);

  // 3) Tema efectivo (system -> light/dark según SO)
  const effective: Exclude<ThemeMode, 'system'> = theme === 'system' ? (osDark ? 'dark' : 'light') : theme;

  // 4) Aplica ANTES de pintar para reducir flash
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', effective);
    root.classList.toggle('dark', effective === 'dark'); // por si usas .dark en CSS
  }, [effective]);

  // 5) Persiste preferencia
  useEffect(() => {
    try { window.localStorage.setItem(THEME_KEY, theme); } catch {}
  }, [theme]);

  // 6) (Opcional) Exponer setter en window para toggles externos/debug
  useEffect(() => {
    window.__setTheme = setTheme;
    return () => { delete window.__setTheme; };
  }, []);

  return <>{children}</>;
}