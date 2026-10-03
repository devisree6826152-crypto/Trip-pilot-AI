"use client";

import React from "react";
import { useRoamwiseStore } from "@/store/useRoamwiseStore";
import { CanIAddThisWidget } from "./CanIAddThisWidget";
import {
  Wallet,
  TrendingDown,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export function BudgetOverview() {
  const { activeTrip, reduceBudgetProposal, setIsBudgetOptimizationOpen } = useRoamwiseStore();

  const total = activeTrip.totalBudget;
  const spent = activeTrip.spentAmount;
  const remaining = Math.max(0, total - spent);
  const percentageSpent = Math.min(100, Math.round((spent / total) * 100));
  const isOverBudget = spent > total;

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-border/80 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                Budget Intelligence Guardrails
              </span>
              <span className="text-xs text-muted-foreground">{activeTrip.destination}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              Trip Financial Guardrails & Spend Analytics
            </h1>
          </div>

          <button
            onClick={() => setIsBudgetOptimizationOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all hover:scale-[1.02] self-start sm:self-auto shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>Optimize Budget with AI</span>
          </button>
        </div>

        {/* ⚠️ Budget Warning Callout if Overspent */}
        {isOverBudget ? (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              <span>
                <strong>⚠️ Budget Warning:</strong> Your current plan is estimated at{" "}
                <strong className="text-amber-700 dark:text-amber-300">₹{spent.toLocaleString()}</strong> against your{" "}
                <strong>₹{total.toLocaleString()}</strong> budget (+₹{(spent - total).toLocaleString()}).
              </span>
            </div>
            <button
              onClick={() => setIsBudgetOptimizationOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-sm shrink-0"
            >
              Optimize Budget
            </button>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-900 dark:text-emerald-200 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>Smart Rationale Insight:</strong> Your spending is on track! Remaining reserve buffer:{" "}
                <strong>₹{remaining.toLocaleString()}</strong>.
              </span>
            </div>
            <button
              onClick={() => setIsBudgetOptimizationOpen(true)}
              className="text-xs font-bold text-emerald-700 dark:text-emerald-300 underline hover:no-underline shrink-0"
            >
              Optimize spend further
            </button>
          </div>
        )}

        {/* 3 Main Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-border space-y-1">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Total Trip Target
            </span>
            <div className="text-2xl font-black text-slate-900 dark:text-slate-100">
              ₹{total.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Original budget allocation</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-border space-y-1">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Current Spend
            </span>
            <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
              ₹{spent.toLocaleString()}
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden mt-1">
              <div
                className="bg-emerald-600 h-full transition-all duration-300"
                style={{ width: `${percentageSpent}%` }}
              />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-500/30 space-y-1">
            <span className="text-xs font-bold text-teal-800 dark:text-teal-200 uppercase tracking-wider">
              Available Remaining
            </span>
            <div className="text-2xl font-black text-teal-900 dark:text-teal-100">
              ₹{remaining.toLocaleString()}
            </div>
            <p className="text-xs text-teal-800/80 dark:text-teal-300/80 font-medium">
              Ready for remaining {activeTrip.durationDays - activeTrip.currentDayIndex + 1} days
            </p>
          </div>
        </div>
      </div>

      {/* Category Cost Breakdown Grid */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-border/80 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-border/60 pb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Category Allocation & Actuals
            </h3>
            <p className="text-xs text-muted-foreground">
              Structured budget breakdown across transport, stays, food, activities, and reserve.
            </p>
          </div>
          <span className="text-xs font-bold text-slate-500">₹ INR</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {activeTrip.budgetCategories.map((cat) => {
            const catSpent = cat.spent;
            const catRemaining = Math.max(0, cat.planned - catSpent);
            const catPercent = Math.min(100, Math.round((catSpent / cat.planned) * 100));

            return (
              <div
                key={cat.name}
                className="p-4 rounded-2xl border border-border/80 bg-slate-50/60 dark:bg-slate-800/40 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    {cat.name}
                  </span>
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                </div>

                <div>
                  <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    ₹{cat.planned.toLocaleString()}
                  </div>
                  <div className="flex justify-between text-[11px] text-muted-foreground mt-0.5">
                    <span>Spent: ₹{catSpent.toLocaleString()}</span>
                    <span>Rem: ₹{catRemaining.toLocaleString()}</span>
                  </div>
                </div>

                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-300"
                    style={{ width: `${catPercent}%`, backgroundColor: cat.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* "Can I Add This?" Interactive Evaluator Component */}
      <CanIAddThisWidget />
    </div>
  );
}
