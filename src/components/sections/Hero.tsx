"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";

const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const titles = [
  "Full-Stack Developer",
  "AI Systems Engineer",
  "BTech Student @ JLU",
];

interface Particle {
  id: number;
  size: number;
  x: number;
  y: number;
  targetX: number;
  duration: number;
  delay: number;
}

// Magnetic Button Microinteraction Wrapper
function MagneticButton({
  children,
  className,
  onClick,
  ariaLabel
}: {
  children: React.ReactNode;
  className: string;
  onClick?: () => void;
  ariaLabel?: string;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const button = buttonRef.current;
    if (!button) return;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    // 35% magnetic pull strength
    setPos({ x: x * 0.35, y: y * 0.35 });
  };

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      onClick={onClick}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  );
}

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  // Generate particles on client mount with check for screen size to optimize performance
  useEffect(() => {
    let active = true;
    const rafId = requestAnimationFrame(() => {
      if (!active) return;
      setMounted(true);
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      const count = isMobile ? 15 : 40;

      const generated = Array.from({ length: count }).map((_, i) => ({
        id: i,
        size: Math.random() * 3 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        targetX: (Math.random() - 0.5) * 10,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * -20,
      }));
      setParticles(generated);
    });

    return () => {
      active = false;
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Typewriter effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentFullText = titles[titleIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayedText(prev => prev.substring(0, prev.length - 1));
      }, 50);
    } else {
      timer = setTimeout(() => {
        setDisplayedText(currentFullText.substring(0, displayedText.length + 1));
      }, 100);
    }

    if (!isDeleting && displayedText === currentFullText) {
      timer = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && displayedText === "") {
      timer = setTimeout(() => {
        setIsDeleting(false);
        setTitleIndex(prev => (prev + 1) % titles.length);
      }, 100);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, titleIndex]);

  // Mouse tilt effect for the center panel
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 120, damping: 22 });
  const mouseYSpring = useSpring(y, { stiffness: 120, damping: 22 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      const offset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Mask reveal animation config for headers
  const wordRevealVariants = {
    hidden: { y: "110%", opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } 
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <section 
      id="home" 
      className="min-h-screen relative flex items-center justify-center overflow-hidden px-4 pt-20 md:pt-0"
    >
      {/* Background Interactive Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {mounted && particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-neon-cyan/25"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
            animate={{
              y: ["0vh", "-100vh"],
              x: ["0vw", `${p.targetX}vw`],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Hero Content Container */}
      <div 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full max-w-5xl relative z-10 flex flex-col items-center text-center py-12 md:py-24"
        style={{ perspective: 1000 }}
      >
        <motion.div
          style={{ rotateX, rotateY }}
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center w-full"
        >
          {/* Dashboard console wrapper with corners and grid crosshairs */}
          <div className="w-full max-w-3xl glass-panel py-12 px-6 sm:px-12 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgba(0,180,216,0.03)] relative corner-mark corner-mark-cyan flex flex-col items-center overflow-hidden">
            
            {/* Animated HUD Vector Grid lines inside card */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-neon-cyan/40" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-neon-cyan/40" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-neon-cyan/40" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-neon-cyan/40" />
              
              {/* Rotating crosshairs */}
              <motion.svg 
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute top-4 left-4 w-4 h-4 text-neon-cyan/30" 
                viewBox="0 0 100 100"
              >
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="30 10" />
                <path d="M 50 0 L 50 100 M 0 50 L 100 50" stroke="currentColor" strokeWidth="6" />
              </motion.svg>

              <motion.svg 
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-4 right-4 w-4 h-4 text-neon-purple/30" 
                viewBox="0 0 100 100"
              >
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="20 15" />
                <path d="M 50 0 L 50 100 M 0 50 L 100 50" stroke="currentColor" strokeWidth="6" />
              </motion.svg>
            </div>

            {/* Tagline Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="px-4 py-1.5 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 text-xs font-mono tracking-widest text-neon-cyan-text mb-6 glow-cyan uppercase flex items-center gap-2 relative z-10"
            >
              <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
              <span>Systems online • v2.0.26</span>
            </motion.div>

            {/* Heading with Mask reveal */}
            <motion.h1 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-slate-900 leading-none mb-4 flex flex-wrap justify-center gap-x-4 overflow-hidden relative z-10"
            >
              <span className="inline-block overflow-hidden h-fit">
                <motion.span variants={wordRevealVariants} className="inline-block">Nishant</motion.span>
              </span>
              <span className="inline-block overflow-hidden h-fit">
                <motion.span variants={wordRevealVariants} className="inline-block bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent">Singh</motion.span>
              </span>
            </motion.h1>

            {/* Typewriter Title */}
            <div className="h-10 sm:h-12 flex items-center justify-center mb-6 relative z-10">
              <span className="text-xl sm:text-3xl font-mono font-medium tracking-wide text-slate-700">
                {displayedText}
                <span className="terminal-cursor" />
              </span>
            </div>

            {/* Bio Line */}
            <p className="max-w-xl text-sm sm:text-base md:text-lg text-slate-600 mb-10 leading-relaxed font-light relative z-10">
              &ldquo;Building at the intersection of <span className="text-neon-cyan-text font-normal">AI</span>,{" "}
              <span className="text-neon-purple font-normal">real-time systems</span>, and the web — with too little sleep.&rdquo;
            </p>

            {/* Call to Actions (with Magnetic physics) */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md mb-10 relative z-10">
              <MagneticButton
                onClick={() => scrollToSection("projects")}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple text-white text-sm font-semibold tracking-wider transition-all shadow-[0_4px_20px_rgba(0,180,216,0.15)] hover:shadow-[0_4px_30px_rgba(114,9,183,0.3)] flex items-center justify-center gap-2 cursor-pointer group border-none"
                ariaLabel="Explore Selected Projects"
              >
                <span>Explore Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </MagneticButton>

              <MagneticButton
                onClick={() => scrollToSection("terminal")}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 text-sm font-semibold tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer glass-panel"
                ariaLabel="Launch Systems CLI Terminal"
              >
                <Terminal className="w-4 h-4 text-neon-cyan-text animate-pulse" />
                <span className="font-mono">Launch CLI</span>
              </MagneticButton>
            </div>

            {/* Quick social links */}
            <div className="flex gap-6 items-center relative z-10">
              <a 
                href="https://github.com/NishantJLU" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-slate-200 bg-slate-50 hover:border-neon-cyan/45 hover:bg-neon-cyan/5 hover:text-neon-cyan-text hover:scale-110 hover:-translate-y-0.5 transition-all text-slate-500"
                aria-label="GitHub Profile"
                title="GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/nishantsingh-dev/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-slate-200 bg-slate-50 hover:border-neon-purple/45 hover:bg-neon-purple/5 hover:text-neon-purple hover:scale-110 hover:-translate-y-0.5 transition-all text-slate-500"
                aria-label="LinkedIn Profile"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://www.reddit.com/user/Emergency-Shine-2656/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-slate-200 bg-slate-50 hover:border-neon-pink/45 hover:bg-neon-pink/5 hover:text-neon-pink-text hover:scale-110 hover:-translate-y-0.5 transition-all text-slate-500"
                aria-label="Reddit Profile"
                title="Reddit Profile (u/Emergency-Shine-2656)"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M24 11.5c0-1.65-1.35-3-3-3-.96 0-1.86.48-2.42 1.24-1.64-1-3.85-1.68-6.28-1.78l1.3-4.1 4.2.9c.04.94.8 1.7 1.76 1.7 1.05 0 1.9-.85 1.9-1.9S18.65 3 17.6 3c-.9 0-1.66.63-1.84 1.47l-4.75-1.02c-.22-.05-.44.08-.5.3l-1.57 4.96c-2.48.06-4.73.74-6.38 1.77-.56-.75-1.45-1.22-2.4-1.22-1.65 0-3 1.35-3 3 0 1.12.63 2.1 1.56 2.62-.06.29-.1.59-.1.88 0 3.86 4.7 7 10.5 7s10.5-3.14 10.5-7c0-.3-.04-.59-.1-.88.93-.52 1.56-1.5 1.56-2.62zM7.5 14c-.83 0-1.5-.67-1.5-1.5S6.67 11 7.5 11s1.5.67 1.5 1.5S8.33 14 7.5 14zm9.3 2.92c-1.8 1.8-5.8 1.8-7.6 0-.2-.2-.2-.5 0-.7.2-.2.5-.2.7 0 1.4 1.4 4.8 1.4 6.2 0 .2-.2.5-.2.7 0 .2.2.2.5 0 .7zm-.3-2.92c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer"
        onClick={() => scrollToSection("about")}
      >
        <span className="text-[10px] font-mono tracking-wider text-slate-400 hover:text-neon-cyan-text transition-colors">
          SCROLL_TO_SYSTEMS
        </span>
        <div className="w-5 h-8 rounded-full border border-slate-300 flex justify-center p-1">
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-neon-cyan"
          />
        </div>
      </motion.div>
    </section>
  );
}
