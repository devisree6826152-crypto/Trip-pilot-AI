"use client";

import React from "react";
import { useRoamwiseStore } from "@/store/useRoamwiseStore";
import {
  X,
  AlertTriangle,
  Sparkles,
  Clock,
  MapPin,
  Wallet,
  CheckCircle2,
  Wrench,
} from "lucide-react";

export function ConflictDetectionModal() {
  const {
    activeConflict,
    isConflictModalOpen,
    setIsConflictModalOpen,
    triggerReplanning,
    setIsBudgetOptimizationOpen,
  } = useRoamwiseStore();

  if (!isConflictModalOpen || !activeConflict) return null;

  const handleFixWithAI = () => {
    setIsConflictModalOpen(false);
    if (activeConflict.type === "budget") {
      setIsBudgetOptimizationOpen(true);
    } else {
      triggerReplanning("running_late", "Resolve schedule conflict and adjust timings.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-rose-500/30 shadow-2xl w-full max-w-lg overflow-hidden my-8">
        {/* Header Banner */}
        <div className="p-5 border-b border-border bg-rose-500/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-md">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                Itinerary Conflict Alert
              </h3>
              <p className="text-xs text-rose-700 dark:text-rose-400 font-semibold">
                AI System Detected Plan Inconsistency
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsConflictModalOpen(false)}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <div className="space-y-2">
            <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100">
              {activeConflict.title}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {activeConflict.description}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-border space-y-2 text-xs">
            <div className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[10px]">
              Impact Analysis:
            </div>
            <p className="text-muted-foreground">{activeConflict.impact}</p>
            <div className="pt-2 border-t border-border/60 text-teal-700 dark:text-teal-300 font-semibold">
              💡 {activeConflict.recommendedAction}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleFixWithAI}
              className="py-3 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Fix Automatically with AI</span>
            </button>

            <button
              onClick={() => setIsConflictModalOpen(false)}
              className="py-3 rounded-2xl border border-border text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Review Manually
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
