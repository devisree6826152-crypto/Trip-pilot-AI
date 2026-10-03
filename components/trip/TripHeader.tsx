"use client";

import React, { useEffect } from "react";
import { useRoamwiseStore } from "@/store/useRoamwiseStore";
import {
  MapPin,
  Calendar,
  Users,
  Wallet,
  CloudSun,
  Sun,
  CloudRain,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  RefreshCw,
} from "lucide-react";

export function TripHeader() {
  const { activeTrip, activeDayIndex, resetToGoaDemo, fetchLiveWeather } = useRoamwiseStore();

  useEffect(() => {
    fetchLiveWeather(activeTrip.destination);
  }, [activeTrip.destination, fetchLiveWeather]);

  const currentDay = activeTrip.days.find((d) => d.dayIndex === activeDayIndex) || activeTrip.days[0];
  const spent = activeTrip.spentAmount;
  const remaining = Math.max(0, activeTrip.totalBudget - spent);
  const percentSpent = Math.min(100, Math.round((spent / activeTrip.totalBudget) * 100));

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-border/80 p-6 sm:p-8 shadow-sm space-y-6">
      {/* Top Title & Badge Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 bg-teal-500/10 px-2.5 py-0.5 rounded-full border border-teal-500/20">
              Active Trip Dashboard
            </span>
            <span className="text-xs text-muted-foreground">
              From {activeTrip.startingLocation}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            {activeTrip.title}
          </h1>
        </div>

        {/* Reset Demo Button */}
        <button
          onClick={resetToGoaDemo}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border border-border bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-muted-foreground hover:text-foreground transition-colors self-start sm:self-auto"
          title="Reset preloaded Goa trip state"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo Data</span>
        </button>
      </div>

      {/* Grid of Key Info Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Current Day & Date */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-border space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground uppercase">
            <Calendar className="w-4 h-4 text-teal-600" />
            <span>Trip Progress</span>
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Day {activeDayIndex} of {activeTrip.durationDays}
          </div>
          <p className="text-xs text-muted-foreground">{currentDay?.date}</p>
        </div>

        {/* 2. Live Weather API Condition */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-border space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground uppercase">
              <CloudSun className="w-4 h-4 text-amber-500" />
              <span>Live Weather API</span>
            </div>
            <button
              onClick={() => fetchLiveWeather(activeTrip.destination)}
              title="Refresh weather from Open-Meteo API"
              className="text-muted-foreground hover:text-teal-600"
            >
              <RefreshCw className="w-3 h-3" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {currentDay?.weather.tempC}°C
            </span>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {currentDay?.weather.condition}
            </span>
          </div>
          {currentDay?.weather.alert ? (
            <p className="text-[11px] font-bold text-amber-700 dark:text-amber-400 truncate">
              ⚠️ {currentDay.weather.alert}
            </p>
          ) : (
            <p className="text-xs text-emerald-600 font-medium">✓ Open-Meteo Synced</p>
          )}
        </div>

        {/* 3. Budget Status */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-border space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground uppercase">
            <Wallet className="w-4 h-4 text-emerald-600" />
            <span>Budget Spent</span>
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
            ₹{spent.toLocaleString()}
          </div>
          <div className="flex justify-between items-center text-[11px] text-muted-foreground">
            <span>Remaining: ₹{remaining.toLocaleString()}</span>
            <span className="font-semibold text-teal-600">{percentSpent}%</span>
          </div>
        </div>

        {/* 4. Group Preference Harmony Match */}
        <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-500/30 space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-teal-800 dark:text-teal-200 uppercase">
              <Users className="w-4 h-4 text-teal-600" />
              <span>Group Harmony</span>
            </div>
            <span className="text-xs font-black text-teal-700 dark:text-teal-300 px-2 py-0.5 rounded bg-teal-500/20">
              {activeTrip.groupMatchPercentage}%
            </span>
          </div>
          <div className="text-sm font-bold text-slate-800 dark:text-slate-200">
            {activeTrip.travelersCount} Travelers Synced
          </div>
          <p className="text-[11px] text-teal-800/80 dark:text-teal-300/80 line-clamp-1">
            {activeTrip.groupMatchExplanation}
          </p>
        </div>
      </div>
    </div>
  );
}
