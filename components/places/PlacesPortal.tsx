"use client";

import React, { useState } from "react";
import { GLOBAL_PLACES, GLOBAL_DESTINATIONS } from "@/lib/data/globalTourismData";
import { TourismPlace } from "@/lib/types";
import { useRoamwiseStore } from "@/store/useRoamwiseStore";
import { PlaceDetailModal } from "./PlaceDetailModal";
import {
  Landmark,
  Search,
  MapPin,
  Clock,
  Tag,
  Star,
  Heart,
  Plus,
  Sparkles,
  Compass,
  ArrowRight,
  Filter,
} from "lucide-react";

const CATEGORIES = [
  "All",
  "Popular",
  "Historical",
  "Beaches",
  "Culture",
  "Nature",
  "Adventure",
  "Family",
  "Museums",
  "Landmarks",
  "Hidden Gems",
];

export function PlacesPortal() {
  const { selectedDestination, setSelectedDestination, userFavorites, toggleFavorite, addActivity, showToast } =
    useRoamwiseStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activePlaceModal, setActivePlaceModal] = useState<TourismPlace | null>(null);

  const places = GLOBAL_PLACES.filter((p) => {
    const matchesDest =
      !selectedDestination || p.destination.toLowerCase() === selectedDestination.toLowerCase();
    const matchesCat = selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());

    return (matchesDest || searchQuery.length > 0) && matchesCat && matchesSearch;
  });

  const handleQuickAddToTrip = (place: TourismPlace) => {
    addActivity(2, {
      time: "15:00",
      title: place.name,
      description: place.description,
      location: place.location,
      category: (place.category === "Historical" ? "History" : place.category) as any,
      durationMinutes: place.estimatedDurationMinutes,
      cost: place.estimatedCost,
      travelTimeMinutes: 20,
      isEssential: true,
      status: "added",
      imageUrl: place.imageUrl,
    });
    showToast("Added to Trip!", `Added "${place.name}" to Day 2 itinerary.`, "success");
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-950/80 via-slate-900/90 to-black/60 z-10" />
        <img
          src="https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1600&q=80"
          alt="Tourism banner"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />

        <div className="relative z-20 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold">
            <Landmark className="w-3.5 h-3.5" />
            <span>Tourism & Places Discovery Portal</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Explore Iconic Places in <span className="text-teal-400">{selectedDestination}</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Discover historic forts, tropical beaches, UNESCO heritage sites, and hidden cultural gems. Inspect real visitor tips, timings, and fit them directly into your itinerary.
          </p>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search places, sights, or landmarks in ${selectedDestination}...`}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/10 dark:bg-slate-800/80 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>

            <select
              value={selectedDestination}
              onChange={(e) => setSelectedDestination(e.target.value)}
              className="w-full sm:w-auto px-4 py-3 rounded-2xl bg-teal-600 text-white font-bold text-xs shadow-md focus:outline-none cursor-pointer"
            >
              {GLOBAL_DESTINATIONS.map((d) => (
                <option key={d.id} value={d.name} className="bg-slate-900 text-white">
                  Switch: {d.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Category Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
                isActive
                  ? "bg-teal-600 text-white shadow-md"
                  : "bg-white dark:bg-slate-800 border border-border text-slate-700 dark:text-slate-300 hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Places Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {places.length === 0 ? (
          <div className="col-span-full py-16 text-center space-y-3 bg-white dark:bg-slate-900 rounded-3xl border border-border/80 p-8">
            <Compass className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="font-bold text-base text-slate-800 dark:text-slate-200">
              No places found matching "{searchQuery}" in {selectedDestination}
            </h3>
            <p className="text-xs text-muted-foreground">
              Try switching your category filter or search for places in another destination like Tokyo or Paris!
            </p>
          </div>
        ) : (
          places.map((place) => {
            const isFav = userFavorites.includes(place.id);
            return (
              <div
                key={place.id}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-border/80 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                {/* Photo & Top Badges */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                  <img
                    src={place.imageUrl}
                    alt={place.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-xl text-[11px] font-bold text-teal-400 border border-slate-700">
                    {place.category}
                  </div>

                  {/* Favorite Heart Button */}
                  <button
                    onClick={() => toggleFavorite(place.id)}
                    className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? "text-rose-500 fill-rose-500" : "text-slate-300"}`} />
                  </button>

                  {/* Title & Location Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-base font-extrabold tracking-wide drop-shadow-md line-clamp-1">
                      {place.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span className="truncate">{place.location}</span>
                    </div>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {place.description}
                  </p>

                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 pt-2 border-t border-border/60">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-3.5 h-3.5 text-sky-500" />
                      <span>{place.estimatedDurationMinutes} mins</span>
                    </span>
                    <span className="font-extrabold text-slate-900 dark:text-slate-100">
                      {place.estimatedCost === 0 ? "Free Entry" : `₹${place.estimatedCost.toLocaleString()}`}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      onClick={() => setActivePlaceModal(place)}
                      className="py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors"
                    >
                      Explore Place
                    </button>

                    <button
                      onClick={() => handleQuickAddToTrip(place)}
                      className="py-2 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Trip</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Detailed Place Modal */}
      {activePlaceModal && (
        <PlaceDetailModal
          place={activePlaceModal}
          onClose={() => setActivePlaceModal(null)}
        />
      )}
    </div>
  );
}
