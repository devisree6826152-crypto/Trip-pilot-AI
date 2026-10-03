"use client";

import React from "react";
import { useRoamwiseStore } from "@/store/useRoamwiseStore";
import {
  X,
  CheckCircle2,
  RotateCcw,
  Clock,
  Wallet,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  Info,
  Sparkles,
} from "lucide-react";

export function ProposalReviewModal() {
  const {
    pendingProposal,
    isProposalModalOpen,
    acceptProposal,
    declineProposal,
  } = useRoamwiseStore();

  if (!isProposalModalOpen || !pendingProposal) return null;

  const {
    triggerTitle,
    whatChanged,
    whyChanged,
    proposalSummary,
    timeImpact,
    budgetImpact,
    originalActivities,
    proposedActivities,
    unaffectedCount,
  } = pendingProposal;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-3xl border border-border shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-border/60 bg-gradient-to-r from-slate-900 to-teal-950 text-white shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-teal-400" /> Selective Replanning Proposal
              </span>
              <span className="text-xs text-slate-300 font-medium">
                {unaffectedCount} Unaffected Bookings Preserved
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-white">
              {triggerTitle}
            </h2>
          </div>
          <button
            onClick={declineProposal}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1">
          {/* Key Impact Summary Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-900 dark:text-teal-200 space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider block text-teal-700 dark:text-teal-400">
                Agent Proposal Rationale
              </span>
              <p className="text-xs font-semibold leading-relaxed">
                {proposalSummary}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-border space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground uppercase">
                <Clock className="w-4 h-4 text-sky-600" />
                <span>Time Impact</span>
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {timeImpact}
              </div>
              <p className="text-[11px] text-muted-foreground">Schedule offset absorbed</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-border space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground uppercase">
                <Wallet className="w-4 h-4 text-emerald-600" />
                <span>Budget Impact</span>
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {budgetImpact === 0
                  ? "₹0 (No budget change)"
                  : budgetImpact < 0
                  ? `Saved ₹${Math.abs(budgetImpact).toLocaleString()}`
                  : `+₹${budgetImpact.toLocaleString()}`}
              </div>
              <p className="text-[11px] text-muted-foreground">Trip total target updated</p>
            </div>
          </div>

          {/* Explanation Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1">
              <h4 className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>1. What Changed</span>
              </h4>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{whatChanged}</p>
            </div>

            <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20 space-y-1">
              <h4 className="font-bold text-sky-900 dark:text-sky-200 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-sky-600" />
                <span>2. Why Plan Is Changing</span>
              </h4>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{whyChanged}</p>
            </div>
          </div>

          {/* Side-by-Side Before vs After Comparison */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Before / After Itinerary Comparison
              </h3>
              <span className="text-xs text-muted-foreground">
                Preserved activities highlighted in light gray
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Original Plan Column */}
              <div className="space-y-2 border border-border rounded-2xl p-4 bg-slate-50/70 dark:bg-slate-800/40">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-border/60 pb-2">
                  Original Plan (Before)
                </h4>
                <div className="space-y-2">
                  {originalActivities.map((act) => {
                    const isReplaced = proposedActivities.some(
                      (p) => p.id === `${act.id}-replaced` || p.originalTitle === act.title
                    );
                    return (
                      <div
                        key={act.id}
                        className={`p-2.5 rounded-xl border text-xs space-y-0.5 ${
                          isReplaced
                            ? "bg-rose-50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-900 text-rose-900 dark:text-rose-200"
                            : "bg-white dark:bg-slate-900 border-border opacity-70"
                        }`}
                      >
                        <div className="flex justify-between font-mono font-bold text-[11px]">
                          <span>{act.time}</span>
                          <span>₹{act.cost}</span>
                        </div>
                        <div className="font-semibold line-clamp-1">{act.title}</div>
                        <div className="text-[10px] text-muted-foreground">{act.category}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Proposed Adapted Plan Column */}
              <div className="space-y-2 border border-teal-500/30 rounded-2xl p-4 bg-teal-500/5">
                <h4 className="text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider border-b border-teal-500/20 pb-2">
                  Proposed Adapted Plan (After)
                </h4>
                <div className="space-y-2">
                  {proposedActivities.map((act) => {
                    const isChanged =
                      act.status === "replaced" || act.status === "modified" || act.status === "added";
                    return (
                      <div
                        key={act.id}
                        className={`p-2.5 rounded-xl border text-xs space-y-0.5 ${
                          isChanged
                            ? "bg-teal-500/20 border-teal-500/40 text-teal-950 dark:text-teal-100 font-medium shadow-sm"
                            : "bg-white dark:bg-slate-900 border-border opacity-70"
                        }`}
                      >
                        <div className="flex justify-between font-mono font-bold text-[11px]">
                          <span className="text-teal-700 dark:text-teal-300">{act.time}</span>
                          <span>₹{act.cost}</span>
                        </div>
                        <div className="font-bold flex items-center justify-between">
                          <span className="line-clamp-1">{act.title}</span>
                          {isChanged && (
                            <span className="text-[9px] uppercase font-extrabold px-1.5 py-0.5 rounded bg-teal-600 text-white">
                              {act.status}
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-muted-foreground">{act.category}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Action Buttons Footer */}
        <div className="p-5 sm:p-6 bg-slate-50 dark:bg-slate-800/80 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <button
            onClick={declineProposal}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl border border-border text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Decline / Undo Proposal</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => acceptProposal(pendingProposal)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-sm shadow-lg shadow-teal-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Accept & Apply Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
