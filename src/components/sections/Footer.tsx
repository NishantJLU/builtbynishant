"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Send, Heart, MapPin, ExternalLink } from "lucide-react";

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

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer id="contact" className="relative border-t border-slate-100 bg-page-bg pt-24 pb-12 px-4 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[150px] bg-neon-purple/5 blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto flex flex-col gap-16 relative z-10">
        {/* Contact Section Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-xs font-mono tracking-widest text-neon-pink-text mb-2 uppercase">
              {"// LET_CONNECT"}
            </h2>
            <h3 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
              Access Granted.<br />Let&apos;s Build.
            </h3>
            <p className="text-slate-600 text-sm font-light leading-relaxed max-w-md">
              Whether you want to build an agentic bridge to a game engine, deploy a vector-based semantic memory layer, or just discuss the future of AI — my terminal is open.
            </p>
            <div className="flex items-center gap-2 mt-6 text-slate-500 text-xs font-mono">
              <MapPin className="w-3.5 h-3.5 text-neon-pink-text animate-pulse" />
              <span>Bhopal, Madhya Pradesh, India</span>
            </div>
          </div>

          {/* Social card list */}
          <div className="glass-panel p-8 rounded-3xl border border-slate-100 flex flex-col gap-4 bg-white/45 hover:border-neon-purple/20 transition-all duration-300">
            <h4 className="text-sm font-mono tracking-wider text-slate-700 uppercase mb-2">{"// DIRECT_DIRECTORY"}</h4>
            
            <a 
              href="https://github.com/NishantJLU"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-2xl border border-slate-100 hover:border-neon-cyan/20 bg-slate-50 hover:bg-neon-cyan/5 text-slate-700 hover:text-slate-950 transition-all duration-300 group"
              aria-label="GitHub Profile"
            >
              <div className="flex items-center gap-3">
                <Github className="w-5 h-5 text-slate-500 group-hover:text-neon-cyan transition-colors" />
                <span className="font-mono text-xs sm:text-sm">github.com/NishantJLU</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-neon-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>

            <a 
              href="https://www.linkedin.com/in/nishantsingh-dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-2xl border border-slate-100 hover:border-neon-purple/20 bg-slate-50 hover:bg-neon-purple/5 text-slate-700 hover:text-slate-950 transition-all duration-300 group"
              aria-label="LinkedIn Profile"
            >
              <div className="flex items-center gap-3">
                <Linkedin className="w-5 h-5 text-slate-500 group-hover:text-neon-purple transition-colors" />
                <span className="font-mono text-xs sm:text-sm">linkedin.com/in/nishantsingh-dev</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-neon-purple group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>

            <a 
              href="https://www.reddit.com/user/Emergency-Shine-2656/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-2xl border border-slate-100 hover:border-neon-red/20 bg-slate-50 hover:bg-neon-red/5 text-slate-700 hover:text-slate-950 transition-all duration-300 group"
              aria-label="Reddit Profile"
            >
              <div className="flex items-center gap-3">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-slate-500 group-hover:text-neon-red transition-colors">
                  <path d="M24 11.5c0-1.65-1.35-3-3-3-.96 0-1.86.48-2.42 1.24-1.64-1-3.85-1.68-6.28-1.78l1.3-4.1 4.2.9c.04.94.8 1.7 1.76 1.7 1.05 0 1.9-.85 1.9-1.9S18.65 3 17.6 3c-.9 0-1.66.63-1.84 1.47l-4.75-1.02c-.22-.05-.44.08-.5.3l-1.57 4.96c-2.48.06-4.73.74-6.38 1.77-.56-.75-1.45-1.22-2.4-1.22-1.65 0-3 1.35-3 3 0 1.12.63 2.1 1.56 2.62-.06.29-.1.59-.1.88 0 3.86 4.7 7 10.5 7s10.5-3.14 10.5-7c0-.3-.04-.59-.1-.88.93-.52 1.56-1.5 1.56-2.62zM7.5 14c-.83 0-1.5-.67-1.5-1.5S6.67 11 7.5 11s1.5.67 1.5 1.5S8.33 14 7.5 14zm9.3 2.92c-1.8 1.8-5.8 1.8-7.6 0-.2-.2-.2-.5 0-.7.2-.2.5-.2.7 0 1.4 1.4 4.8 1.4 6.2 0 .2-.2.5-.2.7 0 .2.2.2.5 0 .7zm-.3-2.92c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                </svg>
                <span className="font-mono text-xs sm:text-sm">u/Emergency-Shine-2656</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-neon-red group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-12 border-t border-slate-100 text-slate-500 text-xs font-mono">
          <p>© {new Date().getFullYear()} nishant.systems. All rights reserved.</p>
          <div className="flex items-center gap-1.5 mt-4 sm:mt-0">
            <span>Built by Nishant with</span>
            <Heart className="w-3 h-3 text-neon-pink-text animate-pulse" />
            <span>&amp; too little sleep.</span>
          </div>
        </div>
      </div>

      {/* Floating Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 p-3 rounded-full bg-white/80 backdrop-blur border border-neon-purple/40 text-neon-purple hover:bg-neon-purple hover:text-white shadow-lg transition-all duration-300 glow-purple z-50 hover:scale-105 active:scale-95 cursor-pointer"
            title="Scroll to Top"
            aria-label="Scroll to top of the page"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
