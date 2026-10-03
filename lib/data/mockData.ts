import {
  Trip,
  LiveEvent,
  AssistantMessage,
  CompletedTripSummary,
  ReplanProposal,
  ItineraryActivity,
} from "../types";

export const INITIAL_GOA_TRIP: Trip = {
  id: "goa-demo",
  title: "Goa Beach & Culture Exploration",
  destination: "Goa, India",
  startingLocation: "Hyderabad, India",
  startDate: "2026-10-15",
  endDate: "2026-10-18",
  durationDays: 4,
  travelersCount: 3,
  travelers: [
    {
      id: "t1",
      name: "Devisree",
      avatar: "D",
      role: "Lead Planner",
      interests: ["Food", "Shopping", "Culture"],
    },
    {
      id: "t2",
      name: "Rohan",
      avatar: "R",
      role: "Explorer",
      interests: ["Nature", "Adventure", "Beaches"],
    },
    {
      id: "t3",
      name: "Ananya",
      avatar: "A",
      role: "Culture Buff",
      interests: ["History", "Culture", "Food"],
    },
  ],
  totalBudget: 20000,
  spentAmount: 7450,
  travelStyle: "Balanced",
  interests: ["Food", "Beaches", "Nature", "Culture"],
  accommodationPreference: "Boutique Heritage Resort in Anjuna",
  pacePreference: "Moderate",
  groupMatchPercentage: 87,
  groupMatchExplanation:
    "High alignment across 3 travelers. Itinerary allocates 4 culture/history stops for Ananya, 3 nature & beach slots for Rohan, and 6 top culinary & market experiences for Devisree.",
  currentDayIndex: 2,
  status: "active",
  budgetCategories: [
    { name: "Transport", planned: 6000, spent: 3700, color: "#0284c7" },
    { name: "Accommodation", planned: 5000, spent: 2500, color: "#0d9488" },
    { name: "Food", planned: 3000, spent: 1250, color: "#d97706" },
    { name: "Activities", planned: 2000, spent: 0, color: "#8b5cf6" },
    { name: "Emergency", planned: 2000, spent: 0, color: "#64748b" },
  ],
  days: [
    {
      dayIndex: 1,
      date: "Oct 15, 2026",
      title: "Panaji Heritage & Latin Quarter",
      weather: { condition: "Sunny", tempC: 31, iconName: "sun" },
      activities: [
        {
          id: "act-1-1",
          time: "09:30",
          title: "Goa Airport Arrival & Transfer",
          description: "Flight lands at Dabolim Airport. Pre-booked AC cab to Anjuna Resort.",
          location: "Dabolim Airport -> Anjuna",
          category: "Transport",
          durationMinutes: 60,
          cost: 1500,
          travelTimeMinutes: 0,
          isEssential: true,
          status: "completed",
          dayIndex: 1,
        },
        {
          id: "act-1-2",
          time: "11:30",
          title: "Resort Check-in & Refresh",
          description: "Check into Casa Anjuna Boutique Resort, unpack, and welcome drink.",
          location: "Casa Anjuna, North Goa",
          category: "Culture",
          durationMinutes: 60,
          cost: 0,
          travelTimeMinutes: 20,
          isEssential: true,
          status: "completed",
          dayIndex: 1,
        },
        {
          id: "act-1-3",
          time: "13:00",
          title: "Traditional Goan Fish Thali Lunch",
          description: "Authentic coastal Goan fish thali and kingfish fry at Kokni Kanteen.",
          location: "Kokni Kanteen, Panaji",
          category: "Food",
          durationMinutes: 90,
          cost: 1200,
          travelTimeMinutes: 15,
          isEssential: true,
          status: "completed",
          dayIndex: 1,
        },
        {
          id: "act-1-4",
          time: "15:30",
          title: "Fontainhas Latin Quarter Photography Walk",
          description: "Explore UNESCO heritage colorful Portuguese houses and local art galleries.",
          location: "Fontainhas, Panaji",
          category: "Culture",
          durationMinutes: 120,
          cost: 800,
          travelTimeMinutes: 20,
          isEssential: true,
          status: "completed",
          dayIndex: 1,
          imageUrl: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
        },
        {
          id: "act-1-5",
          time: "18:30",
          title: "Mandovi River Sunset Cruise",
          description: "Scenic 1-hour cruise along Mandovi River with traditional folk dance.",
          location: "Panaji Jetty",
          category: "Nature",
          durationMinutes: 60,
          cost: 700,
          travelTimeMinutes: 15,
          isEssential: false,
          status: "completed",
          dayIndex: 1,
          imageUrl: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80",
        },
        {
          id: "act-1-6",
          time: "20:30",
          title: "Heritage Dinner at Viva Panjim",
          description: "Award-winning prawn balchão and Goan pork vindaloo in vintage setting.",
          location: "Viva Panjim, Fontainhas",
          category: "Food",
          durationMinutes: 90,
          cost: 0,
          travelTimeMinutes: 10,
          isEssential: true,
          status: "completed",
          dayIndex: 1,
        },
      ],
    },
    {
      dayIndex: 2,
      date: "Oct 16, 2026",
      title: "Forts, Shacks & Coastal Sunsets",
      weather: {
        condition: "Partly Cloudy",
        tempC: 29,
        iconName: "cloud-sun",
        alert: "Heavy rain predicted at 3:00 PM",
      },
      activities: [
        {
          id: "act-2-1",
          time: "09:00",
          title: "Breakfast at Anjuna Beach Cafe",
          description: "Artisanal coffee, fresh avocado toast, and smoothie bowls by the sea.",
          location: "Anjuna Beach Cafe",
          category: "Food",
          durationMinutes: 60,
          cost: 600,
          travelTimeMinutes: 15,
          isEssential: true,
          status: "completed",
          dayIndex: 2,
          imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
        },
        {
          id: "act-2-2",
          time: "10:30",
          title: "Fort Aguada & Historic Lighthouse",
          description: "17th-century Portuguese fort with panoramic views of the Arabian Sea.",
          location: "Sinquerim, Candolim",
          category: "History",
          durationMinutes: 120,
          cost: 300,
          travelTimeMinutes: 25,
          isEssential: true,
          status: "upcoming",
          dayIndex: 2,
          imageUrl: "https://images.unsplash.com/photo-1587922546307-776227941871?auto=format&fit=crop&w=800&q=80",
        },
        {
          id: "act-2-3",
          time: "13:00",
          title: "Lunch at Gunpowder Restaurant",
          description: "Famous South Indian & coastal fusion cuisine in a lush garden bungalow.",
          location: "Assagao, North Goa",
          category: "Food",
          durationMinutes: 90,
          cost: 1500,
          travelTimeMinutes: 15,
          isEssential: true,
          status: "upcoming",
          dayIndex: 2,
          imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        },
        {
          id: "act-2-4",
          time: "15:00",
          title: "Baga Beach Watersports & Sunbathing",
          description: "Parasailing, jet-skiing, and relaxing on beach loungers.",
          location: "Baga Beach, North Goa",
          category: "Beaches",
          durationMinutes: 180,
          cost: 500,
          travelTimeMinutes: 20,
          isEssential: false,
          status: "upcoming",
          dayIndex: 2,
          imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        },
        {
          id: "act-2-5",
          time: "18:30",
          title: "Chapora Fort Sunset Vantage Point",
          description: "Iconic sunset view over Vagator Beach cliff tops.",
          location: "Chapora Fort, Vagator",
          category: "Nature",
          durationMinutes: 90,
          cost: 800,
          travelTimeMinutes: 20,
          isEssential: false,
          status: "upcoming",
          dayIndex: 2,
          imageUrl: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&w=800&q=80",
        },
        {
          id: "act-2-6",
          time: "20:00",
          title: "Seafood Dinner at Fisherman's Wharf",
          description: "Riverside fine dining featuring fresh catch lobster and Goan butter garlic crab.",
          location: "Cavelossim / Calangute Branch",
          category: "Food",
          durationMinutes: 120,
          cost: 2500,
          travelTimeMinutes: 15,
          isEssential: true,
          status: "upcoming",
          dayIndex: 2,
          imageUrl: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80",
        },
      ],
    },
    {
      dayIndex: 3,
      date: "Oct 17, 2026",
      title: "South Goa Heritage & Spice Plantation",
      weather: { condition: "Sunny", tempC: 30, iconName: "sun" },
      activities: [
        {
          id: "act-3-1",
          time: "09:00",
          title: "Breakfast at Art Resort Cafe",
          description: "French bakery pastries, chai, and fresh papaya bowl.",
          location: "Palolem / Anjuna",
          category: "Food",
          durationMinutes: 60,
          cost: 500,
          travelTimeMinutes: 10,
          isEssential: true,
          status: "upcoming",
          dayIndex: 3,
        },
        {
          id: "act-3-2",
          time: "10:30",
          title: "Tropical Spice Plantation Tour & Traditional Buffet",
          description: "Guided organic farm tour, elephant wash view, and banana leaf lunch buffet.",
          location: "Ponda, Central Goa",
          category: "Nature",
          durationMinutes: 150,
          cost: 1200,
          travelTimeMinutes: 45,
          isEssential: true,
          status: "upcoming",
          dayIndex: 3,
        },
        {
          id: "act-3-3",
          time: "14:00",
          title: "Basilica of Bom Jesus UNESCO World Heritage",
          description: "Explore 400-year-old baroque architecture housing Saint Francis Xavier relics.",
          location: "Old Goa",
          category: "History",
          durationMinutes: 120,
          cost: 200,
          travelTimeMinutes: 20,
          isEssential: true,
          status: "upcoming",
          dayIndex: 3,
        },
        {
          id: "act-3-4",
          time: "17:00",
          title: "Palolem Beach Sunset & Kayaking",
          description: "Calm crescent bay kayaking and watching dolphin pods near Butterfly Island.",
          location: "Palolem Beach, South Goa",
          category: "Adventure",
          durationMinutes: 120,
          cost: 600,
          travelTimeMinutes: 30,
          isEssential: false,
          status: "upcoming",
          dayIndex: 3,
        },
        {
          id: "act-3-5",
          time: "20:00",
          title: "Candlelight Beach Shack Dinner",
          description: "Grilled snapper and live acoustic guitar music under the palms.",
          location: "Dropadi Shack, Palolem",
          category: "Food",
          durationMinutes: 90,
          cost: 1500,
          travelTimeMinutes: 10,
          isEssential: true,
          status: "upcoming",
          dayIndex: 3,
        },
      ],
    },
    {
      dayIndex: 4,
      date: "Oct 18, 2026",
      title: "Local Flea Markets & Farewell Souvenirs",
      weather: { condition: "Clear", tempC: 31, iconName: "sun" },
      activities: [
        {
          id: "act-4-1",
          time: "09:30",
          title: "Organic Breakfast at Baba Au Rhum",
          description: "Famous woodfired pizzas, croissants, and organic cold brew.",
          location: "Anjuna, Goa",
          category: "Food",
          durationMinutes: 60,
          cost: 700,
          travelTimeMinutes: 10,
          isEssential: true,
          status: "upcoming",
          dayIndex: 4,
        },
        {
          id: "act-4-2",
          time: "11:00",
          title: "Anjuna Flea Market Souvenir Shopping",
          description: "Handcrafted brassware, cashews, feni, spices, and bohemian resort wear.",
          location: "Anjuna Market",
          category: "Shopping",
          durationMinutes: 120,
          cost: 1500,
          travelTimeMinutes: 15,
          isEssential: false,
          status: "upcoming",
          dayIndex: 4,
        },
        {
          id: "act-4-3",
          time: "13:30",
          title: "Farewell Coastal Lunch at Pousada by the Beach",
          description: "Exclusive beachfront dining with Portuguese crab cakes and serradura dessert.",
          location: "Calangute Beachfront",
          category: "Food",
          durationMinutes: 90,
          cost: 2000,
          travelTimeMinutes: 15,
          isEssential: true,
          status: "upcoming",
          dayIndex: 4,
        },
        {
          id: "act-4-4",
          time: "16:00",
          title: "Airport Transfer & Departure",
          description: "Pre-arranged cab to Goa Dabolim Airport for return flight to Hyderabad.",
          location: "Dabolim Airport",
          category: "Transport",
          durationMinutes: 90,
          cost: 1800,
          travelTimeMinutes: 45,
          isEssential: true,
          status: "upcoming",
          dayIndex: 4,
        },
      ],
    },
  ],
};

