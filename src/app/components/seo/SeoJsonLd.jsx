'use client';
import site from '@/app/config/site';

export default function SeoJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${site.url}#person`,
        name: 'Islam El Mrabet',
        url: site.url,
        jobTitle: 'Desarrollador Full-stack',
        description: site.description,
        sameAs: [
          // añade perfiles si quieres
          // 'https://github.com/usuario',
          // 'https://www.linkedin.com/in/usuario/'
        ]
      },
      {
        '@type': 'WebSite',
        '@id': `${site.url}#website`,
        url: site.url,
        name: site.name,
        inLanguage: site.locale
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
