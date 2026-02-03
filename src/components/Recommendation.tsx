import type { Hotel } from "@/types/hotel";
import { Card } from "@/components/ui/card";
import { Star, MapPin } from "lucide-react";

interface RecommendationProps {
  hotels: Hotel[];
  onViewAll?: () => void;
}

export default function Recommendation({
  hotels,
  onViewAll,
}: RecommendationProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Recommendation</h2>
        <button
          onClick={onViewAll}
          className="text-blue-600 hover:underline text-sm cursor-pointer"
        >
          View all
        </button>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
        {hotels.map((hotel) => (
          <Card
            key={hotel.id}
            className="min-w-70 max-w-70 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow snap-start"
          >
            <div className="relative">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold">
                {hotel.discount}% off
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{hotel.name}</h3>
              <div className="flex items-center gap-1 mb-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-gray-700">{hotel.rating}</span>
              </div>
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

