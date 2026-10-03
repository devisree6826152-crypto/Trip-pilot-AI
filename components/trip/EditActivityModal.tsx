"use client";

import React, { useState, useEffect } from "react";
import { useRoamwiseStore } from "@/store/useRoamwiseStore";
import { CategoryType } from "@/lib/types";
import { X, Check, Clock, MapPin, Tag } from "lucide-react";

export function EditActivityModal() {
  const {
    editingActivity,
    isEditActivityModalOpen,
    setIsEditActivityModalOpen,
    updateActivity,
  } = useRoamwiseStore();

  const [time, setTime] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [cost, setCost] = useState(0);
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [category, setCategory] = useState<CategoryType>("Food");

  useEffect(() => {
    if (editingActivity) {
      setTime(editingActivity.time);
      setTitle(editingActivity.title);
      setLocation(editingActivity.location);
      setCost(editingActivity.cost);
      setDurationMinutes(editingActivity.durationMinutes);
      setCategory(editingActivity.category);
    }
  }, [editingActivity]);

  if (!isEditActivityModalOpen || !editingActivity) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateActivity(editingActivity.id, {
      time,
      title,
      location,
      cost: Number(cost) || 0,
      durationMinutes: Number(durationMinutes) || 30,
      category,
      status: "modified",
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl border border-border shadow-2xl p-6 space-y-6 animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">
            Edit Activity Details
          </h3>
          <button
            onClick={() => setIsEditActivityModalOpen(false)}
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

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/60">
            <button
              type="button"
              onClick={() => setIsEditActivityModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-border text-xs font-semibold hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
