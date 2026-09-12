import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  KeyRound,
  Lock,
  Cpu,
  WifiOff,
  Database,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Terminal,
  FileCode2,
  ExternalLink
} from "lucide-react";
import { ToolSwitcher } from "@/components/ToolSwitcher";
import { BLOG_POSTS } from "@/lib/blog-data";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-slate-800/80">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14 space-y-4">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Client-Side • Zero Data Transmission</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Cryptographic Utilities You Can{" "}
              <span className="text-emerald-400">Actually Trust</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Verify brute-force crack times, generate cryptographically secure passwords, and build memorable Diceware passphrases.{" "}
              <strong className="text-emerald-300 font-medium">We never see, log, or store your passwords</strong> — all computations run in your local browser sandbox.
            </p>

            {/* Quick Metrics Bar */}
            <div className="pt-2 flex items-center justify-center gap-6 sm:gap-10 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Web Crypto API</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Zero Server Calls</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Works Offline</span>
              </div>
            </div>
          </div>

          {/* Interactive Tools Suite Component (Home Page Sandbox) */}
          <div className="max-w-4xl mx-auto">
            <ToolSwitcher initialTool="checker" />
          </div>
        </div>
      </section>

      {/* Trust & Architecture Section: Why Client-Side Matters */}
      <section className="py-16 md:py-24 border-b border-slate-800/80 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              The Architecture of True Privacy
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              Most online &quot;password strength checkers&quot; send your keystrokes across the internet to an analytics server. Here is how SecurityTools is fundamentally engineered differently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                In-Browser Memory Execution
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                All entropy calculations, dictionary matching, and crack-time evaluations happen within the JavaScript V8 / JavaScriptCore runtime of your own machine. Nothing is transmitted over HTTP.
              </p>
              <div className="pt-2 text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>0 bytes sent outbound</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <KeyRound className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                Cryptographic CSPRNG
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                We reject standard pseudo-random functions like <code className="text-slate-300">Math.random()</code>. All random strings are generated via <code className="text-emerald-300">window.crypto.getRandomValues()</code>, harnessing hardware entropy from your CPU.
              </p>
              <div className="pt-2 text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>FIPS & NIST CSPRNG compliant</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <WifiOff className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                Air-Gapped Capable
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                You can turn on Airplane Mode, unplug your Ethernet cable, or disable Wi-Fi right now. Every tool on SecurityTools will continue generating passwords and evaluating strength with full functionality.
              </p>
              <div className="pt-2 text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Inspect in browser DevTools</span>
              </div>
            </div>
          </div>

          {/* DevTools Verification Banner */}
          <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-950 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">
                  Don&apos;t Take Our Word For It — Verify Yourself
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Press <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300 font-mono text-[11px]">F12</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300 font-mono text-[11px]">Ctrl+Shift+I</kbd>, open the <strong>Network</strong> tab, and test a password. You will observe exactly zero requests.
                </p>
              </div>
            </div>

            <Link
              href="/about#verification"
              className="text-xs font-semibold px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors shrink-0 flex items-center gap-1.5"
            >
              <span>Audit Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Educational Blog Section */}
      <section className="py-16 md:py-24 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
                Knowledge Base & Threat Research
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Cybersecurity Guides & Threat Analysis
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Authoritative, jargon-free explanations of modern attacks and defense methodologies.
              </p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors self-start md:self-end"
            >
              <span>View All Research Articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post) => (
              <article
                key={post.slug}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between hover:border-slate-700 hover:bg-slate-900 transition-all group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-500/20 font-medium">
                      {post.category}
                    </span>
                    <span className="text-slate-500">{post.readTime}</span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-500">{post.publishedAt}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs font-semibold text-emerald-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ / Trust Guarantee */}
      <section className="py-16 md:py-20 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Frequently Asked Security Questions
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Clear answers regarding privacy, encryption standards, and password security.
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Can SecurityTools see what I type into the checker?</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                No. Zero network requests occur when you enter or generate a password. You can inspect the network activity in your browser&apos;s Developer Tools or disconnect from the internet entirely while using this tool.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>How are crack-times estimated?</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                Crack times are calculated using Shannon entropy principles ($E = L \times \log_2(R)$) mapped across real-world attacker hash-rate benchmarks: from rate-limited web login throttling (100 guesses/sec) to modern high-density GPU clusters (8x RTX 4090 rigs testing 100 billion hashes per second on fast hashes like MD5/NTLM).
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Why do passphrases often provide better protection than passwords?</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                Passphrases combine multiple random dictionary words (Diceware). A 5-word passphrase has roughly 65-75 bits of mathematical entropy, requiring thousands of years to crack even on dedicated supercomputers, while remaining easy for human memory to retain without relying on insecure paper sticky notes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
