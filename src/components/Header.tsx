import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LucideIcon } from './LucideIcon';

interface HeaderProps {
  onOpenConsultation: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenConsultation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('work');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['portfolio', 'capabilities', 'process', 'about', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= -200 && rect.top <= 400) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Work', href: '#portfolio', id: 'portfolio' },
    { label: 'Services', href: '#capabilities', id: 'capabilities' },
    { label: 'Philosophy', href: '#process', id: 'process' },
    { label: 'Studio', href: '#about', id: 'about' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500 border-b ${
          isScrolled 
            ? 'bg-[#131313]/90 border-white/10 backdrop-blur-md py-4 shadow-xl' 
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="flex justify-between items-center h-20 px-5 md:px-16 max-w-[1440px] mx-auto w-full">
          {/* Brand Logo in Bebas Neue */}
          <a
            href="#"
            className="font-display-xl text-[48px] leading-none tracking-tighter text-white uppercase select-none transition-opacity hover:opacity-90"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            WrotX
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`font-label-caps text-[12px] uppercase tracking-widest transition-all duration-300 pb-1 ${
                    isActive
                      ? 'text-white border-b border-white hover:tracking-widest'
                      : 'text-zinc-400 hover:text-white hover:tracking-widest border-b border-transparent'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* CTA Action Button */}
          <div className="hidden md:flex items-center">
            <button
              onClick={onOpenConsultation}
              className="font-label-caps text-[12px] px-6 py-3 bg-white text-black uppercase tracking-widest hover:bg-zinc-200 transition-all active:scale-95 font-semibold cursor-pointer"
            >
              Start Project
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-450 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              <LucideIcon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-[80px] z-45 md:hidden"
          >
            <div className="border border-t-0 border-white/10 p-6 shadow-2xl flex flex-col space-y-4 max-h-[85vh] overflow-y-auto bg-[#131313]">
              <div className="space-y-1">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => {
                        handleLinkClick(e, link.href);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors font-label-caps uppercase tracking-wider ${
                        isActive 
                          ? 'bg-white/5 text-white border-l-2 border-white pl-3' 
                          : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span>{link.label}</span>
                      <LucideIcon name="ArrowRight" size={14} className="opacity-40" />
                    </a>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-white/10 space-y-3">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenConsultation();
                  }}
                  className="w-full py-3 bg-white text-black font-semibold text-xs flex items-center justify-center space-x-2 font-label-caps uppercase tracking-widest hover:bg-zinc-200 transition-all cursor-pointer"
                >
                  <LucideIcon name="Calendar" size={14} />
                  <span>Start Project</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