export const MOCK_LIVE_EVENTS: LiveEvent[] = [
  {
    id: "evt-1",
    type: "weather",
    severity: "warning",
    title: "Monsoon Shower Expected",
    description: "Heavy rain (85% probability) forecast for North Goa between 3:00 PM and 6:00 PM.",
    time: "Today, 14:15",
    actionLabel: "Replan Day 2 Outdoor Activities",
    replanTrigger: "weather",
  },
  {
    id: "evt-2",
    type: "traffic",
    severity: "info",
    title: "Mandovi Bridge Maintenance",
    description: "Panaji bypass road reduced to single lane. Add +30 mins buffer for South Goa travel.",
    time: "Today, 12:00",
    actionLabel: "Adjust Travel Buffers",
    replanTrigger: "running_late",
  },
  {
    id: "evt-3",
    type: "booking",
    severity: "alert",
    title: "Fisherman's Wharf Table Update",
    description: "High demand tonight. Re-confirmation required by 6:00 PM or swap to Souza Lobo.",
    time: "Today, 11:30",
    actionLabel: "Review Dining Options",
    replanTrigger: "restaurant_unavailable",
  },
];

export const MOCK_ASSISTANT_INITIAL: AssistantMessage[] = [
  {
    id: "msg-1",
    sender: "assistant",
    text: "Hello Devisree! I'm monitoring your **Goa Beach & Culture Exploration** trip. You're currently on Day 2 of 4 with ₹12,550 remaining in your budget.\n\nHow can I help optimize your day?",
    timestamp: "10:30 AM",
  },
];

