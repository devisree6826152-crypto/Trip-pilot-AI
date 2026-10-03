import { NextRequest, NextResponse } from "next/server";
import { calculateGeoapifyRoute } from "@/lib/geoapify/routing";
import { geocodeLocation } from "@/lib/geoapify/geocode";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { origin, destination, waypoints, mode = "drive" } = body;

    let points: [number, number][] = [];

    if (Array.isArray(waypoints) && waypoints.length >= 2) {
      points = waypoints;
    } else if (origin && destination) {
      let originCoords: [number, number] | null = null;
      let destCoords: [number, number] | null = null;

      if (typeof origin === "string") {
        const geoOrigin = await geocodeLocation(origin);
        if (geoOrigin) originCoords = [geoOrigin.latitude, geoOrigin.longitude];
      } else if (Array.isArray(origin) && origin.length === 2) {
        originCoords = origin as [number, number];
      }

      if (typeof destination === "string") {
        const geoDest = await geocodeLocation(destination);
        if (geoDest) destCoords = [geoDest.latitude, geoDest.longitude];
      } else if (Array.isArray(destination) && destination.length === 2) {
        destCoords = destination as [number, number];
      }

      if (originCoords && destCoords) {
        points = [originCoords, destCoords];
      }
    }

    if (points.length < 2) {
      return NextResponse.json(
        { success: false, error: "Unable to resolve valid origin and destination coordinates." },
        { status: 400 }
      );
    }

    const routeData = await calculateGeoapifyRoute(points, mode);
    return NextResponse.json(routeData);
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Failed to process routing calculation." },
      { status: 500 }
    );
  }
}
