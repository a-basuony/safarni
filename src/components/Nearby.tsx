import type { Hotel } from "@/types/hotel";
import { Card } from "@/components/ui/card";
import { Star, MapPin } from "lucide-react";

interface NearbyProps {
  hotels: Hotel[];
  onViewAll?: () => void;
}

export default function Nearby({ hotels, onViewAll }: NearbyProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Nearby Hotel</h2>
        <button
          onClick={onViewAll}
          className="text-blue-600 hover:underline text-sm cursor-pointer"
        >
          View all
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hotels.map((hotel) => (
          <Card
            key={hotel.id}
            className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow flex"
          >
            <div className="relative w-32 h-32 shrink-0">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 flex-1 relative">
              <div className="absolute top-4 right-4 flex flex-col items-end gap-1">
                <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold">
                  {hotel.discount}% off
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-gray-700">{hotel.rating}</span>
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2 pr-20">{hotel.name}</h3>
              <div className="flex items-center gap-1 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{hotel.location}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

