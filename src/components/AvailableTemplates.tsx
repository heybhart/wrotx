import React from 'react';
import { ArrowUpRight, Compass, Landmark, Building2, Home, Building, Plane } from 'lucide-react';

export interface TemplateItem {
  title: string;
  category: string;
  url: string;
  icon: React.ElementType;
}

export const AVAILABLE_TEMPLATES: TemplateItem[] = [
  {
    title: 'Voyage - Luxury Travel',
    category: 'Travel & Tour Agency',
    url: 'https://voyage-travel-hub.vercel.app/',
    icon: Compass,
  },
  {
    title: 'Banking & Finance',
    category: 'Co-operative Bank & Finance Portal',
    url: 'https://bccb.vercel.app/',
    icon: Landmark,
  },
  {
    title: 'E-state Enterprise',
    category: 'Real Estate & Property Advisory',
    url: 'https://bholenath-eight.vercel.app/',
    icon: Building2,
  },
  {
    title: 'Saaranya Properties',
    category: 'Premium Real Estate Showcase',
    url: 'https://saaryana.vercel.app/',
    icon: Home,
  },
  {
    title: 'Real E-state',
    category: 'Residential & Commercial Real Estate',
    url: 'https://rohankkw.github.io/meena-properties/',
    icon: Building,
  },
  {
    title: 'Tour & Travels',
    category: 'Holiday Packages & Discovery',
    url: 'https://triplio-topaz.vercel.app/',
    icon: Plane,
  },
];

export const AvailableTemplates: React.FC = () => {
  return (
    <section className="space-y-4">
      <div>
        <div className="inline-flex items-center gap-2 font-mono text-xs uppercase font-bold text-[#006e27] dark:text-[#00fe66] mb-1">
          <span className="w-2 h-2 rounded-full bg-[#00fe66] animate-pulse" />
          Live Demos
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
          Available Templates
        </h2>
        <p className="font-sans text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
          Click any template to explore live interactive designs built for Indian businesses.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
        {AVAILABLE_TEMPLATES.map((tpl) => {
          const Icon = tpl.icon;
          return (
            <a
              key={tpl.url}
              href={tpl.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-3 px-3.5 py-3 rounded-xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-white/[0.04] hover:border-[#D9480F]/50 dark:hover:border-[#F97316]/50 hover:bg-white dark:hover:bg-white/[0.08] transition-all group shadow-sm hover:shadow"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-8 h-8 rounded-lg bg-orange-500/10 text-[#D9480F] dark:text-[#F97316] flex items-center justify-center shrink-0">
                  <Icon size={16} />
                </span>
                <div className="min-w-0">
                  <div className="font-display text-sm font-bold text-slate-900 dark:text-white truncate group-hover:text-[#D9480F] dark:group-hover:text-[#F97316] transition-colors">
                    {tpl.title}
                  </div>
                  <div className="font-mono text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {tpl.category}
                  </div>
                </div>
              </div>
              <ArrowUpRight
                size={15}
                className="text-slate-400 group-hover:text-[#D9480F] dark:group-hover:text-[#F97316] shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          );
        })}
      </div>
    </section>
  );
};
