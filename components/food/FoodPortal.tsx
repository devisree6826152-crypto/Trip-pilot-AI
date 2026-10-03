"use client";

import React from "react";
import { useRoamwiseStore } from "@/store/useRoamwiseStore";
import { Utensils, MapPin, Plus, CalendarCheck } from "lucide-react";

export function FoodPortal() {
  const { selectedDestination, openRestaurantBookingModal } = useRoamwiseStore();

  const foodSpots = [
    {
      id: "food-1",
      name: "Souza Lobo Beach Shack",
      destination: "Goa",
      cuisine: "Authentic Goan Seafood & Thalis",
      imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
      rating: 4.9,
      priceForTwo: 1000,
      location: "Calangute Beach, North Goa",
      mustTry: ["Butter Garlic Prawns", "Kingfish Rava Fry", "Goan Fish Curry Thali", "Bebinca Dessert"],
    },
    {
      id: "food-2",
      name: "Fisherman's Wharf Riverside",
      destination: "Goa",
      cuisine: "Fine Coastal Dining & Live Music",
      imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
      rating: 4.8,
      priceForTwo: 2200,
      location: "Cavelossim / Calangute",
      mustTry: ["Lobster Thermidor", "Crab Xec Xec", "Pork Balchão", "Goan Sangria"],
    },
    {
      id: "food-3",
      name: "Gunpowder Assagao",
      destination: "Goa",
      cuisine: "South Indian Fusion & Garden Cocktails",
      imageUrl: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80",
      rating: 4.9,
      priceForTwo: 1600,
      location: "Assagao, North Goa",
      mustTry: ["Andhra Spicy Chicken", "Malabar Parotta", "Pineapple Curry", "Artisanal Gin Cocktails"],
    },
    {
      id: "food-4",
      name: "Tsukiji Outer Market Tasting",
      destination: "Tokyo",
      cuisine: "Street Seafood & Chef Sushi",
      imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80",
      rating: 4.9,
      priceForTwo: 3500,
      location: "Tsukiji, Tokyo",
      mustTry: ["Fresh Uni & Salmon Donburi", "Tamagoyaki Omelet", "A5 Wagyu Skewers"],
    },
  ];

  const filtered = foodSpots.filter(
    (f) => !selectedDestination || f.destination.toLowerCase() === selectedDestination.toLowerCase()
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-amber-950 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-950/90 via-slate-900/90 to-black/70 z-10" />
        <img
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80"
          alt="Food banner"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />

        <div className="relative z-20 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
            <Utensils className="w-3.5 h-3.5" />
            <span>Local Culinary & Dining Guide</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Authentic Food & Dining in <span className="text-amber-400">{selectedDestination}</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Handpicked Goan beach shacks, seafood fine dining, South Indian fusion garden bungalows, and street food markets. Reserve tables with instant conflict checking.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((spot) => (
          <div
            key={spot.id}
            className="bg-white dark:bg-slate-900 rounded-3xl border border-border/80 p-5 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-4"
          >
            <div className="flex gap-4 items-start">
              <img
                src={spot.imageUrl}
                alt={spot.name}
                className="w-24 h-24 rounded-2xl object-cover shrink-0 border border-border/80"
              />
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold text-amber-600 uppercase tracking-wider">
                  {spot.cuisine}
                </span>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                  {spot.name}
                </h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  <span>{spot.location}</span>
                  <span className="font-bold text-amber-400">★ {spot.rating}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-border/60">
              <span className="text-[11px] font-bold text-muted-foreground block uppercase">
                Must Try Dishes:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {spot.mustTry.map((dish, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-900 dark:text-amber-200 border border-amber-500/20"
                  >
                    🍲 {dish}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border/60">
              <div>
                <span className="text-[10px] text-muted-foreground block">Cost for two:</span>
                <span className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                  ₹{spot.priceForTwo.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    useRoamwiseStore.getState().setActiveTab("map-rides");
                    useRoamwiseStore.getState().showToast("Centered on Map 🗺️", `Focusing map on ${spot.name}.`);
                  }}
                  className="px-3 py-2 rounded-xl border border-border bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200"
                  title="Show restaurant location on Geoapify Map"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                </button>

                <button
                  onClick={() => openRestaurantBookingModal(spot)}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
                >
                  <CalendarCheck className="w-3.5 h-3.5" />
                  <span>Reserve Table & Add to Trip</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
