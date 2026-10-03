"use client";

import React, { useState } from "react";
import { useRoamwiseStore } from "@/store/useRoamwiseStore";
import { History, Volume2, Copy, Check, Trash2 } from "lucide-react";

export function TranslationHistoryCard() {
  const showToast = useRoamwiseStore((state) => state.showToast);

  const [history, setHistory] = useState([
    { id: "h1", from: "English", to: "Japanese", original: "Where is the station?", translated: "最寄りの駅はどこですか？", time: "10 mins ago" },
    { id: "h2", from: "English", to: "Japanese", original: "Do you have vegetarian options?", translated: "ベジタリアン料理はありますか？", time: "2 hours ago" },
    { id: "h3", from: "English", to: "Japanese", original: "How much does this cost?", translated: "これはいくらですか？", time: "Yesterday" },
  ]);

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast("Copied to Clipboard!", "Copied translation.");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleDelete = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  if (history.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-border/80 p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 flex items-center justify-center font-bold">
            <History className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
              Translation History & Recent Recalls
            </h3>
            <p className="text-xs text-muted-foreground">
              Quickly reuse and play recent translations during your trip.
            </p>
          </div>
        </div>

        <button
          onClick={() => setHistory([])}
          className="text-xs text-muted-foreground hover:text-rose-600"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-2.5">
        {history.map((item) => (
          <div
            key={item.id}
            className="p-3.5 rounded-2xl border border-border bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between gap-3 text-xs"
          >
            <div className="space-y-0.5 flex-1 min-w-0">
              <div className="text-muted-foreground font-medium truncate">
                "{item.original}"
              </div>
              <div className="font-extrabold text-sm text-slate-900 dark:text-slate-100 truncate">
                {item.translated}
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => handleSpeak(item.translated)}
                className="p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-border hover:bg-slate-100 text-muted-foreground hover:text-foreground"
                title="Play audio"
              >
                <Volume2 className="w-3.5 h-3.5 text-teal-600" />
              </button>
              <button
                onClick={() => handleCopy(item.id, item.translated)}
                className="p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-border hover:bg-slate-100 text-muted-foreground hover:text-foreground"
                title="Copy"
              >
                {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-border hover:bg-slate-100 text-muted-foreground hover:text-rose-600"
                title="Delete"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