export const MOCK_COMPLETED_TRIP_SUMMARY: CompletedTripSummary = {
  tripTitle: "Goa Coastal Highlights (Completed Sample)",
  destination: "Goa, India",
  totalSpent: 18420,
  budgetRemaining: 1580,
  placesVisited: 12,
  activitiesCompleted: 16,
  durationDays: 4,
  spendingBreakdown: [
    { category: "Transport", amount: 5800, percentage: 31.5 },
    { category: "Accommodation", amount: 5000, percentage: 27.1 },
    { category: "Food", amount: 4820, percentage: 26.2 },
    { category: "Activities", amount: 1800, percentage: 9.8 },
    { category: "Souvenirs/Reserve", amount: 1000, percentage: 5.4 },
  ],
  highlights: [
    { title: "Sunset at Chapora Fort", date: "Oct 16", category: "Nature" },
    { title: "Fontainhas Heritage Walk", date: "Oct 15", category: "Culture" },
    { title: "Tropical Spice Plantation Lunch", date: "Oct 17", category: "Food" },
    { title: "Anjuna Flea Market Finds", date: "Oct 18", category: "Shopping" },
  ],
};

export function generateRainScenarioProposal(currentTrip: Trip): ReplanProposal {
  const targetDay = currentTrip.days.find((d) => d.dayIndex === 2) || currentTrip.days[0];
  const originalActivities = [...targetDay.activities];

  const proposedActivities: ItineraryActivity[] = targetDay.activities.map((act) => {
    if (act.id === "act-2-4" || act.title.toLowerCase().includes("baga beach") || act.category === "Beaches") {
      return {
        ...act,
        id: `${act.id}-replaced`,
        title: "Houses of Goa Museum & Indoor Art Gallery",
        description:
          "Unique indoor architectural museum by Gerard da Cunha showcasing Goan heritage structures. Rain-proof activity!",
        location: "Torda, Salvador do Mundo",
        category: "Culture",
        durationMinutes: 120,
        cost: 400,
        isEssential: true,
        status: "replaced",
        replacementReason: "Replaced outdoor beach visit due to heavy rain forecast (85% probability).",
        originalTitle: act.title,
      };
    }
    return { ...act };
  });

  return {
    id: `prop-rain-${Date.now()}`,
    triggerType: "weather",
    triggerTitle: "Weather Change: Heavy Rain Expected at 3:00 PM",
    whatChanged: "Rain radar predicts heavy downpours (85% probability) in North Goa between 3:00 PM and 6:00 PM.",
    whyChanged: "Outdoor beach relaxation and watersports at Baga Beach are unsafe and unpleasant during heavy downpours.",
    proposalSummary:
      "I moved your outdoor Baga Beach visit to tomorrow morning (sunny forecast) and substituted today's 3:00 PM slot with the climate-controlled Houses of Goa Museum & Indoor Gallery. All other 5 activities remain unchanged.",
    timeImpact: "0 mins delay (Same total schedule duration)",
    budgetImpact: -100,
    targetDayIndex: targetDay.dayIndex,
    affectedActivityIds: ["act-2-4"],
    originalActivities,
    proposedActivities,
    unaffectedCount: Math.max(0, originalActivities.length - 1),
  };
}

