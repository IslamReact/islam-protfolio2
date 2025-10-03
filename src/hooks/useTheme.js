import { useEffect, useState } from 'react';

export default function useTheme() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const prefers = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefers) document.documentElement.classList.add('dark');
    setDark(prefers);
  }, []);
  const toggle = () => {
    const el = document.documentElement;
    el.classList.toggle('dark');
    setDark(el.classList.contains('dark'));
  };
  return { dark, toggle };
}
