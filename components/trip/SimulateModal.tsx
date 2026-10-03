"use client";

import React from "react";
import { useRoamwiseStore } from "@/store/useRoamwiseStore";
import { X, Zap, CloudRain, Clock, Wallet, Sparkles, ArrowRight } from "lucide-react";

export function SimulateModal() {
  const {
    isSimulateModalOpen,
    setIsSimulateModalOpen,
    triggerPresetScenario,
  } = useRoamwiseStore();

  if (!isSimulateModalOpen) return null;

  const handleSelect = (key: "rain" | "late" | "budget" | "scuba") => {
    triggerPresetScenario(key);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/65 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl border border-border shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-5 border-b border-border/60 bg-gradient-to-r from-slate-900 to-teal-950 text-white">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base text-white">
              Simulate Real-World Change Event
            </h3>
          </div>
          <button
            onClick={() => setIsSimulateModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-3">
          <p className="text-xs text-muted-foreground mb-2">
            Select one of the required demo scenarios below to watch Roamwise re-evaluate and re-plan your trip:
          </p>

          <button
            onClick={() => handleSelect("rain")}
            className="w-full p-4 rounded-2xl border border-border bg-slate-50 dark:bg-slate-800/60 hover:border-teal-500/50 text-left transition-all flex items-start gap-3 group"
          >
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 border border-amber-500/20 shrink-0">
              <CloudRain className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-teal-600 flex items-center justify-between">
                <span>1. Rain Forecast Scenario</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                "Heavy rain expected tomorrow afternoon" → Replaces outdoor beach with indoor museum.
              </p>
            </div>
          </button>

          <button
            onClick={() => handleSelect("late")}
            className="w-full p-4 rounded-2xl border border-border bg-slate-50 dark:bg-slate-800/60 hover:border-teal-500/50 text-left transition-all flex items-start gap-3 group"
          >
            <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-600 border border-sky-500/20 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-teal-600 flex items-center justify-between">
                <span>2. Delay Scenario</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                "We are running 2 hours late" → Streamlines Day 2 sights while preserving dinner reservation.
              </p>
            </div>
          </button>

          <button
            onClick={() => handleSelect("budget")}
            className="w-full p-4 rounded-2xl border border-border bg-slate-50 dark:bg-slate-800/60 hover:border-teal-500/50 text-left transition-all flex items-start gap-3 group"
          >
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 shrink-0">
              <Wallet className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-teal-600 flex items-center justify-between">
                <span>3. Budget Reduction Scenario</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                "Reduce total budget by ₹2,000" → Swaps fine dining for authentic beach shacks.
              </p>
            </div>
          </button>

          <button
            onClick={() => handleSelect("scuba")}
            className="w-full p-4 rounded-2xl border border-border bg-slate-50 dark:bg-slate-800/60 hover:border-teal-500/50 text-left transition-all flex items-start gap-3 group"
          >
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 border border-purple-500/20 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-teal-600 flex items-center justify-between">
                <span>4. Add Scuba Diving Request</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                "Can we add Scuba Diving?" → Evaluates +₹1,800 & +4h schedule impact on Day 3.
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
