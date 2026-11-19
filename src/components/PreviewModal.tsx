import React, { useState, useMemo, useRef, useEffect } from 'react';
import { X, ChevronDown, Check, ArrowUpRight, Mail } from 'lucide-react';
import { usePreviewModal } from '../context/PreviewModalContext';
import { COUNTRIES, DEFAULT_COUNTRY, type CountryItem } from '../data/countries';
import { SITE_CONFIG } from '../config/site';

const NEED_OPTIONS = [
  'Website',
  'Online store',
  'Web app',
  'Redesign',
  'Other',
];

export const PreviewModal: React.FC = () => {
  const { isOpen, closePreviewModal } = usePreviewModal();

  const [enquiryType, setEnquiryType] = useState<'business' | 'agency'>('business');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);
  const [brief, setBrief] = useState('');
  const [country, setCountry] = useState<CountryItem>(DEFAULT_COUNTRY);
  const [phone, setPhone] = useState('');

  const [isCountryPickerOpen, setIsCountryPickerOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const countrySearchInputRef = useRef<HTMLInputElement>(null);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isCountryPickerOpen) {
          setIsCountryPickerOpen(false);
        } else {
          closePreviewModal();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isCountryPickerOpen, closePreviewModal]);

  // Handle click outside country dropdown
  useEffect(() => {
    if (!isCountryPickerOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(e.target as Node)) {
        setIsCountryPickerOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCountryPickerOpen]);

  // Focus country search input when opened
  useEffect(() => {
    if (isCountryPickerOpen) {
      setTimeout(() => countrySearchInputRef.current?.focus(), 50);
    } else {
      setCountrySearch('');
    }
  }, [isCountryPickerOpen]);

  // Filter countries
  const filteredCountries = useMemo(() => {
    const q = countrySearch.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dial.replace(/[^0-9]/g, '').includes(q.replace(/[^0-9]/g, '')) ||
        c.code.toLowerCase().includes(q)
    );
  }, [countrySearch]);

  const toggleNeed = (need: string) => {
    setSelectedNeeds((prev) =>
      prev.includes(need) ? prev.filter((item) => item !== need) : [...prev, need]
    );
  };

  const handleSendWhatsApp = () => {
    if (!name.trim()) {
      setErrorMessage('Please enter your name.');
      return;
    }
    setErrorMessage('');

    const lines = [
      `Hi ${SITE_CONFIG.brandName}! I would like to get my free homepage preview.`,
      ``,
      `Enquiry for: ${enquiryType === 'business' ? 'For my business (Website, store or app)' : 'For an agency (White label)'}`,
      `Name: ${name.trim()}`,
      email.trim() ? `Email: ${email.trim()}` : null,
      selectedNeeds.length > 0 ? `Looking for: ${selectedNeeds.join(', ')}` : null,
      brief.trim() ? `About project: ${brief.trim()}` : null,
      phone.trim() ? `WhatsApp: ${country.dial} ${phone.trim()}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    const whatsappNumber = SITE_CONFIG.phones[0].whatsapp;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines)}`;
    window.open(url, '_blank');
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage('Please enter your name.');
      return;
    }
    if (!email.trim() && !phone.trim()) {
      setErrorMessage('Please provide an email or WhatsApp number so we can send the preview.');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const fullPhone = phone.trim() ? `${country.dial} ${phone.trim()}` : 'Not provided';
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: fullPhone,
          service: `Free Homepage Preview (${enquiryType === 'business' ? 'For my business' : 'For an agency'})`,
          projectDetails: `Enquiry Type: ${enquiryType === 'business' ? 'For my business' : 'For an agency'}\nNeeds: ${selectedNeeds.join(', ') || 'Not specified'}\nBrief: ${brief.trim() || 'None provided'}`,
        }),
      });

      const data = await response.json().catch(() => null);
      if (response.ok && data?.success !== false) {
        setIsSubmitted(true);
      } else {
        throw new Error(data?.message || 'Could not send request. Please try WhatsApp directly.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Transmission failed. You can send via WhatsApp instead.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={closePreviewModal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-modal-title"
    >
      <div
        className="relative w-full max-w-[620px] bg-white dark:bg-[#0c101d] text-slate-900 dark:text-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-white/10 my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h2
              id="preview-modal-title"
              className="font-display text-2xl sm:text-[1.85rem] font-black tracking-tight text-slate-900 dark:text-white leading-tight"
            >
              Get your free homepage preview
            </h2>
            <p className="font-sans text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Takes 30 seconds. We design your homepage first - you decide after you have seen it.
            </p>
          </div>

          <button
            type="button"
            onClick={closePreviewModal}
            className="w-9 h-9 shrink-0 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            aria-label="Close dialog"
          >
            <X size={18} strokeWidth={2.2} />
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#00fe66]/20 text-[#00a843] dark:text-[#00fe66] flex items-center justify-center">
              <Check size={32} strokeWidth={3} />
            </div>
            <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
              Preview request received!
            </h3>
            <p className="font-sans text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
              Thank you {name}. Our team will review your business details and send your free homepage design preview within one working day.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={closePreviewModal}
                className="px-6 py-2.5 rounded-full bg-slate-900 text-white font-bold text-xs uppercase tracking-wider hover:bg-slate-800 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSendEmail} className="space-y-4 text-left">
            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-mono border border-red-500/20">
                {errorMessage}
              </div>
            )}

            {/* 1. I'M ENQUIRING: 2 Selector Cards */}
            <div>
              <span className="font-mono text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 block">
                I'M ENQUIRING
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Option 1: For my business */}
                <button
                  type="button"
                  onClick={() => setEnquiryType('business')}
                  className={`text-left p-4 rounded-2xl relative transition-all border ${
                    enquiryType === 'business'
                      ? 'bg-slate-950 text-white border-slate-950 shadow-md'
                      : 'bg-white dark:bg-slate-900/40 text-slate-900 dark:text-white border-slate-200 dark:border-white/10 hover:border-slate-300'
                  }`}
                >
                  <span
                    className={`w-3 h-3 rounded-full absolute top-4 right-4 ${
                      enquiryType === 'business'
                        ? 'bg-[#ff6b00]'
                        : 'border-2 border-slate-300 dark:border-white/30'
                    }`}
                  />
                  <div className="font-display text-base font-bold leading-tight">
                    For my business
                  </div>
                  <div
                    className={`font-sans text-xs mt-1 ${
                      enquiryType === 'business'
                        ? 'text-slate-300'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    A website, online store or app
                  </div>
                </button>

                {/* Option 2: For an agency */}
                <button
                  type="button"
                  onClick={() => setEnquiryType('agency')}
                  className={`text-left p-4 rounded-2xl relative transition-all border ${
                    enquiryType === 'agency'
                      ? 'bg-slate-950 text-white border-slate-950 shadow-md'
                      : 'bg-white dark:bg-slate-900/40 text-slate-900 dark:text-white border-slate-200 dark:border-white/10 hover:border-slate-300'
                  }`}
                >
                  <span
                    className={`w-3 h-3 rounded-full absolute top-4 right-4 ${
                      enquiryType === 'agency'
                        ? 'bg-[#ff6b00]'
                        : 'border-2 border-slate-300 dark:border-white/30'
                    }`}
                  />
                  <div className="font-display text-base font-bold leading-tight">
                    For an agency
                  </div>
                  <div
                    className={`font-sans text-xs mt-1 ${
                      enquiryType === 'agency'
                        ? 'text-slate-300'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    White label, under your brand
                  </div>
                </button>
              </div>
            </div>

            {/* 2. Name & Email Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="preview_name"
                  className="block font-sans text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5"
                >
                  Name
                </label>
                <input
                  id="preview_name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-[#E5E3DC] dark:border-white/10 bg-[#F6F5F1] dark:bg-[#131826] text-sm text-slate-900 dark:text-white outline-none focus:bg-white dark:focus:bg-[#0e121e] focus:border-slate-900 dark:focus:border-white transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
                />
              </div>

              <div>
                <label
                  htmlFor="preview_email"
                  className="block font-sans text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5"
                >
                  Email
                </label>
                <input
                  id="preview_email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-[#E5E3DC] dark:border-white/10 bg-[#F6F5F1] dark:bg-[#131826] text-sm text-slate-900 dark:text-white outline-none focus:bg-white dark:focus:bg-[#0e121e] focus:border-slate-900 dark:focus:border-white transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
                />
              </div>
            </div>

            {/* 3. What do you need? (optional) */}
            <div>
              <label className="block font-sans text-xs font-semibold text-slate-800 dark:text-slate-200 mb-2">
                What do you need?{' '}
                <span className="font-normal text-slate-400">(optional)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {NEED_OPTIONS.map((item) => {
                  const isSelected = selectedNeeds.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleNeed(item)}
                      className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all ${
                        isSelected
                          ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white'
                          : 'bg-white dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/15 hover:border-slate-400'
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Tell us briefly what you need (optional) */}
            <div>
              <label
                htmlFor="preview_brief"
                className="block font-sans text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5"
              >
                Tell us briefly what you need{' '}
                <span className="font-normal text-slate-400">(optional)</span>
              </label>
              <textarea
                id="preview_brief"
                rows={3}
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                className="w-full p-4 rounded-2xl border border-[#E5E3DC] dark:border-white/10 bg-[#F6F5F1] dark:bg-[#131826] text-sm text-slate-900 dark:text-white outline-none focus:bg-white dark:focus:bg-[#0e121e] focus:border-slate-900 dark:focus:border-white resize-none transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
              />
            </div>

            {/* 5. WhatsApp (optional) with Searchable Global Country Directory */}
            <div>
              <label
                htmlFor="preview_whatsapp"
                className="block font-sans text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5"
              >
                WhatsApp{' '}
                <span className="font-normal text-slate-400">(optional)</span>
              </label>

              <div className="relative">
                <div className="flex items-center rounded-2xl border border-[#E5E3DC] dark:border-white/10 bg-[#F6F5F1] dark:bg-[#131826] p-1.5 focus-within:bg-white dark:focus-within:bg-[#0e121e] focus-within:border-slate-900 dark:focus-within:border-white transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">
                  {/* Country Flag & Dial Selector Button */}
                  <button
                    type="button"
                    onClick={() => setIsCountryPickerOpen(!isCountryPickerOpen)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/10 transition-colors shrink-0"
                    aria-label="Select country directory"
                    aria-expanded={isCountryPickerOpen}
                  >
                    <span className="text-base leading-none">{country.flag}</span>
                    <ChevronDown size={14} className="text-slate-400" />
                    <span className="font-mono text-xs text-slate-700 dark:text-slate-300">
                      {country.dial}
                    </span>
                  </button>

                  <div className="h-5 w-[1px] bg-slate-300 dark:bg-white/15 mx-1 shrink-0" />

                  {/* Phone input */}
                  <input
                    id="preview_whatsapp"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-1.5 bg-transparent text-sm text-slate-900 dark:text-white outline-none"
                  />
                </div>

                {/* Country Directory Dropdown */}
                {isCountryPickerOpen && (
                  <div
                    ref={countryDropdownRef}
                    className="absolute bottom-full left-0 mb-2 w-full sm:w-80 max-h-72 bg-white dark:bg-[#13192b] border border-slate-200 dark:border-white/15 rounded-2xl shadow-xl z-50 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-100"
                  >
                    {/* Search Field */}
                    <div className="p-2.5 border-b border-slate-100 dark:border-white/10">
                      <input
                        ref={countrySearchInputRef}
                        type="text"
                        value={countrySearch}
                        onChange={(e) => setCountrySearch(e.target.value)}
                        placeholder="Search country or code..."
                        className="w-full px-3 py-2 rounded-xl border border-[#E5E3DC] dark:border-white/15 bg-[#F6F5F1] dark:bg-slate-900 text-xs text-slate-900 dark:text-white outline-none focus:border-slate-900 dark:focus:border-white transition-colors"
                      />
                    </div>

                    {/* Scrollable list */}
                    <div className="overflow-y-auto max-h-56 divide-y divide-slate-100 dark:divide-white/5">
                      {filteredCountries.length > 0 ? (
                        filteredCountries.map((item) => (
                          <button
                            key={item.code}
                            type="button"
                            onClick={() => {
                              setCountry(item);
                              setIsCountryPickerOpen(false);
                            }}
                            className="w-full flex items-center justify-between px-3.5 py-2 text-left text-xs hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                          >
                            <span className="flex items-center gap-2 truncate pr-2">
                              <span className="text-sm">{item.flag}</span>
                              <span className="font-sans text-slate-800 dark:text-slate-200 truncate">
                                {item.name}
                              </span>
                            </span>
                            <span className="font-mono text-[11px] text-slate-500 shrink-0">
                              {item.dial}
                            </span>
                          </button>
                        ))
                      ) : (
                        <div className="p-3 text-center text-xs text-slate-400">
                          No country matched
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 6. Action Buttons */}
            <div className="pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-end">
                {/* Button 1: Send on WhatsApp */}
                <div className="relative">
                  <span className="inline-block bg-black text-white text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full absolute -top-2 left-4 z-10 shadow-sm">
                    QUICKEST
                  </span>
                  <button
                    type="button"
                    onClick={handleSendWhatsApp}
                    className="w-full flex items-center justify-between gap-2 bg-[#00fe66] text-black font-sans font-bold text-sm px-5 py-3 rounded-full hover:brightness-105 active:scale-[0.99] transition-all shadow-sm"
                  >
                    <div className="flex items-center gap-2.5">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M4 5h16v11H9l-5 4z" />
                      </svg>
                      <span>Send on WhatsApp</span>
                    </div>
                    <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                      <ArrowUpRight size={14} strokeWidth={2.4} />
                    </span>
                  </button>
                </div>

                {/* Button 2: Send by email */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-between gap-2 bg-black text-white font-sans font-bold text-sm px-5 py-3 rounded-full hover:bg-slate-900 active:scale-[0.99] transition-all disabled:opacity-60 shadow-sm"
                  >
                    <div className="flex items-center gap-2.5">
                      <Mail size={18} className="text-[#ff6b00]" strokeWidth={2.2} />
                      <span>{isSubmitting ? 'Sending...' : 'Send by email'}</span>
                    </div>
                    <span className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center shrink-0">
                      <ArrowUpRight size={14} strokeWidth={2.4} />
                    </span>
                  </button>
                </div>
              </div>

              {/* Bottom Notice */}
              <p className="font-sans text-[11px] text-slate-500 dark:text-slate-400 mt-3 text-center sm:text-left leading-relaxed">
                WhatsApp opens with your answers written out - you just press send. Your homepage design is free. We reply within one working day and use your details only to reply - privacy policy.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
