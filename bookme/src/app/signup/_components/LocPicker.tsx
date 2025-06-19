"use client";
import { useEffect, useRef, useState } from "react";

type LocationPickerProps = {
  initialLocation: { lat: number; lng: number };
  companyAddress?: string;
};

export const LocPickerCompany = ({
  initialLocation,
  companyAddress,
}: LocationPickerProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const loadGoogleMaps = () => {
      if (window.google) {
        initializeMap();
        return;
      }

      const scriptId = "google-maps-script";
      let script = document.getElementById(scriptId) as HTMLScriptElement;

      if (!script) {
        script = document.createElement("script");
        script.id = scriptId;
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDlBLYHFfHDRdJ9b7B02Kg-x5VXSV6iIVA&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => initializeMap();
        script.onerror = () => setError("Газрын зураг ачаалахад алдаа гарлаа");
        document.head.appendChild(script);
      } else if (window.google) {
        initializeMap();
      }
    };

    const initializeMap = () => {
      try {
        if (!mapRef.current || !window.google) return;

        const map = new window.google.maps.Map(mapRef.current, {
          center: initialLocation,
          zoom: 15,
          streetViewControl: true,
          mapTypeControl: true,
          fullscreenControl: true,
          zoomControl: true,
        });

        markerRef.current = new window.google.maps.Marker({
          position: initialLocation,
          map: map,
          title: companyAddress || "Компаний байршил",
          draggable: false,
          animation: window.google.maps.Animation.DROP,
        });

        markerRef.current?.addListener("click", () => {
          const marker = markerRef.current;
          if (!marker) return;

          const position = marker.getPosition();
          if (position) {
            map.setZoom(17);
            map.setCenter(position);
          }
        });

        setIsLoading(false);
      } catch (err) {
        setError("Газрын зураг эхлүүлэхэд алдаа гарлаа");
        console.error("Map initialization error:", err);
      }
    };

    loadGoogleMaps();

    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }
    };
  }, [initialLocation, companyAddress]);

  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden border border-gray-200 shadow-sm">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
          <p className="text-gray-500">Газрын зураг ачаалж байна...</p>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-50">
          <p className="text-red-600">{error}</p>
        </div>
      )}
      <div
        ref={mapRef}
        className="w-full h-full"
        style={{ display: isLoading || error ? "none" : "block" }}
      />
    </div>
  );
};
