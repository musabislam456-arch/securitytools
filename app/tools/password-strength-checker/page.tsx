import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { PasswordChecker } from "@/components/PasswordChecker";
import { Shield, ArrowLeft, BookOpen, CheckCircle2, AlertTriangle, Cpu } from "lucide-react";

export const metadata: Metadata = {
  title: "Password Strength Checker & Crack Time Calculator — SecurityTools",
  description:
    "Test password strength, calculate Shannon entropy in bits, and estimate real-world brute-force crack times across GPU rigs and supercomputers. 100% client-side privacy."
};

export default function PasswordStrengthCheckerPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-12">
      {/* Header & Breadcrumb */}
      <div>
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Security Tools</span>
        </Link>

        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Shield className="w-4 h-4" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Password Strength Checker & Crack-Time Analyzer
          </h1>
        </div>
        <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
          Test any password or passphrase against modern brute-force algorithms. We evaluate mathematical entropy, character variety, sequential patterns, and check for matches against known breached databases — completely client-side.
        </p>
      </div>

      {/* Interactive Tool Sandbox */}
      <PasswordChecker />

      {/* Educational & Mathematical Guide */}
      <div className="pt-8 border-t border-slate-800/80 space-y-8 text-slate-300">
        <div className="max-w-3xl space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            <span>How Password Strength is Mathematically Calculated</span>
          </h2>
          <p className="text-sm leading-relaxed text-slate-400">
            Password strength is not a subjective feeling—it is defined by information theory. The foundational metric is <strong>Shannon Information Entropy</strong>, expressed in bits:
          </p>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs sm:text-sm text-emerald-300 space-y-1">
            <div>Entropy (bits) = Length × log₂(Character Pool Size)</div>
            <div className="text-slate-500 text-xs">Total Search Space = 2^(Entropy) combinations</div>
          </div>

          <p className="text-sm leading-relaxed text-slate-400">
            When you type a password, we determine the available character pool $R$ (e.g., lowercase only = 26, alphanumeric = 62, full printable ASCII = 95) and multiply by the length $L$.
          </p>
        </div>

        {/* Benchmarking Scenarios Explained */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">Understanding the 4 Attack Benchmarks</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <strong className="text-white text-sm block">1. Online Attack (Rate-Limited: 100/sec)</strong>
              <p className="text-xs text-slate-400 leading-relaxed">
                Standard web application login portals with IP throttling, CAPTCHAs, or temporary account locks. Attackers are severely constrained by network round-trips.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <strong className="text-white text-sm block">2. Online Attack (Fast API: 10,000/sec)</strong>
              <p className="text-xs text-slate-400 leading-relaxed">
                Mobile API endpoints or legacy authentication endpoints that mistakenly omitted rate-limiting middleware, allowing high-concurrency botnet spraying.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <strong className="text-white text-sm block">3. Offline GPU Rig (100 Billion/sec)</strong>
              <p className="text-xs text-slate-400 leading-relaxed">
                The most realistic scenario after a database breach dump. An attacker using an 8x RTX 4090 rig runs Hashcat against unsalted or fast hashes (MD5, SHA-1, NTLM).
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <strong className="text-white text-sm block">4. Nation-State Supercluster (100 Trillion/sec)</strong>
              <p className="text-xs text-slate-400 leading-relaxed">
                Industrial datacenter-scale compute grids with dedicated FPGA/ASIC hardware clusters operated by nation-state cyber intelligence agencies.
              </p>
            </div>
          </div>
        </div>

        {/* 2026 NIST Guidance */}
        <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>NIST SP 800-63B Authentication Recommendations</span>
          </div>
          <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-300">
            <li><strong>Length is paramount:</strong> A 16-character phrase with simple characters consistently outperforms an 8-character string filled with awkward symbols.</li>
            <li><strong>Eliminate periodic forced resets:</strong> Forcing users to change passwords every 90 days actually reduces entropy by encouraging minor predictable changes (e.g. <code>Spring2025!</code> to <code>Summer2025!</code>).</li>
            <li><strong>Screen against breached password lists:</strong> Over 80% of successful breaches leverage credentials that were previously leaked on public forums.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
