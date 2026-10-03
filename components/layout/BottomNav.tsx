"use client";

import React from "react";
import { useRoamwiseStore, TabType } from "@/store/useRoamwiseStore";
import { Home, MapPin, Building2, PlusCircle, Globe, Bot } from "lucide-react";

export function BottomNav() {
  const { activeTab, setActiveTab } = useRoamwiseStore();

  const items: { id: TabType; label: string; icon: React.ElementType }[] = [
    { id: "home", label: "Home", icon: Home },
    { id: "trips", label: "Trips", icon: MapPin },
    { id: "hotels", label: "Hotels", icon: Building2 },
    { id: "plan", label: "Plan", icon: PlusCircle },
    { id: "translate", label: "Translate", icon: Globe },
    { id: "assistant", label: "AI Chat", icon: Bot },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-border px-2 py-1.5 flex items-center justify-around shadow-lg">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
              isActive
                ? "text-teal-600 dark:text-teal-400 font-semibold scale-105"
                : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
