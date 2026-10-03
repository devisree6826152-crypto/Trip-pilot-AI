"use client";

import React, { useState } from "react";
import { useRoamwiseStore } from "@/store/useRoamwiseStore";
import {
  X,
  Sparkles,
  AlertTriangle,
  TrendingDown,
  Building2,
  Car,
  Utensils,
  Calendar,
  CheckCircle2,
} from "lucide-react";

export function BudgetOptimizationModal() {
  const {
    isBudgetOptimizationOpen,
    setIsBudgetOptimizationOpen,
    applyBudgetOptimization,
    activeTrip,
  } = useRoamwiseStore();

  const [selectedFixes, setSelectedFixes] = useState<string[]>([
    "hotel",
    "taxi",
    "restaurant",
    "activity",
  ]);

  if (!isBudgetOptimizationOpen) return null;

  const currentSpend = activeTrip.spentAmount;
  const budget = activeTrip.totalBudget;
  const overspend = Math.max(0, currentSpend - budget);

  const optimizationOptions = [
    {
      id: "hotel",
      title: "Swap Premium Resort to Boutique Eco-Stay",
      category: "Accommodation",
      savings: 1500,
      icon: Building2,
      description: "Match same location rating while saving ₹1,500 / stay.",
    },
    {
      id: "taxi",
      title: "Replace Private SUV with Electric Shuttle",
      category: "Transportation",
      savings: 700,
      icon: Car,
      description: "Convenient shared ride-hailing for day excursions.",
    },
    {
      id: "restaurant",
      title: "Swap Fine Dining for Top-Rated Heritage Thali",
      category: "Dining",
      savings: 500,
      icon: Utensils,
      description: "Authentic local flavor with 4.9★ rating.",
    },
    {
      id: "activity",
      title: "Trim Optional Sunset Cruise (Keep Main Sights)",
      category: "Activities",
      savings: 700,
      icon: Calendar,
      description: "Maintains all essential sightseeing activities.",
    },
  ];

  const totalPotentialSavings = optimizationOptions
    .filter((opt) => selectedFixes.includes(opt.id))
    .reduce((acc, curr) => acc + curr.savings, 0);

  const toggleFix = (id: string) => {
    if (selectedFixes.includes(id)) {
      setSelectedFixes(selectedFixes.filter((item) => item !== id));
    } else {
      setSelectedFixes([...selectedFixes, id]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-border shadow-2xl w-full max-w-xl overflow-hidden my-8">
        {/* Modal Header */}
        <div className="p-5 border-b border-border flex items-center justify-between bg-gradient-to-r from-amber-500/10 via-teal-500/10 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-slate-100">
                AI Budget Optimization Engine
              </h3>
              <p className="text-xs text-muted-foreground">
                Intelligently balance itinerary costs without sacrificing trip quality.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsBudgetOptimizationOpen(false)}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Overspend Summary Card */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                ⚠️ Overspend Warning
              </span>
              <span className="text-xs font-extrabold text-amber-700 dark:text-amber-400">
                +₹{(overspend || 3400).toLocaleString()} Over Budget
              </span>
            </div>
            <p className="text-xs text-amber-800 dark:text-amber-400">
              Current estimated itinerary spend is{" "}
              <span className="font-bold">₹{currentSpend.toLocaleString()}</span> against your{" "}
              <span className="font-bold">₹{budget.toLocaleString()}</span> target budget.
            </p>
          </div>

          {/* AI Recommended Swaps */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
              <span>Proposed Cost-Saving Changes:</span>
              <span className="text-teal-600 dark:text-teal-400">
                Selected Savings: ₹{totalPotentialSavings.toLocaleString()}
              </span>
            </div>

            <div className="space-y-2">
              {optimizationOptions.map((opt) => {
                const Icon = opt.icon;
                const isSelected = selectedFixes.includes(opt.id);
                return (
                  <div
                    key={opt.id}
                    onClick={() => toggleFix(opt.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? "bg-teal-50/80 dark:bg-teal-950/40 border-teal-500 text-slate-900 dark:text-slate-100 shadow-sm"
                        : "border-border bg-slate-50 dark:bg-slate-800/60 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-xl bg-white dark:bg-slate-800 text-teal-600 shrink-0 border border-border">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm">{opt.title}</h4>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          {opt.description}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0 ml-3">
                      <span className="text-xs font-extrabold text-emerald-600 flex items-center gap-1 justify-end">
                        <TrendingDown className="w-3.5 h-3.5" />
                        -₹{opt.savings.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-muted-foreground block uppercase font-bold">
                        {opt.category}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => applyBudgetOptimization(selectedFixes)}
              className="w-full py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Apply Selected Changes (-₹{totalPotentialSavings.toLocaleString()})</span>
            </button>

            <button
              onClick={() => setIsBudgetOptimizationOpen(false)}
              className="w-full py-3.5 rounded-2xl border border-border text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancel & Keep Original
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
