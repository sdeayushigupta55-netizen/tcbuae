import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  ChevronRight,
  FileText,
  Mail,
  MapPin,
  Shield,
} from 'lucide-react';
import { site } from '../config';
import {
  privacyContact,
  privacyIntro,
  privacySections,
} from '../content/privacyPolicySections';
import { Reveal } from '../components/ui/Reveal';
import { Shell } from '../components/ui/Shell';

function getScrollPadding() {
  const header = document.querySelector('header');
  const mobileToc = document.querySelector('[data-privacy-toc-mobile]');
  let offset = (header?.getBoundingClientRect().height ?? 88) + 12;
  if (mobileToc && window.matchMedia('(max-width: 1023px)').matches) {
    offset += mobileToc.getBoundingClientRect().height;
  }
  document.documentElement.style.setProperty('--site-scroll-padding', `${offset}px`);
  return offset;
}

function scrollToSectionId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = getScrollPadding();
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: Math.max(0, top), behavior: prefersReduced ? 'auto' : 'smooth' });
}

function syncTocIntoView(activeId, tocItemRefs, mobileTocRef) {
  requestAnimationFrame(() => {
    if (window.matchMedia('(min-width: 1024px)').matches) {
      tocItemRefs.current[activeId]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      return;
    }
    mobileTocRef.current
      ?.querySelector(`[data-section="${activeId}"]`)
      ?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
  });
}

function TocButton({ section, active, onSelect, compact = false, buttonRef }) {
  const label = section.shortLabel ?? section.title;
  return (
    <button
      type="button"
      ref={buttonRef}
      onClick={() => onSelect(section.id)}
      title={section.title}
      aria-label={`Section ${section.letter}: ${section.title}`}
      className={`shrink-0 rounded-xl text-left transition-all duration-200 ease-out ${
        compact
          ? `inline-flex items-center gap-1.5 px-2 py-2 text-xs font-semibold sm:gap-2 sm:px-3 sm:text-sm ${
              active
                ? 'border border-brand-gold/30 bg-brand-gold/15 text-white'
                : 'border border-white/10 bg-ink-900/80 text-slate-300/80 hover:text-white'
            }`
          : `flex w-full items-start gap-2 px-3 py-2.5 text-xs sm:text-sm ${
              active
                ? 'border border-brand-gold/25 bg-brand-gold/10 font-semibold text-white'
                : 'text-slate-300/75 hover:bg-white/[0.05] hover:text-white'
            }`
      }`}
    >
      <span
        className={`flex shrink-0 items-center justify-center rounded-lg font-black ${
          compact ? 'h-7 w-7 text-[10px] sm:h-6 sm:w-6' : 'mt-0.5 h-6 w-6 text-[11px]'
        } ${active ? 'bg-brand-gold text-ink-950' : 'bg-white/10 text-brand-gold'}`}
      >
        {section.letter}
      </span>
      {!compact && <span className="min-w-0 leading-snug">{section.title}</span>}
      {compact && (
        <span className="hidden max-w-[7rem] truncate sm:inline md:max-w-[10rem] lg:max-w-none">{label}</span>
      )}
    </button>
  );
}

