import React from "react";
import Link from "next/link";
import { Shield, Lock, Terminal, HeartHandshake, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer id="main-site-footer" className="border-t border-slate-800/80 bg-slate-950 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-bold tracking-tight text-white text-lg">
                Security<span className="text-emerald-400">Tools</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Free, client-side cybersecurity utilities designed to protect your digital identity without sacrificing your privacy. We mathematically analyze and generate secure credentials strictly in your browser.
            </p>
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-950/20 p-3 max-w-sm">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5" />
                <span>Zero-Knowledge Promise</span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                We never store, log, or transmit your passwords. All entropy calculations and random generation run locally in your browser memory.
              </p>
            </div>
          </div>

          {/* Security Tools */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-200 font-semibold">
              Security Tools
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/tools/password-strength-checker"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1 group"
                >
                  <span>Strength Checker</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/password-generator"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1 group"
                >
                  <span>Password Generator</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/passphrase-generator"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1 group"
                >
                  <span>Passphrase Generator</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/tools"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1 group text-emerald-400/90"
                >
                  <span>All Tools Directory</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Guides & Research */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-200 font-semibold">
              Guides & Education
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/blog/how-hackers-crack-weak-passwords"
                  className="hover:text-emerald-400 transition-colors"
                >
                  How Hackers Crack Passwords
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/2fa-explained-simply"
                  className="hover:text-emerald-400 transition-colors"
                >
                  2FA Explained Simply
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/passwords-vs-passphrases-vs-passkeys"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Passwords vs. Passkeys
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-emerald-400 transition-colors text-emerald-400/90"
                >
                  View All Guides →
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Trust */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-200 font-semibold">
              Trust & Legal
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                  About Us & Architecture
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-emerald-400 transition-colors">
                  Zero-Log Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-emerald-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors">
                  Contact & Security Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/80 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-500" />
            <span>© 2026 SecurityTools. Free & open cybersecurity tools for everyone.</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-400">
              <HeartHandshake className="w-3.5 h-3.5 text-emerald-400" />
              <span>Independent & Ad-Free</span>
            </span>
            <span>•</span>
            <span>NIST SP 800-63B Compliant Principles</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
