import { NextRequest, NextResponse } from "next/server";
import { ReplanProposal, Trip } from "@/lib/types";
import {
  generateRainScenarioProposal,
  generateBudgetReductionProposal,
  generateScubaAdditionProposal,
  generateRunningLateProposal,
} from "@/lib/data/mockData";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, currentTrip } = body;

    if (!message || !message.trim()) {
      return NextResponse.json({ success: false, error: "Message is required" }, { status: 400 });
    }

    const cleanInput = message.trim();
    const lower = cleanInput.toLowerCase();
    const trip: Trip = currentTrip || {};
    const dest = trip.destination || "Goa";
    const dayIdx = trip.currentDayIndex || 2;
    const totalBudget = trip.totalBudget || 20000;
    const spentAmount = trip.spentAmount || 7450;
    const remBudget = Math.max(0, totalBudget - spentAmount);

    let responseText = "";
    let attachedProposal: ReplanProposal | undefined = undefined;

    // Intent 1: Move / Reschedule / Shift activity to tomorrow or another day
    if (
      lower.includes("move") ||
      lower.includes("shift") ||
      lower.includes("reschedule") ||
      (lower.includes("beach") && lower.includes("tomorrow"))
    ) {
      const targetDay = trip.days?.find((d) => d.dayIndex === 3) || trip.days?.[0];
      const origActivities = trip.days?.find((d) => d.dayIndex === 2)?.activities || [];

      const proposed = origActivities.map((act) => {
        if (act.title.toLowerCase().includes("beach") || act.category === "Beaches") {
          return {
            ...act,
            time: "10:30",
            dayIndex: 3,
            description: "Moved from Day 2 afternoon to Day 3 morning for optimal weather and beach conditions.",
            status: "modified" as const,
          };
        }
        return { ...act };
      });

      attachedProposal = {
        id: `prop-move-${Date.now()}`,
        triggerType: "custom",
        triggerTitle: "Schedule Shift: Baga Beach Moved to Tomorrow",
        whatChanged: "Shifted outdoor beach activity from Day 2 afternoon to Day 3 morning.",
        whyChanged: "Requested by traveler to free up today's afternoon slot for relaxed leisure or indoor sightseeing.",
        proposalSummary:
          "Moved Baga Beach Watersports from Day 2 (15:00) to Day 3 (10:30). Today's afternoon now has 3 hours of open leisure time. Dinner and evening sunset plans remain 100% intact.",
        timeImpact: "Freed up 180 mins on Day 2 afternoon",
        budgetImpact: 0,
        targetDayIndex: dayIdx,
        affectedActivityIds: ["act-2-4"],
        originalActivities: origActivities,
        proposedActivities: proposed,
        unaffectedCount: Math.max(0, origActivities.length - 1),
      };

      responseText = `I have adjusted your **${dest}** itinerary as requested! I moved **Baga Beach Watersports** to tomorrow morning (Day 3 at 10:30 AM) when weather and crowd conditions are best, freeing up 3 hours on your afternoon schedule today. Here is the proposed update:`;
    }
    // Intent 2: Budget reduction / Save money / Cost optimization
    else if (
      lower.includes("save") ||
      lower.includes("budget") ||
      lower.includes("cut") ||
      lower.includes("cost") ||
      lower.includes("2000") ||
      lower.includes("2,000") ||
      lower.includes("cheaper") ||
      lower.includes("less money")
    ) {
      attachedProposal = generateBudgetReductionProposal(trip);
      responseText = `I analyzed your **${dest}** itinerary spend. We can cut **₹2,000** off your total trip expense without dropping any sights or experiences!\n\n• **Dining Optimization:** Replaced Fisherman's Wharf fine dining (₹2,500) with legendary Goan beach shack Souza Lobo (₹1,000, saving ₹1,500).\n• **Activity Optimization:** Swapped commercial beach lounger rental with free scenic coastal walking (saving ₹500).\n\nReview the exact proposal below:`;
    }
    // Intent 3: Rain / Weather / Storm adaptation
    else if (
      lower.includes("rain") ||
      lower.includes("weather") ||
      lower.includes("storm") ||
      lower.includes("shower") ||
      lower.includes("wet")
    ) {
      attachedProposal = generateRainScenarioProposal(trip);
      responseText = `Radar forecast for **${dest}** indicates heavy rain probability during outdoor afternoon hours today. I created an adaptive replan proposal that swaps outdoor beach time with the indoor **Houses of Goa Museum**, moving the beach visit to clear weather tomorrow morning. Here is the impact summary:`;
    }
    // Intent 4: Add new activity / Scuba diving / Water sports / Museum
    else if (
      lower.includes("scuba") ||
      lower.includes("add") ||
      lower.includes("another place") ||
      lower.includes("extra activity") ||
      lower.includes("more places") ||
      lower.includes("fit in")
    ) {
      attachedProposal = generateScubaAdditionProposal(trip);
      responseText = `I evaluated your schedule and budget! We can comfortably fit **Scuba Diving at Grand Island** on Day 3 morning (08:30 - 12:30). It costs +₹1,800 and fits well within your remaining ₹${remBudget.toLocaleString()} budget balance. Here is the proposal breakdown:`;
    }
    // Intent 5: Dining & Food Recommendations
    else if (
      lower.includes("eat") ||
      lower.includes("food") ||
      lower.includes("dinner") ||
      lower.includes("lunch") ||
      lower.includes("restaurant") ||
      lower.includes("shack") ||
      lower.includes("vegetarian") ||
      lower.includes("seafood")
    ) {
      responseText = `Here are top authentic dining recommendations for **${dest}** based on your trip style:\n\n1. **Souza Lobo (Calangute Beach)** — Iconic beachside Goan seafood & veg thalis (₹800 for two).\n2. **Fisherman's Wharf** — Premium riverside dining with fresh catch & live music (₹2,200 for two).\n3. **Gunpowder (Assagao)** — South Indian fusion in a romantic garden setting (₹1,500 for two).\n4. **Vinayak Family Restaurant (Anjuna)** — Authentic local Goan fish curry thali (₹400 for two).\n\nYour remaining food budget allocation is **₹${Math.round(
        remBudget * 0.35
      ).toLocaleString()}**. Would you like me to replace your current dinner slot with one of these?`;
    }
    // Intent 6: Attractions & Sights Info
    else if (
      lower.includes("fort") ||
      lower.includes("aguada") ||
      lower.includes("sight") ||
      lower.includes("attraction") ||
      lower.includes("church") ||
      lower.includes("places to visit")
    ) {
      responseText = `Key sight details for **${dest}** on your itinerary:\n\n• **Fort Aguada (17th Century Portuguese Fortress):** Open 09:30 - 18:00. Great coastal views and historic lighthouse.\n• **Baga Beach & Calangute:** Famous for water sports, beach shacks, and sunset views.\n• **Basilica of Bom Jesus (Old Goa):** UNESCO Heritage site housing Saint Francis Xavier relics.\n• **Tropical Spice Plantation (Ponda):** Organic spice tour with traditional banana-leaf lunch buffet.\n\nAll of these are included in your 4-day plan!`;
    }
    // Intent 7: Budget & Spent Overview
    else if (
      lower.includes("spent") ||
      lower.includes("total budget") ||
      lower.includes("remaining") ||
      lower.includes("balance") ||
      lower.includes("expense") ||
      lower.includes("money")
    ) {
      const spentPct = Math.round((spentAmount / totalBudget) * 100);
      responseText = `Here is your financial status for the **${dest}** trip:\n\n• **Total Allocated Budget:** ₹${totalBudget.toLocaleString()}\n• **Spent Amount So Far:** ₹${spentAmount.toLocaleString()} (${spentPct}% of budget)\n• **Remaining Balance:** ₹${remBudget.toLocaleString()}\n• **Pacing Status:** Healthy! You have ample buffer for unexpected activities or souvenir shopping.`;
    }
    // Intent 8: Transportation & Local Travel
    else if (
      lower.includes("taxi") ||
      lower.includes("transport") ||
      lower.includes("scooter") ||
      lower.includes("cab") ||
      lower.includes("travel around") ||
      lower.includes("bus")
    ) {
      responseText = `Best transportation options for **${dest}**:\n\n1. **Scooter / Bike Rental:** ₹400–₹600/day (Ideal for beach hopping and quick travel).\n2. **Self-Drive Car:** ₹1,500–₹2,500/day (Great for group trips and longer distances).\n3. **Local Prepaid Taxis:** Available at railway stations, airport, and major hotel stands.\n\nYour trip budget reserves ₹1,800 for transport.`;
    }
    // Intent 9: Greetings & General Help
    else {
      responseText = `Hello! I am your **Roamwise AI Travel Assistant**.\n\nI am actively monitoring your **${dest}** trip (Day ${dayIdx} of ${trip.durationDays || 4}). You have **₹${remBudget.toLocaleString()}** remaining in your budget.\n\nHere are things you can ask me to do:\n• *"What can we do if it rains tomorrow?"*\n• *"Can we save ₹2,000?"*\n• *"Move today's beach activity to tomorrow"*\n• *"Is there enough time to add Scuba diving?"*\n• *"Where should we eat tonight?"*`;
    }

    return NextResponse.json({
      success: true,
      source: "Roamwise Realtime AI Assistant Engine",
      text: responseText,
      proposal: attachedProposal,
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: "Failed to process chat message" }, { status: 500 });
  }
}
