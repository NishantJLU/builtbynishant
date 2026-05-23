"use client";

import React from "react";
import Link from "next/link";
import { Terminal, ShieldAlert, ArrowLeft } from "lucide-react";

export default function NotFound() {
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
            <span>404: TARGET_NOT_RESOLVED</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col gap-6 text-center items-center">
          <div className="p-4 rounded-full bg-neon-red/10 border border-neon-red/20 text-neon-red animate-bounce">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-bold text-white tracking-widest uppercase">
              {"// ERROR_404: TARGET_NOT_FOUND"}
            </h1>
            <p className="text-slate-500 text-xs leading-relaxed max-w-sm">
              The routing node you are trying to query does not exist in nishant.systems. Intrusion filters resolved host: invalid.
            </p>
          </div>

          <div className="w-full bg-[#080d16] border border-white/5 rounded-xl p-4 text-left flex flex-col gap-1.5 text-[10px]">
            <div><span className="text-neon-red">guest@nishant:~$</span> {"curl -I https://builtbynishant.dev/invalid"}</div>
            <div><span className="text-slate-500">HTTP/1.1 404 NOT FOUND</span></div>
            <div><span className="text-slate-500">Connection: close</span></div>
            <div><span className="text-slate-500">Content-Type: text/html</span></div>
            <div><span className="text-neon-purple">Route status: UNRESOLVED_ROUTER_NODE</span></div>
          </div>

          <Link
            href="/"
            className="px-6 py-2.5 rounded-full border border-slate-700 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Core Node</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
