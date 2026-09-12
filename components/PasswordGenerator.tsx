"use client";

import React, { useState, useEffect, useCallback, useId } from "react";
import {
  generateRandomPassword,
  evaluatePassword,
  PasswordGeneratorOptions
} from "@/lib/security-math";
import {
  Copy,
  Check,
  RefreshCw,
  Sliders,
  Sparkles,
  Download,
  ListPlus,
  KeyRound,
  ShieldCheck
} from "lucide-react";
import { ClientSecurityBadge } from "@/components/ClientSecurityBadge";

export function PasswordGenerator() {
  const [options, setOptions] = useState<PasswordGeneratorOptions>({
    length: 18,
    useUppercase: true,
    useLowercase: true,
    useNumbers: true,
    useSymbols: true,
    excludeAmbiguous: false,
    noConsecutiveDuplicates: true
  });

  const [password, setPassword] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [isRotating, setIsRotating] = useState<boolean>(false);

  // Bulk generation state
  const [bulkCount, setBulkCount] = useState<number>(5);
  const [bulkPasswords, setBulkPasswords] = useState<string[]>([]);
  const [showBulkMode, setShowBulkMode] = useState<boolean>(false);
  const [bulkCopied, setBulkCopied] = useState<boolean>(false);

  const lengthInputId = useId();

  const handleGenerate = useCallback(() => {
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 400);

    const newPwd = generateRandomPassword(options);
    setPassword(newPwd);

    if (showBulkMode) {
      const bulk: string[] = [];
      for (let i = 0; i < bulkCount; i++) {
        bulk.push(generateRandomPassword(options));
      }
      setBulkPasswords(bulk);
    }
  }, [options, showBulkMode, bulkCount]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleGenerate();
    }, 0);
    return () => clearTimeout(timer);
  }, [handleGenerate]);

  const handleCopySingle = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleCopyBulk = async () => {
    if (bulkPasswords.length === 0) return;
    try {
      await navigator.clipboard.writeText(bulkPasswords.join("\n"));
      setBulkCopied(true);
      setTimeout(() => setBulkCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleDownloadBulk = () => {
    if (bulkPasswords.length === 0) return;
    const blob = new Blob([bulkPasswords.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `securitytools-passwords-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const analysis = evaluatePassword(password);

  const applyPreset = (preset: "standard" | "strong" | "ultra" | "pin") => {
    if (preset === "standard") {
      setOptions({
        length: 16,
        useUppercase: true,
        useLowercase: true,
        useNumbers: true,
        useSymbols: true,
        excludeAmbiguous: false,
        noConsecutiveDuplicates: true
      });
    } else if (preset === "strong") {
      setOptions({
        length: 24,
        useUppercase: true,
        useLowercase: true,
        useNumbers: true,
        useSymbols: true,
        excludeAmbiguous: true,
        noConsecutiveDuplicates: true
      });
    } else if (preset === "ultra") {
      setOptions({
        length: 32,
        useUppercase: true,
        useLowercase: true,
        useNumbers: true,
        useSymbols: true,
        excludeAmbiguous: true,
        noConsecutiveDuplicates: true
      });
    } else if (preset === "pin") {
      setOptions({
        length: 6,
        useUppercase: false,
        useLowercase: false,
        useNumbers: true,
        useSymbols: false,
        excludeAmbiguous: false,
        noConsecutiveDuplicates: false
      });
    }
  };

  // Colorize characters for visual legibility
  const renderStyledPassword = (pwd: string) => {
    return pwd.split("").map((ch, idx) => {
      let colorClass = "text-white";
      if (/[0-9]/.test(ch)) {
        colorClass = "text-amber-400";
      } else if (/[!@#$%^&*()_+\-=[\]{}|;:,.<>?]/.test(ch)) {
        colorClass = "text-emerald-400";
      } else if (/[A-Z]/.test(ch)) {
        colorClass = "text-cyan-300";
      } else {
        colorClass = "text-slate-200";
      }
      return (
        <span key={idx} className={`${colorClass} inline-block font-mono select-all transition-colors`}>
          {ch}
        </span>
      );
    });
  };

  return (
    <div className="space-y-6" id="random-password-generator-widget">
      <ClientSecurityBadge />

      {/* Main Generator Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 backdrop-blur-xl shadow-xl">
        {/* Presets & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-5 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-emerald-400" />
            <h2 className="font-semibold text-white text-base">
              Cryptographic Password Generator
            </h2>
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-slate-400 mr-1">Presets:</span>
            <button
              type="button"
              onClick={() => applyPreset("standard")}
              className="text-xs px-2.5 py-1 rounded bg-slate-850 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            >
              16-Char Standard
            </button>
            <button
              type="button"
              onClick={() => applyPreset("strong")}
              className="text-xs px-2.5 py-1 rounded bg-slate-850 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            >
              24-Char Strong
            </button>
            <button
              type="button"
              onClick={() => applyPreset("ultra")}
              className="text-xs px-2.5 py-1 rounded bg-slate-850 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            >
              32-Char Ultra
            </button>
            <button
              type="button"
              onClick={() => applyPreset("pin")}
              className="text-xs px-2.5 py-1 rounded bg-slate-850 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            >
              6-Digit PIN
            </button>
          </div>
        </div>

        {/* Generated Password Output Box */}
        <div className="relative rounded-xl bg-slate-950 border border-slate-800 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full overflow-x-auto text-lg sm:text-2xl tracking-wider text-center sm:text-left py-1 select-all break-all">
            {password ? renderStyledPassword(password) : <span className="text-slate-600">Generating...</span>}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleGenerate}
              className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all flex items-center gap-2 text-sm font-medium"
              title="Generate new random password"
            >
              <RefreshCw className={`w-4 h-4 text-emerald-400 ${isRotating ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Regenerate</span>
            </button>

            <button
              type="button"
              onClick={handleCopySingle}
              className="px-4 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all flex items-center gap-2 text-sm font-semibold shadow-lg shadow-emerald-500/10"
              title="Copy to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Legend & Strength overview */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-3 px-1 text-xs">
          <div className="flex items-center gap-3 text-slate-400 flex-wrap">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-cyan-300" />
              <span>Uppercase</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-slate-200" />
              <span>Lowercase</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Numbers</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Symbols</span>
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-300">
            <span className="font-mono text-emerald-400 font-semibold">{analysis.entropyBits} bits entropy</span>
            <span>•</span>
            <span className="text-slate-400">Offline Crack: <strong className="text-white">{analysis.crackTimes.offlineGpuRig}</strong></span>
          </div>
        </div>

        {/* Configuration Controls */}
        <div className="mt-8 pt-6 border-t border-slate-800 space-y-6">
          {/* Length Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor={lengthInputId} className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-400" />
                <span>Password Length</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  id={lengthInputId}
                  type="number"
                  min={6}
                  max={64}
                  value={options.length}
                  onChange={(e) => {
                    const val = Math.min(64, Math.max(6, parseInt(e.target.value) || 6));
                    setOptions({ ...options, length: val });
                  }}
                  className="w-16 rounded-lg bg-slate-950 border border-slate-700 px-2.5 py-1 text-center font-mono text-emerald-400 text-sm focus:outline-none focus:border-emerald-500"
                />
                <span className="text-xs text-slate-400">characters</span>
              </div>
            </div>

            <input
              type="range"
              min={6}
              max={64}
              value={options.length}
              onChange={(e) => setOptions({ ...options, length: parseInt(e.target.value) })}
              className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-emerald-500 border border-slate-800"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono px-1">
              <span>6 (Short)</span>
              <span>16 (Recommended)</span>
              <span>32 (Strong)</span>
              <span>64 (Ultra)</span>
            </div>
          </div>

          {/* Character Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors">
              <div>
                <span className="text-sm font-medium text-slate-200 block">Uppercase (A-Z)</span>
                <span className="text-xs text-slate-500 font-mono">ABCDEFGH...</span>
              </div>
              <input
                type="checkbox"
                checked={options.useUppercase}
                onChange={(e) => setOptions({ ...options, useUppercase: e.target.checked })}
                className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 accent-emerald-500 bg-slate-900 border-slate-700"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors">
              <div>
                <span className="text-sm font-medium text-slate-200 block">Lowercase (a-z)</span>
                <span className="text-xs text-slate-500 font-mono">abcdefgh...</span>
              </div>
              <input
                type="checkbox"
                checked={options.useLowercase}
                onChange={(e) => setOptions({ ...options, useLowercase: e.target.checked })}
                className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 accent-emerald-500 bg-slate-900 border-slate-700"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors">
              <div>
                <span className="text-sm font-medium text-slate-200 block">Numbers (0-9)</span>
                <span className="text-xs text-slate-500 font-mono">0123456789</span>
              </div>
              <input
                type="checkbox"
                checked={options.useNumbers}
                onChange={(e) => setOptions({ ...options, useNumbers: e.target.checked })}
                className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 accent-emerald-500 bg-slate-900 border-slate-700"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors">
              <div>
                <span className="text-sm font-medium text-slate-200 block">Symbols</span>
                <span className="text-xs text-slate-500 font-mono">!@#$%^&*...</span>
              </div>
              <input
                type="checkbox"
                checked={options.useSymbols}
                onChange={(e) => setOptions({ ...options, useSymbols: e.target.checked })}
                className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 accent-emerald-500 bg-slate-900 border-slate-700"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors">
              <div>
                <span className="text-sm font-medium text-slate-200 block">Exclude Ambiguous</span>
                <span className="text-xs text-slate-500 font-mono">Avoids 0, O, 1, l, I, |</span>
              </div>
              <input
                type="checkbox"
                checked={options.excludeAmbiguous}
                onChange={(e) => setOptions({ ...options, excludeAmbiguous: e.target.checked })}
                className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 accent-emerald-500 bg-slate-900 border-slate-700"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors">
              <div>
                <span className="text-sm font-medium text-slate-200 block">No Adjacent Duplicates</span>
                <span className="text-xs text-slate-500 font-mono">Avoids &apos;aa&apos;, &apos;77&apos;, etc.</span>
              </div>
              <input
                type="checkbox"
                checked={options.noConsecutiveDuplicates}
                onChange={(e) => setOptions({ ...options, noConsecutiveDuplicates: e.target.checked })}
                className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 accent-emerald-500 bg-slate-900 border-slate-700"
              />
            </label>
          </div>

          {/* Bulk Generation Mode Toggle */}
          <div className="pt-4 border-t border-slate-800/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  const nextState = !showBulkMode;
                  setShowBulkMode(nextState);
                  if (nextState && bulkPasswords.length === 0) {
                    const bulk: string[] = [];
                    for (let i = 0; i < bulkCount; i++) {
                      bulk.push(generateRandomPassword(options));
                    }
                    setBulkPasswords(bulk);
                  }
                }}
                className="flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors self-start"
              >
                <ListPlus className="w-4 h-4" />
                <span>{showBulkMode ? "Hide Bulk Generator" : "Switch to Bulk Password Generator"}</span>
              </button>

              {showBulkMode && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Generate count:</span>
                  {[5, 10, 20].map((cnt) => (
                    <button
                      key={cnt}
                      type="button"
                      onClick={() => {
                        setBulkCount(cnt);
                        const bulk: string[] = [];
                        for (let i = 0; i < cnt; i++) {
                          bulk.push(generateRandomPassword(options));
                        }
                        setBulkPasswords(bulk);
                      }}
                      className={`text-xs px-2.5 py-1 rounded transition-colors ${
                        bulkCount === cnt
                          ? "bg-emerald-500 text-slate-950 font-bold"
                          : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                      }`}
                    >
                      {cnt}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Bulk Output Panel */}
            {showBulkMode && (
              <div className="mt-4 rounded-xl bg-slate-950 border border-slate-800 p-4 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-xs font-mono text-slate-400">
                    Generated {bulkPasswords.length} cryptographically independent passwords:
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCopyBulk}
                      className="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5 transition-colors"
                    >
                      {bulkCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{bulkCopied ? "Copied All!" : "Copy All"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleDownloadBulk}
                      className="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download .txt</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                  {bulkPasswords.map((pwd, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800/80 font-mono text-xs hover:border-slate-700"
                    >
                      <span className="text-slate-400 mr-2 select-none">#{i + 1}</span>
                      <span className="text-emerald-300 select-all flex-1 tracking-wider">{pwd}</span>
                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            await navigator.clipboard.writeText(pwd);
                          } catch {
                            // ignore
                          }
                        }}
                        className="text-slate-400 hover:text-white p-1 ml-2"
                        title="Copy this password"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
