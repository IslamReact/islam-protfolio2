import site from '@/app/config/site';

export default async function sitemap() {
  const base = site.url.replace(/\/$/, '');

  const staticRoutes = [
    { url: `${base}/`, changefreq: 'weekly', priority: 0.9 },
    { url: `${base}/about`, changefreq: 'monthly', priority: 0.6 },
    { url: `${base}/uses`, changefreq: 'monthly', priority: 0.6 },
    { url: `${base}/#proyectos`, changefreq: 'weekly', priority: 0.8 },
    { url: `${base}/#contacto`, changefreq: 'monthly', priority: 0.5 },
    { url: `${base}/gear`, changefreq: 'monthly', priority: 0.5 }
  ];

  const projects = getAllProjects().map((p) => ({
    url: `${base}/proyectos/${p.slug}`,
    changefreq: 'monthly',
    priority: 0.7
  }));

  return [...staticRoutes, ...projects];
}
