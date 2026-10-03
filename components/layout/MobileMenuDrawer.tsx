"use client";

import React from "react";
import { useRoamwiseStore, TabType } from "@/store/useRoamwiseStore";
import {
  X,
  Compass,
  Landmark,
  Sparkles,
  Building2,
  CalendarCheck,
  Globe,
  Utensils,
  MapPin,
  Bot,
  Wallet,
  User,
  Sun,
  Moon,
  Home,
  Luggage,
} from "lucide-react";

interface MobileMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenuDrawer({ isOpen, onClose }: MobileMenuDrawerProps) {
  const { activeTab, setActiveTab, theme, toggleTheme, selectedDestination } = useRoamwiseStore();

  if (!isOpen) return null;

  const menuItems: { id: TabType; label: string; icon: React.ElementType }[] = [
    { id: "home", label: "Home Portal", icon: Home },
    { id: "places", label: "Places & Sights", icon: Landmark },
    { id: "experiences", label: "Experiences", icon: Sparkles },
    { id: "hotels", label: "Stays & Hotels", icon: Building2 },
    { id: "food", label: "Food & Dining", icon: Utensils },
    { id: "bookings", label: "My Bookings", icon: CalendarCheck },
    { id: "trips", label: "My Trips & Itinerary", icon: Luggage },
    { id: "translate", label: "AI Translator", icon: Globe },
    { id: "assistant", label: "AI Travel Companion", icon: Bot },
    { id: "budget", label: "Budget & Analytics", icon: Wallet },
    { id: "profile", label: "Profile & Settings", icon: User },
  ];

  const handleSelectTab = (tab: TabType) => {
    setActiveTab(tab);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md xl:hidden animate-in fade-in duration-200">
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white dark:bg-slate-900 border-l border-border shadow-2xl flex flex-col justify-between">
        {/* Top Branding & Theme Header */}
        <div className="p-5 border-b border-border flex items-center justify-between bg-slate-50 dark:bg-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold shadow-md">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight">TripPilot AI</span>
              <p className="text-[10px] text-muted-foreground">Global Travel OS</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-border bg-white dark:bg-slate-800 text-amber-500 dark:text-amber-400"
              title="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Items List */}
        <div className="p-4 space-y-1 overflow-y-auto flex-1">
          <div className="px-3 py-2 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
            Current Destination Context: <span className="text-teal-600 font-extrabold">{selectedDestination}</span>
          </div>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`w-full px-4 py-3 rounded-2xl flex items-center gap-3 text-xs font-bold transition-all ${
                  isActive
                    ? "bg-teal-600 text-white shadow-md shadow-teal-600/20"
                    : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-teal-500"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Plan Trip CTA Footer */}
        <div className="p-4 border-t border-border bg-slate-50 dark:bg-slate-800/80">
          <button
            onClick={() => handleSelectTab("plan")}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2"
          >
            <Bot className="w-4 h-4" />
            <span>Plan New Trip with AI</span>
          </button>
        </div>
      </div>
    </div>
  );
}
