"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TermIcon, ShieldAlert, X, Square, Minus } from "lucide-react";
import { 
  terminalInitLines, 
  terminalCommands, 
  TerminalLogLine 
} from "@/config/site";

export default function Terminal() {
  const [history, setHistory] = useState<TerminalLogLine[]>(terminalInitLines);
  const [inputVal, setInputVal] = useState("");
  const [isSecretActive, setIsSecretActive] = useState(false);
  const [matrixLines, setMatrixLines] = useState<string[]>([]);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [latency, setLatency] = useState(12);
  const logsContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isMountedRef = useRef(false);

  // Auto-scroll to bottom of terminal logs
  useEffect(() => {
    const container = logsContainerRef.current;
    if (container) {
      if (!isMountedRef.current) {
        container.scrollTop = container.scrollHeight;
        isMountedRef.current = true;
      } else {
        if (typeof container.scrollTo === "function") {
          container.scrollTo({
            top: container.scrollHeight,
            behavior: "smooth"
          });
        } else {
          container.scrollTop = container.scrollHeight;
        }
      }
    }
  }, [history, matrixLines]);

  // Matrix cascade effect generator
  useEffect(() => {
    if (!isSecretActive) return;

    const chars = "010101ABCDEFUXVYZ$%#@*&+=?";
    let count = 0;
    
    const interval = setInterval(() => {
      let line = "";
      for (let i = 0; i < 40; i++) {
        line += chars[Math.floor(Math.random() * chars.length)] + " ";
      }
      setMatrixLines(prev => [...prev.slice(-20), line]);
      count++;

      if (count > 25) {
        clearInterval(interval);
        setIsSecretActive(false);
        setMatrixLines([]);
        setHistory(prev => [
          ...prev,
          { text: ">> Executing quantum bypass protocols...", type: "system" },
          { text: "=====================================================", type: "success" },
          { text: " _   _ ___ ____ _   _  _   _   _ _____   ____ ___  ", type: "success" },
          { text: "| \\ | |_ _/ ___| | | |/ \\ | \\ | |_   _| / ___|_ _| ", type: "success" },
          { text: "|  \\| || |\\___ \\ |_| / _ \\|  \\| | | |   \\___ \\| |  ", type: "success" },
          { text: "| |\\  || | ___) |  _ / ___ \\ |\\  | | |    ___) | |  ", type: "success" },
          { text: "|_| \\_|___|____/|_| /_/   \\_\\_| \\_| |_|   |____/___| ", type: "success" },
          { text: "=====================================================", type: "success" },
          { text: "[DECRYPT SUCCESS]: Access granted to Nishant's core thoughts.", type: "success" },
          { text: "Easter Egg Unlocked! Gravity levels: 0G. Sleeping levels: 0.05%.", type: "success" },
          { text: "Systems running perfectly. Have a great day!", type: "success" }
        ]);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isSecretActive]);

  // Live dynamic network latency ping ticking
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(Math.random() * 8) + 8); // Randomize between 8ms and 16ms
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const command = inputVal.trim().toLowerCase();
    if (!command) return;

    const newHistory = [...history, { text: `guest@nishant.systems:~$ ${inputVal}`, type: "input" as const }];

    if (command === "clear") {
      setHistory([]);
    } else if (command === "secret") {
      setIsSecretActive(true);
      setHistory([
        ...newHistory,
        ...terminalCommands.secret
      ]);
    } else if (command in terminalCommands) {
      const responses = terminalCommands[command as keyof typeof terminalCommands];
      setHistory([
        ...newHistory,
        ...responses
      ]);
    } else {
      setHistory([
        ...newHistory,
        { text: `bash: command not found: ${command}. Type 'help' for options.`, type: "error" }
      ]);
    }

    setInputVal("");
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  if (isClosed) {
    return (
      <section id="terminal" className="py-24 px-4 max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-10 text-center">
          <h2 className="text-xs font-mono tracking-widest text-neon-emerald-text mb-2 uppercase">
            {"// INTERACTIVE_CORE"}
          </h2>
          <h3 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            AI Systems Terminal
          </h3>
          <p className="text-slate-500 text-sm mt-3 font-light max-w-md mx-auto leading-relaxed">
            Connection severed. Launch standard procedures to restore terminal link.
          </p>
        </div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setIsClosed(false)}
          className="w-full rounded-2xl border border-dashed border-slate-200 p-12 text-center cursor-pointer hover:border-neon-emerald/40 hover:bg-neon-emerald/5 transition-all duration-300 flex flex-col items-center justify-center gap-3 select-none"
        >
          <div className="p-4 rounded-full bg-slate-50 border border-slate-100 text-slate-400 group-hover:text-neon-emerald transition-colors">
            <TermIcon className="w-8 h-8 animate-pulse" />
          </div>
          <span className="font-mono text-xs text-slate-500">TERMINAL_NODE_DISCONNECTED [SYS_STATUS: OFFLINE]</span>
          <button 
            type="button"
            className="px-5 py-2 bg-neon-emerald/10 border border-neon-emerald/20 text-neon-emerald-text font-mono text-xs rounded-full hover:bg-neon-emerald hover:text-white transition-colors cursor-pointer font-bold"
            aria-label="Initialize system and establish terminal link"
          >
            {"initialize_sys() -> Establish connection"}
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <>
      {isMaximized && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setIsMaximized(false)}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 cursor-pointer"
        />
      )}
      
      <section id="terminal" className="py-24 px-4 max-w-4xl mx-auto">
        {/* Section Header */}
        {!isMaximized && (
          <div className="mb-10 text-center">
            <h2 className="text-xs font-mono tracking-widest text-neon-emerald-text mb-2 uppercase">
              {"// INTERACTIVE_CORE"}
            </h2>
            <h3 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              AI Systems Terminal
            </h3>
            <p className="text-slate-500 text-sm mt-3 font-light max-w-md mx-auto leading-relaxed">
              Unlock secret folders, query logs, or check social parameters in real-time. Click screen to focus input.
            </p>
          </div>
        )}

        {/* Retro Terminal Window */}
        <motion.div 
          layout
          onClick={focusInput}
          className={`${
            isMaximized 
              ? "fixed inset-4 md:inset-10 z-50 flex flex-col h-[calc(100vh-80px)] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#04060b]" 
              : "w-full rounded-2xl border border-white/10 overflow-hidden shadow-2xl relative bg-[#04060b] cursor-text glow-emerald/5 border-glow-emerald/30"
          } crt-flicker-effect`}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
        >
          {/* CRT Scanline pattern */}
          <div className="crt-lines" />

          {/* Terminal Header Bar */}
          <div className="bg-[#0b0e16] px-4 py-3 flex items-center justify-between border-b border-white/5 relative z-10">
            <div className="flex gap-1.5">
              {/* Close Button (Red) */}
              <button 
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsClosed(true);
                }}
                className="w-3 h-3 rounded-full bg-neon-red/30 flex items-center justify-center group cursor-pointer hover:bg-neon-red transition-all border-none"
                aria-label="Close terminal window"
              >
                <X className="w-1.5 h-1.5 opacity-0 group-hover:opacity-100 text-black" />
              </button>
              
              {/* Minimize Button (Yellow) */}
              <button 
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMinimized(!isMinimized);
                }}
                className="w-3 h-3 rounded-full bg-yellow-500/30 flex items-center justify-center group cursor-pointer hover:bg-yellow-500 transition-all border-none"
                aria-label="Minimize terminal window"
              >
                <Minus className="w-1.5 h-1.5 opacity-0 group-hover:opacity-100 text-black" />
              </button>
              
              {/* Maximize Button (Green) */}
              <button 
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMaximized(!isMaximized);
                }}
                className="w-3 h-3 rounded-full bg-neon-emerald/30 flex items-center justify-center group cursor-pointer hover:bg-neon-emerald transition-all border-none"
                aria-label="Maximize terminal window"
              >
                <Square className="w-1.5 h-1.5 opacity-0 group-hover:opacity-100 text-black" />
              </button>
            </div>
            
            {/* Active Network Diagnostics in header */}
            <div className="hidden md:flex items-center gap-3 font-mono text-[9px] text-slate-500">
              <div className="flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-neon-emerald animate-pulse" />
                <span>IP: 127.0.0.1</span>
              </div>
              <span>|</span>
              <div className="flex items-center gap-1">
                <span>PORT: 3000</span>
              </div>
              <span>|</span>
              <div className="flex items-center gap-1">
                <span>RTT: {latency}ms</span>
              </div>
              <span>|</span>
              <div className="flex items-center gap-1">
                <span>SHNDSHK: SECURE</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-500">
              <TermIcon className="w-3 h-3 text-neon-emerald" />
              <span>guest@nishant:~$</span>
            </div>
          </div>

          {/* Sub-header Active Telemetry Grid */}
          {!isMinimized && (
            <div className="bg-[#070a10]/90 px-6 py-2 border-b border-white/5 font-mono text-[9px] text-slate-500 flex justify-between select-none relative z-10">
              <span>SYS_CORE: ACTIVE (100%)</span>
              <span className="hidden sm:inline">COGNITIVE_SHIELD: ONLINE</span>
              <span>SYNC_RATE: 99.4% (HIGH)</span>
            </div>
          )}

          {/* Terminal Screen area & Form */}
          <AnimatePresence initial={false}>
            {!isMinimized && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`overflow-hidden flex flex-col ${isMaximized ? "flex-1" : ""}`}
              >
                {/* Scrollable logs */}
                <div 
                  ref={logsContainerRef}
                  className={`p-6 overflow-y-auto font-mono text-xs sm:text-sm flex flex-col gap-2 relative bg-[#04060b] ${
                    isMaximized ? "flex-1" : "h-[350px]"
                  }`}
                >
                  {isSecretActive ? (
                    /* Matrix animation waterfall */
                    <div className="text-neon-emerald leading-relaxed">
                      {matrixLines.map((line, idx) => (
                        <div key={idx} className="whitespace-nowrap overflow-hidden text-glow-emerald">
                          {line}
                        </div>
                      ))}
                      <div className="mt-4 flex items-center gap-2 text-neon-red font-bold">
                        <ShieldAlert className="w-4 h-4 animate-bounce" />
                        <span>BYPASSING LOCAL SECURITY LAYERS...</span>
                      </div>
                    </div>
                  ) : (
                    /* Standard history log */
                    <>
                      {history.map((line, index) => (
                        <div 
                          key={index}
                          className={`leading-relaxed ${
                            line.type === "input" ? "text-white" :
                            line.type === "error" ? "text-neon-red font-semibold" :
                            line.type === "success" ? "text-neon-emerald font-semibold" :
                            line.type === "system" ? "text-neon-purple font-medium" :
                            "text-slate-400"
                          }`}
                        >
                          {line.text}
                        </div>
                      ))}
                    </>
                  )}
                </div>

                {/* Input prompt bar */}
                {!isSecretActive && (
                  <form 
                    onSubmit={handleCommandSubmit}
                    className="px-6 pb-6 pt-2 bg-[#04060b] flex items-center gap-1 border-t border-white/5"
                  >
                    <span className="font-mono text-xs sm:text-sm text-neon-cyan select-none">guest@nishant.systems:~$</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputVal}
                      onChange={(e) => setInputVal(e.target.value)}
                      className="bg-transparent border-none outline-none font-mono text-xs sm:text-sm text-white flex-1 p-0 focus:ring-0"
                      placeholder="type 'help'..."
                      aria-label="Terminal command input"
                    />
                  </form>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>
    </>
  );
}
