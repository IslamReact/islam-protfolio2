import site from '@/app/config/site';

export default function robots() {
  const base = site.url.replace(/\/$/, '');
  return {
    rules: {
      userAgent: '*',
      allow: '/'
    },
    sitemap: `${base}/sitemap.xml`
  };
}
