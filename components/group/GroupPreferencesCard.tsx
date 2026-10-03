"use client";

import React from "react";
import { useRoamwiseStore } from "@/store/useRoamwiseStore";
import { Users, CheckCircle2, Heart, Sparkles, ShieldCheck } from "lucide-react";

export function GroupPreferencesCard() {
  const { activeTrip } = useRoamwiseStore();

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-border/80 p-6 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
            <Users className="w-4 h-4" />
            <span>Group Optimization Engine</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Traveler Preferences & Harmony
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Roamwise balances individual interests to generate a zero-conflict itinerary for all group members.
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-teal-500/10 border border-teal-500/30 shrink-0">
          <span className="text-xs text-teal-800 dark:text-teal-200 font-semibold">Group Match:</span>
          <span className="text-lg font-black text-teal-700 dark:text-teal-300">
            {activeTrip.groupMatchPercentage}%
          </span>
        </div>
      </div>

      {/* 3 Travelers Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {activeTrip.travelers.map((t) => (
          <div
            key={t.id}
            className="p-4 rounded-2xl border border-border bg-slate-50/60 dark:bg-slate-800/40 space-y-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-600 text-white font-extrabold text-sm flex items-center justify-center shadow-md">
                {t.avatar}
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  {t.name}
                </h4>
                <p className="text-[11px] text-muted-foreground font-medium">
                  {t.role || "Traveler"}
                </p>
              </div>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-border/60">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                Preferred Focus:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {t.interests.map((interest) => (
                  <span
                    key={interest}
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white dark:bg-slate-900 border border-border text-slate-700 dark:text-slate-300 shadow-2xs"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Explanation Box */}
      <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-xs text-teal-900 dark:text-teal-200 flex items-start gap-2.5">
        <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h5 className="font-bold">Group Alignment Assessment:</h5>
          <p className="leading-relaxed text-slate-700 dark:text-slate-300">
            {activeTrip.groupMatchExplanation}
          </p>
        </div>
      </div>
    </div>
  );
}
