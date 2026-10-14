import { Link } from 'react-router-dom';
import { Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { Reveal } from '../components/ui/Reveal';
import { Shell } from '../components/ui/Shell';

export function About() {
  return (
    <Shell>
      <section className="mx-auto w-full max-w-[1150px] px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <Reveal>
          <div className="text-xs font-extrabold uppercase tracking-wider text-brand-gold sm:text-sm">Company</div>
          <h1 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-4xl">About Us</h1>
          <p className="mt-3 max-w-full text-sm leading-relaxed text-slate-300/75 sm:max-w-[80ch] sm:text-base">
            We are a professionally licensed company offering a broad range of commercial and technical services. Our
            work is built on reliability, clear communication, and premium delivery.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <Reveal delay={80}>
            <div className="rounded-3xl border border-white/10 bg-ink-900/55 p-5 shadow-glowSoft sm:p-7">
              <div className="text-lg font-extrabold text-white sm:text-xl">Our Vision</div>
              <p className="mt-3 text-sm leading-relaxed text-slate-300/75 sm:text-base">
                To be a trusted leader in multi-sector professional services by maintaining excellence and customer
                satisfaction.
              </p>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <div className="rounded-3xl border border-white/10 bg-ink-900/55 p-5 shadow-glowSoft sm:p-7">
              <div className="text-lg font-extrabold text-white sm:text-xl">Our Mission</div>
              <p className="mt-3 text-sm leading-relaxed text-slate-300/75 sm:text-base">
                To deliver quality services through professionalism, innovation, and strong attention to regulatory
                standards.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {[
            { icon: <ShieldCheck className="text-brand-silver" size={18} />, t: 'Compliance', d: 'Documented process with clear follow-ups.' },
            { icon: <Clock className="text-brand-gold" size={18} />, t: 'Reliability', d: 'Timely execution and status updates.' },
            { icon: <Sparkles className="text-brand-gold2" size={18} />, t: 'Premium Service', d: 'Quality checks and smooth coordination.' },
          ].map((item, index) => (
            <Reveal key={item.t} delay={200 + index * 60}>
              <div className="flex h-full flex-col items-start rounded-3xl border border-white/10 bg-ink-900/55 p-5 shadow-glowSoft sm:p-7">
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
                  {item.icon}
                </div>
                <div className="mt-3 text-base font-extrabold text-white sm:text-lg">{item.t}</div>
                <div className="mt-2 text-xs leading-relaxed text-slate-300/75 sm:text-sm">{item.d}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={420}>
          <div className="mt-8 sm:mt-10">
            <Link
              to="/services"
              className="inline-flex rounded-2xl bg-gradient-to-r from-brand-gold2 to-brand-gold px-5 py-3 text-sm font-extrabold text-ink-950 shadow-glowGold transition hover:opacity-95 sm:px-6 sm:text-base"
            >
              Explore Services
            </Link>
          </div>
        </Reveal>
      </section>
    </Shell>
  );
}
