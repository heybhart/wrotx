import React from 'react';
import { MapPin } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { FinalCta } from '../components/FinalCta';
import { PageHead } from '../components/PageHead';
import { CONTACT_META } from '../config/seo';
import { SITE_CONFIG } from '../config/site';

export const ContactPage: React.FC = () => {
  return (
    <>
      <PageHead meta={CONTACT_META} />
      <div className="pt-32 sm:pt-36">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-4">
          <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Contact' }]} />
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            Contact {SITE_CONFIG.brandName} in Mumbai
          </h1>
          <p className="font-sans text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed flex flex-wrap items-center gap-2">
            <MapPin size={18} className="text-[#D9480F] dark:text-[#F97316] shrink-0" />
            <span>
              Service-area studio serving {SITE_CONFIG.location}, Thane, Navi Mumbai, and businesses across India.
            </span>
          </p>
        </div>

        <FinalCta />
      </div>
    </>
  );
};
