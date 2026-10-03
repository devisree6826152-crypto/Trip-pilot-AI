import { NextRequest, NextResponse } from "next/server";
import { fetchGeoapifyPlaces } from "@/lib/geoapify/places";
import { geocodeLocation } from "@/lib/geoapify/geocode";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const destination = searchParams.get("destination");
  const latStr = searchParams.get("lat");
  const lngStr = searchParams.get("lng");
  const categories = searchParams.get("categories") || "tourism,catering,accommodation";
  const radius = Number(searchParams.get("radius")) || 10000;

  let lat = latStr ? parseFloat(latStr) : NaN;
  let lng = lngStr ? parseFloat(lngStr) : NaN;

  if (isNaN(lat) || isNaN(lng)) {
    if (!destination) {
      return NextResponse.json(
        { success: false, error: "Either destination string or lat/lng required" },
        { status: 400 }
      );
    }
    const geocoded = await geocodeLocation(destination);
    if (!geocoded) {
      return NextResponse.json(
        { success: false, error: `Could not geocode destination '${destination}'` },
        { status: 404 }
      );
    }
    lat = geocoded.latitude;
    lng = geocoded.longitude;
  }

  const places = await fetchGeoapifyPlaces(lat, lng, categories, radius);
  return NextResponse.json({
    success: true,
    count: places.length,
    data: places,
  });
}
