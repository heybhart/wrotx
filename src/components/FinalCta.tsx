import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Phone, Mail, MessageCircle, CheckCircle2 } from 'lucide-react';
import { FadeUp } from './FadeUp';
import { SERVICES_DATA } from '../data/servicesData';

interface FinalCtaProps {
  selectedService?: string;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ selectedService }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(SERVICES_DATA[0].dropdownLabel);
  const [projectDetails, setProjectDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (selectedService) {
      const match = SERVICES_DATA.find(
        (s) => s.name.toLowerCase() === selectedService.toLowerCase() || s.id === selectedService
      );
      if (match) {
        setService(match.dropdownLabel);
      }
    }
  }, [selectedService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setErrorMessage('Please enter your name and phone number.');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          service: service,
          projectDetails: projectDetails.trim()
        })
      });

      const data = await response.json().catch(() => null);
      if (!response.ok || (data && data.success === false)) {
        throw new Error((data && data.message) || 'Failed to submit inquiry. Please try again or reach out directly.');
      }

      setIsSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappUrl = `https://wa.me/919322208664?text=${encodeURIComponent(
    "Hi WrotX! We would like to get a free quote for our project."
  )}`;

  return (
    <section id="contact" className="py-16 sm:py-24 hairline-b relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Section Header */}
        <div className="mb-10">
          <FadeUp>
            <div className="mb-3">
              <span className="inline-block font-display text-xs sm:text-sm font-black tracking-wider uppercase italic -rotate-2 px-3 py-1 rounded-sm bg-[#ff6b00] text-white border-2 border-black shadow-[3px_3px_0px_#000] dark:shadow-[3px_3px_0px_#000]">
                CONTACT
              </span>
            </div>
          </FadeUp>
          <FadeUp delay={40}>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
              Talk to an engineer
            </h2>
          </FadeUp>
          <FadeUp delay={80}>
            <p className="font-sans text-base text-slate-600 dark:text-slate-400 max-w-xl leading-normal">
              Tell us what you want to build. We reply in 2 hours with estimated costs.
            </p>
          </FadeUp>
        </div>

        {/* 2-Column Layout: Glass Form + Direct Buttons */}
        <div className="pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* Form Column in Pure White Glass Panel */}
            <div className="lg:col-span-7">
              {isSubmitted ? (
                <div className="glass-panel bg-white/95 dark:bg-[#090D16]/85 p-6 sm:p-9 rounded-3xl border-[#D9480F] dark:border-[#F97316] text-left space-y-4">
                  <div className="w-10 h-10 rounded-full bg-[#D9480F]/15 dark:bg-[#F97316]/20 text-[#D9480F] dark:text-[#F97316] flex items-center justify-center">
                    <CheckCircle2 size={22} strokeWidth={2} />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                    We received your details.
                  </h3>
                  <p className="font-sans text-sm text-slate-600 dark:text-slate-300">
                    Thank you {name}. An engineer will call or WhatsApp you at {phone} within 2 hours.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="glass-panel bg-white/95 dark:bg-[#090D16]/85 p-6 sm:p-9 rounded-3xl space-y-4 border border-slate-200/80 dark:border-white/10"
                >
                  {errorMessage && (
                    <div className="p-3 bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-mono rounded-lg border border-red-500/20">
                      {errorMessage}
                    </div>
                  )}

                  {/* 1. Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="user_name" className="block font-mono text-xs text-slate-800 dark:text-slate-200 font-semibold">
                      Your Name *
                    </label>
                    <input
                      id="user_name"
                      type="text"
                      required
                      placeholder="e.g. Rahul Verma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="glass-input w-full px-4 py-2.5 text-sm"
                    />
                  </div>

                  {/* 2. Phone / WhatsApp */}
                  <div className="space-y-1.5">
                    <label htmlFor="user_phone" className="block font-mono text-xs text-slate-800 dark:text-slate-200 font-semibold">
                      Phone / WhatsApp *
                    </label>
                    <input
                      id="user_phone"
                      type="tel"
                      required
                      placeholder="e.g. +91 98200 12345"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="glass-input w-full px-4 py-2.5 text-sm"
                    />
                  </div>

                  {/* 3. Service Dropdown connected to SERVICES_DATA */}
                  <div className="space-y-1.5">
                    <label htmlFor="user_service" className="block font-mono text-xs text-slate-800 dark:text-slate-200 font-semibold">
                      Service Needed *
                    </label>
                    <select
                      id="user_service"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="glass-input w-full px-4 py-2.5 text-sm"
                    >
                      {SERVICES_DATA.map((s) => (
                        <option key={s.id} value={s.dropdownLabel} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                          {s.dropdownLabel}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 4. Optional brief */}
                  <div className="space-y-1.5">
                    <label htmlFor="user_brief" className="block font-mono text-xs text-slate-800 dark:text-slate-200 font-semibold">
                      Project brief (optional)
                    </label>
                    <textarea
                      id="user_brief"
                      rows={2}
                      placeholder="What are you building or looking to automate?"
                      value={projectDetails}
                      onChange={(e) => setProjectDetails(e.target.value)}
                      className="glass-input w-full px-4 py-2.5 text-sm resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full min-h-[46px] bg-[#D9480F] hover:bg-[#c23e0c] dark:bg-gradient-to-r dark:from-[#D9480F] dark:to-[#EA580C] text-white font-semibold text-sm py-3 px-5 rounded-xl border border-[#D9480F] dark:border-white/20 flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md active:translate-y-px"
                  >
                    <span>{isSubmitting ? 'Sending...' : 'Send requirement'}</span>
                    <ArrowUpRight size={16} strokeWidth={2} />
                  </button>
                </form>
              )}
            </div>

            {/* Direct Contact Buttons Column */}
            <div className="lg:col-span-5 space-y-3.5 pt-2">
              <span className="font-mono text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest block font-semibold mb-2">
                Or Reach Us Directly:
              </span>

              {/* WhatsApp Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[46px] p-4 rounded-2xl glass-card bg-white/90 hover:bg-white dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200/80 dark:border-white/15 hover:border-[#D9480F]/60 dark:hover:border-[#F97316]/60 flex items-center justify-between group cursor-pointer shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl glass-card bg-slate-50 dark:bg-white/10 flex items-center justify-center text-emerald-500 border border-slate-200/60 dark:border-white/15">
                    <MessageCircle size={20} strokeWidth={1.75} />
                  </div>
                  <div className="text-left">
                    <div className="font-display text-sm font-bold text-slate-900 dark:text-white">Chat on WhatsApp</div>
                    <div className="font-mono text-xs text-slate-500 dark:text-slate-400">+91 9322208664 / +91 9967478623</div>
                  </div>
                </div>
                <ArrowUpRight size={17} strokeWidth={2} className="text-slate-400 group-hover:text-[#D9480F] dark:group-hover:text-[#F97316] transition-colors" />
              </a>

              {/* Call Button */}
              <div
                className="w-full min-h-[46px] p-4 rounded-2xl glass-card bg-white/90 dark:bg-white/5 border border-slate-200/80 dark:border-white/15 flex items-center justify-between group shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl glass-card bg-slate-50 dark:bg-white/10 flex items-center justify-center text-[#D9480F] dark:text-[#F97316] border border-slate-200/60 dark:border-white/15">
                    <Phone size={20} strokeWidth={1.75} />
                  </div>
                  <div className="text-left">
                    <div className="font-display text-sm font-bold text-slate-900 dark:text-white">Direct Phone Call</div>
                    <div className="font-mono text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-1.5">
                      <a href="tel:+919322208664" className="hover:text-[#D9480F] dark:hover:text-[#F97316] transition-colors">
                        +91 9322208664
                      </a>
                      <span className="text-slate-400 dark:text-slate-600">/</span>
                      <a href="tel:+919967478623" className="hover:text-[#D9480F] dark:hover:text-[#F97316] transition-colors">
                        +91 9967478623
                      </a>
                    </div>
                  </div>
                </div>
                <ArrowUpRight size={17} strokeWidth={2} className="text-slate-400 group-hover:text-[#D9480F] dark:group-hover:text-[#F97316] transition-colors" />
              </div>

              {/* Email Button */}
              <a
                href="mailto:work@wrotx.in"
                className="w-full min-h-[46px] p-4 rounded-2xl glass-card bg-white/90 hover:bg-white dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200/80 dark:border-white/15 hover:border-[#D9480F]/60 dark:hover:border-[#F97316]/60 flex items-center justify-between group cursor-pointer shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl glass-card bg-slate-50 dark:bg-white/10 flex items-center justify-center text-slate-900 dark:text-white border border-slate-200/60 dark:border-white/15">
                    <Mail size={20} strokeWidth={1.75} />
                  </div>
                  <div className="text-left">
                    <div className="font-display text-sm font-bold text-slate-900 dark:text-white">Email Desk</div>
                    <div className="font-mono text-xs text-slate-500 dark:text-slate-400">work@wrotx.in</div>
                  </div>
                </div>
                <ArrowUpRight size={17} strokeWidth={2} className="text-slate-400 group-hover:text-[#D9480F] dark:group-hover:text-[#F97316] transition-colors" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
