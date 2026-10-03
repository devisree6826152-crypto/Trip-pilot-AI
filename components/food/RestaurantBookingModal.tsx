"use client";

import React, { useState } from "react";
import { useRoamwiseStore } from "@/store/useRoamwiseStore";
import { BookingRecord } from "@/lib/types";
import {
  X,
  Utensils,
  CheckCircle2,
  AlertTriangle,
  Info,
} from "lucide-react";

export function RestaurantBookingModal() {
  const {
    restaurantBookingModalData: spot,
    isRestaurantBookingModalOpen,
    closeRestaurantBookingModal,
    addBookingRecord,
    addActivity,
    activeTrip,
  } = useRoamwiseStore();

  const [resDate, setResDate] = useState("2026-11-11");
  const [selectedSlot, setSelectedSlot] = useState("19:30");
  const [guests, setGuests] = useState(2);
  const [seating, setSeating] = useState("Garden / Outdoor View");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [conflictWarning, setConflictWarning] = useState<string | null>(null);
  const [confirmedRef, setConfirmedRef] = useState("");

  if (!isRestaurantBookingModalOpen || !spot) return null;

  const timeSlots = [
    { time: "19:00", label: "7:00 PM" },
    { time: "19:30", label: "7:30 PM" },
    { time: "20:00", label: "8:00 PM" },
    { time: "20:30", label: "8:30 PM" },
  ];

  const handleConfirmReservation = () => {
    // Schedule Conflict Check
    const day2 = activeTrip.days.find((d) => d.dayIndex === 2);
    if (day2) {
      const lateAct = day2.activities.find((a) => a.time === "19:00" || a.time === "20:00");
      if (lateAct && selectedSlot === "19:30") {
        setConflictWarning(
          `⚠️ Schedule Conflict: Your activity "${lateAct.title}" ends around 20:00, overlapping with this 7:30 PM dinner table.`
        );
      }
    }

    const ref = `TP-REST-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedRef(ref);

    const estCost = spot.priceForTwo ? Math.round(spot.priceForTwo / 2) : 800;

    // Add to bookings record
    const booking: BookingRecord = {
      id: `bk-rest-${Date.now()}`,
      type: "Experience",
      title: spot.name,
      provider: spot.name,
      destination: spot.destination || activeTrip.destination,
      bookingDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      travelDate: resDate,
      travelersCount: guests,
      totalPrice: estCost,
      status: "upcoming",
      confirmationRef: ref,
      details: `Table for ${guests} · Slot ${selectedSlot} · ${seating}`,
    };

    addBookingRecord(booking, true);

    // Add to itinerary
    addActivity(2, {
      time: selectedSlot,
      title: `Dinner at ${spot.name}`,
      description: `Reserved Table (${seating}). Cuisine: ${spot.cuisine || "Local Dining"}. Ref: ${ref}`,
      location: spot.location || activeTrip.destination,
      category: "Food",
      durationMinutes: 90,
      cost: estCost,
      travelTimeMinutes: 15,
      isEssential: true,
      status: "added",
      imageUrl: spot.imageUrl,
    });

    setIsConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-border shadow-2xl w-full max-w-lg overflow-hidden my-8">
        {/* Header */}
        <div className="p-5 border-b border-border flex items-center justify-between bg-slate-50 dark:bg-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                {spot.name}
              </h3>
              <span className="text-xs text-amber-600 font-semibold">{spot.cuisine}</span>
            </div>
          </div>
          <button
            onClick={closeRestaurantBookingModal}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {!isConfirmed ? (
            <>
              {/* Slot Availability Notice */}
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs flex items-center justify-between">
                <span className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-amber-600" />
                  <span>Demo Availability Engine</span>
                </span>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300">
                  Instant Confirmation
                </span>
              </div>

              {/* Date & Guests Selection */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Reservation Date
                  </label>
                  <input
                    type="date"
                    value={resDate}
                    onChange={(e) => setResDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-border bg-slate-50 dark:bg-slate-800 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Party Size
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-border bg-slate-50 dark:bg-slate-800 text-xs font-semibold"
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Available Time Slots */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Select Time Slot
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      type="button"
                      onClick={() => setSelectedSlot(slot.time)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                        selectedSlot === slot.time
                          ? "bg-amber-500 text-white border-amber-500 shadow-md"
                          : "border-border bg-slate-50 dark:bg-slate-800 hover:bg-slate-100"
                      }`}
                    >
                      {slot.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Seating Preference */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Seating Preference
                </label>
                <select
                  value={seating}
                  onChange={(e) => setSeating(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-slate-50 dark:bg-slate-800 text-xs font-semibold"
                >
                  <option value="Garden / Outdoor View">Garden / Outdoor Deck</option>
                  <option value="Indoor Air-Conditioned">Indoor Air-Conditioned</option>
                  <option value="Rooftop / Beachfront">Rooftop / Beachfront</option>
                </select>
              </div>

              <button
                onClick={handleConfirmReservation}
                className="w-full py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Utensils className="w-4 h-4" />
                <span>Confirm Table Reservation</span>
              </button>
            </>
          ) : (
            <div className="text-center space-y-4 py-3">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 animate-bounce" />
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
                  Table Reservation Confirmed! 🎉
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Ref ID: <span className="font-mono font-bold text-amber-600">{confirmedRef}</span>
                </p>
              </div>

              {/* Schedule Conflict Warning overlay if detected */}
              {conflictWarning && (
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-900 dark:text-amber-200 text-left space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Potential Itinerary Conflict</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">{conflictWarning}</p>
                </div>
              )}

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-border text-left text-xs space-y-1">
                <div className="font-bold text-slate-800 dark:text-slate-200">{spot.name}</div>
                <div className="text-muted-foreground">
                  Date: {resDate} · Time: {selectedSlot} · {guests} Guests ({seating})
                </div>
              </div>

              <button
                onClick={closeRestaurantBookingModal}
                className="w-full py-3 rounded-2xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-extrabold text-xs shadow-md"
              >
                Done & View Itinerary
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
