"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { 
  Code2, 
  Server, 
  BrainCircuit, 
  Terminal, 
  Compass, 
  MapPin 
} from "lucide-react";
import { skillsData } from "@/config/site";

// --- TELEMETRY WIDGETS ---

// 1. Canvas-based Vector Radar
function RadarWidget() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let animationFrameId: number;
    let angle = 0;
    
    const size = 90;
    canvas.width = size * window.devicePixelRatio;
    canvas.height = size * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    
    const targets = [
      { x: 22, y: -18, label: "JLU_NODE" },
      { x: -28, y: 22, label: "LCL_HOST" },
      { x: 8, y: 28, label: "AI_SYNC" }
    ];
    
    const render = () => {
      ctx.clearRect(0, 0, size, size);
      const cx = size / 2;
      const cy = size / 2;
      const r = size / 2 - 4;
      
      // Radar rings
      ctx.strokeStyle = "rgba(0, 180, 216, 0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, cy, r * 0.66, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, cy, r * 0.33, 0, Math.PI * 2); ctx.stroke();
      
      // Axes
      ctx.beginPath(); ctx.moveTo(cx - r, cy); ctx.lineTo(cx + r, cy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx, cy - r); ctx.lineTo(cx, cy + r); ctx.stroke();
      
      // Conic beam sweep
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      const grad = ctx.createConicGradient(0, 0, 0);
      grad.addColorStop(0, "rgba(0, 180, 216, 0.22)");
      grad.addColorStop(0.2, "rgba(0, 180, 216, 0.05)");
      grad.addColorStop(0.5, "transparent");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      
      // Draw targets
      targets.forEach(t => {
        const targetAngle = Math.atan2(t.y, t.x);
        const normalizedAngle = (angle + Math.PI * 2) % (Math.PI * 2);
        const normalizedTargetAngle = (targetAngle + Math.PI * 2) % (Math.PI * 2);
        const diff = Math.abs(normalizedAngle - normalizedTargetAngle);
        
        let opacity = 0.1;
        if (diff < 0.15) opacity = 1.0;
        else if (diff < 0.6) opacity = 1.0 - (diff / 0.6) * 0.9;
        
        const tx = cx + t.x;
        const ty = cy + t.y;
        
        ctx.fillStyle = `rgba(114, 9, 183, ${opacity})`;
        ctx.beginPath();
        ctx.arc(tx, ty, 2.5, 0, Math.PI * 2);
        ctx.fill();
        
        if (opacity > 0.4) {
          ctx.strokeStyle = `rgba(114, 9, 183, ${opacity * 0.4})`;
          ctx.beginPath();
          ctx.arc(tx, ty, 5, 0, Math.PI * 2);
          ctx.stroke();
          
          ctx.fillStyle = `rgba(15, 23, 42, ${opacity * 0.8})`;
          ctx.font = "5px monospace";
          ctx.fillText(t.label, tx + 6, ty + 2);
        }
      });
      
      angle = (angle + 0.02) % (Math.PI * 2);
      animationFrameId = requestAnimationFrame(render);
    };
    
    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);
  
  return <canvas ref={canvasRef} style={{ width: 90, height: 90 }} className="opacity-90" />;
}

// 2. Live System Clock (Ticking Milliseconds)
function LiveClockWidget() {
  const [time, setTime] = useState("");
  
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      const ss = String(now.getSeconds()).padStart(2, '0');
      const ms = String(now.getMilliseconds()).padStart(3, '0').substring(0, 3);
      setTime(`${hh}:${mm}:${ss}.${ms}`);
    };
    
    const timer = setInterval(update, 33);
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="font-mono text-[9px] text-neon-cyan-text bg-neon-cyan/5 border border-neon-cyan/15 rounded-md px-2 py-0.5 glow-cyan select-none pointer-events-none">
      SYS_TIME: {time}
    </div>
  );
}

// 3. Live Simulated Compiler Log Stream
const logTemplates = [
  "CHECK   eslint.config.mjs",
  "COMPILE src/components/Hero.tsx",
  "COMPILE src/components/BentoGrid.tsx",
  "BUNDLE  static/chunks/main.js",
  "LINK    Next.js routing table",
  "OPTIM   Tailwind CSS v4.0",
  "POSTCSS compiling variables",
  "RESOLVE dns.lookup -> localhost",
  "SUCCESS build completed (18ms)",
  "SYNC    mcp-bridge connection"
];