export function generateRunningLateProposal(currentTrip: Trip): ReplanProposal {
  const targetDay = currentTrip.days.find((d) => d.dayIndex === 2) || currentTrip.days[0];
  const originalActivities = [...targetDay.activities];

  const proposedActivities: ItineraryActivity[] = originalActivities.map((act, idx) => {
    if (idx === 0) return { ...act };
    if (idx === 1) {
      return {
        ...act,
        time: "12:30",
        notes: "Started 2 hours late. Streamlined tour path to 60 mins.",
        durationMinutes: 60,
        status: "modified",
      };
    }
    if (idx === 2) {
      return {
        ...act,
        time: "14:00",
        description: "Shifted lunch to 14:00 at Gunpowder (table booking adjusted automatically).",
        status: "modified",
      };
    }
    if (idx === 3) {
      return {
        ...act,
        time: "16:00",
        durationMinutes: 120,
        description: "Compressed beach stay to 2 hours to safeguard dinner reservation.",
        status: "modified",
      };
    }
    return { ...act };
  });

  return {
    id: `prop-late-${Date.now()}`,
    triggerType: "running_late",
    triggerTitle: "Schedule Adjustment: 2 Hours Delay",
    whatChanged: "Your morning departure was delayed by 120 minutes.",
    whyChanged: "To preserve all essential sights and your 20:00 dinner reservation without rushing dangerously.",
    proposalSummary:
      "Reorganized Day 2 remaining activities. Streamlined Fort Aguada walk by 30 mins, shifted lunch to 14:00, and compressed Baga Beach from 3 hours to 2 hours. Your dinner reservation at Fisherman's Wharf is 100% safe.",
    timeImpact: "+120 mins offset absorbed smoothly across afternoon slots",
    budgetImpact: 0,
    targetDayIndex: targetDay.dayIndex,
    affectedActivityIds: ["act-2-2", "act-2-3", "act-2-4"],
    originalActivities,
    proposedActivities,
    unaffectedCount: Math.max(0, originalActivities.length - 3),
  };
}

