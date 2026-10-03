"use client";

import React from "react";
import { useRoamwiseStore } from "@/store/useRoamwiseStore";
import { CheckCircle2, AlertTriangle, Info, X } from "lucide-react";

export function ToastNotification() {
  const toastMessage = useRoamwiseStore((state) => state.toastMessage);
  const clearToast = useRoamwiseStore((state) => state.clearToast);

  if (!toastMessage) return null;

  const { title, description, type } = toastMessage;

  return (
    <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50 max-w-md w-full animate-in fade-in slide-in-from-bottom-5 duration-200">
      <div
        className={`flex items-start gap-3 p-4 rounded-xl shadow-lg border backdrop-blur-md transition-all ${
          type === "warning"
            ? "bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-100"
            : type === "info"
            ? "bg-sky-500/10 border-sky-500/30 text-sky-900 dark:text-sky-100"
            : "bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-100"
        } bg-white/95 dark:bg-slate-900/95`}
      >
        <div className="mt-0.5 shrink-0">
          {type === "warning" ? (
            <AlertTriangle className="w-5 h-5 text-amber-600" />
          ) : type === "info" ? (
            <Info className="w-5 h-5 text-sky-600" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          )}
        </div>
        <div className="flex-1 text-sm">
          <h4 className="font-semibold">{title}</h4>
          {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
        </div>
        <button
          onClick={clearToast}
          className="text-muted-foreground hover:text-foreground p-1 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
