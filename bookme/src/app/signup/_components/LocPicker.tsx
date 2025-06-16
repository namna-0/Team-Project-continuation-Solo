"use client";
import { useEffect, useRef, useState } from "react";

type LocationPickerProps = {
  onSelect: (result: { lat: number; lng: number; address: string }) => void;
};

export const LocPicker = ({ onSelect }: LocationPickerProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [geocoderError, setGeocoderError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const loadGoogleMapsScript = () => {
      if (window.google) {
        setIsScriptLoaded(true);
        return;
      }

      const existingScript = document.getElementById("google-maps-script");
      if (existingScript) {
        existingScript.addEventListener("load", () => setIsScriptLoaded(true));
        return;
      }

      const script = document.createElement("script");
      script.id = "google-maps-script";
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDlBLYHFfHDRdJ9b7B02Kg-x5VXSV6iIVA&libraries=places`;
      script.async = true;
      script.onload = () => setIsScriptLoaded(true);
      script.onerror = () => {
        setGeocoderError(
          "Google Maps скрипт ачаалж чадсангүй. Түлхүүрээ шалгана уу."
        );
      };
      document.head.appendChild(script);
    };

    loadGoogleMapsScript();
  }, []);

  useEffect(() => {
    if (!isScriptLoaded || !mapRef.current) return;

    try {
      const initialCenter = { lat: 47.9185, lng: 106.9176 };
      const mapInstance = new google.maps.Map(mapRef.current!, {
        center: initialCenter,
        zoom: 13,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
      });

      const markerInstance = new google.maps.Marker({
        position: initialCenter,
        map: mapInstance,
        draggable: true,
        title: "Байршил сонгох",
      });

      setMap(mapInstance);
      setMarker(markerInstance);

      // Маркер зөөх эвент
      markerInstance.addListener("dragend", () => {
        const position = markerInstance.getPosition();
        if (position) {
          updateAddress(position.lat(), position.lng());
        }
      });

      // Газрын зураг дээр дархад
      mapInstance.addListener("click", (e: google.maps.MapMouseEvent) => {
        const lat = e.latLng?.lat();
        const lng = e.latLng?.lng();
        if (lat && lng) {
          markerInstance.setPosition({ lat, lng });
          updateAddress(lat, lng);
        }
      });

      // Хаягийн хайлтын хайрцаг
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = "Хаягаа хайх...";
      input.style.marginTop = "10px";
      input.style.padding = "8px";
      input.style.width = "80%";
      input.style.borderRadius = "4px";
      input.style.border = "1px solid #ccc";

      const searchBox = new google.maps.places.SearchBox(input);
      mapInstance.controls[google.maps.ControlPosition.TOP_CENTER].push(input);

      // Хайлтын үр дүн
      searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();
        if (places?.length) {
          const place = places[0];
          const location = place.geometry?.location;
          if (location) {
            mapInstance.panTo(location);
            markerInstance.setPosition(location);
            updateAddress(location.lat(), location.lng());
          }
        }
      });

      // Анхны байршилд хаяг авах
      updateAddress(initialCenter.lat, initialCenter.lng);
    } catch (err) {
      setGeocoderError(`Газрын зураг эхлүүлэхэд алдаа гарлаа: ${err}`);
    }
  }, [isScriptLoaded]);

  const updateAddress = (lat: number, lng: number) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results?.[0]) {
        onSelect({
          lat,
          lng,
          address: results[0].formatted_address,
        });
        setGeocoderError(null);
      } else {
        setGeocoderError(`Хаяг олох боломжгүй (${status}). 
        Google Cloud Console дээр Geocoding API идэвхжүүлсэн эсэхийг шалгана уу.`);
      }
    });
  };

  return (
    <div>
      {geocoderError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong className="font-bold">Анхаар!</strong>
          <p className="block">{geocoderError}</p>
          <a
            href="https://console.cloud.google.com/apis/library/geocoding-backend.googleapis.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline mt-2 inline-block"
          >
            Geocoding API идэвхжүүлэх
          </a>
        </div>
      )}

      {!isScriptLoaded && !geocoderError && (
        <div className="h-96 bg-gray-100 flex items-center justify-center">
          <p className="text-gray-500">Газрын зураг ачаалж байна...</p>
        </div>
      )}

      <div
        ref={mapRef}
        style={{
          height: "400px",
          width: "100%",
          display: isScriptLoaded && !geocoderError ? "block" : "none",
        }}
      />
    </div>
  );
};

declare global {
  interface Window {
    google: any;
  }
}
