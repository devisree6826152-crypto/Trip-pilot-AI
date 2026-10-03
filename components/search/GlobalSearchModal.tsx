"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRoamwiseStore, TabType } from "@/store/useRoamwiseStore";
import { GLOBAL_PLACES, GLOBAL_DESTINATIONS } from "@/lib/data/globalTourismData";
import { MOCK_HOTEL_OPTIONS } from "@/lib/data/mockData";
import {
  Search,
  X,
  MapPin,
  Landmark,
  Building2,
  Utensils,
  Sparkles,
  Compass,
  ArrowRight,
  ChevronRight,
  Globe,
} from "lucide-react";

export function GlobalSearchModal() {
  const {
    isSearchOpen,
    setIsSearchOpen,
    setSelectedDestination,
    setActiveTab,
    openHotelBookingModal,
    showToast,
  } = useRoamwiseStore();

  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
    }
  }, [isSearchOpen]);

  // Keyboard shortcut listener (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const cleanQuery = query.trim().toLowerCase();

  // Category Filtering
  const matchingDestinations = GLOBAL_DESTINATIONS.filter(
    (d) =>
      cleanQuery.length > 0 &&
      (d.name.toLowerCase().includes(cleanQuery) || d.country.toLowerCase().includes(cleanQuery))
  );

  const matchingPlaces = GLOBAL_PLACES.filter(
    (p) =>
      cleanQuery.length > 0 &&
      (p.name.toLowerCase().includes(cleanQuery) ||
        p.description.toLowerCase().includes(cleanQuery) ||
        p.category.toLowerCase().includes(cleanQuery) ||
        p.location.toLowerCase().includes(cleanQuery))
  );

  const matchingHotels = MOCK_HOTEL_OPTIONS.filter(
    (h) =>
      cleanQuery.length > 0 &&
      (h.name.toLowerCase().includes(cleanQuery) ||
        h.location.toLowerCase().includes(cleanQuery) ||
        h.roomType.toLowerCase().includes(cleanQuery) ||
        (cleanQuery.includes("hotel") || cleanQuery.includes("stay") || cleanQuery.includes("resort")))
  );

  const mockFoodItems = [
    {
      id: "food-1",
      name: "Souza Lobo Beach Shack",
      cuisine: "Authentic Goan Seafood & Thalis",
      destination: "Goa",
      location: "Calangute Beach",
      price: 1000,
    },
    {
      id: "food-2",
      name: "Fisherman's Wharf Riverside",
      cuisine: "Fine Coastal Dining & Live Music",
      destination: "Goa",
      location: "Cavelossim",
      price: 2200,
    },
    {
      id: "food-3",
      name: "Gunpowder Assagao",
      cuisine: "South Indian Fusion",
      destination: "Goa",
      location: "Assagao",
      price: 1600,
    },
    {
      id: "food-4",
      name: "Tsukiji Outer Market Tasting",
      cuisine: "Street Seafood & Sushi",
      destination: "Tokyo",
      location: "Tsukiji",
      price: 3500,
    },
  ];

  const matchingFood = mockFoodItems.filter(
    (f) =>
      cleanQuery.length > 0 &&
      (f.name.toLowerCase().includes(cleanQuery) ||
        f.cuisine.toLowerCase().includes(cleanQuery) ||
        f.location.toLowerCase().includes(cleanQuery) ||
        cleanQuery.includes("food") ||
        cleanQuery.includes("restaurant") ||
        cleanQuery.includes("veg"))
  );

  const selectDestinationAndTab = (destName: string, tab: TabType) => {
    setSelectedDestination(destName);
    setActiveTab(tab);
    setIsSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-start justify-center p-4 sm:p-6 lg:p-10 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-border shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-border flex items-center gap-3 bg-slate-50 dark:bg-slate-800/80">
          <Search className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a city, place, hotel, restaurant, or activity (e.g. Goa, hotels under ₹3000)..."
            className="w-full bg-transparent text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100 placeholder:text-muted-foreground focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="px-3 py-1.5 rounded-xl border border-border text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
          >
            Esc
          </button>
        </div>

        {/* Quick Suggestion Chips when search is empty */}
        {!cleanQuery && (
          <div className="p-6 space-y-4 overflow-y-auto">
            <div className="space-y-2">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Popular Destination Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {["Goa", "Tokyo", "Paris", "Dubai", "Jaipur", "Kerala"].map((city) => (
                  <button
                    key={city}
                    onClick={() => {
                      setQuery(city);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-teal-500/10 hover:text-teal-600 dark:hover:text-teal-400 text-xs font-semibold border border-border flex items-center gap-1.5 transition-all"
                  >
                    <MapPin className="w-3.5 h-3.5 text-teal-500" />
                    <span>{city}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-border/60">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Popular Intent Queries
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  "beaches near Goa",
                  "vegetarian restaurants",
                  "hotels under ₹5000",
                  "adventure activities",
                  "places near my hotel",
                ].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-teal-500/10 hover:text-teal-600 dark:hover:text-teal-400 text-xs font-medium border border-border flex items-center gap-1.5 transition-all"
                  >
                    <Search className="w-3 h-3 text-slate-400" />
                    <span>"{term}"</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Search Results List */}
        {cleanQuery && (
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
            {/* Matching Destinations */}
            {matchingDestinations.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  <span className="flex items-center gap-1.5 text-teal-600 dark:text-teal-400">
                    <Globe className="w-4 h-4" /> Destinations ({matchingDestinations.length})
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {matchingDestinations.map((dest) => (
                    <div
                      key={dest.id}
                      onClick={() => selectDestinationAndTab(dest.name, "places")}
                      className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-teal-500/10 border border-border cursor-pointer transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={dest.imageUrl}
                          alt={dest.name}
                          className="w-10 h-10 rounded-xl object-cover"
                        />
                        <div>
                          <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400">
                            {dest.name}
                          </h4>
                          <span className="text-[11px] text-muted-foreground">{dest.country}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-teal-500" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Matching Places */}
            {matchingPlaces.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 text-sky-600 dark:text-sky-400">
                  <Landmark className="w-4 h-4" /> Places & Sightseeing ({matchingPlaces.length})
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {matchingPlaces.slice(0, 4).map((place) => (
                    <div
                      key={place.id}
                      onClick={() => selectDestinationAndTab(place.destination, "places")}
                      className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-sky-500/10 border border-border cursor-pointer transition-all flex items-center gap-3 group"
                    >
                      <img
                        src={place.imageUrl}
                        alt={place.name}
                        className="w-12 h-12 rounded-xl object-cover shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 truncate group-hover:text-sky-600 dark:group-hover:text-sky-400">
                          {place.name}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                          <span>{place.category}</span>
                          <span>·</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">
                            {place.estimatedCost === 0 ? "Free" : `₹${place.estimatedCost}`}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Matching Hotels */}
            {matchingHotels.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <Building2 className="w-4 h-4" /> Hotels & Stays ({matchingHotels.length})
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {matchingHotels.map((hotel) => (
                    <div
                      key={hotel.id}
                      onClick={() => {
                        openHotelBookingModal(hotel);
                        setIsSearchOpen(false);
                      }}
                      className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-500/10 border border-border cursor-pointer transition-all flex items-center gap-3 group"
                    >
                      <img
                        src={hotel.imageUrl}
                        alt={hotel.name}
                        className="w-12 h-12 rounded-xl object-cover shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                          {hotel.name}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                          <span className="font-bold text-emerald-600">
                            ₹{hotel.pricePerNight.toLocaleString()}/night
                          </span>
                          <span>·</span>
                          <span>★ {hotel.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Matching Food */}
            {matchingFood.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                  <Utensils className="w-4 h-4" /> Restaurants & Food ({matchingFood.length})
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {matchingFood.map((food) => (
                    <div
                      key={food.id}
                      onClick={() => selectDestinationAndTab(food.destination, "food")}
                      className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-amber-500/10 border border-border cursor-pointer transition-all flex items-center gap-3 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 flex items-center justify-center font-bold text-xs shrink-0">
                        🍲
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 truncate group-hover:text-amber-600">
                          {food.name}
                        </h4>
                        <div className="text-[11px] text-muted-foreground">
                          {food.cuisine} · ₹{food.price} for two
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {matchingDestinations.length === 0 &&
              matchingPlaces.length === 0 &&
              matchingHotels.length === 0 &&
              matchingFood.length === 0 && (
                <div className="py-12 text-center space-y-2">
                  <Compass className="w-8 h-8 text-slate-400 mx-auto" />
                  <p className="font-semibold text-xs text-slate-600 dark:text-slate-300">
                    No exact matches for "{query}".
                  </p>
                  <button
                    onClick={() => selectDestinationAndTab("Goa", "places")}
                    className="px-4 py-2 rounded-xl bg-teal-600 text-white font-bold text-xs shadow-sm"
                  >
                    Explore All Tourism Places
                  </button>
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
}
