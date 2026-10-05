import type { ReactNode } from 'react';
import { Breadcrumbs, type Crumb } from '@/components/ui/Breadcrumbs';

interface Props {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  crumbs: Crumb[];
}

/** Kompakter dunkler Seitenkopf ohne Bild, für Formular, Kontakt und Rechtliches. */
export function PageHeader({ eyebrow, title, intro, crumbs }: Props) {
  return (
    <section className="bg-steel text-white">
      <div className="container-site pt-10 pb-16 lg:pt-14 lg:pb-20">
        <Breadcrumbs items={crumbs} />
        <div className="mt-12 max-w-3xl lg:mt-16">
          {eyebrow && <p className="eyebrow mb-6 text-gold">{eyebrow}</p>}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl">{title}</h1>
          <span aria-hidden className="gold-rule mt-8 w-24" />
          {intro && <div className="mt-8 max-w-2xl text-lg leading-relaxed text-white/80">{intro}</div>}
        </div>
      </div>
    </section>
  );
}
