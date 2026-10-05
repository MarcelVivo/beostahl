/** Kleines Schweizer Kreuz. Rein dekorativ, ausser ein label wird gesetzt. */
export function SwissCross({ className = 'size-5', label }: { className?: string; label?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      <rect width="32" height="32" rx="2" fill="#D52B1E" />
      <path d="M13 6h6v7h7v6h-7v7h-6v-7H6v-6h7z" fill="#fff" />
    </svg>
  );
}
