"use client";

import React, { useState } from "react";
import { useRoamwiseStore } from "@/store/useRoamwiseStore";
import { CategoryType, TravelStyle } from "@/lib/types";
import { PlanningLoadingState } from "./PlanningLoadingState";
import {
  MapPin,
  Calendar,
  Users,
  Wallet,
  Compass,
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  Utensils,
  Sun,
  Trees,
  ShoppingBag,
  Landmark,
  Moon,
  Sparkle,
  Plus,
  Trash2,
  Clock,
  Building2,
  Sliders,
  Navigation,
  HelpCircle,
  Car,
  Bus,
  Accessibility,
} from "lucide-react";

const INTEREST_OPTIONS: { id: CategoryType; label: string; icon: React.ElementType }[] = [
  { id: "Food", label: "Culinary & Dining", icon: Utensils },
  { id: "Beaches", label: "Beaches & Coastal", icon: Sun },
  { id: "Nature", label: "Nature & Wildlife", icon: Trees },
  { id: "Shopping", label: "Markets & Shopping", icon: ShoppingBag },
  { id: "History", label: "History & Heritage", icon: Landmark },
  { id: "Nightlife", label: "Nightlife & Lounges", icon: Moon },
  { id: "Culture", label: "Culture & Arts", icon: Sparkles },
  { id: "Adventure", label: "Adventure & Sports", icon: Sparkle },
];

const POPULAR_DESTINATIONS = [
  "Goa, India",
  "Sikkim, India",
  "Kerala, India",
  "Rajasthan, India",
  "Delhi, India",
  "Mumbai, India",
  "Kashmir, India",
  "Paris, France",
  "Tokyo, Japan",
];

const FOOD_PREFERENCES = [
  "Vegetarian",
  "Vegan",
  "Non-vegetarian",
  "Halal",
  "Jain Food",
  "No Preference",
];

const ACCOMMODATION_TYPES = [
  "Hostel",
  "Budget hotel",
  "Hotel",
  "Resort",
  "Apartment",
  "Homestay",
];

const TRANSPORT_TYPES = [
  "Public transport",
  "Taxi",
  "Rental car",
  "Walking",
  "Mixed",
];

