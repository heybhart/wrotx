import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface w-full pt-24 pb-8 border-t border-white/5 mt-auto select-none">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-5 md:px-16 max-w-[1440px] mx-auto w-full">
        {/* Brand Block */}
        <div className="flex flex-col space-y-4 text-left">
          <div className="font-headline-lg text-[48px] leading-none tracking-tighter text-primary">
            WrotX
          </div>
          <p className="font-body-md text-[16px] text-zinc-400">
            © {currentYear} WrotX Studio. Engineered for Excellence.
          </p>
        </div>

        {/* Inquiries Column */}
        <div className="flex flex-col space-y-2 text-left">
          <span className="font-label-caps text-[12px] text-primary opacity-40 uppercase mb-2 tracking-widest">
            Inquiries
          </span>
          <a
            className="font-body-md text-[16px] text-zinc-400 hover:text-primary transition-colors duration-300 cursor-pointer"
            href="#contact"
          >
            New Business
          </a>
          <a
            className="font-body-md text-[16px] text-zinc-400 hover:text-primary transition-colors duration-300 cursor-pointer"
            href="#contact"
          >
            Consultation
          </a>
          <a
            className="font-body-md text-[16px] text-zinc-400 hover:text-primary transition-colors duration-300 cursor-pointer"
            href="#contact"
          >
            Share Feedback
          </a>
        </div>

        {/* Studio Column */}
        <div className="flex flex-col space-y-2 text-left">
          <span className="font-label-caps text-[12px] text-primary opacity-40 uppercase mb-2 tracking-widest">
            Studio
          </span>
          <p className="font-body-md text-[16px] text-zinc-400 leading-relaxed">
            Available Globally.<br />
            Based in Mumbai, India
          </p>
        </div>
      </div>
    </footer>
  );
};
