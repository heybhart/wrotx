import React, { useState } from 'react';
import { Hero } from '../components/Hero';
import { Problems } from '../components/Problems';
import { WhatWeBuild } from '../components/WhatWeBuild';
import { OurWork } from '../components/OurWork';
import { AudioDemo } from '../components/AudioDemo';
import { HowItWorks } from '../components/HowItWorks';
import { Testimonials } from '../components/Testimonials';
import { Faq } from '../components/Faq';
import { FinalCta } from '../components/FinalCta';
import { PageHead } from '../components/PageHead';
import { HOME_META } from '../config/seo';

export const HomePage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>('');

  const scrollToElement = (id: string, serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    }
    const el = document.getElementById(id) || (id === 'contact' ? document.getElementById('quote-form') : null);
    if (el) {
      const offsetPosition = el.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <>
      <PageHead meta={HOME_META} />
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

        <Hero
          onQuoteClick={() => scrollToElement('contact')}
        />
        <Problems />
        <OurWork />
        <WhatWeBuild onQuoteClick={(serviceName) => scrollToElement('contact', serviceName)} />
        {false && <AudioDemo onQuoteClick={() => scrollToElement('contact')} />}
        <HowItWorks />
        <Testimonials />
        <Faq />
        <FinalCta selectedService={selectedService} />
      </div>
    </>
  );
};

