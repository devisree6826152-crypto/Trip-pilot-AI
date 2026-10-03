"use client";

import React from "react";
import { useRoamwiseStore, TabType } from "@/store/useRoamwiseStore";
import {
  Home,
  MapPin,
  PlusCircle,
  Bot,
  Wallet,
  User,
  CheckCircle2,
  Sparkles,
  Zap,
  Globe,
  Building2,
} from "lucide-react";

interface NavItem {
  id: TabType;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

export function Sidebar() {
  const { activeTab, setActiveTab, activeTrip, setIsSimulateModalOpen } = useRoamwiseStore();

  const navItems: NavItem[] = [
    { id: "home", label: "Overview", icon: Home },
    { id: "trips", label: "My Trip (Goa)", icon: MapPin, badge: "Active" },
    { id: "hotels", label: "Hotels & Stays", icon: Building2, badge: "Stays" },
    { id: "plan", label: "Plan a Trip", icon: PlusCircle },
    { id: "translate", label: "Translate", icon: Globe, badge: "AI" },
    { id: "assistant", label: "AI Assistant", icon: Bot },
    { id: "budget", label: "Budget", icon: Wallet },
    { id: "summary", label: "Trip Summary", icon: CheckCircle2 },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-slate-50/70 dark:bg-slate-900/50 border-r border-border/80 min-h-[calc(100vh-57px)] p-4 shrink-0 justify-between">
      <div className="space-y-6">
        {/* Navigation Section */}
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
            Navigation
          </h3>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-teal-600 text-white shadow-md shadow-teal-600/20 font-semibold"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200/60 dark:hover:bg-slate-800/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-500"}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-teal-500/10 text-teal-700 dark:text-teal-300"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Demo Scenario Shortcut Box */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-800/80 dark:to-amber-950/20 border border-amber-200/60 dark:border-amber-800/30">
          <div className="flex items-center gap-2 mb-1.5">
            <Zap className="w-4 h-4 text-amber-600" />
            <h4 className="text-xs font-bold text-amber-900 dark:text-amber-200">
              Preset Demo Scenarios
            </h4>
          </div>
          <p className="text-[11px] text-amber-800/80 dark:text-amber-300/80 mb-3 leading-relaxed">
            Test how Roamwise selectively replans upon rain, delay, or budget cuts.
          </p>
          <button
            onClick={() => setIsSimulateModalOpen(true)}
            className="w-full text-xs font-semibold py-1.5 px-3 rounded-lg bg-amber-600 hover:bg-amber-700 text-white transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simulate Preset Event</span>
          </button>
        </div>
      </div>

      {/* Mini Active Trip Summary at Bottom */}
      <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-border text-xs space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground font-medium">Trip Budget</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            ₹{activeTrip.spentAmount.toLocaleString()} / ₹{activeTrip.totalBudget.toLocaleString()}
          </span>
        </div>
        <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-teal-600 h-full transition-all duration-300"
            style={{
              width: `${Math.min(
                100,
                Math.round((activeTrip.spentAmount / activeTrip.totalBudget) * 100)
              )}%`,
            }}
          />
        </div>
        <div className="flex justify-between text-[11px] text-muted-foreground">
          <span>{activeTrip.destination}</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
            {activeTrip.groupMatchPercentage}% Group Match
          </span>
        </div>
      </div>
    </aside>
  );
}
