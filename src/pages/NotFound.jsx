import { Link } from 'react-router-dom';
import { Shell } from '../components/ui/Shell';

export function NotFound() {
  return (
    <Shell>
      <section className="mx-auto w-[min(1150px,92%)] py-16 sm:py-20 lg:py-24">
        <div className="rounded-3xl border border-white/10 bg-ink-900/55 p-10 shadow-glowSoft">
          <div className="text-sm font-extrabold uppercase tracking-wider text-brand-gold">404</div>
          <h1 className="mt-2 text-3xl font-black text-white sm:text-4xl">Page not found</h1>
          <p className="mt-3 max-w-[70ch] text-slate-300/75">
            The page you’re looking for doesn’t exist or may have been moved.
          </p>
          <div className="mt-7">
            <Link
              to="/"
              className="inline-flex rounded-2xl bg-gradient-to-r from-brand-gold2 to-brand-gold px-6 py-3 font-extrabold text-ink-950 shadow-glowGold transition hover:opacity-95"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </Shell>
  );
}
