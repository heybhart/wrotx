import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LucideIcon } from './LucideIcon';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Date & Time, 2: Info, 3: Success

  // Calendar states
  const [selectedDate, setSelectedDate] = useState<number>(25); // Default to tomorrow
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('10:00 AM');

  // Contact form details
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: 'saas',
    budgetRange: '$15,000 - $30,000',
    requirements: ''
  });

  const [loading, setLoading] = useState(false);

  // Time slots
  const timeSlots = ['10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM', '05:00 PM'];

  // Days list (May 2026)
  const calendarDays = [
    { num: 24, label: 'Sun', disabled: true },
    { num: 25, label: 'Mon', disabled: false },
    { num: 26, label: 'Tue', disabled: false },
    { num: 27, label: 'Wed', disabled: false },
    { num: 28, label: 'Thu', disabled: false },
    { num: 29, label: 'Fri', disabled: false },
    { num: 30, label: 'Sat', disabled: true },
    { num: 31, label: 'Sun', disabled: true },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setLoading(true);
    // Simulate server side sync delay
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
      {/* Dark Blurred Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#000000]/80 backdrop-blur-md"
      />

      {/* Main Panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 180 }}
        id="booking_consultation_modal"
        className="relative w-full max-w-2xl bg-[#131313] border border-white/5 rounded-lg overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6 max-h-[92vh] overflow-y-auto font-sans text-xs text-zinc-350"
      >
        {/* Dismiss trigger */}
        <button
          id="booking_close_button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-900/50 border border-transparent hover:border-zinc-850 transition-colors cursor-pointer"
        >
          <LucideIcon name="X" size={15} />
        </button>

        {/* Modal Title */}
        <div className="space-y-1.5 pr-10 border-b border-zinc-900/60 pb-4">
          <span className="font-mono text-[9px] tracking-wider text-zinc-500 uppercase font-semibold block">
            CALENDAR SCHEDULER
          </span>
          <h3 className="font-sans font-bold text-xl text-white">
            Schedule an Alignment Call
          </h3>
          <p className="text-zinc-500 font-normal leading-normal text-xs pr-4">
            Meet 1-on-1 with a WrotX systems architect to outline your custom product roadmap, tech stack blueprints, and cost estimates.
          </p>
        </div>

        {/* STEP 1: Date & Time selector */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Date Column */}
              <div className="space-y-3">
                <label className="block text-[10px] font-semibold text-zinc-450 uppercase tracking-wider">
                  1. Choose Date (May 2026)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {calendarDays.map((day) => {
                    const isSelected = selectedDate === day.num;
                    return (
                      <button
                        key={day.num}
                        id={`calendar_day_${day.num}`}
                        disabled={day.disabled}
                        onClick={() => setSelectedDate(day.num)}
                        className={`p-3 rounded-lg border flex flex-col items-center justify-center space-y-1 transition-all ${
                          day.disabled
                            ? 'bg-transparent border-zinc-900/10 text-zinc-800 cursor-not-allowed'
                            : isSelected
                              ? 'bg-rose-600 border-rose-500 text-white'
                              : 'bg-zinc-950 border-zinc-900 text-zinc-500 hover:border-rose-500/20 hover:text-zinc-350'
                        }`}
                      >
                        <span className={`text-[9px] font-mono uppercase font-semibold ${isSelected ? 'text-rose-100' : 'text-zinc-650'}`}>{day.label}</span>
                        <span className="text-xs font-bold font-mono">{day.num}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Column */}
              <div className="space-y-3">
                <label className="block text-[10px] font-semibold text-zinc-455 uppercase tracking-wider">
                  2. Choose Preferred Hour (UTC)
                </label>
                <div className="space-y-2">
                  {timeSlots.map((slot) => {
                    const isSelected = selectedTimeSlot === slot;
                    return (
                      <button
                        key={slot}
                        id={`time_slot_${slot.replace(/[:\s]/g, '_')}`}
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`w-full p-2.5 rounded-lg border text-left font-semibold transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-rose-950/20 border-rose-500/30 text-white'
                            : 'bg-zinc-950 border-zinc-900 text-zinc-500 hover:border-rose-500/20 hover:text-zinc-350'
                        }`}
                      >
                        <span className="text-[11px] font-mono leading-none">{slot}</span>
                        {isSelected ? (
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                        ) : (
                          <LucideIcon name="Clock" size={11} className="opacity-30" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Nav */}
            <div className="flex justify-between items-center pt-4 border-t border-zinc-900">
              <span className="text-zinc-550 font-mono text-[10px]">
                Duration: 30 minutes via Google Meet
              </span>
              <button
                id="booking_goto_step2"
                onClick={() => setStep(2)}
                className="px-5 py-2.5 bg-rose-600 text-white hover:bg-rose-500 font-semibold text-xs rounded-lg flex items-center space-x-1.5 transition-all cursor-pointer shadow-md shadow-rose-950/10"
              >
                <span>Continue</span>
                <LucideIcon name="ArrowRight" size={12} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Detail Discovery Form */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-zinc-405 font-bold tracking-wide uppercase text-[9px]">Your Full Name *</label>
                <input
                  type="text"
                  name="name"
                  id="booking_input_name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Kenneth Thor"
                  className="w-full p-3 rounded-lg bg-zinc-950 border border-zinc-850 focus:border-rose-500/40 focus:ring-1 focus:ring-rose-500/40 focus:outline-none text-xs text-white transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-zinc-405 font-bold tracking-wide uppercase text-[9px]">Work Email *</label>
                <input
                  type="email"
                  name="email"
                  id="booking_input_email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="e.g. k.thor@company.com"
                  className="w-full p-3 rounded-lg bg-zinc-950 border border-zinc-850 focus:border-rose-500/40 focus:ring-1 focus:ring-rose-500/40 focus:outline-none text-xs text-white transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-zinc-405 font-bold tracking-wide uppercase text-[9px]">Company Name</label>
                <input
                  type="text"
                  name="company"
                  id="booking_input_company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="e.g. Biotech Inc."
                  className="w-full p-3 rounded-lg bg-zinc-950 border border-zinc-850 focus:border-rose-500/40 focus:ring-1 focus:ring-rose-500/40 focus:outline-none text-xs text-white transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-zinc-405 font-bold tracking-wide uppercase text-[9px]">Project Category</label>
                <select
                  name="projectType"
                  id="booking_select_type"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg bg-zinc-950 border border-zinc-850 focus:border-rose-500/40 focus:ring-1 focus:ring-rose-500/40 focus:outline-none text-xs text-white transition-colors cursor-pointer"
                >
                  <option value="saas">SaaS Multi-tenant Platforms</option>
                  <option value="web">Websites &amp; Client Portals</option>
                  <option value="mobile">Mobile Applications</option>
                  <option value="ai">AI Automations &amp; Voice Agents</option>
                  <option value="custom">Enterprise CRM / Custom Software</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-zinc-405 font-bold tracking-wide uppercase text-[9px]">Target Budget Range</label>
              <select
                name="budgetRange"
                id="booking_select_budget"
                value={formData.budgetRange}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg bg-zinc-950 border border-zinc-850 focus:border-rose-500/40 focus:ring-1 focus:ring-rose-500/40 focus:outline-none text-xs text-white transition-colors cursor-pointer"
              >
                <option value="<$10k">Sandbox development (&lt;$10k)</option>
                <option value="$10k-$25k">Standard Growth ($10k - $25k)</option>
                <option value="$25k-$50k">Premium Mid-Scale ($25k - $50k)</option>
                <option value=">$50k">Enterprise Scope (&gt;$50k)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-zinc-405 font-bold tracking-wide uppercase text-[9px]">Scope Brief</label>
              <textarea
                name="requirements"
                id="booking_input_requirements"
                rows={3}
                value={formData.requirements}
                onChange={handleInputChange}
                placeholder="Share any key feature requirements, integrations, or deadline details..."
                className="w-full p-3 rounded-lg bg-zinc-950 border border-zinc-850 focus:border-rose-500/40 focus:ring-1 focus:ring-rose-500/40 focus:outline-none text-xs text-white transition-colors resize-none"
              />
            </div>

            {/* Nav */}
            <div className="flex justify-between items-center pt-4 border-t border-zinc-900">
              <button
                type="button"
                id="booking_back_to_step1"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-lg border border-zinc-800 text-zinc-450 hover:text-white hover:bg-zinc-900/40 transition-all cursor-pointer font-semibold"
              >
                Back
              </button>
              <button
                type="submit"
                id="booking_submit_confirmation"
                disabled={loading}
                className="px-5 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold flex items-center space-x-1.5 transition-all disabled:opacity-50 cursor-pointer shadow-md shadow-rose-950/10"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-rose-400 border-t-white animate-spin inline-block mr-1" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Booking</span>
                    <LucideIcon name="CheckCircle" size={12} />
                  </>
                )}
              </button>
            </div>

          </form>
        )}

        {/* STEP 3: Success Screen */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6 space-y-6 flex flex-col items-center"
          >
            <div className="w-14 h-14 rounded-full bg-rose-950/20 border border-rose-900/40 flex items-center justify-center text-rose-500 shadow-md">
              <LucideIcon name="Check" size={24} className="stroke-[2.5px]" />
            </div>

            <div className="space-y-1.5">
              <h4 className="font-bold text-white text-xl tracking-tight">
                Appointment Secured
              </h4>
              <p className="text-zinc-550 text-[9px] font-mono tracking-wider uppercase">
                Confirmation ID: WXT-{Math.floor(100000 + Math.random() * 900000)}
              </p>
            </div>

            {/* Receipt */}
            <div className="w-full max-w-md p-4 rounded-lg bg-zinc-950 border border-zinc-900 space-y-3 text-left font-mono text-[10px] text-zinc-500">
              <div className="flex justify-between border-b border-zinc-900 pb-2">
                <span>PARTNER</span>
                <span className="text-white font-sans font-bold">WrotX Systems Architect</span>
              </div>
              <div className="flex justify-between border-b border-zinc-900 pb-2">
                <span>DATE</span>
                <span className="text-white font-bold">May {selectedDate}, 2026</span>
              </div>
              <div className="flex justify-between border-b border-zinc-900 pb-2">
                <span>TIMEOVER</span>
                <span className="text-zinc-350 font-bold">{selectedTimeSlot} (UTC)</span>
              </div>
              <div className="flex justify-between border-b border-zinc-900 pb-2">
                <span>VENUE</span>
                <a href="https://meet.google.com" target="_blank" rel="noreferrer" className="text-zinc-400 hover:underline flex items-center space-x-1">
                  <span>Google Meet Relay</span>
                  <LucideIcon name="ExternalLink" size={9} />
                </a>
              </div>
              <p className="text-[9.5px] text-zinc-500 font-sans italic text-center pt-1 leading-relaxed">
                Confirmation details and agenda links have been forwarded to <strong>{formData.email}</strong>.
              </p>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://meet.google.com"
                id="booking_success_meet_link"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-lg bg-[#1a1a1a] border border-white/5 text-xs font-semibold text-zinc-400 flex items-center space-x-1.5 hover:border-zinc-700 hover:text-white transition-all"
              >
                <LucideIcon name="Calendar" size={12} className="text-zinc-500" />
                <span>Add Event</span>
              </a>

              <button
                id="booking_success_dismiss"
                onClick={() => {
                  onClose();
                  setTimeout(() => setStep(1), 300);
                }}
                className="px-5 py-3 rounded-lg bg-rose-600 text-xs font-bold text-white hover:bg-rose-500 transition-colors flex items-center space-x-1.5 cursor-pointer shadow-md shadow-rose-950/10"
              >
                <span>Complete</span>
                <LucideIcon name="ArrowRight" size={12} />
              </button>
            </div>
          </motion.div>
        )}

      </motion.div>
    </div>
  );
};
