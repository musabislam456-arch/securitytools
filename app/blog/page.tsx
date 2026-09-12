import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blog-data";
import { BookOpen, Clock, Tag, ArrowRight, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Cybersecurity Guides & Threat Research — SecurityTools",
  description:
    "Authoritative, practical guides on modern password attacks, 2FA implementations, hashcat GPU cracking, and digital identity defense."
};

export default function BlogIndexPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1.5">
          <BookOpen className="w-4 h-4" />
          <span>Threat Research & Practical Guides</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Understanding Modern Cyber Threats
        </h1>
        <p className="text-slate-400 text-sm sm:text-base mt-2 leading-relaxed">
          In-depth technical guides written for engineers, professionals, and privacy-conscious users. Learn how attackers operate so you can defend your digital identity effectively.
        </p>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {BLOG_POSTS.map((post) => (
          <article
            key={post.slug}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-7 flex flex-col justify-between hover:border-slate-700 hover:bg-slate-900/90 transition-all group shadow-lg"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-500/20 font-medium">
                  {post.category}
                </span>
                <span className="text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{post.readTime}</span>
                </span>
              </div>

              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {post.subtitle}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <div className="text-slate-500">
                <span>By </span>
                <strong className="text-slate-400">{post.author.name}</strong>
              </div>

              <Link
                href={`/blog/${post.slug}`}
                className="font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
              >
                <span>Read Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Security Tools Callout */}
      <div className="mt-16 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Put Theory Into Practice</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white">
            Audit Your Current Passwords Locally
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Test your credentials against our in-browser brute-force and dictionary analysis engine. No data leaves your machine.
          </p>
        </div>

        <Link
          href="/tools/password-strength-checker"
          className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm transition-colors shrink-0 shadow-lg shadow-emerald-500/10"
        >
          Launch Strength Checker →
        </Link>
      </div>
    </div>
  );
}
