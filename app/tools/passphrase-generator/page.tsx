import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { PassphraseGenerator } from "@/components/PassphraseGenerator";
import { Lock, ArrowLeft, BookOpen, CheckCircle2, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Diceware Passphrase Generator (XKCD Method) — SecurityTools",
  description:
    "Generate memorable, high-entropy Diceware passphrases using a clean curated English dictionary. Effortless to memorize, computationally impossible to crack."
};

export default function PassphraseGeneratorPage() {
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
            <Lock className="w-4 h-4" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Diceware Passphrase Generator
          </h1>
        </div>
        <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
          Inspired by Arnold Reinhold&apos;s Diceware protocol and XKCD #936: combine truly random dictionary words into unbreakable passphrases that you can actually visualize and remember.
        </p>
      </div>

      {/* Interactive Tool Component */}
      <PassphraseGenerator />

      {/* Educational & Technical Guide */}
      <div className="pt-8 border-t border-slate-800/80 space-y-8 text-slate-300">
        <div className="max-w-3xl space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            <span>The Science of Human-Memorable Entropy</span>
          </h2>
          <p className="text-sm leading-relaxed text-slate-400">
            For decades, security policies forced employees to construct passwords like <code className="text-slate-200 font-mono">P@$$w0rd99!</code>. These strings are difficult for human brains to remember (leading people to scribble them on sticky notes under keyboards), yet trivially easy for modern cracking tools equipped with rule-based leetspeak mutations.
          </p>
          <p className="text-sm leading-relaxed text-slate-400">
            A <strong>passphrase</strong> shifts the security equation. Instead of scrambling characters, you select words uniformly at random from a large dictionary:
          </p>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs sm:text-sm text-emerald-300 space-y-1">
            <div>Diceware Formula: Entropy = N × log₂(Wordlist Size)</div>
            <div className="text-slate-500 text-xs">
              4 Words from ~1,200 list ≈ 42-45 bits | 5 Words ≈ 55-60 bits | 6 Words ≈ 70+ bits
            </div>
          </div>
        </div>

        {/* Comparison Matrix */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-900 text-slate-300 font-semibold border-b border-slate-800">
              <tr>
                <th className="p-3">Method</th>
                <th className="p-3">Example</th>
                <th className="p-3">Entropy</th>
                <th className="p-3">Human Memory</th>
                <th className="p-3">Offline Crack Time (100B/s)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-400">
              <tr className="bg-slate-950/40">
                <td className="p-3 font-medium text-red-400">Short &quot;Complex&quot;</td>
                <td className="p-3 font-mono text-slate-300">J#8k!2</td>
                <td className="p-3 font-mono">~35 bits</td>
                <td className="p-3 text-red-400">Poor</td>
                <td className="p-3 text-red-400 font-bold">&lt; 1 second</td>
              </tr>
              <tr className="bg-slate-950/40">
                <td className="p-3 font-medium text-amber-400">Typical Leetspeak</td>
                <td className="p-3 font-mono text-slate-300">S@fe2025!</td>
                <td className="p-3 font-mono">~30-40 bits (rules)</td>
                <td className="p-3 text-amber-400">Moderate</td>
                <td className="p-3 text-amber-400 font-bold">Minutes (Rule attack)</td>
              </tr>
              <tr className="bg-slate-950/40">
                <td className="p-3 font-medium text-emerald-400">4-Word Passphrase</td>
                <td className="p-3 font-mono text-emerald-300">Cedar-Lagoon-Falcon-Stone</td>
                <td className="p-3 font-mono">~45-52 bits</td>
                <td className="p-3 text-emerald-400">High (Visual)</td>
                <td className="p-3 text-emerald-400 font-bold">Years</td>
              </tr>
              <tr className="bg-slate-950/40">
                <td className="p-3 font-medium text-emerald-300">5-Word Passphrase</td>
                <td className="p-3 font-mono text-emerald-300">Summit-Willow-Beacon-Jasper-Wave</td>
                <td className="p-3 font-mono">~60-70 bits</td>
                <td className="p-3 text-emerald-300">Very High</td>
                <td className="p-3 text-emerald-300 font-bold">Centuries</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
