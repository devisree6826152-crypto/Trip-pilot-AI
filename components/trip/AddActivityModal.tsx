"use client";

import React, { useState } from "react";
import { useRoamwiseStore } from "@/store/useRoamwiseStore";
import { CategoryType } from "@/lib/types";
import { X, Plus, Clock, MapPin, Tag } from "lucide-react";

export function AddActivityModal() {
  const {
    isAddActivityModalOpen,
    setIsAddActivityModalOpen,
    addActivity,
    activeDayIndex,
  } = useRoamwiseStore();

  const [title, setTitle] = useState("");
  const [time, setTime] = useState("16:00");
  const [location, setLocation] = useState("");
  const [cost, setCost] = useState(500);
  const [durationMinutes, setDurationMinutes] = useState(90);
  const [category, setCategory] = useState<CategoryType>("Culture");
  const [isEssential, setIsEssential] = useState(false);
  const [description, setDescription] = useState("");

  if (!isAddActivityModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addActivity(activeDayIndex, {
      time,
      title: title || "New Custom Activity",
      description: description || "Custom activity added by user.",
      location: location || "Local Site",
      category,
      durationMinutes: Number(durationMinutes) || 60,
      cost: Number(cost) || 0,
      travelTimeMinutes: 15,
      isEssential,
      status: "added",
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl border border-border shadow-2xl p-6 space-y-6 animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">
            Add Custom Activity to Day {activeDayIndex}
          </h3>
          <button
            onClick={() => setIsAddActivityModalOpen(false)}
            className="p-1.5 rounded-lg text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Activity Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Sunset Kayaking or Local Cooking Class"
              required
              className="w-full px-3.5 py-2 rounded-xl border border-border bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Time (HH:MM)
              </label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                className="w-full px-3.5 py-2 rounded-xl border border-border bg-slate-50 dark:bg-slate-800 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Duration (mins)
              </label>
              <input
                type="number"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                required
                className="w-full px-3.5 py-2 rounded-xl border border-border bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Anjuna Beach"
              required
              className="w-full px-3.5 py-2 rounded-xl border border-border bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Est. Cost (₹ INR)
              </label>
              <input
                type="number"
                value={cost}
                onChange={(e) => setCost(Number(e.target.value))}
                required
                className="w-full px-3.5 py-2 rounded-xl border border-border bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryType)}
                className="w-full px-3.5 py-2 rounded-xl border border-border bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="Food">Food</option>
                <option value="Beaches">Beaches</option>
                <option value="Nature">Nature</option>
                <option value="Culture">Culture</option>
                <option value="History">History</option>
                <option value="Shopping">Shopping</option>
                <option value="Adventure">Adventure</option>
                <option value="Transport">Transport</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="essential-check"
              checked={isEssential}
              onChange={(e) => setIsEssential(e.target.checked)}
              className="w-4 h-4 accent-teal-600 rounded cursor-pointer"
            />
            <label htmlFor="essential-check" className="text-xs font-medium cursor-pointer">
              Mark as Essential activity (Cannot be auto-swapped)
            </label>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/60">
            <button
              type="button"
              onClick={() => setIsAddActivityModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-border text-xs font-semibold hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md"
            >
              Add to Itinerary
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
