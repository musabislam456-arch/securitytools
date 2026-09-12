import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Shield, Lock, Terminal, Cpu, CheckCircle2, HeartHandshake, EyeOff, KeyRound } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us & Security Architecture — SecurityTools",
  description:
    "Learn why SecurityTools was created, our zero-log client-side architecture, and how to verify our privacy claims using your browser's Developer Tools."
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-16">
      {/* Hero */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
          <Shield className="w-3.5 h-3.5" />
          <span>Our Mission & Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Cybersecurity Utilities Built on Zero Compromise
        </h1>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          SecurityTools was founded on a simple conviction: <strong>you should never have to transmit your secret credentials to a remote server just to find out if they are secure.</strong>
        </p>
      </div>

      {/* The Problem We Solved */}
      <div className="space-y-4 pt-6 border-t border-slate-800">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          The Hidden Flaw in Traditional Security Tools
        </h2>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          Search the web for &quot;password generator&quot; or &quot;password strength test&quot;, and you will encounter dozens of commercial websites packed with third-party tracking pixels, marketing scripts, and backend API endpoints that receive your inputs.
        </p>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          Even when well-intentioned, server-side tools introduce catastrophic risks: server logging errors, employee snooping, proxy cache leaks, or compliance violations. If a tool transmits your password across HTTP, it has already failed its primary purpose.
        </p>
      </div>

      {/* The 4 Architectural Pillars */}
      <div className="space-y-6 pt-6 border-t border-slate-800">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          The SecurityTools Architecture
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">100% Client-Side Execution</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Every single algorithm—from Shannon entropy calculation to Diceware passphrase assembly—executes solely within your browser&apos;s local sandbox memory.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <KeyRound className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Hardware-Entropy CSPRNG</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              We never use <code className="text-slate-300">Math.random()</code>. All random values use <code className="text-emerald-300">crypto.getRandomValues()</code>, querying your operating system&apos;s cryptographic random pool.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <EyeOff className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Zero Logging or Telemetry</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              We do not track keystrokes, do not run marketing session replays, and do not store password databases. Your memory clears the moment you close the tab.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Free & Ad-Free</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              No banner ads, no paywalls, no affiliate lock-in. We build security tools because we believe private, secure computing is a fundamental digital right.
            </p>
          </div>
        </div>
      </div>

      {/* DevTools Verification Section */}
      <div id="verification" className="pt-6 border-t border-slate-800 space-y-6">
        <div className="flex items-center gap-2">
          <Terminal className="w-6 h-6 text-emerald-400" />
          <h2 className="text-2xl font-bold text-white tracking-tight">
            How to Independently Audit SecurityTools
          </h2>
        </div>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          In cybersecurity, the golden rule is: <em>&quot;Don&apos;t trust, verify.&quot;</em> You can audit our zero-data claim in less than 30 seconds using your browser&apos;s standard Developer Tools:
        </p>

        <ol className="space-y-4 text-xs sm:text-sm text-slate-300 list-decimal list-inside pl-2">
          <li className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <strong>Open Developer Tools:</strong> Press <kbd className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-700 font-mono text-[11px]">F12</kbd> (Windows/Linux) or <kbd className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-700 font-mono text-[11px]">Cmd + Option + I</kbd> (macOS).
          </li>
          <li className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <strong>Switch to the Network tab:</strong> Click on <strong>Network</strong>, then check the &quot;Preserve log&quot; checkbox to record all requests.
          </li>
          <li className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <strong>Interact with the Tools:</strong> Navigate to the <Link href="/tools/password-strength-checker" className="text-emerald-400 underline">Password Strength Checker</Link> or <Link href="/tools/password-generator" className="text-emerald-400 underline">Password Generator</Link>, type a password, and click generate.
          </li>
          <li className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <strong>Inspect Outbound Traffic:</strong> You will observe exactly <strong>zero outgoing network calls</strong>. No POST requests, no analytics payloads, no WebSockets.
          </li>
        </ol>

        <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 text-xs text-emerald-300 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>
            You can even disconnect your internet entirely (turn on Airplane Mode) and all password and passphrase generation will continue to work seamlessly!
          </span>
        </div>
      </div>
    </div>
  );
}
