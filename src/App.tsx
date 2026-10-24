import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Problems } from './components/Problems';
import { WhatWeBuild } from './components/WhatWeBuild';
import { OurWork } from './components/OurWork';
import { AudioDemo } from './components/AudioDemo';
import { HowItWorks } from './components/HowItWorks';
import { WhyUs } from './components/WhyUs';
import { Faq } from './components/Faq';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

function AppContent() {
  const [selectedService, setSelectedService] = useState<string>('');

  const scrollToQuote = (serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    }
    const el = document.getElementById('contact') || document.getElementById('quote-form');
    if (el) {
      const headerOffset = 90;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToWork = () => {
    const el = document.getElementById('work');
    if (el) {
      const headerOffset = 90;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#090D16] text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-[#D9480F]/20 selection:text-[#D9480F] relative transition-colors duration-300 overflow-x-hidden">
      {/* Ambient spatial glow - Only active in dark mode to keep light mode completely pure white */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden hidden dark:block" aria-hidden="true">
        <div className="absolute -top-32 right-[-10%] w-[550px] h-[550px] rounded-full bg-gradient-to-br from-[#D9480F]/18 via-[#F97316]/10 to-transparent blur-[120px] transform-gpu"></div>
        <div className="absolute top-[35%] -left-32 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-indigo-600/15 via-sky-500/10 to-transparent blur-[130px] transform-gpu"></div>
        <div className="absolute -bottom-32 right-[15%] w-[650px] h-[650px] rounded-full bg-gradient-to-tl from-[#D9480F]/14 via-purple-600/10 to-transparent blur-[140px] transform-gpu"></div>
      </div>

      {/* Sticky Header with "Get a free quote" & Dark mode button */}
      <Header onQuoteClick={() => scrollToQuote()} />

      {/* Main Content Sections */}
      <main className="flex-grow relative z-10">
        <div className="relative overflow-hidden">
          {/* Continuous Ambient Glow Shapes */}
          <div className="pointer-events-none absolute top-16 -left-16 w-96 sm:w-[520px] h-96 sm:h-[520px] rounded-full bg-gradient-to-tr from-[#ffe600]/30 via-amber-400/25 to-yellow-300/20 dark:from-[#D9480F]/20 dark:to-amber-500/15 blur-[70px] sm:blur-[90px]" aria-hidden="true"></div>
          <div className="pointer-events-none absolute top-28 -right-20 w-[520px] h-[520px] rounded-full bg-gradient-to-bl from-cyan-400/20 via-sky-300/18 to-transparent dark:from-cyan-600/15 dark:to-sky-800/10 blur-[80px] sm:blur-[100px]" aria-hidden="true"></div>
          <div className="pointer-events-none absolute top-[750px] -left-20 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-sky-400/20 via-cyan-300/18 to-transparent dark:from-blue-600/12 dark:to-cyan-400/10 blur-[75px] sm:blur-[95px]" aria-hidden="true"></div>
          <div className="pointer-events-none absolute top-[950px] -right-20 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-amber-400/20 via-yellow-300/18 to-transparent dark:from-orange-600/12 dark:to-amber-500/10 blur-[75px] sm:blur-[95px]" aria-hidden="true"></div>
          <div className="pointer-events-none absolute top-[1800px] -left-24 w-[620px] h-[620px] rounded-full bg-gradient-to-tr from-[#D9480F]/22 via-[#F97316]/18 to-amber-300/15 dark:from-[#D9480F]/18 dark:to-orange-600/12 blur-[90px] sm:blur-[120px]" aria-hidden="true"></div>
          <div className="pointer-events-none absolute top-[2100px] -right-24 w-[580px] h-[580px] rounded-full bg-gradient-to-bl from-purple-500/18 via-violet-400/14 to-pink-400/10 dark:from-purple-600/15 dark:to-violet-800/10 blur-[90px] sm:blur-[120px]" aria-hidden="true"></div>
          <div className="pointer-events-none absolute top-[3000px] -left-20 w-[560px] h-[560px] rounded-full bg-gradient-to-tr from-emerald-400/20 via-teal-300/15 to-transparent dark:from-emerald-600/15 dark:to-teal-800/10 blur-[85px] sm:blur-[115px]" aria-hidden="true"></div>
          <div className="pointer-events-none absolute top-[3350px] -right-20 w-[550px] h-[550px] rounded-full bg-gradient-to-bl from-amber-400/20 via-yellow-300/15 to-transparent dark:from-amber-600/14 dark:to-orange-500/10 blur-[85px] sm:blur-[115px]" aria-hidden="true"></div>
          <div className="pointer-events-none absolute top-[4200px] -left-24 w-[580px] h-[580px] rounded-full bg-gradient-to-tr from-violet-500/20 via-purple-400/15 to-transparent dark:from-violet-600/16 dark:to-purple-900/12 blur-[90px] sm:blur-[120px]" aria-hidden="true"></div>
          <div className="pointer-events-none absolute top-[4500px] -right-20 w-[520px] h-[520px] rounded-full bg-gradient-to-bl from-[#F97316]/20 via-amber-400/15 to-transparent dark:from-[#D9480F]/16 dark:to-amber-600/10 blur-[85px] sm:blur-[115px]" aria-hidden="true"></div>
          <div className="pointer-events-none absolute top-[5300px] left-[-5%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#ffe600]/22 via-amber-400/18 to-transparent dark:from-amber-500/15 dark:to-yellow-600/10 blur-[90px] sm:blur-[120px]" aria-hidden="true"></div>
          <div className="pointer-events-none absolute top-[6200px] -left-20 w-[560px] h-[560px] rounded-full bg-gradient-to-tr from-emerald-400/18 via-teal-300/14 to-transparent dark:from-emerald-600/14 dark:to-teal-800/10 blur-[85px] sm:blur-[115px]" aria-hidden="true"></div>
          <div className="pointer-events-none absolute bottom-16 left-1/2 -translate-x-1/2 w-[750px] h-[500px] rounded-full bg-gradient-to-tr from-[#D9480F]/22 via-[#F97316]/18 to-[#ffe600]/15 dark:from-[#D9480F]/18 dark:to-amber-500/12 blur-[100px] sm:blur-[130px]" aria-hidden="true"></div>

          {/* 1. Hero */}
          <Hero onQuoteClick={() => scrollToQuote()} onWorkClick={scrollToWork} />

          {/* 2. Problems */}
          <Problems />

          {/* 3. Our Work */}
          <OurWork />

          {/* 4. What we build (merged with Pricing) */}
          <WhatWeBuild onQuoteClick={(serviceName) => scrollToQuote(serviceName)} />

          {/* 5. AI Demo (Hidden - preserved in code) */}
          {false && <AudioDemo onQuoteClick={() => scrollToQuote()} />}

          {/* 6. Process (How It Works) */}
          <HowItWorks />

          {/* 7. Why businesses work with us */}
          <WhyUs />

          {/* 8. Frequently Asked Questions (FAQ) */}
          <Faq />

          {/* 9. Contact */}
          <FinalCta selectedService={selectedService} />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp and Click-to-Call on mobile */}
      <FloatingWhatsApp />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
