"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, Cpu, User, Layers, Send, Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", href: "#home", icon: Cpu },
  { name: "Skills", href: "#about", icon: Layers },
  { name: "Projects", href: "#projects", icon: User },
  { name: "Terminal", href: "#terminal", icon: TerminalIcon },
  { name: "Contact", href: "#contact", icon: Send },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active section detection
      const sections = navItems.map(item => item.href.substring(1));
      let currentSection = "home";

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            currentSection = section;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const offset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveSection(targetId);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 md:p-6 transition-all duration-300">
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`w-full max-w-5xl rounded-full glass-panel px-6 py-3 flex items-center justify-between border border-slate-100 transition-all duration-300 ${
          scrolled 
            ? "bg-white/80 shadow-[0_10px_30px_rgba(0,180,216,0.05)] border-neon-cyan/25" 
            : "bg-white/40"
        }`}
      >
        {/* Logo / Brand */}
        <a 
          href="#home" 
          onClick={(e) => handleNavClick(e, "#home")}
          className="flex items-center gap-2 group"
          aria-label="nishant.systems home page"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-neon-cyan to-neon-purple flex items-center justify-center p-[1px] group-hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
              <span className="text-sm font-bold text-neon-cyan-text group-hover:text-neon-purple transition-colors">NS</span>
            </div>
          </div>
          <span className="font-mono text-sm tracking-wider font-semibold text-slate-800 group-hover:text-neon-cyan-text transition-colors hidden sm:inline-block">
            nishant.systems
          </span>
        </a>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 flex items-center gap-1.5 hover:text-slate-900 ${
                  isActive ? "text-neon-cyan-text font-semibold" : "text-slate-500"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavBackground"
                    className="absolute inset-0 bg-gradient-to-r from-neon-cyan/10 to-neon-purple/10 rounded-full border border-neon-cyan/25 glow-cyan"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-neon-cyan-text" : "text-slate-500"}`} />
                {item.name}
              </a>
            );
          })}
        </div>


        {/* CTA Button */}
        <a
          href="#terminal"
          onClick={(e) => handleNavClick(e, "#terminal")}
          className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-purple/40 bg-neon-purple/5 text-xs font-mono text-neon-purple hover:bg-neon-purple hover:text-white transition-all duration-300 glow-purple hover:scale-105 active:scale-95"
          aria-label="Open systems shell terminal"
        >
          <TerminalIcon className="w-3.5 h-3.5" />
          <span>Launch Shell</span>
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-neon-cyan-text" /> : <Menu className="w-5 h-5" />}
        </button>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 left-4 right-4 p-4 rounded-3xl glass-panel border border-neon-cyan/25 bg-white/95 md:hidden flex flex-col gap-2 z-50 shadow-2xl"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 text-sm font-medium transition-all ${
                    isActive 
                      ? "bg-gradient-to-r from-neon-cyan/10 to-neon-purple/5 text-neon-cyan-text border-l-2 border-neon-cyan font-semibold" 
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </a>
              );
            })}
            <a
              href="#terminal"
              onClick={(e) => handleNavClick(e, "#terminal")}
              className="w-full mt-2 py-3 rounded-xl bg-neon-cyan/10 hover:bg-neon-cyan text-neon-cyan-text hover:text-page-bg text-center font-mono text-xs border border-neon-cyan/30 transition-all font-bold flex items-center justify-center gap-2"
              aria-label="Open systems shell terminal"
            >
              <TerminalIcon className="w-4 h-4" />
              <span>Launch Terminal</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
