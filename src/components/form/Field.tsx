import type { ReactNode } from 'react';
import { cx } from '@/lib';

export const fieldId = (name: string) => `feld-${name}`;
const errId = (name: string) => `fehler-${name}`;
const hintId = (name: string) => `hinweis-${name}`;

/** Gemeinsame ARIA-Attribute für Eingabefelder */
export function aria(name: string, error?: string, hint?: string) {
  return {
    id: fieldId(name),
    name,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': [error && errId(name), hint && hintId(name)].filter(Boolean).join(' ') || undefined,
  } as const;
}

export function Label({ htmlFor, children, required }: { htmlFor: string; children: ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-steel">
      {children}
      {required ? (
        <span className="text-gold-text"> *<span className="sr-only"> Pflichtfeld</span></span>
      ) : (
        <span className="font-normal text-graphite"> (optional)</span>
      )}
    </label>
  );
}

export function FieldMessage({ name, error, hint }: { name: string; error?: string; hint?: string }) {
  return (
    <>
      {hint && <p id={hintId(name)} className="mt-2 text-sm text-graphite">{hint}</p>}
      {error && <p id={errId(name)} className="mt-2 text-sm font-medium text-error">{error}</p>}
    </>
  );
}

interface TextProps {
  name: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  hint?: string;
  required?: boolean;
  type?: 'text' | 'email' | 'tel';
  autoComplete?: string;
  inputMode?: 'numeric' | 'text' | 'email' | 'tel';
  maxLength?: number;
  className?: string;
}

export function TextField({ name, label, value, onChange, error, hint, required, type = 'text', autoComplete, inputMode, maxLength, className }: TextProps) {
  return (
    <div className={className}>
      <Label htmlFor={fieldId(name)} required={required}>{label}</Label>
      <input
        {...aria(name, error, hint)}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        maxLength={maxLength}
        className="field-input"
      />
      <FieldMessage name={name} error={error} hint={hint} />
    </div>
  );
}

export function TextArea({ name, label, value, onChange, error, hint, required, maxLength }: Omit<TextProps, 'type'>) {
  return (
    <div>
      <Label htmlFor={fieldId(name)} required={required}>{label}</Label>
      <textarea
        {...aria(name, error, hint)}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        rows={6}
        maxLength={maxLength}
        className="field-input resize-y"
      />
      <FieldMessage name={name} error={error} hint={hint} />
    </div>
  );
}

export function Select({ name, label, value, onChange, options, error }: { name: string; label: string; value: string; onChange: (v: string) => void; options: readonly string[]; error?: string }) {
  return (
    <div>
      <Label htmlFor={fieldId(name)}>{label}</Label>
      <select {...aria(name, error)} value={value} onChange={(e) => onChange(e.target.value)} className="field-input appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%233A3F45' stroke-width='1.5'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")" }}>
        <option value="">Bitte wählen</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <FieldMessage name={name} error={error} />
    </div>
  );
}

/** Auswahl-Chip für Checkbox oder Radio. Das echte Eingabefeld bleibt für Tastatur und Screenreader erhalten. */
export function Chip({ type, name, value, checked, onChange, children, invalid }: { type: 'checkbox' | 'radio'; name: string; value: string; checked: boolean; onChange: () => void; children: ReactNode; invalid?: boolean }) {
  return (
    <label className="relative inline-flex cursor-pointer">
      <input type={type} name={name} value={value} checked={checked} onChange={onChange} aria-invalid={invalid || undefined} className="peer sr-only" />
      <span
        className={cx(
          'inline-flex min-h-11 items-center rounded-sm border px-4 py-2 text-sm transition-colors',
          'border-graphite/40 bg-white text-steel hover:border-steel',
          'peer-checked:border-steel peer-checked:bg-steel peer-checked:text-white',
          'peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold-text',
        )}
      >
        {children}
      </span>
    </label>
  );
}
