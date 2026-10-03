export type CategoryType =
  | "Food"
  | "Beaches"
  | "Nature"
  | "Culture"
  | "Shopping"
  | "History"
  | "Adventure"
  | "Transport"
  | "Nightlife";

export type TravelStyle =
  | "Relaxed"
  | "Balanced"
  | "Adventure"
  | "Luxury"
  | "Budget"
  | "Family"
  | "Culture";

export type ActivityStatus =
  | "upcoming"
  | "completed"
  | "replaced"
  | "modified"
  | "added";

export interface ItineraryActivity {
  id: string;
  time: string; // e.g. "09:00"
  endTime?: string; // e.g. "10:00"
  title: string;
  description: string;
  location: string;
  category: CategoryType;
  durationMinutes: number;
  cost: number; // in INR ₹
  travelTimeMinutes: number;
  isEssential: boolean; // Essential vs Optional
  status: ActivityStatus;
  dayIndex: number; // 1-indexed
  notes?: string;
  replacementReason?: string;
  originalTitle?: string;
  imageUrl?: string; // High-res attraction/sight photo URL
}

export interface HotelOption {
  id: string;
  name: string;
  destination: string;
  rating: number; // e.g. 4.8
  reviewsCount: number;
  pricePerNight: number; // in INR ₹
  totalPrice: number; // for trip duration
  imageUrl: string;
  location: string;
  badge?: string;
  amenities: string[];
  roomType: string;
  isBooked?: boolean;
}

export interface TripDay {
  dayIndex: number;
  date: string; // e.g. "Oct 16, 2026"
  title: string;
  weather: {
    condition: string;
    tempC: number;
    iconName: string; // e.g. "sun", "cloud-rain", "cloud-sun"
    alert?: string;
  };
  activities: ItineraryActivity[];
}

export interface TravelerPreference {
  id: string;
  name: string;
  avatar: string;
  role?: string;
  interests: CategoryType[];
}

export interface BudgetCategory {
  name: "Transport" | "Accommodation" | "Food" | "Activities" | "Emergency";
  planned: number;
  spent: number;
  color: string;
}

export interface Trip {
  id: string;
  title: string;
  destination: string;
  startingLocation: string;
  startDate: string;
  endDate: string;
  durationDays: number;
  travelersCount: number;
  travelers: TravelerPreference[];
  totalBudget: number;
  spentAmount: number;
  travelStyle: TravelStyle;
  interests: CategoryType[];
  accommodationPreference: string;
  pacePreference: string;
  groupMatchPercentage: number;
  groupMatchExplanation: string;
  days: TripDay[];
  currentDayIndex: number;
  status: "active" | "completed" | "planning";
  budgetCategories: BudgetCategory[];

  // Enhanced AI Budget & Itinerary Rationale Extensions
  dietaryPreference?: string;
  accessibilityNeeds?: string;
  specialRequests?: string;
  usableHours?: number;
  currency?: string;
  whyThisPlan?: { category: string; explanation: string }[];
  stayRecommendation?: HotelOption;
  foodRecommendations?: { meal: string; title: string; cost: number; cuisine: string; location: string; dietaryNotes: string }[];
  routeOptimization?: { originalKm: number; optimizedKm: number; timeSavedMins: number; costSaved: number; isApplied?: boolean };
}

export interface ReplanProposal {
  id: string;
  triggerType:
    | "weather"
    | "running_late"
    | "budget_reduction"
    | "hotel_unavailable"
    | "restaurant_unavailable"
    | "dislike_activity"
    | "transport_problem"
    | "add_activity"
    | "custom";
  triggerTitle: string;
  whatChanged: string;
  whyChanged: string;
  proposalSummary: string;
  timeImpact: string; // e.g. "+0 min", "-45 mins travel"
  budgetImpact: number; // in INR ₹ (e.g. -2000, 0, +1800)
  targetDayIndex: number;
  affectedActivityIds: string[];
  originalActivities: ItineraryActivity[];
  proposedActivities: ItineraryActivity[];
  unaffectedCount: number;
}

