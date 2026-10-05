import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router';
import { CheckCircle2 } from 'lucide-react';
import {
  BUDGETS, DATEI, KUNDENTYPEN, ZEITRAEUME, pruefeAnfrage, pruefeDatei, sichererName,
  type AnfrageDaten, type AnfrageDatei, type Fehler,
} from '../../../shared/anfrage';
import { LEISTUNGEN_KATALOG, PRODUKTE_KATALOG, istLoesung } from '../../../shared/katalog';
import { Button } from '@/components/ui/Button';
import { Chip, fieldId, FieldMessage, Select, TextArea, TextField } from './Field';
import { FileUpload, type DateiEintrag } from './FileUpload';

type Felder = Omit<AnfrageDaten, 'dateien' | 't'>;
type Status = 'bereit' | 'upload' | 'senden' | 'erfolg';

const leer: Felder = {
  kundentyp: '', loesungen: [], plz: '', ort: '', masse: '', zeitraum: '', budget: '', beschreibung: '',
  name: '', firma: '', email: '', telefon: '', datenschutz: false, website: '',
};

/** Reihenfolge für die Fehlerübersicht (entspricht der Reihenfolge im Formular) */
const REIHENFOLGE: Array<keyof Fehler> = ['kundentyp', 'loesungen', 'plz', 'ort', 'masse', 'zeitraum', 'budget', 'beschreibung', 'dateien', 'name', 'firma', 'email', 'telefon', 'datenschutz'];

const BESCHRIFTUNG: Partial<Record<keyof Fehler, string>> = {
  kundentyp: 'Wer fragt an', loesungen: 'Gewünschte Lösung', plz: 'PLZ', ort: 'Ort', masse: 'Ungefähre Masse', zeitraum: 'Zeitraum',
  budget: 'Budgetrahmen', beschreibung: 'Beschreibung', dateien: 'Fotos und Pläne', name: 'Name', firma: 'Firma', email: 'E-Mail',
  telefon: 'Telefon', datenschutz: 'Datenschutz',
};

/** Ziel für den Sprung aus der Fehlerübersicht */
const ziel = (k: keyof Fehler) => (k === 'kundentyp' || k === 'loesungen' ? `gruppe-${k}` : fieldId(k));

const typVonName = (name: string) =>
  name.toLowerCase().endsWith('.pdf') ? 'application/pdf' : name.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg';

