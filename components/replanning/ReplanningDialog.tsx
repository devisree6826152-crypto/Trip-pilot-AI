"use client";

import React, { useState } from "react";
import { useRoamwiseStore } from "@/store/useRoamwiseStore";
import {
  X,
  CloudRain,
  Clock,
  Wallet,
  Hotel,
  Utensils,
  ThumbsDown,
  Car,
  HelpCircle,
  Loader2,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const CHANGE_OPTIONS = [
  {
    id: "weather",
    title: "Weather changed",
    description: "Rain, extreme heat, or sea warning forecast",
    icon: CloudRain,
    color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  },
  {
    id: "running_late",
    title: "I'm running late",
    description: "Traffic, late wake-up, or delayed transport",
    icon: Clock,
    color: "text-sky-500 bg-sky-500/10 border-sky-500/20",
  },
  {
    id: "budget_reduction",
    title: "My budget changed",
    description: "Reduce or increase total trip spending target",
    icon: Wallet,
    color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    id: "hotel_unavailable",
    title: "Hotel unavailable",
    description: "Overbooked room, late check-in, or property issue",
    icon: Hotel,
    color: "text-purple-500 bg-purple-500/10 border-purple-500/20",
  },
  {
    id: "restaurant_unavailable",
    title: "Restaurant unavailable",
    description: "Fully booked venue, closed kitchen, or dietary swap",
    icon: Utensils,
    color: "text-rose-500 bg-rose-500/10 border-rose-500/20",
  },
  {
    id: "dislike_activity",
    title: "I don't like this activity",
    description: "Swap current activity for an alternative interest",
    icon: ThumbsDown,
    color: "text-amber-600 bg-amber-600/10 border-amber-600/20",
  },
  {
    id: "transport_problem",
    title: "Transport problem",
    description: "Cab delay, ferry cancelled, or road closure",
    icon: Car,
    color: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
  },
  {
    id: "custom",
    title: "Something else",
    description: "Specify a custom request to your AI agent",
    icon: HelpCircle,
    color: "text-slate-600 bg-slate-500/10 border-slate-500/20",
  },
];

export function ReplanningDialog() {
  const {
    isReplanningModalOpen,
    setIsReplanningModalOpen,
    triggerReplanning,
  } = useRoamwiseStore();

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (!isReplanningModalOpen) return null;

  const handleSelectOption = (id: string) => {
    setSelectedId(id);
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      triggerReplanning(id);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl border border-border shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/60">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400">
              <Sparkles className="w-4 h-4" />
              <span>Adaptive Agent Interface</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              What changed in your plans?
            </h2>
          </div>
          <button
            onClick={() => setIsReplanningModalOpen(false)}
            className="p-2 rounded-xl text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {isAnalyzing ? (
            <div className="py-12 text-center space-y-4">
              <Loader2 className="w-10 h-10 text-teal-600 animate-spin mx-auto" />
              <div className="space-y-1">
                <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">
                  Analyzing Itinerary Impact…
                </h3>
                <p className="text-xs text-muted-foreground">
                  Preserving unaffected bookings. Calculating time & budget diffs.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CHANGE_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    className="p-4 rounded-2xl border border-border/80 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 text-left transition-all hover:border-teal-500/50 hover:shadow-md group flex items-start gap-3"
                  >
                    <div className={`p-2.5 rounded-xl border shrink-0 ${opt.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5 flex-1 min-w-0">
                      <div className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors flex items-center justify-between">
                        <span>{opt.title}</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-teal-600" />
                      </div>
                      <p className="text-xs text-muted-foreground leading-snug">
                        {opt.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border-t border-border/60 text-xs text-muted-foreground flex items-center justify-between">
          <span>Roamwise will present a before/after proposal before applying any changes.</span>
          <span className="font-semibold text-teal-600">Selective Replanning</span>
        </div>
      </div>
    </div>
  );
}
