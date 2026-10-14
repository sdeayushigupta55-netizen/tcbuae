import { useState } from 'react';
import { Mail, MapPin, PhoneCall } from 'lucide-react';
import { site } from '../config';
import { services } from '../services';
import { Reveal } from '../components/ui/Reveal';
import { Shell } from '../components/ui/Shell';

const inputClass =
  'w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none focus:ring-4 focus:ring-brand-gold/10';

const contactEndpoint = import.meta.env.VITE_CONTACT_ENDPOINT || '/contact.php';

function successMessage(serverMessage) {
  if (serverMessage === 'dev_log') {
    return 'Saved locally (.contact-dev.log). For a real email, add public/contact.config.php or set VITE_CONTACT_ENDPOINT in .env.local (see README).';
  }
  if (serverMessage === 'Email sent' || !serverMessage) {
    return 'Submitted successfully! We will get back to you soon.';
  }
  return serverMessage;
}

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [sending, setSending] = useState(false);

  const update = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    if (!form.name.trim()) return alert('Please enter your name.');
    if (!form.email.trim()) return alert('Please enter your email.');
    if (!form.message.trim()) return alert('Please enter your message.');

    setSending(true);
    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => data.append(key, value));
      const response = await fetch(contactEndpoint, { method: 'POST', body: data });
      const raw = await response.text();
      let result;
      try {
        result = JSON.parse(raw);
      } catch {
        throw new Error(
          import.meta.env.DEV
            ? 'Contact handler unavailable. Run: php -S 127.0.0.1:8765 -t public (see README), or test on your PHP host after deploy.'
            : 'Unexpected server response. Please email us directly.',
        );
      }
      if (!result?.success) throw new Error(result?.message || 'Failed');
      alert(successMessage(result?.message));
      setForm({ name: '', email: '', phone: '', service: '', message: '' });
    } catch (err) {
      alert(err?.message || 'Something went wrong.');
    } finally {
      setSending(false);
    }
  }

  return (
    <Shell>
      <section className="mx-auto w-[min(1150px,92%)] py-12 sm:py-16 lg:py-24">
        <Reveal>
          <div className="text-xs font-extrabold uppercase tracking-wider text-brand-gold sm:text-sm">Contact</div>
          <h1 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl">
            Let’s discuss your requirements
          </h1>
          <p className="mt-3 max-w-[85ch] text-sm leading-relaxed text-slate-300/75 sm:text-base">
            Fill the form — we’ll respond with a clear next step.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-5 sm:mt-10 sm:gap-6 lg:grid-cols-2">
          <Reveal delay={80}>
            <form onSubmit={submit} className="grid gap-4 rounded-3xl border border-white/10 bg-ink-900/55 p-5 shadow-glowSoft sm:p-7">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-extrabold text-slate-200/90">
                  Full Name
                  <input className={inputClass} value={form.name} onChange={update('name')} required placeholder="Your name" />
                </label>
                <label className="grid gap-2 text-sm font-extrabold text-slate-200/90">
                  Email
                  <input
                    className={inputClass}
                    type="email"
                    value={form.email}
                    onChange={update('email')}
                    required
                    placeholder="you@example.com"
                  />
                </label>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-extrabold text-slate-200/90">
                  Phone
                  <input className={inputClass} value={form.phone} onChange={update('phone')} placeholder="+971..." />
                </label>
                <label className="grid gap-2 text-sm font-extrabold text-slate-200/90">
                  Service
                  <select className={inputClass} value={form.service} onChange={update('service')}>
                    <option value="">Select service</option>
                    {services.map((s) => (
                      <option key={s.slug} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <label className="grid gap-2 text-sm font-extrabold text-slate-200/90">
                Message
                <textarea
                  className={inputClass}
                  value={form.message}
                  onChange={update('message')}
                  rows={6}
                  required
                  placeholder="Write your requirement..."
                />
              </label>
              <button
                type="submit"
                disabled={sending}
                className="w-full rounded-2xl bg-gradient-to-r from-brand-gold2 to-brand-gold px-7 py-3 font-extrabold text-ink-950 shadow-glowGold transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:justify-self-start"
              >
                {sending ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </Reveal>

          <Reveal delay={140}>
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-brand-gold/10 to-white/6 p-5 shadow-glowSoft sm:p-7">
              <div className="text-lg font-extrabold text-white sm:text-xl">Contact Details</div>
              <div className="mt-5 grid gap-4 text-slate-300/75">
                <div className="flex gap-3">
                  <PhoneCall className="mt-1 shrink-0 text-brand-gold" size={18} />
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-300/60">Phone</div>
                    <div className="break-words text-slate-200/90">{site.support.landlineE164}</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Mail className="mt-1 shrink-0 text-brand-gold" size={18} />
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-300/60">Email</div>
                    <div className="break-words text-slate-200/90">{site.support.email}</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MapPin className="mt-1 shrink-0 text-brand-gold" size={18} />
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-300/60">Address</div>
                    <div className="break-words text-slate-200/90">{site.address}</div>
                  </div>
                </div>
              </div>
              <div className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-black/25">
                <iframe
                  title="map"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(site.address)}&output=embed`}
                  className="h-52 w-full border-0 sm:h-64 lg:h-72"
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </Shell>
  );
}
