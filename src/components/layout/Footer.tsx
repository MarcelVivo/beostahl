import { Link } from 'react-router';
import { leistungen } from '@/data/leistungen';
import { produkte } from '@/data/produkte';
import { site } from '@/data/site';
import { MountainSilhouette } from '@/components/ui/MountainSilhouette';
import { SwissCross } from '@/components/ui/SwissCross';
import { Logo } from '@/components/ui/Logo';

const linkCls = 'inline-flex min-h-8 items-center text-sm text-white/70 transition-colors hover:text-gold';

function Col({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="eyebrow mb-5 text-gold">{title}</h2>
      {children}
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-steel text-white">
      {/* Claim */}
      <div className="container-site grid gap-10 border-b border-white/10 py-16 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:py-20">
        <div>
          <Logo tone="dark" variant="voll" />
          <p className="mt-10 font-display text-base leading-loose tracking-[0.12em] uppercase sm:text-lg">
            <span className="block">Stahl für Stabilität.</span>
            <span className="block">Glas für Architektur.</span>
            <span className="block text-gold">Solar für die Zukunft.</span>
          </p>
        </div>
        <div className="lg:text-right">
          <p className="claim-script text-5xl text-white/90 sm:text-6xl">{site.signature}</p>
        </div>
      </div>

      {/* Linkspalten */}
      <div className="container-site grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <Col title="Leistungen">
          <ul>
            {leistungen.slice(0, 8).map((l) => (
              <li key={l.slug}>
                <Link to={`/leistungen/${l.slug}`} className={linkCls}>
                  {l.title}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/leistungen" className={linkCls + ' text-gold'}>
                Alle Leistungen
              </Link>
            </li>
          </ul>
        </Col>
        <Col title="Produkte">
          <ul>
            {produkte.map((p) => (
              <li key={p.slug}>
                <Link to={`/produkte/${p.slug}`} className={linkCls}>
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </Col>
        <Col title="Unternehmen">
          <ul>
            {[
              ['/ueber-uns', 'Über uns'],
              ['/referenzen', 'Referenzen'],
              ['/projektablauf', 'Projektablauf'],
              ['/warum-beo', 'Warum BEO'],
              ['/privatkunden', 'Für Privatkunden'],
              ['/fachpartner', 'Für Fachpartner'],
              ['/anfrage', 'Projekt anfragen'],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className={linkCls}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </Col>
        <Col title="Kontakt">
          <address className="space-y-4 text-sm leading-relaxed text-white/70 not-italic">
            <p>
              {site.name}
              <br />
              {site.address.street}
              <br />
              {site.address.zip} {site.address.city}
            </p>
            <p>
              {site.phoneHref ? <a href={site.phoneHref} className={linkCls}>{site.phone}</a> : site.phone}
              <br />
              {site.emailHref ? <a href={site.emailHref} className={linkCls}>{site.email}</a> : site.email}
            </p>
            <p>
              <Link to="/kontakt" className={linkCls + ' text-gold'}>
                Kontakt und Anfahrt
              </Link>
            </p>
          </address>
        </Col>
      </div>

      {/* Berge und Rechtliches */}
      <MountainSilhouette className="h-24 text-steel-900 sm:h-32" />
      <div className="bg-steel-900">
        <div className="container-site flex flex-col gap-4 py-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-3">
            <SwissCross className="size-4" />
            <span>
              © {year} {site.name}
            </span>
          </p>
          <ul className="flex gap-6">
            <li>
              <Link to="/impressum" className="inline-flex min-h-8 items-center hover:text-gold">
                Impressum
              </Link>
            </li>
            <li>
              <Link to="/datenschutz" className="inline-flex min-h-8 items-center hover:text-gold">
                Datenschutz
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