function CompilerFeedWidget() {
  const [logs, setLogs] = useState<string[]>([
    "READY   Development node initialized",
    "POLL    watching filesystem changes"
  ]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const randomLog = logTemplates[Math.floor(Math.random() * logTemplates.length)];
      const timestamp = new Date().toLocaleTimeString().split(' ')[0];
      setLogs(prev => [...prev.slice(-2), `[${timestamp}] ${randomLog}`]);
    }, 2500);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="w-full bg-[#080d16] border border-white/5 rounded-xl p-2.5 font-mono text-[8px] text-slate-400 flex flex-col gap-0.5 select-none overflow-hidden h-16 relative">
      <div className="absolute inset-0 scanlines opacity-5 pointer-events-none" />
      {logs.map((log, i) => (
        <div key={i} className={`truncate ${log.includes("SUCCESS") ? "text-neon-emerald" : log.includes("READY") ? "text-neon-cyan" : "text-slate-400"}`}>
          {log}
        </div>
      ))}
    </div>
  );
}

// 4. Canvas CPU Graph
function CpuGraphWidget() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const width = 120;
  const height = 40;
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let animationFrameId: number;
    
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    
    const points: number[] = Array(15).fill(20);
    let offset = 0;
    
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      points.shift();
      const baseVal = 20 + Math.sin(offset) * 8;
      const newVal = baseVal + (Math.random() - 0.5) * 4;
      points.push(Math.max(4, Math.min(height - 4, newVal)));
      
      // Grid lines
      ctx.strokeStyle = "rgba(16, 185, 129, 0.05)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < width; i += 20) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, height); ctx.stroke();
      }
      for (let j = 0; j < height; j += 10) {
        ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(width, j); ctx.stroke();
      }
      
      // Plot Line
      ctx.strokeStyle = "#10b981";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      
      const dx = width / (points.length - 1);
      ctx.moveTo(0, points[0]);
      
      for (let i = 1; i < points.length; i++) {
        const cx1 = (i - 1) * dx + dx / 2;
        const cy1 = points[i - 1];
        const cx2 = i * dx - dx / 2;
        const cy2 = points[i];
        ctx.bezierCurveTo(cx1, cy1, cx2, cy2, i * dx, points[i]);
      }
      ctx.stroke();
      
      // Fill
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, "rgba(16, 185, 129, 0.12)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fill();
      
      offset += 0.2;
      
      // Print reading text
      ctx.fillStyle = "#10b981";
      ctx.font = "7px monospace";
      const loadVal = Math.round(100 - (points[points.length - 1] / height) * 100);
      ctx.fillText(`CPU_LOAD: ${loadVal}%`, 4, 8);
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    let lastTime = 0;
    const fpsLimit = 30;
    const renderLimit = (time: number) => {
      const delta = time - lastTime;
      if (delta > 1000 / fpsLimit) {
        render();
        lastTime = time;
      } else {
        animationFrameId = requestAnimationFrame(renderLimit);
      }
    };
    
    animationFrameId = requestAnimationFrame(renderLimit);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);
  
  return <canvas ref={canvasRef} style={{ width, height }} className="opacity-90" />;
}

// 5. CSS 3D rotating Wireframe Cube
function RotatingCubeWidget() {
  return (
    <div className="w-12 h-12 flex items-center justify-center relative select-none pointer-events-none" style={{ perspective: "400px" }}>
      <div 
        className="w-6 h-6 relative animate-[spin_8s_linear_infinite]"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute inset-0 border border-neon-emerald/60 bg-neon-emerald/5" style={{ transform: "rotateY(0deg) translateZ(12px)" }} />
        <div className="absolute inset-0 border border-neon-emerald/60 bg-neon-emerald/5" style={{ transform: "rotateY(90deg) translateZ(12px)" }} />
        <div className="absolute inset-0 border border-neon-emerald/60 bg-neon-emerald/5" style={{ transform: "rotateY(180deg) translateZ(12px)" }} />
        <div className="absolute inset-0 border border-neon-emerald/60 bg-neon-emerald/5" style={{ transform: "rotateY(270deg) translateZ(12px)" }} />
        <div className="absolute inset-0 border border-neon-emerald/60 bg-neon-emerald/5" style={{ transform: "rotateX(90deg) translateZ(12px)" }} />
        <div className="absolute inset-0 border border-neon-emerald/60 bg-neon-emerald/5" style={{ transform: "rotateX(-90deg) translateZ(12px)" }} />
      </div>
    </div>
  );
}

// --- BENTO GRID SYSTEM ---

