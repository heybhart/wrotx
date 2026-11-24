import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import logoImg from '../assets/logo-sm.webp';
import { SITE_CONFIG } from '../config/site';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { pathname } = useLocation();

  const handleHashScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (pathname !== '/') return;
    e.preventDefault();
    if (targetId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(targetId);
    if (element) {
      const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - 76;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-white/80 dark:bg-[#090D16]/90 backdrop-blur-xl border-t border-slate-200/70 dark:border-white/10 pt-16 pb-12 select-none relative z-10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-200/70 dark:border-white/10">

          {/* Column 1: Brand */}
          <div className="md:col-span-5 space-y-4">
            <Link
              to="/"
              onClick={(e) => handleHashScroll(e, 'top')}
              className="inline-flex items-center cursor-pointer select-none"
            >
              <img
                src={logoImg}
                alt="WrotX - Mumbai Website, Software and AI Agent Development Studio"
                width={140}
                height={70}
                loading="lazy"
                decoding="async"
                className="h-8 sm:h-9 w-auto object-contain hover:opacity-90 transition-opacity"
              />
            </Link>

            <p className="font-sans text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              Fast websites, custom software and AI assistants for Indian businesses. No hidden Cost. You own everything.
            </p>

            <div className="pt-2 flex flex-col space-y-2 font-mono text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Phone size={14} strokeWidth={1.5} className="text-[#D9480F] dark:text-[#F97316] shrink-0" />
                <a
                  href={`tel:${SITE_CONFIG.phones[0].tel}`}
                  className="hover:text-[#D9480F] dark:hover:text-[#F97316] transition-colors"
                >
                  {SITE_CONFIG.phones[0].display}
                </a>
                <span className="text-slate-400 dark:text-slate-600">/</span>
                <a
                  href={`tel:${SITE_CONFIG.phones[1].tel}`}
                  className="hover:text-[#D9480F] dark:hover:text-[#F97316] transition-colors"
                >
                  {SITE_CONFIG.phones[1].display}
                </a>
              </div>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="hover:text-[#D9480F] dark:hover:text-[#F97316] transition-colors flex items-center gap-2"
              >
                <Mail size={14} strokeWidth={1.5} className="text-[#D9480F] dark:text-[#F97316]" />
                <span>{SITE_CONFIG.email}</span>
              </a>
              <div className="flex items-center gap-2">
                <MapPin size={14} strokeWidth={1.5} className="text-[#D9480F] dark:text-[#F97316]" />
                <span>{SITE_CONFIG.location}</span>
              </div>
            </div>
          </div>

          {/* Column 2: What we build */}
          <div className="md:col-span-3 space-y-3">
            <span className="font-mono text-xs text-[#C23E0A] dark:text-[#F97316] uppercase tracking-wider block font-semibold mb-2">
              What We Build
            </span>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/website-development-mumbai" className="hover:text-[#D9480F] dark:hover:text-white transition-colors">
                  Websites (Mumbai)
                </Link>
              </li>
              <li>
                <Link to="/custom-software-development" className="hover:text-[#D9480F] dark:hover:text-white transition-colors">
                  Software &amp; Apps
                </Link>
              </li>
              <li>
                <Link to="/ai-agent-development" className="hover:text-[#D9480F] dark:hover:text-white transition-colors">
                  AI Agents
                </Link>
              </li>
              <li>
                <Link to="/whatsapp-automation" className="hover:text-[#D9480F] dark:hover:text-white transition-colors">
                  WhatsApp Automation
                </Link>
              </li>
              <li>
                <Link to="/ai-calling-agents" className="hover:text-[#D9480F] dark:hover:text-white transition-colors">
                  AI Calling Agents
                </Link>
              </li>
              <li>
                <Link to="/real-estate-websites" className="hover:text-[#D9480F] dark:hover:text-white transition-colors">
                  Real Estate Websites
                </Link>
              </li>
              <li>
                <Link to="/banking-fintech-solutions" className="hover:text-[#D9480F] dark:hover:text-white transition-colors">
                  Banking &amp; FinTech
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div className="md:col-span-4 space-y-3">
            <span className="font-mono text-xs text-[#C23E0A] dark:text-[#F97316] uppercase tracking-wider block font-semibold mb-2">
              Quick Links
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <Link to="/work" className="hover:text-[#D9480F] dark:hover:text-white transition-colors">
                Our Work
              </Link>
              <Link to="/portfolio" className="hover:text-[#D9480F] dark:hover:text-white transition-colors">
                Portfolio
              </Link>
              <Link to="/about" className="hover:text-[#D9480F] dark:hover:text-white transition-colors">
                About WrotX
              </Link>
              <Link to="/blog" className="hover:text-[#D9480F] dark:hover:text-white transition-colors">
                Blog
              </Link>
              <Link to="/contact" className="hover:text-[#D9480F] dark:hover:text-white transition-colors">
                Contact Us
              </Link>
              <Link to="/#faq" onClick={(e) => handleHashScroll(e, 'faq')} className="hover:text-[#D9480F] dark:hover:text-white transition-colors">
                FAQ
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Note */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-[11px] text-slate-500 dark:text-slate-500">
          <div>
            © {currentYear} {SITE_CONFIG.legalName} · {SITE_CONFIG.city}, India
          </div>
          <div className="flex items-center gap-3">
            <span>Mumbai Based</span>
            <span>·</span>
            <span>100% Code Ownership</span>
            <span>·</span>
            <span>Engineering Team</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
