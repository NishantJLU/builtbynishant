import { 
  Cpu, 
  Gamepad2, 
  Brain, 
  Database,
  BookOpen,
  FileCode,
  Briefcase,
  Settings,
  Smartphone,
  Heart,
  LucideIcon
} from "lucide-react";

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tech: string[];
  github: string;
  icon: LucideIcon;
  glowClass: string;
  moduleCode: string;
  version: string;
  memory: string;
  load: string;
  color: string;
}

export const projectsData: Project[] = [
  {
    id: "ai-lms",
    title: "AI-LMS",
    description: "An AI-powered Learning Management System that customizes learning pathways, auto-evaluates submissions, and acts as an intelligent teaching assistant in real-time.",
    category: "AI & Education",
    tech: ["Next.js 15", "TypeScript", "PostgreSQL", "OpenAI"],
    github: "https://github.com/NishantJLU/AI-LMS",
    icon: Database,
    glowClass: "group-hover:border-neon-cyan/40 group-hover:shadow-[0_0_25px_rgba(0,240,255,0.15)]",
    moduleCode: "MOD_AI_EDU",
    version: "v1.2.0",
    memory: "18.4 MB",
    load: "15%",
    color: "#00b4d8"
  },
  {
    id: "unity-mcp",
    title: "Unity-MCP",
    description: "An agentic bridge connecting Large Language Models directly to the Unity game engine. Facilitates real-time game world manipulation and entity behaviors using the Model Context Protocol (MCP) and WebSockets.",
    category: "Game Engine & AI Agents",
    tech: ["Unity", "C#", "MCP", "WebSockets", "Node.js"],
    github: "https://github.com/NishantJLU/unity-mcp",
    icon: Cpu,
    glowClass: "group-hover:border-neon-purple/40 group-hover:shadow-[0_0_25px_rgba(189,0,255,0.15)]",
    moduleCode: "MOD_GAM_AGT",
    version: "v0.8.2",
    memory: "32.1 MB",
    load: "45%",
    color: "#7209b7"
  },
  {
    id: "ai-memory-layer",
    title: "ai-memory-layer",
    description: "A specialized, persistent long-term memory layer for AI systems. Utilizes context summarization, semantic networks, and vectors to give agents memory continuity.",
    category: "AI Systems Engineering",
    tech: ["Python", "Semantic Net", "Vector DB", "Embeddings"],
    github: "https://github.com/NishantJLU/ai-memory-layer",
    icon: Brain,
    glowClass: "group-hover:border-neon-emerald/40 group-hover:shadow-[0_0_25px_rgba(0,255,102,0.15)]",
    moduleCode: "MOD_MEM_SYS",
    version: "v2.0.4",
    memory: "9.2 MB",
    load: "8%",
    color: "#10b981"
  },
  {
    id: "basic-game",
    title: "Basic-game",
    description: "A fast-paced browser-based game engine engineered entirely in pure TypeScript. Focuses on entity collision mechanics, physics simulations, and low-latency rendering loops.",
    category: "Web Graphics & Game Dev",
    tech: ["TypeScript", "HTML5 Canvas", "Game Loop", "Web Audio API"],
    github: "https://github.com/NishantJLU/Basic-game",
    icon: Gamepad2,
    glowClass: "group-hover:border-neon-pink/40 group-hover:shadow-[0_0_25px_rgba(247,37,133,0.15)]",
    moduleCode: "MOD_WEB_GRPH",
    version: "v1.0.5",
    memory: "4.8 MB",
    load: "22%",
    color: "#f72585"
  },
  {
    id: "canvas-lms",
    title: "canvas-lms",
    description: "A high-fidelity Canvas LMS clone featuring 5 pre-configured courses (Mathematics, Python, Psychology, Robotics, Design Thinking) built using React, Vite, and Vanilla CSS.",
    category: "Web Dev & LMS",
    tech: ["React", "Vite", "Vanilla CSS", "JavaScript"],
    github: "https://github.com/NishantJLU/canvas-lms",
    icon: BookOpen,
    glowClass: "group-hover:border-neon-cyan/40 group-hover:shadow-[0_0_25px_rgba(0,240,255,0.15)]",
    moduleCode: "MOD_WEB_LMS",
    version: "v1.0.0",
    memory: "12.5 MB",
    load: "10%",
    color: "#00b4d8"
  },
  {
    id: "file-converter",
    title: "File-Converter",
    description: "A sleek, high-performance file conversion utility designed to transform files across various formats with speed and structural integrity.",
    category: "Developer Utilities",
    tech: ["TypeScript", "Node.js", "File APIs"],
    github: "https://github.com/NishantJLU/File-Converter",
    icon: FileCode,
    glowClass: "group-hover:border-neon-purple/40 group-hover:shadow-[0_0_25px_rgba(189,0,255,0.15)]",
    moduleCode: "MOD_FILE_CONV",
    version: "v1.1.0",
    memory: "6.4 MB",
    load: "18%",
    color: "#7209b7"
  },
  {
    id: "placement-tracker",
    title: "placement-tracker",
    description: "An AI-powered campus placement readiness tracker for university students to assess skills, schedule mock runs, and track recruitment phases.",
    category: "AI & Career Prep",
    tech: ["HTML5", "CSS3", "JavaScript", "AI Integration"],
    github: "https://github.com/NishantJLU/placement-tracker",
    icon: Briefcase,
    glowClass: "group-hover:border-neon-emerald/40 group-hover:shadow-[0_0_25px_rgba(0,255,102,0.15)]",
    moduleCode: "MOD_PLC_TRK",
    version: "v1.0.2",
    memory: "5.1 MB",
    load: "12%",
    color: "#10b981"
  },
  {
    id: "universal-ai-memory-layer",
    title: "Universal-AI-Memory-Layer",
    description: "A cross-platform, highly portable AI memory layer system that extends long-term semantic storage across multi-agent networks and workspaces.",
    category: "AI Systems Engineering",
    tech: ["TypeScript", "MCP", "Vector DB", "Embeddings"],
    github: "https://github.com/NishantJLU/Universal-AI-Memory-Layer",
    icon: Brain,
    glowClass: "group-hover:border-neon-pink/40 group-hover:shadow-[0_0_25px_rgba(247,37,133,0.15)]",
    moduleCode: "MOD_UNIV_MEM",
    version: "v0.5.1",
    memory: "14.7 MB",
    load: "30%",
    color: "#f72585"
  },
  {
    id: "windows-optimizer",
    title: "Windows-Optimizer",
    description: "A modular Windows 10/11 optimization, setup, and privacy utility written in PowerShell. Automates bloatware removal, telemetry disabling, performance tweaks, and software installations via Winget.",
    category: "OS Utility & Scripting",
    tech: ["PowerShell", "Registry Tweaks", "Winget", "JSON Config"],
    github: "https://github.com/NishantJLU/Windows-Optimizer",
    icon: Settings,
    glowClass: "group-hover:border-neon-cyan/40 group-hover:shadow-[0_0_25px_rgba(0,240,255,0.15)]",
    moduleCode: "MOD_OS_OPT",
    version: "v2.1.0",
    memory: "7.2 MB",
    load: "5%",
    color: "#00b4d8"
  },
  {
    id: "facebook-clone",
    title: "facebook-clone",
    description: "A full-scale native-looking Facebook mobile application UI clone engineered in Python using Flet. Features fully functioning stories with progress bars, reaction panels, a video Watch list, and Material 3 design.",
    category: "Mobile UI & Python",
    tech: ["Python", "Flet", "Flutter API", "JSON Database"],
    github: "https://github.com/NishantJLU/facebook-clone",
    icon: Smartphone,
    glowClass: "group-hover:border-neon-purple/40 group-hover:shadow-[0_0_25px_rgba(189,0,255,0.15)]",
    moduleCode: "MOD_MOB_CLON",
    version: "v1.0.0",
    memory: "21.6 MB",
    load: "18%",
    color: "#7209b7"
  },
  {
    id: "heart-ml-optimizer",
    title: "Heart ML Optimizer",
    description: "An ML diagnostics framework comparing baseline model predictions with bio-inspired feature-selection meta-heuristics (GA, HHO, SMA, AO) and a custom Dynamic Hybrid Weighted Feature Selection Optimizer on UCI datasets.",
    category: "Machine Learning & Optimization",
    tech: ["Python", "Scikit-Learn", "Bio-inspired Opt", "SHAP"],
    github: "https://github.com/NishantJLU/heart",
    icon: Heart,
    glowClass: "group-hover:border-neon-pink/40 group-hover:shadow-[0_0_25px_rgba(247,37,133,0.15)]",
    moduleCode: "MOD_ML_FS",
    version: "v1.4.0",
    memory: "45.8 MB",
    load: "62%",
    color: "#f72585"
  },
];

