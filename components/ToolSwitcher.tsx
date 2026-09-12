"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Shield, KeyRound, Lock, ExternalLink } from "lucide-react";
import { PasswordChecker } from "@/components/PasswordChecker";
import { PasswordGenerator } from "@/components/PasswordGenerator";
import { PassphraseGenerator } from "@/components/PassphraseGenerator";

export type ToolType = "checker" | "password-gen" | "passphrase-gen";

interface ToolSwitcherProps {
  initialTool?: ToolType;
}

export function ToolSwitcher({ initialTool = "checker" }: ToolSwitcherProps) {
  const [activeTool, setActiveTool] = useState<ToolType>(initialTool);

  const tools = [
    {
      id: "checker" as ToolType,
      name: "Strength Checker",
      badge: "Crack-Time",
      icon: Shield,
      href: "/tools/password-strength-checker"
    },
    {
      id: "password-gen" as ToolType,
      name: "Password Generator",
      badge: "CSPRNG",
      icon: KeyRound,
      href: "/tools/password-generator"
    },
    {
      id: "passphrase-gen" as ToolType,
      name: "Passphrase Generator",
      badge: "Diceware",
      icon: Lock,
      href: "/tools/passphrase-generator"
    }
  ];

  return (
    <div className="w-full space-y-6" id="interactive-security-tool-suite">
      {/* Tab Navigation Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl">
        <div className="grid grid-cols-3 gap-1 w-full sm:w-auto">
          {tools.map((tool) => {
            const Icon = tool.icon;
            const isSelected = activeTool === tool.id;
            return (
              <button
                key={tool.id}
                type="button"
                onClick={() => setActiveTool(tool.id)}
                className={`flex items-center justify-center sm:justify-start gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isSelected
                    ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isSelected ? "text-slate-950" : "text-emerald-400"}`} />
                <span className="truncate">{tool.name}</span>
              </button>
            );
          })}
        </div>

        {/* Link to dedicated standalone page */}
        <div className="px-2 pb-1 sm:pb-0 text-right">
          <Link
            href={
              activeTool === "checker"
                ? "/tools/password-strength-checker"
                : activeTool === "password-gen"
                ? "/tools/password-generator"
                : "/tools/passphrase-generator"
            }
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 font-medium transition-colors"
          >
            <span>Open Dedicated Tool Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Active Tool View */}
      <div className="transition-opacity duration-200">
        {activeTool === "checker" && <PasswordChecker />}
        {activeTool === "password-gen" && <PasswordGenerator />}
        {activeTool === "passphrase-gen" && <PassphraseGenerator />}
      </div>
    </div>
  );
}
