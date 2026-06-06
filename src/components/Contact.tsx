import React, { useState } from 'react';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [otherService, setOtherService] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const serviceOptions = [
    { value: 'development', label: 'Web Development' },
    { value: 'design', label: 'UI/UX Design' },
    { value: 'strategy', label: 'Brand Strategy' },
    { value: 'labs', label: 'R&D / Labs' },
    { value: 'other', label: 'Other' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    setIsSubmitting(true);

    // Simulate server side pipeline sync / form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 1200);
  };

  return (
    <section id="contact" className="min-h-screen bg-black pt-32 pb-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto flex flex-col md:flex-row gap-20 items-center justify-center select-none text-left">
      {/* Left Side: Content */}
      <div className="w-full md:w-1/2 space-y-12">
        <div className="space-y-6">
          <h1 className="font-display-xl text-display-xl-mobile md:text-display-xl text-primary leading-tight">
            Let's Build Your<br />Digital Future
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
            Ready to launch your next project? Fill out the form below or reach out directly to start a conversation about your business needs and how we can help you grow.
          </p>
        </div>

        {/* Contact Details */}
        <div className="flex flex-col sm:flex-row gap-10 pt-8">
          <div className="flex items-center space-x-4 group cursor-pointer">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-primary/10 transition-colors shrink-0">
              <span className="material-symbols-outlined text-primary" data-location="Mumbai">location_on</span>
            </div>
            <div>
              <p className="font-label-caps text-[10px] text-on-surface-variant/50 uppercase tracking-widest">Location</p>
              <p className="font-body-md text-body-md text-primary">Mumbai, India</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 group cursor-pointer">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-primary/10 transition-colors shrink-0">
              <span className="material-symbols-outlined text-primary">mail</span>
            </div>
            <div>
              <p className="font-label-caps text-[10px] text-on-surface-variant/50 uppercase tracking-widest">Email</p>
              <p className="font-body-md text-body-md text-primary">work@wrotx.in</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 group cursor-pointer">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-primary/10 transition-colors shrink-0">
              <span className="material-symbols-outlined text-primary">call</span>
            </div>
            <div>
              <p className="font-label-caps text-[10px] text-on-surface-variant/50 uppercase tracking-widest">Phone</p>
              <p className="font-body-md text-body-md text-primary">+91 9322208664</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Form Container */}
      <div className="w-full md:w-1/2 flex justify-center">
        <div className="glass-card w-full max-w-lg rounded-[2.5rem] p-12 shadow-[0_0_80px_rgba(251,191,36,0.15)] transform transition-transform duration-700 hover:scale-[1.01]">
          {submitSuccess ? (
            <div className="text-center py-12 space-y-6">
              <div className="w-16 h-16 bg-background text-primary rounded-full flex items-center justify-center mx-auto shadow-md">
                <span className="material-symbols-outlined text-3xl text-white">check</span>
              </div>
              <h2 className="text-background font-bold text-2xl">Message Sent!</h2>
              <p className="text-background/70 font-body-md text-body-md">
                Thank you for reaching out. We will get back to you shortly.
              </p>
              <button
                onClick={() => {
                  setSubmitSuccess(false);
                  setName('');
                  setPhone('');
                  setService('');
                  setOtherService('');
                }}
                className="mt-4 bg-background text-primary hover:bg-surface-container-highest px-6 py-2 rounded-full font-label-caps text-label-caps uppercase tracking-widest transition-colors cursor-pointer"
              >
                Send Another
              </button>
            </div>
          ) : (
            <form className="space-y-10" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="font-label-caps text-label-caps text-background/60 uppercase" htmlFor="name">Your name</label>
                <input
                  className="w-full bg-transparent border-0 border-b-2 border-background/10 py-3 px-0 focus:outline-none focus:ring-0 focus:border-background font-body-lg text-background placeholder:text-background/40 transition-colors"
                  id="name"
                  placeholder="Name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="font-label-caps text-label-caps text-background/60 uppercase" htmlFor="phone">Your Phone</label>
                <input
                  className="w-full bg-transparent border-0 border-b-2 border-background/10 py-3 px-0 focus:outline-none focus:ring-0 focus:border-background font-body-lg text-background placeholder:text-background/40 transition-colors"
                  id="phone"
                  placeholder="Phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="font-label-caps text-label-caps text-background/60 uppercase">Services</label>
                <div className="relative">
                  <div
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full bg-transparent border-0 border-b-2 border-background/10 py-3 px-0 font-body-lg text-background cursor-pointer flex justify-between items-center transition-colors select-none"
                  >
                    <span className={service ? 'text-background' : 'text-background/40'}>
                      {service ? serviceOptions.find(o => o.value === service)?.label : 'Select a service'}
                    </span>
                    <span className={`material-symbols-outlined text-[18px] transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}>
                      arrow_drop_down
                    </span>
                  </div>

                  {isDropdownOpen && (
                    <>
                      {/* Clicking outside collapses the dropdown */}
                      <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)} />
                      <div className="absolute left-0 right-0 top-full mt-2 bg-[#131313] text-white rounded-2xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-2 z-20 overflow-hidden transform origin-top transition-all duration-200">
                        {serviceOptions.map((option) => (
                          <div
                            key={option.value}
                            onClick={() => {
                              setService(option.value);
                              setIsDropdownOpen(false);
                            }}
                            className={`px-6 py-3 cursor-pointer transition-colors text-[16px] font-body-md text-left ${service === option.value
                              ? 'bg-white text-black font-semibold'
                              : 'text-zinc-400 hover:bg-white/10 hover:text-white'
                              }`}
                          >
                            {option.label}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {service === 'other' && (
                <div className="space-y-2 pt-2">
                  <label className="font-label-caps text-label-caps text-background/60 uppercase" htmlFor="other-service">Describe service needed</label>
                  <input
                    className="w-full bg-transparent border-0 border-b-2 border-background/10 py-3 px-0 focus:outline-none focus:ring-0 focus:border-background font-body-lg text-background placeholder:text-background/40 transition-colors"
                    id="other-service"
                    placeholder="E.g. SEO, Consultation, Custom Development, etc."
                    type="text"
                    required
                    value={otherService}
                    onChange={(e) => setOtherService(e.target.value)}
                  />
                </div>
              )}

              <div className="pt-6">
                <button
                  className="w-full md:w-auto bg-background text-primary py-4 px-10 rounded-full flex items-center justify-center space-x-3 group hover:bg-surface-container-highest transition-all duration-300 cursor-pointer disabled:opacity-50"
                  type="submit"
                  disabled={isSubmitting}
                >
                  <span className="font-label-caps text-label-caps uppercase tracking-[0.2em] group-hover:tracking-[0.3em] transition-all">
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </span>
                  <span className="material-symbols-outlined group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">send</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