export const skillsData = {
  frontend: ["React", "Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
  backend: ["Node.js", "Express", ".NET Core", "Firebase", "Docker", "GitHub Actions"],
  languages: ["TypeScript", "JavaScript", "C#", "Python", "C++"],
  dataAi: ["PostgreSQL", "Prisma", "MongoDB", "OpenAI API", "LangChain", "MCP"],
  creative: ["Unity", "Blender", "UI/UX Design"]
};

export interface TerminalLogLine {
  text: string;
  type: "input" | "output" | "error" | "success" | "system";
}

export const terminalInitLines: TerminalLogLine[] = [
  { text: "Nishant OS [Version 2.0.26]", type: "system" },
  { text: "Initializing quantum security handshakes... [OK]", type: "system" },
  { text: "Type 'help' to view available system commands.", type: "output" },
];

export const terminalCommands = {
  help: [
    { text: "Available Commands:", type: "output" as const },
    { text: "  help    - Display this help directory", type: "output" as const },
    { text: "  sysinfo - Show system specifications & diagnostic meters", type: "output" as const },
    { text: "  clear   - Clear output history buffer", type: "output" as const },
    { text: "  reddit  - Query Nishant's Reddit profile logs (u/Emergency-Shine-2656)", type: "output" as const },
    { text: "  secret  - Unlock secure core databases [RESTRICTED]", type: "output" as const },
    { text: "  about   - Load biographical summary logs", type: "output" as const },
    { text: "  contact - Retrieve communications directory", type: "output" as const }
  ],
  sysinfo: [
    { text: "=====================================================", type: "system" as const },
    { text: "NishantOS v2.0.26 (Compiled: May 2026)", type: "output" as const },
    { text: "Processor:  AI-Co-engineered Virtual Node", type: "output" as const },
    { text: "Location:   Bhopal, MP, India (23.25° N, 77.41° E)", type: "output" as const },
    { text: "Core Sync:  Active [Connection Rate: 100%]", type: "output" as const },
    { text: "Memory:     16GB Unified AI Layer Buffer", type: "output" as const },
    { text: "Latency:    12ms to Bhopal Core Grid", type: "output" as const },
    { text: "-----------------------------------------------------", type: "output" as const },
    { text: "SYS_HEALTH: [■■■■■■■■■■■■■■■■■■■■] 100% (STABLE)", type: "success" as const },
    { text: "COGNITIVE:  [■■■■■■■■■■■■■■■■■■■□] 95% (HIGH_SYNC)", type: "success" as const },
    { text: "SLEEP:      [■□□□□□□□□□□□□□□□□□□□] 5% (CRITICAL)", type: "error" as const },
    { text: "=====================================================", type: "system" as const }
  ],
  reddit: [
    { text: "Querying Reddit logs for u/Emergency-Shine-2656...", type: "system" as const },
    { text: "[DATABASE RETRIEVAL SUCCESSFULLY RESOLVED]", type: "success" as const },
    { text: "--------------------------------------------------------", type: "output" as const },
    { text: "Subreddit Activity: r/LocalLLaMA, r/reactjs, r/Unity3D, r/selfhosted", type: "output" as const },
    { text: "Reddit Profile Link: https://www.reddit.com/user/Emergency-Shine-2656/", type: "output" as const },
    { text: "Reddit Joke: Why do programmers wear glasses? Because they can't C#!", type: "success" as const },
    { text: "--------------------------------------------------------", type: "output" as const }
  ],
  secret: [
    { text: "WARNING: ACCESSING LEVEL 5 CLASSIFIED SYSTEMS", type: "error" as const },
    { text: "Intrusion counter-measures disabled. Re-routing through भोपाल proxies...", type: "system" as const },
    { text: "Starting decryption matrix...", type: "system" as const }
  ],
  about: [
    { text: "Name: Nishant Singh", type: "output" as const },
    { text: "Specialty: Full-Stack Developer & AI Systems Engineer", type: "output" as const },
    { text: "Status: Pursuing BTech. Sleeping is optional, compilation is mandatory.", type: "output" as const },
    { text: "Bio: Engineering real-time engines, agentic bridges, and microservices.", type: "output" as const }
  ],
  contact: [
    { text: "Communications Directory:", type: "output" as const },
    { text: "  Email:    contact@nishant.systems (Simulated)", type: "output" as const },
    { text: "  GitHub:   https://github.com/NishantJLU", type: "output" as const },
    { text: "  LinkedIn: https://www.linkedin.com/in/nishantsingh-dev/", type: "output" as const },
    { text: "  Reddit:   https://www.reddit.com/user/Emergency-Shine-2656/", type: "output" as const }
  ]
};
