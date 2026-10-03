import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { triggerType, currentTrip } = body;

    // Structured mock response demonstrating API integration readiness
    return NextResponse.json({
      success: true,
      message: "Replan proposal generated successfully",
      triggerType,
      timestamp: new Date().toISOString(),
      note: "This endpoint is structured for external AI model integration (e.g. Gemini / Claude / OpenAI).",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to process replan request" },
      { status: 500 }
    );
  }
}
