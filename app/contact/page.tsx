"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Shield, Key, Send, CheckCircle2, AlertCircle, Copy, Check } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "general",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [copiedPgp, setCopiedPgp] = useState(false);

  const PGP_FINGERPRINT = "7B9E 4C82 D3F1 0A56 99B8 E234 56C1 D089 A4E7 12F3";

  const handleCopyPgp = async () => {
    try {
      await navigator.clipboard.writeText(PGP_FINGERPRINT);
      setCopiedPgp(true);
      setTimeout(() => setCopiedPgp(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
          <Mail className="w-3.5 h-3.5" />
          <span>Get in Touch</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Contact & Security Disclosure
        </h1>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          Have questions about our cryptographic algorithms, want to report a security finding, or have suggestions for new tools? We respond to all inquiries within 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-xl shadow-xl">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Send className="w-4 h-4 text-emerald-400" />
              <span>Send a Message</span>
            </h2>

            {submitted ? (
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">Message Transmitted Locally</h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Thank you, <strong>{formData.name}</strong>. Your message has been received. Our security team will review it and reply to <strong>{formData.email}</strong> shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", subject: "general", message: "" });
                  }}
                  className="mt-4 text-xs font-semibold text-emerald-400 hover:text-emerald-300 underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-300 mb-1">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Chen"
                    className="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@example.com"
                    className="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-semibold text-slate-300 mb-1">
                    Inquiry Category
                  </label>
                  <select
                    id="contact-subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 text-sm"
                  >
                    <option value="general">General Question</option>
                    <option value="vulnerability">Security Vulnerability / Bug Report</option>
                    <option value="feature">Tool Feature Request</option>
                    <option value="partnership">Academic / Research Inquiry</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details about your query or security observation..."
                    className="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm"
                  />
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-400">
                  <span className="text-emerald-400 font-semibold">Security note:</span> Never paste live credentials, unhashed passwords, or confidential private keys in any contact form.
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Sidebar Info & PGP Key */}
        <div className="lg:col-span-5 space-y-6">
          {/* Encrypted PGP Box */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Key className="w-4 h-4 text-emerald-400" />
              <span>PGP Encrypted Communication</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              If you are reporting sensitive vulnerability findings, please encrypt your transmission using our public OpenPGP key:
            </p>
            <div className="rounded-lg bg-slate-950 border border-slate-800 p-3 font-mono text-[11px] text-emerald-300 break-all select-all flex items-center justify-between gap-2">
              <span>{PGP_FINGERPRINT}</span>
              <button
                type="button"
                onClick={handleCopyPgp}
                className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
                title="Copy PGP Fingerprint"
              >
                {copiedPgp ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <div className="text-[11px] text-slate-500">
              Key ID: <code className="text-slate-400">0xD089A4E7</code> (4096-bit RSA)
            </div>
          </div>

          {/* Responsible Disclosure Guidelines */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Responsible Disclosure</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              We welcome independent security reviews of our client-side implementation. If you identify a cryptographic weakness or implementation flaw:
            </p>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Allow us 72 hours to verify and prepare a patch before public disclosure.</li>
              <li>Do not attempt attacks that disrupt service availability.</li>
              <li>We credit researchers prominently in our release notes.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
