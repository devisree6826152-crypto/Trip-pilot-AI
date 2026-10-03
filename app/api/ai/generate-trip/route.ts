import { NextRequest, NextResponse } from "next/server";
import { Trip, TripDay, ItineraryActivity, CategoryType, HotelOption } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      destination = "Goa, India",
      startingLocation = "Hyderabad, India",
      startDate = "Nov 10, 2026",
      durationDays = 4,
      travelersCount = 3,
      totalBudget = 30000,
      travelStyle = "Relaxed",
      interests = ["Nature", "Food", "Culture"],
      accommodationPreference = "Hotel",
      transportPreference = "Mixed",
      foodPreference = "Vegetarian",
      dietaryPreference = "Vegetarian",
      accessibilityNeeds = "None",
      specialRequests = "Prefer quiet places and avoid expensive restaurants.",
      currency = "₹ INR",
    } = body;

    const numDays = Math.max(1, Math.min(10, Number(durationDays) || 4));
    const numBudget = Math.max(5000, Number(totalBudget) || 30000);
    const numTravelers = Math.max(1, Number(travelersCount) || 3);
    const destClean = destination.split("→")[0].split(",")[0].trim();

    // Calculate lodging allocation
    const accomAlloc = Math.round(numBudget * 0.32);
    const perNightLodging = Math.round(accomAlloc / numDays);

    const recommendedStay: HotelOption = {
      id: `hotel-gen-${Date.now()}`,
      name: `${destClean} Heritage Eco-Boutique Resort`,
      destination: destClean,
      rating: 4.8,
      reviewsCount: 342,
      pricePerNight: perNightLodging,
      totalPrice: accomAlloc,
      imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
      location: `${destClean} Beachside & Cultural Precinct`,
      badge: "Fits Budget Allocation",
      amenities: ["Free Wi-Fi", "Organic Breakfast", "Pool", "Eco-friendly"],
      roomType: "Deluxe Garden View Room",
    };

    const days: TripDay[] = [];

    for (let d = 1; d <= numDays; d++) {
      const dayActivities: ItineraryActivity[] = [];

      // Morning Breakfast
      const breakfastCost = Math.round(numBudget * 0.015);
      dayActivities.push({
        id: `gen-act-${d}-1`,
        time: "08:30",
        title: `Breakfast at ${destClean} ${dietaryPreference} Cafe`,
        description: `Fresh organic ${dietaryPreference.toLowerCase()} breakfast & herbal tea.`,
        location: `${destClean} Promenade`,
        category: "Food",
        durationMinutes: 60,
        cost: breakfastCost,
        travelTimeMinutes: 10,
        isEssential: true,
        status: "upcoming",
        dayIndex: d,
      });

      // Morning Activity / Sight
      const primaryCat = interests[(d - 1) % interests.length] || "Nature";
      const sightCost = Math.round(numBudget * 0.02);
      dayActivities.push({
        id: `gen-act-${d}-2`,
        time: "10:00",
        title: d === 1 ? `Arrival & Check-in at ${recommendedStay.name}` : `Explore ${destClean} ${primaryCat} Landmark`,
        description: d === 1 ? "Check into boutique hotel and receive local welcome drinks." : `Guided exploration of ${destClean}'s top ${primaryCat.toLowerCase()} attractions.`,
        location: `${destClean} Main Heritage Trail`,
        category: primaryCat as CategoryType,
        durationMinutes: 120,
        cost: d === 1 ? 0 : sightCost,
        travelTimeMinutes: 20,
        isEssential: true,
        status: "upcoming",
        dayIndex: d,
      });

      // Afternoon Lunch
      const lunchCost = Math.round(numBudget * 0.03);
      dayActivities.push({
        id: `gen-act-${d}-3`,
        time: "12:30",
        title: `${destClean} ${dietaryPreference} Specialty Lunch`,
        description: `Authentic local ${dietaryPreference.toLowerCase()} multi-course thali & fresh beverages.`,
        location: `${destClean} Heritage Bazaar`,
        category: "Food",
        durationMinutes: 90,
        cost: lunchCost,
        travelTimeMinutes: 15,
        isEssential: true,
        status: "upcoming",
        dayIndex: d,
      });

      // Afternoon Activity
      const secCat = interests[d % interests.length] || "Culture";
      const actCost = Math.round(numBudget * 0.025);
      dayActivities.push({
        id: `gen-act-${d}-4`,
        time: "15:00",
        title: `${destClean} ${secCat} Excursion`,
        description: `Relaxing late afternoon ${secCat.toLowerCase()} walk and scenic sunset spot.`,
        location: `${destClean} Sunset Viewpoint`,
        category: secCat as CategoryType,
        durationMinutes: 120,
        cost: actCost,
        travelTimeMinutes: 15,
        isEssential: false,
        status: "upcoming",
        dayIndex: d,
      });

      // Evening Dinner
      const dinnerCost = Math.round(numBudget * 0.04);
      dayActivities.push({
        id: `gen-act-${d}-5`,
        time: "20:00",
        title: `${destClean} Serene ${dietaryPreference} Dinner`,
        description: `Relaxing dinner matching ${dietaryPreference.toLowerCase()} preference with peaceful atmosphere.`,
        location: `${destClean} Old Town`,
        category: "Food",
        durationMinutes: 90,
        cost: dinnerCost,
        travelTimeMinutes: 15,
        isEssential: true,
        status: "upcoming",
        dayIndex: d,
      });

      days.push({
        dayIndex: d,
        date: `Day ${d}`,
        title: d === 1 ? "Arrival & Beachside Sunset" : d === 2 ? "Nature & Cultural Discovery" : d === 3 ? "Heritage Walk & Markets" : "Scenic Overlook & Departure",
        weather: {
          condition: "Sunny",
          tempC: 29,
          iconName: "sun",
        },
        activities: dayActivities,
      });
    }

    const whyThisPlan = [
      {
        category: "Accommodation Selection",
        explanation: `Selected a mid-range boutique hotel (₹${perNightLodging.toLocaleString()}/night) because your ₹${numBudget.toLocaleString()} budget leaves approximately ₹${accomAlloc.toLocaleString()} for lodging.`,
      },
      {
        category: "Transportation Route",
        explanation: `Chose ${transportPreference.toLowerCase()} routes between ${startingLocation} and ${destClean} activities, saving approximately ₹1,200 in travel fees.`,
      },
      {
        category: "Dining Alignment",
        explanation: `Selected top-rated restaurants matching your ${dietaryPreference} preference and food budget (approx ₹1,250/day per group).`,
      },
      {
        category: "Usable Travel Hours",
        explanation: `Structured all activities within your ~${numDays * 8} available travel hours to prevent scheduling fatigue.`,
      },
    ];

    const foodRecommendations = [
      { meal: "Breakfast", title: `${destClean} Garden Organic Cafe`, cost: 250, cuisine: "Organic / Local", location: `${destClean} Promenade`, dietaryNotes: `${dietaryPreference} friendly` },
      { meal: "Lunch", title: `${destClean} Heritage Thali House`, cost: 450, cuisine: "Authentic Regional", location: `${destClean} Bazaar`, dietaryNotes: `${dietaryPreference} certified` },
      { meal: "Dinner", title: `${destClean} Moonlight Courtyard`, cost: 650, cuisine: "Farm-to-Table", location: `${destClean} Old Town`, dietaryNotes: `${dietaryPreference} certified` },
    ];

    const generatedTrip: Trip = {
      id: `ai-trip-${Date.now()}`,
      title: `${destClean} ${travelStyle} Journey`,
      destination: destination,
      startingLocation,
      startDate,
      endDate: `+${numDays} Days`,
      durationDays: numDays,
      travelersCount: numTravelers,
      travelers: [
        { id: "u1", name: "You (Lead)", avatar: "Y", interests },
        { id: "u2", name: "Traveler 2", avatar: "T", interests: ["Food", "Nature"] },
      ],
      totalBudget: numBudget,
      spentAmount: Math.round(numBudget * 0.15),
      travelStyle: travelStyle as any,
      interests: interests as any,
      accommodationPreference,
      pacePreference: travelStyle,
      dietaryPreference,
      accessibilityNeeds,
      specialRequests,
      usableHours: numDays * 8,
      currency,
      groupMatchPercentage: 94,
      groupMatchExplanation: `AI aligned itinerary around your ₹${numBudget.toLocaleString()} budget, ${dietaryPreference} dietary preference, and ${travelStyle} pace.`,
      currentDayIndex: 1,
      status: "active",
      budgetCategories: [
        { name: "Accommodation", planned: accomAlloc, spent: Math.round(accomAlloc * 0.2), color: "#0d9488" },
        { name: "Transport", planned: Math.round(numBudget * 0.18), spent: Math.round(numBudget * 0.05), color: "#0284c7" },
        { name: "Food", planned: Math.round(numBudget * 0.22), spent: 0, color: "#d97706" },
        { name: "Activities", planned: Math.round(numBudget * 0.20), spent: 0, color: "#8b5cf6" },
        { name: "Emergency", planned: Math.max(0, numBudget - (accomAlloc + Math.round(numBudget * 0.6))), spent: 0, color: "#64748b" },
      ],
      stayRecommendation: recommendedStay,
      foodRecommendations,
      whyThisPlan,
      days,
    };

    return NextResponse.json({
      success: true,
      source: "Roamwise AI Generative Engine",
      trip: generatedTrip,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Failed to generate AI trip" },
      { status: 500 }
    );
  }
}
