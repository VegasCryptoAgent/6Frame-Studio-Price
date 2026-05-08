/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from "motion/react";
import { ArrowUpRight, Play, Film, Layers, Zap, Menu, X, Plus, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { ReactNode, useState, useRef, MouseEvent, useEffect, Key, FormEvent } from "react";
import { InlineWidget } from "react-calendly";
import { PrismaHero } from "./components/ui/prisma-hero";
import { DynamicFrameLayout } from "./components/ui/dynamic-frame-layout";
import MountainVistaParallax from "./components/ui/mountain-vista-parallax";
import { TheatricalHero } from "./components/ui/theatrical-hero";
import { DraggableCardBody, DraggableCardContainer } from "./components/ui/draggable-card";

const Grain = () => <div className="grain" />;

const LiquidCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 20, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const dotXSpring = useSpring(cursorX, { damping: 40, stiffness: 800 });
  const dotYSpring = useSpring(cursorY, { damping: 40, stiffness: 800 });

  useEffect(() => {
    const moveCursor = (e: any) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <>
      <motion.div
        className="fixed pt-0 pl-0 w-16 h-16 md:w-20 lg:w-16 md:h-20 lg:h-16 border border-brand-accent/60 md:border-2 lg:border rounded-full pointer-events-none z-[2000] mix-blend-difference shadow-[0_0_15px_rgba(225,224,204,0.3)] md:shadow-[0_0_25px_rgba(225,224,204,0.6)] lg:shadow-[0_0_15px_rgba(225,224,204,0.3)] hidden md:block -translate-x-1/2 -translate-y-1/2"
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
        }}
      />
      <motion.div
        className="fixed pt-0 pl-0 w-3 h-3 md:w-4 lg:w-3 md:h-4 lg:h-3 bg-brand-accent rounded-full pointer-events-none z-[2000] mix-blend-difference shadow-[0_0_10px_rgba(225,224,204,0.8)] md:shadow-[0_0_15px_rgba(225,224,204,1)] lg:shadow-[0_0_10px_rgba(225,224,204,0.8)] hidden md:block -translate-x-1/2 -translate-y-1/2"
        style={{
          translateX: dotXSpring,
          translateY: dotYSpring,
        }}
      />
    </>
  );
};

const Magnetic = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    x.set(distanceX * 0.35);
    y.set(distanceY * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
};

