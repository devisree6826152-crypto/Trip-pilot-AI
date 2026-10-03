"use client";

import React from "react";
import { useRoamwiseStore } from "@/store/useRoamwiseStore";
import { Calendar, Sun, CloudRain, CloudSun } from "lucide-react";

export function DayTabs() {
  const { activeTrip, activeDayIndex, setActiveDayIndex } = useRoamwiseStore();

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {activeTrip.days.map((day) => {
        const isActive = activeDayIndex === day.dayIndex;
        const totalItems = day.activities.length;
        const completedItems = day.activities.filter((a) => a.status === "completed").length;

        return (
          <button
            key={day.dayIndex}
            onClick={() => setActiveDayIndex(day.dayIndex)}
            className={`flex flex-col items-start gap-1 p-3 sm:p-4 rounded-2xl min-w-[170px] sm:min-w-[200px] border text-left transition-all shrink-0 ${
              isActive
                ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border-slate-900 dark:border-slate-100 shadow-md scale-[1.02]"
                : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-border/80 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <span
                className={`text-xs font-bold uppercase tracking-wider ${
                  isActive ? "text-teal-400 dark:text-teal-600" : "text-teal-600 dark:text-teal-400"
                }`}
              >
                Day {day.dayIndex}
              </span>
              <span className="text-[10px] opacity-75">{day.date}</span>
            </div>

            <div className="font-bold text-xs sm:text-sm line-clamp-1">{day.title}</div>

            <div className="flex items-center justify-between w-full pt-1 text-[11px] opacity-80 border-t border-current/10">
              <span className="flex items-center gap-1">
                {day.weather.iconName === "sun" ? (
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                ) : (
                  <CloudSun className="w-3.5 h-3.5 text-sky-400" />
                )}
                <span>{day.weather.tempC}°C</span>
              </span>
              <span>
                {completedItems}/{totalItems} Done
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
