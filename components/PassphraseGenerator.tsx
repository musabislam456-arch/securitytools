"use client";

import React, { useState, useEffect, useCallback, useId } from "react";
import {
  generatePassphrase,
  PassphraseOptions,
  WORDLIST,
  formatTimeSpan
} from "@/lib/security-math";
import {
  Copy,
  Check,
  RefreshCw,
  Lock,
  Sparkles,
  BookOpen,
  Volume2,
  ShieldCheck,
  Sliders
} from "lucide-react";
import { ClientSecurityBadge } from "@/components/ClientSecurityBadge";

export function PassphraseGenerator() {
  const [options, setOptions] = useState<PassphraseOptions>({
    wordCount: 4,
    separator: "-",
    capitalization: "title",
    includeNumber: true,
    numberPosition: "end",
    includeSymbol: false
  });

  const [passphrase, setPassphrase] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [isRotating, setIsRotating] = useState<boolean>(false);
  const [customSeparator, setCustomSeparator] = useState<string>("");

  const wordCountInputId = useId();

  const handleGenerate = useCallback(() => {
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 400);

    const actualSeparator = options.separator === "custom" ? (customSeparator || "-") : options.separator;
    const generated = generatePassphrase({
      ...options,
      separator: actualSeparator
    });
    setPassphrase(generated);
  }, [options, customSeparator]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleGenerate();
    }, 0);
    return () => clearTimeout(timer);
  }, [handleGenerate]);

  const handleCopy = async () => {
    if (!passphrase) return;
    try {
      await navigator.clipboard.writeText(passphrase);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleSpeak = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      // replace separators with space for clean pronunciation
      const cleanText = passphrase.replace(/[-_./]/g, " ");
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Diceware Entropy Calculation:
  // E = wordCount * log2(WORDLIST.length)
  // + extra bits for capitalization, numbers, symbols
  const baseEntropyPerWord = Math.log2(WORDLIST.length); // ~10.2 bits per word
  let totalEntropy = Math.round(options.wordCount * baseEntropyPerWord);
  if (options.capitalization === "title") totalEntropy += Math.round(options.wordCount * 1); // 1 bit per word for capitalization
  if (options.includeNumber) totalEntropy += 7; // ~100 numbers = ~6.6 bits
  if (options.includeSymbol) totalEntropy += 3; // 8 symbols = 3 bits

  // Crack time at 100 billion offline guesses/sec
  // log2(seconds) = (entropy - 1) - log2(10^11)
  const log2Guesses = Math.max(1, totalEntropy - 1);
  const log2Rate = Math.log2(100_000_000_000);
  const log2Time = log2Guesses - log2Rate;
  const crackSeconds = log2Time > 120 ? 1e36 : (log2Time < -20 ? 0 : Math.pow(2, log2Time));
  const estimatedCrackTime = formatTimeSpan(crackSeconds);

  return (
    <div className="space-y-6" id="passphrase-generator-widget">
      <ClientSecurityBadge />

      {/* Main Passphrase Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 backdrop-blur-xl shadow-xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-5 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="font-semibold text-white text-base">
                Diceware Passphrase Generator
              </h2>
              <span className="text-xs text-slate-400">
                Memorable, high-entropy word combinations (XKCD-style)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 font-mono">
              ~{totalEntropy} Bits Entropy
            </span>
          </div>
        </div>

        {/* Output Box */}
        <div className="relative rounded-xl bg-slate-950 border border-slate-800 p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full text-center sm:text-left overflow-x-auto py-1">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-emerald-300 select-all font-mono break-all sm:break-normal">
              {passphrase || "Generating..."}
            </div>
            <div className="text-xs text-slate-400 mt-2 flex items-center gap-2 justify-center sm:justify-start">
              <span>{options.wordCount} dictionary words</span>
              <span>•</span>
              <span>Offline GPU crack: <strong className="text-white">{estimatedCrackTime}</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleSpeak}
              className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
              title="Hear phonetic pronunciation"
            >
              <Volume2 className="w-4 h-4 text-slate-300" />
            </button>

            <button
              type="button"
              onClick={handleGenerate}
              className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors flex items-center gap-2 text-sm font-medium"
              title="Generate new passphrase"
            >
              <RefreshCw className={`w-4 h-4 text-emerald-400 ${isRotating ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Regenerate</span>
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className="px-4 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors flex items-center gap-2 text-sm font-semibold shadow-lg shadow-emerald-500/10"
              title="Copy passphrase"
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

        {/* Configuration Controls */}
        <div className="mt-8 pt-6 border-t border-slate-800 space-y-6">
          {/* Word Count Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor={wordCountInputId} className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-400" />
                <span>Word Count ({options.wordCount} words)</span>
              </label>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span>Entropy:</span>
                <span className="text-emerald-400 font-bold">{totalEntropy} bits</span>
              </div>
            </div>

            <input
              id={wordCountInputId}
              type="range"
              min={3}
              max={8}
              value={options.wordCount}
              onChange={(e) => setOptions({ ...options, wordCount: parseInt(e.target.value) })}
              className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-emerald-500 border border-slate-800"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono px-1">
              <span>3 (Basic)</span>
              <span>4 (Recommended)</span>
              <span>5 (High Security)</span>
              <span>6 (Paranoid)</span>
              <span>8 (Maximum)</span>
            </div>
          </div>

          {/* Separator Selection */}
          <div>
            <label className="text-sm font-semibold text-slate-200 block mb-2">
              Word Separator
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {[
                { label: "Hyphen (-)", val: "-" },
                { label: "Space ( )", val: " " },
                { label: "Period (.)", val: "." },
                { label: "Underscore (_)", val: "_" },
                { label: "Slash (/)", val: "/" },
                { label: "Custom", val: "custom" }
              ].map((sep) => (
                <button
                  key={sep.val}
                  type="button"
                  onClick={() => setOptions({ ...options, separator: sep.val })}
                  className={`py-2 px-3 rounded-lg text-xs font-mono border transition-all ${
                    options.separator === sep.val
                      ? "bg-emerald-500/10 border-emerald-400 text-emerald-300 font-bold"
                      : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
                  }`}
                >
                  {sep.label}
                </button>
              ))}
            </div>

            {options.separator === "custom" && (
              <div className="mt-2 flex items-center gap-2">
                <input
                  type="text"
                  maxLength={3}
                  value={customSeparator}
                  onChange={(e) => setCustomSeparator(e.target.value)}
                  placeholder="e.g. +"
                  className="w-20 rounded-lg bg-slate-950 border border-slate-700 px-3 py-1.5 text-center font-mono text-emerald-400 text-sm focus:outline-none focus:border-emerald-500"
                />
                <span className="text-xs text-slate-400">Custom delimiter character</span>
              </div>
            )}
          </div>

          {/* Capitalization & Injections Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {/* Capitalization */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs font-semibold text-slate-200 block mb-2">
                Capitalization Mode
              </span>
              <div className="space-y-1.5 text-xs">
                <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                  <input
                    type="radio"
                    name="cap-mode"
                    checked={options.capitalization === "title"}
                    onChange={() => setOptions({ ...options, capitalization: "title" })}
                    className="text-emerald-500 focus:ring-emerald-500 accent-emerald-500"
                  />
                  <span>Title Case (Apple-Falcon)</span>
                </label>
                <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                  <input
                    type="radio"
                    name="cap-mode"
                    checked={options.capitalization === "lowercase"}
                    onChange={() => setOptions({ ...options, capitalization: "lowercase" })}
                    className="text-emerald-500 focus:ring-emerald-500 accent-emerald-500"
                  />
                  <span>Lowercase (apple-falcon)</span>
                </label>
                <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                  <input
                    type="radio"
                    name="cap-mode"
                    checked={options.capitalization === "uppercase"}
                    onChange={() => setOptions({ ...options, capitalization: "uppercase" })}
                    className="text-emerald-500 focus:ring-emerald-500 accent-emerald-500"
                  />
                  <span>Uppercase (APPLE-FALCON)</span>
                </label>
              </div>
            </div>

            {/* Include Number */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-200">
                  Include Number
                </span>
                <input
                  type="checkbox"
                  checked={options.includeNumber}
                  onChange={(e) => setOptions({ ...options, includeNumber: e.target.checked })}
                  className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 accent-emerald-500 bg-slate-900 border-slate-700"
                />
              </div>

              {options.includeNumber && (
                <div className="space-y-1 text-xs pt-1">
                  <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                    <input
                      type="radio"
                      name="num-pos"
                      checked={options.numberPosition === "end"}
                      onChange={() => setOptions({ ...options, numberPosition: "end" })}
                      className="text-emerald-500 accent-emerald-500"
                    />
                    <span>At End (...-42)</span>
                  </label>
                  <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                    <input
                      type="radio"
                      name="num-pos"
                      checked={options.numberPosition === "start"}
                      onChange={() => setOptions({ ...options, numberPosition: "start" })}
                      className="text-emerald-500 accent-emerald-500"
                    />
                    <span>At Start (42-...)</span>
                  </label>
                  <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                    <input
                      type="radio"
                      name="num-pos"
                      checked={options.numberPosition === "between"}
                      onChange={() => setOptions({ ...options, numberPosition: "between" })}
                      className="text-emerald-500 accent-emerald-500"
                    />
                    <span>In Middle</span>
                  </label>
                </div>
              )}
            </div>

            {/* Include Symbol */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-200">
                    Include Special Symbol
                  </span>
                  <input
                    type="checkbox"
                    checked={options.includeSymbol}
                    onChange={(e) => setOptions({ ...options, includeSymbol: e.target.checked })}
                    className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 accent-emerald-500 bg-slate-900 border-slate-700"
                  />
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Appends a random symbol (!@#$%&*?) to fulfill strict legacy password complexity policies.
                </p>
              </div>

              <span className="text-[10px] font-mono text-emerald-400 mt-2 block">
                Adds ~3 bits entropy
              </span>
            </div>
          </div>
        </div>

        {/* Why Passphrases Win Explainer */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex items-start gap-3 p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
          <BookOpen className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-300 space-y-1">
            <strong className="text-white font-semibold block">
              Why passphrases beat complex passwords:
            </strong>
            <p className="text-slate-400 leading-relaxed">
              Based on the legendary XKCD #936 principle: Four random common words like{" "}
              <code className="text-emerald-300 bg-slate-900 px-1 py-0.5 rounded border border-slate-700 font-mono">
                correct horse battery staple
              </code>{" "}
              contain over 50-60 bits of mathematical entropy. They are exponentially harder for computers to brute-force than short scrambled strings like{" "}
              <code className="text-slate-400 bg-slate-900 px-1 py-0.5 rounded border border-slate-700 font-mono">
                Tr0ub4dor&3
              </code>
              , while remaining effortless for human memory.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
