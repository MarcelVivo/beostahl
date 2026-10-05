import { Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

const privat = ['Carports und Solar-Carports', 'Wintergärten und Terrassenüberdachungen', 'Anbaubalkone und Geländer', 'Vordächer, Treppen, Sichtschutz'];
const partner = ['Planungsunterstützung', 'Serienlösungen wie das Balcony M3 System', 'Projektkoordination aus einer Hand', 'Technische Unterlagen auf Anfrage'];

/** Zwei Einstiege: Privatkunden und Fachpartner. */
export function AudienceSplit() {
  return (
    <div className="grid lg:grid-cols-2 [&>*]:min-w-0">
      <Reveal className="bg-concrete p-8 sm:p-12 lg:p-16">
        <p className="eyebrow text-gold-text">Für Privatkunden</p>
        <h3 className="mt-5 text-lg text-steel sm:text-xl">Mehr Wert für Ihr Zuhause</h3>
        <p className="mt-5 max-w-md leading-relaxed text-graphite">
          Für Hauseigentümer, die Aussenraum, Wohnraum und Energie verbinden möchten. Individuell geplant, passend zu Ihrem Haus.
        </p>
        <ul className="mt-8 space-y-3">
          {privat.map((t) => (
            <li key={t} className="flex gap-3 text-steel">
              <Check aria-hidden strokeWidth={1.5} className="mt-0.5 size-5 shrink-0 text-gold-text" />
              {t}
            </li>
          ))}
        </ul>
        <Button to="/privatkunden" variant="outline-dark" arrow className="mt-10">
          Lösungen für Privatkunden
        </Button>
      </Reveal>
      <Reveal className="bg-graphite p-8 text-white sm:p-12 lg:p-16" delay={100}>
        <p className="eyebrow text-gold">Für Fachpartner</p>
        <h3 className="mt-5 text-lg sm:text-xl">Ein Partner für Stahl, Glas und Solar</h3>
        <p className="mt-5 max-w-md leading-relaxed text-white/75">
          Für Architekten, Generalunternehmen, Immobilienverwaltungen, Hotels, Gewerbe, Gemeinden und Wohnbaugesellschaften.
        </p>
        <ul className="mt-8 space-y-3">
          {partner.map((t) => (
            <li key={t} className="flex gap-3">
              <Check aria-hidden strokeWidth={1.5} className="mt-0.5 size-5 shrink-0 text-gold" />
              {t}
            </li>
          ))}
        </ul>
        <Button to="/fachpartner" variant="outline-light" arrow className="mt-10">
          Lösungen für Fachpartner
        </Button>
      </Reveal>
    </div>
  );
}
