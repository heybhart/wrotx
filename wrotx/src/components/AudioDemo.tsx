import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, Bot, User } from 'lucide-react';
import { FadeUp } from './FadeUp';

interface AudioDemoProps {
  onQuoteClick: () => void;
}

export const AudioDemo: React.FC<AudioDemoProps> = ({ onQuoteClick }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeBubble, setActiveBubble] = useState(0);
  const timerRef = useRef<number | null>(null);

  const bubbles = [
    {
      id: 1,
      speaker: 'AI Assistant',
      side: 'left',
      text: 'Namaste! Welcome to Sharma Dental. How can I help you today?',
      duration: 3
    },
    {
      id: 2,
      speaker: 'Customer',
      side: 'right',
      text: 'Hi, I need a dental checkup appointment this Saturday.',
      duration: 3
    },
    {
      id: 3,
      speaker: 'AI Assistant',
      side: 'left',
      text: 'We have 11:30 AM and 4:00 PM open this Saturday. Which one suits you?',
      duration: 3
    },
    {
      id: 4,
      speaker: 'Customer',
      side: 'right',
      text: 'Book 11:30 AM please. My number is 98200 12345.',
      duration: 3
    }
  ];

  const speakBubble = (text: string, isAI: boolean) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = isAI ? 1.05 : 0.95;
      const voices = window.speechSynthesis.getVoices();
      const indianVoice = voices.find((v) => v.lang.includes('IN') || v.name.includes('India'));
      if (indianVoice) utterance.voice = indianVoice;
      window.speechSynthesis.speak(utterance);
    } catch {
      // Fallback
    }
  };

  useEffect(() => {
    if (isPlaying) {
      speakBubble(bubbles[activeBubble].text, bubbles[activeBubble].side === 'left');
      timerRef.current = window.setTimeout(() => {
        if (activeBubble < bubbles.length - 1) {
          setActiveBubble((prev) => prev + 1);
        } else {
          setIsPlaying(false);
          setActiveBubble(0);
        }
      }, 3500);
    } else {
      if (timerRef.current) clearTimeout(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, activeBubble]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    } else {
      setIsPlaying(true);
      setActiveBubble(0);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setActiveBubble(0);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <section id="ai-voice" className="py-16 sm:py-24 hairline-b relative overflow-hidden">
      <span id="ai-demo" className="absolute -top-24 pointer-events-none" aria-hidden="true" />
      {/* Subtle blurred soft ambient color glow behind the container for glass depth and contrast */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 -translate-y-1/2 -left-10 w-[520px] h-[420px] rounded-full bg-gradient-to-tr from-purple-300/35 via-violet-200/25 to-pink-200/20 dark:from-purple-900/25 dark:to-pink-900/15 blur-[100px] transform-gpu"></div>
        <div className="absolute top-1/2 -translate-y-1/2 -right-10 w-[520px] h-[420px] rounded-full bg-gradient-to-bl from-orange-300/30 via-amber-200/25 to-sky-200/20 dark:from-[#D9480F]/20 dark:to-amber-900/15 blur-[100px] transform-gpu"></div>
        <div className="absolute top-1/3 left-1/3 w-[450px] h-[320px] rounded-full bg-gradient-to-r from-violet-200/25 via-indigo-100/20 to-sky-200/20 dark:from-indigo-950/20 dark:to-purple-950/20 blur-[110px] transform-gpu"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <FadeUp>
            <div className="mb-3">
              <span className="inline-block font-display text-xs sm:text-sm font-black tracking-wider uppercase italic -rotate-2 px-3 py-1 rounded-sm bg-[#c084fc] text-black border-2 border-black shadow-[3px_3px_0px_#000] dark:shadow-[3px_3px_0px_#000]">
                AI DEMO
              </span>
            </div>
          </FadeUp>
          <FadeUp delay={40}>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
              AI Calling Agents &amp; WhatsApp Automation
            </h2>
          </FadeUp>
          <FadeUp delay={80}>
            <p className="font-sans text-base text-slate-600 dark:text-slate-400 max-w-xl leading-normal">
              This is what your customers would hear.
            </p>
          </FadeUp>
        </div>

        {/* Audio Player and 4 Chat Bubbles in VisionOS Glass Panel */}
        <FadeUp delay={120}>
          <div className="relative rounded-3xl p-6 sm:p-10 backdrop-blur-[20px] saturate-[180%] bg-gradient-to-br from-white/80 via-white/55 to-white/70 dark:from-white/[0.08] dark:via-white/[0.04] dark:to-white/[0.02] border-[1.5px] border-slate-200/90 dark:border-white/15 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.12),0_4px_16px_-2px_rgba(15,23,42,0.04),inset_0_1.5px_2px_0_rgba(255,255,255,1),inset_0_0_0_1px_rgba(255,255,255,0.6)] dark:shadow-[0_24px_50px_-12px_rgba(0,0,0,0.6),inset_0_1.5px_2px_0_rgba(255,255,255,0.15)] before:content-[''] before:absolute before:inset-x-12 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-white/95 before:to-transparent before:pointer-events-none">
            
            {/* Top Waveform & Audio Player Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200/70 dark:border-white/10">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleTogglePlay}
                  aria-label={isPlaying ? 'Pause sample call' : 'Play sample call'}
                  className="bg-[#D9480F] hover:bg-[#c23e0c] dark:bg-gradient-to-r dark:from-[#D9480F] dark:to-[#EA580C] text-white min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center cursor-pointer transition-all shadow-sm active:scale-95"
                >
                  {isPlaying ? <Pause size={18} strokeWidth={2} /> : <Play size={18} strokeWidth={2} className="translate-x-0.5" />}
                </button>

                <button
                  onClick={handleReset}
                  aria-label="Restart audio demo"
                  className="min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white glass-card bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/15 cursor-pointer"
                >
                  <RotateCcw size={16} strokeWidth={1.75} />
                </button>

                <div className="flex items-center gap-2 pl-2">
                  <Volume2 size={16} strokeWidth={2} className="text-[#D9480F] dark:text-[#F97316]" />
                  <span className="font-mono text-xs text-slate-700 dark:text-slate-300 font-semibold">
                    Sample Inbound Booking Call
                  </span>
                </div>
              </div>

              {/* Dynamic Waveform Visual */}
              <div className="flex items-center gap-1.5 h-6">
                {[8, 16, 24, 12, 28, 20, 14, 26, 18, 10, 22, 16, 24, 12].map((h, i) => (
                  <span
                    key={i}
                    style={{ height: `${h}px` }}
                    className={`w-1 rounded-full transition-all duration-200 ${
                      isPlaying
                        ? 'bg-[#D9480F] dark:bg-[#F97316] shadow-[0_0_8px_rgba(217,72,15,0.7)]'
                        : 'bg-slate-300 dark:bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* 4 Chat Bubbles */}
            <div className="pt-8 space-y-4 max-w-2xl mx-auto">
              {bubbles.map((b, idx) => {
                const isLeft = b.side === 'left';
                const isHighlight = isPlaying && activeBubble === idx;

                return (
                  <div
                    key={b.id}
                    className={`flex items-start gap-3 ${isLeft ? 'justify-start' : 'justify-end'}`}
                  >
                    {isLeft && (
                      <div className="w-8 h-8 rounded-xl bg-white dark:bg-white/10 flex items-center justify-center text-[#D9480F] dark:text-[#F97316] shrink-0 mt-1 border border-slate-200 dark:border-white/15 shadow-2xs">
                        <Bot size={16} strokeWidth={1.75} />
                      </div>
                    )}

                    <div
                      className={`max-w-md p-4 rounded-2xl text-left transition-all ${
                        isLeft
                          ? isHighlight
                            ? 'bg-white dark:bg-white/15 border-2 border-[#D9480F] dark:border-[#F97316] text-slate-900 dark:text-white shadow-[0_0_20px_rgba(217,72,15,0.2)]'
                            : 'bg-white/95 dark:bg-white/[0.06] border border-slate-200/90 dark:border-white/15 text-slate-900 dark:text-white shadow-xs'
                          : isHighlight
                          ? 'bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-[#D9480F] dark:border-[#F97316] shadow-[0_0_20px_rgba(217,72,15,0.25)]'
                          : 'bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white border border-slate-200 dark:border-white/15 shadow-xs'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4 mb-1">
                        <span
                          className={`font-mono text-[10px] uppercase font-bold tracking-wider ${
                            isLeft ? 'text-[#D9480F] dark:text-[#F97316]' : 'text-slate-500 dark:text-slate-300'
                          }`}
                        >
                          {b.speaker}
                        </span>
                        <span className={`font-mono text-[9px] ${isLeft ? 'text-slate-400 dark:text-slate-500' : 'text-slate-400'}`}>
                          00:0{idx * 3}
                        </span>
                      </div>
                      <p className="font-sans text-xs sm:text-sm leading-relaxed">
                        "{b.text}"
                      </p>
                    </div>

                    {!isLeft && (
                      <div className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-white flex items-center justify-center shrink-0 mt-1 shadow-xs border border-slate-300 dark:border-transparent">
                        <User size={16} strokeWidth={1.75} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Note */}
            <div className="mt-8 pt-5 text-center border-t border-slate-200/70 dark:border-white/10">
              <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                AI agents answer in natural Hindi and Indian English. Audio plays only on click.
              </span>
            </div>

          </div>
        </FadeUp>

      </div>
    </section>
  );
};
