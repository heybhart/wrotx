import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import logoImg from '../assets/logo.webp';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (targetId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 76;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-white/80 dark:bg-[#090D16]/90 backdrop-blur-xl border-t border-slate-200/70 dark:border-white/10 pt-16 pb-12 select-none relative z-10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-200/70 dark:border-white/10">

          {/* Column 1: Brand */}
          <div className="md:col-span-5 space-y-4">
            <a
              href="#"
              onClick={(e) => handleScrollTo(e, 'top')}
              className="inline-flex items-center cursor-pointer select-none"
            >
              <img
                src={logoImg}
                alt="WrotX - Mumbai Website, Software and AI Agent Development Studio"
                width={140}
                height={36}
                loading="lazy"
                decoding="async"
                className="h-8 sm:h-9 w-auto object-contain hover:opacity-90 transition-opacity"
              />
            </a>

            <p className="font-sans text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              Fast websites, custom software and AI assistants for Indian businesses. No hidden Cost. You own everything.
            </p>

            <div className="pt-2 flex flex-col space-y-2 font-mono text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Phone size={14} strokeWidth={1.5} className="text-[#D9480F] dark:text-[#F97316] shrink-0" />
                <a
                  href="tel:+919322208664"
                  className="hover:text-[#D9480F] dark:hover:text-[#F97316] transition-colors"
                >
                  +91 9322208664
                </a>
                <span className="text-slate-400 dark:text-slate-600">/</span>
                <a
                  href="tel:+919967478623"
                  className="hover:text-[#D9480F] dark:hover:text-[#F97316] transition-colors"
                >
                  +91 9967478623
                </a>
              </div>
              <a
                href="mailto:work@wrotx.in"
                className="hover:text-[#D9480F] dark:hover:text-[#F97316] transition-colors flex items-center gap-2"
              >
                <Mail size={14} strokeWidth={1.5} className="text-[#D9480F] dark:text-[#F97316]" />
                <span>work@wrotx.in</span>
              </a>
              <div className="flex items-center gap-2">
                <MapPin size={14} strokeWidth={1.5} className="text-[#D9480F] dark:text-[#F97316]" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>

          {/* Column 2: What we build */}
          <div className="md:col-span-3 space-y-3">
            <span className="font-mono text-xs text-[#D9480F] dark:text-[#F97316] uppercase tracking-wider block font-semibold mb-2">
              What We Build
            </span>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <li>
                <a href="#services" onClick={(e) => handleScrollTo(e, 'services')} className="hover:text-[#D9480F] dark:hover:text-white transition-colors">
                  Websites
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleScrollTo(e, 'services')} className="hover:text-[#D9480F] dark:hover:text-white transition-colors">
                  Software &amp; Apps
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleScrollTo(e, 'services')} className="hover:text-[#D9480F] dark:hover:text-white transition-colors">
                  AI Assistants
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleScrollTo(e, 'services')} className="hover:text-[#D9480F] dark:hover:text-white transition-colors">
                  Automation
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div className="md:col-span-4 space-y-3">
            <span className="font-mono text-xs text-[#D9480F] dark:text-[#F97316] uppercase tracking-wider block font-semibold mb-2">
              Quick Links
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <a href="#problems" onClick={(e) => handleScrollTo(e, 'problems')} className="hover:text-[#D9480F] dark:hover:text-white transition-colors">
                Problems We Fix
              </a>
              <a href="#services" onClick={(e) => handleScrollTo(e, 'services')} className="hover:text-[#D9480F] dark:hover:text-white transition-colors">
                What We Build
              </a>
              <a href="#work" onClick={(e) => handleScrollTo(e, 'work')} className="hover:text-[#D9480F] dark:hover:text-white transition-colors">
                Our Work
              </a>
              {/* <a href="#ai-voice" onClick={(e) => handleScrollTo(e, 'ai-voice')} className="hover:text-[#D9480F] dark:hover:text-white transition-colors">
                AI Voice &amp; WhatsApp
              </a> */}
              <a href="#how-it-works" onClick={(e) => handleScrollTo(e, 'how-it-works')} className="hover:text-[#D9480F] dark:hover:text-white transition-colors">
                How It Works
              </a>
              <a href="#why-wrotx" onClick={(e) => handleScrollTo(e, 'why-wrotx')} className="hover:text-[#D9480F] dark:hover:text-white transition-colors">
                Why Us
              </a>
              <a href="#faq" onClick={(e) => handleScrollTo(e, 'faq')} className="hover:text-[#D9480F] dark:hover:text-white transition-colors">
                FAQ
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Note */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-[11px] text-slate-500 dark:text-slate-500">
          <div>
            © {currentYear} WrotX AI · Mumbai, India · GST Invoices Provided
          </div>
          <div className="flex items-center gap-3">
            <span>Mumbai Based</span>
            <span>·</span>
            <span>GST Invoices Provided</span>
            <span>·</span>
            <span>Engineering Team</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
