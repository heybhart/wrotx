import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Calendar, Clock } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { PageHead } from '../components/PageHead';
import { BLOG_META } from '../config/seo';
import { BLOG_POSTS } from '../data/blogPostsData';

export const BlogPage: React.FC = () => {
  return (
    <>
      <PageHead meta={BLOG_META} />
      <section className="pt-32 sm:pt-36 pb-20">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 space-y-10">
          <header className="space-y-4">
            <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Blog' }]} />
            <span className="inline-block font-display text-xs sm:text-sm font-black tracking-wider uppercase italic -rotate-2 px-3 py-1 rounded-sm bg-[#ffe600] text-[#131b2e] border-2 border-[#131b2e] shadow-[3px_3px_0px_#131b2e]">
              ENGINEERING &amp; GUIDES
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              Practical Guides for Indian Businesses
            </h1>
            <p className="font-sans text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              Clear pricing breakdowns, WhatsApp API rules, and software ownership advice, written without agency jargon.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BLOG_POSTS.map((post) => (
              <article key={post.slug} className="glass-panel p-6 sm:p-7 rounded-3xl flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-slate-500 dark:text-slate-400">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar size={13} />
                      <time dateTime={post.updatedAt}>Updated {post.updatedLabel}</time>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock size={13} />
                      <span>{post.readingTime}</span>
                    </span>
                  </div>
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
                    <Link to={post.path} className="hover:text-[#D9480F] dark:hover:text-[#F97316] transition-colors">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="font-sans text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <Link
                  to={post.path}
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase font-bold text-[#D9480F] dark:text-[#F97316] hover:underline py-1"
                >
                  <span>Read full guide</span>
                  <ArrowUpRight size={15} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

