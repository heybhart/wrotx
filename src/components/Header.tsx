import React, { useState, useEffect } from 'react';
import { Menu, X, Mail, MessageCircle, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import logoImg from '../assets/logo.webp';

interface HeaderProps {
  onQuoteClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onQuoteClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Problems', href: '#problems' },
    { label: 'Our Work', href: '#work' },
    // { label: 'AI Voice', href: '#ai-voice' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'FAQ', href: '#faq' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const whatsappUrl = `https://wa.me/919322208664?text=${encodeURIComponent(
    "Hi WrotX! We would like to get a free quote for our project."
  )}`;

  return (
    <header className="fixed top-3 sm:top-4 inset-x-0 z-50 px-4 sm:px-8 pointer-events-none select-none">
      <div className="max-w-[1440px] mx-auto pointer-events-auto">

        {/* Rectangular Glassmorphism Navbar */}
        <div
          className={`w-full rounded-2xl transition-all duration-300 px-5 sm:px-7 py-2.5 sm:py-3 flex items-center justify-between ${
            isScrolled
              ? 'bg-white/45 dark:bg-[#090D16]/65 backdrop-blur-[28px] border border-slate-300/90 dark:border-white/20 shadow-[0_14px_36px_-6px_rgba(15,23,42,0.1),inset_0_1.5px_2px_rgba(255,255,255,0.95)]'
              : 'bg-white/35 dark:bg-white/5 backdrop-blur-[24px] border border-slate-300/80 dark:border-white/15 shadow-[0_8px_28px_-4px_rgba(15,23,42,0.06),inset_0_1.5px_2px_rgba(255,255,255,0.9)]'
          }`}
        >
          {/* Left: Brand Logo */}
          <div className="flex items-center">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group flex items-center cursor-pointer select-none"
            >
              <img
                src={logoImg}
                alt="WrotX - Mumbai Website, Software and AI Agent Development Studio"
                width={140}
                height={36}
                className="h-8 sm:h-9 w-auto object-contain hover:opacity-90 transition-opacity"
              />
            </a>
          </div>

          {/* Center: Nav Links (Pricing and FAQ removed) */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-white/70 dark:hover:bg-white/10 hover:border-slate-300/70 dark:hover:border-white/15 border border-transparent transition-all font-semibold"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Actions: Theme Toggle, Mail & WhatsApp */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <button
              onClick={toggleTheme}
              type="button"
              aria-label="Toggle theme"
              title="Toggle theme"
              className="w-9 h-9 rounded-xl flex items-center justify-center border border-slate-300/80 bg-white/70 dark:border-white/15 dark:bg-white/10 text-slate-700 dark:text-amber-300 backdrop-blur-md transition-all cursor-pointer shadow-2xs hover:bg-white dark:hover:bg-white/20 active:scale-95"
            >
              <Sun size={15} strokeWidth={2} className="hidden dark:block text-amber-400" />
              <Moon size={15} strokeWidth={2} className="block dark:hidden text-slate-700" />
            </button>

            <a
              href="mailto:work@wrotx.in"
              aria-label="Send email to work@wrotx.in"
              className="hidden sm:flex bg-[#ffe600] text-[#131b2e] dark:bg-[#ffe600] dark:text-[#131b2e] font-mono text-xs uppercase font-bold px-3.5 py-2 rounded-lg shadow-[2px_2px_0px_#131b2e] dark:shadow-[2px_2px_0px_rgba(255,255,255,0.3)] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#131b2e] active:translate-y-[0px] active:shadow-[1px_1px_0px_#131b2e] transition-all items-center gap-1.5 cursor-pointer"
            >
              <Mail size={14} strokeWidth={2} />
              <span>Mail</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get Free Quote on WhatsApp"
              className="bg-[#00fe66] text-[#00280b] dark:bg-[#00fe66] dark:text-[#00280b] font-mono text-xs uppercase font-bold px-4 py-2 rounded-lg shadow-[2px_2px_0px_#00280b] dark:shadow-[2px_2px_0px_rgba(255,255,255,0.3)] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#00280b] active:translate-y-[0px] active:shadow-[1px_1px_0px_#00280b] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <MessageCircle size={14} strokeWidth={2} />
              <span>Get Free Quote</span>
            </a>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-slate-800 dark:text-white border border-slate-300/80 bg-white/70 dark:border-white/15 dark:bg-white/10 cursor-pointer shadow-2xs hover:bg-white dark:hover:bg-white/20 transition-all"
            >
              {isMobileMenuOpen ? <X size={16} strokeWidth={2} /> : <Menu size={16} strokeWidth={2} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-2.5 w-full rounded-2xl bg-white/95 dark:bg-[#090D16]/95 backdrop-blur-2xl border border-slate-300/90 dark:border-white/15 p-5 space-y-4 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-white/10">
              <span className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Appearance
              </span>
              <button
                onClick={toggleTheme}
                type="button"
                aria-label="Toggle theme"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-white/15 bg-slate-50 dark:bg-white/10 text-xs font-mono text-slate-800 dark:text-slate-200"
              >
                <span className="hidden dark:inline-flex items-center gap-2">
                  <Sun size={13} className="text-amber-400" />
                  <span>Dark Mode</span>
                </span>
                <span className="inline-flex dark:hidden items-center gap-2">
                  <Moon size={13} className="text-slate-700" />
                  <span>Light Mode</span>
                </span>
              </button>
            </div>

            <nav className="flex flex-col space-y-1.5 text-xs font-mono uppercase tracking-wider text-slate-800 dark:text-slate-200">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="pt-2 flex flex-col gap-2.5 text-xs font-mono border-t border-slate-200/60 dark:border-white/10">
              <a
                href="mailto:work@wrotx.in"
                className="w-full bg-[#ffe600] text-[#131b2e] dark:bg-[#ffe600] dark:text-[#131b2e] font-mono text-xs uppercase font-bold px-4 py-2.5 rounded-lg shadow-[2px_2px_0px_#131b2e] flex items-center justify-center gap-2"
              >
                <Mail size={14} strokeWidth={2} />
                <span>work@wrotx.in</span>
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#00fe66] text-[#00280b] dark:bg-[#00fe66] dark:text-[#00280b] font-mono text-xs uppercase font-bold px-4 py-2.5 rounded-lg shadow-[2px_2px_0px_#00280b] flex items-center justify-center gap-2"
              >
                <MessageCircle size={14} strokeWidth={2} />
                <span>WhatsApp: Get Free Quote</span>
              </a>
              <p className="text-[11px] text-slate-500 dark:text-slate-500 text-center pt-1">
                Mumbai, India · Fixed Pricing · GST Invoices Provided
              </p>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