export interface LiveEvent {
  id: string;
  type: "weather" | "traffic" | "booking" | "hotel";
  severity: "warning" | "info" | "alert";
  title: string;
  description: string;
  time: string;
  actionLabel: string;
  replanTrigger:
    | "weather"
    | "running_late"
    | "budget_reduction"
    | "hotel_unavailable"
    | "restaurant_unavailable"
    | "dislike_activity"
    | "transport_problem"
    | "custom";
}

export interface AssistantMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
  proposal?: ReplanProposal;
}

export interface CompletedTripSummary {
  tripTitle: string;
  destination: string;
  totalSpent: number;
  budgetRemaining: number;
  placesVisited: number;
  activitiesCompleted: number;
  durationDays: number;
  spendingBreakdown: { category: string; amount: number; percentage: number }[];
  highlights: { title: string; date: string; category: string }[];
}

// --- GLOBAL TOURISM PORTAL & BOOKING EXTENSIONS ---

export interface DestinationInfo {
  id: string;
  name: string;
  country: string;
  tagline: string;
  imageUrl: string;
  primaryLanguage: string;
  languageCode: string;
  currency: string;
  weatherTempC: number;
  weatherCondition: string;
  travelStyle: TravelStyle;
  description: string;
  popularPlacesCount: number;
  popularExperiencesCount: number;
}

export interface TourismPlace {
  id: string;
  name: string;
  destination: string;
  category:
    | "Popular"
    | "Nature"
    | "Adventure"
    | "Culture"
    | "Historical"
    | "Family"
    | "Beaches"
    | "Mountains"
    | "Museums"
    | "Landmarks"
    | "Hidden Gems";
  description: string;
  imageUrl: string;
  estimatedDurationMinutes: number;
  estimatedCost: number; // in INR ₹
  location: string;
  rating: number;
  distanceKm?: number;
  bestTimeToVisit?: string;
  openingHours?: string;
  thingsToDo?: string[];
  nearbyRestaurants?: string[];
  nearbyHotels?: string[];
  transportAdvice?: string;
  safetyNote?: string;
  isPopular?: boolean;
}

export interface TourismExperience {
  id: string;
  title: string;
  destination: string;
  category:
    | "Sightseeing"
    | "Adventure"
    | "Food Tours"
    | "Cultural Experiences"
    | "Nature"
    | "Water Activities"
    | "Nightlife"
    | "Family"
    | "Photography"
    | "Shopping"
    | "Wellness";
  imageUrl: string;
  durationMinutes: number;
  price: number; // in INR ₹
  location: string;
  description: string;
  rating: number;
  whatsIncluded: string[];
  whatsNotIncluded: string[];
  meetingPoint: string;
  availableTimes: string[];
}

export type BookingType = "Hotel" | "Experience" | "Transport" | "Activity" | "Tour" | "Flight";
export type BookingStatus = "upcoming" | "active" | "completed" | "cancelled";

export interface BookingRecord {
  id: string;
  type: BookingType;
  title: string;
  destination: string;
  provider: string;
  bookingDate: string;
  travelDate: string;
  timeSlot?: string;
  travelersCount: number;
  totalPrice: number;
  status: BookingStatus;
  confirmationRef: string; // generated ref code e.g. "REF-TP-8921"
  imageUrl?: string;
  details: string;
  isDemoEstimate?: boolean;
}

// --- TRANSLATOR TYPES ---

export interface LanguageOption {
  code: string;
  name: string;
  flag: string;
  nativeName?: string;
  voiceCode?: string;
}

export interface TravelPhrase {
  id: string;
  category:
    | "Restaurant"
    | "Hotel"
    | "Taxi"
    | "Train"
    | "Airport"
    | "Shopping"
    | "Directions"
    | "Emergency"
    | "Medical"
    | "General";
  english: string;
  translations: Record<string, { text: string; pronunciation: string; literal?: string }>;
  isEmergency?: boolean;
}

export interface TranslationHistoryItem {
  id: string;
  fromLang: string;
  toLang: string;
  originalText: string;
  translatedText: string;
  pronunciation?: string;
  literal?: string;
  timestamp: string;
}