// Interactive 3D Tilt Card Component
function BentoCard({
  children,
  className = "",
  glowColor = "cyan"
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: "cyan" | "purple" | "emerald" | "red";
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 120, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 120, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-6, 6]);

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

  const glowStyles = {
    cyan: "hover:border-neon-cyan/40 hover:shadow-[0_0_30px_rgba(0,240,255,0.12)]",
    purple: "hover:border-neon-purple/40 hover:shadow-[0_0_30px_rgba(189,0,255,0.12)]",
    emerald: "hover:border-neon-emerald/40 hover:shadow-[0_0_30px_rgba(0,255,102,0.12)]",
    red: "hover:border-neon-red/40 hover:shadow-[0_0_30px_rgba(255,0,85,0.12)]"
  };

  const glowColorMap = {
    cyan: "rgba(0, 180, 216, 0.12)",
    purple: "rgba(114, 9, 183, 0.12)",
    emerald: "rgba(16, 185, 129, 0.12)",
    red: "rgba(247, 37, 133, 0.12)"
  };

  // Build GPU accelerated background radial gradient glow following the cursor coordinates
  const gradientBg = useTransform(
    [mouseXSpring, mouseYSpring],
    ([mx, my]) => {
      const px = (mx as number) * 100 + 50;
      const py = (my as number) * 100 + 50;
      return `radial-gradient(200px circle at ${px}% ${py}%, ${glowColorMap[glowColor]}, transparent 80%)`;
    }
  );

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`glass-panel p-6 rounded-3xl relative overflow-hidden transition-all duration-300 ${glowStyles[glowColor]} ${className}`}
    >
      {/* Background ambient lighting */}
      <motion.div 
        className={`absolute -inset-px opacity-0 transition-opacity duration-300 ${isHovered ? "opacity-100" : ""} pointer-events-none rounded-3xl`}
        style={{
          background: gradientBg
        }}
      />
      <div style={{ transform: "translateZ(10px)" }} className="h-full flex flex-col justify-between relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

