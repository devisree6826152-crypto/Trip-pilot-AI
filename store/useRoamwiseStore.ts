import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  Trip,
  ItineraryActivity,
  ReplanProposal,
  LiveEvent,
  AssistantMessage,
  BookingRecord,
  HotelOption,
} from "../lib/types";
import {
  INITIAL_GOA_TRIP,
  MOCK_LIVE_EVENTS,
  MOCK_ASSISTANT_INITIAL,
  generateRainScenarioProposal,
  generateRunningLateProposal,
  generateBudgetReductionProposal,
  generateScubaAdditionProposal,
} from "../lib/data/mockData";
import { INITIAL_USER_BOOKINGS } from "../lib/data/globalTourismData";

export type TabType =
  | "home"
  | "places"
  | "experiences"
  | "food"
  | "hotels"
  | "bookings"
  | "culture"
  | "map-rides"
  | "trips"
  | "plan"
  | "assistant"
  | "budget"
  | "profile"
  | "summary"
  | "translate";

export interface ItineraryConflict {
  type: "schedule" | "budget" | "distance" | "booking";
  title: string;
  description: string;
  impact: string;
  recommendedAction: string;
}

interface RoamwiseState {
  theme: "light" | "dark";
  activeTab: TabType;
  activeTrip: Trip;
  tripHistoryStack: Trip[];
  activeDayIndex: number;

  selectedDestination: string;
  userBookings: BookingRecord[];
  userFavorites: string[];

  // Modals & UI States
  isSearchOpen: boolean;
  hotelBookingModalData: HotelOption | null;
  isHotelBookingModalOpen: boolean;
  restaurantBookingModalData: any | null;
  isRestaurantBookingModalOpen: boolean;
  isBudgetOptimizationOpen: boolean;
  activeConflict: ItineraryConflict | null;
  isConflictModalOpen: boolean;

  pendingProposal: ReplanProposal | null;
  activeLiveEvent: LiveEvent | null;
  isReplanningModalOpen: boolean;
  isProposalModalOpen: boolean;
  isSimulateModalOpen: boolean;
  isAddActivityModalOpen: boolean;
  isEditActivityModalOpen: boolean;
  editingActivity: ItineraryActivity | null;

  assistantMessages: AssistantMessage[];
  toastMessage: { title: string; description?: string; type?: "success" | "info" | "warning" } | null;

  // Actions
  toggleTheme: () => void;
  setTheme: (theme: "light" | "dark") => void;
  setIsSearchOpen: (open: boolean) => void;

  openHotelBookingModal: (hotel: HotelOption) => void;
  closeHotelBookingModal: () => void;

  openRestaurantBookingModal: (restaurant: any) => void;
  closeRestaurantBookingModal: () => void;

  setIsBudgetOptimizationOpen: (open: boolean) => void;
  applyBudgetOptimization: (selectedFixes: string[]) => void;

  setIsConflictModalOpen: (open: boolean) => void;
  checkAndShowConflicts: () => boolean;

  setSelectedDestination: (dest: string) => void;
  addBookingRecord: (booking: BookingRecord, addToTrip?: boolean) => void;
  cancelBookingRecord: (bookingId: string) => void;
  toggleFavorite: (id: string) => void;

  fetchLiveWeather: (destination?: string) => Promise<void>;
  setActiveTab: (tab: TabType) => void;
  setActiveDayIndex: (dayIndex: number) => void;
  setPendingProposal: (proposal: ReplanProposal | null) => void;
  setIsReplanningModalOpen: (open: boolean) => void;
  setIsProposalModalOpen: (open: boolean) => void;
  setIsSimulateModalOpen: (open: boolean) => void;
  setIsAddActivityModalOpen: (open: boolean) => void;
  setIsEditActivityModalOpen: (open: boolean) => void;
  setEditingActivity: (act: ItineraryActivity | null) => void;
  showToast: (title: string, description?: string, type?: "success" | "info" | "warning") => void;
  clearToast: () => void;

