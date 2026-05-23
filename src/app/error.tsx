"use client";

import React, { useEffect } from "react";
import { Terminal, ShieldAlert, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("System exception caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#04060b] flex items-center justify-center p-6 font-mono text-xs sm:text-sm text-slate-400 relative overflow-hidden crt-flicker-effect">
      {/* CRT lines overlay */}
      <div className="crt-lines" />

      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-5 pointer-events-none" />

      <div className="w-full max-w-lg border border-neon-red/30 rounded-2xl overflow-hidden shadow-2xl relative bg-[#04060b] glow-red/5">
        {/* Terminal Header */}
        <div className="bg-[#0b0e16] px-4 py-3 flex items-center justify-between border-b border-white/5">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-neon-red" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/30" />
            <div className="w-3 h-3 rounded-full bg-neon-emerald/30" />
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
            <Terminal className="w-3 h-3 text-neon-red" />
            <span>500: RUNTIME_FATAL_EXCEPTION</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col gap-6 text-center items-center">
          <div className="p-4 rounded-full bg-neon-red/10 border border-neon-red/20 text-neon-red animate-pulse">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-bold text-white tracking-widest uppercase">
              {"// EXCEPTION: STACK_COLLAPSE"}
            </h1>
            <p className="text-slate-500 text-xs leading-relaxed max-w-sm">
              A runtime exception has collapsed the routing process. Host kernel remains active, but render components failed.
            </p>
          </div>

          <div className="w-full bg-[#080d16] border border-white/5 rounded-xl p-4 text-left flex flex-col gap-1.5 text-[10px] text-red-400">
            <div className="text-slate-500 select-none">EXCEPTION_DUMP:</div>
            <div className="truncate">MESSAGE: {error.message || "Unknown compile error"}</div>
            <div>DIGEST: {error.digest || "N/A"}</div>
            <div className="text-neon-purple select-none mt-1">CORE_STATE: FAULT_CONTAINED</div>
          </div>

          <button
            onClick={() => reset()}
            className="px-6 py-2.5 rounded-full border border-slate-700 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-neon-cyan animate-spin" />
            <span>Reset Host Kernel</span>
          </button>
        </div>
      </div>
    </div>
  );
}
