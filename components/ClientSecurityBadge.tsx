"use client";

import React from "react";
import { ShieldCheck, WifiOff, Lock, Cpu } from "lucide-react";

export function ClientSecurityBadge({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-4 backdrop-blur-sm ${className}`}
      id="client-security-guarantee-badge"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-emerald-400 text-sm tracking-wide uppercase">
                Zero Data Transmission Guarantee
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                100% Client-Side
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              All computations run strictly inside your browser&apos;s local sandbox memory using the{" "}
              <code className="text-emerald-300 bg-emerald-950/60 px-1 py-0.5 rounded border border-emerald-800/40 font-mono text-[11px]">
                Web Cryptography API
              </code>
              . We never store, log, or transmit your passwords.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-400 shrink-0 pl-11 sm:pl-0">
          <div className="flex items-center gap-1.5" title="Air-gapped compatible">
            <WifiOff className="w-3.5 h-3.5 text-emerald-400" />
            <span>Works Offline</span>
          </div>
          <div className="flex items-center gap-1.5" title="Local browser memory only">
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            <span>Local CSPRNG</span>
          </div>
          <div className="flex items-center gap-1.5" title="No telemetry or backend logs">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>No Server Storage</span>
          </div>
        </div>
      </div>
    </div>
  );
}
