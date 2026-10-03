"use client";

import React, { useState } from "react";
import { useRoamwiseStore } from "@/store/useRoamwiseStore";
import { Sparkles, ArrowRight, CheckCircle2, AlertCircle, Plus, Search } from "lucide-react";

export function CanIAddThisWidget() {
  const { evaluateCanIAdd } = useRoamwiseStore();
  const [inputText, setInputText] = useState("Can we add a scuba diving activity?");

  const handleEvaluate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    evaluateCanIAdd(inputText);
  };

  const handleChipClick = (suggestion: string) => {
    setInputText(suggestion);
    evaluateCanIAdd(suggestion);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-teal-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Real-time Feasibility Engine</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
          “Can I add this to my trip?”
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
          Ask Roamwise to evaluate any new experience. The agent checks your available budget, schedule buffers, and group preferences before proposing a place.
        </p>
      </div>

      {/* Input Bar */}
      <form onSubmit={handleEvaluate} className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="e.g. Can we add a scuba diving activity?"
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-800/90 border border-slate-700 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-inner"
          />
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-teal-500/25 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 shrink-0"
        >
          <span>Evaluate Feasibility</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Quick Suggestion Chips */}
      <div className="space-y-2">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
          Try quick examples:
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {[
            "Can we add a scuba diving activity?",
            "Can we visit a spice plantation?",
            "Add a sunset kayak session",
            "Add casino night event",
          ].map((chip) => (
            <button
              key={chip}
              onClick={() => handleChipClick(chip)}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 hover:text-teal-300 transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3 h-3 text-teal-400" />
              <span>{chip}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