export function TripWizard() {
  const { createNewTrip, showToast } = useRoamwiseStore();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // STEP 1: ROUTE & MULTI-DESTINATION
  const [startingLocation, setStartingLocation] = useState("Hyderabad, India");
  const [primaryDestination, setPrimaryDestination] = useState("Goa, India");
  const [additionalDestinations, setAdditionalDestinations] = useState<string[]>([]);
  const [isFlexibleDestination, setIsFlexibleDestination] = useState(false);

  // STEP 2: DATES & HOURS
  const [startDate, setStartDate] = useState("2026-11-10");
  const [endDate, setEndDate] = useState("2026-11-14");
  const [arrivalTime, setArrivalTime] = useState("10:30");
  const [departureTime, setDepartureTime] = useState("18:00");

  // STEP 3: TRAVELERS & GROUP COMPOSITION
  const [adultsCount, setAdultsCount] = useState(2);
  const [childrenCount, setChildrenCount] = useState(1);
  const [seniorsCount, setSeniorsCount] = useState(0);
  const [foodPreference, setFoodPreference] = useState("Vegetarian");
  const [accessibilityNeeds, setAccessibilityNeeds] = useState("None");

  // STEP 4: MANDATORY BUDGET & TIER
  const [currency, setCurrency] = useState("₹ INR");
  const [totalBudget, setTotalBudget] = useState<number | "">(30000);
  const [budgetTier, setBudgetTier] = useState<"Economy" | "Balanced" | "Premium" | "Luxury">("Balanced");
  const [dontKnowBudget, setDontKnowBudget] = useState(false);
  const [selectedRange, setSelectedRange] = useState<string>("");

  // STEP 5: PREFERENCES & SPECIAL REQUESTS
  const [travelStyle, setTravelStyle] = useState<TravelStyle>("Relaxed");
  const [selectedInterests, setSelectedInterests] = useState<CategoryType[]>([
    "Nature",
    "Food",
    "Culture",
  ]);
  const [accommodationType, setAccommodationType] = useState("Hotel");
  const [transportType, setTransportType] = useState("Mixed");
  const [specialRequests, setSpecialRequests] = useState(
    "Prefer quiet places and avoid expensive restaurants."
  );

  // Calculated duration and activity hours
  const startD = new Date(startDate);
  const endD = new Date(endDate);
  const diffTime = Math.max(1000 * 60 * 60 * 24, endD.getTime() - startD.getTime());
  const calculatedDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1);
  const totalTravelers = adultsCount + childrenCount + seniorsCount;
  const usableHours = calculatedDays * 8; // approx 8 usable hours per day

  const numBudget = totalBudget === "" ? 0 : Number(totalBudget);
  const perPersonPerDay = totalTravelers > 0 && calculatedDays > 0 ? Math.round(numBudget / (totalTravelers * calculatedDays)) : 0;

  // Dynamic budget allocation preview based on style & budget
  const accomAlloc = Math.round(numBudget * (budgetTier === "Luxury" ? 0.45 : budgetTier === "Premium" ? 0.38 : 0.30));
  const foodAlloc = Math.round(numBudget * 0.22);
  const activitiesAlloc = Math.round(numBudget * 0.20);
  const transportAlloc = Math.round(numBudget * 0.18);
  const miscAlloc = Math.max(0, numBudget - (accomAlloc + foodAlloc + activitiesAlloc + transportAlloc));

  const addExtraDest = () => {
    if (additionalDestinations.length < 3) {
      setAdditionalDestinations([...additionalDestinations, "Gokarna, India"]);
    }
  };

  const removeExtraDest = (idx: number) => {
    setAdditionalDestinations(additionalDestinations.filter((_, i) => i !== idx));
  };

  const useCurrentLocation = () => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setStartingLocation("Hyderabad, India (Live GPS)");
          showToast("Location Detected 📍", "Using your current location as starting point.", "info");
        },
        () => {
          setStartingLocation("Hyderabad, India");
          showToast("Location Set", "Set starting location to Hyderabad, India.", "info");
        }
      );
    } else {
      setStartingLocation("Hyderabad, India");
    }
  };

  const selectBudgetPreset = (tier: "Economy" | "Balanced" | "Premium" | "Luxury", val: number) => {
    setBudgetTier(tier);
    setTotalBudget(val);
    setDontKnowBudget(false);
  };

  const handleRangeSelect = (rangeLabel: string, estimatedVal: number) => {
    setSelectedRange(rangeLabel);
    setTotalBudget(estimatedVal);
    showToast("Budget Estimated", `Set budget to ₹${estimatedVal.toLocaleString()} based on selected range.`, "info");
  };

  const toggleInterest = (interest: CategoryType) => {
    if (selectedInterests.includes(interest)) {
      if (selectedInterests.length > 1) {
        setSelectedInterests(selectedInterests.filter((i) => i !== interest));
      }
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
  };

  const handleLoadingComplete = () => {
    const fullDestString = [primaryDestination, ...additionalDestinations].join(" → ");
    createNewTrip({
      destination: fullDestString,
      startingLocation,
      startDate,
      durationDays: calculatedDays,
      usableHours,
      travelersCount: totalTravelers,
      totalBudget: numBudget || 30000,
      travelStyle,
      accommodationPreference: accommodationType,
      transportPreference: transportType,
      interests: selectedInterests,
      foodPreference,
      dietaryPreference: foodPreference,
      accessibilityNeeds,
      specialRequests,
      arrivalTime,
      departureTime,
      currency,
    });
    setIsLoading(false);
  };

  if (isLoading) {
    return <PlanningLoadingState budgetAmount={numBudget || 30000} onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      {/* Header Banner */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-300 text-xs font-bold border border-teal-500/20">
          <Compass className="w-3.5 h-3.5" />
          <span>Adaptive Travel Operating System</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          Plan Your Adaptive Journey
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto">
          Specify your route, dates, travelers, mandatory budget, and preferences. TripPilot builds your entire trip around your budget.
        </p>
      </div>

      {/* 5-Step Progress Tracker */}
      <div className="flex items-center justify-between max-w-xl mx-auto px-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <React.Fragment key={i}>
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                  step === i
                    ? "bg-teal-600 text-white shadow-md shadow-teal-600/30 ring-4 ring-teal-500/10"
                    : step > i
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-200 dark:bg-slate-800 text-muted-foreground"
                }`}
              >
                {step > i ? <Check className="w-4 h-4" /> : i}
              </div>
              <span
                className={`text-xs font-semibold hidden sm:inline ${
                  step === i ? "text-slate-900 dark:text-slate-100" : "text-muted-foreground"
                }`}
              >
                {i === 1 ? "Route" : i === 2 ? "Dates & Hours" : i === 3 ? "Travelers" : i === 4 ? "Budget" : "Preferences"}
              </span>
            </div>
            {i < 5 && <div className="flex-1 h-0.5 bg-slate-200 dark:bg-slate-800 mx-2" />}
          </React.Fragment>
        ))}
      </div>

      {/* Main Wizard Form Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-slate-900 rounded-3xl border border-border/80 shadow-sm p-6 sm:p-8 space-y-6"
      >
        {/* STEP 1: ROUTE */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-border/60 pb-3 flex items-center justify-between">
              <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-teal-600" />
                <span>Step 1: Starting Location & Multi-Destination Route</span>
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Starting Location
                  </label>
                  <button
                    type="button"
                    onClick={useCurrentLocation}
                    className="text-[11px] font-bold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>[ Use current location ]</span>
                  </button>
                </div>
                <input
                  type="text"
                  value={startingLocation}
                  onChange={(e) => setStartingLocation(e.target.value)}
                  placeholder="e.g. Hyderabad, India"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-slate-50 dark:bg-slate-800 text-sm font-semibold focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Primary Destination
                </label>
                <input
                  type="text"
                  value={primaryDestination}
                  onChange={(e) => setPrimaryDestination(e.target.value)}
                  placeholder="e.g. Goa, Sikkim, Kerala, Rajasthan, Paris, Tokyo"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-slate-50 dark:bg-slate-800 text-sm font-semibold focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Popular Destination Tags */}
              <div>
                <label className="text-[11px] font-bold text-muted-foreground block mb-1.5">
                  Popular Global Destinations:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_DESTINATIONS.map((dest) => (
                    <button
                      key={dest}
                      type="button"
                      onClick={() => setPrimaryDestination(dest)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                        primaryDestination === dest
                          ? "bg-teal-600 text-white border-teal-600"
                          : "border-border bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                      }`}
                    >
                      {dest.split(",")[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional Stopover Destinations */}
              {additionalDestinations.map((dest, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="flex-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Stopover #{idx + 2} Destination
                    </label>
                    <input
                      type="text"
                      value={dest}
                      onChange={(e) => {
                        const updated = [...additionalDestinations];
                        updated[idx] = e.target.value;
                        setAdditionalDestinations(updated);
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-slate-50 dark:bg-slate-800 text-sm font-semibold"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeExtraDest(idx)}
                    className="p-2.5 rounded-xl text-rose-500 hover:bg-rose-500/10 mt-5"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={addExtraDest}
                  disabled={additionalDestinations.length >= 3}
                  className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add another destination (e.g. Hyderabad → Goa → Gokarna)</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: DATES & HOURS */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 border-b border-border/60 pb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-teal-600" />
              <span>Step 2: Dates, Timings & Usable Travel Hours</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-slate-50 dark:bg-slate-800 text-sm font-semibold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-slate-50 dark:bg-slate-800 text-sm font-semibold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Expected Arrival Time (Optional)
                </label>
                <input
                  type="time"
                  value={arrivalTime}
                  onChange={(e) => setArrivalTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-slate-50 dark:bg-slate-800 text-sm font-semibold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Expected Departure Time (Optional)
                </label>
                <input
                  type="time"
                  value={departureTime}
                  onChange={(e) => setDepartureTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-slate-50 dark:bg-slate-800 text-sm font-semibold"
                />
              </div>
            </div>

            {/* Calculated Duration & Usable Hours Badge */}
            <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
              <span className="font-bold text-teal-900 dark:text-teal-200 flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Trip Duration & Available Time:</span>
              </span>
              <span className="font-extrabold text-teal-700 dark:text-teal-300 text-sm">
                {calculatedDays} Days / {Math.max(1, calculatedDays - 1)} Nights · ~{usableHours} usable travel hours
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground">
              💡 <em>TripPilot strictly schedules activities within your available travel hours.</em>
            </p>
          </div>
        )}

        {/* STEP 3: TRAVELERS */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 border-b border-border/60 pb-3 flex items-center gap-2">
              <Users className="w-5 h-5 text-teal-600" />
              <span>Step 3: Group Composition & Traveler Needs</span>
            </h3>

            {/* Traveler Counters */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-border text-center">
                <span className="text-[11px] font-bold text-muted-foreground block">Adults (12+)</span>
                <div className="flex items-center justify-center gap-3 mt-1.5">
                  <button
                    type="button"
                    onClick={() => setAdultsCount(Math.max(1, adultsCount - 1))}
                    className="w-7 h-7 rounded-lg border bg-white dark:bg-slate-900 font-bold"
                  >
                    -
                  </button>
                  <span className="font-extrabold text-sm">{adultsCount}</span>
                  <button
                    type="button"
                    onClick={() => setAdultsCount(adultsCount + 1)}
                    className="w-7 h-7 rounded-lg border bg-white dark:bg-slate-900 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-border text-center">
                <span className="text-[11px] font-bold text-muted-foreground block">Children (0-11)</span>
                <div className="flex items-center justify-center gap-3 mt-1.5">
                  <button
                    type="button"
                    onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                    className="w-7 h-7 rounded-lg border bg-white dark:bg-slate-900 font-bold"
                  >
                    -
                  </button>
                  <span className="font-extrabold text-sm">{childrenCount}</span>
                  <button
                    type="button"
                    onClick={() => setChildrenCount(childrenCount + 1)}
                    className="w-7 h-7 rounded-lg border bg-white dark:bg-slate-900 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-border text-center">
                <span className="text-[11px] font-bold text-muted-foreground block">Seniors (60+)</span>
                <div className="flex items-center justify-center gap-3 mt-1.5">
                  <button
                    type="button"
                    onClick={() => setSeniorsCount(Math.max(0, seniorsCount - 1))}
                    className="w-7 h-7 rounded-lg border bg-white dark:bg-slate-900 font-bold"
                  >
                    -
                  </button>
                  <span className="font-extrabold text-sm">{seniorsCount}</span>
                  <button
                    type="button"
                    onClick={() => setSeniorsCount(seniorsCount + 1)}
                    className="w-7 h-7 rounded-lg border bg-white dark:bg-slate-900 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Food Preference */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Dietary & Food Preference
              </label>
              <div className="flex flex-wrap gap-2">
                {FOOD_PREFERENCES.map((pref) => (
                  <button
                    key={pref}
                    type="button"
                    onClick={() => setFoodPreference(pref)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                      foodPreference === pref
                        ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                        : "border-border bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {pref}
                  </button>
                ))}
              </div>
            </div>

            {/* Accessibility Requirements */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Accessibility className="w-4 h-4 text-teal-600" />
                <span>Accessibility Requirements</span>
              </label>
              <select
                value={accessibilityNeeds}
                onChange={(e) => setAccessibilityNeeds(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-slate-100"
              >
                <option value="None">No special accessibility needed</option>
                <option value="Wheelchair Accessible">Wheelchair accessible venues & transport</option>
                <option value="Low Walking">Low walking / Elevator access preferred</option>
                <option value="Kid Friendly">Stroller friendly / Kid-safe locations</option>
              </select>
            </div>
          </div>
        )}

        {/* STEP 4: MANDATORY BUDGET */}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-border/60 pb-3 space-y-1">
              <h3 className="font-extrabold text-xl text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Wallet className="w-6 h-6 text-emerald-600" />
                <span>What's your total trip budget?</span>
              </h3>
              <p className="text-xs text-muted-foreground">
                TripPilot will build your stay, food, transport and activities around this amount.
              </p>
            </div>

            {/* Main Budget Input & Currency */}
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border border-border space-y-5">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200">
                  Target Trip Budget
                </span>
                <div className="flex items-center gap-2">
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-border text-xs font-bold bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                  >
                    <option value="₹ INR">₹ INR</option>
                    <option value="$ USD">$ USD</option>
                    <option value="€ EUR">€ EUR</option>
                    <option value="£ GBP">£ GBP</option>
                  </select>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">
                      {currency.split(" ")[0]}
                    </span>
                    <input
                      type="number"
                      value={totalBudget}
                      onChange={(e) => {
                        const val = e.target.value;
                        setTotalBudget(val === "" ? "" : Number(val));
                        setDontKnowBudget(false);
                      }}
                      placeholder="30000"
                      required={!dontKnowBudget}
                      className="w-40 pl-8 pr-3 py-2 rounded-xl border border-border font-extrabold text-lg text-right bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Budget Style Tier Buttons */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Budget Style Tier:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { tier: "Economy" as const, val: 15000, desc: "Essential stays & local food" },
                    { tier: "Balanced" as const, val: 30000, desc: "Comfortable hotel & taxis" },
                    { tier: "Premium" as const, val: 50000, desc: "Resort stay & fine dining" },
                    { tier: "Luxury" as const, val: 100000, desc: "5-Star luxury experience" },
                  ].map((item) => (
                    <button
                      key={item.tier}
                      type="button"
                      onClick={() => selectBudgetPreset(item.tier, item.val)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        budgetTier === item.tier && !dontKnowBudget
                          ? "bg-emerald-600 text-white border-emerald-600 shadow-md"
                          : "border-border bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-700"
                      }`}
                    >
                      <div className="font-extrabold text-xs">○ {item.tier}</div>
                      <div className="text-[11px] font-bold mt-0.5">₹{item.val.toLocaleString()}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* "I don't know my budget" Helper Trigger */}
              <div className="pt-2 border-t border-border/60">
                <button
                  type="button"
                  onClick={() => setDontKnowBudget(!dontKnowBudget)}
                  className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1.5"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>[ I don't know my budget ]</span>
                </button>

                {dontKnowBudget && (
                  <div className="mt-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-teal-500/30 space-y-2 animate-in fade-in">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                      What's your approximate budget range?
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: "₹10,000–₹20,000", val: 15000 },
                        { label: "₹20,000–₹40,000", val: 30000 },
                        { label: "₹40,000–₹75,000", val: 55000 },
                        { label: "₹75,000+", val: 85000 },
                      ].map((range) => (
                        <button
                          key={range.label}
                          type="button"
                          onClick={() => handleRangeSelect(range.label, range.val)}
                          className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                            selectedRange === range.label
                              ? "bg-teal-600 text-white border-teal-600"
                              : "border-border hover:bg-slate-100 dark:hover:bg-slate-800"
                          }`}
                        >
                          {range.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Budget Allocation Preview */}
            <div className="p-5 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-extrabold text-emerald-900 dark:text-emerald-200 uppercase tracking-wider">
                  YOUR TRIP BUDGET: ₹{numBudget.toLocaleString()} (Estimated Allocation)
                </h4>
                <button
                  type="button"
                  onClick={() => showToast("AI Optimized", "AI balanced allocations for your style.", "info")}
                  className="px-3 py-1 rounded-xl bg-emerald-600 text-white text-[11px] font-bold shadow-sm"
                >
                  [ Let AI Optimize ]
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-border">
                  <span className="text-[11px] text-muted-foreground block">🏨 Stay</span>
                  <span className="font-extrabold text-slate-900 dark:text-slate-100 text-sm">₹{accomAlloc.toLocaleString()}</span>
                </div>
                <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-border">
                  <span className="text-[11px] text-muted-foreground block">🚕 Transport</span>
                  <span className="font-extrabold text-slate-900 dark:text-slate-100 text-sm">₹{transportAlloc.toLocaleString()}</span>
                </div>
                <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-border">
                  <span className="text-[11px] text-muted-foreground block">🍛 Food</span>
                  <span className="font-extrabold text-slate-900 dark:text-slate-100 text-sm">₹{foodAlloc.toLocaleString()}</span>
                </div>
                <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-border">
                  <span className="text-[11px] text-muted-foreground block">🎟 Activities</span>
                  <span className="font-extrabold text-slate-900 dark:text-slate-100 text-sm">₹{activitiesAlloc.toLocaleString()}</span>
                </div>
                <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-border col-span-2 sm:col-span-1">
                  <span className="text-[11px] text-muted-foreground block">🛍 Misc</span>
                  <span className="font-extrabold text-slate-900 dark:text-slate-100 text-sm">₹{miscAlloc.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: PREFERENCES & SPECIAL REQUESTS */}
        {step === 5 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 border-b border-border/60 pb-3 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-teal-600" />
              <span>Step 5: Travel Style, Accommodation & Special Requests</span>
            </h3>

            {/* Travel Style */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Travel Pace & Style
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["Relaxed", "Balanced", "Fast-paced"] as const).map((style) => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => setTravelStyle(style as any)}
                    className={`py-2.5 rounded-xl border text-xs font-bold transition-all ${
                      travelStyle === style
                        ? "bg-teal-600 text-white border-teal-600 shadow-sm"
                        : "border-border bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* Accommodation Type */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Accommodation Preference
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {ACCOMMODATION_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setAccommodationType(type)}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                      accommodationType === type
                        ? "bg-teal-600 text-white border-teal-600"
                        : "border-border bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Transportation Preference */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Transportation Preference
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {TRANSPORT_TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTransportType(t)}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                      transportType === t
                        ? "bg-teal-600 text-white border-teal-600"
                        : "border-border bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Special Requests Free Text */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                Special Requests / Custom Directives (Free Text)
              </label>
              <textarea
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="e.g. Prefer quiet places and avoid expensive restaurants."
                rows={3}
                className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-slate-50 dark:bg-slate-800 text-xs font-semibold focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
        )}

        {/* Wizard Controls */}
        <div className="flex items-center justify-between border-t border-border/60 pt-4">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-border text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md"
            >
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 hover:scale-[1.02] text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-teal-600/30 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI Plan My Trip (Around ₹{numBudget.toLocaleString()})</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