export function InquiryForm() {
  const [d, setD] = useState<Felder>(leer);
  const [files, setFiles] = useState<DateiEintrag[]>([]);
  const [errors, setErrors] = useState<Fehler>({});
  const [status, setStatus] = useState<Status>('bereit');
  const [serverError, setServerError] = useState('');
  const [params] = useSearchParams();
  const startzeit = useRef(Date.now());
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const [showSummary, setShowSummary] = useState(false);

  // Vorauswahl aus der URL (?loesung=…&kundentyp=…). Erst nach dem Laden, damit das vorgerenderte HTML gleich bleibt.
  useEffect(() => {
    const loesung = params.get('loesung');
    const kundentyp = params.get('kundentyp');
    setD((x) => ({
      ...x,
      loesungen: loesung && istLoesung(loesung) && !x.loesungen.includes(loesung) ? [...x.loesungen, loesung] : x.loesungen,
      kundentyp: kundentyp && KUNDENTYPEN.some((k) => k.value === kundentyp) ? kundentyp : x.kundentyp,
    }));
  }, [params]);

  useEffect(() => {
    if (showSummary) summaryRef.current?.focus();
  }, [showSummary, errors]);

  useEffect(() => {
    if (status === 'erfolg') successRef.current?.focus();
  }, [status]);

  const set = <K extends keyof Felder>(k: K, v: Felder[K]) => {
    setD((x) => ({ ...x, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const toggleLoesung = (slug: string) =>
    set('loesungen', d.loesungen.includes(slug) ? d.loesungen.filter((s) => s !== slug) : [...d.loesungen, slug]);

  const addFiles = (neu: File[]) => {
    const meldungen: string[] = [];
    const ok: DateiEintrag[] = [];
    let total = files.reduce((s, f) => s + f.file.size, 0);
    for (const file of neu) {
      const fehler = pruefeDatei(file);
      if (fehler) { meldungen.push(fehler); continue; }
      if (files.length + ok.length >= DATEI.maxAnzahl) { meldungen.push(`Höchstens ${DATEI.maxAnzahl} Dateien.`); break; }
      if (total + file.size > DATEI.maxGesamtBytes) { meldungen.push(`${file.name}: Zusammen wären die Dateien grösser als 25 MB.`); continue; }
      total += file.size;
      ok.push({ id: `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2, 7)}`, file, progress: 0 });
    }
    setFiles((f) => [...f, ...ok]);
    setErrors((e) => ({ ...e, dateien: meldungen.length ? meldungen.join(' ') : undefined }));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === 'upload' || status === 'senden') return;
    setServerError('');

    // Platzhalter-Dateien für die Prüfung (echte Pfade folgen nach dem Upload)
    const vorab: AnfrageDatei[] = files.map((f) => ({ pathname: DATEI.ordner + 'x', name: f.file.name, size: f.file.size, contentType: f.file.type || typVonName(f.file.name) }));
    const fehler = pruefeAnfrage({ ...d, dateien: vorab });
    const aktive = Object.fromEntries(Object.entries(fehler).filter(([, v]) => v)) as Fehler;
    setErrors(aktive);
    if (Object.keys(aktive).length) {
      setShowSummary(true);
      return;
    }
    setShowSummary(false);

    try {
      // 1. Dateien direkt in den privaten Speicher hochladen
      let hochgeladen = files;
      if (files.some((f) => !f.pathname)) {
        setStatus('upload');
        const { upload } = await import('@vercel/blob/client');
        hochgeladen = [];
        for (const f of files) {
          if (f.pathname) { hochgeladen.push(f); continue; }
          const res = await upload(DATEI.ordner + sichererName(f.file.name), f.file, {
            access: 'private',
            handleUploadUrl: '/api/upload',
            contentType: f.file.type || typVonName(f.file.name),
            onUploadProgress: ({ percentage }) => setFiles((all) => all.map((x) => (x.id === f.id ? { ...x, progress: percentage } : x))),
          });
          const done = { ...f, progress: 100, pathname: res.pathname };
          hochgeladen.push(done);
          setFiles((all) => all.map((x) => (x.id === f.id ? done : x)));
        }
      }

      // 2. Anfrage senden
      setStatus('senden');
      const payload: AnfrageDaten = {
        ...d,
        t: startzeit.current,
        dateien: hochgeladen.map((f) => ({ pathname: f.pathname!, name: f.file.name, size: f.file.size, contentType: f.file.type || typVonName(f.file.name) })),
      };
      const res = await fetch('/api/anfrage', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fields?: Fehler };
      if (!res.ok || !data.ok) {
        if (data.fields) {
          setErrors(data.fields);
          setShowSummary(true);
        }
        // Fehlende Dateien beim nächsten Versuch neu hochladen
        if (data.fields?.dateien) setFiles((all) => all.map((x) => ({ ...x, pathname: undefined, progress: 0 })));
        throw new Error(data.error || 'Ihre Anfrage konnte nicht gesendet werden.');
      }
      setStatus('erfolg');
    } catch (err) {
      setStatus('bereit');
      setServerError(err instanceof Error && err.message ? err.message : 'Ihre Anfrage konnte nicht gesendet werden.');
    }
  }

  if (status === 'erfolg') {
    return (
      <div role="status" className="border-l-2 border-gold bg-concrete p-8 sm:p-12">
        <CheckCircle2 aria-hidden strokeWidth={1.25} className="size-10 text-success" />
        <h2 ref={successRef} tabIndex={-1} className="mt-6 text-lg text-steel outline-none sm:text-xl">Vielen Dank für Ihre Anfrage.</h2>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-graphite">
          Ihre Anfrage ist bei uns eingetroffen. Sie erhalten in Kürze eine Bestätigung per E-Mail. Wir melden uns persönlich bei Ihnen.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button to="/" variant="outline-dark" arrow>Zur Startseite</Button>
          <Button to="/produkte" variant="outline-dark">Produkte ansehen</Button>
        </div>
      </div>
    );
  }

  const busy = status === 'upload' || status === 'senden';
  const fehlerListe = REIHENFOLGE.filter((k) => errors[k]);

  return (
    <form onSubmit={onSubmit} noValidate aria-describedby="pflicht-hinweis" className="space-y-14">
      <p id="pflicht-hinweis" className="text-sm text-graphite">
        Felder mit <span className="text-gold-text">*</span> sind Pflichtfelder.
      </p>

      {showSummary && fehlerListe.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="border-l-2 border-error bg-[#fdf3f2] p-6 outline-none">
          <h2 className="text-sm text-error">Bitte prüfen Sie {fehlerListe.length === 1 ? 'ein Feld' : `${fehlerListe.length} Felder`}</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {fehlerListe.map((k) => (
              <li key={k}>
                <a href={`#${ziel(k)}`} className="text-error underline underline-offset-4">
                  {BESCHRIFTUNG[k]}: {errors[k]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 1 Projekt */}
      <fieldset className="space-y-10">
        <legend className="font-display text-sm tracking-[0.12em] text-steel uppercase">
          <span className="mr-3 text-gold-text" aria-hidden>01</span>Ihr Projekt
        </legend>

        <fieldset id="gruppe-kundentyp" tabIndex={-1} aria-describedby={errors.kundentyp ? 'fehler-kundentyp' : undefined} className="outline-none">
          <legend className="mb-3 text-sm font-medium text-steel">
            Wer fragt an? <span className="text-gold-text">*<span className="sr-only"> Pflichtfeld</span></span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {KUNDENTYPEN.map((k) => (
              <Chip key={k.value} type="radio" name="kundentyp" value={k.value} checked={d.kundentyp === k.value} onChange={() => set('kundentyp', k.value)} invalid={!!errors.kundentyp}>
                {k.label}
              </Chip>
            ))}
          </div>
          <FieldMessage name="kundentyp" error={errors.kundentyp} />
        </fieldset>

        <fieldset id="gruppe-loesungen" tabIndex={-1} aria-describedby={errors.loesungen ? 'fehler-loesungen' : 'hinweis-loesungen'} className="outline-none">
          <legend className="mb-1 text-sm font-medium text-steel">
            Gewünschte Lösung <span className="text-gold-text">*<span className="sr-only"> Pflichtfeld</span></span>
          </legend>
          <p id="hinweis-loesungen" className="mb-4 text-sm text-graphite">Mehrfachauswahl möglich.</p>
          <p className="eyebrow mb-3 text-graphite">Leistungen</p>
          <div className="flex flex-wrap gap-2">
            {LEISTUNGEN_KATALOG.map((l) => (
              <Chip key={l.slug} type="checkbox" name="loesungen" value={l.slug} checked={d.loesungen.includes(l.slug)} onChange={() => toggleLoesung(l.slug)} invalid={!!errors.loesungen}>
                {l.label}
              </Chip>
            ))}
          </div>
          <p className="eyebrow mt-6 mb-3 text-graphite">Produkte</p>
          <div className="flex flex-wrap gap-2">
            {PRODUKTE_KATALOG.map((p) => (
              <Chip key={p.slug} type="checkbox" name="loesungen" value={p.slug} checked={d.loesungen.includes(p.slug)} onChange={() => toggleLoesung(p.slug)} invalid={!!errors.loesungen}>
                {p.label}
              </Chip>
            ))}
          </div>
          <FieldMessage name="loesungen" error={errors.loesungen} />
        </fieldset>

        <div className="grid gap-6 sm:grid-cols-[10rem_1fr]">
          <TextField name="plz" label="PLZ" value={d.plz} onChange={(v) => set('plz', v)} error={errors.plz} required autoComplete="postal-code" inputMode="numeric" maxLength={5} />
          <TextField name="ort" label="Ort des Projekts" value={d.ort} onChange={(v) => set('ort', v)} error={errors.ort} required autoComplete="address-level2" maxLength={80} />
        </div>

        <TextField name="masse" label="Ungefähre Masse" value={d.masse} onChange={(v) => set('masse', v)} error={errors.masse} hint="Zum Beispiel: Breite 6 m, Tiefe 4 m" maxLength={200} />

        <div className="grid gap-6 sm:grid-cols-2">
          <Select name="zeitraum" label="Gewünschter Zeitraum" value={d.zeitraum} onChange={(v) => set('zeitraum', v)} options={ZEITRAEUME} error={errors.zeitraum} />
          <Select name="budget" label="Budgetrahmen" value={d.budget} onChange={(v) => set('budget', v)} options={BUDGETS} error={errors.budget} />
        </div>

        <TextArea
          name="beschreibung"
          label="Beschreibung"
          value={d.beschreibung}
          onChange={(v) => set('beschreibung', v)}
          error={errors.beschreibung}
          hint="Was möchten Sie umsetzen? Gebäude, Situation vor Ort, besondere Wünsche."
          required
          maxLength={5000}
        />

        <FileUpload
          files={files}
          onAdd={addFiles}
          onRemove={(id) => {
            setFiles((f) => f.filter((x) => x.id !== id));
            setErrors((e) => ({ ...e, dateien: undefined }));
          }}
          error={errors.dateien}
          disabled={busy}
        />
      </fieldset>

      {/* 2 Kontakt */}
      <fieldset className="space-y-6">
        <legend className="mb-4 font-display text-sm tracking-[0.12em] text-steel uppercase">
          <span className="mr-3 text-gold-text" aria-hidden>02</span>Ihre Kontaktdaten
        </legend>
        <div className="grid gap-6 sm:grid-cols-2">
          <TextField name="name" label="Vorname und Name" value={d.name} onChange={(v) => set('name', v)} error={errors.name} required autoComplete="name" maxLength={100} />
          <TextField name="firma" label="Firma" value={d.firma} onChange={(v) => set('firma', v)} error={errors.firma} autoComplete="organization" maxLength={120} />
          <TextField name="email" label="E-Mail" type="email" value={d.email} onChange={(v) => set('email', v)} error={errors.email} required autoComplete="email" inputMode="email" maxLength={200} />
          <TextField name="telefon" label="Telefon" type="tel" value={d.telefon} onChange={(v) => set('telefon', v)} error={errors.telefon} required autoComplete="tel" inputMode="tel" maxLength={25} />
        </div>

        {/* Honeypot: für Menschen unsichtbar, für Screenreader ausgeblendet */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="feld-website">Website (bitte leer lassen)</label>
          <input id="feld-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={d.website} onChange={(e) => set('website', e.target.value)} />
        </div>

        <div className="pt-4">
          <label className="flex cursor-pointer gap-4">
            <input
              id={fieldId('datenschutz')}
              type="checkbox"
              checked={d.datenschutz}
              onChange={(e) => set('datenschutz', e.target.checked)}
              required
              aria-invalid={errors.datenschutz ? true : undefined}
              aria-describedby={errors.datenschutz ? 'fehler-datenschutz' : undefined}
              className="mt-0.5 size-5 shrink-0 accent-steel"
            />
            <span className="text-sm leading-relaxed text-steel">
              Ich habe die{' '}
              <Link to="/datenschutz" target="_blank" className="text-gold-text underline underline-offset-4">
                Datenschutzerklärung<span className="sr-only"> (öffnet in neuem Tab)</span>
              </Link>{' '}
              gelesen und bin einverstanden, dass meine Angaben zur Bearbeitung der Anfrage verwendet werden.
              <span className="text-gold-text"> *<span className="sr-only"> Pflichtfeld</span></span>
            </span>
          </label>
          <FieldMessage name="datenschutz" error={errors.datenschutz} />
        </div>
      </fieldset>

      <div className="space-y-4 border-t border-line pt-10">
        {serverError && (
          <p role="alert" className="border-l-2 border-error bg-[#fdf3f2] p-4 text-sm text-error">
            {serverError}
          </p>
        )}
        <button
          type="submit"
          disabled={busy}
          className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-sm border border-gold bg-gold px-8 font-display text-xs tracking-[0.16em] text-steel uppercase transition-colors hover:bg-[#e4b675] disabled:cursor-wait disabled:opacity-70 sm:w-auto"
        >
          {status === 'upload' ? 'Dateien werden hochgeladen …' : status === 'senden' ? 'Anfrage wird gesendet …' : 'Anfrage senden'}
        </button>
        <p className="sr-only" aria-live="polite">
          {status === 'upload' ? 'Dateien werden hochgeladen.' : status === 'senden' ? 'Anfrage wird gesendet.' : ''}
        </p>
      </div>
    </form>
  );
}