  toggleActivityComplete: (activityId: string) => void;
  removeActivity: (activityId: string) => void;
  updateActivity: (activityId: string, updated: Partial<ItineraryActivity>) => void;
  addActivity: (dayIndex: number, activity: Omit<ItineraryActivity, "id" | "dayIndex">) => void;

  triggerReplanning: (triggerType: string, customPrompt?: string) => Promise<void>;
  triggerPresetScenario: (scenarioKey: "rain" | "late" | "budget" | "scuba") => void;
  acceptProposal: (proposal: ReplanProposal) => void;
  undoProposal: () => void;
  declineProposal: () => void;

  evaluateCanIAdd: (requestText: string) => Promise<void>;
  reduceBudgetProposal: (targetReduction?: number) => Promise<void>;
  sendAssistantMessage: (text: string) => Promise<void>;

  createNewTrip: (formData: any) => Promise<void>;
  updateTripBudget: (newBudget: number) => void;
  optimizeItineraryRoute: () => void;
  resetToGoaDemo: () => void;
}

export const useRoamwiseStore = create<RoamwiseState>()(
  persist(
    (set, get) => ({
      theme: "light",
      activeTab: "home",
      activeTrip: INITIAL_GOA_TRIP,
      tripHistoryStack: [],
      activeDayIndex: 2,
      selectedDestination: "Goa",
      userBookings: INITIAL_USER_BOOKINGS,
      userFavorites: ["place-goa-1", "exp-goa-1"],

      isSearchOpen: false,
      hotelBookingModalData: null,
      isHotelBookingModalOpen: false,
      restaurantBookingModalData: null,
      isRestaurantBookingModalOpen: false,
      isBudgetOptimizationOpen: false,
      activeConflict: null,
      isConflictModalOpen: false,

      pendingProposal: null,
      activeLiveEvent: MOCK_LIVE_EVENTS[0],
      isReplanningModalOpen: false,
      isProposalModalOpen: false,
      isSimulateModalOpen: false,
      isAddActivityModalOpen: false,
      isEditActivityModalOpen: false,
      editingActivity: null,

      assistantMessages: MOCK_ASSISTANT_INITIAL,
      toastMessage: null,

      toggleTheme: () => {
        const nextTheme = get().theme === "dark" ? "light" : "dark";
        set({ theme: nextTheme });
        if (typeof document !== "undefined") {
          document.documentElement.classList.toggle("dark", nextTheme === "dark");
        }
      },

      setTheme: (theme: "light" | "dark") => {
        set({ theme });
        if (typeof document !== "undefined") {
          document.documentElement.classList.toggle("dark", theme === "dark");
        }
      },

      setIsSearchOpen: (open: boolean) => set({ isSearchOpen: open }),

      openHotelBookingModal: (hotel: HotelOption) =>
        set({ hotelBookingModalData: hotel, isHotelBookingModalOpen: true }),
      closeHotelBookingModal: () =>
        set({ hotelBookingModalData: null, isHotelBookingModalOpen: false }),

      openRestaurantBookingModal: (restaurant: any) =>
        set({ restaurantBookingModalData: restaurant, isRestaurantBookingModalOpen: true }),
      closeRestaurantBookingModal: () =>
        set({ restaurantBookingModalData: null, isRestaurantBookingModalOpen: false }),

      setIsBudgetOptimizationOpen: (open: boolean) => set({ isBudgetOptimizationOpen: open }),

      applyBudgetOptimization: (selectedFixes: string[]) => {
        const trip = get().activeTrip;
        let savingsTotal = 0;
        
        if (selectedFixes.includes("hotel")) savingsTotal += 1500;
        if (selectedFixes.includes("taxi")) savingsTotal += 700;
        if (selectedFixes.includes("restaurant")) savingsTotal += 500;
        if (selectedFixes.includes("activity")) savingsTotal += 700;

        const newSpent = Math.max(0, trip.spentAmount - savingsTotal);

        set({
          activeTrip: {
            ...trip,
            spentAmount: newSpent,
          },
          isBudgetOptimizationOpen: false,
        });

        get().showToast(
          "Budget Optimization Applied! ⚡",
          `Saved ₹${savingsTotal.toLocaleString()}. Your trip spend is now ₹${newSpent.toLocaleString()} (within your ₹${trip.totalBudget.toLocaleString()} limit).`,
          "success"
        );
      },

      setIsConflictModalOpen: (open: boolean) => set({ isConflictModalOpen: open }),

      checkAndShowConflicts: () => {
        const trip = get().activeTrip;
        const isOverBudget = trip.spentAmount > trip.totalBudget;

        if (isOverBudget) {
          const overspent = trip.spentAmount - trip.totalBudget;
          set({
            activeConflict: {
              type: "budget",
              title: "⚠️ Budget Overspend Conflict Detected",
              description: `Your current planned trip spend (₹${trip.spentAmount.toLocaleString()}) exceeds your allocated budget (₹${trip.totalBudget.toLocaleString()}) by ₹${overspent.toLocaleString()}.`,
              impact: "Higher accommodation and activity costs are exceeding your planned limit.",
              recommendedAction: "Use AI Budget Optimization to swap stay/taxi or trim optional activities.",
            },
            isConflictModalOpen: true,
          });
          return true;
        }
        return false;
      },

      setSelectedDestination: (dest: string) => {
        set({ selectedDestination: dest });
        get().showToast("Destination Switched", `Showing live tourism guide, places & stays for ${dest}.`, "info");
      },

      addBookingRecord: (booking: BookingRecord, addToTrip: boolean = true) => {
        const currentBookings = [booking, ...get().userBookings];
        set({ userBookings: currentBookings });

        if (addToTrip) {
          const trip = get().activeTrip;
          const newSpent = trip.spentAmount + booking.totalPrice;
          
          const newBudgetCats = trip.budgetCategories.map((cat) => {
            if (booking.type === "Hotel" && cat.name === "Accommodation") {
              return { ...cat, spent: cat.spent + booking.totalPrice };
            }
            if (booking.type === "Experience" && cat.name === "Activities") {
              return { ...cat, spent: cat.spent + booking.totalPrice };
            }
            if (booking.type === "Transport" && cat.name === "Transport") {
              return { ...cat, spent: cat.spent + booking.totalPrice };
            }
            return cat;
          });

          set({
            activeTrip: {
              ...trip,
              spentAmount: newSpent,
              budgetCategories: newBudgetCats,
            },
          });
        }

        get().showToast(
          "Booking Confirmed! 🎉",
          `Ref: ${booking.confirmationRef} · Total: ₹${booking.totalPrice.toLocaleString()}. Added to your trip.`,
          "success"
        );

        // Check conflicts post booking
        setTimeout(() => {
          get().checkAndShowConflicts();
        }, 500);
      },

      cancelBookingRecord: (bookingId: string) => {
        const updated = get().userBookings.map((b) => (b.id === bookingId ? { ...b, status: "cancelled" as const } : b));
        set({ userBookings: updated });
        get().showToast("Booking Cancelled", "Your booking status has been updated.", "info");
      },

      toggleFavorite: (id: string) => {
        const favs = get().userFavorites;
        const exists = favs.includes(id);
        const updated = exists ? favs.filter((f) => f !== id) : [...favs, id];
        set({ userFavorites: updated });
        get().showToast(exists ? "Removed from Favorites" : "Saved to Favorites ❤️", "", "info");
      },

      fetchLiveWeather: async (destination?: string) => {
        const dest = destination || get().activeTrip.destination;
        try {
          const res = await fetch(`/api/weather?destination=${encodeURIComponent(dest)}`);
          if (res.ok) {
            const data = await res.json();
            if (data.success) {
              const trip = get().activeTrip;
              const newDays = trip.days.map((day) => {
                if (day.dayIndex === trip.currentDayIndex) {
                  return {
                    ...day,
                    weather: {
                      condition: data.condition,
                      tempC: data.tempC,
                      iconName: data.iconName,
                      alert: data.alert,
                    },
                  };
                }
                return day;
              });
              set({ activeTrip: { ...trip, days: newDays } });
            }
          }
        } catch {
          // Keep current weather on network error
        }
      },

      setActiveTab: (tab: TabType) => set({ activeTab: tab }),
      setActiveDayIndex: (dayIndex: number) => set({ activeDayIndex: dayIndex }),

      setPendingProposal: (proposal) =>
        set({ pendingProposal: proposal, isProposalModalOpen: !!proposal }),

      setIsReplanningModalOpen: (open) => set({ isReplanningModalOpen: open }),
      setIsProposalModalOpen: (open) => set({ isProposalModalOpen: open }),
      setIsSimulateModalOpen: (open) => set({ isSimulateModalOpen: open }),
      setIsAddActivityModalOpen: (open) => set({ isAddActivityModalOpen: open }),
      setIsEditActivityModalOpen: (open) => set({ isEditActivityModalOpen: open }),
      setEditingActivity: (act) => set({ editingActivity: act }),

      showToast: (title, description, type = "success") => {
        set({ toastMessage: { title, description, type } });
        setTimeout(() => {
          set({ toastMessage: null });
        }, 4000);
      },
      clearToast: () => set({ toastMessage: null }),

      toggleActivityComplete: (activityId: string) => {
        const trip = get().activeTrip;
        let costDelta = 0;
        let actTitle = "";
        let newStatus = "";

        const newDays = trip.days.map((day) => ({
          ...day,
          activities: day.activities.map((act) => {
            if (act.id === activityId) {
              actTitle = act.title;
              const isComp = act.status === "completed";
              newStatus = isComp ? "upcoming" : "completed";
              costDelta = isComp ? -act.cost : act.cost;
              return { ...act, status: (isComp ? "upcoming" : "completed") as any };
            }
            return act;
          }),
        }));

        const newSpent = Math.max(0, trip.spentAmount + costDelta);
        set({
          activeTrip: {
            ...trip,
            spentAmount: newSpent,
            days: newDays,
          },
        });

        get().showToast(
          newStatus === "completed" ? "Activity Completed!" : "Activity Reset",
          `Updated status for "${actTitle}". Spend updated to ₹${newSpent.toLocaleString()}.`,
          "info"
        );
      },

      removeActivity: (activityId: string) => {
        const trip = get().activeTrip;
        let removedCost = 0;
        let removedTitle = "";

        const newDays = trip.days.map((day) => ({
          ...day,
          activities: day.activities.filter((act) => {
            if (act.id === activityId) {
              removedCost = act.cost;
              removedTitle = act.title;
              return false;
            }
            return true;
          }),
        }));

        const newSpent = Math.max(0, trip.spentAmount - removedCost);
        set({
          activeTrip: {
            ...trip,
            spentAmount: newSpent,
            days: newDays,
          },
        });

        get().showToast(
          "Activity Removed",
          `Removed "${removedTitle}" from itinerary. Saved ₹${removedCost}.`,
          "warning"
        );
      },

      updateActivity: (activityId: string, updated: Partial<ItineraryActivity>) => {
        const trip = get().activeTrip;
        const newDays = trip.days.map((day) => ({
          ...day,
          activities: day.activities.map((act) => {
            if (act.id === activityId) {
              return { ...act, ...updated };
            }
            return act;
          }),
        }));

        set({
          activeTrip: { ...trip, days: newDays },
          isEditActivityModalOpen: false,
          editingActivity: null,
        });

        get().showToast("Itinerary Updated", "Activity details saved successfully.");
      },

      addActivity: (dayIndex: number, activityData) => {
        const trip = get().activeTrip;
        const newId = `act-custom-${Date.now()}`;
        const newActivity: ItineraryActivity = {
          ...activityData,
          id: newId,
          dayIndex,
          status: "upcoming",
        };

        const targetDayIndex = dayIndex || 1;
        const newDays = trip.days.map((day) => {
          if (day.dayIndex === targetDayIndex) {
            return {
              ...day,
              activities: [...day.activities, newActivity],
            };
          }
          return day;
        });

        const newSpent = trip.spentAmount + (activityData.cost || 0);

        set({
          activeTrip: { ...trip, spentAmount: newSpent, days: newDays },
          isAddActivityModalOpen: false,
        });

        get().showToast("Activity Added", `Added "${newActivity.title}" to Day ${targetDayIndex}.`);

        // Check if addition triggers budget overspend conflict
        setTimeout(() => {
          if (newSpent > trip.totalBudget) {
            set({
              activeConflict: {
                type: "budget",
                title: "⚠️ Schedule Addition Caused Budget Warning",
                description: `Adding "${newActivity.title}" (₹${(activityData.cost || 0).toLocaleString()}) brings total spend to ₹${newSpent.toLocaleString()}, exceeding your ₹${trip.totalBudget.toLocaleString()} limit.`,
                impact: "You are ₹" + (newSpent - trip.totalBudget).toLocaleString() + " over budget.",
                recommendedAction: "Use AI Budget Optimization to balance your itinerary costs.",
              },
              isConflictModalOpen: true,
            });
          }
        }, 400);
      },

      triggerPresetScenario: (scenarioKey) => {
        const trip = get().activeTrip;
        let proposal: ReplanProposal;

        if (scenarioKey === "rain") {
          proposal = generateRainScenarioProposal(trip);
        } else if (scenarioKey === "late") {
          proposal = generateRunningLateProposal(trip);
        } else if (scenarioKey === "budget") {
          proposal = generateBudgetReductionProposal(trip);
        } else {
          proposal = generateScubaAdditionProposal(trip);
        }

        set({
          pendingProposal: proposal,
          isProposalModalOpen: true,
          isReplanningModalOpen: false,
          isSimulateModalOpen: false,
        });
      },

      triggerReplanning: async (triggerType: string, customPrompt?: string) => {
        const trip = get().activeTrip;
        try {
          const res = await fetch("/api/ai/replan", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              triggerType,
              targetDayIndex: get().activeDayIndex,
              currentTrip: trip,
              customPrompt,
            }),
          });

          if (res.ok) {
            const data = await res.json();
            if (data.success && data.proposal) {
              set({
                pendingProposal: data.proposal,
                isProposalModalOpen: true,
                isReplanningModalOpen: false,
                isSimulateModalOpen: false,
              });
              return;
            }
          }
        } catch {
          // Fallback to local scenario generator
        }
        get().triggerPresetScenario(triggerType === "weather" ? "rain" : triggerType === "running_late" ? "late" : "budget");
      },

      acceptProposal: (proposal: ReplanProposal) => {
        const trip = get().activeTrip;
        const historyStack = [...get().tripHistoryStack, JSON.parse(JSON.stringify(trip))];

        const targetDay = proposal.targetDayIndex;
        const newDays = trip.days.map((day) => {
          if (day.dayIndex === targetDay) {
            return {
              ...day,
              activities: proposal.proposedActivities,
            };
          }
          return day;
        });

        const newBudget = Math.max(1000, trip.totalBudget + (proposal.triggerType === "budget_reduction" ? -2000 : 0));
        const newSpent = Math.max(0, trip.spentAmount + proposal.budgetImpact);

        set({
          tripHistoryStack: historyStack,
          activeTrip: {
            ...trip,
            totalBudget: newBudget,
            spentAmount: newSpent,
            days: newDays,
          },
          pendingProposal: null,
          isProposalModalOpen: false,
        });

        get().showToast(
          "Itinerary Re-planned & Saved!",
          `${proposal.triggerTitle} applied. Preserved ${proposal.unaffectedCount} unaffected activities.`,
          "success"
        );
      },

      undoProposal: () => {
        const stack = [...get().tripHistoryStack];
        if (stack.length === 0) {
          get().showToast("Nothing to Undo", "You are already at the initial trip state.", "info");
          return;
        }

        const previousTrip = stack.pop()!;
        set({
          tripHistoryStack: stack,
          activeTrip: previousTrip,
          pendingProposal: null,
          isProposalModalOpen: false,
        });

        get().showToast("Action Undone", "Restored prior itinerary and budget allocation.", "info");
      },

      declineProposal: () => {
        set({ pendingProposal: null, isProposalModalOpen: false });
        get().showToast("Proposal Declined", "Your original itinerary remains unchanged.", "info");
      },

      evaluateCanIAdd: async (requestText: string) => {
        await get().triggerReplanning("add_activity", requestText);
      },

      reduceBudgetProposal: async (targetReduction = 2000) => {
        await get().triggerReplanning("budget_reduction");
      },

      sendAssistantMessage: async (text: string) => {
        const userMsg: AssistantMessage = {
          id: `msg-user-${Date.now()}`,
          sender: "user",
          text,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        const currentMsgs = [...get().assistantMessages, userMsg];
        set({ assistantMessages: currentMsgs });

        try {
          const res = await fetch("/api/ai/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: text, currentTrip: get().activeTrip }),
          });

          if (res.ok) {
            const data = await res.json();
            if (data.success) {
              const botMsg: AssistantMessage = {
                id: `msg-bot-${Date.now()}`,
                sender: "assistant",
                text: data.text,
                timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                proposal: data.proposal,
              };
              set({ assistantMessages: [...get().assistantMessages, botMsg] });
              return;
            }
          }
        } catch {
          // Fallback chat handled seamlessly
        }

        const botMsg: AssistantMessage = {
          id: `msg-bot-${Date.now()}`,
          sender: "assistant",
          text: `Got it! I am monitoring your ${get().activeTrip.destination} itinerary. Your budget has ₹${(
            get().activeTrip.totalBudget - get().activeTrip.spentAmount
          ).toLocaleString()} remaining. How else can I assist?`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        set({ assistantMessages: [...get().assistantMessages, botMsg] });
      },

      createNewTrip: async (formData: any) => {
        try {
          const res = await fetch("/api/ai/generate-trip", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });

          if (res.ok) {
            const data = await res.json();
            if (data.success && data.trip) {
              set({
                activeTrip: data.trip,
                activeTab: "trips",
                activeDayIndex: 1,
                selectedDestination: data.trip.destination.split(",")[0].trim(),
              });
              get().showToast("AI Trip Generated!", `Created "${data.trip.title}".`);
              get().fetchLiveWeather(data.trip.destination);
              return;
            }
          }
        } catch {
          // Fallback handled smoothly
        }

        const duration = parseInt(formData.durationDays) || 4;
        const budget = parseInt(formData.totalBudget) || 25000;
        const dest = formData.destination || "Jaipur, Rajasthan";
        const destClean = dest.split(",")[0].trim();

        const newTrip: Trip = {
          id: `trip-custom-${Date.now()}`,
          title: `${destClean} Getaway`,
          destination: dest,
          startingLocation: formData.startingLocation || "Delhi, India",
          startDate: formData.startDate || "Nov 10, 2026",
          endDate: "Nov 14, 2026",
          durationDays: duration,
          travelersCount: parseInt(formData.travelersCount) || 2,
          travelers: [
            { id: "u1", name: "You", avatar: "Y", interests: formData.interests || ["Food", "Culture"] },
          ],
          totalBudget: budget,
          spentAmount: Math.round(budget * 0.2),
          travelStyle: formData.travelStyle || "Balanced",
          interests: formData.interests || ["Food", "History"],
          accommodationPreference: formData.accommodationPreference || "Boutique Hotel",
          pacePreference: formData.pacePreference || "Moderate",
          groupMatchPercentage: 92,
          groupMatchExplanation: "Generated custom itinerary.",
          currentDayIndex: 1,
          status: "active",
          budgetCategories: [
            { name: "Transport", planned: Math.round(budget * 0.3), spent: Math.round(budget * 0.1), color: "#0284c7" },
            { name: "Accommodation", planned: Math.round(budget * 0.3), spent: Math.round(budget * 0.1), color: "#0d9488" },
            { name: "Food", planned: Math.round(budget * 0.2), spent: 0, color: "#d97706" },
            { name: "Activities", planned: Math.round(budget * 0.1), spent: 0, color: "#8b5cf6" },
            { name: "Emergency", planned: Math.round(budget * 0.1), spent: 0, color: "#64748b" },
          ],
          days: [
            {
              dayIndex: 1,
              date: "Nov 10, 2026",
              title: "Arrival & Exploration",
              weather: { condition: "Sunny", tempC: 28, iconName: "sun" },
              activities: [
                {
                  id: "new-1",
                  time: "10:00",
                  title: "Hotel Check-in & Breakfast",
                  description: "Check into heritage hotel.",
                  location: "City Center",
                  category: "Food",
                  durationMinutes: 90,
                  cost: 800,
                  travelTimeMinutes: 20,
                  isEssential: true,
                  status: "completed",
                  dayIndex: 1,
                },
              ],
            },
          ],
        };

        set({
          activeTrip: newTrip,
          activeTab: "trips",
          activeDayIndex: 1,
          selectedDestination: destClean,
        });

        get().showToast("New Trip Generated!", `Created "${newTrip.title}".`);
      },

      updateTripBudget: (newBudget: number) => {
        const trip = get().activeTrip;
        const oldBudget = trip.totalBudget;
        const diff = newBudget - oldBudget;

        if (diff < 0) {
          // Budget decreased - AI generates targeted replacement proposal
          const proposal = generateBudgetReductionProposal({ ...trip, totalBudget: oldBudget });
          proposal.triggerTitle = `Budget Decreased to ₹${newBudget.toLocaleString()}`;
          proposal.whatChanged = `Your trip budget was reduced from ₹${oldBudget.toLocaleString()} to ₹${newBudget.toLocaleString()} (-₹${Math.abs(diff).toLocaleString()}).`;
          proposal.whyChanged = `AI analyzed your itinerary to replace high-cost hotel nights and taxi rides with budget-friendly alternatives while preserving all planned sights.`;

          set({
            pendingProposal: proposal,
            isProposalModalOpen: true,
          });
          get().showToast(
            "Budget Changed! ⚡",
            `Analyzing itinerary to save ₹${Math.abs(diff).toLocaleString()} without wiping your trip.`,
            "info"
          );
        } else {
          // Budget increased - Update store directly
          set({
            activeTrip: {
              ...trip,
              totalBudget: newBudget,
            },
          });
          get().showToast(
            "Budget Updated!",
            `New total trip budget set to ₹${newBudget.toLocaleString()}.`,
            "success"
          );
        }
      },

      optimizeItineraryRoute: () => {
        const trip = get().activeTrip;
        const routeOpt = {
          originalKm: 32,
          optimizedKm: 24,
          timeSavedMins: 35,
          costSaved: 300,
          isApplied: true,
        };

        set({
          activeTrip: {
            ...trip,
            routeOptimization: routeOpt,
          },
        });

        get().showToast(
          "Route Sequence Optimized! ⚡",
          `Saved 8 km distance, 35 mins travel time, and ₹300 transport cost.`,
          "success"
        );
      },

      resetToGoaDemo: () => {
        set({
          activeTrip: INITIAL_GOA_TRIP,
          activeTab: "trips",
          activeDayIndex: 2,
          selectedDestination: "Goa",
          tripHistoryStack: [],
          pendingProposal: null,
          assistantMessages: MOCK_ASSISTANT_INITIAL,
        });
        get().showToast("Goa Demo Reset", "Restored default preloaded Goa trip state.");
        get().fetchLiveWeather("Goa");
      },
    }),
    {
      name: "roamwise_app_store_v3",
      partialize: (state) => ({
        theme: state.theme,
        activeTrip: state.activeTrip,
        activeTab: state.activeTab,
        activeDayIndex: state.activeDayIndex,
        selectedDestination: state.selectedDestination,
        assistantMessages: state.assistantMessages,
        userBookings: state.userBookings,
        userFavorites: state.userFavorites,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Validate activeTrip structure
          if (!state.activeTrip || !Array.isArray(state.activeTrip.days) || !Array.isArray(state.activeTrip.budgetCategories)) {
            state.activeTrip = INITIAL_GOA_TRIP;
          }
          if (!Array.isArray(state.userBookings)) {
            state.userBookings = INITIAL_USER_BOOKINGS;
          }
          if (!state.selectedDestination) {
            state.selectedDestination = "Goa";
          }
        }
      },
    }
  )
);

