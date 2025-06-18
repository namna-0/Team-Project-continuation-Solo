"use client";
import { useEffect, useRef, useState } from "react";
import { MapPin, Search, Loader2 } from "lucide-react";

type LocationPickerProps = {
  onSelect: (result: { lat: number; lng: number; address: string }) => void;
  initialLocation?: { lat: number; lng: number; address: string };
};

declare global {
  interface Window {
    initMap: () => void;
    google: any;
  }
}

export const LocPickerCompany = ({
  onSelect,
  initialLocation,
}: LocationPickerProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
    address: string;
  } | null>(initialLocation || null);

  useEffect(() => {
    if (!mapRef.current) return;

    const initMap = () => {
      const defaultCenter = { lat: 47.9185, lng: 106.9176 };
      const initialCenter = initialLocation
        ? { lat: initialLocation.lat, lng: initialLocation.lng }
        : defaultCenter;

      const map = new window.google.maps.Map(mapRef.current!, {
        center: initialCenter,
        zoom: initialLocation ? 15 : 13,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      });

      let marker: any = null;

      if (initialLocation) {
        marker = new window.google.maps.Marker({
          position: { lat: initialLocation.lat, lng: initialLocation.lng },
          map,
          draggable: true,
          animation: window.google.maps.Animation.DROP,
          icon: {
            url:
              "data:image/svg+xml," +
              encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ef4444" width="32" height="32">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(32, 32),
            anchor: new window.google.maps.Point(16, 32),
          },
        });

        marker.addListener("dragend", () => {
          const position = marker.getPosition();
          if (position) {
            handleLocationSelect(position.lat(), position.lng(), map);
          }
        });
      }

      if (searchRef.current) {
        const searchBox = new window.google.maps.places.SearchBox(
          searchRef.current
        );

        map.addListener("bounds_changed", () => {
          searchBox.setBounds(map.getBounds()!);
        });

        searchBox.addListener("places_changed", () => {
          const places = searchBox.getPlaces();
          if (places && places.length > 0) {
            const place = places[0];
            if (place.geometry && place.geometry.location) {
              map.setCenter(place.geometry.location);
              map.setZoom(15);

              const lat = place.geometry.location.lat();
              const lng = place.geometry.location.lng();
              handleLocationSelect(lat, lng, map);
            }
          }
        });
      }

      map.addListener("click", async (e: any) => {
        const lat = e.latLng?.lat();
        const lng = e.latLng?.lng();

        if (lat && lng) {
          handleLocationSelect(lat, lng, map);
        }
      });

      const handleLocationSelect = async (
        lat: number,
        lng: number,
        mapInstance: any
      ) => {
        setIsLoading(true);

        try {
          const coords = { lat, lng };

          if (marker) {
            marker.setMap(null);
          }

          marker = new window.google.maps.Marker({
            position: coords,
            map: mapInstance,
            draggable: true,
            animation: window.google.maps.Animation.DROP,
            icon: {
              url:
                "data:image/svg+xml," +
                encodeURIComponent(`
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ef4444" width="32" height="32">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              `),
              scaledSize: new window.google.maps.Size(32, 32),
              anchor: new window.google.maps.Point(16, 32),
            },
          });

          marker.addListener("dragend", () => {
            const position = marker.getPosition();
            if (position) {
              handleLocationSelect(position.lat(), position.lng(), mapInstance);
            }
          });

          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode(
            { location: coords },
            (results: any, status: any) => {
              setIsLoading(false);

              if (status === "OK" && results && results[0]) {
                const address = results[0].formatted_address;
                const locationData = { lat, lng, address };

                setSelectedLocation(locationData);
                onSelect(locationData);
              } else {
                console.error("Geocoder failed:", status);
                const locationData = {
                  lat,
                  lng,
                  address: `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
                };

                setSelectedLocation(locationData);
                onSelect(locationData);
              }
            }
          );
        } catch (error) {
          setIsLoading(false);
          console.error("Location selection error:", error);
        }
      };
    };

    if (window.google && window.google.maps) {
      initMap();
    } else {
      const existingScript = document.getElementById("google-maps-script");

      if (!existingScript) {
        const script = document.createElement("script");
        script.id = "google-maps-script";
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDlBLYHFfHDRdJ9b7B02Kg-x5VXSV6iIVA&callback=initMap&libraries=places`;
        script.async = true;

        window.initMap = initMap;
        script.onload = () => {
          if (window.google) {
            initMap();
          }
        };

        document.head.appendChild(script);
      } else {
        window.initMap = initMap;
        if (window.google) {
          initMap();
        }
      }
    }

    return () => {
      window.initMap = () => {};
    };
  }, [onSelect, initialLocation]);

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          ref={searchRef}
          type="text"
          placeholder="Хаяг хайх..."
          className="w-full pl-10 pr-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
        />
      </div>
      <div className="relative">
        <div
          ref={mapRef}
          className="w-full h-80 rounded-lg border border-white/30 overflow-hidden"
        />
        {isLoading && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center rounded-lg">
            <div className="bg-white rounded-lg p-3 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
              <span className="text-sm text-gray-700">
                Хаяг тодорхойлж байна...
              </span>
            </div>
          </div>
        )}
      </div>

      {selectedLocation && (
        <div className="bg-white/10 rounded-lg p-3 border border-white/20">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-white/90 font-medium">
                Сонгосон байршил:
              </p>
              <p className="text-xs text-white/70 mt-1">
                {selectedLocation.address}
              </p>
              <p className="text-xs text-white/50 mt-1">
                {selectedLocation.lat.toFixed(6)},{" "}
                {selectedLocation.lng.toFixed(6)}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-blue-500/20 rounded-lg p-3 border border-blue-400/30">
        <h4 className="text-sm font-medium text-blue-200 mb-2">Заавар:</h4>
        <ul className="text-xs text-blue-100/80 space-y-1">
          <li>• Дээрх хайлтын талбараар хаяг хайж болно</li>
          <li>• Газрын зураг дээр дарж байршил сонгоно уу</li>
          <li>• Маркерийг чирж байршлаа тохируулна уу</li>
          <li>• Улаан маркер таны сонгосон байршлыг харуулна</li>
        </ul>
      </div>
    </div>
  );
};