export default function BentoGrid() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  return (
    <section id="about" className="py-24 px-4 max-w-5xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="w-full"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="mb-12 text-center md:text-left">
          <h2 className="text-xs font-mono tracking-widest text-neon-cyan-text mb-2 uppercase">
            {"// STACK_AND_BACKGROUND"}
          </h2>
          <h3 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Systems & Specialties
          </h3>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Identity & Location */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <BentoCard glowColor="cyan" className="h-[280px]">
              <div className="flex justify-between items-start">
                <div className="p-2 rounded-xl bg-neon-cyan/10 border border-neon-cyan/20">
                  <MapPin className="w-5 h-5 text-neon-cyan-text" />
                </div>
                <span className="font-mono text-[10px] text-slate-500">LOC: 23.2599° N, 77.4126° E</span>
              </div>
              <div className="my-2.5 flex justify-center items-center h-[90px]">
                <RadarWidget />
              </div>
              <div className="mt-auto">
                <p className="text-slate-500 font-mono text-[11px] mb-1">CURRENT_LOCATION</p>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Bhopal, India</h4>
                <p className="text-slate-600 text-xs leading-relaxed font-light">
                  Studying BTech (Computer Science) at Jagran Lakecity University, architecting AI frameworks from Central India.
                </p>
              </div>
            </BentoCard>
          </motion.div>

          {/* Card 2: Frontend stack (Large Card) */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <BentoCard glowColor="cyan" className="h-[280px]">
              <div className="flex justify-between items-center">
                <div className="p-2 rounded-xl bg-neon-cyan/10 border border-neon-cyan/20">
                  <Code2 className="w-5 h-5 text-neon-cyan-text" />
                </div>
                <div className="flex items-center gap-3">
                  <LiveClockWidget />
                  <span className="font-mono text-[10px] text-slate-500">SKILL_MODULE: FRONTEND</span>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="text-2xl font-black text-slate-900 mb-2">User Interface Engineering</h4>
                <p className="text-slate-600 text-xs font-light mb-6 leading-relaxed">
                  Crafting highly immersive, fluid, and responsive user experiences utilizing cutting-edge web layers.
                </p>
                {/* Tech tags */}
                <div className="flex flex-wrap gap-2">
                  {skillsData.frontend.map((tech) => (
                    <span 
                      key={tech} 
                      className="px-3 py-1 rounded-full border border-slate-100 bg-slate-50 text-[11px] font-mono text-slate-600 hover:border-neon-cyan/30 hover:text-neon-cyan-text transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </BentoCard>
          </motion.div>

          {/* Card 3: Backend Stack */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <BentoCard glowColor="purple" className="h-[280px]">
              <div className="flex justify-between items-start">
                <div className="p-2 rounded-xl bg-neon-purple/10 border border-neon-purple/20">
                  <Server className="w-5 h-5 text-neon-purple" />
                </div>
                <div className="flex gap-2.5 items-center font-mono text-[9px] text-slate-400">
                  <span>API_GATEWAY</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-emerald animate-ping" />
                  <span className="text-neon-emerald-text font-bold">ONLINE (8ms)</span>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="text-2xl font-black text-slate-900 mb-2">Infrastructure & Engines</h4>
                <p className="text-slate-600 text-xs font-light mb-6 leading-relaxed">
                  Architecting scalable APIs, real-time message routers, containerized workspaces, and automated workflows.
                </p>
                <div className="flex flex-wrap gap-2">
                  {skillsData.backend.map((tech) => (
                    <span 
                      key={tech} 
                      className="px-3 py-1 rounded-full border border-slate-100 bg-slate-50 text-[11px] font-mono text-slate-600 hover:border-neon-purple/30 hover:text-neon-purple transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </BentoCard>
          </motion.div>

          {/* Card 4: Languages */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <BentoCard glowColor="purple" className="h-[280px]">
              <div className="flex justify-between items-start mb-2">
                <div className="p-2 rounded-xl bg-neon-purple/10 border border-neon-purple/20">
                  <Terminal className="w-5 h-5 text-neon-purple" />
                </div>
                <span className="font-mono text-[10px] text-slate-500">SKILL_MODULE: COMPILERS</span>
              </div>
              <CompilerFeedWidget />
              <div className="mt-auto">
                <p className="text-slate-500 font-mono text-[11px] mb-1">CORE_LANGUAGES</p>
                <h4 className="text-xl font-bold text-slate-900 mb-4">Code Languages</h4>
                <div className="flex flex-wrap gap-1.5">
                  {skillsData.languages.map((lang) => (
                    <span 
                      key={lang} 
                      className="px-2 py-0.5 rounded border border-slate-100 bg-slate-50 text-[10px] font-mono text-slate-600"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </BentoCard>
          </motion.div>

          {/* Card 5: Data & AI (Large Card) */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <BentoCard glowColor="emerald" className="h-[280px]">
              <div className="flex justify-between items-start">
                <div className="p-2 rounded-xl bg-neon-emerald/10 border border-neon-emerald/20">
                  <BrainCircuit className="w-5 h-5 text-neon-emerald-text" />
                </div>
                <span className="font-mono text-[10px] text-slate-500">SKILL_MODULE: AI_DATA</span>
              </div>
              <div className="mt-4 flex flex-col md:flex-row justify-between gap-6">
                <div className="flex-1">
                  <h4 className="text-2xl font-black text-slate-900 mb-2">Cognitive & Data Architectures</h4>
                  <p className="text-slate-600 text-xs font-light mb-4 leading-relaxed">
                     Integrating large language models, developing specialized agentic memory layers, managing database queries, and leveraging MCP.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {skillsData.dataAi.map((tech) => (
                      <span 
                        key={tech} 
                        className="px-3 py-1 rounded-full border border-slate-100 bg-slate-50 text-[11px] font-mono text-slate-600 hover:border-neon-emerald/30 hover:text-neon-emerald-text transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center self-center border border-slate-200/80 bg-slate-50/70 p-3 rounded-2xl glow-emerald shrink-0 h-28 w-36">
                  <span className="font-mono text-[7px] text-slate-400 mb-1 uppercase tracking-wider block">AI_SYSTEM_LOAD</span>
                  <CpuGraphWidget />
                </div>
              </div>
            </BentoCard>
          </motion.div>

          {/* Card 6: Creative/Specialty */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <BentoCard glowColor="emerald" className="h-[280px]">
              <div className="flex justify-between items-start">
                <div className="p-2 rounded-xl bg-neon-emerald/10 border border-neon-emerald/20">
                  <Compass className="w-5 h-5 text-neon-emerald-text" />
                </div>
                <RotatingCubeWidget />
              </div>
              <div className="mt-auto">
                <p className="text-slate-500 font-mono text-[11px] mb-1">CREATIVE_DESIGN</p>
                <h4 className="text-xl font-bold text-slate-900 mb-3">Game & UX Design</h4>
                <p className="text-slate-600 text-xs leading-relaxed font-light mb-4">
                  Translating spatial ideas into logic through Unity and Blender, and optimizing visual psychology in Figma.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {skillsData.creative.map((creative) => (
                    <span 
                      key={creative} 
                      className="px-2.5 py-0.5 rounded-full border border-slate-100 bg-slate-50 text-[10px] font-mono text-slate-600"
                    >
                      {creative}
                    </span>
                  ))}
                </div>
              </div>
            </BentoCard>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
