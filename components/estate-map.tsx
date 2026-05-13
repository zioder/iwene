"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface EstateMapProps {
  latitude: number;
  longitude: number;
  name: string;
}

export function EstateMap({ latitude, longitude, name }: EstateMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) return;

    const map = L.map(mapRef.current, {
      zoomControl: false,
      scrollWheelZoom: false,
    }).setView([latitude, longitude], 15);

    leafletMapRef.current = map;

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 20,
    }).addTo(map);

    L.control.zoom({ position: "topright" }).addTo(map);

    const goldIcon = L.divIcon({
      className: "custom-marker",
      html: `
        <div style="
          width: 40px;
          height: 40px;
          background: #C9A961;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(201, 169, 97, 0.5);
          border: 3px solid #FFFFFF;
        ">
          <div style="
            width: 12px;
            height: 12px;
            background: #FFFFFF;
            border-radius: 50%;
            transform: rotate(45deg);
          "></div>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
    });

    L.marker([latitude, longitude], { icon: goldIcon })
      .addTo(map)
      .bindPopup(`
        <div style="
          font-family: Inter, sans-serif;
          padding: 8px 12px;
          text-align: center;
        ">
          <strong style="color: #C9A961; font-size: 14px;">${name}</strong>
        </div>
      `);

    return () => {
      map.remove();
      leafletMapRef.current = null;
    };
  }, [latitude, longitude, name]);

  return (
    <div
      className="relative w-full h-full border border-border overflow-hidden"
      onMouseEnter={() => leafletMapRef.current?.scrollWheelZoom.enable()}
      onMouseLeave={() => leafletMapRef.current?.scrollWheelZoom.disable()}
    >
      <div ref={mapRef} className="w-full h-full" />
      <style jsx global>{`
        .leaflet-container {
          background: #F5F5F5;
        }
        .dark .leaflet-container {
          background: #1A1A1A;
        }
        .leaflet-popup-content-wrapper {
          background: var(--card);
          color: var(--foreground);
          border-radius: 0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          border: 1px solid var(--border);
        }
        .leaflet-popup-tip {
          background: var(--card);
          border: 1px solid var(--border);
        }
        .leaflet-popup-close-button {
          color: var(--muted-foreground);
        }
        .leaflet-control-zoom a {
          background: var(--card) !important;
          color: var(--foreground) !important;
          border: 1px solid var(--border) !important;
          border-radius: 0 !important;
        }
        .leaflet-control-zoom a:hover {
          background: var(--primary) !important;
          color: var(--primary-foreground) !important;
        }
        .leaflet-control-attribution {
          background: var(--card) !important;
          color: var(--muted-foreground) !important;
          font-size: 10px;
        }
        .leaflet-control-attribution a {
          color: var(--primary) !important;
        }
      `}</style>
    </div>
  );
}
