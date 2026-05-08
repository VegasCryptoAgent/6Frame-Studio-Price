"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { X } from "lucide-react";

interface TheatricalHeroProps {
  onAbort: () => void;
  onInitiate: () => void;
}

export function TheatricalHero({ onAbort, onInitiate }: TheatricalHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback handled by browser autoplay policy
        });
      }
    }
  }, []);

  return (
    <div className="relative w-full bg-transparent pb-24">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        crossOrigin="anonymous"
        className="fixed inset-0 h-full w-full object-cover"
      >
        <source
          src="https://storage.googleapis.com/6frame_studio/El%20Patron.mp4"
          type="video/mp4"
        />
      </video>

      {/* Cinematic Overlays - Subtle vignette for contrast */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
      
      {/* Scope Overlay Effect removed */}

      {/* Content Layer */}
      <div className="relative z-10 min-h-screen w-full flex flex-col justify-between items-center px-6 md:px-24 py-12 md:py-20 pointer-events-none">
        
        {/* Header Navigation */}
        <div className="w-full flex justify-between items-start pointer-events-auto">
          <div className="flex items-center gap-4">
            <div className="h-[2px] w-12 bg-red-600" />
            <span className="text-[11px] font-black tracking-[0.4em] uppercase text-red-500 italic">
              EPIC_STORYBOARD // 03
            </span>
          </div>
          
          <button 
            onClick={onAbort}
            className="text-[10px] font-black uppercase tracking-[0.4rem] text-white/80 hover:text-red-500 drop-shadow-md flex items-center gap-2 group transition-all"
          >
            <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" /> [ ABORT_SEQUENCE ]
          </button>
        </div>

        {/* Centerpiece Titles */}
        <div className="flex flex-col items-center text-center pointer-events-auto mb-8 md:mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={onAbort}
            className="cursor-pointer"
          >
            <h2 className="text-4xl md:text-6xl lg:text-[14rem] font-black italic mb-4 tracking-tighter leading-none text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)] hover:text-white/80 transition-colors break-words">
              EPIC_NARRATIVE
            </h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="max-w-2xl text-lg md:text-xl lg:text-2xl font-bold text-white uppercase tracking-[0.3em] leading-tight mb-12 md:mb-16 lg:mb-24 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
          >
            Psychological dominance through cinematic high-energy storytelling
          </motion.p>
          
          {/* Actionable Core Specs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full max-w-5xl text-left bg-black/30 backdrop-blur-3xl border border-red-500/20 p-6 md:p-8 lg:p-12 rounded-[2rem] shadow-[0_0_100px_rgba(255,0,0,0.1)]">
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.4rem] text-red-500/70">Core_01 // Intensity</span>
              <h4 className="text-2xl font-black italic text-white drop-shadow-md">Arc & Pacing</h4>
              <p className="text-white/70 leading-relaxed text-sm drop-shadow-sm">Synchronizing atmospheric tension with explosive crescendos. We design the emotional pressure points.</p>
            </div>
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.4rem] text-red-500/70">Core_02 // Tech</span>
              <h4 className="text-2xl font-black italic text-white drop-shadow-md">VFX Density</h4>
              <p className="text-white/70 leading-relaxed text-sm drop-shadow-sm">Calculated visual complexity. Real-time rendering of abstract concepts into 8K photorealistic sequences.</p>
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="pointer-events-auto mt-12 md:mt-16 lg:mt-24">
          <button 
            onClick={onInitiate}
            className="px-8 md:px-12 lg:px-20 py-4 md:py-6 lg:py-10 bg-white/5 backdrop-blur-md border-2 border-white text-white rounded-full font-black text-[10px] md:text-xs tracking-[0.5em] uppercase hover:bg-white hover:text-black hover:scale-110 active:scale-95 transition-all shadow-[0_0_40px_rgba(0,0,0,0.3)]"
          >
            Initiate Production
          </button>
        </div>
      </div>

    </div>
  );
}
