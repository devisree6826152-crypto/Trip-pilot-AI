"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, Loader2, Sparkles } from "lucide-react";

interface Step {
  id: number;
  label: string;
}

const STEPS: Step[] = [
  { id: 1, label: "Analyzing your budget..." },
  { id: 2, label: "Finding suitable stays..." },
  { id: 3, label: "Planning transportation..." },
  { id: 4, label: "Finding food options..." },
  { id: 5, label: "Balancing activities..." },
  { id: 6, label: "Checking travel distances..." },
  { id: 7, label: "Optimizing your daily schedule..." },
  { id: 8, label: "Checking your budget..." },
  { id: 9, label: "Finalizing your itinerary..." },
];

interface PlanningLoadingStateProps {
  budgetAmount?: number;
  onComplete: () => void;
}

export function PlanningLoadingState({ budgetAmount = 30000, onComplete }: PlanningLoadingStateProps) {
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= STEPS.length) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 600);
          return prev;
        }
        return prev + 1;
      });
    }, 450);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="max-w-lg mx-auto my-12 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-border shadow-xl text-center space-y-8 animate-in fade-in zoom-in-95 duration-300">
      <div className="w-16 h-16 rounded-2xl bg-teal-500/10 text-teal-600 flex items-center justify-center mx-auto shadow-inner">
        <Sparkles className="w-8 h-8 animate-spin-slow text-teal-600" />
      </div>

      <div className="space-y-2">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100">
          TripPilot is building your trip around ₹{budgetAmount.toLocaleString()}
        </h2>
        <p className="text-xs text-muted-foreground">
          Enforcing budget constraints, selecting verified stays, dining venues, and optimal route chains.
        </p>
      </div>

      {/* Step checklist */}
      <div className="space-y-3 text-left border-t border-border/60 pt-6">
        {STEPS.map((step) => {
          const isDone = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          return (
            <div
              key={step.id}
              className={`flex items-center gap-3 text-xs sm:text-sm font-medium transition-all ${
                isDone
                  ? "text-emerald-700 dark:text-emerald-400 font-semibold"
                  : isCurrent
                  ? "text-slate-900 dark:text-slate-100 font-bold"
                  : "text-muted-foreground opacity-40"
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : isCurrent ? (
                <Loader2 className="w-5 h-5 text-teal-600 animate-spin shrink-0" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-700 shrink-0" />
              )}
              <span>{step.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
