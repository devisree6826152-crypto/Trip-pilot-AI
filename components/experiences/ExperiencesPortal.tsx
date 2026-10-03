"use client";

import React, { useState } from "react";
import { GLOBAL_EXPERIENCES } from "@/lib/data/globalTourismData";
import { TourismExperience, BookingRecord } from "@/lib/types";
import { useRoamwiseStore } from "@/store/useRoamwiseStore";
import {
  Sparkles,
  Search,
  MapPin,
  Clock,
  CheckCircle2,
  Calendar,
  Users,
  CreditCard,
  X,
  Plus,
  ShieldCheck,
} from "lucide-react";

const CATEGORIES = [
  "All",
  "Sightseeing",
  "Adventure",
  "Food Tours",
  "Cultural Experiences",
  "Nature",
  "Water Activities",
  "Nightlife",
];

export function ExperiencesPortal() {
  const { selectedDestination, addBookingRecord, addActivity, showToast } = useRoamwiseStore();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeBookingModal, setActiveBookingModal] = useState<TourismExperience | null>(null);

  // Form states for booking modal
  const [travelersCount, setTravelersCount] = useState(2);
  const [travelDate, setTravelDate] = useState("2026-10-17");
  const [timeSlot, setTimeSlot] = useState("");
  const [contactName, setContactName] = useState("Devisree Avva");

  const experiences = GLOBAL_EXPERIENCES.filter((exp) => {
    const matchesDest =
      !selectedDestination || exp.destination.toLowerCase() === selectedDestination.toLowerCase();
    const matchesCat = selectedCategory === "All" || exp.category === selectedCategory;
    return (matchesDest || selectedCategory !== "All") && matchesCat;
  });

  const handleConfirmBooking = (exp: TourismExperience) => {
    const totalPrice = exp.price * travelersCount;
    const refCode = `REF-${exp.destination.slice(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking: BookingRecord = {
      id: `book-${Date.now()}`,
      type: "Experience",
      title: exp.title,
      destination: exp.destination,
      provider: "TripPilot Local Partner",
      bookingDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      travelDate: travelDate,
      timeSlot: timeSlot || exp.availableTimes[0],
      travelersCount: travelersCount,
      totalPrice: totalPrice,
      status: "upcoming",
      confirmationRef: refCode,
      imageUrl: exp.imageUrl,
      details: `${exp.durationMinutes} Mins · ${exp.meetingPoint} · Includes: ${exp.whatsIncluded.slice(0, 2).join(", ")}`,
      isDemoEstimate: true,
    };

    addBookingRecord(newBooking, true);
    setActiveBookingModal(null);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-950/80 via-slate-900/90 to-black/60 z-10" />
        <img
          src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=80"
          alt="Experiences banner"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />

        <div className="relative z-20 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Top Experiences & Activities</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Curated Experiences in <span className="text-purple-400">{selectedDestination}</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            From scuba diving at coral reefs and catamaran sunset cruises to Tsukiji sushi tasting tours. Reserve your spots with instant booking confirmation.
          </p>
        </div>
      </div>

      {/* Category Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
              selectedCategory === cat
                ? "bg-purple-600 text-white shadow-md"
                : "bg-white dark:bg-slate-800 border border-border text-slate-700 dark:text-slate-300 hover:bg-slate-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="bg-white dark:bg-slate-900 rounded-3xl border border-border/80 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
          >
            <div className="relative h-56 w-full overflow-hidden bg-slate-900">
              <img
                src={exp.imageUrl}
                alt={exp.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-xl text-[11px] font-bold text-purple-400 border border-slate-700">
                {exp.category}
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-base font-extrabold tracking-wide drop-shadow-md line-clamp-1">
                  {exp.title}
                </h3>
                <div className="flex items-center gap-1 text-xs text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span className="truncate">{exp.location}</span>
                </div>
              </div>
            </div>

            <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                {exp.description}
              </p>

              <div className="space-y-1.5 pt-2 border-t border-border/60">
                <span className="text-[11px] font-bold text-muted-foreground block uppercase tracking-wider">
                  What's Included:
                </span>
                <div className="flex flex-wrap gap-1">
                  {exp.whatsIncluded.slice(0, 3).map((item, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      ✓ {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border/60">
                <div>
                  <span className="text-[10px] text-muted-foreground block">Price per person:</span>
                  <span className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
                    ₹{exp.price.toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={() => {
                    setTimeSlot(exp.availableTimes[0] || "");
                    setActiveBookingModal(exp);
                  }}
                  className="px-4 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-600/20 transition-all flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Experience</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Experience Booking Modal */}
      {activeBookingModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-border max-w-lg w-full p-6 shadow-2xl space-y-5 relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveBookingModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 block">
                Reserve Experience
              </span>
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-slate-100">
                {activeBookingModal.title}
              </h3>
              <p className="text-xs text-muted-foreground">
                {activeBookingModal.location} · {activeBookingModal.durationMinutes} mins
              </p>
            </div>

            {/* Demo Notice */}
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-900 dark:text-purple-200 text-xs flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-purple-600 shrink-0" />
              <span>Demo booking — Instant confirmation ref generated & linked to trip.</span>
            </div>

            {/* Form Fields */}
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold block text-slate-700 dark:text-slate-300 mb-1">
                  Traveler Name:
                </label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-border bg-slate-50 dark:bg-slate-800 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block text-slate-700 dark:text-slate-300 mb-1">
                    Select Date:
                  </label>
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-border bg-slate-50 dark:bg-slate-800 font-semibold"
                  />
                </div>

                <div>
                  <label className="font-bold block text-slate-700 dark:text-slate-300 mb-1">
                    Number of Guests:
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={travelersCount}
                    onChange={(e) => setTravelersCount(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-border bg-slate-50 dark:bg-slate-800 font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold block text-slate-700 dark:text-slate-300 mb-1">
                  Time Slot:
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-border bg-slate-50 dark:bg-slate-800 font-semibold"
                >
                  {activeBookingModal.availableTimes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Total & Action */}
            <div className="pt-3 border-t border-border/60 flex items-center justify-between">
              <div>
                <span className="text-xs text-muted-foreground block">Total Amount:</span>
                <span className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
                  ₹{(activeBookingModal.price * travelersCount).toLocaleString()}
                </span>
              </div>

              <button
                onClick={() => handleConfirmBooking(activeBookingModal)}
                className="px-5 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-lg transition-all"
              >
                Confirm & Add to Trip
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