function SectionBlock({ section, index, isActive }) {
  return (
    <section
      id={section.id}
      className="scroll-mt-[var(--site-scroll-padding,7.5rem)]"
      aria-labelledby={`heading-${section.id}`}
    >
      <div
        className={`rounded-2xl border bg-ink-900/55 p-4 shadow-glowSoft transition-all duration-300 ease-out sm:rounded-3xl sm:p-6 lg:p-8 ${
          isActive ? 'border-brand-gold/35 bg-ink-900/70 ring-1 ring-brand-gold/10' : 'border-white/10'
        }`}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center self-start rounded-2xl border border-brand-gold/25 bg-gradient-to-br from-brand-gold/20 to-white/5 text-base font-black text-brand-gold sm:h-12 sm:w-12 sm:text-lg"
            aria-hidden
          >
            {section.letter}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gold/80 sm:text-[11px]">
              Section {section.letter}
            </p>
            <h2
              id={`heading-${section.id}`}
              className="mt-1 break-words text-lg font-black tracking-tight text-white capitalize sm:text-xl lg:text-2xl"
            >
              {section.title}
            </h2>

            {section.paragraphs?.map((p) => (
              <p
                key={p.slice(0, 48)}
                className="mt-3 break-words text-sm leading-[1.75] text-slate-300/80 sm:mt-4 sm:text-[15px]"
              >
                {p}
              </p>
            ))}

            {section.bullets && (
              <ul className="mt-4 space-y-2.5 sm:mt-5 sm:space-y-3">
                {section.bullets.map((item) => (
                  <li
                    key={item.slice(0, 48)}
                    className="flex gap-2.5 text-sm leading-[1.65] text-slate-300/85 sm:gap-3 sm:text-[15px] sm:leading-[1.7]"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold" aria-hidden />
                    <span className="min-w-0 break-words">{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {section.afterBullets?.map((p) => (
              <p
                key={p.slice(0, 48)}
                className="mt-3 break-words text-sm leading-[1.75] text-slate-300/80 sm:mt-4 sm:text-[15px]"
              >
                {p}
              </p>
            ))}

            {section.subsections?.map((sub) => (
              <div
                key={sub.subtitle}
                className="mt-6 rounded-xl border border-white/10 bg-black/20 p-4 sm:mt-8 sm:rounded-2xl sm:p-5 lg:p-6"
              >
                <h3 className="text-base font-extrabold text-white sm:text-lg">{sub.subtitle}</h3>
                {sub.paragraphs?.map((p) => (
                  <p
                    key={p.slice(0, 48)}
                    className="mt-3 break-words text-sm leading-[1.75] text-slate-300/80 sm:text-[15px]"
                  >
                    {p}
                  </p>
                ))}
                {sub.bullets && (
                  <ul className="mt-3 space-y-2.5 sm:mt-4 sm:space-y-3">
                    {sub.bullets.map((item) => (
                      <li
                        key={item.slice(0, 48)}
                        className="flex gap-2.5 text-sm leading-[1.65] text-slate-300/85 sm:gap-3 sm:text-[15px]"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold" aria-hidden />
                        <span className="min-w-0 break-words">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {sub.afterBullets?.map((p) => (
                  <p
                    key={p.slice(0, 48)}
                    className="mt-3 break-words text-sm leading-[1.75] text-slate-300/80 sm:mt-4 sm:text-[15px]"
                  >
                    {p}
                  </p>
                ))}
              </div>
            ))}

            {section.contactBlock && (
              <div className="mt-5 grid grid-cols-1 gap-3 sm:mt-6 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-black/25 p-4 sm:col-span-2 sm:rounded-2xl sm:p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Subject / reference</p>
                  <p className="mt-1 font-semibold text-white">{privacyContact.subject}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/25 p-4 sm:rounded-2xl">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Attention</p>
                  <p className="mt-1 text-sm text-slate-200/90">{privacyContact.attention}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/25 p-4 sm:rounded-2xl">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Email</p>
                  <a
                    href={`mailto:${privacyContact.email}`}
                    className="mt-1 inline-flex max-w-full items-center gap-2 break-all text-sm font-semibold text-brand-gold hover:text-brand-gold2"
                  >
                    <Mail size={16} className="shrink-0" />
                    {privacyContact.email}
                  </a>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/25 p-4 sm:col-span-2 sm:rounded-2xl">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Address</p>
                  <p className="mt-1 flex gap-2 text-sm leading-relaxed text-slate-200/90">
                    <MapPin size={16} className="mt-0.5 shrink-0 text-brand-gold" />
                    <span className="min-w-0 break-words">{privacyContact.address}</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {index < privacySections.length - 1 && <div className="h-4 sm:h-6" aria-hidden />}
    </section>
  );
}

export function PrivacyPolicy() {
  const { hash } = useLocation();
  const [activeId, setActiveId] = useState(privacySections[0]?.id ?? '');
  const tocNavRef = useRef(null);
  const tocItemRefs = useRef({});
  const mobileTocRef = useRef(null);
  const programmaticScroll = useRef(false);
  const scrollEndTimer = useRef(null);

  const goToSection = useCallback((id) => {
    programmaticScroll.current = true;
    setActiveId(id);
    scrollToSectionId(id);
    syncTocIntoView(id, tocItemRefs, mobileTocRef);
    if (history.replaceState) {
      history.replaceState(null, '', `#${id}`);
    } else {
      window.location.hash = id;
    }
    window.clearTimeout(scrollEndTimer.current);
    scrollEndTimer.current = window.setTimeout(() => {
      programmaticScroll.current = false;
    }, 700);
  }, []);

  useEffect(() => {
    const hashId = hash.replace(/^#/, '');
    if (!hashId) return;
    const exists = privacySections.some((s) => s.id === hashId);
    if (!exists) return;
    const t = window.setTimeout(() => {
      setActiveId(hashId);
      scrollToSectionId(hashId);
    }, 100);
    return () => window.clearTimeout(t);
  }, [hash]);

  useEffect(() => {
    const syncLayoutMetrics = () => {
      const header = document.querySelector('header');
      if (header) {
        document.documentElement.style.setProperty('--site-header-height', `${header.offsetHeight}px`);
      }
      getScrollPadding();
    };

    syncLayoutMetrics();
    window.addEventListener('resize', syncLayoutMetrics, { passive: true });
    return () => window.removeEventListener('resize', syncLayoutMetrics);
  }, []);

  useEffect(() => {
    let observer = null;
    let debounceId = null;

    const mountObserver = () => {
      observer?.disconnect();
      const elements = privacySections
        .map((s) => document.getElementById(s.id))
        .filter(Boolean);
      if (!elements.length) return;

      const pad = getScrollPadding();
      observer = new IntersectionObserver(
        (entries) => {
          if (programmaticScroll.current) return;
          const visible = entries.filter((e) => e.isIntersecting);
          if (!visible.length) return;
          visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          const pick = visible.find((e) => e.boundingClientRect.top >= -8) ?? visible[0];
          const id = pick?.target?.id;
          if (!id) return;
          window.clearTimeout(debounceId);
          debounceId = window.setTimeout(() => setActiveId(id), 100);
        },
        {
          root: null,
          rootMargin: `-${pad}px 0px -55% 0px`,
          threshold: [0, 0.12, 0.3],
        },
      );

      elements.forEach((el) => observer.observe(el));
    };

    mountObserver();
    window.addEventListener('resize', mountObserver, { passive: true });
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', mountObserver);
      window.clearTimeout(debounceId);
    };
  }, []);

  return (
    <Shell animate={false}>
      <section className="relative overflow-hidden border-b border-white/10 bg-ink-950">
        <div className="absolute inset-0 bg-gold-radials" />
        <div className="absolute inset-0 bg-[radial-gradient(700px_420px_at_70%_0%,rgba(201,205,211,0.12),transparent_55%)]" />
        <div className="relative mx-auto w-full max-w-[1150px] px-[4%] py-10 sm:py-14 lg:px-6 lg:py-20">
            <nav
              className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400 sm:gap-2 sm:text-sm"
              aria-label="Breadcrumb"
            >
              <Link to="/" className="transition hover:text-white">
                Home
              </Link>
              <ChevronRight size={14} className="shrink-0 text-slate-600" aria-hidden />
              <span className="text-brand-gold">Privacy Policy</span>
            </nav>

            <div className="mt-5 flex flex-col gap-5 lg:mt-6 lg:flex-row lg:items-end lg:justify-between lg:gap-6">
              <div className="min-w-0 max-w-3xl">
                <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-ink-850/70 px-3 py-1.5 text-[11px] font-bold text-slate-200/90 sm:px-4 sm:py-2 sm:text-xs">
                  <Shield size={16} className="shrink-0 text-brand-gold" />
                  Legal & compliance
                </div>
                <h1 className="mt-3 text-2xl font-black tracking-tight text-white sm:mt-4 sm:text-4xl lg:text-5xl">
                  Privacy Policy
                </h1>
                <p className="mt-3 text-sm leading-relaxed text-slate-300/75 sm:mt-4 sm:text-base lg:text-lg">
                  {privacyIntro}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 lg:max-w-sm lg:justify-end">
                <span className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-[11px] text-slate-300/80 sm:rounded-xl sm:px-3 sm:py-2 sm:text-xs">
                  <FileText size={14} className="mr-1 inline text-brand-gold" aria-hidden />
                  {privacySections.length} sections
                </span>
                <span className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-[11px] text-slate-300/80 sm:rounded-xl sm:px-3 sm:py-2 sm:text-xs">
                  Updated {new Date().getFullYear()}
                </span>
              </div>
            </div>
        </div>
      </section>

      {/* Mobile: horizontal section picker */}
      <div
        data-privacy-toc-mobile
        className="sticky top-[var(--site-header-height,4.5rem)] z-20 border-b border-white/10 bg-ink-950/95 backdrop-blur-lg supports-[backdrop-filter]:bg-ink-950/80 lg:hidden"
      >
        <div
          ref={mobileTocRef}
          className="mx-auto flex w-full max-w-[1150px] snap-x snap-mandatory gap-2 overflow-x-auto px-[4%] py-3 scroll-smooth lg:px-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Jump to section"
        >
          {privacySections.map((s) => (
            <div key={s.id} data-section={s.id} className="snap-start">
              <TocButton
                section={s}
                active={activeId === s.id}
                onSelect={goToSection}
                compact
              />
            </div>
          ))}
        </div>
      </div>

      <section className="mx-auto w-full max-w-[1150px] px-[4%] py-8 sm:py-12 lg:px-6 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,260px)_1fr] lg:gap-10 xl:grid-cols-[minmax(0,280px)_1fr]">
          <aside className="hidden lg:block lg:sticky lg:top-28 lg:z-10 lg:self-start">
            <div className="rounded-2xl border border-white/10 bg-ink-900/60 p-4 shadow-glowSoft backdrop-blur-sm sm:p-5">
              <p className="text-xs font-extrabold uppercase tracking-wider text-brand-gold">On this page</p>
              <nav
                ref={tocNavRef}
                className="mt-3 max-h-[min(70vh,520px)] overflow-y-auto overscroll-contain pr-1"
                aria-label="Policy sections"
              >
                <ul className="space-y-1">
                  {privacySections.map((s) => (
                    <li key={s.id}>
                      <TocButton
                        section={s}
                        active={activeId === s.id}
                        onSelect={goToSection}
                        buttonRef={(node) => {
                          if (node) tocItemRefs.current[s.id] = node;
                        }}
                      />
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          <div className="min-w-0">
            <div className="space-y-0">
              {privacySections.map((section, index) => (
                <SectionBlock
                  key={section.id}
                  section={section}
                  index={index}
                  isActive={activeId === section.id}
                />
              ))}
            </div>

            <Reveal delay={80}>
              <div className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-r from-brand-gold/12 to-white/[0.04] p-5 sm:mt-10 sm:rounded-3xl sm:p-6 lg:flex lg:items-center lg:justify-between lg:p-8">
                <div className="min-w-0">
                  <h2 className="text-base font-extrabold text-white sm:text-lg lg:text-xl">
                    Questions about your data?
                  </h2>
                  <p className="mt-2 max-w-lg text-sm leading-relaxed text-slate-300/75">
                    Contact our compliance team — we respond to privacy requests as quickly as practicable.
                  </p>
                </div>
                <Link
                  to="/contact"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-gold2 to-brand-gold px-6 py-3 text-sm font-extrabold text-ink-950 shadow-glowGold transition hover:opacity-95 lg:mt-0 lg:w-auto"
                >
                  Contact us <ArrowRight size={16} />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </Shell>
  );
}
