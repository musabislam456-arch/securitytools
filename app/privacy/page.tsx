import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock, Cpu, EyeOff, FileText, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Zero-Log Privacy Policy — SecurityTools",
  description:
    "Our ironclad zero-data privacy commitment: SecurityTools runs 100% client-side in your browser. We never store, log, or transmit passwords."
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Privacy Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Zero-Log Privacy Policy
        </h1>
        <p className="text-slate-400 text-sm">
          Last updated & audited: March 2026
        </p>
      </div>

      {/* Summary Box */}
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-6 space-y-3">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
          <Lock className="w-4 h-4" />
          <span>Executive Summary: Zero Passwords Stored, Ever</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
          SecurityTools is engineered from the ground up as a <strong>100% client-side zero-knowledge application</strong>. When you test a password in our strength checker, generate a random password, or create a Diceware passphrase, <strong>zero bytes of that data ever leave your web browser</strong>. We cannot see, log, store, or sell your passwords because we never receive them.
        </p>
      </div>

      {/* Detailed Sections */}
      <div className="space-y-8 text-slate-300 text-sm sm:text-base leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white tracking-tight">
            1. Data You Process in Our Tools
          </h2>
          <p className="text-slate-400 text-sm">
            All text inputs, evaluated passwords, entropy computations, Diceware seed words, and generated credentials exist solely in your computer’s temporary volatile RAM memory. The moment you refresh the page or close your browser tab, all traces of that data are completely wiped from your machine’s memory.
          </p>
          <ul className="text-xs sm:text-sm text-slate-400 space-y-1.5 list-disc list-inside">
            <li>No keystrokes are transmitted over any network socket or HTTP request.</li>
            <li>No password hashes or plaintext values are sent to any remote API.</li>
            <li>No local storage (localStorage / IndexedDB) is used to persist credentials.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white tracking-tight">
            2. Web Cryptography API & Local Execution
          </h2>
          <p className="text-slate-400 text-sm">
            All random number generation utilizes <code className="text-emerald-300 font-mono text-xs">window.crypto.getRandomValues()</code>, a W3C standardized API executed locally by your web browser engine (V8, WebKit, or Gecko). This uses hardware entropy generated directly by your device’s operating system kernel.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white tracking-tight">
            3. Cookies & Tracking Pixels
          </h2>
          <p className="text-slate-400 text-sm">
            SecurityTools does not use third-party advertising cookies, social media tracking pixels (Facebook/Meta, TikTok, LinkedIn), or invasive session replay tools (such as Hotjar or FullStory). We do not build user behavioral profiles or monetize your browsing activity.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white tracking-tight">
            4. Web Server Logs (Static Hosting)
          </h2>
          <p className="text-slate-400 text-sm">
            Like all websites, the edge delivery network (CDN) that hosts our static HTML and JavaScript assets automatically records standard technical connection metadata in ephemeral access logs (such as IP address, user-agent string, and requested static file URL). These logs are used strictly for DDoS mitigation and infrastructure security and are automatically purged. <strong>These edge logs never contain your tool inputs or passwords.</strong>
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white tracking-tight">
            5. Independent Verification
          </h2>
          <p className="text-slate-400 text-sm">
            You do not need to take our word for granted. You can inspect the source code in your browser, audit outbound traffic in your Developer Tools Network tab, or disconnect your internet connection (Airplane Mode) and use every tool on this site with full functionality.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white tracking-tight">
            6. Contacting the Privacy Officer
          </h2>
          <p className="text-slate-400 text-sm">
            If you have questions about our zero-log architecture, please reach out through our{" "}
            <Link href="/contact" className="text-emerald-400 underline hover:text-emerald-300">
              Contact Page
            </Link>{" "}
            or email our security team directly.
          </p>
        </section>
      </div>
    </div>
  );
}
