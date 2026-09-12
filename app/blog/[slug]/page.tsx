import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { BLOG_POSTS, getBlogPost } from "@/lib/blog-data";
import { ArrowLeft, Clock, Calendar, ShieldCheck, Tag, Share2, CheckCircle2 } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "Article Not Found — SecurityTools"
    };
  }

  return {
    title: `${post.title} — SecurityTools Guides`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name]
    }
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  // Parse markdown-style sections for structured reading
  const sections = post.content
    .split("---")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Back button */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors mb-6"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to All Guides</span>
      </Link>

      {/* Article Header */}
      <header className="space-y-4 pb-8 border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-500/20 font-medium">
            {post.category}
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>{post.readTime}</span>
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-400 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>{post.publishedAt}</span>
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
          {post.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
          {post.subtitle}
        </p>

        {/* Author badge */}
        <div className="flex items-center gap-3 pt-2">
          <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xs">
            ST
          </div>
          <div>
            <div className="text-xs font-semibold text-white">{post.author.name}</div>
            <div className="text-[11px] text-slate-400">{post.author.role}</div>
          </div>
        </div>
      </header>

      {/* Zero Storage Disclaimer */}
      <div className="my-8 rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-4 flex items-center gap-3 text-xs text-slate-300">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
        <span>
          <strong>SecurityTools Commitment:</strong> All security tools mentioned in this article are available on our site 100% free, run strictly in client-side browser memory, and never transmit or log your secrets.
        </span>
      </div>

      {/* Article Content Rendered */}
      <div className="prose prose-invert max-w-none space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-4">
            {section.split("\n\n").map((para, pIdx) => {
              const trimmed = para.trim();
              if (trimmed.startsWith("### ")) {
                return (
                  <h2
                    key={pIdx}
                    className="text-xl sm:text-2xl font-bold text-white tracking-tight pt-4 border-t border-slate-800/60 mt-6"
                  >
                    {trimmed.replace("### ", "")}
                  </h2>
                );
              }
              if (trimmed.startsWith("#### ")) {
                return (
                  <h3 key={pIdx} className="text-base sm:text-lg font-bold text-emerald-300 pt-2">
                    {trimmed.replace("#### ", "")}
                  </h3>
                );
              }
              if (trimmed.startsWith("- [ ]") || trimmed.startsWith("- ")) {
                const items = trimmed.split("\n").map((line) => line.replace(/^- (\[ \])?/, "").trim());
                return (
                  <ul key={pIdx} className="space-y-2 pl-2">
                    {items.map((item, liIdx) => (
                      <li key={liIdx} className="flex items-start gap-2 text-slate-300 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              if (trimmed.startsWith("| ")) {
                // simple markdown table parser
                const rows = trimmed.split("\n").filter((r) => !r.includes(":---"));
                if (rows.length > 0) {
                  const headerCols = rows[0].split("|").map((c) => c.trim()).filter(Boolean);
                  const bodyRows = rows.slice(1);
                  return (
                    <div key={pIdx} className="overflow-x-auto my-4">
                      <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
                        <thead className="bg-slate-900 text-slate-200">
                          <tr>
                            {headerCols.map((col, cIdx) => (
                              <th key={cIdx} className="p-3 font-semibold border-b border-slate-800">{col}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                          {bodyRows.map((row, rIdx) => {
                            const cells = row.split("|").map((c) => c.trim()).filter(Boolean);
                            return (
                              <tr key={rIdx} className="hover:bg-slate-900/40">
                                {cells.map((cell, cellIdx) => (
                                  <td key={cellIdx} className="p-3 text-slate-300">{cell}</td>
                                ))}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  );
                }
              }

              return (
                <p key={pIdx} className="text-slate-300 leading-relaxed">
                  {trimmed}
                </p>
              );
            })}
          </div>
        ))}
      </div>

      {/* Tags */}
      <div className="pt-8 mt-12 border-t border-slate-800 flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-500 font-mono flex items-center gap-1 mr-2">
          <Tag className="w-3.5 h-3.5" />
          <span>Filed under:</span>
        </span>
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Next Step / Tools Action Card */}
      <div className="mt-12 rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white">Protect Your Accounts Today</h3>
          <p className="text-xs text-slate-400 mt-1">
            Generate uncrackable passwords or passphrases with our 100% private browser tools.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/tools/password-generator"
            className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-colors"
          >
            Generate Password
          </Link>
          <Link
            href="/tools/passphrase-generator"
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-colors"
          >
            Create Passphrase
          </Link>
        </div>
      </div>
    </div>
  );
}
