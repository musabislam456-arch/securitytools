"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, KeyRound, Lock, Menu, X, ChevronDown, CheckCircle2 } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  const toolLinks = [
    {
      name: "Password Strength Checker",
      href: "/tools/password-strength-checker",
      desc: "Instant brute-force crack-time & entropy analysis",
      icon: Shield
    },
    {
      name: "Random Password Generator",
      href: "/tools/password-generator",
      desc: "Cryptographic CSPRNG custom passwords with bulk mode",
      icon: KeyRound
    },
    {
      name: "Passphrase Generator",
      href: "/tools/passphrase-generator",
      desc: "Diceware-inspired memorable, high-entropy phrases",
      icon: Lock
    }
  ];

  return (
    <header
      id="main-navigation-header"
      className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link
            href="/"
            id="nav-brand-logo-link"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20 group-hover:border-emerald-400 transition-colors">
              <Shield className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold tracking-tight text-white text-lg">
                  Security<span className="text-emerald-400">Tools</span>
                </span>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="System Operational" />
              </div>
              <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">
                Zero-Knowledge Utilities
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-300">
            {/* Tools Menu with Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setToolsDropdownOpen(true)}
              onMouseLeave={() => setToolsDropdownOpen(false)}
            >
              <button
                id="nav-tools-dropdown-btn"
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                  isActive("/tools")
                    ? "text-emerald-400 bg-slate-900/80 font-semibold"
                    : "hover:text-white hover:bg-slate-900/60"
                }`}
              >
                <span>Security Tools</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    toolsDropdownOpen ? "rotate-180 text-emerald-400" : ""
                  }`}
                />
              </button>

              {/* Dropdown Panel */}
              {toolsDropdownOpen && (
                <div
                  id="nav-tools-dropdown-menu"
                  className="absolute left-0 top-full pt-2 w-80 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="p-2 rounded-xl border border-slate-800 bg-slate-900/95 backdrop-blur-xl shadow-2xl">
                    <div className="px-3 py-2 text-[11px] font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800/80 mb-1 flex items-center justify-between">
                      <span>Core Utilities</span>
                      <span className="text-emerald-400">100% Client-Side</span>
                    </div>
                    {toolLinks.map((tool) => {
                      const Icon = tool.icon;
                      return (
                        <Link
                          key={tool.href}
                          href={tool.href}
                          onClick={() => setToolsDropdownOpen(false)}
                          className={`flex items-start gap-3 p-2.5 rounded-lg transition-colors group ${
                            pathname === tool.href
                              ? "bg-emerald-500/10 text-emerald-300"
                              : "hover:bg-slate-800/70 text-slate-200"
                          }`}
                        >
                          <div className="p-2 rounded-md bg-slate-950 border border-slate-800 group-hover:border-emerald-500/40 text-emerald-400 shrink-0 mt-0.5">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-semibold text-sm group-hover:text-emerald-300">
                              {tool.name}
                            </div>
                            <div className="text-xs text-slate-400 mt-0.5">
                              {tool.desc}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                    <div className="pt-2 mt-1 border-t border-slate-800/80">
                      <Link
                        href="/tools"
                        onClick={() => setToolsDropdownOpen(false)}
                        className="block px-3 py-1.5 text-xs text-center font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                      >
                        View All Tools & Specifications →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/blog"
              id="nav-blog-link"
              className={`px-3 py-2 rounded-lg transition-colors ${
                isActive("/blog")
                  ? "text-emerald-400 bg-slate-900/80 font-semibold"
                  : "hover:text-white hover:bg-slate-900/60"
              }`}
            >
              Blog & Guides
            </Link>

            <Link
              href="/about"
              id="nav-about-link"
              className={`px-3 py-2 rounded-lg transition-colors ${
                isActive("/about")
                  ? "text-emerald-400 bg-slate-900/80 font-semibold"
                  : "hover:text-white hover:bg-slate-900/60"
              }`}
            >
              About Us
            </Link>

            <Link
              href="/contact"
              id="nav-contact-link"
              className={`px-3 py-2 rounded-lg transition-colors ${
                isActive("/contact")
                  ? "text-emerald-400 bg-slate-900/80 font-semibold"
                  : "hover:text-white hover:bg-slate-900/60"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Right Trust Badge */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 text-emerald-300 text-xs font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Zero-Log Memory Execution</span>
            </div>
            <Link
              href="/tools/password-strength-checker"
              id="nav-cta-checker"
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors shadow-sm"
            >
              Check Password
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              id="nav-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          id="nav-mobile-menu-panel"
          className="md:hidden border-b border-slate-800 bg-slate-950 px-4 pt-2 pb-6 space-y-3"
        >
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 px-2 pt-2">
            Security Tools
          </div>
          <div className="grid gap-1 pl-2">
            {toolLinks.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-3 rounded-lg text-sm flex items-center gap-2 ${
                  pathname === tool.href
                    ? "text-emerald-400 bg-slate-900 font-semibold"
                    : "text-slate-300 hover:bg-slate-900/60"
                }`}
              >
                <tool.icon className="w-4 h-4 text-emerald-400" />
                <span>{tool.name}</span>
              </Link>
            ))}
          </div>

          <div className="border-t border-slate-800 pt-3 space-y-1">
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 px-3 rounded-lg text-sm text-slate-300 hover:bg-slate-900"
            >
              Blog & Security Guides
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 px-3 rounded-lg text-sm text-slate-300 hover:bg-slate-900"
            >
              About SecurityTools
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 px-3 rounded-lg text-sm text-slate-300 hover:bg-slate-900"
            >
              Contact & Security Disclosure
            </Link>
            <Link
              href="/privacy"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 px-3 rounded-lg text-sm text-slate-300 hover:bg-slate-900"
            >
              Privacy Policy (Zero-Log)
            </Link>
          </div>

          <div className="pt-2">
            <div className="px-3 py-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>We never store or transmit your passwords. 100% in-browser.</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
