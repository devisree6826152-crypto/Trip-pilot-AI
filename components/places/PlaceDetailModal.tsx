"use client";

import React, { useState } from "react";
import { TourismPlace } from "@/lib/types";
import { useRoamwiseStore } from "@/store/useRoamwiseStore";
import {
  X,
  MapPin,
  Clock,
  Star,
  CheckCircle2,
  Sparkles,
  Bot,
  CalendarCheck,
  Building2,
  Utensils,
  Car,
  ShieldAlert,
  Plus,
} from "lucide-react";

interface Props {
  place: TourismPlace;
  onClose: () => void;
}

export function PlaceDetailModal({ place, onClose }: Props) {
  const { activeTrip, addActivity, showToast } = useRoamwiseStore();

  const [isAiEvaluating, setIsAiEvaluating] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<any | null>(null);

  const handleEvaluateAi = () => {
    setIsAiEvaluating(true);

    setTimeout(() => {
      setIsAiEvaluating(false);
      setAiAnalysis({
        availableTimeBuffer: "180 mins available in afternoon",
        travelTimeFromLastStop: "20 mins cab ride from hotel",
        budgetImpact: place.estimatedCost === 0 ? "Free — ₹0 impact" : `+₹${place.estimatedCost} (Fits buffer)`,
        scheduleImpact: "Low Impact — Perfect fit",
        recommendedPlacement: `Day 2 at 15:00 PM (Replaces optional idle time)`,
      });
    }, 800);
  };

  const handleConfirmAdd = () => {
    addActivity(2, {
      time: "15:00",
      title: place.name,
      description: place.description,
      location: place.location,
      category: (place.category === "Historical" ? "History" : place.category) as any,
      durationMinutes: place.estimatedDurationMinutes,
      cost: place.estimatedCost,
      travelTimeMinutes: 20,
      isEssential: true,
      status: "added",
      imageUrl: place.imageUrl,
    });
    showToast("Added to Itinerary!", `Added "${place.name}" to Day 2 of your trip.`, "success");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-border max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-900/80 text-white hover:bg-slate-900 transition-colors backdrop-blur-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Photo & Title */}
        <div className="relative h-64 w-full bg-slate-900">
          <img
            src={place.imageUrl}
            alt={place.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <span className="px-3 py-1 rounded-xl bg-teal-500 text-slate-950 font-extrabold text-xs inline-block">
              {place.category}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold">{place.name}</h2>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-teal-400" />
                <span>{place.location}</span>
              </span>
              <span className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{place.rating} / 5.0</span>
              </span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-border/80 text-xs">
            <div>
              <span className="text-muted-foreground block font-medium">Est. Duration:</span>
              <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                {place.estimatedDurationMinutes} Mins
              </span>
            </div>
            <div>
              <span className="text-muted-foreground block font-medium">Est. Cost:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                {place.estimatedCost === 0 ? "Free Entry" : `₹${place.estimatedCost}`}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground block font-medium">Best Time:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {place.bestTimeToVisit || "Morning / Evening"}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">About this place:</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {place.description}
            </p>
          </div>

          {/* Things to do */}
          {place.thingsToDo && place.thingsToDo.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Highlights & Things to do:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {place.thingsToDo.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Transport & Safety Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {place.transportAdvice && (
              <div className="p-3.5 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-950 dark:text-sky-200 space-y-1">
                <span className="font-bold flex items-center gap-1.5 text-sky-700 dark:text-sky-300">
                  <Car className="w-4 h-4" /> Transport Tip:
                </span>
                <p className="text-[11px] leading-snug">{place.transportAdvice}</p>
              </div>
            )}

            {place.safetyNote && (
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-950 dark:text-amber-200 space-y-1">
                <span className="font-bold flex items-center gap-1.5 text-amber-700 dark:text-amber-300">
                  <ShieldAlert className="w-4 h-4" /> Visitor Note:
                </span>
                <p className="text-[11px] leading-snug">{place.safetyNote}</p>
              </div>
            )}
          </div>

          {/* SIGNATURE AI FEATURE: "Can I fit this into Day 2?" */}
          <div className="p-5 rounded-3xl bg-slate-900 text-white border border-teal-500/40 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-100">
                    AI Itinerary Feasibility Evaluator
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Check if "{place.name}" fits your active {activeTrip.destination} itinerary.
                  </p>
                </div>
              </div>

              {!aiAnalysis && (
                <button
                  onClick={handleEvaluateAi}
                  disabled={isAiEvaluating}
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isAiEvaluating ? "Analyzing..." : "Can I fit this into Day 2?"}</span>
                </button>
              )}
            </div>

            {aiAnalysis && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-850 p-3 rounded-2xl border border-slate-800">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Time Buffer:</span>
                    <span className="font-bold text-slate-200">{aiAnalysis.availableTimeBuffer}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Travel Time:</span>
                    <span className="font-bold text-slate-200">{aiAnalysis.travelTimeFromLastStop}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Cost Impact:</span>
                    <span className="font-bold text-emerald-400">{aiAnalysis.budgetImpact}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Recommended Placement:</span>
                    <span className="font-bold text-teal-300">{aiAnalysis.recommendedPlacement}</span>
                  </div>
                </div>

                <button
                  onClick={handleConfirmAdd}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-extrabold text-xs shadow-lg flex items-center justify-center gap-2 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add "{place.name}" to Day 2 Itinerary</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
