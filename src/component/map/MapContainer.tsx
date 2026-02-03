import React, { useEffect } from "react";
import {
  MapContainer as LeafletMap,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import type { Place, PlaceCategory } from "../../types/map";
import { Utensils, Hotel, Landmark, Home, MapPin } from "lucide-react";
import { renderToString } from "react-dom/server";

interface MapProps {
  places: Place[];
}

// Function to create custom marker icons
const createCustomIcon = (category: PlaceCategory) => {
  const getColors = (cat: PlaceCategory) => {
    switch (cat) {
      case "restaurant":
        return "bg-red-500";
      case "hotel":
        return "bg-blue-500";
      case "tourist":
        return "bg-purple-500";
      case "home":
        return "bg-emerald-500";
      default:
        return "bg-gray-500";
    }
  };

  const getIcon = (cat: PlaceCategory) => {
    switch (cat) {
      case "restaurant":
        return <Utensils size={16} />;
      case "hotel":
        return <Hotel size={16} />;
      case "tourist":
        return <Landmark size={16} />;
      case "home":
        return <Home size={16} />;
      default:
        return <MapPin size={16} />;
    }
  };

  const iconHTML = renderToString(
    <div
      className={`relative flex items-center justify-center w-10 h-10 ${getColors(
        category
      )} text-white rounded-full border-2 border-white shadow-xl transform transition-all hover:scale-110`}
    >
      {getIcon(category)}
      <div
        className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 ${getColors(
          category
        )} rotate-45 border-b border-r border-white`}
      ></div>
    </div>
  );

  return L.divIcon({
    html: iconHTML,
    className: "custom-div-icon",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });
};

const MapUpdater: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 13, { duration: 1.5 });
  }, [center, map]);
  return null;
};

const MapContainer: React.FC<MapProps> = ({ places }) => {
  const defaultCenter: [number, number] = [30.0444, 31.2357]; // Cairo, Egypt
  return (
    <LeafletMap
      center={defaultCenter}
      zoom={13}
      zoomControl={false}
      className="w-full h-full"
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />

      {places.map((place) => (
        <Marker
          key={place.id}
          position={[place.lat, place.lng]}
          icon={createCustomIcon(place.category)}
        >
          <Popup className="custom-popup">
            <div className="p-1 min-w-[200px]">
              {place.image && (
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-24 object-cover rounded-lg mb-2"
                />
              )}
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold text-gray-900 text-sm">
                  {place.name}
                </h3>
                {place.rating && (
                  <div className="flex items-center text-xs font-semibold bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded">
                    ⭐ {place.rating}
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mb-2">{place.address}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs font-bold text-blue-600">
                  {place.priceLevel || "Free Entry"}
                </span>
                <button className="bg-blue-600 text-white px-3 py-1 rounded-md text-[10px] font-bold hover:bg-blue-700 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Manual zoom controls in a nicer position */}
      <div className="absolute bottom-10 right-10 flex flex-col gap-2 z-[500]">
        <button
          onClick={(e) => {
            e.stopPropagation();
            const mapElement = document.querySelector(
              ".leaflet-container"
            ) as any;
            if (mapElement && mapElement._leaflet_id) {
              const map = (window as any).L.DomUtil.get(mapElement)._map;
              if (map) map.zoomIn();
            }
          }}
          className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl flex items-center justify-center text-gray-700 hover:text-blue-600 transition-all font-bold text-xl"
        >
          +
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            const mapElement = document.querySelector(
              ".leaflet-container"
            ) as any;
            if (mapElement && mapElement._leaflet_id) {
              const map = (window as any).L.DomUtil.get(mapElement)._map;
              if (map) map.zoomOut();
            }
          }}
          className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl flex items-center justify-center text-gray-700 hover:text-blue-600 transition-all font-bold text-xl"
        >
          -
        </button>
      </div>
    </LeafletMap>
  );
};

export default MapContainer;
