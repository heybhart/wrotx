import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { PageHead } from '../components/PageHead';
import { NOT_FOUND_META } from '../config/seo';
import { getWhatsappUrl } from '../config/site';

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <PageHead meta={NOT_FOUND_META} />
      <section className="pt-36 sm:pt-44 pb-20 sm:pb-28 relative">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <span className="inline-block font-display text-xs sm:text-sm font-black tracking-wider uppercase italic -rotate-2 px-3 py-1 rounded-sm bg-[#ffe600] text-[#131b2e] border-2 border-[#131b2e] shadow-[3px_3px_0px_#131b2e] mb-5">
            404 ERROR
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
            Page not found
          </h1>
          <p className="font-sans text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
            The link you opened does not exist or may have moved. Head back to the homepage or talk to an engineer directly.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-[#ffe600] text-[#131b2e] font-mono text-xs sm:text-sm uppercase font-bold px-5 py-3 rounded shadow-[3px_3px_0px_#131b2e] hover:translate-y-[-2px] transition-all"
            >
              <ArrowLeft size={16} strokeWidth={2} />
              <span>Back to homepage</span>
            </Link>
            <a
              href={getWhatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#00fe66] text-[#00280b] font-mono text-xs sm:text-sm uppercase font-bold px-5 py-3 rounded shadow-[3px_3px_0px_#00280b] hover:translate-y-[-2px] transition-all"
            >
              <MessageCircle size={16} strokeWidth={2} />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
