import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ArrowRight, Mail, Menu, PhoneCall, X } from 'lucide-react';
import { LOGO, site } from '../../config';
import { navClass } from './navClass';

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink-950/70 backdrop-blur-xl">
      <div className="hidden border-b border-white/10 lg:block">
        <div className="mx-auto flex w-[min(1150px,92%)] items-center justify-between gap-6 py-2 text-xs text-slate-300/70">
          <div className="flex min-w-0 items-center gap-6">
            <span className="inline-flex items-center gap-2 whitespace-nowrap">
              <PhoneCall size={14} className="text-brand-gold" />
              <a href={`tel:${site.support.landlineE164}`} className="transition hover:text-brand-gold">
                {site.support.landlineDisplay}
              </a>
            </span>
            <span className="inline-flex min-w-0 items-center gap-2">
              <Mail size={14} className="shrink-0 text-brand-gold" />
              <a
                href={`mailto:${site.support.email}`}
                className="truncate transition hover:text-brand-gold"
                title={site.support.email}
              >
                {site.support.email}
              </a>
            </span>
          </div>
          <div className="whitespace-nowrap text-slate-300/60">Premium • Confidential • Compliant</div>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[1150px] items-center justify-between gap-2 px-[4%] py-2.5 sm:gap-3 sm:py-3 lg:px-0">
        <Link to="/" className="flex min-w-0 max-w-[45%] items-center gap-2 sm:max-w-none sm:gap-3" onClick={() => setOpen(false)}>
          <img src={LOGO} alt={site.brandName} className="h-12 w-auto shrink-0 object-contain sm:h-14 lg:h-16" loading="eager" />
          <div className="hidden min-w-0 leading-tight sm:block">
            <div className="truncate text-base font-extrabold tracking-tight text-white sm:text-lg lg:text-xl">
              {site.brandName}
            </div>
            <div className="truncate text-[10px] uppercase tracking-widest text-brand-gold/80 sm:text-xs">
              {site.tagline}
            </div>
          </div>
        </Link>

        <nav className="hidden shrink-0 items-center gap-0.5 lg:flex lg:gap-1">
          <NavLink to="/" end className={navClass}>
            Home
          </NavLink>
          <NavLink to="/about" className={navClass}>
            About
          </NavLink>
          <NavLink to="/services" className={navClass}>
            Services
          </NavLink>
          <NavLink to="/licenses" className={navClass}>
            Licenses
          </NavLink>
          <NavLink to="/contact" className={navClass}>
            Contact
          </NavLink>
          <Link
            to="/contact"
            className="ml-1 inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-xl bg-gradient-to-r from-brand-gold2 to-brand-gold px-3.5 py-2 text-xs font-extrabold text-ink-950 shadow-glowGold transition hover:opacity-95 xl:ml-2 xl:gap-2 xl:px-4 xl:text-sm"
          >
            Request Quote <ArrowRight size={16} className="shrink-0" />
          </Link>
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 lg:hidden">
          <Link
            to="/contact"
            className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-xl bg-gradient-to-r from-brand-gold2 to-brand-gold px-2.5 py-2 text-xs font-extrabold text-ink-950 shadow-glowGold sm:px-3 sm:text-sm"
            onClick={() => setOpen(false)}
          >
            Request Quote <ArrowRight size={15} className="shrink-0 sm:h-4 sm:w-4" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] transition hover:bg-white/[0.07]"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={18} className="text-white" /> : <Menu size={18} className="text-white" />}
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden border-t border-white/10 transition-[max-height,opacity] duration-300 lg:hidden ${
          open ? 'max-h-[520px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="mx-auto w-full max-w-[1150px] px-[4%] py-4 lg:px-0">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300/80">
            <span className="inline-flex items-center gap-1">
              <PhoneCall size={14} className="text-brand-gold" />
              <span className="truncate">{site.support.landlineE164}</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <Mail size={14} className="text-brand-gold" />
              <span className="truncate">{site.support.email}</span>
            </span>
            <span className="whitespace-nowrap text-slate-300/60">Premium • Confidential • Compliant</span>
          </div>
          <div className="mt-3 grid gap-2">
            {[
              ['Home', '/'],
              ['About', '/about'],
              ['Services', '/services'],
              ['Licenses', '/licenses'],
              ['Contact', '/contact'],
            ].map(([label, to]) => (
              <NavLink key={to} to={to} className={navClass} onClick={() => setOpen(false)}>
                {label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-brand-gold2 to-brand-gold px-4 py-3 font-extrabold text-ink-950 shadow-glowGold transition hover:opacity-95"
            >
              Request Quote <ArrowRight size={16} className="shrink-0" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
