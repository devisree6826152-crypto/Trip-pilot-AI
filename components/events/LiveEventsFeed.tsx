"use client";

import React from "react";
import { useRoamwiseStore } from "@/store/useRoamwiseStore";
import { MOCK_LIVE_EVENTS } from "@/lib/data/mockData";
import { AlertTriangle, CloudRain, Car, Hotel, ArrowRight, Bell } from "lucide-react";

export function LiveEventsFeed() {
  const { triggerReplanning, setIsReplanningModalOpen } = useRoamwiseStore();

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-border/80 p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
            <Bell className="w-4 h-4 animate-bounce" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              Live Monitor Alerts (Simulated Stream)
            </h3>
            <p className="text-[11px] text-muted-foreground">
              Roamwise agent automatically monitors weather, traffic, and venue status.
            </p>
          </div>
        </div>

        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
          ● Live Tracking Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {MOCK_LIVE_EVENTS.map((evt) => {
          const Icon =
            evt.type === "weather"
              ? CloudRain
              : evt.type === "traffic"
              ? Car
              : AlertTriangle;

          return (
            <div
              key={evt.id}
              className="p-4 rounded-2xl border border-amber-500/20 bg-amber-50/50 dark:bg-slate-800/60 space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-amber-800 dark:text-amber-300">
                    <Icon className="w-3.5 h-3.5 text-amber-600" />
                    <span>{evt.title}</span>
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono">{evt.time}</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-snug">
                  {evt.description}
                </p>
              </div>

              <button
                onClick={() => triggerReplanning(evt.replanTrigger)}
                className="w-full mt-2 text-xs font-bold py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>{evt.actionLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
