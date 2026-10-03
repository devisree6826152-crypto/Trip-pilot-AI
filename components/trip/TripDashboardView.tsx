"use client";

import React from "react";
import { useRoamwiseStore } from "@/store/useRoamwiseStore";
import { TripHeader } from "./TripHeader";
import { DayTabs } from "./DayTabs";
import { ItineraryItemCard } from "./ItineraryItemCard";
import { SimulateEventBar } from "./SimulateEventBar";
import { LiveEventsFeed } from "../events/LiveEventsFeed";
import { GroupPreferencesCard } from "../group/GroupPreferencesCard";
import { TripReasoningCard } from "./TripReasoningCard";
import { Plus, Compass, Sparkles, Filter } from "lucide-react";

export function TripDashboardView() {
  const { activeTrip, activeDayIndex, setIsAddActivityModalOpen } = useRoamwiseStore();

  const currentDay = activeTrip.days.find((d) => d.dayIndex === activeDayIndex) || activeTrip.days[0];

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Pre-configured Required Scenario Simulator Bar */}
      <SimulateEventBar />

      {/* 2. Main Trip Header Card */}
      <TripHeader />

      {/* 3. Live Events Alerts Feed */}
      <LiveEventsFeed />

      {/* 4. Why TripPilot Chose This Plan, Recommended Stay & Food Options */}
      <TripReasoningCard />

      {/* 4. Day Tabs & Itinerary List */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Day-by-Day Itinerary
            </h2>
            <p className="text-xs text-muted-foreground">
              Select a day to view scheduled activities, manage completion, or edit slots.
            </p>
          </div>

          <button
            onClick={() => setIsAddActivityModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Activity</span>
          </button>
        </div>

        {/* Day Switcher Tabs */}
        <DayTabs />

        {/* Selected Day Activities List */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-border/80 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <div>
              <span className="text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider">
                Day {currentDay.dayIndex} Schedule ({currentDay.date})
              </span>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                {currentDay.title}
              </h3>
            </div>
            <span className="text-xs font-semibold text-muted-foreground">
              {currentDay.activities.length} Activities Scheduled
            </span>
          </div>

          {currentDay.activities.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground space-y-2">
              <Compass className="w-8 h-8 mx-auto text-slate-400" />
              <p className="text-xs">No activities planned for this day yet.</p>
              <button
                onClick={() => setIsAddActivityModalOpen(true)}
                className="text-xs font-bold text-teal-600 underline"
              >
                Add your first activity
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {currentDay.activities.map((act) => (
                <ItineraryItemCard key={act.id} activity={act} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 5. Group Preferences Alignment Card */}
      <GroupPreferencesCard />
    </div>
  );
}
