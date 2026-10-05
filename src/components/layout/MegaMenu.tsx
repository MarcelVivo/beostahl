import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { leistungen, leistungsGruppen } from '@/data/leistungen';

interface Props {
  id: string;
  onNavigate: () => void;
}

/** Aufklappbares Panel mit allen Leistungen, nach Gruppen geordnet. */
export function MegaMenu({ id, onNavigate }: Props) {
  return (
    <div id={id} className="absolute inset-x-0 top-full border-t border-white/10 bg-steel-900 shadow-2xl">
      <div className="container-site grid grid-cols-4 gap-10 py-12">
        {leistungsGruppen.map((gruppe) => (
          <div key={gruppe}>
            <p className="eyebrow mb-5 text-gold">{gruppe}</p>
            <ul className="space-y-1">
              {leistungen
                .filter((l) => l.group === gruppe)
                .map((l) => (
                  <li key={l.slug}>
                    <Link
                      to={`/leistungen/${l.slug}`}
                      onClick={onNavigate}
                      className="group flex items-start gap-3 rounded-sm py-2 text-[0.9375rem] text-white/80 transition-colors hover:text-white"
                    >
                      <l.icon aria-hidden strokeWidth={1.5} className="mt-0.5 size-4 shrink-0 text-gold/80 group-hover:text-gold" />
                      <span>{l.title}</span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="container-site flex items-center justify-between py-5">
          <p className="text-sm text-white/70">Stahl. Glas. Solar. Von der Idee bis zur Montage.</p>
          <Link
            to="/leistungen"
            onClick={onNavigate}
            className="group inline-flex items-center gap-2 font-display text-[0.6875rem] tracking-[0.16em] text-gold uppercase"
          >
            Alle Leistungen im Überblick
            <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </div>
  );
}
