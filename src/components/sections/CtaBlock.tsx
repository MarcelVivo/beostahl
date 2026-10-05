import { site } from '@/data/site';
import { Button } from '@/components/ui/Button';
import { MountainSilhouette } from '@/components/ui/MountainSilhouette';
import { Reveal } from '@/components/ui/Reveal';

interface Props {
  title?: string;
  text?: string;
  /** Vorauswahl im Anfrageformular, z. B. Produkt-Slug */
  preselect?: string;
}

/** Abschluss-Block mit Anfrage-Button. Auf allen Seiten gleich aufgebaut. */
export function CtaBlock({
  title = 'Erzählen Sie uns von Ihrem Projekt.',
  text = 'Beschreiben Sie Ihr Vorhaben, laden Sie Fotos oder Pläne hoch. Wir melden uns persönlich bei Ihnen.',
  preselect,
}: Props) {
  return (
    <section aria-labelledby="cta-title" className="relative isolate overflow-hidden bg-steel text-white">
      <MountainSilhouette label={false} className="absolute inset-x-0 bottom-0 -z-10 h-28 text-steel-900/60 sm:h-40" />
      <div className="container-site py-20 lg:py-28">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow mb-5 text-gold">Projekt anfragen</p>
          <h2 id="cta-title" className="text-xl sm:text-2xl lg:text-3xl">
            {title}
          </h2>
          <span aria-hidden className="gold-rule mx-auto mt-6" />
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/75">{text}</p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Button to={preselect ? `/anfrage?loesung=${preselect}` : '/anfrage'} arrow>
              Projekt anfragen
            </Button>
            <Button to={site.phoneHref || '/kontakt'} variant="outline-light">
              {site.phoneHref ? `Anrufen: ${site.phone}` : 'Kontakt aufnehmen'}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
