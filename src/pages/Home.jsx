import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, CheckCircle2, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { DIRECTOR_PHOTO, site } from '../config';
import { services } from '../services';
import { Reveal } from '../components/ui/Reveal';
import { Shell } from '../components/ui/Shell';

function StatCard({ title, value, sub }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-ink-850/70 p-5 transition hover:bg-ink-800/70">
      <div className="text-sm text-slate-400">{title}</div>
      <div className="mt-2 text-2xl font-extrabold tracking-tight text-white">{value}</div>
      <div className="mt-1 text-xs text-slate-500">{sub}</div>
    </div>
  );
}

export function Home() {
  return (
    <Shell>
      <section className="relative overflow-hidden border-b border-white/10 bg-ink-950">
        <div className="absolute inset-0 bg-gold-radials" />
        <div className="absolute inset-0 bg-[radial-gradient(700px_420px_at_40%_10%,rgba(201,205,211,0.10),transparent_60%)]" />
        <div className="relative mx-auto w-[min(1150px,92%)] py-16 sm:py-20 lg:py-24">
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-ink-850/70 px-4 py-2 text-xs font-bold text-slate-200/90 sm:text-sm">
                  <BadgeCheck size={16} className="text-brand-gold" />
                  Licensed • Reliable • Professional
                </div>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-5 text-[clamp(30px,4.5vw,56px)] font-black leading-[1.08] tracking-tight text-white">
                  Premium brokerage & multi‑service solutions for modern businesses.
                </h1>
              </Reveal>
              <Reveal delay={140}>
                <p className="mt-5 max-w-[60ch] text-sm leading-relaxed text-slate-300/75 sm:text-base">
                  We support commercial brokerage, document clearing, maintenance, consulting, and operational
                  services — delivered with transparent coordination, compliant processes, and premium execution.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
                  <Link
                    to="/services"
                    className="w-full rounded-xl bg-gradient-to-r from-brand-gold2 to-brand-gold px-6 py-3 text-center font-extrabold text-ink-950 shadow-glowGold transition hover:opacity-90 sm:w-auto"
                  >
                    Explore Services
                  </Link>
                  <Link
                    to="/contact"
                    className="w-full rounded-xl border border-white/12 bg-ink-850/60 px-6 py-3 text-center font-extrabold text-white transition hover:bg-ink-800/70 sm:w-auto"
                  >
                    Request Quote
                  </Link>
                </div>
              </Reveal>
              <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
                <Reveal delay={260}>
                  <StatCard title="Fast Turnaround" value="24–48h" sub="Quick response & updates" />
                </Reveal>
                <Reveal delay={320}>
                  <StatCard title="Quality First" value="QA Checks" sub="Professional execution" />
                </Reveal>
                <Reveal delay={380}>
                  <StatCard title="Reliable Support" value="Dedicated" sub="Clear follow-up" />
                </Reveal>
              </div>
            </div>

            <Reveal>
              <div className="rounded-3xl border border-white/10 bg-ink-850/70 p-6 shadow-glowSoft sm:p-8">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-base font-extrabold text-white sm:text-lg">How we deliver</div>
                  <div className="hidden text-xs text-slate-500 sm:block">Structured • Transparent</div>
                </div>
                <div className="mt-6 grid gap-5">
                  {[
                    { icon: <ShieldCheck className="text-brand-gold" size={18} />, t: 'Compliance-ready process', d: 'Clear documentation and structured workflow.' },
                    { icon: <Clock className="text-brand-gold" size={18} />, t: 'On-time execution', d: 'Defined timelines and consistent updates.' },
                    { icon: <Sparkles className="text-brand-gold2" size={18} />, t: 'Premium service quality', d: 'Quality checks and smooth coordination.' },
                  ].map((item) => (
                    <div key={item.t} className="flex items-start gap-4">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-ink-800/80">
                        {item.icon}
                      </div>
                      <div>
                        <div className="font-bold text-white">{item.t}</div>
                        <div className="mt-1 text-sm leading-relaxed text-slate-300/75">{item.d}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <Link to="/contact" className="inline-flex items-center gap-2 font-extrabold text-brand-gold hover:text-brand-gold2">
                    Talk to us <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-white/10 bg-ink-950">
        <div className="absolute inset-0 bg-ink-radials" />
        <div className="relative mx-auto w-[min(1150px,92%)] py-16 sm:py-20 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <div className="flex justify-center lg:justify-start">
                <div className="relative w-full max-w-[420px]">
                  <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-br from-brand-gold/20 to-brand-silver/10 opacity-70 blur-2xl" />
                  <div className="relative rounded-[34px] border border-white/10 bg-ink-850/40 p-3 shadow-glowSoft">
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[26px] sm:aspect-[16/10] lg:aspect-[4/5]">
                      <img
                        src={site.director.photo || DIRECTOR_PHOTO}
                        alt={site.director.name}
                        className="absolute inset-0 h-full w-full object-cover object-top"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div>
                <div className="text-sm font-extrabold uppercase tracking-wider text-brand-gold">Leadership</div>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">Message from the Director</h2>
                <div className="mt-5 space-y-4 leading-relaxed text-slate-300/75">
                  <p>
                    Thank you for visiting <strong>Tray Commercial Broker FZ-LLC</strong>.
                  </p>
                  <p>
                    Our company was built on a simple idea — to make a difference through quality work and honest
                    service. Every project we take on reflects our commitment to excellence, transparency, and
                    continuous improvement.
                  </p>
                  <p>
                    We are proud of the trust our clients place in us and the talented team that stands behind our
                    success. As we move forward, we remain focused on innovation, growth, and delivering results that
                    truly matter.
                  </p>
                  <p>We appreciate your interest in our journey and invite you to be a part of our future.</p>
                  <div className="pt-4">
                    <p className="font-semibold text-white">Sincerely,</p>
                    <p className="mt-1 text-lg font-extrabold text-white">Vishal Vohra</p>
                  </div>
                </div>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link
                    to="/contact"
                    className="w-full rounded-xl bg-gradient-to-r from-brand-gold2 to-brand-gold px-6 py-3 text-center font-extrabold text-ink-950 shadow-glowGold transition hover:opacity-90 sm:w-auto"
                  >
                    Contact Leadership
                  </Link>
                  <Link
                    to="/about"
                    className="w-full rounded-xl border border-white/12 bg-ink-850/60 px-6 py-3 text-center font-extrabold text-white transition hover:bg-ink-800/70 sm:w-auto"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-white/10 bg-ink-950">
        <div className="absolute inset-0 bg-[radial-gradient(750px_420px_at_20%_20%,rgba(212,175,55,0.10),transparent_60%),radial-gradient(750px_420px_at_80%_30%,rgba(201,205,211,0.10),transparent_60%)]" />
        <div className="relative mx-auto w-[min(1150px,92%)] py-16 sm:py-20 lg:py-24">
          <Reveal>
            <div className="text-sm font-extrabold uppercase tracking-wider text-brand-gold">Services</div>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Built to cover everything you need
            </h2>
            <p className="mt-4 max-w-[70ch] text-base text-slate-300/75 sm:text-lg">
              Quick overview — open any service for full details and process.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={service.slug} delay={index * 60}>
                <Link
                  to={`/services/${service.slug}`}
                  className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-ink-900/55 p-6 shadow-glowSoft transition hover:border-white/15 hover:bg-ink-850/65 sm:p-7`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.tone || 'from-brand-gold/12 to-white/8'} opacity-0 transition group-hover:opacity-100`}
                  />
                  <div className="relative">
                    <div className="text-xl font-extrabold text-white">{service.title}</div>
                    <div className="mt-3 text-sm leading-relaxed text-slate-300/70">{service.short}</div>
                    <div className="mt-5 grid gap-2">
                      {service.highlights.slice(0, 3).map((item) => (
                        <div key={item} className="flex items-center gap-2 text-sm text-slate-200/85">
                          <CheckCircle2 className="shrink-0 text-brand-gold" size={14} />
                          <span className="leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 flex justify-end">
                      <span className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-gold2 to-brand-gold px-4 py-2 text-sm font-extrabold text-ink-950 transition-all duration-300 group-hover:shadow-glowGold">
                        View Details
                        <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-ink-950">
        <div className="mx-auto flex w-[min(1150px,92%)] flex-col items-start justify-between gap-6 py-16 sm:flex-row sm:items-center sm:gap-8 sm:py-20 lg:py-24">
          <div>
            <div className="text-xl font-black text-white sm:text-2xl">Want a quick quote?</div>
            <div className="mt-3 text-slate-300/75">Tell us your requirement — we’ll respond with clear next steps.</div>
          </div>
          <Link
            to="/contact"
            className="w-full rounded-xl bg-gradient-to-r from-brand-gold2 to-brand-gold px-7 py-3 text-center font-extrabold text-ink-950 shadow-glowGold transition hover:opacity-90 sm:w-auto"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </Shell>
  );
}
