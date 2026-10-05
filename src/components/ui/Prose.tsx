import type { ReactNode } from 'react';

/** Fliesstext-Container für Rechtstexte. */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-3xl text-graphite [&_a]:text-gold-text [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-14 [&_h2]:mb-5 [&_h2]:text-base [&_h2]:text-steel [&_h2]:sm:text-lg [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-[0.8125rem] [&_h3]:text-steel [&_li]:mt-2 [&_p]:mt-4 [&_p]:leading-relaxed [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6">
      {children}
    </div>
  );
}
