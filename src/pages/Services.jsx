import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { services } from '../services';
import { Reveal } from '../components/ui/Reveal';
import { Shell } from '../components/ui/Shell';

export function Services() {
  return (
    <Shell>
      <section className="mx-auto w-[min(1150px,92%)] py-16 sm:py-20 lg:py-24">
        <Reveal>
          <div className="text-sm font-extrabold uppercase tracking-wider text-brand-gold">Services</div>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">Our Service Categories</h1>
          <p className="mt-3 max-w-[85ch] leading-relaxed text-slate-300/75">
            Browse all service categories. Each card includes key highlights and a full details page.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={index * 60}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-ink-900/55 shadow-glowSoft transition hover:border-white/15 hover:bg-ink-850/60">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.tone || 'from-brand-gold/12 to-white/8'} opacity-0 transition group-hover:opacity-100`}
                />
                <div className="relative flex h-full flex-col p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-extrabold text-slate-200/90">
                        {service.badge || 'Service'}
                      </div>
                      <div className="mt-3 text-xl font-extrabold tracking-tight text-white">{service.title}</div>
                      <div className="mt-2 text-sm leading-relaxed text-slate-300/70">{service.short}</div>
                    </div>
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.04]">
                      <div className="h-7 w-7 rounded-xl bg-gradient-to-br from-brand-gold/40 to-white/20" />
                    </div>
                  </div>
                  <div className="mt-5 grid gap-2">
                    {service.highlights.slice(0, 4).map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm text-slate-200/85">
                        <CheckCircle2 className="shrink-0 text-brand-gold" size={16} />
                        <span className="leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <Link
                      to={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 font-extrabold text-brand-gold hover:text-brand-gold2"
                    >
                      View details <ArrowRight size={16} />
                    </Link>
                    <Link
                      to="/contact"
                      className="w-full rounded-xl bg-gradient-to-r from-brand-gold2 to-brand-gold px-4 py-2 text-center text-sm font-extrabold text-ink-950 shadow-glowGold transition hover:opacity-95 sm:w-auto"
                    >
                      Get Quote
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </Shell>
  );
}
