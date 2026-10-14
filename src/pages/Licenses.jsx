import { Link } from 'react-router-dom';
import {
  Building2,
  Calendar,
  Download,
  FileCheck2,
  ShieldCheck,
} from 'lucide-react';
import { licenses } from '../services';
import { Reveal } from '../components/ui/Reveal';
import { Shell } from '../components/ui/Shell';

function Badge({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-extrabold text-slate-200/90">
      {children}
    </span>
  );
}

function LicenseRow({ icon, label, value, valueClass = 'text-white' }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-white/10 py-3 last:border-b-0">
      <div className="flex items-center gap-2 text-sm text-slate-300/75">
        <span className="grid h-8 w-8 place-items-center rounded-xl border border-white/10 bg-black/25">{icon}</span>
        <span className="font-semibold">{label}</span>
      </div>
      <div className={`text-right text-sm font-extrabold ${valueClass}`}>{value}</div>
    </div>
  );
}

function LicenseCard({ doc, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-ink-900/55 shadow-glowSoft">
        <div className="absolute inset-0 bg-[radial-gradient(600px_260px_at_20%_0%,rgba(201,162,39,0.16),transparent_60%),radial-gradient(600px_260px_at_80%_30%,rgba(255,255,255,0.06),transparent_55%)] opacity-0 transition duration-300 group-hover:opacity-100" />
        <div className="relative p-7">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <Badge>
                  <ShieldCheck size={14} className="text-brand-gold" />
                  Verified License
                </Badge>
                <Badge>
                  <FileCheck2 size={14} className="text-brand-gold" />
                  {doc.category}
                </Badge>
              </div>
              <h3 className="mt-4 text-xl font-black tracking-tight text-white sm:text-2xl">{doc.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300/75">{doc.note}</p>
            </div>
            <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.04]">
              <ShieldCheck className="text-brand-gold" size={20} />
            </div>
          </div>
          <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-4">
            <LicenseRow icon={<Building2 size={16} className="text-brand-gold" />} label="Authority" value={doc.authority} valueClass="text-slate-100" />
            <LicenseRow icon={<FileCheck2 size={16} className="text-brand-gold" />} label="License No." value={doc.licenseNo} valueClass="text-brand-gold" />
            <LicenseRow icon={<Calendar size={16} className="text-brand-gold" />} label="Issue Date" value={doc.issueDate} valueClass="text-slate-100" />
            <LicenseRow icon={<Calendar size={16} className="text-brand-gold" />} label="Expiry Date" value={doc.expiryDate} valueClass="text-slate-100" />
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={doc.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-brand-gold2 to-brand-gold px-5 py-3 font-extrabold text-ink-950 shadow-glowGold transition hover:opacity-95"
            >
              <Download size={16} />
              View PDF
            </a>
            <a
              href={doc.url}
              download
              className="inline-flex items-center gap-2 rounded-2xl border border-white/12 bg-white/[0.04] px-5 py-3 font-extrabold text-white transition hover:bg-white/[0.07]"
            >
              <Download size={16} />
              Download
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/12 bg-white/[0.04] px-5 py-3 font-extrabold text-white transition hover:bg-white/[0.07]"
            >
              Request verification
            </Link>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function Licenses() {
  return (
    <Shell>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_15%_10%,rgba(201,162,39,0.16),transparent_55%),radial-gradient(900px_520px_at_85%_20%,rgba(255,255,255,0.06),transparent_55%)]" />
        <div className="relative mx-auto w-[min(1150px,92%)] py-16 sm:py-20 lg:py-24">
          <Reveal>
            <div className="text-sm font-extrabold uppercase tracking-wider text-brand-gold">Licenses</div>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">Licenses & Certifications</h1>
            <p className="mt-3 max-w-[85ch] leading-relaxed text-slate-300/75">
              Official licensing details and documents for compliance and client verification. View or download PDFs,
              and request verification anytime.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge>
                <ShieldCheck size={14} className="text-brand-gold" />
                Compliance-ready
              </Badge>
              <Badge>
                <FileCheck2 size={14} className="text-brand-gold" />
                Government authority
              </Badge>
              <Badge>
                <Building2 size={14} className="text-brand-gold" />
                RAKEZ
              </Badge>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto w-[min(1150px,92%)] py-16 sm:py-20 lg:py-24">
        <div className="grid gap-6 lg:grid-cols-3">
          <Reveal>
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-brand-gold/12 to-white/6 p-7 shadow-glowSoft">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-black/25">
                  <ShieldCheck className="text-brand-gold" size={20} />
                </div>
                <div>
                  <div className="text-lg font-extrabold text-white">Verified & Transparent</div>
                  <div className="text-sm text-slate-300/70">Premium corporate compliance</div>
                </div>
              </div>
              <div className="mt-5 grid gap-3 text-sm text-slate-300/75">
                <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                  Keep all license numbers, dates, and authority names exactly as per the PDF.
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                  Add separate PDFs per license if client provides individual files (recommended).
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                  Want a “Verified by Authority” section? We can add QR/verification references here.
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="rounded-2xl bg-gradient-to-r from-brand-gold2 to-brand-gold px-6 py-3 font-extrabold text-ink-950 shadow-glowGold transition hover:opacity-95"
                >
                  Contact for Verification
                </Link>
                <Link
                  to="/services"
                  className="rounded-2xl border border-white/12 bg-white/[0.04] px-6 py-3 font-extrabold text-white transition hover:bg-white/[0.07]"
                >
                  Explore Services
                </Link>
              </div>
            </div>
          </Reveal>
          <div className="grid gap-6 lg:col-span-2">
            {licenses.map((doc, index) => (
              <LicenseCard key={doc.id} doc={doc} delay={index * 80} />
            ))}
          </div>
        </div>
      </section>
    </Shell>
  );
}