const FadeIn = (props: { children: ReactNode, delay?: number, className?: string, key?: Key }) => {
  const { children, delay = 0, className = "" } = props;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const SectionLabel = ({ children }: { children: string }) => (
  <FadeIn className="mb-12">
    <div className="flex items-center gap-4">
      <div className="h-[2px] w-12 bg-gradient-to-r from-brand-accent to-transparent" />
      <span className="text-[11px] font-black tracking-[0.4em] uppercase text-brand-accent italic">
        {children}
      </span>
    </div>
  </FadeIn>
);

const PricingSection = ({ onOpenBrief }: { onOpenBrief: (title: string) => void }) => {
  const cards = [
    {
      title: "Motion Identity",
      price: "$5,000",
      items: ["Abstract Choreography", "Sonic DNA", "System Framework", "Multi-Res Mastering"]
    },
    {
      title: "Studio Package",
      price: "$15,000",
      items: ["Brand Film", "Logo Reveal", "Atmospheric B-Roll", "Social Assets"]
    },
    {
      title: "Theatrical Trailer",
      price: "$25,000+",
      items: ["Advanced Storyboarding", "8K Sound Design", "Premium Color", "VFX Compositing"]
    }
  ];

  return (
    <section id="pricing" className="px-6 md:px-24 py-32 bg-transparent relative z-20">
      <SectionLabel>Investment Models</SectionLabel>
      <div className="space-y-32 relative">
        {cards.map((card, i) => (
          <div key={i} className="mb-12">
            <FadeIn delay={i * 0.1}>
              <div className="relative bg-white/5 p-[1px] rounded-[2.5rem] overflow-hidden group shadow-2xl backdrop-blur-3xl border border-white/10 hover:border-brand-accent/50 transition-all duration-700 hover:scale-[1.01]">
                <div className="bg-transparent rounded-[2.4rem] p-6 md:p-10 lg:p-16 h-full flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-12">
                  <div className="flex-1 w-full">
                    <span className="text-[10px] font-mono text-white/30 mb-8 block font-bold tracking-widest">TYPE_{i.toString().padStart(2, '0')}</span>
                    <h3 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-tighter mb-8 leading-none group-hover:italic transition-all duration-700 text-white break-words">
                      {card.title}
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      {card.items.map((item, idx) => (
                        <span key={idx} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase font-black tracking-widest text-white/40">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="lg:text-right flex flex-col justify-between items-start lg:items-end w-full lg:w-auto h-full mt-8 lg:mt-0">
                    <div className="mb-8 lg:mb-12">
                      <p className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40 mb-4 text-white">Investment Start</p>
                      <p className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white">{card.price}</p>
                    </div>
                    <Magnetic>
                      <button 
                        onClick={() => onOpenBrief(card.title)}
                        className="px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-white hover:text-black transition-all duration-500"
                      >
                        Initial Brief <Plus className="w-4 h-4" />
                      </button>
                    </Magnetic>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        ))}
      </div>
    </section>
  );
};

const demoFrames = [
  {
    id: 1,
    video: "https://static.cdn-luma.com/files/981e483f71aa764b/Company%20Thing%20Exported.mp4",
    defaultPos: { x: 0, y: 0, w: 4, h: 4 },
    mediaSize: 1,
    isHovered: false,
  },
  {
    id: 2,
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/WebGL%20Exported%20(1).mp4",
    defaultPos: { x: 4, y: 0, w: 4, h: 4 },
    mediaSize: 1,
    isHovered: false,
  },
  {
    id: 3,
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Jitter%20Exported%20Poster.mp4",
    defaultPos: { x: 8, y: 0, w: 4, h: 4 },
    mediaSize: 1,
    isHovered: false,
  },
  {
    id: 4,
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Exported%20Web%20Video.mp4",
    defaultPos: { x: 0, y: 4, w: 4, h: 4 },
    mediaSize: 1,
    isHovered: false,
  },
  {
    id: 5,
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Logo%20Exported.mp4",
    defaultPos: { x: 4, y: 4, w: 4, h: 4 },
    mediaSize: 1,
    isHovered: false,
  },
  {
    id: 6,
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Animation%20Exported%20(4).mp4",
    defaultPos: { x: 8, y: 4, w: 4, h: 4 },
    mediaSize: 1,
    isHovered: false,
  },
  {
    id: 7,
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Illustration%20Exported%20(1).mp4",
    defaultPos: { x: 0, y: 8, w: 4, h: 4 },
    mediaSize: 1,
    isHovered: false,
  },
  {
    id: 8,
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Art%20Direction%20Exported.mp4",
    defaultPos: { x: 4, y: 8, w: 4, h: 4 },
    mediaSize: 1,
    isHovered: false,
  },
  {
    id: 9,
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Product%20Video.mp4",
    defaultPos: { x: 8, y: 8, w: 4, h: 4 },
    mediaSize: 1,
    isHovered: false,
  },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showBrief, setShowBrief] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const containerRef = useRef(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [showContact, showBrief]);

  const { scrollYProgress } = useScroll();

  const handleOpenBrief = (title: string) => {
    setSelectedPackage(title);
    setShowBrief(true);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div ref={containerRef} className="relative min-h-screen bg-brand-bg text-brand-text antialiased cursor-none selection:bg-brand-accent selection:text-black">
      <LiquidCursor />
      
      {/* Persistent Cinematic Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
        />
      </div>

      {/* Side Menu Trigger */}
      <div className="fixed top-8 right-8 z-[1000] pointer-events-auto">
        <Magnetic>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-16 h-16 bg-white rounded-full flex flex-col items-center justify-center gap-1.5 group relative hover:scale-110 transition-transform overflow-hidden shadow-2xl"
          >
            <div className={`absolute inset-0 bg-brand-accent transition-transform duration-500 ${isMenuOpen ? 'scale-y-100' : 'scale-y-0'} origin-bottom`} />
            <div className="relative z-10 space-y-1">
              <div className={`w-6 h-[2px] bg-black transition-transform duration-500 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <div className={`w-4 h-[2px] bg-black ml-auto transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`} />
              <div className={`w-6 h-[2px] bg-black transition-transform duration-500 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </Magnetic>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[900] bg-brand-accent flex flex-col justify-center items-center p-12"
          >
            <div className="space-y-4 text-center">
              {[
                { 
                  label: "Home", 
                  action: () => { 
                    setShowContact(false); 
                    setIsSubmitted(false);
                    setIsMenuOpen(false); 
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  } 
                },
                { label: "Studio", action: () => { window.open("https://6framestudio.com/", "_blank"); setIsMenuOpen(false); } },
                { 
                  label: "Pricing", 
                  action: () => { 
                    setShowContact(false); 
                    setIsSubmitted(false);
                    setIsMenuOpen(false); 
                    setTimeout(() => {
                      const element = document.getElementById('pricing');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }, 300);
                  } 
                },
                { label: "Contact", action: () => { setShowContact(true); setIsSubmitted(false); setIsMenuOpen(false); } }
              ].map((item, i) => (
                <motion.a
                  key={item.label}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  href={item.label === "Studio" ? "https://6framestudio.com/" : "#"}
                  target={item.label === "Studio" ? "_blank" : undefined}
                  rel={item.label === "Studio" ? "noopener noreferrer" : undefined}
                  className="block text-huge text-black hover:italic transition-all duration-500 cursor-pointer"
                  onClick={item.action}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {showBrief ? (
          <motion.section
            key="brief"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className={`fixed inset-0 z-[1100] bg-zinc-950 ${(selectedPackage === "Studio Package" || selectedPackage === "Theatrical Trailer" || selectedPackage === "Motion Identity") ? "overflow-y-auto" : "overflow-hidden"}`}
          >
            {selectedPackage === "Studio Package" && (
              <MountainVistaParallax
                title="BRAND_CINEMA"
                subtitle="Scaling your vision into a comprehensive cinematic universe."
                onAbort={() => setShowBrief(false)}
                onInitiate={() => {
                  setShowBrief(false);
                  setShowContact(true);
                  setIsSubmitted(false);
                }}
              />
            )}

            {selectedPackage === "Theatrical Trailer" && (
              <TheatricalHero 
                onAbort={() => setShowBrief(false)}
                onInitiate={() => {
                  setShowBrief(false);
                  setShowContact(true);
                  setIsSubmitted(false);
                }}
              />
            )}

            {selectedPackage === "Motion Identity" && (
              <>
                {/* Background Layer */}
                <div className="fixed inset-0 z-0">
                  <div className="w-full h-full">
                    <DynamicFrameLayout 
                      frames={demoFrames} 
                      className="w-full h-full" 
                      hoverSize={8}
                      gapSize={2}
                    />
                    <div className="absolute inset-0 pointer-events-none" />
                  </div>
                </div>

                {/* Content Layer */}
                <div className="relative z-10 min-h-screen px-6 md:px-24 py-32 flex flex-col justify-between items-center pointer-events-none">
                  <div className="w-full flex justify-between items-start pointer-events-auto">
                    <SectionLabel>{`${selectedPackage ?? 'Package'} _ Brief`}</SectionLabel>
                    <button 
                      onClick={() => setShowBrief(false)}
                      className="text-[10px] font-black uppercase tracking-[0.4rem] text-white/60 hover:text-white flex items-center gap-2 group transition-all"
                    >
                      <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" /> [ Close_Terminal ]
                    </button>
                  </div>

                  <div className="flex flex-col items-center text-center max-w-5xl pointer-events-auto w-full">
                    <h2 
                      onClick={() => setShowBrief(false)}
                      className="text-6xl md:text-8xl lg:text-[12rem] font-black italic mb-4 tracking-tighter cursor-pointer hover:opacity-60 transition-opacity leading-none text-white break-words" 
                      style={{ textShadow: "0 0 40px rgba(0,0,0,0.5)" }}
                    >
                      SONIC_DNA
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full text-left bg-black/40 backdrop-blur-xl border border-white/5 p-8 md:p-12 rounded-[2rem] mt-32">
                      <div className="space-y-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.4rem] text-brand-accent/50">Core_01 // Rhythm</span>
                        <h4 className="text-2xl font-black italic text-white">Sonic Principles</h4>
                        <p className="text-white/60 leading-relaxed text-sm">Define the frequency range and rhythmic complexity. We synchronize motion to auditory intent.</p>
                      </div>
                      <div className="space-y-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.4rem] text-brand-accent/50">Core_02 // Physics</span>
                        <h4 className="text-2xl font-black italic text-white">Motion Logic</h4>
                        <p className="text-white/60 leading-relaxed text-sm">Gravity, inertia, and fluid dynamics. We specify the mechanical laws of your brand universe.</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-8 pointer-events-auto mt-8 md:mt-12">
                    <Magnetic>
                      <button 
                        onClick={() => {
                          setShowBrief(false);
                          setShowContact(true);
                          setIsSubmitted(false);
                        }}
                        className="px-16 py-8 bg-white text-black rounded-full font-black text-[12px] tracking-[0.4rem] uppercase hover:scale-105 active:scale-95 transition-all shadow-[0_0_50px_rgba(255,255,255,0.3)]"
                      >
                        Initiate Transmission
                      </button>
                    </Magnetic>
                  </div>
                </div>
              </>
            )}
          </motion.section>
        ) : !showContact ? (
          <motion.main
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <PrismaHero />

            {/* Intensity Section */}
            <section className="px-6 md:px-12 lg:px-24 py-32 md:py-64 relative z-20">
              <div className="max-w-[1400px] mx-auto overflow-hidden">
                <SectionLabel>Core Mission</SectionLabel>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mt-16 md:mt-32">
                   {[
                     { title: "Dominance", text: "Visual assets engineered to seize market authority within seconds of contact." },
                     { title: "Ultra-High Fidelity", text: "Strict 8K cinematic standards across every frame delivered." },
                     { title: "Strategic Velocity", text: "Iterative studio cycles synchronized with global release timelines." }
                   ].map((item, i) => (
                     <FadeIn key={i} delay={i * 0.1}>
                       <div className="space-y-6 group p-6 md:p-10 lg:p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md hover:bg-white transition-all duration-700">
                         <span className="text-[10px] font-black tracking-[0.4em] opacity-30 group-hover:text-black">0{i+1}</span>
                         <h4 className="text-2xl md:text-3xl lg:text-3xl font-black uppercase italic group-hover:text-black transition-colors">{item.title}</h4>
                         <p className="text-white/40 font-medium leading-relaxed group-hover:text-black/60 transition-colors text-sm md:text-base lg:text-base">{item.text}</p>
                       </div>
                     </FadeIn>
                   ))}
                </div>
              </div>
            </section>

            <PricingSection onOpenBrief={handleOpenBrief} />

            {/* CTA Section */}
            <section className="px-6 md:px-24 py-64 flex flex-col items-center text-center overflow-hidden relative z-20">
              <SectionLabel>Collaborate</SectionLabel>
              <div className="relative">
                <motion.h2 
                  whileInView={{ scale: [0.9, 1.05, 1], rotate: [0, 2, 0] }}
                  transition={{ duration: 1.5 }}
                  className="text-huge italic opacity-10 mb-[-0.2em] text-white"
                >
                  PROJECT_START
                </motion.h2>
                <h2 className="text-huge relative z-10 text-white">INITIATE_NOW</h2>
              </div>
              <div className="mt-48">
                <Magnetic>
                  <button 
                    onClick={() => {
                      setShowContact(true);
                      setIsSubmitted(false);
                    }}
                    className="px-20 py-10 bg-transparent border border-white/20 backdrop-blur-xl text-white rounded-full font-black text-xs tracking-[0.5em] uppercase hover:bg-white hover:text-black hover:scale-110 transition-all duration-500 shadow-2xl"
                  >
                    Start Here
                  </button>
                </Magnetic>
              </div>
            </section>
          </motion.main>
        ) : (
          <motion.section
            key="contact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 min-h-screen pt-20 lg:pt-32 px-6 md:px-24 flex flex-col justify-center max-w-[1400px] mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start pb-24">
              <div>
                <SectionLabel>Contact</SectionLabel>
                <h2 
                  onClick={() => {
                    setShowContact(false);
                    setIsSubmitted(false);
                  }}
                  className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter leading-[0.8] uppercase mb-12 cursor-pointer hover:opacity-60 transition-opacity text-white" 
                >
                  Let's create <br />
                  <span className="italic opacity-40">IMMORTALITY.</span>
                </h2>
                <div className="space-y-8 mt-16 text-white/80 font-medium">
                  <p className="max-w-md text-lg lg:text-xl leading-relaxed">
                    Whether it's a global campaign or a secret venture, our studio is ready to amplify your vision.
                  </p>
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-[0.4rem] opacity-30 mb-2">Contact</span>
                    <a href="mailto:6framestudio@gmail.com" className="text-xl lg:text-2xl text-white hover:italic transition-all">6framestudio@gmail.com</a>
                  </div>
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-[0.4rem] opacity-30 mb-2">Location</span>
                    <p className="text-xl lg:text-2xl text-white">Las Vegas / Los Angeles</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => {
                    setShowContact(false);
                    setIsSubmitted(false);
                  }}
                  className="mt-16 flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4rem] text-white/40 hover:text-white transition-colors group"
                >
                  <div className="w-12 h-[1px] bg-white/20 group-hover:w-20 transition-all" />
                  Return Home
                </button>
              </div>

              <div className="bg-white/5 border border-white/10 p-6 lg:p-12 rounded-[2.5rem] backdrop-blur-3xl shadow-2xl lg:translate-x-[96px] min-h-[500px] lg:min-h-[600px] flex flex-col items-center justify-center">
                {isSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full h-full flex flex-col"
                  >
                    <div className="text-center mb-8">
                      <h3 className="text-3xl font-black italic text-white mb-2 underline decoration-brand-accent underline-offset-8">TRANSMISSION_RECEIVED</h3>
                      <p className="text-white/60 text-xs tracking-widest uppercase font-black">Finalize your sequence below.</p>
                    </div>
                    <div className="flex-1 min-h-[500px] rounded-2xl overflow-hidden grayscale invert brightness-200 contrast-125 opacity-80 hover:opacity-100 transition-opacity">
                      <InlineWidget 
                        url="https://calendly.com/6framestudio" 
                        styles={{ height: '500px' }}
                        pageSettings={{
                          backgroundColor: '000000',
                          hideEventTypeDetails: false,
                          hideLandingPageDetails: false,
                          primaryColor: 'e1e0cc',
                          textColor: 'ffffff'
                        }}
                      />
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-12">
                    <div className="space-y-2 group">
                      <label className="text-[10px] font-black uppercase tracking-[0.4rem] text-white/50 group-focus-within:text-white transition-colors">01 / Full Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="ENTER NAME" 
                        className="w-full bg-transparent border-b border-white/20 py-4 text-xl lg:text-3xl font-black tracking-tighter focus:outline-none focus:border-white text-white placeholder:text-white/10"
                      />
                    </div>
                    <div className="space-y-2 group">
                      <label className="text-[10px] font-black uppercase tracking-[0.4rem] text-white/50 group-focus-within:text-white transition-colors">02 / Identity</label>
                      <input 
                        required
                        type="email" 
                        placeholder="EMAIL@DOMAIN.COM" 
                        className="w-full bg-transparent border-b border-white/20 py-4 text-xl lg:text-3xl font-black tracking-tighter focus:outline-none focus:border-white text-white placeholder:text-white/10"
                      />
                    </div>
                    <div className="space-y-2 group">
                      <label className="text-[10px] font-black uppercase tracking-[0.4rem] text-white/50 group-focus-within:text-white transition-colors">03 / Transmission</label>
                      <textarea 
                        required
                        placeholder="TELL US ABOUT THE PROJECT" 
                        rows={4}
                        className="w-full bg-transparent border-b border-white/20 py-4 text-xl lg:text-3xl font-black tracking-tighter focus:outline-none focus:border-white text-white placeholder:text-white/10 resize-none"
                      />
                    </div>
                    
                    <div className="pt-8">
                      <Magnetic>
                        <button type="submit" className="px-8 md:px-16 py-8 bg-white text-black rounded-full font-black text-[10px] tracking-[0.4rem] uppercase hover:italic hover:scale-110 transition-all shadow-xl">
                            Send Transmission
                          </button>
                      </Magnetic>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Social Nexus Section */}
      {!showContact && !showBrief && (
        <section className="px-6 md:px-24 py-16 md:py-32 flex flex-col items-center bg-transparent relative z-20 overflow-hidden">
          <SectionLabel>Social Nexus</SectionLabel>
          <div className="w-full max-w-7xl mx-auto">
            <DraggableCardContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 py-16 md:py-24 justify-items-center">
              <DraggableCardBody className="bg-[#1a1a1a]/40 border-white/5 mx-auto w-full max-w-[320px]">
                <div className="flex flex-col h-full justify-between pointer-events-none">
                  <div className="flex justify-between items-start">
                    <Instagram className="w-10 h-10 text-brand-accent" />
                    <span className="text-[10px] font-black opacity-20 tracking-widest">IDX_001</span>
                  </div>
                  <div>
                    <h4 className="text-2xl font-black italic text-white mb-2 underline decoration-brand-accent/30 underline-offset-8">INSTAGRAM</h4>
                    <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">@6FRAMESTUDIO</p>
                  </div>
                  <a 
                    href="https://www.instagram.com/6framestudio/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="pointer-events-auto mt-4 text-[10px] font-black uppercase tracking-widest text-brand-accent border-b border-brand-accent/20 w-fit hover:border-brand-accent transition-all"
                  >
                    Enter_Grid
                  </a>
                </div>
              </DraggableCardBody>

              <DraggableCardBody className="bg-[#1a1a1a]/40 border-white/5 mx-auto w-full max-w-[320px]">
                <div className="flex flex-col h-full justify-between pointer-events-none">
                  <div className="flex justify-between items-start">
                    <Linkedin className="w-10 h-10 text-brand-accent" />
                    <span className="text-[10px] font-black opacity-20 tracking-widest">IDX_002</span>
                  </div>
                  <div>
                    <h4 className="text-2xl font-black italic text-white mb-2 underline decoration-brand-accent/30 underline-offset-8">LINKEDIN</h4>
                    <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">6FRAME STUDIO</p>
                  </div>
                  <a 
                    href="https://www.linkedin.com/company/6framestudio" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="pointer-events-auto mt-4 text-[10px] font-black uppercase tracking-widest text-brand-accent border-b border-brand-accent/20 w-fit hover:border-brand-accent transition-all"
                  >
                    View_Network
                  </a>
                </div>
              </DraggableCardBody>

              <DraggableCardBody className="bg-[#1a1a1a]/40 border-white/5 mx-auto w-full max-w-[320px]">
                <div className="flex flex-col h-full justify-between pointer-events-none">
                  <div className="flex justify-between items-start">
                    <Twitter className="w-10 h-10 text-brand-accent" />
                    <span className="text-[10px] font-black opacity-20 tracking-widest">IDX_003</span>
                  </div>
                  <div>
                    <h4 className="text-2xl font-black italic text-white mb-2 underline decoration-brand-accent/30 underline-offset-8">X_CORP</h4>
                    <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">@6FRAMESTUDIOS</p>
                  </div>
                  <a 
                    href="https://x.com/6framestudios" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="pointer-events-auto mt-4 text-[10px] font-black uppercase tracking-widest text-brand-accent border-b border-brand-accent/20 w-fit hover:border-brand-accent transition-all"
                  >
                    Read_Feed
                  </a>
                </div>
              </DraggableCardBody>

              <DraggableCardBody className="bg-[#1a1a1a]/40 border-white/5 mx-auto w-full max-w-[320px]">
                <div className="flex flex-col h-full justify-between pointer-events-none">
                  <div className="flex justify-between items-start">
                    <Youtube className="w-10 h-10 text-brand-accent" />
                    <span className="text-[10px] font-black opacity-20 tracking-widest">IDX_004</span>
                  </div>
                  <div>
                    <h4 className="text-2xl font-black italic text-white mb-2 underline decoration-brand-accent/30 underline-offset-8">YOUTUBE</h4>
                    <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">@6FRAMESTUDIO</p>
                  </div>
                  <a 
                    href="https://www.youtube.com/@6framestudio" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="pointer-events-auto mt-4 text-[10px] font-black uppercase tracking-widest text-brand-accent border-b border-brand-accent/20 w-fit hover:border-brand-accent transition-all"
                  >
                    Watch_Stream
                  </a>
                </div>
              </DraggableCardBody>
            </DraggableCardContainer>
          </div>
        </section>
      )}

    </div>
  );
}
