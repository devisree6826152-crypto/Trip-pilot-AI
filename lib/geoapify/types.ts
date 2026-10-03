export interface GeoapifyGeocodeResult {
  latitude: number;
  longitude: number;
  formattedAddress: string;
  city?: string;
  country?: string;
  name?: string;
  category?: string;
  placeId?: string;
}

export interface GeoapifyPlaceItem {
  id: string;
  name: string;
  category: string;
  formattedAddress: string;
  latitude: number;
  longitude: number;
  distanceMeters?: number;
  city?: string;
  country?: string;
  openingHours?: string;
  website?: string;
}

export interface GeoapifyRouteSegment {
  distanceMeters: number;
  durationSeconds: number;
  mode: "drive" | "walk" | "bicycle" | "transit";
  geometry: [number, number][]; // Array of [lat, lng] coordinates
  steps?: {
    instruction: string;
    distanceMeters: number;
    durationSeconds: number;
  }[];
}

export interface GeoapifyRouteResponse {
  success: boolean;
  distanceKm: number;
  durationMins: number;
  geometry: [number, number][]; // Polyline points [lat, lng]
  mode: string;
  error?: string;
}
