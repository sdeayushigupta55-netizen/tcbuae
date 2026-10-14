import { Link, useParams } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { services } from '../services';
import { Reveal } from '../components/ui/Reveal';
import { Shell } from '../components/ui/Shell';
import { NotFound } from './NotFound';

const faqs = [
  {
    q: 'How do we start?',
    a: 'Share your requirement via Contact. We respond with scope, timeline and next steps.',
  },
  {
    q: 'Do you provide documentation support?',
    a: 'Yes. We guide required documents, submission steps, and track progress (as applicable to scope).',
  },
  {
    q: 'How do you ensure quality?',
    a: 'We follow a structured process with checks, updates, and final confirmation before delivery/closure.',
  },
  {
    q: 'How fast is the turnaround time?',
    a: 'Depends on scope. We typically share an initial response within 24–48 hours with clear timelines.',
  },
];

export function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);
  if (!service) return <NotFound />;

  return (
    <Shell>
      <section className="relative overflow-hidden border-b border-white/10 bg-ink-950">
        <div className={`absolute inset-0 bg-gradient-to-br ${service.tone || 'from-brand-gold/12 to-white/8'}`} />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_15%_20%,rgba(212,175,55,0.18),transparent_55%),radial-gradient(900px_520px_at_85%_20%,rgba(201,205,211,0.14),transparent_55%)]" />
        <div className="relative mx-auto w-full max-w-[1150px] px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs font-extrabold text-slate-200/90">
              {service.badge || 'Service'}
            </div>
            <h1 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl md:text-5xl">{service.title}</h1>
            <p className="mt-4 max-w-full text-sm leading-relaxed text-slate-300/75 sm:max-w-[85ch] sm:text-base">
              {service.description}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/contact"
                className="w-full rounded-2xl bg-gradient-to-r from-brand-gold2 to-brand-gold px-5 py-3 text-center text-sm font-extrabold text-ink-950 shadow-glowGold transition hover:opacity-95 sm:w-auto sm:px-6 sm:text-base"
              >
                Request Quote
              </Link>
              <Link
                to="/services"
                className="w-full rounded-2xl border border-white/12 bg-white/[0.04] px-5 py-3 text-center text-sm font-extrabold text-white transition hover:bg-white/[0.07] sm:w-auto sm:px-6 sm:text-base"
              >
                Back to Services
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1150px] px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal>
            <div className="rounded-3xl border border-white/10 bg-ink-900/55 p-5 shadow-glowSoft sm:p-7">
              <div className="text-xl font-extrabold text-white">Highlights</div>
              <div className="mt-4 grid gap-2">
                {service.highlights.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-slate-200/80">
                    <CheckCircle2 className="mt-[2px] text-brand-gold" size={16} />
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="rounded-3xl border border-white/10 bg-ink-900/55 p-5 shadow-glowSoft sm:p-7">
              <div className="text-xl font-extrabold text-white">What you get</div>
              <ul className="mt-4 grid gap-2 text-slate-200/80">
                <li>• Clear scope and timeline</li>
                <li>• Regular updates & follow-ups</li>
                <li>• Documentation guidance (as needed)</li>
                <li>• Quality checks before closure</li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-brand-gold/10 to-white/6 p-5 shadow-glowSoft sm:p-7">
              <div className="text-xl font-extrabold text-white">Why clients choose us</div>
              <div className="mt-5 grid gap-3">
                {[
                  { icon: <ShieldCheck className="text-brand-silver" size={18} />, t: 'Compliance-ready process' },
                  { icon: <Clock className="text-brand-gold" size={18} />, t: 'Fast response & clear timelines' },
                  { icon: <Sparkles className="text-brand-gold2" size={18} />, t: 'Premium execution & reporting' },
                ].map((item) => (
                  <div
                    key={item.t}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/25 p-4"
                  >
                    <div className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.05]">
                      {item.icon}
                    </div>
                    <div className="font-extrabold text-white">{item.t}</div>
                  </div>
                ))}
              </div>
              <Link to="/contact" className="mt-6 inline-flex items-center gap-2 font-extrabold text-brand-gold hover:text-brand-gold2">
                Talk to us <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="mt-12">
          <Reveal>
            <div className="text-sm font-extrabold uppercase tracking-wider text-brand-gold">Process</div>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-white">How it works</h2>
            <p className="mt-3 max-w-[85ch] leading-relaxed text-slate-300/75">
              A simple workflow from inquiry to delivery — clear steps and predictable outcomes.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {[
              { n: '01', t: 'Consultation', d: 'Understand your requirements and objectives.' },
              { n: '02', t: 'Planning', d: 'Share scope, documents, timeline and proposal.' },
              { n: '03', t: 'Execution', d: 'Deliver with updates, quality checks and closure.' },
            ].map((step, index) => (
              <Reveal key={step.n} delay={index * 80}>
                <div className="rounded-3xl border border-white/10 bg-ink-900/55 p-5 shadow-glowSoft sm:p-7">
                  <div className="font-black tracking-widest text-brand-gold">{step.n}</div>
                  <div className="mt-2 text-xl font-extrabold text-white">{step.t}</div>
                  <div className="mt-2 leading-relaxed text-slate-300/75">{step.d}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <Reveal>
            <div className="text-sm font-extrabold uppercase tracking-wider text-brand-gold">FAQ</div>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-white">Common questions</h2>
            <p className="mt-3 max-w-[85ch] leading-relaxed text-slate-300/75">Quick answers to help you decide faster.</p>
          </Reveal>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {faqs.map((item, index) => (
              <Reveal key={item.q} delay={index * 70}>
                <div className="rounded-3xl border border-white/10 bg-ink-900/55 p-5 shadow-glowSoft sm:p-7">
                  <div className="text-lg font-extrabold text-white">{item.q}</div>
                  <div className="mt-2 leading-relaxed text-slate-300/75">{item.a}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-3xl border border-white/10 bg-gradient-to-r from-brand-gold/10 to-white/6 p-6 shadow-glowSoft sm:flex-row sm:items-center sm:p-8">
          <Reveal>
            <div>
              <div className="text-xl font-black tracking-tight text-white sm:text-2xl">Ready to proceed?</div>
              <div className="mt-2 text-sm text-slate-300/75 sm:text-base">
                Share your requirement — we’ll respond with scope, timeline, and next steps.
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <Link
              to="/contact"
              className="w-full rounded-2xl bg-gradient-to-r from-brand-gold2 to-brand-gold px-5 py-3 text-center text-sm font-extrabold text-ink-950 shadow-glowGold transition hover:opacity-95 sm:w-auto sm:px-7 sm:text-base"
            >
              Contact Now
            </Link>
          </Reveal>
        </div>
      </section>
    </Shell>
  );
}
