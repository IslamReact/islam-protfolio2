import Header from '@/app/components/layout/header';
import Footer from '@/app/components/layout/footer';
import ContactForm from '@/app/components/neo/contact/ContactForm';

export const metadata = {
  title: 'Contacto · Islam El Mrabet',
  description: 'Hablemos de tu proyecto: tiempos, alcance y objetivos.'
};

type SP = Record<string, string | string[] | undefined>;
type MaybePromise<T> = T | Promise<T>;

export default async function ContactPage({
  searchParams,
}: {
  searchParams: MaybePromise<SP>;
}) {
  // ✅ compatible: objeto o Promise
  const sp = await Promise.resolve(searchParams);

  const raw = sp?.prompt;
  const prompt =
    typeof raw === 'string' ? raw : Array.isArray(raw) ? raw[0] ?? '' : '';

  return (
    <>
      <Header />
      <main id="main-content">
        <section className="container-base" style={{ padding: '18px 0 32px' }}>
          <ContactForm initialPrompt={prompt} />
        </section>
      </main>
      <Footer />
    </>
  );
}