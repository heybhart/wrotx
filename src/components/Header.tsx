import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import logoImg from '../assets/logo-sm.webp';
import { getWhatsappUrl } from '../config/site';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleTheme } = useTheme();
  const { pathname } = useLocation();

  const navRef = useRef<HTMLElement>(null);
  const linksRef = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const [highlightStyle, setHighlightStyle] = useState<React.CSSProperties>({
    opacity: 0,
    width: 0,
    transform: 'translateX(0px)',
  });

  const navLinks = [
    { label: 'Websites', href: '/website-development-mumbai' },
    { label: 'AI agents', href: '/ai-agent-development' },
    { label: 'Software', href: '/custom-software-development' },
    { label: 'Our work', href: '/work' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Contact', href: '/contact' },
  ];

  const whatsappUrl = getWhatsappUrl('Hi WrotX, I want to start a project.');

  const moveToLink = (el: HTMLAnchorElement | null | undefined) => {
    if (!el) {
      setHighlightStyle((prev) => ({ ...prev, opacity: 0 }));
      return;
    }
    setHighlightStyle({
      opacity: 1,
      width: el.offsetWidth,
      transform: `translateX(${el.offsetLeft}px)`,
    });
  };

  const handleStartProjectClick = (e: React.MouseEvent) => {
    setIsMobileMenuOpen(false);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      e.preventDefault();
      const offsetPosition = contactEl.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      if (window.location.hash !== '#contact') {
        window.history.pushState(null, '', pathname === '/' ? '/#contact' : `${pathname}#contact`);
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const activeEl = linksRef.current.get(pathname);
    moveToLink(activeEl);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      const activeEl = linksRef.current.get(pathname);
      moveToLink(activeEl);
    };
    window.addEventListener('resize', handleResize);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(handleResize);
    }
    return () => window.removeEventListener('resize', handleResize);
  }, [pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.wx-bar')) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <div className="wx-wrap">
      <header className={`wx-bar ${isScrolled ? 'wx-s' : ''}`}>
        <Link
          to="/"
          className="wx-logo flex items-center"
          aria-label="WrotX home"
          onClick={() => {
            if (pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <img
            src={logoImg}
            alt="WrotX - Mumbai Website, Software and AI Agent Development Studio"
            width={140}
            height={70}
            className="h-8 sm:h-8.5 w-auto object-contain hover:opacity-90 transition-opacity"
          />
        </Link>

        <nav
          ref={navRef}
          className="wx-links"
          aria-label="Main"
          onMouseLeave={() => moveToLink(linksRef.current.get(pathname))}
        >
          <span className="wx-hl" style={highlightStyle} aria-hidden="true" />
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              ref={(el) => {
                if (el) linksRef.current.set(link.href, el);
                else linksRef.current.delete(link.href);
              }}
              aria-current={pathname === link.href ? 'page' : undefined}
              onMouseEnter={(e) => moveToLink(e.currentTarget)}
              onFocus={(e) => moveToLink(e.currentTarget)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="wx-right">
          <button
            onClick={toggleTheme}
            type="button"
            aria-label="Toggle theme"
            title="Toggle theme"
            className="wx-ic"
            style={{ color: 'var(--wx-ink)' }}
          >
            <Sun size={18} strokeWidth={2} className="hidden dark:block text-amber-400" />
            <Moon size={18} strokeWidth={2} className="block dark:hidden text-slate-700" />
          </button>

          <a
            className="wx-ic"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 5h16v11H9l-5 4z" />
            </svg>
          </a>

          <Link
            to="/#contact"
            className="wx-cta"
            onClick={handleStartProjectClick}
          >
            Start a project
          </Link>

          <button
            className="wx-ic wx-mb"
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M4 8h16M4 16h16" />
              </svg>
            )}
          </button>
        </div>

        <div className={`wx-mp ${isMobileMenuOpen ? 'wx-open' : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>
            About
          </Link>
          <Link to="/blog" onClick={() => setIsMobileMenuOpen(false)}>
            Blog
          </Link>
          <div className="pt-2 flex items-center justify-between px-3.5 pb-1 border-t border-slate-200/60 dark:border-white/10">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Appearance</span>
            <button
              onClick={toggleTheme}
              type="button"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-white/15 bg-white/60 dark:bg-white/10 text-xs text-slate-800 dark:text-slate-200 cursor-pointer"
            >
              <span className="hidden dark:inline-flex items-center gap-1.5">
                <Sun size={13} className="text-amber-400" />
                <span>Dark Mode</span>
              </span>
              <span className="inline-flex dark:hidden items-center gap-1.5">
                <Moon size={13} className="text-slate-700" />
                <span>Light Mode</span>
              </span>
            </button>
          </div>
          <Link
            to="/#contact"
            className="wx-cta"
            onClick={handleStartProjectClick}
          >
            Start a project
          </Link>
        </div>
      </header>
    </div>
  );
};
