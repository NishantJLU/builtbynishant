"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { projectsData, Project } from "@/config/site";

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

// Looping Oscilloscope SVG trace (optimized to use hardware-accelerated CSS translations instead of path morphing)
function DataWave({ color = "#00b4d8" }: { color?: string }) {
  return (
    <div className="w-16 h-5 overflow-hidden opacity-60 select-none pointer-events-none relative">
      <svg viewBox="0 0 200 20" className="w-[200%] h-full absolute left-0 top-0 animate-wave-slide">
        <path
          d="M 0 10 Q 12.5 2, 25 10 T 50 10 T 75 10 T 100 10 T 125 10 T 150 10 T 175 10 T 200 10"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}

// 3D Tilt Project Card Component with dynamic mouse-following glow
function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const Icon = project.icon;

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 120, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 120, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
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
    setIsHovered(false);
  };

  // Helper to convert hex to rgba
  const hexToRgba = (hex: string, alpha: number) => {
    try {
      const cleanHex = hex.replace("#", "");
      const r = parseInt(cleanHex.slice(0, 2), 16);
      const g = parseInt(cleanHex.slice(2, 4), 16);
      const b = parseInt(cleanHex.slice(4, 6), 16);
      return `rgba(${isNaN(r) ? 0 : r}, ${isNaN(g) ? 180 : g}, ${isNaN(b) ? 216 : b}, ${alpha})`;
    } catch {
      return `rgba(0, 180, 216, ${alpha})`;
    }
  };

  // Maps hex colors to corresponding Tailwind theme classes
  const themeClasses: Record<string, { text: string; bg: string; border: string; glow: string }> = {
    "#00b4d8": {
      text: "text-neon-cyan-text",
      bg: "bg-neon-cyan/5",
      border: "border-neon-cyan/10",
      glow: "from-neon-cyan/20 to-transparent"
    },
    "#7209b7": {
      text: "text-neon-purple",
      bg: "bg-neon-purple/5",
      border: "border-neon-purple/10",
      glow: "from-neon-purple/20 to-transparent"
    },
    "#10b981": {
      text: "text-neon-emerald-text",
      bg: "bg-neon-emerald/5",
      border: "border-neon-emerald/10",
      glow: "from-neon-emerald/20 to-transparent"
    },
    "#f72585": {
      text: "text-neon-pink-text",
      bg: "bg-neon-pink/5",
      border: "border-neon-pink/10",
      glow: "from-neon-pink/20 to-transparent"
    }
  };

  const theme = themeClasses[project.color.toLowerCase()] || {
    text: "text-neon-cyan-text",
    bg: "bg-neon-cyan/5",
    border: "border-neon-cyan/10",
    glow: "from-neon-cyan/20 to-transparent"
  };

  const gradientBg = useTransform(
    [mouseXSpring, mouseYSpring],
    ([mx, my]) => {
      const px = (mx as number) * 100 + 50;
      const py = (my as number) * 100 + 50;
      return `radial-gradient(220px circle at ${px}% ${py}%, ${hexToRgba(project.color, 0.1)}, transparent 80%)`;
    }
  );

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative h-full"
    >
      {/* Background glow card */}
      <div className={`absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm bg-gradient-to-r ${theme.glow}`} />

      {/* Main Card */}
      <div className={`glass-panel p-6 rounded-3xl flex flex-col justify-between h-full min-h-[340px] border border-slate-100 relative bg-white/75 transition-all duration-300 group-hover:-translate-y-1.5 ${project.glowClass}`}>
        
        {/* Dynamic Glow Layer */}
        <motion.div 
          className={`absolute -inset-px opacity-0 transition-opacity duration-300 ${isHovered ? "opacity-100" : ""} pointer-events-none rounded-3xl`}
          style={{ background: gradientBg }}
        />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-2xl bg-slate-50 border border-slate-100 ${theme.text} ${theme.bg} ${theme.border}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[9px] font-mono tracking-wider text-slate-400 block uppercase">
                  [{project.moduleCode} {"//"} {project.version}]
                </span>
                <h4 className="text-xl font-bold text-slate-900 tracking-wide">
                  {project.title}
                </h4>
              </div>
            </div>

            {/* Links */}
            <div className="flex gap-2">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
                title={`View Source of ${project.title} on GitHub`}
                aria-label={`View Source of ${project.title} on GitHub`}
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Diagnostics Metrics Panel */}
          <div className="flex gap-4 mb-4 font-mono text-[9px] text-slate-400 border-b border-slate-100 pb-3">
            <div>
              <span>SYS_LOAD: </span>
              <span className="text-slate-700 font-semibold">{project.load}</span>
            </div>
            <div>
              <span>ALLOC_MEM: </span>
              <span className="text-slate-700 font-semibold">{project.memory}</span>
            </div>
            <div className="flex items-center gap-1 ml-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-emerald animate-pulse" />
              <span className="text-neon-emerald-text text-[8px] font-bold">ACTIVE</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-600 text-sm font-light leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Mini Wave Output */}
          <div className="flex items-center justify-between bg-slate-50/50 border border-slate-100/60 p-2.5 rounded-2xl mb-6">
            <span className="font-mono text-[8px] text-slate-400">DATA_STREAM_OUTPUT</span>
            <DataWave color={project.color} />
          </div>
        </div>

        {/* Footer (Tech Tags & Progress Loader) */}
        <div className="relative z-10">
          <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100">
            {project.tech.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded bg-slate-50 border border-slate-100 text-[10px] font-mono text-slate-600 transition-colors duration-200 group-hover:border-neon-cyan/25 group-hover:text-slate-900"
              >
                {tag}
              </span>
            ))}
          </div>
          {/* Hover progress bar */}
          <div className="w-full bg-slate-100 h-0.5 rounded overflow-hidden mt-3 relative">
            <div 
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-neon-cyan to-neon-purple w-1/4 group-hover:w-full transition-all duration-500 ease-out"
              style={{
                background: `linear-gradient(90deg, ${project.color}, #7209b7)`
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  return (
    <section id="projects" className="py-24 px-4 max-w-5xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="w-full"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="mb-12 text-center md:text-left">
          <h2 className="text-xs font-mono tracking-widest text-neon-purple mb-2 uppercase">
            {"// SELECTED_ENGINES"}
          </h2>
          <h3 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Featured Projects
          </h3>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project: Project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
