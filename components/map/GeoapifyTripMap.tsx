"use client";

import React, { useEffect, useRef, useState } from "react";
import { GeoapifyGeocodeResult, GeoapifyRouteResponse } from "@/lib/geoapify/types";
import { Loader2, AlertCircle, MapPin, Navigation, Compass, RefreshCw, Eye } from "lucide-react";

export interface MapMarkerItem {
  id: string;
  title: string;
  subtitle?: string;
  category: "Origin" | "Destination" | "Hotel" | "Restaurant" | "Activity" | "Attraction";
  lat: number;
  lng: number;
  address?: string;
  cost?: number;
  rating?: number;
  details?: string;
}

interface GeoapifyTripMapProps {
  markers: MapMarkerItem[];
  selectedMarkerId?: string | null;
  routeGeometry?: [number, number][]; // Array of [lat, lng]
  centerLat?: number;
  centerLng?: number;
  zoomLevel?: number;
  onMarkerSelect?: (marker: MapMarkerItem) => void;
  onCalculateDirections?: (fromMarker: MapMarkerItem, toMarker: MapMarkerItem) => void;
  heightClass?: string;
  isLoading?: boolean;
}

export function GeoapifyTripMap({
  markers,
  selectedMarkerId,
  routeGeometry,
  centerLat = 15.4989,
  centerLng = 73.8278,
  zoomLevel = 12,
  onMarkerSelect,
  onCalculateDirections,
  heightClass = "h-[450px]",
  isLoading = false,
}: GeoapifyTripMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<Record<string, any>>({});
  const routePolylineRef = useRef<any>(null);

  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  // Initialize Leaflet Map dynamically
  useEffect(() => {
    if (typeof window === "undefined" || !mapContainerRef.current) return;

    let isMounted = true;

    async function initMap() {
      try {
        // Dynamically import Leaflet client-side only
        const L = (await import("leaflet")).default;

        if (!isMounted || !mapContainerRef.current) return;

        // Fix Leaflet default marker icons path in Next.js
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
          shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        });

        // Destroy prior map instance if re-initializing
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }

        const initialLat = markers.length > 0 ? markers[0].lat : centerLat;
        const initialLng = markers.length > 0 ? markers[0].lng : centerLng;

        const map = L.map(mapContainerRef.current, {
          center: [initialLat, initialLng],
          zoom: zoomLevel,
          zoomControl: true,
        });

        // OpenStreetMap / Geoapify tile layer fallback
        const apiKey = process.env.GEOAPIFY_API_KEY || "e030f8285cf44ed5819e1757652cbbce";
        const tileUrl = `https://maps.geoapify.com/v1/tile/klokantech-basic/{z}/{x}/{y}.png?apiKey=${apiKey}`;

        L.tileLayer(tileUrl, {
          attribution:
            '&copy; <a href="https://www.geoapify.com/">Geoapify</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          maxZoom: 19,
        }).addTo(map);

        mapInstanceRef.current = map;
        setMapLoaded(true);
      } catch (err: any) {
        console.error("Leaflet map loading error:", err);
        if (isMounted) {
          setMapError("Failed to load map tile engine. Check connection.");
        }
      }
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Markers & Fit Bounds
  useEffect(() => {
    if (!mapLoaded || !mapInstanceRef.current) return;

    async function updateMapElements() {
      const L = (await import("leaflet")).default;
      const map = mapInstanceRef.current;

      // Clear old markers
      Object.values(markersRef.current).forEach((m: any) => m.remove());
      markersRef.current = {};

      if (markers.length === 0) return;

      const bounds = L.latLngBounds([]);

      markers.forEach((item) => {
        if (!item.lat || !item.lng) return;

        bounds.extend([item.lat, item.lng]);

        // Category-specific color badge
        const color =
          item.category === "Origin"
            ? "#0284c7"
            : item.category === "Destination"
            ? "#10b981"
            : item.category === "Hotel"
            ? "#0d9488"
            : item.category === "Restaurant"
            ? "#d97706"
            : "#8b5cf6";

        // Create Custom HTML DivIcon Marker
        const customIcon = L.divIcon({
          className: "custom-map-pin",
          html: `<div style="background-color: ${color}; width: 28px; height: 28px; border-radius: 9999px; border: 2px solid white; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 11px; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
            ${
              item.category === "Origin"
                ? "📍"
                : item.category === "Destination"
                ? "🏁"
                : item.category === "Hotel"
                ? "🏨"
                : item.category === "Restaurant"
                ? "🍛"
                : "🏛️"
            }
          </div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });

        const marker = L.marker([item.lat, item.lng], { icon: customIcon }).addTo(map);

        const popupContent = `
          <div style="font-family: inherit; font-size: 12px; padding: 4px; min-width: 160px;">
            <div style="font-weight: 800; font-size: 13px; color: #0f172a;">${item.title}</div>
            <div style="color: #64748b; font-size: 11px; margin-top: 2px;">${item.category} · ${item.address || ""}</div>
            ${item.cost ? `<div style="color: #059669; font-weight: 800; margin-top: 4px;">Est. Cost: ₹${item.cost.toLocaleString()}</div>` : ""}
            ${item.details ? `<div style="color: #475569; font-size: 11px; margin-top: 4px;">${item.details}</div>` : ""}
          </div>
        `;

        marker.bindPopup(popupContent);
        marker.on("click", () => {
          if (onMarkerSelect) onMarkerSelect(item);
        });

        markersRef.current[item.id] = marker;
      });

      // Fit Map to all markers bounds
      if (markers.length > 1) {
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
      } else if (markers.length === 1) {
        map.setView([markers[0].lat, markers[0].lng], 13);
      }
    }

    updateMapElements();
  }, [mapLoaded, markers]);

  // Focus Selected Marker
  useEffect(() => {
    if (!mapLoaded || !mapInstanceRef.current || !selectedMarkerId) return;
    const targetMarker = markersRef.current[selectedMarkerId];
    if (targetMarker) {
      const latLng = targetMarker.getLatLng();
      mapInstanceRef.current.setView(latLng, 14, { animate: true });
      targetMarker.openPopup();
    }
  }, [mapLoaded, selectedMarkerId]);

  // Draw Route Polyline
  useEffect(() => {
    if (!mapLoaded || !mapInstanceRef.current) return;

    async function drawPolyline() {
      const L = (await import("leaflet")).default;
      const map = mapInstanceRef.current;

      if (routePolylineRef.current) {
        routePolylineRef.current.remove();
        routePolylineRef.current = null;
      }

      if (routeGeometry && routeGeometry.length > 1) {
        const polyline = L.polyline(routeGeometry, {
          color: "#0ea5e9",
          weight: 5,
          opacity: 0.85,
          dashArray: "10, 6",
        }).addTo(map);

        routePolylineRef.current = polyline;
        map.fitBounds(polyline.getBounds(), { padding: [50, 50] });
      }
    }

    drawPolyline();
  }, [mapLoaded, routeGeometry]);

  return (
    <div className={`relative w-full rounded-3xl overflow-hidden border border-border shadow-md bg-slate-950 ${heightClass}`}>
      {/* Map Element Container */}
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Loading Overlay */}
      {(isLoading || !mapLoaded) && !mapError && (
        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center gap-3 text-white">
          <Loader2 className="w-8 h-8 text-sky-400 animate-spin" />
          <span className="text-xs font-extrabold tracking-wide">
            {isLoading ? "Calculating Geoapify Route..." : "Loading Geoapify GIS Engine..."}
          </span>
        </div>
      )}

      {/* Error Fallback Notice */}
      {mapError && (
        <div className="absolute inset-0 bg-slate-900 z-20 flex flex-col items-center justify-center p-6 text-center text-rose-300 space-y-3">
          <AlertCircle className="w-8 h-8 text-rose-500" />
          <span className="text-xs font-bold">{mapError}</span>
          <p className="text-[11px] text-slate-400 max-w-sm">
            Interactive tiles fallback mode active. Geocoding and routing calculations continue to function via server API.
          </p>
        </div>
      )}

      {/* Map Control Buttons Badge Overlay */}
      {mapLoaded && (
        <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
          <span className="px-3 py-1 rounded-xl bg-slate-900/90 text-sky-300 border border-slate-700 text-[11px] font-extrabold shadow-md flex items-center gap-1.5 backdrop-blur-md">
            <Compass className="w-3.5 h-3.5 text-sky-400" />
            <span>Geoapify GIS Engine</span>
          </span>
        </div>
      )}
    </div>
  );
}
