import { GeoapifyGeocodeResult } from "./types";

// In-memory cache for repeated geocoding queries during session
const geocodeCache = new Map<string, GeoapifyGeocodeResult | null>();

/**
 * Server-side Geoapify Geocoding function
 */
export async function geocodeLocation(query: string): Promise<GeoapifyGeocodeResult | null> {
  if (!query || !query.trim()) return null;

  const normalizedQuery = query.trim().toLowerCase();
  if (geocodeCache.has(normalizedQuery)) {
    return geocodeCache.get(normalizedQuery)!;
  }

  const apiKey = process.env.GEOAPIFY_API_KEY || "e030f8285cf44ed5819e1757652cbbce";
  
  try {
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
      query
    )}&limit=1&apiKey=${apiKey}`;

    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate: 86400 }, // Cache response for 24h
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    if (data.features && data.features.length > 0) {
      const feat = data.features[0];
      const props = feat.properties || {};
      const coords = feat.geometry?.coordinates || [];

      const result: GeoapifyGeocodeResult = {
        latitude: coords[1] ?? props.lat,
        longitude: coords[0] ?? props.lon,
        formattedAddress: props.formatted || props.address_line1 || query,
        city: props.city || props.county || props.state,
        country: props.country,
        name: props.name || props.address_line1,
        category: props.category,
        placeId: props.place_id,
      };

      geocodeCache.set(normalizedQuery, result);
      return result;
    }
  } catch (error) {
    console.error("Geoapify geocoding error:", error);
  }

  return null;
}
