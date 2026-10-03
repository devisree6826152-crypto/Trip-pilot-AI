"use client";

import React, { useState } from "react";
import { useRoamwiseStore } from "@/store/useRoamwiseStore";
import { BookingRecord } from "@/lib/types";
import {
  CalendarCheck,
  Building2,
  Sparkles,
  Car,
  Clock,
  MapPin,
  CheckCircle2,
  XCircle,
  Trash2,
  Compass,
  Plus,
  Eye,
  Edit3,
} from "lucide-react";

export function BookingsPortal() {
  const { userBookings, cancelBookingRecord, setActiveTab, addActivity, showToast } = useRoamwiseStore();
  const [selectedStatusTab, setSelectedStatusTab] = useState<"all" | "upcoming" | "completed" | "cancelled">("upcoming");
  const [activeBookingModal, setActiveBookingModal] = useState<BookingRecord | null>(null);

  const filteredBookings = userBookings.filter((b) => {
    if (selectedStatusTab === "all") return true;
    return b.status === selectedStatusTab;
  });

  const handleAddBookingToTrip = (b: BookingRecord) => {
    addActivity(2, {
      time: "14:00",
      title: `${b.type}: ${b.title}`,
      description: `Confirmed booking ref: ${b.confirmationRef}. ${b.details}`,
      location: b.destination,
      category: b.type === "Hotel" ? "Transport" : "Culture",
      durationMinutes: 90,
      cost: b.totalPrice,
      travelTimeMinutes: 15,
      isEssential: true,
      status: "added",
    });
    showToast("Booking Linked to Itinerary!", `Added "${b.title}" to Day 2 schedule.`, "success");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Header Context Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-border/80 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-lg shadow-teal-600/20 shrink-0">
            <CalendarCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-xl text-slate-900 dark:text-slate-100">
                My Bookings & Reservations
              </h2>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                Synced with Trip Budget
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Manage your confirmed resort stays, scuba expeditions, local transport, and food experiences.
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab("hotels")}
          className="px-5 py-2.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-600/20 transition-all shrink-0"
        >
          Book New Stay / Experience
        </button>
      </div>

      {/* Booking Status Tabs */}
      <div className="flex items-center gap-2 border-b border-border/60 pb-3 overflow-x-auto scrollbar-none">
        {(["upcoming", "completed", "cancelled", "all"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedStatusTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all capitalize shrink-0 ${
              selectedStatusTab === tab
                ? "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-md"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
            }`}
          >
            {tab === "all" ? "All Bookings" : tab}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <div className="py-16 text-center space-y-3 bg-white dark:bg-slate-900 rounded-3xl border border-border/80 p-8">
            <Compass className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="font-bold text-base text-slate-800 dark:text-slate-200">
              No {selectedStatusTab} bookings found
            </h3>
            <p className="text-xs text-muted-foreground max-w-md mx-auto">
              Explore handpicked hotels, scuba expeditions, or dining experiences to start your journey.
            </p>
            <button
              onClick={() => setActiveTab("hotels")}
              className="mt-2 px-4 py-2 rounded-xl bg-teal-600 text-white font-bold text-xs shadow-md"
            >
              Browse Stays & Hotels
            </button>
          </div>
        ) : (
          filteredBookings.map((b) => {
            const isCancelled = b.status === "cancelled";
            return (
              <div
                key={b.id}
                className={`bg-white dark:bg-slate-900 rounded-3xl border p-5 shadow-sm transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 ${
                  isCancelled
                    ? "border-rose-500/30 opacity-70 bg-rose-500/5"
                    : "border-border/80 hover:border-teal-500/40"
                }`}
              >
                <div className="flex items-start gap-4">
                  {b.imageUrl ? (
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-900 shrink-0 border border-border/80">
                      <img src={b.imageUrl} alt={b.title} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-2xl bg-teal-500/10 text-teal-600 flex items-center justify-center font-bold shrink-0">
                      {b.type === "Hotel" ? <Building2 className="w-6 h-6" /> : <Sparkles className="w-6 h-6" />}
                    </div>
                  )}

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {b.type}
                      </span>
                      <span className="text-xs font-mono font-bold text-teal-600 dark:text-teal-400">
                        Ref: {b.confirmationRef}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                      {b.title}
                    </h3>

                    <p className="text-xs text-muted-foreground">{b.details}</p>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 dark:text-slate-400 pt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-teal-600" />
                        <span>{b.destination}</span>
                      </span>
                      <span className="flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5 text-sky-500" />
                        <span>{b.travelDate}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right side status, cost & action buttons (Req #19) */}
                <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 border-border/60 pt-3 md:pt-0 shrink-0 space-y-2">
                  <div className="md:text-right">
                    <span className="text-xs text-muted-foreground block">Total Amount:</span>
                    <span className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
                      ₹{b.totalPrice.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 mt-2">
                    <button
                      onClick={() => setActiveBookingModal(b)}
                      className="px-2.5 py-1.5 rounded-xl border border-border text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </button>

                    {!isCancelled && (
                      <>
                        <button
                          onClick={() => handleAddBookingToTrip(b)}
                          className="px-2.5 py-1.5 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-700 dark:text-teal-300 font-bold text-xs flex items-center gap-1 border border-teal-500/30"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Trip</span>
                        </button>

                        <button
                          onClick={() => cancelBookingRecord(b.id)}
                          className="p-1.5 rounded-xl border border-border hover:bg-rose-500/10 text-muted-foreground hover:text-rose-600 transition-colors"
                          title="Cancel booking"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Booking View Detail Modal */}
      {activeBookingModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-border shadow-2xl p-6 max-w-md w-full space-y-4">
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-slate-100">
              Booking Details
            </h3>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-border text-xs space-y-2">
              <div>Provider: <span className="font-bold">{activeBookingModal.provider}</span></div>
              <div>Ref Code: <span className="font-mono font-bold text-teal-600">{activeBookingModal.confirmationRef}</span></div>
              <div>Date: <span className="font-semibold">{activeBookingModal.travelDate}</span></div>
              <div>Details: <span className="text-muted-foreground">{activeBookingModal.details}</span></div>
              <div className="pt-2 border-t border-border font-extrabold text-sm text-teal-600">
                Total Paid: ₹{activeBookingModal.totalPrice.toLocaleString()}
              </div>
            </div>

            <button
              onClick={() => setActiveBookingModal(null)}
              className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs"
            >
              Close Window
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
