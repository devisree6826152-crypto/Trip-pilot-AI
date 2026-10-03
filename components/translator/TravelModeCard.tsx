"use client";

import React, { useState } from "react";
import { useRoamwiseStore } from "@/store/useRoamwiseStore";
import { SITUATION_PHRASES, SUPPORTED_LANGUAGES } from "@/lib/data/translationData";
import {
  Globe,
  Sparkles,
  MapPin,
  Calendar,
  Volume2,
  Copy,
  Check,
  Zap,
  ArrowRight,
} from "lucide-react";

interface Props {
  userLang: string;
  localLang: string;
}

export function TravelModeCard({ userLang, localLang }: Props) {
  const { activeTrip, activeDayIndex, showToast } = useRoamwiseStore();

  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Get current day and current upcoming activity
  const currentDay = activeTrip.days.find((d) => d.dayIndex === activeDayIndex) || activeTrip.days[0];
  const activeActivity =
    currentDay.activities.find((a) => a.status === "upcoming") || currentDay.activities[0];

  // Match activity category to situation phrases
  const contextCategory =
    activeActivity.category === "Food"
      ? "Restaurant"
      : activeActivity.category === "Transport"
      ? "Taxi"
      : activeActivity.category === "Beaches" || activeActivity.category === "Nature"
      ? "Directions"
      : "General";

  const contextPhrases = SITUATION_PHRASES.filter(
    (p) => p.category === contextCategory || p.category === "Restaurant"
  ).slice(0, 3);

  const targetLangObj =
    SUPPORTED_LANGUAGES.find((l) => l.name.toLowerCase().includes(localLang.toLowerCase())) ||
    SUPPORTED_LANGUAGES.find((l) => l.code === "ja")!;

  const handleSpeak = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
      showToast("Playing Audio 🔊", `Speaking "${text}"`);
    } else {
      showToast("Audio Player", text, "info");
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast("Copied to Clipboard!", "Show this text to a local person.");
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-teal-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-300 bg-teal-500/20 px-3 py-1 rounded-full border border-teal-500/30 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
              <span>LIVE TRAVEL MODE</span>
            </span>
            <span className="text-xs text-slate-300">
              Synced with {activeTrip.destination}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Context-Aware Travel Companion
          </h2>
        </div>

        <div className="flex items-center gap-2 bg-slate-850 px-3.5 py-1.5 rounded-xl border border-slate-700 text-xs font-bold text-slate-200">
          <span>{userLang}</span>
          <ArrowRight className="w-3.5 h-3.5 text-teal-400" />
          <span className="text-teal-300 font-extrabold">{localLang}</span>
        </div>
      </div>

      {/* Itinerary Context Callout Box */}
      <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/20 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-teal-300">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-teal-400" />
            <span>Active Itinerary Activity (Day {activeDayIndex})</span>
          </span>
          <span className="font-mono text-teal-200">{activeActivity.time}</span>
        </div>

        <div className="text-base font-extrabold text-white">
          {activeActivity.title}
        </div>
        <p className="text-xs text-slate-300 line-clamp-1">
          📍 {activeActivity.location} · Category: {activeActivity.category}
        </p>
      </div>

      {/* Auto-Suggested Phrases for Current Activity */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">
          « Auto-Suggested Phrases for {activeActivity.category} »
        </h4>

        <div className="space-y-2.5">
          {contextPhrases.map((phrase) => {
            const trData = phrase.translations[targetLangObj.code] || {
              text: `[${localLang}] ${phrase.english}`,
              pronunciation: phrase.english,
            };

            return (
              <div
                key={phrase.id}
                className="p-4 rounded-2xl bg-slate-850 border border-slate-750 hover:border-teal-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-0.5">
                  <div className="text-xs font-semibold text-slate-300">
                    "{phrase.english}"
                  </div>
                  <div className="text-base font-extrabold text-teal-300">
                    {trData.text}
                  </div>
                  {trData.pronunciation && (
                    <div className="text-[11px] italic text-slate-400">
                      Pronunciation: {trData.pronunciation}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleSpeak(trData.text)}
                    className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition-colors"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Listen 🔊</span>
                  </button>

                  <button
                    onClick={() => handleCopy(phrase.id, trData.text)}
                    className="p-1.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white"
                  >
                    {copiedId === phrase.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
