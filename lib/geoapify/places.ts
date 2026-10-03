import { GeoapifyPlaceItem } from "./types";

/**
 * Server-side Geoapify Places discovery function
 */
export async function fetchGeoapifyPlaces(
  lat: number,
  lng: number,
  categories: string = "tourism,catering,accommodation",
  radiusMeters: number = 10000,
  limit: number = 20
): Promise<GeoapifyPlaceItem[]> {
  const apiKey = process.env.GEOAPIFY_API_KEY || "e030f8285cf44ed5819e1757652cbbce";

  try {
    const filter = `circle:${lng},${lat},${radiusMeters}`;
    const url = `https://api.geoapify.com/v2/places?categories=${encodeURIComponent(
      categories
    )}&filter=${encodeURIComponent(filter)}&limit=${limit}&apiKey=${apiKey}`;

    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    if (data.features && Array.isArray(data.features)) {
      return data.features.map((feat: any, idx: number) => {
        const props = feat.properties || {};
        const coords = feat.geometry?.coordinates || [lng, lat];
        return {
          id: props.place_id || `place-geo-${idx}-${Date.now()}`,
          name: props.name || props.address_line1 || "Featured Location",
          category: props.categories?.[0] || "tourism",
          formattedAddress: props.formatted || props.address_line1 || "",
          latitude: coords[1],
          longitude: coords[0],
          distanceMeters: props.distance,
          city: props.city,
          country: props.country,
          openingHours: props.opening_hours,
          website: props.website,
        };
      });
    }
  } catch (error) {
    console.error("Geoapify places error:", error);
  }

  return [];
}
