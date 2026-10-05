import { useState } from 'react';
import { FileText, FileImage, Upload, X } from 'lucide-react';
import { DATEI } from '../../../shared/anfrage';
import { cx } from '@/lib';
import { aria, FieldMessage } from './Field';

export interface DateiEintrag {
  id: string;
  file: File;
  progress: number;
  /** Pfad im Speicher, sobald hochgeladen */
  pathname?: string;
}

const mb = (b: number) => `${(b / 1024 / 1024).toFixed(1).replace('.', '.')} MB`;

interface Props {
  files: DateiEintrag[];
  onAdd: (files: File[]) => void;
  onRemove: (id: string) => void;
  error?: string;
  disabled?: boolean;
}

/** Datei-Auswahl mit Drag-and-drop. Prüfung und Upload übernimmt das Formular. */
export function FileUpload({ files, onAdd, onRemove, error, disabled }: Props) {
  const [drag, setDrag] = useState(false);
  const hint = `JPG, PNG oder PDF, bis 10 MB je Datei, höchstens ${DATEI.maxAnzahl} Dateien und 25 MB insgesamt.`;
  return (
    <div>
      <p className="mb-2 block text-sm font-medium text-steel">
        Fotos und Pläne <span className="font-normal text-graphite">(optional)</span>
      </p>
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          if (!disabled) onAdd(Array.from(e.dataTransfer.files));
        }}
        className={cx(
          'flex cursor-pointer flex-col items-center justify-center gap-3 rounded-sm border border-dashed px-6 py-10 text-center transition-colors',
          'has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold-text',
          drag ? 'border-gold-text bg-concrete' : 'border-graphite/40 bg-white hover:border-steel',
          error && 'border-error',
        )}
      >
        <Upload aria-hidden strokeWidth={1.25} className="size-8 text-gold-text" />
        <span className="text-steel">
          <span className="font-medium underline decoration-gold underline-offset-4">Dateien auswählen</span> oder hierher ziehen
        </span>
        <input
          {...aria('dateien', error, hint)}
          type="file"
          multiple
          disabled={disabled}
          accept={[...DATEI.endungen, ...DATEI.typen].join(',')}
          onChange={(e) => {
            onAdd(Array.from(e.target.files ?? []));
            e.target.value = '';
          }}
          className="sr-only"
        />
      </label>
      <FieldMessage name="dateien" error={error} hint={hint} />
      {files.length > 0 && (
        <ul className="mt-4 divide-y divide-line border border-line" aria-label="Ausgewählte Dateien">
          {files.map((f) => {
            const Icon = f.file.type === 'application/pdf' ? FileText : FileImage;
            return (
              <li key={f.id} className="flex items-center gap-4 px-4 py-3">
                <Icon aria-hidden strokeWidth={1.25} className="size-5 shrink-0 text-gold-text" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-steel">{f.file.name}</p>
                  <p className="text-xs text-graphite">
                    {mb(f.file.size)}
                    {f.pathname ? ' · hochgeladen' : f.progress > 0 ? ` · ${Math.round(f.progress)} %` : ''}
                  </p>
                  {f.progress > 0 && !f.pathname && (
                    <div className="mt-2 h-0.5 bg-line" aria-hidden>
                      <div className="h-full bg-gold" style={{ width: `${f.progress}%` }} />
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => onRemove(f.id)}
                  disabled={disabled}
                  className="inline-flex size-11 shrink-0 items-center justify-center text-graphite hover:text-error disabled:opacity-40"
                >
                  <X aria-hidden strokeWidth={1.5} className="size-5" />
                  <span className="sr-only">{f.file.name} entfernen</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
