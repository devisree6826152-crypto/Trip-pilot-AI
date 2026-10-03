"use client";

import React from "react";
import { useRoamwiseStore } from "@/store/useRoamwiseStore";
import { Zap, CloudRain, Clock, Wallet, Sparkles, HelpCircle } from "lucide-react";

export function SimulateEventBar() {
  const { triggerPresetScenario, setIsReplanningModalOpen } = useRoamwiseStore();

  return (
    <div className="bg-gradient-to-r from-slate-900 to-teal-950 text-white rounded-3xl p-5 border border-slate-800 shadow-md space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-tight text-white">
              Simulate Real-World Changes (Required Demo Sequence)
            </h3>
            <p className="text-[11px] text-slate-300">
              Test Roamwise's context-aware replanning engine in real time.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsReplanningModalOpen(true)}
          className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white transition-colors flex items-center gap-1.5 self-start sm:self-auto shrink-0"
        >
          <span>More Change Options</span>
        </button>
      </div>

      {/* Preset Scenario Action Chips */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {/* 1. Rain Scenario */}
        <button
          onClick={() => triggerPresetScenario("rain")}
          className="p-3 rounded-2xl bg-slate-850 hover:bg-slate-800 border border-slate-700 text-left transition-all hover:border-teal-500/50 group"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
            <CloudRain className="w-3.5 h-3.5" />
            <span>Scenario 1: Rain</span>
          </div>
          <p className="text-xs font-semibold text-slate-100 group-hover:text-teal-300 transition-colors">
            "Heavy rain expected tomorrow afternoon"
          </p>
          <span className="text-[10px] text-slate-400 block mt-1">
            Swaps outdoor beach for indoor museum
          </span>
        </button>

        {/* 2. Running Late Scenario */}
        <button
          onClick={() => triggerPresetScenario("late")}
          className="p-3 rounded-2xl bg-slate-850 hover:bg-slate-800 border border-slate-700 text-left transition-all hover:border-teal-500/50 group"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-sky-400 mb-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Scenario 2: Delay</span>
          </div>
          <p className="text-xs font-semibold text-slate-100 group-hover:text-teal-300 transition-colors">
            "We are running 2 hours late"
          </p>
          <span className="text-[10px] text-slate-400 block mt-1">
            Reorganizes schedule & preserves dinner
          </span>
        </button>

        {/* 3. Budget Reduction Scenario */}
        <button
          onClick={() => triggerPresetScenario("budget")}
          className="p-3 rounded-2xl bg-slate-850 hover:bg-slate-800 border border-slate-700 text-left transition-all hover:border-teal-500/50 group"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-1">
            <Wallet className="w-3.5 h-3.5" />
            <span>Scenario 3: Budget</span>
          </div>
          <p className="text-xs font-semibold text-slate-100 group-hover:text-teal-300 transition-colors">
            "Reduce total budget by ₹2,000"
          </p>
          <span className="text-[10px] text-slate-400 block mt-1">
            Swaps fine dining to Goan shacks
          </span>
        </button>

        {/* 4. Can I add Scuba Diving */}
        <button
          onClick={() => triggerPresetScenario("scuba")}
          className="p-3 rounded-2xl bg-slate-850 hover:bg-slate-800 border border-slate-700 text-left transition-all hover:border-teal-500/50 group"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-purple-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Feature: Add Activity</span>
          </div>
          <p className="text-xs font-semibold text-slate-100 group-hover:text-teal-300 transition-colors">
            "Can we add Scuba Diving?"
          </p>
          <span className="text-[10px] text-slate-400 block mt-1">
            Assesses +₹1,800 & +4h schedule impact
          </span>
        </button>
      </div>
    </div>
  );
}
