import site from '@/app/config/site';

export default function Footer() {
  return (
    <footer className="border-t border-black/5 dark:border-white/10">
      <div className="container-base py-10 text-sm flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <nav className="flex gap-4 opacity-80">
          <a href={site.author.links.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={site.author.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={site.author.links.email}>Email</a>
        </nav>
      </div>
    </footer>
  );
}
