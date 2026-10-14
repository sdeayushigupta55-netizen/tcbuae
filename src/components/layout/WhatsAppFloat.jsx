import { MessageCircle } from 'lucide-react';
import { site } from '../../config';

export function WhatsAppFloat() {
  const digits = site.whatsapp.replace(/\D/g, '');
  if (!digits) return null;

  return (
    <a
      href={`https://wa.me/${digits}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full border border-emerald-300/25 bg-emerald-400/10 px-4 py-3 shadow-soft backdrop-blur-xl transition hover:bg-emerald-400/15"
      aria-label="WhatsApp"
    >
      <span className="grid h-10 w-10 place-items-center rounded-full border border-emerald-300/25 bg-emerald-400/15">
        <MessageCircle className="text-emerald-200" size={18} />
      </span>
      <span className="hidden font-extrabold text-emerald-100 sm:block">WhatsApp</span>
    </a>
  );
}
