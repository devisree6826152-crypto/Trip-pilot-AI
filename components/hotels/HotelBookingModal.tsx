"use client";

import React, { useState } from "react";
import { useRoamwiseStore } from "@/store/useRoamwiseStore";
import { HotelOption, BookingRecord } from "@/lib/types";
import {
  X,
  Star,
  MapPin,
  Bed,
  ShieldCheck,
  Building2,
  CheckCircle2,
  CreditCard,
  Info,
} from "lucide-react";

export function HotelBookingModal() {
  const {
    hotelBookingModalData: hotel,
    isHotelBookingModalOpen,
    closeHotelBookingModal,
    addBookingRecord,
  } = useRoamwiseStore();

  const [step, setStep] = useState<"details" | "guest" | "payment" | "confirmation">("details");

  // Form selections
  const [selectedRoom, setSelectedRoom] = useState(hotel?.roomType || "Deluxe Ocean View Room");
  const [checkInDate, setCheckInDate] = useState("2026-11-10");
  const [checkOutDate, setCheckOutDate] = useState("2026-11-13");
  const [guestsCount, setGuestsCount] = useState(2);
  const [guestName, setGuestName] = useState("Devisree Avva");
  const [guestEmail, setGuestEmail] = useState("devisree@example.com");
  const [guestPhone, setGuestPhone] = useState("+91 98765 43210");
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(null);

  if (!isHotelBookingModalOpen || !hotel) return null;

  // Price calculations
  const pricePerNight = hotel.pricePerNight || 3500;
  const nights = 3;
  const roomTotal = pricePerNight * nights;
  const taxesGst = Math.round(roomTotal * 0.18);
  const resortFee = 450;
  const grandTotal = roomTotal + taxesGst + resortFee;

  const handleConfirmPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const ref = `TP-HOTEL-${Math.floor(100000 + Math.random() * 900000)}`;
      const newBooking: BookingRecord = {
        id: `bk-${Date.now()}`,
        type: "Hotel",
        title: hotel.name,
        provider: hotel.name,
        destination: hotel.location,
        bookingDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        travelDate: checkInDate,
        travelersCount: guestsCount,
        totalPrice: grandTotal,
        status: "upcoming",
        confirmationRef: ref,
        details: `${selectedRoom} · ${guestsCount} Guests · ${nights} Nights (${checkInDate} to ${checkOutDate})`,
      };

      addBookingRecord(newBooking, true);
      setConfirmedBooking(newBooking);
      setIsProcessing(false);
      setStep("confirmation");
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-border shadow-2xl w-full max-w-2xl overflow-hidden my-8">
        {/* Modal Header */}
        <div className="p-5 border-b border-border flex items-center justify-between bg-slate-50 dark:bg-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-md">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-slate-100">
                {hotel.name}
              </h3>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <MapPin className="w-3 h-3 text-teal-500" />
                <span>{hotel.location}</span>
              </p>
            </div>
          </div>
          <button
            onClick={closeHotelBookingModal}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Steps */}
        <div className="p-6 space-y-6">
          {/* STEP 1: ROOM & PRICE DETAILS */}
          {step === "details" && (
            <div className="space-y-6">
              {/* Hotel Photo Banner */}
              <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-900">
                <img
                  src={hotel.imageUrl}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold">
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>{hotel.rating} Rating</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/80 text-white font-bold">
                    Verified Availability
                  </span>
                </div>
              </div>

              {/* Room Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Bed className="w-4 h-4 text-teal-600" /> Select Room Type
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { title: hotel.roomType || "Standard Room", price: pricePerNight },
                    { title: "Deluxe Ocean / Mountain Suite", price: pricePerNight + 1200 },
                  ].map((rm) => (
                    <button
                      key={rm.title}
                      type="button"
                      onClick={() => setSelectedRoom(rm.title)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        selectedRoom === rm.title
                          ? "bg-teal-50 dark:bg-teal-950/40 border-teal-500 text-teal-900 dark:text-teal-200 shadow-sm"
                          : "border-border bg-slate-50 dark:bg-slate-800"
                      }`}
                    >
                      <div className="font-bold text-xs">{rm.title}</div>
                      <div className="text-xs font-extrabold text-teal-600 dark:text-teal-400 mt-1">
                        ₹{rm.price.toLocaleString()} / night
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dates & Guests */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-muted-foreground block mb-1">
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-border bg-slate-50 dark:bg-slate-800 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-muted-foreground block mb-1">
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-border bg-slate-50 dark:bg-slate-800 text-xs font-semibold"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="text-[11px] font-bold text-muted-foreground block mb-1">
                    Guests
                  </label>
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-border bg-slate-50 dark:bg-slate-800 text-xs font-semibold"
                  >
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4 Guests</option>
                  </select>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-border space-y-2 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>
                    ₹{pricePerNight.toLocaleString()} x {nights} nights
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    ₹{roomTotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Taxes & GST (18%)</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    ₹{taxesGst.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Resort & Service Fee</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    ₹{resortFee.toLocaleString()}
                  </span>
                </div>
                <div className="pt-2 border-t border-border flex justify-between font-extrabold text-sm text-slate-900 dark:text-slate-100">
                  <span>Total Amount</span>
                  <span className="text-teal-600 dark:text-teal-400">
                    ₹{grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setStep("guest")}
                className="w-full py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs shadow-md transition-all"
              >
                Continue to Guest Details →
              </button>
            </div>
          )}

          {/* STEP 2: GUEST DETAILS & CANCELLATION POLICY */}
          {step === "guest" && (
            <div className="space-y-4">
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 border-b border-border pb-2">
                Step 2: Guest Information
              </h4>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-muted-foreground block mb-1">Lead Guest Full Name</label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-slate-50 dark:bg-slate-800 font-semibold"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-muted-foreground block mb-1">Email Address</label>
                    <input
                      type="email"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-slate-50 dark:bg-slate-800 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-muted-foreground block mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-slate-50 dark:bg-slate-800 font-semibold"
                    />
                  </div>
                </div>
              </div>

              {/* Cancellation Policy Banner */}
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-emerald-900 dark:text-emerald-300 block">
                    Free Cancellation Policy
                  </span>
                  <p className="text-emerald-700 dark:text-emerald-400 text-[11px] mt-0.5">
                    Cancel for full refund up to 24 hours before check-in date ({checkInDate}).
                  </p>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setStep("details")}
                  className="px-4 py-2.5 rounded-xl border border-border text-xs font-bold"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep("payment")}
                  className="flex-1 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md"
                >
                  Proceed to Payment Review →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: DEMO PAYMENT GATE */}
          {step === "payment" && (
            <div className="space-y-5">
              {/* Important Demo Notice */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-900 dark:text-amber-300">
                  <Info className="w-4 h-4 text-amber-600" />
                  <span>Demo Mode Payment</span>
                </div>
                <p className="text-amber-800 dark:text-amber-400 text-[11px]">
                  This is a demonstration booking flow. No real credit card charge will occur.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-border space-y-2">
                <div className="font-bold text-xs text-slate-800 dark:text-slate-200">
                  Booking Summary
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>Hotel: {hotel.name}</div>
                  <div>Room: {selectedRoom}</div>
                  <div>Dates: {checkInDate} to {checkOutDate} ({nights} nights)</div>
                  <div className="font-extrabold text-teal-600 dark:text-teal-400 pt-1">
                    Total Payable: ₹{grandTotal.toLocaleString()}
                  </div>
                </div>
              </div>

              <button
                disabled={isProcessing}
                onClick={handleConfirmPayment}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-teal-600/20 flex items-center justify-center gap-2 hover:scale-[1.01] transition-all"
              >
                {isProcessing ? (
                  <span>Processing Demo Reservation...</span>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>Confirm Demo Booking (₹{grandTotal.toLocaleString()})</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* STEP 4: CONFIRMATION & ITINERARY LINK */}
          {step === "confirmation" && confirmedBooking && (
            <div className="text-center space-y-4 py-2">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 animate-bounce" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
                  Hotel Booking Confirmed! 🎉
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Confirmation Ref: <span className="font-mono font-bold text-teal-600">{confirmedBooking.confirmationRef}</span>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-border text-left text-xs space-y-1.5">
                <div className="font-bold text-slate-800 dark:text-slate-200">
                  {confirmedBooking.title}
                </div>
                <div className="text-muted-foreground">{confirmedBooking.details}</div>
                <div className="font-extrabold text-emerald-600">
                  Total Paid: ₹{confirmedBooking.totalPrice.toLocaleString()} (Demo)
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-xs text-teal-900 dark:text-teal-200">
                ⚡ This stay has been automatically added to your trip budget and accommodation schedule!
              </div>

              <button
                onClick={closeHotelBookingModal}
                className="w-full py-3 rounded-2xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-extrabold text-xs shadow-md"
              >
                Done & View My Trip
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
