import React from "react";
import Link from "next/link";
import { Shield, KeyRound, Lock, ArrowRight, CheckCircle2, Cpu } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Security Tools — SecurityTools",
  description:
    "Explore our suite of 100% client-side cybersecurity utilities: Password Strength Checker, CSPRNG Random Password Generator, and Diceware Passphrase Generator."
};

export default function ToolsIndexPage() {
  const tools = [
    {
      title: "Password Strength Checker",
      badge: "Real-Time Analysis",
      href: "/tools/password-strength-checker",
      icon: Shield,
      desc: "Calculate Shannon entropy in bits, test against known breached password lists, identify dangerous keyboard patterns, and evaluate estimated brute-force crack times across 4 real-world attacker hardware tiers.",
      features: [
        "Shannon entropy calculation in bits",
        "Breached credential dictionary scanning",
        "Online throttled vs unthrottled API metrics",
        "Offline GPU cluster (100 Billion/sec) simulation",
        "Sequential and repeated pattern detection"
      ]
    },
    {
      title: "Random Password Generator",
      badge: "CSPRNG Powered",
      href: "/tools/password-generator",
      icon: KeyRound,
      desc: "Generate cryptographically secure passwords powered by the browser's Web Cryptography API (crypto.getRandomValues). Includes customizable character sets, ambiguous character exclusions, and bulk generator mode.",
      features: [
        "Cryptographically secure randomness",
        "Lengths from 6 to 64 characters",
        "Exclude ambiguous characters (0, O, 1, l)",
        "Guaranteed character diversity guarantee",
        "Bulk mode: generate & export up to 20 at once"
      ]
    },
    {
      title: "Diceware Passphrase Generator",
      badge: "Memorable Entropy",
      href: "/tools/passphrase-generator",
      icon: Lock,
      desc: "Create mathematically strong, human-memorable multi-word passphrases inspired by EFF Diceware and the famous XKCD #936 principle. Custom word counts, delimiters, capitalization modes, and phonetic audio playback.",
      features: [
        "Curated clean English dictionary (1,200+ words)",
        "Configurable 3 to 8 word combinations",
        "Custom delimiters (hyphens, dots, spaces)",
        "TitleCase, lowercase, or UPPERCASE formatting",
        "Audio pronunciation helper"
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
          Utility Directory
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Client-Side Cybersecurity Utilities
        </h1>
        <p className="text-slate-400 text-sm sm:text-base mt-2 leading-relaxed">
          Every tool below is engineered with a strict zero-knowledge architecture. All cryptographic random generation and string evaluations occur strictly in local browser memory.
        </p>
      </div>

      {/* Grid of Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <div
              key={tool.href}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 flex flex-col justify-between hover:border-slate-700 transition-all group shadow-lg"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-emerald-300 font-mono border border-slate-700">
                    {tool.badge}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {tool.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {tool.desc}
                </p>

                <div className="pt-2 border-t border-slate-800/80 space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block">
                    Core Capabilities
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {tool.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800">
                <Link
                  href={tool.href}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 group-hover:shadow-md"
                >
                  <span>Launch Tool</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
