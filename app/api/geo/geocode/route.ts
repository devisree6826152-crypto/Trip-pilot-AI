import { NextRequest, NextResponse } from "next/server";
import { geocodeLocation } from "@/lib/geoapify/geocode";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || searchParams.get("text");

  if (!query) {
    return NextResponse.json(
      { success: false, error: "Query parameter is required" },
      { status: 400 }
    );
  }

  const result = await geocodeLocation(query);
  if (!result) {
    return NextResponse.json(
      { success: false, error: "Location not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: result,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const query = body.query || body.address || body.destination;

    if (!query) {
      return NextResponse.json(
        { success: false, error: "Query field is required in POST body" },
        { status: 400 }
      );
    }

    const result = await geocodeLocation(query);
    if (!result) {
      return NextResponse.json(
        { success: false, error: "Location not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Failed to process geocoding request" },
      { status: 500 }
    );
  }
}
