"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/src/lib/utils";

export interface InteractiveTravelCardProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  actionText?: string;
  href: string;
  onActionClick?: () => void;
  className?: string;
}

export const InteractiveTravelCard = React.forwardRef<
  HTMLDivElement,
  InteractiveTravelCardProps
>(
  (
    { title, subtitle, imageUrl, actionText, href, onActionClick, className },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative aspect-video w-full rounded-2xl bg-transparent shadow-2xl border border-white/5 overflow-hidden",
          className
        )}
      >
        {/* Background Image */}
        <img
          src={imageUrl}
          alt={`${title}, ${subtitle}`}
          className="absolute inset-0 h-full w-full object-cover"
        />
        
        {/* Darkening overlay for text contrast */}
        <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-black/40 via-black/15 to-black/80 pointer-events-none" />

        <div className="absolute inset-4 grid h-[calc(100%-2rem)] w-[calc(100%-2rem)] grid-rows-[1fr_auto] rounded-xl z-10">
          {/* Card Content */}
          <div className="relative flex flex-col justify-between rounded-xl p-4 text-white h-full">
            
            {/* Header section */}
            <div className="flex items-start justify-between">
              <div className="text-left">
                <h2 className="font-display-xl text-xl sm:text-2xl font-bold uppercase leading-none tracking-wide text-white">
                  {title}
                </h2>
                <p className="font-label-caps text-[10px] text-zinc-300 uppercase tracking-wider mt-1">
                  {subtitle}
                </p>
              </div>
              <motion.a
                href={href === '#' ? undefined : href}
                target={href === '#' ? undefined : '_blank'}
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: "2.5deg" }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Learn more about ${title}`}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm ring-1 ring-inset ring-white/20 transition-colors hover:bg-white/30 cursor-pointer z-20"
              >
                <ArrowUpRight className="h-4 w-4 text-white" />
              </motion.a>
            </div>

            {/* Footer Button */}
            {actionText && onActionClick && (
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  onActionClick();
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "w-full rounded-lg py-2.5 text-center font-label-caps text-[10px] tracking-widest uppercase font-semibold text-white transition-colors cursor-pointer",
                  "bg-white/10 backdrop-blur-md ring-1 ring-inset ring-white/10 hover:bg-white/20 z-20"
                )}
              >
                {actionText}
              </motion.button>
            )}
          </div>
        </div>
      </div>
    );
  }
);
InteractiveTravelCard.displayName = "InteractiveTravelCard";
