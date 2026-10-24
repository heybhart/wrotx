import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const whatsappNumber = '919322208664';
  const prefilledMessage = encodeURIComponent(
    "Hi WrotX! We would like to discuss a website, custom software, or AI agent project for our business."
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${prefilledMessage}`;
  const phoneCallUrl = 'tel:+919322208664';

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2.5">
      {/* Mobile Click-to-Call direct floating shortcut */}
      <a
        href={phoneCallUrl}
        aria-label="Call WrotX directly"
        className="md:hidden flex items-center gap-2 bg-white/95 dark:bg-slate-900/80 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-[#D9480F] backdrop-blur-xl px-4 py-2.5 rounded-full shadow-lg border border-slate-200/90 dark:border-white/20 text-xs font-semibold tracking-wide transition-all active:scale-95"
      >
        <Phone size={14} className="text-[#D9480F] dark:text-[#F97316]" />
        <span>Call Now</span>
      </a>

      {/* Floating WhatsApp Action Button in Pure White Glass / Dark Glass */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with WrotX on WhatsApp"
        className="group flex items-center gap-2.5 bg-white/95 dark:bg-slate-900/80 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-[#D9480F] backdrop-blur-2xl px-4 py-3 rounded-full shadow-2xl border border-slate-200/90 hover:border-slate-300 dark:border-white/20 dark:hover:border-white/40 transition-all duration-200 active:scale-95 cursor-pointer"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
        <MessageCircle size={18} className="text-emerald-500" />
        <span className="text-xs font-semibold tracking-wide">
          WhatsApp Us
        </span>
      </a>
    </div>
  );
};
