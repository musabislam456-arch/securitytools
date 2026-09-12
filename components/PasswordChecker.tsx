"use client";

import React, { useState, useMemo } from "react";
import {
  evaluatePassword,
  PasswordAnalysis
} from "@/lib/security-math";
import {
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Eye,
  EyeOff,
  Copy,
  Check,
  Sparkles,
  Server,
  Cpu,
  Layers,
  Zap,
  Info,
  RotateCcw
} from "lucide-react";
import { ClientSecurityBadge } from "@/components/ClientSecurityBadge";

const SAMPLE_PASSWORDS = [
  { label: "Common Weak", value: "password123" },
  { label: "Typical 'Complex'", value: "Summer2025!" },
  { label: "Passphrase", value: "correct-horse-battery-staple" },
  { label: "Random 18-Char", value: "xK9#mQ$4vL!8wZ@2bY" }
];

export function PasswordChecker() {
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const analysis: PasswordAnalysis = useMemo(() => {
    return evaluatePassword(password);
  }, [password]);

  const handleCopy = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const getTierColor = (tier: PasswordAnalysis["tier"]) => {
    switch (tier) {
      case "Very Weak":
        return {
          text: "text-red-400",
          bg: "bg-red-500/10",
          border: "border-red-500/30",
          bar: "bg-red-500",
          glow: "shadow-red-500/20"
        };
      case "Weak":
        return {
          text: "text-orange-400",
          bg: "bg-orange-500/10",
          border: "border-orange-500/30",
          bar: "bg-orange-500",
          glow: "shadow-orange-500/20"
        };
      case "Moderate":
        return {
          text: "text-amber-400",
          bg: "bg-amber-500/10",
          border: "border-amber-500/30",
          bar: "bg-amber-500",
          glow: "shadow-amber-500/20"
        };
      case "Strong":
        return {
          text: "text-emerald-400",
          bg: "bg-emerald-500/10",
          border: "border-emerald-500/30",
          bar: "bg-emerald-500",
          glow: "shadow-emerald-500/20"
        };
      case "Maximum Security":
        return {
          text: "text-emerald-300",
          bg: "bg-emerald-500/20",
          border: "border-emerald-400/40",
          bar: "bg-emerald-400",
          glow: "shadow-emerald-400/30"
        };
    }
  };

  const tierColors = getTierColor(analysis.tier);

  return (
    <div className="space-y-6" id="password-strength-checker-widget">
      {/* Zero storage guarantee badge */}
      <ClientSecurityBadge />

      {/* Main Input Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 backdrop-blur-xl shadow-xl">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <label
              htmlFor="password-eval-input"
              className="text-sm font-semibold text-slate-200 flex items-center gap-2"
            >
              <span>Test Password or Passphrase</span>
              <span className="text-xs font-normal text-slate-400">
                (Evaluated strictly in browser RAM)
              </span>
            </label>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs text-slate-400 mr-1 hidden sm:inline">Try preset:</span>
              {SAMPLE_PASSWORDS.map((sample) => (
                <button
                  key={sample.label}
                  type="button"
                  onClick={() => setPassword(sample.value)}
                  className="text-xs px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700"
                >
                  {sample.label}
                </button>
              ))}
            </div>
          </div>

          {/* Password Input with controls */}
          <div className="relative flex items-center">
            <input
              id="password-eval-input"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter a password to test..."
              autoComplete="off"
              spellCheck={false}
              className="w-full rounded-xl bg-slate-950 border border-slate-700/80 px-4 py-3.5 pr-28 text-white font-mono text-base sm:text-lg placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
            />
            <div className="absolute right-2 flex items-center gap-1">
              {password && (
                <button
                  type="button"
                  onClick={() => setPassword("")}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                  title="Clear input"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={handleCopy}
                disabled={!password}
                className="p-2 text-slate-400 hover:text-emerald-400 rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-40"
                title="Copy password"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Score & Tier indicator */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Strength Rating:
                </span>
                <span
                  className={`text-sm font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-full border ${tierColors.bg} ${tierColors.text} ${tierColors.border}`}
                >
                  {analysis.tier}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span>Score: <strong className="text-white">{analysis.score}/100</strong></span>
                <span>•</span>
                <span>Entropy: <strong className="text-emerald-400">{analysis.entropyBits} bits</strong></span>
              </div>
            </div>

            {/* Visual Gauge Bar */}
            <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div
                className={`h-full rounded-full transition-all duration-300 ${tierColors.bar}`}
                style={{ width: `${Math.max(5, analysis.score)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Real-World Crack-Time Breakdown */}
        <div className="mt-8 pt-6 border-t border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>Estimated Time to Crack by Attack Scenario</span>
            </h3>
            <span className="text-xs text-slate-400 hidden sm:inline">
              Calculated via keyspace $2^{'{bits}'}$ search rate
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Scenario 1: Online Throttled */}
            <div className="rounded-xl border border-slate-800/90 bg-slate-950/60 p-4">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1.5">
                <Server className="w-3.5 h-3.5 text-blue-400" />
                <span>Online (Throttled)</span>
              </div>
              <div className="text-lg font-bold text-white tracking-tight truncate" title={analysis.crackTimes.onlineThrottled}>
                {analysis.crackTimes.onlineThrottled}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Web login with rate-limits (100 guesses/sec).
              </p>
            </div>

            {/* Scenario 2: Online Fast */}
            <div className="rounded-xl border border-slate-800/90 bg-slate-950/60 p-4">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>Online (Fast API)</span>
              </div>
              <div className="text-lg font-bold text-white tracking-tight truncate" title={analysis.crackTimes.onlineFast}>
                {analysis.crackTimes.onlineFast}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Unthrottled API endpoint (10,000 guesses/sec).
              </p>
            </div>

            {/* Scenario 3: Offline GPU Cluster */}
            <div className="rounded-xl border border-slate-800/90 bg-slate-950/60 p-4 relative overflow-hidden">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1.5">
                <Cpu className="w-3.5 h-3.5 text-orange-400" />
                <span>Offline GPU Rig</span>
              </div>
              <div className={`text-lg font-bold tracking-tight truncate ${tierColors.text}`} title={analysis.crackTimes.offlineGpuRig}>
                {analysis.crackTimes.offlineGpuRig}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Dedicated 8x RTX 4090 cluster (100B hashes/sec).
              </p>
            </div>

            {/* Scenario 4: Supercomputer / Nation-State */}
            <div className="rounded-xl border border-slate-800/90 bg-slate-950/60 p-4">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Massive Supercluster</span>
              </div>
              <div className="text-lg font-bold text-white tracking-tight truncate" title={analysis.crackTimes.nationState}>
                {analysis.crackTimes.nationState}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Enterprise/State farm (100 Trillion/sec).
              </p>
            </div>
          </div>
        </div>

        {/* Character Attributes & Vulnerability Breakdown */}
        <div className="mt-8 pt-6 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Attributes Matrix */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
              Character Composition & Pool
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Total Length</span>
                <span className={`font-mono font-bold ${analysis.length >= 16 ? "text-emerald-400" : analysis.length >= 10 ? "text-amber-400" : "text-red-400"}`}>
                  {analysis.length} chars
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Search Pool</span>
                <span className="font-mono text-slate-200">
                  {analysis.poolSize} characters
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Lowercase (a-z)</span>
                <span className={analysis.hasLowercase ? "text-emerald-400 font-bold" : "text-slate-500"}>
                  {analysis.hasLowercase ? "✓ Yes" : "✗ None"}
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Uppercase (A-Z)</span>
                <span className={analysis.hasUppercase ? "text-emerald-400 font-bold" : "text-slate-500"}>
                  {analysis.hasUppercase ? "✓ Yes" : "✗ None"}
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Numbers (0-9)</span>
                <span className={analysis.hasNumbers ? "text-emerald-400 font-bold" : "text-slate-500"}>
                  {analysis.hasNumbers ? "✓ Yes" : "✗ None"}
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Symbols (!@#$)</span>
                <span className={analysis.hasSymbols ? "text-emerald-400 font-bold" : "text-slate-500"}>
                  {analysis.hasSymbols ? "✓ Yes" : "✗ None"}
                </span>
              </div>
            </div>
          </div>

          {/* Vulnerability Warnings & Suggestions */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
              Vulnerability Audit & Advice
            </h4>

            <div className="space-y-2 text-xs">
              {analysis.isCommonBreached && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-red-950/40 border border-red-500/40 text-red-200">
                  <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-red-300">Known Breached Password!</strong>
                    This exact password is listed in public breach databases (RockYou, SecLists). Automated bots crack this in milliseconds.
                  </div>
                </div>
              )}

              {analysis.warnings.length > 0 && !analysis.isCommonBreached && (
                <div className="space-y-1.5">
                  {analysis.warnings.map((w, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-950/30 border border-amber-500/30 text-amber-200">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{w}</span>
                    </div>
                  ))}
                </div>
              )}

              {analysis.suggestions.length > 0 && (
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1 text-slate-300">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold mb-1">
                    <Info className="w-3.5 h-3.5" />
                    <span>Cryptographic Recommendations</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-slate-400">
                    {analysis.suggestions.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
