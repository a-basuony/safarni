import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
// Fix for default markers in React Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Types
interface Position {
  lat: number;
  lng: number;
}

// Custom marker icons
const userIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const carIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM0MGJmNmEiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1tYXAtcGluLWljb24gbHVjaWRlLW1hcC1waW4iPjxwYXRoIGQ9Ik0yMCAxMGMwIDQuOTkzLTUuNTM5IDEwLjE5My03LjM5OSAxMS43OTlhMSAxIDAgMCAxLTEuMjAyIDBDOS41MzkgMjAuMTkzIDQgMTQuOTkzIDQgMTBhOCA4IDAgMCAxIDE2IDAiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEwIiByPSIzIi8+PC9zdmc+',
  iconRetinaUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [40, 40],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  className: ' c-green-600 bg-white opacity-75 rounded-full  p-1',
});

const CarsMap: React.FC = () => {
  // State
  const [userPosition, setUserPosition] = useState<Position | null>(null);
  const [route, setRoute] = useState<[number, number][]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          // Default to London if location access is denied
          setUserPosition({ lat: 51.505, lng: -0.09 });
        }
      );
    } else {
      setUserPosition({ lat: 51.505, lng: -0.09 });
    }
  }, []);

  // Function to calculate route using OSRM API
  const calculateRoute = async (start: Position, end: Position) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`
      );
      
      
      if (response.data.routes && response.data.routes[0]) {
        const coordinates = response.data.routes[0].geometry.coordinates;
        // Convert [lng, lat] to [lat, lng] for Leaflet
        const formattedRoute = coordinates.map((coord: [number, number]) => [coord[1], coord[0]]);
        setRoute(formattedRoute);
      }
    } catch (error) {
      console.error('Error calculating route:', error);
      // Fallback: create a straight line if API fails
      setRoute([
        [start.lat, start.lng],
        [end.lat, end.lng]
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle car order
  const handleOrderCar = () => {
    if (userPosition) {
      calculateRoute(userPosition, { lat: 31.182894, lng: 30.206284 });
    }
  };

  // Center position for map
  const mapCenter: Position = userPosition || { lat: 51.505, lng: -0.09 };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        
          {/* Map */}
          <div className="w-full">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-[90vh] relative">
                {userPosition ? (
                  <MapContainer
                    center={[mapCenter.lat, mapCenter.lng]}
                    zoom={13}
                    className="h-full w-full"
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    
                    {/* User Position Marker */}
                    <Marker position={[userPosition.lat, userPosition.lng]} icon={userIcon}>
                      <Popup>
                        <div className="font-medium">Your Position</div>
                        <div className="text-sm">
                          Lat: {userPosition.lat.toFixed(6)}<br />
                          Lng: {userPosition.lng.toFixed(6)}
                        </div>
                      </Popup>
                    </Marker>

                    {/* Car Markers */}
                    (31.182894, 30.206284)
                      <Marker
                        position={[31.182894, 30.206284]}
                        icon={carIcon}
                      >
                        <Popup>
                          <div className="font-medium">{"car name"}</div>
                          <div className="text-sm">
                            Position: {31.182894.toFixed(4)}, {30.206284.toFixed(4)}
                          </div>
                          <button
                            className="mt-2 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                            onClick={() => handleOrderCar()}
                          >
                            Order This Car
                          </button>
                        </Popup>
                      </Marker>
        

                    {/* Route Polyline */}
                    {route.length > 0 && (
                      <Polyline
                        pathOptions={{ color: 'blue', weight: 4, opacity: 0.7 }}
                        positions={route}
                      />
                    )}
                  </MapContainer>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">Loading map...</p>
                  </div>
                )}

                {isLoading && (
                  <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-lg shadow-md">
                    <p className="text-gray-600 flex items-center">
                      <svg className="animate-spin h-4 w-4 mr-2 text-blue-600" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Calculating route...
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default CarsMap;