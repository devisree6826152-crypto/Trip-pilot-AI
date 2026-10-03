"use client";

import React, { useState } from "react";
import { ItineraryActivity } from "@/lib/types";
import { useRoamwiseStore } from "@/store/useRoamwiseStore";
import {
  Clock,
  MapPin,
  CheckCircle2,
  MoreVertical,
  Trash2,
  Edit,
  Info,
  Car,
  Tag,
  Star,
  RefreshCw,
  AlertCircle,
  Sparkles,
} from "lucide-react";

interface Props {
  activity: ItineraryActivity;
}

export function ItineraryItemCard({ activity }: Props) {
  const {
    toggleActivityComplete,
    removeActivity,
    setEditingActivity,
    setIsEditActivityModalOpen,
  } = useRoamwiseStore();

  const [showDetails, setShowDetails] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const isCompleted = activity.status === "completed";
  const isReplaced = activity.status === "replaced";
  const isModified = activity.status === "modified";
  const isAdded = activity.status === "added";

  return (
    <div
      className={`relative group rounded-2xl border transition-all duration-200 ${
        isCompleted
          ? "bg-slate-50/80 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-90"
          : isReplaced
          ? "bg-teal-500/5 border-teal-500/30 shadow-sm ring-1 ring-teal-500/20"
          : isModified
          ? "bg-amber-500/5 border-amber-500/30 shadow-sm"
          : "bg-white dark:bg-slate-900 border-border/80 shadow-sm hover:border-teal-500/40"
      }`}
    >
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Left Column: Time, Checkbox & Image */}
        <div className="flex items-start gap-3.5 flex-1 min-w-0">
          <button
            onClick={() => toggleActivityComplete(activity.id)}
            className={`mt-0.5 w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all ${
              isCompleted
                ? "bg-emerald-600 border-emerald-600 text-white"
                : "border-slate-300 dark:border-slate-700 hover:border-teal-500"
            }`}
            title={isCompleted ? "Mark as upcoming" : "Mark as completed"}
          >
            {isCompleted && <CheckCircle2 className="w-4 h-4" />}
          </button>

          {/* Attraction / Place Photo Thumbnail */}
          {activity.imageUrl && (
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-slate-900 shrink-0 border border-border/80 shadow-sm relative group/img">
              <img
                src={activity.imageUrl}
                alt={activity.title}
                className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-300"
              />
            </div>
          )}

          <div className="space-y-1 flex-1 min-w-0">
            {/* Time & Badges Row */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold font-mono text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                {activity.time}
              </span>

              <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{activity.durationMinutes}m</span>
              </span>

              {/* Category Badge */}
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                {activity.category}
              </span>

              {/* Essential vs Optional Badge */}
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  activity.isEssential
                    ? "bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20"
                    : "bg-slate-100 dark:bg-slate-800 text-muted-foreground"
                }`}
              >
                {activity.isEssential ? "Essential" : "Optional"}
              </span>

              {/* Status Pill */}
              {isReplaced && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-800 dark:text-teal-200 border border-teal-500/30 flex items-center gap-1">
                  <RefreshCw className="w-2.5 h-2.5" /> Replaced by AI
                </span>
              )}
              {isModified && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-200 border border-amber-500/30">
                  Modified
                </span>
              )}
              {isAdded && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-800 dark:text-emerald-200 border border-emerald-500/30">
                  Added
                </span>
              )}
            </div>

            {/* Title */}
            <h3
              className={`text-base font-bold text-slate-900 dark:text-slate-100 ${
                isCompleted ? "line-through opacity-70" : ""
              }`}
            >
              {activity.title}
            </h3>

            {/* Location & Travel time */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span className="truncate">{activity.location}</span>
              </span>

              {activity.travelTimeMinutes > 0 && (
                <span className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
                  <Car className="w-3.5 h-3.5" />
                  <span>{activity.travelTimeMinutes}m travel</span>
                </span>
              )}
            </div>

            {/* Replacement Reason Callout */}
            {activity.replacementReason && (
              <div className="mt-2 p-2 rounded-xl bg-teal-500/10 border border-teal-500/20 text-xs text-teal-900 dark:text-teal-200 font-medium">
                💡 {activity.replacementReason}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Cost & Actions Menu */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border/60">
          <div className="text-right">
            <span className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
              ₹{activity.cost.toLocaleString()}
            </span>
            <span className="text-[10px] text-muted-foreground block">
              {activity.cost === 0 ? "Included / Free" : "Est. Cost"}
            </span>
          </div>

          <div className="flex items-center gap-1 relative">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-xs flex items-center gap-1"
              title="View details"
            >
              <Info className="w-4 h-4" />
              <span className="hidden sm:inline text-[11px] font-semibold">
                {showDetails ? "Hide" : "Details"}
              </span>
            </button>

            {/* Actions Menu Trigger */}
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {/* Dropdown Menu */}
              {showMenu && (
                <div
                  onMouseLeave={() => setShowMenu(false)}
                  className="absolute right-0 mt-1 w-44 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-border py-1 z-30 animate-in fade-in zoom-in-95 duration-100"
                >
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      toggleActivityComplete(activity.id);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{isCompleted ? "Mark Uncomplete" : "Mark Complete"}</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowMenu(false);
                      setEditingActivity(activity);
                      setIsEditActivityModalOpen(true);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2"
                  >
                    <Edit className="w-3.5 h-3.5 text-amber-600" />
                    <span>Edit Time & Details</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowMenu(false);
                      removeActivity(activity.id);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 text-rose-600 flex items-center gap-2"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove Activity</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Details Section */}
      {showDetails && (
        <div className="px-5 pb-4 pt-1 border-t border-border/60 text-xs text-muted-foreground space-y-2 bg-slate-50/50 dark:bg-slate-800/30 rounded-b-2xl animate-in fade-in duration-150">
          <p className="leading-relaxed text-slate-700 dark:text-slate-300">
            {activity.description}
          </p>
          {activity.originalTitle && (
            <p className="text-[11px] text-amber-700 dark:text-amber-300">
              Original activity: <s>{activity.originalTitle}</s>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
