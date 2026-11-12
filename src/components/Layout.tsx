import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { FloatingWhatsApp } from './FloatingWhatsApp';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        const offsetPosition = el.getBoundingClientRect().top + window.pageYOffset - 90;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#090D16] text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-[#D9480F]/20 selection:text-[#D9480F] relative transition-colors duration-300 overflow-x-hidden">
      {/* Ambient spatial glow - Only active in dark mode to keep light mode completely pure white */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden hidden dark:block" aria-hidden="true">
        <div className="absolute -top-32 right-[-10%] w-[550px] h-[550px] rounded-full bg-gradient-to-br from-[#D9480F]/18 via-[#F97316]/10 to-transparent blur-[120px] transform-gpu"></div>
        <div className="absolute top-[35%] -left-32 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-indigo-600/15 via-sky-500/10 to-transparent blur-[130px] transform-gpu"></div>
        <div className="absolute -bottom-32 right-[15%] w-[650px] h-[650px] rounded-full bg-gradient-to-tl from-[#D9480F]/14 via-purple-600/10 to-transparent blur-[140px] transform-gpu"></div>
      </div>

      <Header />

      <main className="flex-grow relative z-10">{children}</main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};
