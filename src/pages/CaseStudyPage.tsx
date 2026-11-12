import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { PageHead } from '../components/PageHead';
import { getCaseStudyMeta } from '../config/seo';

export const CaseStudyPage: React.FC = () => {
  const { slug = 'sample-case-study' } = useParams();

  const fields = [
    { label: 'Client Type', value: '[TODO: Insert verified industry & city, e.g. Real Estate Advisory, Mumbai]' },
    { label: 'Problem', value: '[TODO: Describe the exact business bottleneck before WrotX]' },
    { label: 'What We Built', value: '[TODO: List delivered website, portal, or AI automation scope]' },
    { label: 'Tech Used', value: '[TODO: List exact production stack used for this client]' },
    { label: 'Result', value: '[TODO: Add verified, measurable business outcome — never fabricate numbers]' },
    { label: 'Screenshots', value: '[TODO: Add approved production screenshots with descriptive alt text]' },
    { label: 'Testimonial', value: '[TODO: Add verified quote with client name and role if approved]' },
  ];

  return (
    <>
      <PageHead meta={getCaseStudyMeta(slug)} />
      <article className="pt-32 sm:pt-36 pb-20">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 space-y-8">
          <Breadcrumb
            items={[
              { label: 'Home', to: '/' },
              { label: 'Our Work', to: '/work' },
              { label: 'Case Study Template' },
            ]}
          />

          <header className="space-y-3">
            <span className="inline-block font-mono text-xs uppercase font-bold px-2.5 py-1 rounded bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
              Case Study Template (Unpublished Draft)
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              Case Study: {slug.replace(/-/g, ' ')}
            </h1>
            <p className="font-sans text-sm sm:text-base text-slate-600 dark:text-slate-300">
              This template is excluded from sitemap.xml and marked noindex until filled with verified client data.
            </p>
          </header>

          <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6">
            {fields.map((f) => (
              <div key={f.label} className="pb-5 border-b border-slate-200/70 dark:border-white/10 last:border-b-0 last:pb-0">
                <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-1">{f.label}</h2>
                <p className="font-mono text-xs sm:text-sm text-slate-600 dark:text-slate-300">{f.value}</p>
              </div>
            ))}
          </div>

          <Link
            to="/work"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase font-bold text-[#D9480F] dark:text-[#F97316] hover:underline"
          >
            <ArrowLeft size={15} />
            <span>Back to Our Work</span>
          </Link>
        </div>
      </article>
    </>
  );
};
