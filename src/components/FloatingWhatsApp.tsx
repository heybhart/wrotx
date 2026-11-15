import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, ArrowUp } from 'lucide-react';
import { SITE_CONFIG, getWhatsappUrl } from '../config/site';

export const FloatingWhatsApp: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 280);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappUrl = getWhatsappUrl(
    `Hi ${SITE_CONFIG.brandName}! We would like to discuss a website, custom software, or AI agent project for our business.`
  );
  const phoneCallUrl = `tel:${SITE_CONFIG.phones[0].tel}`;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2.5">
      {/* Scroll to Top Button - stays on right side directly above WhatsApp when scrolled */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
        title="Scroll to top"
        className={`w-11 h-11 rounded-full bg-white/95 dark:bg-slate-900/90 text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 backdrop-blur-2xl shadow-xl border border-slate-200/90 hover:border-slate-300 dark:border-white/20 flex items-center justify-center transition-all duration-300 active:scale-90 cursor-pointer ${
          showScrollTop
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'opacity-0 translate-y-3 scale-90 pointer-events-none'
        }`}
      >
        <ArrowUp size={18} strokeWidth={2.5} />
      </button>

      {/* Mobile Click-to-Call direct shortcut (strictly hidden on desktop via md:!hidden) */}
      <a
        href={phoneCallUrl}
        aria-label={`Call Now - ${SITE_CONFIG.brandName}`}
        className="flex md:!hidden items-center gap-2 bg-white/95 dark:bg-slate-900/80 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-[#D9480F] backdrop-blur-xl px-4 py-2.5 rounded-full shadow-lg border border-slate-200/90 dark:border-white/20 text-xs font-semibold tracking-wide transition-all active:scale-95"
      >
        <Phone size={14} className="text-[#D9480F] dark:text-[#F97316]" />
        <span>Call Now</span>
      </a>

      {/* Floating WhatsApp Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`WhatsApp Us, chat with ${SITE_CONFIG.brandName}`}
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
