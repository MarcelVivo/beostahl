import { Seo } from '@/seo/Seo';
import { site } from '@/data/site';
import { PageHeader } from '@/components/sections/PageHeader';
import { InquiryForm } from '@/components/form/InquiryForm';
import { nr } from '@/lib';

const naechsteSchritte = [
  { title: 'Wir prüfen Ihre Anfrage', text: 'Mit Ihren Angaben, Fotos und Plänen verschaffen wir uns einen ersten Überblick.' },
  { title: 'Wir melden uns persönlich', text: 'Wir klären offene Fragen und besprechen das weitere Vorgehen.' },
  { title: 'Beratung und Besichtigung', text: 'Vor Ort sehen wir uns die Situation an und nehmen die Masse auf.' },
];

export function AnfragePage() {
  return (
    <>
      <Seo
        title="Projekt anfragen"
        description="Beschreiben Sie Ihr Projekt: Solar-Carport, Wintergarten, Anbaubalkon, Ganzglasgeländer oder Lärmschutz. Mit Foto- und Plan-Upload. BEO Stahl & Glasbau meldet sich persönlich."
      />
      <PageHeader
        crumbs={[{ label: 'Projekt anfragen', to: '/anfrage' }]}
        eyebrow="Projekt anfragen"
        title="Erzählen Sie uns von Ihrem Projekt."
        intro="Je genauer Ihre Angaben, desto gezielter können wir Sie beraten. Fotos der Situation oder Pläne helfen uns besonders."
      />
      <section className="section on-light">
        <div className="container-site grid gap-16 lg:grid-cols-[8fr_4fr] lg:gap-20">
          <InquiryForm />
          <aside aria-labelledby="schritte-title" className="lg:sticky lg:top-32 lg:self-start">
            <h2 id="schritte-title" className="eyebrow text-gold-text">So geht es weiter</h2>
            <ol className="mt-6 space-y-6 border-l border-gold pl-6">
              {naechsteSchritte.map((s, i) => (
                <li key={s.title}>
                  <p className="font-display text-xs text-gold-text" aria-hidden>{nr(i + 1)}</p>
                  <h3 className="mt-1 text-[0.75rem] text-steel">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-graphite">{s.text}</p>
                </li>
              ))}
            </ol>
            <div className="mt-10 bg-concrete p-6 text-sm leading-relaxed text-graphite">
              <p className="eyebrow mb-3 text-steel">Lieber direkt?</p>
              <p>
                {site.phoneHref ? <a href={site.phoneHref} className="text-gold-text underline underline-offset-4">{site.phone}</a> : site.phone}
                <br />
                {site.emailHref ? <a href={site.emailHref} className="text-gold-text underline underline-offset-4">{site.email}</a> : site.email}
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