export function generateBudgetReductionProposal(currentTrip: Trip): ReplanProposal {
  const targetDay = currentTrip.days.find((d) => d.dayIndex === 2) || currentTrip.days[0];
  const originalActivities = [...targetDay.activities];

  const proposedActivities: ItineraryActivity[] = originalActivities.map((act) => {
    if (act.id === "act-2-6" || act.title.toLowerCase().includes("fisherman")) {
      return {
        ...act,
        id: `${act.id}-replaced`,
        title: "Goan Shack Feast at Souza Lobo (Calangute)",
        description:
          "Top-rated legendary Goan beach shack dining with fresh butter garlic prawns & acoustic band. Saves ₹1,500!",
        cost: 1000,
        status: "replaced",
        replacementReason: "Replaced high-cost fine dining venue to reduce total trip cost.",
        originalTitle: act.title,
      };
    }
    if (act.id === "act-2-4" || act.title.toLowerCase().includes("baga beach")) {
      return {
        ...act,
        cost: 0,
        description: "Scenic beach walk, swimming, and sunset photo spot (Free option saved ₹500).",
        status: "modified",
      };
    }
    return { ...act };
  });

  return {
    id: `prop-budget-${Date.now()}`,
    triggerType: "budget_reduction",
    triggerTitle: "Budget Optimization: Reduce Total Cost by ₹2,000",
    whatChanged: "Target trip budget reduced from ₹20,000 to ₹18,000.",
    whyChanged: "Finding high-value, authentic local alternatives without deleting any core sights or cultural experiences.",
    proposalSummary:
      "Substituted Fisherman's Wharf fine dining (₹2,500) with iconic beachside Goan shack Souza Lobo (₹1,000, saving ₹1,500). Swapped commercial beach bed rental with a free scenic coastal walk (saving ₹500). Total savings: ₹2,000.",
    timeImpact: "0 mins change",
    budgetImpact: -2000,
    targetDayIndex: targetDay.dayIndex,
    affectedActivityIds: ["act-2-6", "act-2-4"],
    originalActivities,
    proposedActivities,
    unaffectedCount: Math.max(0, originalActivities.length - 2),
  };
}

