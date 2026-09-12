import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { PasswordGenerator } from "@/components/PasswordGenerator";
import { KeyRound, ArrowLeft, BookOpen, ShieldCheck, Lock, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Random Password Generator (Cryptographically Secure CSPRNG) — SecurityTools",
  description:
    "Generate uncrackable, cryptographically secure random passwords using the Web Cryptography API. Supports custom lengths up to 64 chars, bulk mode, and ambiguous character filtering."
};

export default function PasswordGeneratorPage() {
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
            <KeyRound className="w-4 h-4" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Cryptographic Random Password Generator
          </h1>
        </div>
        <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
          Create uncrackable passwords backed by hardware entropy via <code className="text-emerald-300 font-mono text-xs">window.crypto.getRandomValues()</code>. Fully customizable lengths, bulk generation mode, and zero network transmission.
        </p>
      </div>

      {/* Interactive Tool Component */}
      <PasswordGenerator />

      {/* Educational & Technical Guide */}
      <div className="pt-8 border-t border-slate-800/80 space-y-8 text-slate-300">
        <div className="max-w-3xl space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            <span>Why True Cryptographic Randomness Matters</span>
          </h2>
          <p className="text-sm leading-relaxed text-slate-400">
            Many websites use JavaScript&apos;s built-in <code className="text-slate-200">Math.random()</code> to generate passwords. This is a severe security vulnerability.
          </p>
          <p className="text-sm leading-relaxed text-slate-400">
            <code className="text-slate-200">Math.random()</code> uses pseudo-random number algorithms (like XorShift128+) designed for graphical games and simulations, not cryptography. An attacker observing a sequence of generated values can reconstruct the internal PRNG state and accurately predict future passwords.
          </p>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs sm:text-sm">
            <div className="text-emerald-400 font-semibold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>How SecurityTools Implements CSPRNG</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              We exclusively use the <strong>Web Cryptography API</strong> (<code className="text-emerald-300 font-mono">crypto.getRandomValues</code>). This interface queries your operating system&apos;s kernel entropy pool—aggregating thermal sensor noise, interrupt timing, and hardware CPU instructions (such as Intel RDRAND / AMD RdRand)—ensuring cryptographically uniform distribution and zero predictability.
            </p>
          </div>
        </div>

        {/* Enterprise Password Management Tips */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <span className="font-bold text-white text-sm block">1. 16+ Characters for Accounts</span>
            <p className="text-slate-400 leading-relaxed">
              Standard consumer and enterprise accounts should use a 16 to 20-character random string stored inside a zero-knowledge password manager.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <span className="font-bold text-white text-sm block">2. 24-32 Chars for Master Vaults</span>
            <p className="text-slate-400 leading-relaxed">
              For root accounts, AWS/GCP admin keys, and encrypted disk volumes, use 24 to 32 characters or a 6-word Diceware passphrase.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <span className="font-bold text-white text-sm block">3. One Password, One Service</span>
            <p className="text-slate-400 leading-relaxed">
              Credential stuffing bots exploit reused passwords. If a random password on one service is breached, none of your other accounts are at risk.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
