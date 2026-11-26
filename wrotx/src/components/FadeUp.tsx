import React, { useEffect, useRef } from 'react';

interface FadeUpProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const FadeUp: React.FC<FadeUpProps> = ({ children, className = '', delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Pre-check if already near or within viewport on initial render
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 300) {
      if (delay > 0) {
        const timer = setTimeout(() => el.classList.add('is-visible'), Math.min(delay, 80));
        return () => clearTimeout(timer);
      }
      el.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('is-visible');
            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0,
        rootMargin: '350px 0px 350px 0px'
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`fade-up ${className}`}>
      {children}
    </div>
  );
};
