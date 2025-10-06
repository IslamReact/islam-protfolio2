'use client';
import { useEffect, useState } from 'react';

const THEME_KEY = 'theme'; // 'light' | 'dark' | 'system'

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('system');

  useEffect(() => {
    // 1) lee preferencia guardada
    const saved = typeof window !== 'undefined' ? localStorage.getItem(THEME_KEY) : null;
    const initial = saved || 'system';
    setTheme(initial);
  }, []);

  useEffect(() => {
    // 2) aplica en <html data-theme="">
    const root = document.documentElement;
    if (theme === 'system') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', theme);
    }
    // 3) guarda
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  // Exponemos setter en window (por si quieres debug)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.__setTheme = setTheme;
    }
  }, []);

  return children;
}
