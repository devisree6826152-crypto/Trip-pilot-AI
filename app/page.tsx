"use client";

import React, { useState, useEffect } from "react";
import { useRoamwiseStore } from "@/store/useRoamwiseStore";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { BottomNav } from "@/components/layout/BottomNav";
import { LandingHero } from "@/components/landing/LandingHero";
import { TripDashboardView } from "@/components/trip/TripDashboardView";
import { PlacesPortal } from "@/components/places/PlacesPortal";
import { ExperiencesPortal } from "@/components/experiences/ExperiencesPortal";
import { FoodPortal } from "@/components/food/FoodPortal";
import { HotelBookingSection } from "@/components/hotels/HotelBookingSection";
import { BookingsPortal } from "@/components/bookings/BookingsPortal";
import { CultureHistoryPortal } from "@/components/culture/CultureHistoryPortal";
import { MapRidesPortal } from "@/components/map/MapRidesPortal";
import { TripWizard } from "@/components/planner/TripWizard";
import { AIAssistantChat } from "@/components/assistant/AIAssistantChat";
import { BudgetOverview } from "@/components/budget/BudgetOverview";
import { TripSummaryView } from "@/components/summary/TripSummaryView";
import { ProfileView } from "@/components/profile/ProfileView";
import { TranslatorMainView } from "@/components/translator/TranslatorMainView";

// Modals
import { GlobalSearchModal } from "@/components/search/GlobalSearchModal";
import { HotelBookingModal } from "@/components/hotels/HotelBookingModal";
import { RestaurantBookingModal } from "@/components/food/RestaurantBookingModal";
import { BudgetOptimizationModal } from "@/components/budget/BudgetOptimizationModal";
import { ConflictDetectionModal } from "@/components/trip/ConflictDetectionModal";
import { ReplanningDialog } from "@/components/replanning/ReplanningDialog";
import { ProposalReviewModal } from "@/components/replanning/ProposalReviewModal";
import { EditActivityModal } from "@/components/trip/EditActivityModal";
import { AddActivityModal } from "@/components/trip/AddActivityModal";
import { SimulateModal } from "@/components/trip/SimulateModal";
import { ToastNotification } from "@/components/ui/ToastNotification";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const activeTab = useRoamwiseStore((state) => state.activeTab);
  const theme = useRoamwiseStore((state) => state.theme);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-teal-400 font-extrabold text-sm">
        Initializing TripPilot AI Travel OS...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-teal-500/20">
      {/* Header Bar & Secondary Destination Bar */}
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Main Workspace Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 max-w-full pb-24 md:pb-12">
          {activeTab === "home" && <LandingHero />}
          {activeTab === "trips" && <TripDashboardView />}
          {activeTab === "places" && <PlacesPortal />}
          {activeTab === "experiences" && <ExperiencesPortal />}
          {activeTab === "food" && <FoodPortal />}
          {activeTab === "hotels" && <HotelBookingSection />}
          {activeTab === "bookings" && <BookingsPortal />}
          {activeTab === "culture" && <CultureHistoryPortal />}
          {activeTab === "map-rides" && <MapRidesPortal />}
          {activeTab === "plan" && <TripWizard />}
          {activeTab === "translate" && <TranslatorMainView />}
          {activeTab === "assistant" && <AIAssistantChat />}
          {activeTab === "budget" && <BudgetOverview />}
          {activeTab === "summary" && <TripSummaryView />}
          {activeTab === "profile" && <ProfileView />}
        </main>
      </div>

      {/* Mobile Navigation Bar */}
      <BottomNav />

      {/* Global Modals & Notifications */}
      <GlobalSearchModal />
      <HotelBookingModal />
      <RestaurantBookingModal />
      <BudgetOptimizationModal />
      <ConflictDetectionModal />
      <ReplanningDialog />
      <ProposalReviewModal />
      <EditActivityModal />
      <AddActivityModal />
      <SimulateModal />
      <ToastNotification />
    </div>
  );
}
