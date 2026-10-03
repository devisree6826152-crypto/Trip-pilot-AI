"use client";

import React, { useState } from "react";
import { useRoamwiseStore } from "@/store/useRoamwiseStore";
import {
  Compass,
  ArrowRight,
  Zap,
  CloudRain,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Wallet,
  Users,
  Sparkles,
  RefreshCw,
  Sun,
  Umbrella,
} from "lucide-react";

export function LandingHero() {
  const { setActiveTab, setIsSimulateModalOpen, activeTrip } = useRoamwiseStore();
  const [exampleState, setExampleState] = useState<"before" | "after">("after");

  return (
    <div className="space-y-12 pb-12">
      {/* Main Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-850 to-teal-950 text-white p-6 sm:p-10 lg:p-14 shadow-2xl border border-slate-800">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>Introducing Roamwise Adaptive Travel Agent</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.15] text-white">
            Your trip shouldn't stay the same when the world does.
          </h1>

          <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
            An AI travel agent that plans your journey and adapts when real-world plans change.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab("plan")}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm shadow-lg shadow-teal-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Plan my trip</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab("trips")}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-sm border border-slate-700 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Open Goa demo</span>
              <Compass className="w-4 h-4 text-teal-400" />
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Visual Example of Itinerary Adapting to Rain */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-border/80 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
              <Zap className="w-4 h-4" />
              <span>Core Agent Loop Demo</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
              See How Roamwise Adapts to Rain
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Only the affected part of your itinerary changes. Unaffected plans stay intact.
            </p>
          </div>

          {/* Toggle Control */}
          <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-border shrink-0 self-start sm:self-auto">
            <button
              onClick={() => setExampleState("before")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                exampleState === "before"
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Original Plan (Sunny)
            </button>
            <button
              onClick={() => setExampleState("after")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                exampleState === "after"
                  ? "bg-teal-600 text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Adapted Plan (Rain Forecast)
            </button>
          </div>
        </div>

        {/* Dynamic Comparison Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Left Context Callout */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 space-y-3">
            <div className="flex items-center gap-2 font-bold text-xs">
              <CloudRain className="w-4 h-4 text-amber-600" />
              <span>Detected Change Event</span>
            </div>
            <p className="text-xs leading-relaxed">
              <strong>Heavy Rain Alert:</strong> Radar models predict 85% rain probability for North Goa between 3:00 PM and 6:00 PM today.
            </p>
            <div className="pt-2 border-t border-amber-500/20 text-[11px] space-y-1">
              <div className="flex justify-between">
                <span>Affected slot:</span>
                <span className="font-semibold">3:00 PM Baga Beach</span>
              </div>
              <div className="flex justify-between">
                <span>Preserved slots:</span>
                <span className="font-semibold text-emerald-700 dark:text-emerald-400">5 of 6 activities</span>
              </div>
            </div>
          </div>

          {/* Center Card: The Activity State */}
          <div className="md:col-span-2 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-border space-y-4">
            <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground border-b border-border/60 pb-2">
              <span>Day 2 — 3:00 PM Activity Slot</span>
              <span
                className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                  exampleState === "before"
                    ? "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-200"
                    : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200"
                }`}
              >
                {exampleState === "before" ? "Original Outdoor Activity" : "Agent Adapted indoor Activity"}
              </span>
            </div>

            {exampleState === "before" ? (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/40 shadow-sm">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-600">15:00 - 18:00</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-700 font-semibold">
                      Beaches (Outdoor)
                    </span>
                  </div>
                  <h4 className="font-bold text-base text-slate-900 dark:text-slate-100">
                    Baga Beach Watersports & Sunbathing
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Parasailing, jet-skiing, and sunloungers on the open beach.
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-semibold text-rose-600 block">⚠️ Rain Risk</span>
                  <span className="text-xs text-muted-foreground">Est. Cost: ₹500</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-teal-500/40 shadow-sm">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-teal-600">15:00 - 17:00</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-teal-500/10 text-teal-700 dark:text-teal-300 font-semibold">
                      Culture (Indoor Protected)
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 font-semibold">
                      Replaced
                    </span>
                  </div>
                  <h4 className="font-bold text-base text-slate-900 dark:text-slate-100">
                    Houses of Goa Museum & Indoor Art Gallery
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Architectural museum showcasing heritage structures. Rain-proof!
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-semibold text-emerald-600 block">✓ Rain Safe</span>
                  <span className="text-xs text-muted-foreground">Est. Cost: ₹400 (-₹100)</span>
                </div>
              </div>
            )}

            {/* Explanation box */}
            <div className="p-3.5 rounded-xl bg-teal-500/10 border border-teal-500/20 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <strong>Agent Rationale:</strong> "I moved your beach visit to tomorrow morning (sunny forecast) and substituted today's 3:00 PM slot with the climate-controlled Houses of Goa Museum. All other 5 activities remain unchanged."
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Pillars Grid */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-border shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 flex items-center justify-center">
            <RefreshCw className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
            Selective Replanning
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Replan only the affected activities. Unaffected flights, hotel reservations, and bookings are preserved.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-border shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
            Clear Rationale & Undo
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Every proposed change is explained with specific time and budget impacts. You can accept or undo with one click.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-border shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 flex items-center justify-center">
            <Wallet className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
            Budget Guardrails
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Track spending in ₹ against planned categories. Get instant smart proposals whenever budget targets change.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-border shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
            Group Harmony
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Balances individual preferences across travelers (Food, Nature, History) for maximum group match score.
          </p>
        </div>
      </section>

      {/* Preloaded Demo Trip Entry Banner */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-slate-900 dark:to-teal-950/40 border border-teal-200 dark:border-teal-800/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2">
          <span className="text-xs font-bold text-teal-700 dark:text-teal-300 uppercase tracking-wider">
            Preloaded Live Demo
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
            Goa 4-Day Beach & Culture Exploration
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl">
            Currently on <strong>Day 2 of 4</strong> with 3 travelers, ₹20,000 budget (₹12,550 remaining), and 87% preference match.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab("trips")}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02]"
          >
            <span>Launch Goa Trip Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
