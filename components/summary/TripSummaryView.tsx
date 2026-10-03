"use client";

import React from "react";
import { useRoamwiseStore } from "@/store/useRoamwiseStore";
import { MOCK_COMPLETED_TRIP_SUMMARY } from "@/lib/data/mockData";
import { CheckCircle2, Wallet, MapPin, Award, Calendar, Sparkles, Star, ArrowRight, RefreshCw, Bot } from "lucide-react";

export function TripSummaryView() {
  const { activeTrip, setActiveTab, setIsBudgetOptimizationOpen, optimizeItineraryRoute } = useRoamwiseStore();

  const spent = activeTrip.spentAmount;
  const total = activeTrip.totalBudget;
  const remaining = Math.max(0, total - spent);

  return (
    <div className="space-y-8 pb-12">
      {/* Summary Banner */}
      <div className="bg-gradient-to-br from-slate-900 to-teal-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-500/20 px-3 py-1 rounded-full border border-teal-500/30">
              Trip Executive Summary & Financial Audit
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {activeTrip.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              {activeTrip.destination} · {activeTrip.durationDays} Days · {activeTrip.travelersCount} Travelers
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold shrink-0">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>₹{remaining.toLocaleString()} Remaining Reserve</span>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-850 border border-slate-800 space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase">Target Budget</span>
            <div className="text-2xl font-black text-white">₹{total.toLocaleString()}</div>
            <p className="text-[11px] text-slate-400">Total allocated</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-850 border border-slate-800 space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase">Planned Spend</span>
            <div className="text-2xl font-black text-emerald-400">
              ₹{spent.toLocaleString()}
            </div>
            <p className="text-[11px] text-slate-400">Stay, food & transport</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-850 border border-slate-800 space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase">Remaining Buffer</span>
            <div className="text-2xl font-black text-teal-400">₹{remaining.toLocaleString()}</div>
            <p className="text-[11px] text-slate-400">Unused emergency reserve</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-850 border border-slate-800 space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase">Usable Travel Hours</span>
            <div className="text-2xl font-black text-amber-400">~{activeTrip.durationDays * 8} hrs</div>
            <p className="text-[11px] text-slate-400">Strictly enforced schedule</p>
          </div>
        </div>

        {/* Executive Actions Bar (Req #25) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800">
          <button
            onClick={() => setActiveTab("trips")}
            className="py-3 px-4 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2"
          >
            <span>[ View Full Itinerary ]</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsBudgetOptimizationOpen(true)}
            className="py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>[ Optimize ]</span>
          </button>

          <button
            onClick={() => setActiveTab("budget")}
            className="py-3 px-4 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2"
          >
            <Wallet className="w-4 h-4" />
            <span>[ Change Budget ]</span>
          </button>

          <button
            onClick={() => setActiveTab("assistant")}
            className="py-3 px-4 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2"
          >
            <Bot className="w-4 h-4" />
            <span>[ Ask Trip AI ]</span>
          </button>
        </div>
      </div>

      {/* Category Breakdown Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-border/80 p-6 sm:p-8 shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 border-b border-border/60 pb-3">
          Category Allocation Breakdown
        </h3>

        <div className="space-y-4">
          {activeTrip.budgetCategories.map((cat) => {
            const pct = Math.min(100, Math.round((cat.planned / total) * 100));
            return (
              <div key={cat.name} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-800 dark:text-slate-200">{cat.name}</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
                    ₹{cat.planned.toLocaleString()} ({pct}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-300"
                    style={{ width: `${pct}%`, backgroundColor: cat.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
