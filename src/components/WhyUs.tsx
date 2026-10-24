import React from 'react';
import { Users, IndianRupee, Code, Wrench, ShieldCheck } from 'lucide-react';
import { FadeUp } from './FadeUp';

export const WhyUs: React.FC = () => {
  const points = [
    {
      num: '01',
      title: 'Talk directly to the engineers',
      icon: Users,
      description: 'Speak with the actual builders instead of non-technical sales agents.'
    },
    {
      num: '02',
      title: 'UPI, Razorpay, Cashfree and WhatsApp alerts built in',
      icon: IndianRupee,
      description: 'Accept Indian payments, generate GST invoices, and reply or book appointments on WhatsApp automatically.'
    },
    {
      num: '03',
      title: 'You own everything we build, and you pay only for your own hosting and domain',
      icon: Code,
      description: 'Logins and your data are handed to you with zero recurring software charges.'
    },
    {
      num: '04',
      title: 'We can fix your slow existing site, without rebuilding it',
      icon: Wrench,
      description: 'Send us the link. We tell you what is slow and what a fix costs.'
    },
    {
      num: '05',
      title: 'How you pay us',
      icon: ShieldCheck,
      description: 'Milestones via UPI, NEFT or RTGS. We start with a free call.'
    }
  ];

  return (
    <section id="why-wrotx" className="py-16 sm:py-24 hairline-b relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Section Header */}
        <div className="mb-12">
          <FadeUp>
            <div className="mb-3">
              <span className="inline-block font-display text-xs sm:text-sm font-black tracking-wider uppercase italic -rotate-2 px-3 py-1 rounded-sm bg-[#00f0ff] text-black border-2 border-black shadow-[3px_3px_0px_#000] dark:shadow-[3px_3px_0px_#000]">
                WHY WROTX
              </span>
            </div>
          </FadeUp>
          <FadeUp delay={40}>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
              Why businesses work with us
            </h2>
          </FadeUp>
          <FadeUp delay={80}>
            <p className="font-sans text-base text-slate-600 dark:text-slate-400 max-w-xl leading-normal">
              Direct talk, clean code, and zero agency drama.
            </p>
          </FadeUp>
        </div>

        {/* 5 Points: VisionOS Glassmorphic Panel with Refined Rows */}
        <div className="glass-panel p-4 sm:p-6 rounded-3xl space-y-2">
          {points.map((item, idx) => {
            const Icon = item.icon;
            return (
              <FadeUp key={item.num} delay={idx * 40}>
                <div className="p-4 sm:p-5 rounded-2xl glass-card group hover:border-[#D9480F]/50 dark:hover:border-[#F97316]/50">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-center">

                    {/* Number & Line Icon */}
                    <div className="md:col-span-2 flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-[#D9480F] dark:text-[#F97316] px-2 py-0.5 rounded bg-[#D9480F]/10 dark:bg-[#F97316]/15">
                        {item.num}
                      </span>
                      <div className="w-9 h-9 rounded-xl glass-card flex items-center justify-center text-slate-900 dark:text-white group-hover:text-[#D9480F] dark:group-hover:text-[#F97316] transition-colors">
                        <Icon size={18} strokeWidth={1.75} />
                      </div>
                    </div>

                    {/* Title */}
                    <div className="md:col-span-5">
                      <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#D9480F] dark:group-hover:text-[#F97316] transition-colors leading-snug">
                        {item.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <div className="md:col-span-5">
                      <p className="font-sans text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-normal">
                        {item.description}
                      </p>
                    </div>

                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>

      </div>
    </section>
  );
};
