"use client";

import React, { useState } from "react";
import { MOCK_HOTEL_OPTIONS } from "@/lib/data/mockData";
import { HotelOption } from "@/lib/types";
import { useRoamwiseStore } from "@/store/useRoamwiseStore";
import {
  Hotel,
  Star,
  MapPin,
  CheckCircle2,
  Bed,
  ShieldCheck,
  Building2,
} from "lucide-react";

export function HotelBookingSection() {
  const { activeTrip, openHotelBookingModal, userBookings } = useRoamwiseStore();

  const [hotels, setHotels] = useState<HotelOption[]>(MOCK_HOTEL_OPTIONS);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filteredHotels = hotels.filter((h) => {
    if (selectedFilter === "All") return true;
    if (selectedFilter === "Luxury") return h.badge?.includes("Luxury");
    if (selectedFilter === "Best Seller") return h.badge?.includes("Best Seller");
    if (selectedFilter === "Value") return h.badge?.includes("Value");
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Header Context Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-border/80 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-lg shadow-teal-600/20 shrink-0">
            <Hotel className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-xl text-slate-900 dark:text-slate-100">
                Handpicked Hotels & Resorts in {activeTrip.destination}
              </h2>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                Verified Stays
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Curated luxury resorts, heritage villas & eco-stays matched with your {activeTrip.travelStyle} style and budget.
            </p>
          </div>
        </div>

        {/* Accommodation Budget Summary */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-border/80 text-right shrink-0">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
            Trip Stay Budget Allocation:
          </span>
          <span className="text-xl font-extrabold text-teal-600 dark:text-teal-400">
            ₹5,000 / night
          </span>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {["All", "Luxury", "Best Seller", "Value"].map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              selectedFilter === filter
                ? "bg-teal-600 text-white shadow-md"
                : "bg-white dark:bg-slate-800 border border-border text-slate-700 dark:text-slate-300 hover:bg-slate-100"
            }`}
          >
            {filter === "All" ? "🏨 All Hotels" : filter}
          </button>
        ))}
      </div>

      {/* Hotels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredHotels.map((hotel) => {
          const isBookedInStore = userBookings.some(
            (b) => b.title === hotel.name && (b.status === "upcoming" || b.status === "active")
          );
          return (
            <div
              key={hotel.id}
              className={`bg-white dark:bg-slate-900 rounded-3xl border transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl ${
                isBookedInStore
                  ? "border-emerald-500 ring-2 ring-emerald-500/30"
                  : "border-border/80 hover:border-teal-500/40"
              }`}
            >
              {/* Top Photo & Badge */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                <img
                  src={hotel.imageUrl}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Badge */}
                {hotel.badge && (
                  <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-bold text-amber-400 border border-slate-700 shadow-md">
                    {hotel.badge}
                  </div>
                )}

                {/* Rating */}
                <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-bold text-white flex items-center gap-1 border border-slate-700">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>{hotel.rating}</span>
                  <span className="text-[10px] text-slate-400">({hotel.reviewsCount})</span>
                </div>

                {/* Title & Location on Image */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-lg font-extrabold tracking-wide drop-shadow-md">
                    {hotel.name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-slate-300 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span className="truncate">{hotel.location}</span>
                  </div>
                </div>
              </div>

              {/* Hotel Details Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 border-b border-border/60 pb-2">
                    <span className="flex items-center gap-1.5">
                      <Bed className="w-4 h-4 text-teal-600" />
                      <span>Room: {hotel.roomType}</span>
                    </span>
                    <span className="text-emerald-600 font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Free Cancellation
                    </span>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-1.5">
                    {hotel.amenities.map((amenity, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price & Booking Button */}
                <div className="pt-4 border-t border-border/60 flex items-center justify-between gap-4 mt-auto">
                  <div>
                    <div className="text-xs text-muted-foreground">Price per night:</div>
                    <div className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
                      ₹{hotel.pricePerNight.toLocaleString()}
                    </div>
                    <div className="text-[10px] font-semibold text-teal-600">
                      Total for stay: ₹{hotel.totalPrice.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        useRoamwiseStore.getState().setActiveTab("map-rides");
                        useRoamwiseStore.getState().showToast("Centered on Map 🗺️", `Focusing map on ${hotel.name}.`);
                      }}
                      className="px-3 py-2.5 rounded-2xl border border-border bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200"
                      title="Show hotel location on Geoapify Map"
                    >
                      <MapPin className="w-4 h-4 text-sky-500" />
                    </button>

                    <button
                      onClick={() => openHotelBookingModal(hotel)}
                      className={`px-5 py-2.5 rounded-2xl font-bold text-xs shadow-md transition-all flex items-center gap-2 ${
                        isBookedInStore
                          ? "bg-emerald-600 text-white shadow-emerald-600/20"
                          : "bg-teal-600 hover:bg-teal-700 text-white shadow-teal-600/20 hover:scale-[1.02]"
                      }`}
                    >
                      {isBookedInStore ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Booked & Confirmed</span>
                        </>
                      ) : (
                        <>
                          <Building2 className="w-4 h-4" />
                          <span>Select & Book Stay</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
