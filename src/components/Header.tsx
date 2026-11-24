import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sun,
  Moon,
  ChevronDown,
  ArrowUpRight,
  Monitor,
  Cpu,
  Bot,
  ShieldCheck,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { usePreviewModal } from '../context/PreviewModalContext';
import logoImg from '../assets/logo-sm.webp';
import { getWhatsappUrl } from '../config/site';

interface ServiceLink {
  label: string;
  href: string;
  desc?: string;
}

interface ServiceColumn {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  links: ServiceLink[];
}

const SERVICE_COLUMNS: ServiceColumn[] = [
  {
    title: 'Websites & Digital',
    subtitle: 'Business sites and real estate portals',
    icon: Monitor,
    links: [
      {
        label: 'Website Development',
        href: '/website-development-mumbai',
        desc: 'Fast business sites with WhatsApp and SEO',
      },
      {
        label: 'Real Estate Websites',
        href: '/real-estate-websites',
        desc: 'Project showcases, floorplans and lead forms',
      },
    ],
  },
  {
    title: 'Custom Software',
    subtitle: 'Internal tools, CRMs and portals',
    icon: Cpu,
    links: [
      {
        label: 'Custom Software Development',
        href: '/custom-software-development',
        desc: 'Portals, ERPs and custom team workflows',
      },
      {
        label: 'Banking & Fintech Solutions',
        href: '/banking-fintech-solutions',
        desc: 'Secure fintech platforms and payment systems',
      },
    ],
  },
  {
    title: 'AI & Automation',
    subtitle: 'Voice agents, WhatsApp and bots',
    icon: Bot,
    links: [
      {
        label: 'AI Agent Development',
        href: '/ai-agent-development',
        desc: 'Multi-language AI assistants for operations',
      },
      {
        label: 'AI Voice Calling Agents',
        href: '/ai-calling-agents',
        desc: 'Automated phone calling and qualification',
      },
      {
        label: 'WhatsApp Automation',
        href: '/whatsapp-automation',
        desc: '24/7 lead routing, follow-ups and alerts',
      },
    ],
  },
  {
    title: 'Studio & Company',
    subtitle: 'Zero lock-in and direct founder access',
    icon: ShieldCheck,
    links: [
      {
        label: 'Work & Case Studies',
        href: '/work',
        desc: 'Real client results and live systems',
      },
      {
        label: 'Portfolio & Demos',
        href: '/portfolio',
        desc: 'Websites, AI agents & custom apps',
      },
      {
        label: 'About WrotX',
        href: '/about',
        desc: 'Engineering team and zero lock-in pledge',
      },
      {
        label: 'Contact Team',
        href: '/contact',
        desc: 'Direct founder chat and enquiry',
      },
    ],
  },
];

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isServicesPinned, setIsServicesPinned] = useState(false);

  const { toggleTheme } = useTheme();
  const { openPreviewModal } = usePreviewModal();
  const { pathname } = useLocation();

  const navRef = useRef<HTMLElement>(null);
  const linksRef = useRef<Map<string, HTMLElement>>(new Map());
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [highlightStyle, setHighlightStyle] = useState<React.CSSProperties>({
    opacity: 0,
    width: 0,
    transform: 'translateX(0px)',
  });

  const whatsappUrl = getWhatsappUrl('Hi WrotX, I want to start a project.');

  const isServicePage = [
    '/website-development-mumbai',
    '/custom-software-development',
    '/ai-agent-development',
    '/whatsapp-automation',
    '/ai-calling-agents',
    '/real-estate-websites',
    '/banking-fintech-solutions',
  ].includes(pathname);

  const getActiveNavElement = () => {
    const NAVBAR_ROUTES = ['/', '/work', '/portfolio', '/about', '/contact'];
    if (NAVBAR_ROUTES.includes(pathname)) {
      return linksRef.current.get(pathname);
    }
    return null;
  };

  const moveToLink = (el: HTMLElement | null | undefined) => {
    if (!el || !navRef.current) {
      setHighlightStyle({
        opacity: 0,
        width: 0,
        transform: 'translateX(0px)',
      });
      return;
    }
    const navRect = navRef.current.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setHighlightStyle({
      opacity: 1,
      width: elRect.width,
      transform: `translateX(${elRect.left - navRect.left}px)`,
    });
  };

  const handleServicesEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsServicesOpen(true);
  };

  const handleServicesLeave = () => {
    if (isServicesPinned) return;
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 250);
  };

  const handleServicesToggleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    if (isServicesPinned) {
      setIsServicesPinned(false);
      setIsServicesOpen(false);
    } else {
      setIsServicesPinned(true);
      setIsServicesOpen(true);
    }
  };

  const closeServices = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsServicesOpen(false);
    setIsServicesPinned(false);
  };

  const handlePreviewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    closeServices();
    openPreviewModal();
  };

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update highlight on route change and close menus
  useEffect(() => {
    closeServices();
    setIsMobileMenuOpen(false);
    moveToLink(getActiveNavElement());
  }, [pathname]);

  // Window resize highlight adjustment
  useEffect(() => {
    const handleResize = () => {
      moveToLink(getActiveNavElement());
    };
    window.addEventListener('resize', handleResize);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(handleResize);
    }
    return () => window.removeEventListener('resize', handleResize);
  }, [pathname]);

  // Click outside to close menus
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.wx-bar') && !target.closest('.wx-mega')) {
        setIsMobileMenuOpen(false);
        closeServices();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeServices();
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="wx-wrap">
      <header className={`wx-bar ${isScrolled ? 'wx-s' : ''}`}>
        {/* Brand Logo */}
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

        {/* Desktop Navbar Links */}
        <nav
          ref={navRef}
          className="wx-links"
          aria-label="Main"
          onMouseLeave={() => {
            moveToLink(getActiveNavElement());
          }}
        >
          <span className="wx-hl" style={highlightStyle} aria-hidden="true" />

          {/* Home */}
          <Link
            to="/"
            ref={(el) => {
              if (el) linksRef.current.set('/', el);
              else linksRef.current.delete('/');
            }}
            aria-current={pathname === '/' ? 'page' : undefined}
            onMouseEnter={(e) => moveToLink(e.currentTarget)}
            onFocus={(e) => moveToLink(e.currentTarget)}
          >
            Home
          </Link>

          {/* Work */}
          <Link
            to="/work"
            ref={(el) => {
              if (el) linksRef.current.set('/work', el);
              else linksRef.current.delete('/work');
            }}
            aria-current={pathname === '/work' ? 'page' : undefined}
            onMouseEnter={(e) => moveToLink(e.currentTarget)}
            onFocus={(e) => moveToLink(e.currentTarget)}
          >
            Work
          </Link>

          {/* Services Dropdown Toggle Button */}
          <div
            className="relative"
            onMouseEnter={handleServicesEnter}
            onMouseLeave={handleServicesLeave}
          >
            <button
              type="button"
              ref={(el) => {
                if (el) linksRef.current.set('services', el);
                else linksRef.current.delete('services');
              }}
              className={`wx-services-btn relative z-[2] px-3.5 py-2 text-sm font-medium transition-all flex items-center gap-1 cursor-pointer ${isServicesOpen || isServicesPinned
                ? 'wx-services-pill text-slate-900 dark:text-white'
                : isServicePage
                  ? 'text-slate-900 dark:text-white font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              onClick={handleServicesToggleClick}
              onMouseEnter={(e) => moveToLink(e.currentTarget)}
              onFocus={(e) => moveToLink(e.currentTarget)}
              aria-expanded={isServicesOpen || isServicesPinned}
              aria-haspopup="true"
            >
              <span>Services</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${isServicesOpen || isServicesPinned ? 'rotate-180' : ''
                  }`}
              />
            </button>
          </div>

          {/* Portfolio */}
          <Link
            to="/portfolio"
            ref={(el) => {
              if (el) linksRef.current.set('/portfolio', el);
              else linksRef.current.delete('/portfolio');
            }}
            aria-current={pathname === '/portfolio' ? 'page' : undefined}
            onMouseEnter={(e) => moveToLink(e.currentTarget)}
            onFocus={(e) => moveToLink(e.currentTarget)}
          >
            Portfolio
          </Link>

          {/* About */}
          <Link
            to="/about"
            ref={(el) => {
              if (el) linksRef.current.set('/about', el);
              else linksRef.current.delete('/about');
            }}
            aria-current={pathname === '/about' ? 'page' : undefined}
            onMouseEnter={(e) => moveToLink(e.currentTarget)}
            onFocus={(e) => moveToLink(e.currentTarget)}
          >
            About
          </Link>

          {/* Contact */}
          <Link
            to="/contact"
            ref={(el) => {
              if (el) linksRef.current.set('/contact', el);
              else linksRef.current.delete('/contact');
            }}
            aria-current={pathname === '/contact' ? 'page' : undefined}
            onMouseEnter={(e) => moveToLink(e.currentTarget)}
            onFocus={(e) => moveToLink(e.currentTarget)}
          >
            Contact
          </Link>
        </nav>

        {/* Right CTA & Controls */}
        <div className="wx-right">
          {/* Theme Switcher */}
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

          {/* WhatsApp Direct Link */}
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

          {/* Get Free Preview Button */}
          <button
            type="button"
            className="wx-cta cursor-pointer"
            onClick={handlePreviewClick}
          >
            Get free Preview
          </button>

          {/* Mobile Hamburger Button */}
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

        {/* Desktop Services Mega Menu */}
        {isServicesOpen && (
          <div
            className="wx-mega"
            onMouseEnter={handleServicesEnter}
            onMouseLeave={handleServicesLeave}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 text-left relative z-10">
              {/* Column 1: Websites & e-commerce */}
              <div className="lg:pr-8 lg:border-r lg:border-slate-900/10 dark:lg:border-white/10 space-y-5">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF0E6]/90 dark:bg-[#D9480F]/20 text-[#D9480F] dark:text-[#F97316] backdrop-blur-sm border border-[#D9480F]/15 flex items-center justify-center shrink-0 shadow-sm">
                    <Monitor size={20} strokeWidth={2.2} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-[15px] sm:text-base text-slate-900 dark:text-white leading-tight">
                      {SERVICE_COLUMNS[0].title}
                    </h3>
                    <p className="font-sans text-xs text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                      {SERVICE_COLUMNS[0].subtitle}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  {SERVICE_COLUMNS[0].links.map((link) => (
                    <Link
                      key={link.label}
                      to={link.href}
                      onClick={closeServices}
                      className="group block p-2.5 -mx-2.5 rounded-2xl hover:bg-white/70 dark:hover:bg-white/[0.08] hover:backdrop-blur-md hover:shadow-[0_4px_16px_-2px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.85)] dark:hover:shadow-[0_4px_16px_-2px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.12)] transition-all duration-150"
                    >
                      <div className="font-sans text-[13.5px] sm:text-[14px] font-semibold text-slate-900 dark:text-white group-hover:text-[#D9480F] transition-colors">
                        {link.label}
                      </div>
                      {link.desc && (
                        <p className="font-sans text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-normal">
                          {link.desc}
                        </p>
                      )}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Column 2: Web apps & AI */}
              <div className="lg:px-8 lg:border-r lg:border-slate-900/10 dark:lg:border-white/10 space-y-5">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF0E6]/90 dark:bg-[#D9480F]/20 text-[#D9480F] dark:text-[#F97316] backdrop-blur-sm border border-[#D9480F]/15 flex items-center justify-center shrink-0 shadow-sm">
                    <Cpu size={20} strokeWidth={2.2} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-[15px] sm:text-base text-slate-900 dark:text-white leading-tight">
                      {SERVICE_COLUMNS[1].title}
                    </h3>
                    <p className="font-sans text-xs text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                      {SERVICE_COLUMNS[1].subtitle}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  {SERVICE_COLUMNS[1].links.map((link) => (
                    <Link
                      key={link.label}
                      to={link.href}
                      onClick={closeServices}
                      className="group block p-2.5 -mx-2.5 rounded-2xl hover:bg-white/70 dark:hover:bg-white/[0.08] hover:backdrop-blur-md hover:shadow-[0_4px_16px_-2px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.85)] dark:hover:shadow-[0_4px_16px_-2px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.12)] transition-all duration-150"
                    >
                      <div className="font-sans text-[13.5px] sm:text-[14px] font-semibold text-slate-900 dark:text-white group-hover:text-[#D9480F] transition-colors">
                        {link.label}
                      </div>
                      {link.desc && (
                        <p className="font-sans text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-normal">
                          {link.desc}
                        </p>
                      )}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Column 3: AI Agents & WhatsApp */}
              <div className="lg:px-8 lg:border-r lg:border-slate-900/10 dark:lg:border-white/10 space-y-5">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF0E6]/90 dark:bg-[#D9480F]/20 text-[#D9480F] dark:text-[#F97316] backdrop-blur-sm border border-[#D9480F]/15 flex items-center justify-center shrink-0 shadow-sm">
                    <Bot size={20} strokeWidth={2.2} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-[15px] sm:text-base text-slate-900 dark:text-white leading-tight">
                      {SERVICE_COLUMNS[2].title}
                    </h3>
                    <p className="font-sans text-xs text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                      {SERVICE_COLUMNS[2].subtitle}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  {SERVICE_COLUMNS[2].links.map((link) => (
                    <Link
                      key={link.label}
                      to={link.href}
                      onClick={closeServices}
                      className="group block p-2.5 -mx-2.5 rounded-2xl hover:bg-white/70 dark:hover:bg-white/[0.08] hover:backdrop-blur-md hover:shadow-[0_4px_16px_-2px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.85)] dark:hover:shadow-[0_4px_16px_-2px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.12)] transition-all duration-150"
                    >
                      <div className="font-sans text-[13.5px] sm:text-[14px] font-semibold text-slate-900 dark:text-white group-hover:text-[#D9480F] transition-colors">
                        {link.label}
                      </div>
                      {link.desc && (
                        <p className="font-sans text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-normal">
                          {link.desc}
                        </p>
                      )}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Column 4: Studio Standards & Featured Card */}
              <div className="lg:pl-8 space-y-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#FFF0E6]/90 dark:bg-[#D9480F]/20 text-[#D9480F] dark:text-[#F97316] backdrop-blur-sm border border-[#D9480F]/15 flex items-center justify-center shrink-0 shadow-sm">
                      <ShieldCheck size={20} strokeWidth={2.2} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-[15px] sm:text-base text-slate-900 dark:text-white leading-tight">
                        {SERVICE_COLUMNS[3].title}
                      </h3>
                      <p className="font-sans text-xs text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                        {SERVICE_COLUMNS[3].subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    {SERVICE_COLUMNS[3].links.map((link) => (
                      <Link
                        key={link.label}
                        to={link.href}
                        onClick={closeServices}
                        className="group block p-2.5 -mx-2.5 rounded-2xl hover:bg-white/70 dark:hover:bg-white/[0.08] hover:backdrop-blur-md hover:shadow-[0_4px_16px_-2px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.85)] dark:hover:shadow-[0_4px_16px_-2px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.12)] transition-all duration-150"
                      >
                        <div className="font-sans text-[13.5px] sm:text-[14px] font-semibold text-slate-900 dark:text-white group-hover:text-[#D9480F] transition-colors">
                          {link.label}
                        </div>
                        {link.desc && (
                          <p className="font-sans text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-normal">
                            {link.desc}
                          </p>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Featured Card from Reference Design */}
                <div className="bg-[#0B0F19]/90 dark:bg-black/75 backdrop-blur-xl text-white p-5 rounded-2xl border border-white/15 space-y-2 shadow-xl shadow-black/20 ring-1 ring-white/10">
                  <div className="font-display font-bold text-sm text-white">
                    Not sure what you need?
                  </div>
                  <p className="font-sans text-xs text-slate-300 leading-relaxed">
                    We design your homepage free, then suggest the rest.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      closeServices();
                      openPreviewModal();
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ff6b00] hover:text-[#ff8533] transition-colors cursor-pointer pt-1"
                  >
                    <span>Get a free preview</span>
                    <ArrowUpRight size={14} strokeWidth={2.4} />
                  </button>
                </div>
              </div>
            </div>

            {/* Mega Menu Footer Strip */}
            <div className="border-t border-slate-900/10 dark:border-white/10 pt-4 mt-6 flex items-center justify-between text-xs font-bold font-mono tracking-wider relative z-10">
              <div className="flex items-center gap-8">
                <Link
                  to="/work"
                  onClick={closeServices}
                  className="inline-flex items-center gap-1.5 text-slate-800 dark:text-slate-200 hover:text-[#D9480F] dark:hover:text-[#F97316] transition-colors"
                >
                  <span>All case studies</span>
                  <ArrowUpRight size={13} strokeWidth={2.4} />
                </Link>
                <Link
                  to="/portfolio"
                  onClick={closeServices}
                  className="inline-flex items-center gap-1.5 text-slate-800 dark:text-slate-200 hover:text-[#D9480F] dark:hover:text-[#F97316] transition-colors"
                >
                  <span>Portfolio &amp; demos</span>
                  <ArrowUpRight size={13} strokeWidth={2.4} />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Slide-Out Drawer */}
        <div className={`wx-mp ${isMobileMenuOpen ? 'wx-open' : ''}`}>
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
            Home
          </Link>
          <Link to="/work" onClick={() => setIsMobileMenuOpen(false)}>
            Work
          </Link>

          {/* Mobile Services Accordion */}
          <div className="py-1">
            <button
              type="button"
              onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
              className="w-full flex items-center justify-between py-2 text-left text-sm font-semibold text-slate-800 dark:text-slate-200"
            >
              <span>Services</span>
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${isMobileServicesOpen ? 'rotate-180' : ''
                  }`}
              />
            </button>

            {isMobileServicesOpen && (
              <div className="pl-3 py-1 space-y-1.5 border-l-2 border-[#D9480F]/40 my-1 text-left">
                <Link
                  to="/website-development-mumbai"
                  className="block text-xs py-1 text-slate-600 dark:text-slate-400 hover:text-[#D9480F]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Website Development
                </Link>
                <Link
                  to="/real-estate-websites"
                  className="block text-xs py-1 text-slate-600 dark:text-slate-400 hover:text-[#D9480F]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Real Estate Websites
                </Link>
                <Link
                  to="/custom-software-development"
                  className="block text-xs py-1 text-slate-600 dark:text-slate-400 hover:text-[#D9480F]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Custom Software Development
                </Link>
                <Link
                  to="/banking-fintech-solutions"
                  className="block text-xs py-1 text-slate-600 dark:text-slate-400 hover:text-[#D9480F]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Banking & Fintech Solutions
                </Link>
                <Link
                  to="/ai-agent-development"
                  className="block text-xs py-1 text-slate-600 dark:text-slate-400 hover:text-[#D9480F]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  AI Agent Development
                </Link>
                <Link
                  to="/ai-calling-agents"
                  className="block text-xs py-1 text-slate-600 dark:text-slate-400 hover:text-[#D9480F]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  AI Voice Calling Agents
                </Link>
                <Link
                  to="/whatsapp-automation"
                  className="block text-xs py-1 text-slate-600 dark:text-slate-400 hover:text-[#D9480F]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  WhatsApp Automation
                </Link>
              </div>
            )}
          </div>

          <Link to="/portfolio" onClick={() => setIsMobileMenuOpen(false)}>
            Portfolio
          </Link>
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>
            About
          </Link>
          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
            Contact
          </Link>
          <Link to="/blog" onClick={() => setIsMobileMenuOpen(false)}>
            Blog
          </Link>

          {/* Mobile Theme Toggle */}
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

          {/* Mobile CTA */}
          <button
            type="button"
            className="wx-cta cursor-pointer"
            onClick={handlePreviewClick}
          >
            Get free Preview
          </button>
        </div>
      </header>
    </div>
  );
};
