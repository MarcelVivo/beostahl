import { Mail, MapPin, Phone, Clock } from 'lucide-react';
import { Seo } from '@/seo/Seo';
import { JsonLd, localBusiness } from '@/seo/JsonLd';
import { site } from '@/data/site';
import { PageHeader } from '@/components/sections/PageHeader';
import { Button } from '@/components/ui/Button';
import { MountainSilhouette } from '@/components/ui/MountainSilhouette';

export function KontaktPage() {
  const items = [
    { icon: MapPin, label: 'Adresse', value: <>{site.name}<br />{site.address.street}<br />{site.address.zip} {site.address.city}</> },
    { icon: Phone, label: 'Telefon', value: site.phoneHref ? <a href={site.phoneHref} className="underline decoration-gold underline-offset-4 hover:text-gold-text">{site.phone}</a> : site.phone },
    { icon: Mail, label: 'E-Mail', value: site.emailHref ? <a href={site.emailHref} className="underline decoration-gold underline-offset-4 hover:text-gold-text">{site.email}</a> : site.email },
    { icon: Clock, label: 'Erreichbarkeit', value: '[ÖFFNUNGSZEITEN]' },
  ];
  return (
    <>
      <Seo title="Kontakt" description="Kontakt zu BEO Stahl & Glasbau im Berner Oberland. Telefon, E-Mail und Adresse für Ihre Fragen zu Stahlbau, Glasbau und Solar." />
      <JsonLd data={localBusiness()} />
      <PageHeader
        crumbs={[{ label: 'Kontakt', to: '/kontakt' }]}
        eyebrow="Kontakt"
        title="Wir sind für Sie da."
        intro="Für eine konkrete Projektanfrage nutzen Sie am besten unser Formular. Für alle anderen Fragen erreichen Sie uns direkt."
      />
      <section aria-labelledby="kontakt-title" className="section on-light">
        <div className="container-site grid gap-12 lg:grid-cols-[7fr_5fr] lg:gap-20">
          <div>
            <h2 id="kontakt-title" className="text-lg text-steel sm:text-xl">Kontaktdaten</h2>
            <span aria-hidden className="gold-rule mt-6" />
            <dl className="mt-10 grid gap-px overflow-hidden bg-line ring-1 ring-line sm:grid-cols-2">
              {items.map((it) => (
                <div key={it.label} className="bg-white p-6">
                  <dt className="eyebrow flex items-center gap-3 text-graphite">
                    <it.icon aria-hidden strokeWidth={1.25} className="size-5 text-gold-text" />
                    {it.label}
                  </dt>
                  <dd className="mt-3 pl-8 leading-relaxed text-steel">{it.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <aside aria-labelledby="anfrage-teaser" className="relative isolate overflow-hidden bg-steel p-8 text-white sm:p-10">
            <MountainSilhouette label={false} className="absolute inset-x-0 bottom-0 -z-10 h-20 text-steel-900" />
            <p className="eyebrow text-gold">Projekt anfragen</p>
            <h2 id="anfrage-teaser" className="mt-4 text-lg">Ihr Projekt in wenigen Minuten beschrieben.</h2>
            <p className="mt-4 leading-relaxed text-white/75">Wählen Sie die gewünschte Lösung, laden Sie Fotos oder Pläne hoch. Wir melden uns persönlich.</p>
            <Button to="/anfrage" arrow className="mt-8 mb-12">Zum Anfrageformular</Button>
          </aside>
        </div>
      </section>
    </>
  );
}
