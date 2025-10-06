// src/app/sitemap.js
import site from '@/app/config/site';

export default function sitemap() {
  const base = (site.url || '').replace(/\/$/, '');
  const now = new Date();

  return [
    { url: `${base}/`,         lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/about`,    lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/uses`,     lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/projects`, lastModified: now, changeFrequency: 'weekly',  priority: 0.8 }, // ✅ sin #proyectos
    { url: `${base}/gear`,     lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/contact`,  lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ];
}