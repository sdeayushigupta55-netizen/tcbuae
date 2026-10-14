import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Mail, MapPin, PhoneCall, ShieldCheck } from 'lucide-react';
import { LOGO, site } from '../../config';

const exploreLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Licenses', to: '/licenses' },
  { label: 'Contact', to: '/contact' },
];

const legalLinks = [{ label: 'Privacy Policy', to: '/privacy-policy' }];

function FooterLink({ to, children }) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center gap-2 text-sm text-slate-300/75 transition hover:text-white"
    >
      <span className="h-px w-0 bg-brand-gold transition-all group-hover:w-3" aria-hidden />
      {children}
    </Link>
  );
}

function SocialLink({ href, label, children }) {
  if (!href) return null;
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-200/80 transition hover:border-brand-gold/30 hover:bg-white/[0.08] hover:text-white"
    >
      {children}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-white/10 bg-ink-950">
      <div className="pointer-events-none absolute inset-0 bg-gold-radials opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_400px_at_90%_100%,rgba(201,205,211,0.08),transparent_60%)]" />

      <div className="relative mx-auto w-[min(1150px,92%)] pt-14 pb-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Link to="/" className="inline-flex items-center gap-3">
              <img src={LOGO} alt={site.brandName} className="h-14 w-auto object-contain sm:h-16" loading="lazy" />
              <div className="min-w-0 leading-tight">
                <div className="font-extrabold text-white">{site.brandName}</div>
                <div className="text-[10px] uppercase tracking-widest text-brand-gold/80 sm:text-xs">{site.tagline}</div>
              </div>
            </Link>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-slate-300/70">
              Premium commercial brokerage and professional services — transparent coordination, compliance, and
              quality execution across the UAE.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-slate-200/90">
                <ShieldCheck size={14} className="text-brand-gold" />
                RAKEZ Licensed
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-slate-200/90">
                <Clock size={14} className="text-brand-gold" />
                9:00 AM – 6:00 PM (UAE)
              </span>
            </div>
            <div className="mt-6 flex items-center gap-2">
              <SocialLink href={site.socials?.x} label="X">
                <span className="font-extrabold">𝕏</span>
              </SocialLink>
              <SocialLink href={site.socials?.facebook} label="Facebook">
                <span className="font-extrabold">f</span>
              </SocialLink>
              <SocialLink href={site.socials?.instagram} label="Instagram">
                <span className="font-extrabold">◎</span>
              </SocialLink>
              <SocialLink href={site.socials?.linkedin} label="LinkedIn">
                <span className="font-extrabold">in</span>
              </SocialLink>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-3 lg:gap-8">
            <div>
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-white">Explore</h3>
              <ul className="mt-4 space-y-3">
                {exploreLinks.map(({ label, to }) => (
                  <li key={to}>
                    <FooterLink to={to}>{label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-white">Legal</h3>
              <ul className="mt-4 space-y-3">
                {legalLinks.map(({ label, to }) => (
                  <li key={to}>
                    <FooterLink to={to}>{label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-brand-gold/10 via-ink-900/80 to-white/[0.04] p-6 shadow-glowSoft backdrop-blur-sm sm:p-7">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-extrabold text-white">Get in touch</h3>
                <span className="rounded-full border border-brand-gold/25 bg-brand-gold/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-gold">
                  Support
                </span>
              </div>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-black/20">
                    <PhoneCall size={16} className="text-brand-gold" />
                  </span>
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">Landline</span>
                    <a href={`tel:${site.support.landlineE164}`} className="font-semibold text-white hover:text-brand-gold">
                      {site.support.landlineDisplay}
                    </a>
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-black/20">
                    <Mail size={16} className="text-brand-gold" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">Email</span>
                    <a href={`mailto:${site.support.email}`} className="break-all text-white hover:text-brand-gold">
                      {site.support.email}
                    </a>
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-black/20">
                    <MapPin size={16} className="text-brand-gold" />
                  </span>
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">Office</span>
                    <span className="leading-relaxed text-slate-200/90">{site.address}</span>
                  </span>
                </li>
              </ul>
              <div className="mt-6">
                <Link
                  to="/contact"
                  className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-gradient-to-r from-brand-gold2 to-brand-gold px-4 py-2.5 text-sm font-extrabold text-ink-950 shadow-glowGold transition hover:opacity-95"
                >
                  Request Quote <ArrowRight size={16} className="shrink-0" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-ink-900/40 px-5 py-4 sm:flex sm:items-center sm:justify-between sm:px-6">
          <p className="text-center text-sm text-slate-300/70 sm:text-left">
            <span className="font-extrabold text-white">Director:</span> {site.managers[0]?.name}
            <span className="mx-2 text-slate-600">·</span>
            <a href={`tel:${site.managers[0]?.phoneE164}`} className="hover:text-brand-gold">
              {site.managers[0]?.phoneDisplay}
            </a>
          </p>
          <Link
            to="/licenses"
            className="mt-3 inline-flex w-full items-center justify-center gap-1 text-sm font-bold text-brand-gold hover:text-brand-gold2 sm:mt-0 sm:w-auto"
          >
            View licenses <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-black/20">
        <div className="mx-auto flex w-[min(1150px,92%)] flex-col items-center justify-between gap-4 py-5 text-xs text-slate-400 sm:flex-row sm:text-sm">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} {site.brandName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {legalLinks.map(({ label, to }) => (
              <Link key={to} to={to} className="transition hover:text-brand-gold">
                {label}
              </Link>
            ))}
            <span className="hidden text-slate-600 sm:inline" aria-hidden>
              |
            </span>
            <span className="text-slate-500">Gold • Silver • Black</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
