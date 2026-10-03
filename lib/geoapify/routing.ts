import { GeoapifyRouteResponse } from "./types";

/**
 * Server-side Geoapify Routing calculation function
 */
export async function calculateGeoapifyRoute(
  waypoints: [number, number][], // [[lat, lng], [lat, lng], ...]
  mode: "drive" | "walk" | "bicycle" | "transit" = "drive"
): Promise<GeoapifyRouteResponse> {
  if (!waypoints || waypoints.length < 2) {
    return {
      success: false,
      distanceKm: 0,
      durationMins: 0,
      geometry: [],
      mode,
      error: "At least two waypoints required for routing.",
    };
  }

  const apiKey = process.env.GEOAPIFY_API_KEY || "e030f8285cf44ed5819e1757652cbbce";

  // Geoapify expects waypoints as `lat,lng|lat,lng`
  const waypointsString = waypoints.map((pt) => `${pt[0]},${pt[1]}`).join("|");
  const geoapifyMode = mode === "walk" ? "walk" : mode === "bicycle" ? "bicycle" : "drive";

  try {
    const url = `https://api.geoapify.com/v1/routing?waypoints=${waypointsString}&mode=${geoapifyMode}&apiKey=${apiKey}`;

    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return {
        success: false,
        distanceKm: 0,
        durationMins: 0,
        geometry: waypoints,
        mode,
        error: `Geoapify Routing API returned status ${response.status}`,
      };
    }

    const data = await response.json();
    if (data.features && data.features.length > 0) {
      const feat = data.features[0];
      const props = feat.properties || {};
      const distanceMeters = props.distance || 0;
      const durationSeconds = props.time || 0;

      // Extract geometry polyline
      const coordinates = feat.geometry?.coordinates || [];
      // Geoapify returns [[lng, lat], ...] or multi-linestring coordinates; flatten if needed
      let polylinePoints: [number, number][] = [];

      if (Array.isArray(coordinates[0]) && typeof coordinates[0][0] === "number") {
        // LineString format [[lng, lat], [lng, lat]]
        polylinePoints = coordinates.map((c: number[]) => [c[1], c[0]]);
      } else if (Array.isArray(coordinates[0]) && Array.isArray(coordinates[0][0])) {
        // MultiLineString format [[[lng, lat], ...]]
        polylinePoints = coordinates.flatMap((line: number[][]) =>
          line.map((c: number[]) => [c[1], c[0]])
        );
      } else {
        polylinePoints = waypoints;
      }

      return {
        success: true,
        distanceKm: Number((distanceMeters / 1000).toFixed(1)),
        durationMins: Math.round(durationSeconds / 60),
        geometry: polylinePoints,
        mode,
      };
    }
  } catch (error) {
    console.error("Geoapify routing error:", error);
  }

  return {
    success: false,
    distanceKm: 0,
    durationMins: 0,
    geometry: waypoints,
    mode,
    error: "Routing calculation failed.",
  };
}
