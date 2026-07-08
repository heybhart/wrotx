import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Capabilities } from './components/Capabilities';
import { Projects } from './components/Projects';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';

export default function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  useEffect(() => {
    let timer: number;
    const handleScroll = () => {
      if (!document.body.classList.contains('disable-hover')) {
        document.body.classList.add('disable-hover');
      }
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        document.body.classList.remove('disable-hover');
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const handleOpenConsultation = () => {
    setIsConsultationOpen(true);
  };

  const handleCloseConsultation = () => {
    setIsConsultationOpen(false);
  };

  const handleViewProjects = () => {
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      <div className="min-h-screen bg-[#0b0b0b] text-on-background flex flex-col font-hanken selection:bg-white/10 selection:text-white">
      {/* Dynamic Header */}
      <Header onOpenConsultation={handleOpenConsultation} />

      {/* Main Layout Sections */}
      <main className="flex-grow">
        {/* Custom Hero section */}
        <Hero 
          onOpenConsultation={handleOpenConsultation} 
          onViewProjects={handleViewProjects} 
        />

        {/* Capabilities section */}
        <Capabilities onOpenConsultation={handleOpenConsultation} />

        {/* Case Studies / Projects section */}
        <Projects />

        {/* About / Blueprint section */}
        <About />

        {/* Contact Us section */}
        <Contact />
      </main>

      {/* Compliant footer */}
      <Footer />

      {/* Interactive Calendly Appointment Booking Simulator Overlay */}
      <AnimatePresence>
        {isConsultationOpen && (
          <ConsultationModal 
            isOpen={isConsultationOpen} 
            onClose={handleCloseConsultation} 
          />
        )}
      </AnimatePresence>
    </div>
    </ReactLenis>
  );
}
