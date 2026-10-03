"use client";

import React, { useState } from "react";
import { useRoamwiseStore } from "@/store/useRoamwiseStore";
import { Download, CheckCircle2, WifiOff, Loader2 } from "lucide-react";

interface Props {
  localLang: string;
}

export function OfflinePacksCard({ localLang }: Props) {
  const showToast = useRoamwiseStore((state) => state.showToast);

  const [downloaded, setDownloaded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setDownloaded(true);
      showToast(
        "Offline Pack Ready!",
        `Downloaded ${localLang} travel phrases for restaurant, transport, hotel, and emergency use without internet.`
      );
    }, 1200);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-border/80 p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
            <WifiOff className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
              ⚡ Offline Language Pack
            </h3>
            <p className="text-xs text-muted-foreground">
              Download essential phrases for offline access when traveling without cellular data.
            </p>
          </div>
        </div>

        {downloaded ? (
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Downloaded</span>
          </span>
        ) : (
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="text-xs font-bold px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white shadow-sm transition-all flex items-center gap-1.5"
          >
            {isDownloading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
            <span>{isDownloading ? "Downloading..." : "Download Pack"}</span>
          </button>
        )}
      </div>

      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-border space-y-2 text-xs">
        <div className="font-bold text-slate-800 dark:text-slate-200">
          Included in {localLang} Offline Pack:
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-muted-foreground">
          <span>✓ 🍽️ Restaurant & Allergies</span>
          <span>✓ 🚕 Taxi & Directions</span>
          <span>✓ 🏨 Hotel Check-in</span>
          <span>✓ 🚨 Emergency & Medical</span>
        </div>
      </div>
    </div>
  );
}
