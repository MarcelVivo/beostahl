import { Seo } from '@/seo/Seo';
import { Button } from '@/components/ui/Button';

export function NotFoundPage() {
  return (
    <>
      <Seo title="Seite nicht gefunden" description="Diese Seite existiert nicht oder wurde verschoben." />
      <meta name="robots" content="noindex" />
      <section className="bg-steel text-white">
        <div className="container-site py-32 lg:py-40">
          <p className="eyebrow text-gold">Fehler 404</p>
          <h1 className="mt-6 text-2xl sm:text-3xl">Diese Seite gibt es nicht.</h1>
          <span aria-hidden className="gold-rule mt-8" />
          <p className="mt-8 max-w-xl text-lg text-white/75">Vielleicht wurde sie verschoben. Von hier aus finden Sie weiter:</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button to="/" arrow>Zur Startseite</Button>
            <Button to="/leistungen" variant="outline-light">Leistungen</Button>
          </div>
        </div>
      </section>
    </>
  );
}
