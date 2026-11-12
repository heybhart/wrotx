import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { OurWork } from '../components/OurWork';
import { PageHead } from '../components/PageHead';
import { WORK_META } from '../config/seo';

export const WorkPage: React.FC = () => {
  return (
    <>
      <PageHead meta={WORK_META} />
      <div className="pt-32 sm:pt-36">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Our Work' }]} />
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
            Website, App &amp; AI Projects We Built
          </h1>
          <p className="font-sans text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            Explore live templates and production systems engineered in Mumbai for real estate, retail, banking, and Indian service businesses.
          </p>
        </div>

        <OurWork />

        <section className="pb-20 max-w-7xl mx-auto px-5 sm:px-8">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Case Study Template
              </h2>
              <p className="font-sans text-sm text-slate-600 dark:text-slate-300 mt-1">
                Detailed project write-ups are being added as clients approve public disclosure.
              </p>
            </div>
            <Link
              to="/work/sample-case-study"
              className="inline-flex items-center gap-2 bg-[#ffe600] text-[#131b2e] font-mono text-xs uppercase font-bold px-4 py-2.5 rounded-lg shadow-[2px_2px_0px_#131b2e]"
            >
              <span>Preview Case Study Template</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};
