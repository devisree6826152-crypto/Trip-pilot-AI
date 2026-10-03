"use client";

import React from "react";
import { SUPPORTED_LANGUAGES, DESTINATION_LANGUAGE_MAP } from "@/lib/data/translationData";
import { useRoamwiseStore } from "@/store/useRoamwiseStore";
import { ArrowLeftRight, Globe, Sparkles, MapPin } from "lucide-react";

interface Props {
  userLang: string;
  localLang: string;
  onUserLangChange: (lang: string) => void;
  onLocalLangChange: (lang: string) => void;
}

export function LanguageSelector({
  userLang,
  localLang,
  onUserLangChange,
  onLocalLangChange,
}: Props) {
  const activeTrip = useRoamwiseStore((state) => state.activeTrip);

  // Determine suggested language for active trip destination
  const destKey = activeTrip.destination.toLowerCase();
  const matchedLangInfo =
    Object.entries(DESTINATION_LANGUAGE_MAP).find(([k]) => destKey.includes(k))?.[1] ||
    DESTINATION_LANGUAGE_MAP["goa"];

  const handleSwap = () => {
    const temp = userLang;
    onUserLangChange(localLang);
    onLocalLangChange(temp);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-border/80 p-4 sm:p-5 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* User Language Selector */}
        <div className="flex-1 w-full space-y-1">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-teal-600" />
            <span>My Language</span>
          </label>
          <select
            value={userLang}
            onChange={(e) => onUserLangChange(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-2xl border border-border bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.name}>
                {lang.flag} {lang.name} {lang.nativeName ? `(${lang.nativeName})` : ""}
              </option>
            ))}
          </select>
        </div>

        {/* Swap Button */}
        <button
          onClick={handleSwap}
          className="w-10 h-10 rounded-2xl border border-border bg-slate-100 dark:bg-slate-800 hover:bg-teal-500/10 hover:border-teal-500/40 text-slate-700 dark:text-slate-300 flex items-center justify-center transition-all shrink-0 self-center"
          title="Swap Languages"
        >
          <ArrowLeftRight className="w-4 h-4 text-teal-600" />
        </button>

        {/* Local Target Language Selector */}
        <div className="flex-1 w-full space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span>Local Language</span>
            </label>
            <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
              Suggested for {activeTrip.destination.split(",")[0]}
            </span>
          </div>
          <select
            value={localLang}
            onChange={(e) => onLocalLangChange(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-2xl border border-border bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.name}>
                {lang.flag} {lang.name} {lang.nativeName ? `(${lang.nativeName})` : ""}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
