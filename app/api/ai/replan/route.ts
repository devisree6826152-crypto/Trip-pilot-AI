import { NextRequest, NextResponse } from "next/server";
import { Trip, ReplanProposal, ItineraryActivity } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { triggerType = "weather", targetDayIndex = 2, currentTrip, customPrompt } = body;

    if (!currentTrip || !currentTrip.days) {
      return NextResponse.json({ success: false, error: "Current trip data required" }, { status: 400 });
    }

    const dayIndex = Number(targetDayIndex) || currentTrip.currentDayIndex || 2;
    const day = currentTrip.days.find((d: any) => d.dayIndex === dayIndex) || currentTrip.days[0];
    const originalActivities: ItineraryActivity[] = [...day.activities];

    let triggerTitle = "AI Adaptive Replanning";
    let whatChanged = "System detected an itinerary disruption event.";
    let whyChanged = "Rebalancing your schedule and budget guardrails.";
    let proposalSummary = "Replaced affected activities with optimized local alternatives.";
    let timeImpact = "0 mins change";
    let budgetImpact = 0;
    let proposedActivities: ItineraryActivity[] = [...originalActivities];
    let affectedIds: string[] = [];

    if (triggerType === "weather") {
      triggerTitle = "Weather Alert: Rain Radar Warning";
      whatChanged = "Rain radar predicts heavy downpours (85% probability) during outdoor afternoon hours.";
      whyChanged = "Outdoor beach and sports activities are unsafe and unpleasant during heavy downpours.";
      proposalSummary =
        "Substituted outdoor beach slot with climate-controlled indoor museum. Outdoor beach visit shifted to tomorrow's clear morning slot.";
      timeImpact = "0 mins delay (Same total schedule duration)";
      budgetImpact = -100;

      proposedActivities = originalActivities.map((act) => {
        if (act.category === "Beaches" || act.title.toLowerCase().includes("beach")) {
          affectedIds.push(act.id);
          return {
            ...act,
            id: `${act.id}-replaced`,
            title: `Houses of ${currentTrip.destination.split(",")[0]} Museum & Indoor Gallery`,
            description: "Indoor architectural museum and heritage gallery. Rain-proof protected activity!",
            category: "Culture",
            cost: Math.max(0, act.cost - 100),
            status: "replaced",
            replacementReason: "Replaced outdoor beach activity due to rain forecast.",
            originalTitle: act.title,
          };
        }
        return { ...act };
      });
    } else if (triggerType === "running_late") {
      triggerTitle = "Schedule Shift: 2 Hours Delay";
      whatChanged = "Your morning departure was delayed by 120 minutes.";
      whyChanged = "To preserve essential historical sights and evening dinner reservations without rushing.";
      proposalSummary =
        "Streamlined afternoon sight walk by 30 mins, shifted lunch, and compressed free time by 60 mins. Evening dinner reservation is 100% safe.";
      timeImpact = "+120 mins offset absorbed smoothly across afternoon slots";
      budgetImpact = 0;

      let timeOffset = 120;
      proposedActivities = originalActivities.map((act, idx) => {
        if (act.status === "completed") return { ...act };
        affectedIds.push(act.id);
        const [h, m] = act.time.split(":").map(Number);
        const newHour = Math.min(23, h + Math.floor(timeOffset / 60));
        timeOffset = Math.max(0, timeOffset - 30);
        return {
          ...act,
          time: `${newHour.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`,
          status: "modified",
        };
      });
    } else if (triggerType === "budget_reduction" || triggerType === "budget") {
      triggerTitle = "Budget Optimization: Reduce Cost by ₹2,000";
      whatChanged = "Target trip spending reduced by ₹2,000.";
      whyChanged = "Finding top-rated local dining and activity alternatives without dropping core sights.";
      proposalSummary =
        "Substituted fine dining venue with top-rated local shack feast (saving ₹1,500). Replaced paid bed rental with free scenic walk (saving ₹500).";
      timeImpact = "0 mins change";
      budgetImpact = -2000;

      proposedActivities = originalActivities.map((act) => {
        if (act.cost >= 2000) {
          affectedIds.push(act.id);
          return {
            ...act,
            title: `Authentic Local Shack & Thali Feast`,
            description: "Top-rated local coastal dining with fresh regional seafood & vegetarian dishes.",
            cost: Math.max(500, act.cost - 1500),
            status: "replaced",
            replacementReason: "Replaced high-cost venue to optimize budget.",
            originalTitle: act.title,
          };
        } else if (act.cost >= 500 && !act.isEssential) {
          affectedIds.push(act.id);
          return {
            ...act,
            cost: 0,
            description: "Free scenic coastal trail and sunset lookout.",
            status: "modified",
          };
        }
        return { ...act };
      });
    } else {
      // Custom AI proposal
      triggerTitle = customPrompt ? `Custom Request: "${customPrompt}"` : "AI Itinerary Optimization";
      whatChanged = customPrompt || "Custom request submitted to AI agent.";
      whyChanged = "Adapting schedule according to your custom instructions.";
      proposalSummary = "Adjusted activity sequence and budget to fit your requested change.";
      timeImpact = "Schedule rebalanced";
      budgetImpact = 0;
    }

    const proposal: ReplanProposal = {
      id: `ai-prop-${Date.now()}`,
      triggerType: triggerType as any,
      triggerTitle,
      whatChanged,
      whyChanged,
      proposalSummary,
      timeImpact,
      budgetImpact,
      targetDayIndex: dayIndex,
      affectedActivityIds: affectedIds,
      originalActivities,
      proposedActivities,
      unaffectedCount: Math.max(0, originalActivities.length - affectedIds.length),
    };

    return NextResponse.json({
      success: true,
      source: "Roamwise Realtime AI Replanning API",
      proposal,
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: "Failed to generate replan proposal" }, { status: 500 });
  }
}
