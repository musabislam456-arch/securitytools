import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Shield, FileCheck, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service — SecurityTools",
  description:
    "Terms of service, mathematical estimate disclaimers, and acceptable use guidelines for SecurityTools."
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
          <FileCheck className="w-3.5 h-3.5" />
          <span>Legal Terms</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Terms of Service
        </h1>
        <p className="text-slate-400 text-sm">
          Effective date: March 2026
        </p>
      </div>

      <div className="space-y-8 text-slate-300 text-sm sm:text-base leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white tracking-tight">
            1. Acceptance of Terms
          </h2>
          <p className="text-slate-400 text-sm">
            By accessing and using SecurityTools (&quot;the Service&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the utilities provided on this website.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white tracking-tight">
            2. Permitted Use
          </h2>
          <p className="text-slate-400 text-sm">
            SecurityTools grants you a free, non-exclusive, worldwide license to utilize our client-side utilities (Password Strength Checker, Password Generator, Passphrase Generator) for personal, educational, commercial, or enterprise purposes. You may use our generated passwords for any accounts, systems, or deployments without royalty.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white tracking-tight">
            3. Disclaimer Regarding Mathematical Crack-Time Estimates
          </h2>
          <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>Important Security Disclaimer</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Crack-time estimations, Shannon entropy scores, and vulnerability evaluations provided by SecurityTools are mathematical approximations based on current publicly documented hardware capabilities (e.g. GPU compute clusters, Hashcat benchmarks). 
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              No mathematical formula can protect credentials against: (a) malware, spyware, or hardware keyloggers installed on your device; (b) social engineering or phishing attacks; (c) compromised browser extensions; or (d) future algorithmic breakthroughs in cryptanalysis. You remain solely responsible for overall account security and should always pair strong passwords with multi-factor authentication (MFA).
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white tracking-tight">
            4. Zero Warranty & Limitation of Liability
          </h2>
          <p className="text-slate-400 text-sm">
            The Service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind, whether express or implied. Under no circumstances shall SecurityTools or its contributors be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use this service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white tracking-tight">
            5. Modifications to the Service
          </h2>
          <p className="text-slate-400 text-sm">
            We reserve the right to modify, update, or discontinue any feature of SecurityTools at any time without prior notice.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white tracking-tight">
            6. Inquiries
          </h2>
          <p className="text-slate-400 text-sm">
            Questions regarding our terms of service may be submitted through our{" "}
            <Link href="/contact" className="text-emerald-400 underline hover:text-emerald-300">
              Contact Page
            </Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
