import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Calendar, User, MessageCircle } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { PageHead } from '../components/PageHead';
import { getBlogPostMeta } from '../config/seo';
import { getWhatsappUrl, SITE_CONFIG } from '../config/site';
import type { BlogPost } from '../data/blogPostsData';

export const BlogPostPage: React.FC<{ post: BlogPost }> = ({ post }) => {
  const meta = getBlogPostMeta(post);

  return (
    <>
      <PageHead meta={meta} />
      <article className="pt-32 sm:pt-36 pb-20">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 space-y-10">
          <header className="space-y-4">
            <Breadcrumb
              items={[
                { label: 'Home', to: '/' },
                { label: 'Blog', to: '/blog' },
                { label: post.title },
              ]}
            />
            <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-slate-600 dark:text-slate-400 pt-1">
              <span className="inline-flex items-center gap-1.5">
                <User size={13} />
                <span>{post.author}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={13} />
                <span>
                  Published <time dateTime={post.publishedAt}>{post.publishedLabel}</time> · Last updated{' '}
                  <time dateTime={post.updatedAt}>{post.updatedLabel}</time>
                </span>
              </span>
              <span>{post.readingTime}</span>
            </div>
          </header>

          <div className="glass-panel p-6 sm:p-9 rounded-3xl space-y-8">
            {post.sections.map((section) => (
              <section key={section.heading} className="space-y-3">
                <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white leading-snug">
                  {section.heading}
                </h2>
                <div className="space-y-3 font-sans text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                  {section.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <section className="glass-panel p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                Have a project in mind?
              </h2>
              <p className="font-sans text-sm text-slate-600 dark:text-slate-300 mt-1">
                Talk directly to our Mumbai engineers on WhatsApp or request a fixed quote.
              </p>
            </div>
            <a
              href={getWhatsappUrl(`Hi ${SITE_CONFIG.brandName}! I read "${post.title}" and would like to discuss a project.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 min-h-[44px] bg-[#00fe66] text-[#00280b] font-mono text-xs uppercase font-bold px-5 py-3 rounded-xl shadow-[2px_2px_0px_#00280b] shrink-0"
            >
              <MessageCircle size={15} />
              <span>WhatsApp an Engineer</span>
            </a>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
              Related services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {post.relatedLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="glass-card p-4 rounded-2xl flex items-center justify-between gap-3 hover:border-[#D9480F]/60 group"
                >
                  <span className="font-display text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-[#D9480F]">
                    {link.label}
                  </span>
                  <ArrowUpRight size={16} className="text-slate-400 group-hover:text-[#D9480F] shrink-0" />
                </Link>
              ))}
            </div>
          </section>
        </div>
      </article>
    </>
  );
};
