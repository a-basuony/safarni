import { useState, useMemo, useRef } from "react";
import { ArrowLeft, Search } from "lucide-react";
import Recommendation from "@/components/Recommendation";
import Nearby from "@/components/Nearby";
import Available from "@/components/Available";
import {
  recommendationHotels,
  nearbyHotels,
  availableRooms,
} from "@/constants/demoData";

export default function HotelBooking() {
  const [searchQuery, setSearchQuery] = useState("");
  const recommendationRef = useRef<HTMLDivElement>(null);
  const nearbyRef = useRef<HTMLDivElement>(null);
  const availableRef = useRef<HTMLDivElement>(null);

  // Filter hotels and rooms based on search query
  const filteredRecommendations = useMemo(() => {
    if (!searchQuery.trim()) return recommendationHotels;
    return recommendationHotels.filter((hotel) =>
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  const filteredNearby = useMemo(() => {
    if (!searchQuery.trim()) return nearbyHotels;
    return nearbyHotels.filter((hotel) =>
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  const filteredRooms = useMemo(() => {
    if (!searchQuery.trim()) return availableRooms;
    return availableRooms.filter((room) =>
      room.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Bar */}
        <div className="flex items-center gap-4 mb-6">
          <button className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Components */}
        <div ref={recommendationRef}>
          <Recommendation
            hotels={filteredRecommendations}
            onViewAll={() => scrollToSection(recommendationRef)}
          />
        </div>
        <div ref={nearbyRef}>
          <Nearby
            hotels={filteredNearby}
            onViewAll={() => scrollToSection(nearbyRef)}
          />
        </div>
        <div ref={availableRef}>
          <Available
            rooms={filteredRooms}
            onViewAll={() => scrollToSection(availableRef)}
          />
        </div>
      </div>
    </div>
  );
}
