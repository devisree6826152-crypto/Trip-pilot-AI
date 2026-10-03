"use client";

import React, { useState, useEffect } from "react";
import { useRoamwiseStore } from "@/store/useRoamwiseStore";
import { GLOBAL_DESTINATIONS } from "@/lib/data/globalTourismData";
import { MobileMenuDrawer } from "./MobileMenuDrawer";
import {
  Compass,
  Search,
  Sun,
  Moon,
  Bot,
  User,
  MapPin,
  Menu,
  Sparkles,
  Plus,
  Globe,
  Building2,
  Utensils,
  Landmark,
  CalendarCheck,
  Luggage,
} from "lucide-react";

export function Navbar() {
  const {
    activeTab,
    setActiveTab,
    selectedDestination,
    setSelectedDestination,
    theme,
    toggleTheme,
    setIsSearchOpen,
    setIsAddActivityModalOpen,
  } = useRoamwiseStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 dark:bg-slate-900/95 shadow-md py-2 backdrop-blur-md border-b border-border/80 text-slate-900 dark:text-slate-100"
            : "bg-white/80 dark:bg-slate-900/80 py-3 backdrop-blur-sm border-b border-border/40 text-slate-900 dark:text-slate-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 h-14">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <div
              onClick={() => setActiveTab("home")}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white flex items-center justify-center shadow-md shadow-teal-600/20 group-hover:scale-105 transition-transform shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight">
                  TripPilot AI
                </span>
                <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 hidden xl:inline-block">
                  Travel OS
                </span>
              </div>
            </div>
          </div>

          {/* Primary Global Product Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 text-xs font-bold shrink-0">
            <button
              onClick={() => setActiveTab("home")}
              className={`h-9 px-3 rounded-xl transition-colors whitespace-nowrap ${
                activeTab === "home"
                  ? "bg-teal-600 text-white shadow-sm"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              HOME
            </button>

            <button
              onClick={() => setActiveTab("places")}
              className={`h-9 px-3 rounded-xl transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "places"
                  ? "bg-teal-600 text-white shadow-sm"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <Landmark className="w-3.5 h-3.5" />
              <span>PLACES</span>
            </button>

            <button
              onClick={() => setActiveTab("experiences")}
              className={`h-9 px-3 rounded-xl transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "experiences"
                  ? "bg-teal-600 text-white shadow-sm"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>EXPERIENCES</span>
            </button>

            <button
              onClick={() => setActiveTab("hotels")}
              className={`h-9 px-3 rounded-xl transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "hotels"
                  ? "bg-teal-600 text-white shadow-sm"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>STAYS</span>
            </button>

            <button
              onClick={() => setActiveTab("food")}
              className={`h-9 px-3 rounded-xl transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "food"
                  ? "bg-teal-600 text-white shadow-sm"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>FOOD</span>
            </button>

            <button
              onClick={() => setActiveTab("bookings")}
              className={`h-9 px-3 rounded-xl transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "bookings"
                  ? "bg-teal-600 text-white shadow-sm"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>BOOKINGS</span>
            </button>

            <button
              onClick={() => setActiveTab("trips")}
              className={`h-9 px-3 rounded-xl transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "trips"
                  ? "bg-teal-600 text-white shadow-sm"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <Luggage className="w-3.5 h-3.5" />
              <span>MY TRIPS</span>
            </button>

            <button
              onClick={() => setActiveTab("translate")}
              className={`h-9 px-3 rounded-xl transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "translate"
                  ? "bg-teal-600 text-white shadow-sm"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>TRANSLATOR</span>
            </button>
          </nav>

          {/* Utility Controls & Single-Line Plan Trip CTA */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Global Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="h-9 px-3 rounded-xl border border-border bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-teal-500 text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap"
              title="Search globally (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden 2xl:inline-block text-[9px] font-mono px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                ⌘K
              </kbd>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-xl border border-border bg-slate-100 dark:bg-slate-800 text-amber-500 dark:text-amber-400 hover:scale-105 transition-all flex items-center justify-center shrink-0"
              title="Toggle Light / Dark Mode"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Plan a Trip Single-Line Button */}
            <button
              onClick={() => setActiveTab("plan")}
              className="h-9 px-4 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold text-xs shadow-md shadow-teal-600/20 transition-all hover:scale-[1.02] hidden sm:flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <Bot className="w-4 h-4 shrink-0 text-white" />
              <span className="whitespace-nowrap">Plan a Trip</span>
            </button>

            {/* Profile Button */}
            <button
              onClick={() => setActiveTab("profile")}
              className="w-9 h-9 rounded-xl border border-border bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 flex items-center justify-center shrink-0"
              title="Profile Settings"
            >
              <User className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="w-9 h-9 rounded-xl xl:hidden border border-border bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Secondary Contextual Destination Navigation Bar */}
        <div className="bg-slate-100/90 dark:bg-slate-800/90 border-t border-b border-border/60 py-1.5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto scrollbar-none text-xs font-semibold">
            {/* Active Destination Selector */}
            <div className="flex items-center gap-2 shrink-0">
              <MapPin className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span className="text-[11px] font-extrabold uppercase text-slate-500 dark:text-slate-400">
                Destination:
              </span>
              <select
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="bg-white dark:bg-slate-900 border border-border text-slate-900 dark:text-slate-100 font-extrabold text-xs px-2.5 py-1 rounded-lg focus:outline-none cursor-pointer"
              >
                {GLOBAL_DESTINATIONS.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name}, {d.country}
                  </option>
                ))}
              </select>
            </div>

            {/* Secondary Context Navigation Links for Active Destination */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              <button
                onClick={() => setActiveTab("trips")}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  activeTab === "trips" ? "bg-teal-600 text-white font-bold" : "hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("places")}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  activeTab === "places" ? "bg-teal-600 text-white font-bold" : "hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                }`}
              >
                Places
              </button>
              <button
                onClick={() => setActiveTab("experiences")}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  activeTab === "experiences" ? "bg-teal-600 text-white font-bold" : "hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                }`}
              >
                Experiences
              </button>
              <button
                onClick={() => setActiveTab("food")}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  activeTab === "food" ? "bg-teal-600 text-white font-bold" : "hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                }`}
              >
                Food
              </button>
              <button
                onClick={() => setActiveTab("hotels")}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  activeTab === "hotels" ? "bg-teal-600 text-white font-bold" : "hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                }`}
              >
                Stays
              </button>
              <button
                onClick={() => setActiveTab("map-rides")}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  activeTab === "map-rides" ? "bg-teal-600 text-white font-bold" : "hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                }`}
              >
                Map & Rides
              </button>
            </div>

            {/* Quick Actions */}
            <div className="hidden md:flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIsAddActivityModalOpen(true)}
                className="px-2.5 py-1 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 text-teal-700 dark:text-teal-300 font-bold border border-teal-500/30 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add to Trip</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer Overlay */}
      <MobileMenuDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
