"use client";

import React, { useState } from "react";
import { SITUATION_PHRASES, SUPPORTED_LANGUAGES } from "@/lib/data/translationData";
import { useRoamwiseStore } from "@/store/useRoamwiseStore";
import { playSpeechAudio } from "@/lib/utils/audioSpeech";
import {
  Utensils,
  Hotel,
  Car,
  Train,
  Plane,
  ShoppingBag,
  Compass,
  AlertTriangle,
  Stethoscope,
  MessageSquare,
  Volume2,
  Copy,
  Check,
  Search,
  ShieldAlert,
  VolumeX,
} from "lucide-react";

interface Props {
  userLang: string;
  localLang: string;
}

const CATEGORIES = [
  { id: "All", label: "All Situations", icon: MessageSquare },
  { id: "Restaurant", label: "🍽️ Restaurant", icon: Utensils },
  { id: "Hotel", label: "🏨 Hotel", icon: Hotel },
  { id: "Taxi", label: "🚕 Taxi", icon: Car },
  { id: "Train", label: "🚆 Train", icon: Train },
  { id: "Airport", label: "✈️ Airport", icon: Plane },
  { id: "Shopping", label: "🛍️ Shopping", icon: ShoppingBag },
  { id: "Directions", label: "🗺️ Directions", icon: Compass },
  { id: "Emergency", label: "🚨 Emergency", icon: AlertTriangle },
  { id: "Medical", label: "💊 Medical", icon: Stethoscope },
  { id: "General", label: "🤝 General", icon: MessageSquare },
];

export function TravelPhraseAssistant({ userLang, localLang }: Props) {
  const showToast = useRoamwiseStore((state) => state.showToast);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const targetLangObj =
    SUPPORTED_LANGUAGES.find((l) => l.name.toLowerCase().includes(localLang.toLowerCase())) ||
    SUPPORTED_LANGUAGES.find((l) => l.code === "ja")!;

  const filteredPhrases = SITUATION_PHRASES.filter((p) => {
    const matchesCat = selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      p.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCopy = (phraseId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(phraseId);
    showToast("Copied to Clipboard!", "Show this text to a local person.");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (text: string, isLoud = false) => {
    playSpeechAudio(text, localLang, isLoud);
    showToast(isLoud ? "🚨 PLAYING LOUDLY 🔊" : "Playing Audio 🔊", `Speaking in ${localLang}`);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-border/80 p-6 shadow-sm space-y-6">
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
        <div>
          <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">
            Travel Phrase Assistant ({localLang})
          </h3>
          <p className="text-xs text-muted-foreground">
            Ready-made situational phrases tailored for dining, stays, transport & emergencies.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search travel phrases..."
            className="w-full pl-10 pr-3 py-2 rounded-xl border border-border bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      {/* What are you trying to do? Category Filter Chips */}
      <div className="space-y-2">
        <label className="text-xs font-extrabold text-slate-800 dark:text-slate-200 block uppercase tracking-wider">
          What are you trying to do?
        </label>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                  isActive
                    ? "bg-teal-600 text-white shadow-sm"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Emergency Safety Disclaimer Notice */}
      <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="leading-snug">
          <strong>Safety Note:</strong> Travel translations assist basic communication but are not a replacement for official emergency services (dial 112 / local emergency hotline).
        </p>
      </div>

      {/* Phrases Grid */}
      <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
        {filteredPhrases.length === 0 ? (
          <div className="py-8 text-center text-xs text-muted-foreground">
            No phrases found matching "{searchQuery}".
          </div>
        ) : (
          filteredPhrases.map((p) => {
            const trData = p.translations[targetLangObj.code] || {
              text: `[${localLang}] ${p.english}`,
              pronunciation: `${p.english} (phonetics)`,
            };

            const isEmergency = p.isEmergency;

            return (
              <div
                key={p.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isEmergency
                    ? "bg-rose-50 dark:bg-rose-950/30 border-rose-400 dark:border-rose-900 shadow-md"
                    : "bg-slate-50/60 dark:bg-slate-800/40 border-border/80 hover:bg-white dark:hover:bg-slate-800"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                        {p.category}
                      </span>
                      {isEmergency && (
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-rose-600 text-white flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> EMERGENCY
                        </span>
                      )}
                    </div>

                    <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                      "{p.english}"
                    </div>

                    {/* Local Translated Text */}
                    <div
                      className={`font-bold ${
                        isEmergency ? "text-xl text-rose-700 dark:text-rose-300" : "text-base text-slate-900 dark:text-slate-100"
                      }`}
                    >
                      {trData.text}
                    </div>

                    {trData.pronunciation && (
                      <div className="text-[11px] italic text-muted-foreground">
                        Pronunciation: {trData.pronunciation}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleSpeak(trData.text, isEmergency)}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors ${
                        isEmergency
                          ? "bg-rose-600 hover:bg-rose-700 text-white shadow-md animate-pulse"
                          : "bg-white dark:bg-slate-800 hover:bg-teal-600 text-slate-700 dark:text-slate-200 hover:text-white border border-border"
                      }`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{isEmergency ? "🔊 PLAY LOUDLY" : "Listen 🔊"}</span>
                    </button>

                    <button
                      onClick={() => handleCopy(p.id, trData.text)}
                      className="p-1.5 rounded-xl bg-white dark:bg-slate-800 border border-border hover:bg-slate-100 text-muted-foreground hover:text-foreground"
                      title="Copy translation"
                    >
                      {copiedId === p.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
