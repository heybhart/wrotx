import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LucideIcon } from './LucideIcon';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Date & Time, 2: Info, 3: Success

  // Dynamic Calendar Date Picker states
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('10:00 AM');

  const handlePrevMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const calendarDays = React.useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayIndex = getFirstDayOfMonth(year, month);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const daysList = [];
    
    // Trailing days from previous month
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);
    
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const dayNum = daysInPrevMonth - i;
      const dateObj = new Date(prevYear, prevMonth, dayNum);
      daysList.push({
        num: dayNum,
        date: dateObj,
        isCurrentMonth: false,
        disabled: dateObj < today
      });
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const dateObj = new Date(year, month, i);
      daysList.push({
        num: i,
        date: dateObj,
        isCurrentMonth: true,
        disabled: dateObj < today
      });
    }
    
    // Leading days from next month
    const remainingSlots = 42 - daysList.length; // 6 rows * 7 days
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    for (let i = 1; i <= remainingSlots; i++) {
      const dateObj = new Date(nextYear, nextMonth, i);
      daysList.push({
        num: i,
        date: dateObj,
        isCurrentMonth: false,
        disabled: dateObj < today
      });
    }
    
    return daysList;
  }, [currentMonth]);

  const selectedDateStr = React.useMemo(() => {
    return selectedDate.toLocaleDateString('default', { month: 'long', day: 'numeric', year: 'numeric' });
  }, [selectedDate]);

  const currentMonthYearLabel = React.useMemo(() => {
    return currentMonth.toLocaleDateString('default', { month: 'long', year: 'numeric' });
  }, [currentMonth]);

  // Contact form details
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    requirements: ''
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Time slots
  const timeSlots = ['10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM', '05:00 PM'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setLoading(true);
    setErrorMsg(null);
    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          projectType: formData.projectType,
          requirements: formData.requirements,
          dateStr: selectedDateStr,
          timeSlot: selectedTimeSlot
        })
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setStep(3);
      } else {
        setErrorMsg(result.message || 'Something went wrong. Please try again.');
      }
    } catch (err: any) {
      setErrorMsg('Failed to connect to the booking server. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
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
        className="relative w-full max-w-2xl bg-[#131313] border border-white/5 rounded-lg overflow-hidden shadow-2xl p-7 sm:p-10 space-y-8 max-h-[92vh] overflow-y-auto font-sans text-xs text-zinc-350"
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
        <div className="space-y-2.5 pr-10 border-b border-zinc-900/60 pb-6">
          <span className="font-mono text-[9px] tracking-wider text-[#d4a843] uppercase font-semibold block">
            CALENDAR SCHEDULER
          </span>
          <h3 className="font-sans font-bold text-xl text-white">
            Schedule an Alignment Call
          </h3>
          <p className="text-zinc-550 font-normal leading-normal text-xs pr-4">
            Meet 1-on-1 with a WrotX systems architect to outline your custom product roadmap, tech stack blueprints, and cost estimates.
          </p>
        </div>

        {/* STEP 1: Date & Time selector */}
        {step === 1 && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-start">
              {/* Date Column */}
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-zinc-950/40 border border-white/5 rounded-lg px-3 py-2 font-mono text-xs">
                  <button
                    type="button"
                    onClick={handlePrevMonth}
                    className="p-1 text-zinc-500 hover:text-white hover:bg-zinc-900 rounded-md transition-colors cursor-pointer"
                    aria-label="Previous Month"
                  >
                    <LucideIcon name="ChevronLeft" size={14} />
                  </button>
                  <span className="text-white font-semibold uppercase text-[10px] tracking-widest">{currentMonthYearLabel}</span>
                  <button
                    type="button"
                    onClick={handleNextMonth}
                    className="p-1 text-zinc-500 hover:text-white hover:bg-zinc-900 rounded-md transition-colors cursor-pointer"
                    aria-label="Next Month"
                  >
                    <LucideIcon name="ChevronRight" size={14} />
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="grid grid-cols-7 text-center text-zinc-650 font-mono text-[9px] font-bold uppercase tracking-wider">
                    <span>Su</span>
                    <span>Mo</span>
                    <span>Tu</span>
                    <span>We</span>
                    <span>Th</span>
                    <span>Fr</span>
                    <span>Sa</span>
                  </div>

                  <div className="grid grid-cols-7 gap-y-2 gap-x-2">
                    {calendarDays.map((day, index) => {
                      const isSelected = selectedDate.toDateString() === day.date.toDateString();
                      return (
                        <button
                          key={index}
                          type="button"
                          disabled={day.disabled}
                          onClick={() => setSelectedDate(day.date)}
                          className={`h-8 w-8 mx-auto rounded-full flex items-center justify-center font-mono text-[10px] transition-all cursor-pointer ${
                            day.disabled
                              ? 'text-zinc-800 cursor-not-allowed line-through'
                              : !day.isCurrentMonth
                                ? isSelected
                                  ? 'bg-[#d4a843] text-black font-bold'
                                  : 'text-zinc-600 hover:bg-[#d4a843]/10 hover:text-zinc-350'
                                : isSelected
                                  ? 'bg-[#d4a843] text-black font-bold shadow-md shadow-[#d4a843]/20'
                                  : 'bg-zinc-950 border border-zinc-900 text-zinc-350 hover:border-[#d4a843]/30'
                          }`}
                        >
                          {day.num}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Time Column */}
              <div className="space-y-4">
                <label className="block text-[10px] font-semibold text-zinc-455 uppercase tracking-wider">
                  2. Choose Preferred Hour (UTC)
                </label>
                <div className="space-y-3">
                  {timeSlots.map((slot) => {
                    const isSelected = selectedTimeSlot === slot;
                    return (
                      <button
                        key={slot}
                        id={`time_slot_${slot.replace(/[:\s]/g, '_')}`}
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`w-full p-2.5 rounded-lg border text-left font-semibold transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#d4a843]/10 border-[#d4a843]/30 text-white'
                            : 'bg-zinc-950 border-zinc-900 text-zinc-500 hover:border-[#d4a843]/20 hover:text-zinc-350'
                        }`}
                      >
                        <span className="text-[11px] font-mono leading-none">{slot}</span>
                        {isSelected ? (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#d4a843]" />
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
            <div className="flex justify-between items-center pt-6 mt-3 border-t border-zinc-900">
              <span className="text-zinc-550 font-mono text-[10px]">
                Duration: 30 minutes via Google Meet
              </span>
              <button
                id="booking_goto_step2"
                onClick={() => setStep(2)}
                className="px-5 py-2.5 bg-white text-black hover:bg-zinc-200 font-semibold text-xs rounded-lg flex items-center space-x-1.5 transition-all cursor-pointer shadow-md shadow-white/5"
              >
                <span>Continue</span>
                <LucideIcon name="ArrowRight" size={12} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Detail Discovery Form */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-zinc-405 font-bold tracking-wide uppercase text-[9px]">Your Full Name *</label>
                <input
                  type="text"
                  name="name"
                  id="booking_input_name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Kenneth Thor"
                  className="w-full p-3 rounded-lg bg-zinc-950 border border-zinc-850 focus:border-[#d4a843]/40 focus:ring-1 focus:ring-[#d4a843]/40 focus:outline-none text-xs text-white transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-zinc-405 font-bold tracking-wide uppercase text-[9px]">Work Email *</label>
                <input
                  type="email"
                  name="email"
                  id="booking_input_email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="e.g. k.thor@company.com"
                  className="w-full p-3 rounded-lg bg-zinc-950 border border-zinc-850 focus:border-[#d4a843]/40 focus:ring-1 focus:ring-[#d4a843]/40 focus:outline-none text-xs text-white transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-zinc-405 font-bold tracking-wide uppercase text-[9px]">Company Name</label>
                <input
                  type="text"
                  name="company"
                  id="booking_input_company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="e.g. Biotech Inc."
                  className="w-full p-3 rounded-lg bg-zinc-950 border border-zinc-850 focus:border-[#d4a843]/40 focus:ring-1 focus:ring-[#d4a843]/40 focus:outline-none text-xs text-white transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-zinc-405 font-bold tracking-wide uppercase text-[9px]">Project Category</label>
                <input
                  type="text"
                  name="projectType"
                  id="booking_input_type"
                  required
                  value={formData.projectType}
                  onChange={handleInputChange}
                  placeholder="e.g. SaaS Platform, Mobile App"
                  className="w-full p-3 rounded-lg bg-zinc-950 border border-zinc-855 focus:border-[#d4a843]/40 focus:ring-1 focus:ring-[#d4a843]/40 focus:outline-none text-xs text-white transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-zinc-405 font-bold tracking-wide uppercase text-[9px]">Scope Brief</label>
              <textarea
                name="requirements"
                id="booking_input_requirements"
                rows={3}
                value={formData.requirements}
                onChange={handleInputChange}
                placeholder="Share any key feature requirements, integrations, or deadline details..."
                className="w-full p-3 rounded-lg bg-zinc-950 border border-zinc-850 focus:border-[#d4a843]/40 focus:ring-1 focus:ring-[#d4a843]/40 focus:outline-none text-xs text-white transition-colors resize-none"
              />
            </div>

            {errorMsg && (
              <p className="text-red-500 font-mono text-[11px] bg-red-950/20 border border-red-900/30 rounded-lg p-3 text-left">
                {errorMsg}
              </p>
            )}

            {/* Nav */}
            <div className="flex justify-between items-center pt-6 mt-3 border-t border-zinc-900">
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
                className="px-5 py-2.5 rounded-lg bg-white hover:bg-zinc-200 text-black font-semibold flex items-center space-x-1.5 transition-all disabled:opacity-50 cursor-pointer shadow-md shadow-white/5"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-zinc-400 border-t-black animate-spin inline-block mr-1" />
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
            <div className="w-14 h-14 rounded-full bg-[#d4a843]/10 border border-[#d4a843]/30 flex items-center justify-center text-[#d4a843] shadow-md">
              <LucideIcon name="Check" size={24} className="stroke-[2.5px]" />
            </div>

            <div className="space-y-1.5">
              <h4 className="font-bold text-white text-xl tracking-tight">
                Appointment Secured
              </h4>
              <p className="text-zinc-550 text-[9px] font-mono tracking-wider uppercase">
                Confirmation ID: WRX-{Math.floor(100000 + Math.random() * 900000)}
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
                <span className="text-white font-bold">{selectedDateStr}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-900 pb-2">
                <span>TIME SLOT</span>
                <span className="text-[#d4a843] font-bold">{selectedTimeSlot} (UTC)</span>
              </div>
              <div className="flex justify-between border-b border-zinc-900 pb-2">
                <span>VENUE</span>
                <a href="https://meet.google.com" target="_blank" rel="noreferrer" className="text-zinc-400 hover:underline flex items-center space-x-1">
                  <span>Google Meet Relay</span>
                  <LucideIcon name="ExternalLink" size={9} />
                </a>
              </div>
              <p style={{ textAlign: 'center' }} className="text-[9.5px] text-zinc-500 font-sans italic pt-1 leading-relaxed">
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
                className="px-5 py-3 rounded-lg bg-white text-xs font-bold text-black hover:bg-zinc-200 transition-colors flex items-center space-x-1.5 cursor-pointer shadow-md shadow-white/5"
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
