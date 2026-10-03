"use client";

import React, { useState } from "react";
import { useRoamwiseStore } from "@/store/useRoamwiseStore";
import {
  Sparkles,
  Building2,
  Utensils,
  Car,
  Clock,
  CheckCircle2,
  Info,
  ExternalLink,
  BookmarkPlus,
  Compass,
} from "lucide-react";

export function TripReasoningCard() {
  const {
    activeTrip,
    openHotelBookingModal,
    openRestaurantBookingModal,
    addBookingRecord,
    showToast,
  } = useRoamwiseStore();

  const [isBudgetChangeOpen, setIsBudgetChangeOpen] = useState(false);
  const [newBudgetValue, setNewBudgetValue] = useState<number | "">(activeTrip.totalBudget);

  const { updateTripBudget, optimizeItineraryRoute } = useRoamwiseStore();

  const handleBudgetChangeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newBudgetValue !== "" && Number(newBudgetValue) > 1000) {
      updateTripBudget(Number(newBudgetValue));
      setIsBudgetChangeOpen(false);
    }
  };

  const stay = activeTrip.stayRecommendation || {
    id: "stay-rec-default",
    name: `${activeTrip.destination.split(",")[0]} Boutique Eco-Stay`,
    destination: activeTrip.destination,
    rating: 4.8,
    reviewsCount: 284,
    pricePerNight: Math.round((activeTrip.totalBudget * 0.3) / activeTrip.durationDays),
    totalPrice: Math.round(activeTrip.totalBudget * 0.3),
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    location: `${activeTrip.destination.split(",")[0]} Cultural Precinct`,
    badge: "Fits Lodging Allocation",
    amenities: ["Free Wi-Fi", "Organic Breakfast", "Swimming Pool", "Eco-Certified"],
    roomType: "Deluxe King Room",
  };

  const foodList = activeTrip.foodRecommendations || [
    { meal: "Breakfast", title: "Top-Rated Garden Cafe", cost: 250, cuisine: "Organic / Local", location: "Promenade", dietaryNotes: `${activeTrip.dietaryPreference || "Vegetarian"} Friendly` },
    { meal: "Lunch", title: "Heritage Regional Thali House", cost: 450, cuisine: "Authentic Regional", location: "Market Square", dietaryNotes: `${activeTrip.dietaryPreference || "Vegetarian"} Certified` },
    { meal: "Dinner", title: "Serene Courtyard Dining", cost: 650, cuisine: "Farm-to-Table", location: "Heritage Zone", dietaryNotes: `${activeTrip.dietaryPreference || "Vegetarian"} Certified` },
  ];

  const whyItems = activeTrip.whyThisPlan || [
    {
      category: "Accommodation Selection",
      explanation: `We selected a mid-range hotel because your ₹${activeTrip.totalBudget.toLocaleString()} budget leaves approximately ₹${Math.round(activeTrip.totalBudget * 0.3).toLocaleString()} for accommodation.`,
    },
    {
      category: "Transportation Route",
      explanation: `We chose public transport & shared shuttles on Day 2 because it saves approximately ₹800 over private taxis.`,
    },
    {
      category: "Dining Selection",
      explanation: `We selected these restaurants because they fit your ${activeTrip.dietaryPreference || "Vegetarian"} preference and food budget (₹1,250 / day).`,
    },
    {
      category: "Time & Schedule Constraints",
      explanation: `All activities fit strictly within your ~${activeTrip.durationDays * 8} available travel hours without over-scheduling.`,
    },
  ];

  return (
    <div className="space-y-6">
      {/* 1. WHY THIS PLAN? REASONING SECTION */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-border/80 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-border/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/10 text-teal-600 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
                Why TripPilot Chose This Plan
              </h2>
              <p className="text-xs text-muted-foreground">
                Transparent AI reasoning for budget allocations, lodging tiers, and transport modes.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsBudgetChangeOpen(!isBudgetChangeOpen)}
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-bold text-slate-800 dark:text-slate-200"
          >
            Budget Changed?
          </button>
        </div>

        {/* Budget Changed Input Popup Bar */}
        {isBudgetChangeOpen && (
          <form
            onSubmit={handleBudgetChangeSubmit}
            className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-between gap-3 animate-in fade-in"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-teal-900 dark:text-teal-200">
                New Target Budget (₹):
              </span>
              <input
                type="number"
                value={newBudgetValue}
                onChange={(e) => setNewBudgetValue(e.target.value === "" ? "" : Number(e.target.value))}
                placeholder="20000"
                className="w-32 px-3 py-1.5 rounded-xl border border-border bg-white dark:bg-slate-900 text-xs font-bold"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="px-3 py-1.5 rounded-xl bg-teal-600 text-white font-bold text-xs shadow-sm"
              >
                Apply New Budget
              </button>
              <button
                type="button"
                onClick={() => setIsBudgetChangeOpen(false)}
                className="px-2 py-1.5 text-xs text-muted-foreground font-bold"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Why Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {whyItems.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-border/80 space-y-1.5"
            >
              <span className="text-xs font-extrabold text-teal-700 dark:text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                {item.category}
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                "{item.explanation}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. RECOMMENDED STAY BASED ON BUDGET */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-border/80 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <div>
            <span className="text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider">
              AI Selected Stay (Fits ₹{activeTrip.totalBudget.toLocaleString()} Budget)
            </span>
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-slate-100">
              Recommended Accommodation
            </h3>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold text-xs border border-emerald-500/20">
            ✓ Fits Lodging Allocation
          </span>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6 p-4 rounded-2xl bg-slate-50/60 dark:bg-slate-800/40 border border-border">
          <img
            src={stay.imageUrl}
            alt={stay.name}
            className="w-full md:w-48 h-36 object-cover rounded-xl shrink-0"
          />

          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                {stay.name}
              </h4>
              <div className="text-right">
                <span className="text-base font-black text-teal-600 dark:text-teal-400">
                  ₹{stay.pricePerNight.toLocaleString()}
                </span>
                <span className="text-[11px] text-muted-foreground block">/ night</span>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">{stay.location} · {stay.roomType}</p>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              "{stay.name} fits your accommodation allocation and is located close to all planned activities."
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {stay.amenities.map((a, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-[10px] font-bold text-slate-700 dark:text-slate-300">
                  {a}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full md:w-36 shrink-0 border-t md:border-t-0 md:border-l border-border pt-3 md:pt-0 md:pl-4">
            <button
              onClick={() => openHotelBookingModal(stay)}
              className="w-full py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-sm text-center"
            >
              Book Stay
            </button>
            <button
              onClick={() => openHotelBookingModal(stay)}
              className="w-full py-2 rounded-xl border border-border text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 text-center"
            >
              View Stay Details
            </button>
          </div>
        </div>

        {/* Requirement #26 Disclosure Badge */}
        <p className="text-[11px] text-muted-foreground flex items-center gap-1.5 pt-1">
          <Info className="w-3.5 h-3.5 text-amber-500" />
          <span>AI estimated price — verify availability before booking.</span>
        </p>
      </div>

      {/* 3. AI PLANNED FOOD & DINING */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-border/80 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <div>
            <span className="text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider">
              Dietary Match: {activeTrip.dietaryPreference || "Vegetarian"}
            </span>
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-slate-100">
              AI Selected Dining & Food Plan
            </h3>
          </div>
          <span className="text-xs font-bold text-muted-foreground">
            Est. Total: ₹1,350 / day
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {foodList.map((food, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50/60 dark:bg-slate-800/40 border border-border space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-800 dark:text-amber-300">
                    {food.meal}
                  </span>
                  <span className="font-extrabold text-xs text-emerald-600">
                    ₹{food.cost}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  {food.title}
                </h4>
                <p className="text-xs text-muted-foreground">{food.cuisine} · {food.location}</p>
                <p className="text-[11px] font-semibold text-teal-700 dark:text-teal-400">
                  ✓ {food.dietaryNotes}
                </p>
              </div>

              <div className="flex gap-2 pt-2 border-t border-border/60">
                <button
                  onClick={() => openRestaurantBookingModal({ name: food.title, location: food.location, avgCostTwo: food.cost * 2, rating: 4.8 })}
                  className="flex-1 py-1.5 rounded-xl bg-teal-600 text-white font-bold text-[11px] text-center"
                >
                  Reserve
                </button>
                <button
                  onClick={() => openRestaurantBookingModal({ name: food.title, location: food.location, avgCostTwo: food.cost * 2, rating: 4.8 })}
                  className="px-2.5 py-1.5 rounded-xl border border-border text-[11px] font-bold"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