export function generateScubaAdditionProposal(currentTrip: Trip): ReplanProposal {
  const targetDay = currentTrip.days.find((d) => d.dayIndex === 3) || currentTrip.days[0];
  const originalActivities = [...targetDay.activities];

  const proposedActivities: ItineraryActivity[] = [
    originalActivities[0],
    {
      id: `act-scuba-${Date.now()}`,
      time: "08:30",
      title: "Scuba Diving & Snorkeling at Grand Island",
      description:
        "Boat cruise to Grand Island, professional PADI instruction, 25-min underwater dive, and underwater GoPro video.",
      location: "Grand Island, South Goa",
      category: "Adventure",
      durationMinutes: 240,
      cost: 1800,
      travelTimeMinutes: 30,
      isEssential: false,
      status: "added",
      dayIndex: targetDay.dayIndex,
    },
    { ...originalActivities[1], time: "13:30", status: "modified" },
    { ...originalActivities[2], time: "16:30", status: "modified" },
    { ...originalActivities[originalActivities.length - 1], time: "20:00", status: "upcoming" },
  ];

  return {
    id: `prop-scuba-${Date.now()}`,
    triggerType: "add_activity",
    triggerTitle: "Activity Addition: Scuba Diving at Grand Island",
    whatChanged: "Requested adding Scuba Diving (+₹1,800, +4 hours).",
    whyChanged: "Optimal slot identified on Day 3 Morning during high-visibility marine conditions.",
    proposalSummary:
      "Fitted Scuba Diving at Grand Island (08:30 - 12:30). Shifted Spice Plantation tour to 13:30. Remaining trip budget adjusts from ₹12,550 to ₹10,750 (Feasible & within reserve).",
    timeImpact: "+4 hours active adventure time added",
    budgetImpact: 1800,
    targetDayIndex: targetDay.dayIndex,
    affectedActivityIds: ["act-3-2", "act-3-3"],
    originalActivities,
    proposedActivities,
    unaffectedCount: Math.max(0, originalActivities.length - 2),
  };
}

export const MOCK_HOTEL_OPTIONS: any[] = [
  {
    id: "hotel-1",
    name: "Taj Fort Aguada Resort & Spa",
    destination: "Goa",
    rating: 4.9,
    reviewsCount: 1240,
    pricePerNight: 8500,
    totalPrice: 25500,
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    location: "Sinquerim Beach, Candolim, North Goa",
    badge: "👑 Luxury Pick",
    amenities: ["Private Beach Access", "Infinity Pool", "Jiva Spa", "Buffet Breakfast Included", "Free High-Speed WiFi"],
    roomType: "Sea View Heritage Villa",
    isBooked: true,
  },
  {
    id: "hotel-2",
    name: "Ahilya By The Sea",
    destination: "Goa",
    rating: 4.8,
    reviewsCount: 890,
    pricePerNight: 4200,
    totalPrice: 12600,
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    location: "Coco Beach, Nerul, North Goa",
    badge: "🔥 Best Seller",
    amenities: ["Seaview Plunge Pool", "Heritage Portuguese Villa", "Organic Dining", "Free Airport Transfer", "Yoga Deck"],
    roomType: "Deluxe Ocean View Room",
    isBooked: false,
  },
  {
    id: "hotel-3",
    name: "Novotel Goa Resort & Spa",
    destination: "Goa",
    rating: 4.6,
    reviewsCount: 1450,
    pricePerNight: 3100,
    totalPrice: 9300,
    imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
    location: "Candolim Beach Road, North Goa",
    badge: "💰 Best Value",
    amenities: ["Sunken Pool Bar", "Kids Play Zone", "24/7 Fitness Center", "Full Service Spa", "Free WiFi"],
    roomType: "Executive Pool View Room",
    isBooked: false,
  },
  {
    id: "hotel-4",
    name: "Alila Diwa Goa (Hyatt Resort)",
    destination: "Goa",
    rating: 4.9,
    reviewsCount: 920,
    pricePerNight: 5500,
    totalPrice: 16500,
    imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    location: "Majorda Beach, South Goa",
    badge: "🌿 Eco Luxury",
    amenities: ["Paddy Field Infinity Pool", "Open Air Cinema", "Artisanal Spice Restaurant", "Daily Wellness Classes"],
    roomType: "Terrace Suite",
    isBooked: false,
  },
];
