import React, { useState, useMemo } from "react";
import Filters from "./Filters";
import MapContainer from "./MapContainer";
import { MOCK_PLACES } from "@/constants/mockData";
import type { PlaceCategory } from "../../types/map";

const Map: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<PlaceCategory>("all");

  const filteredPlaces = useMemo(() => {
    return MOCK_PLACES.filter((place) => {
      const matchesSearch =
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.address?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === "all" || place.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="relative w-full h-screen bg-gray-50">
      {/* Filters Overlay */}
      <Filters
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Map Background */}
      <main className="w-full h-full">
        <MapContainer places={filteredPlaces} />
      </main>

      {/* Floating Info (Optional) */}
      <div className="fixed bottom-6 left-6 z-[500] pointer-events-none">
        <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-gray-100 pointer-events-auto max-w-[280px]">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <h4 className="text-xs font-bold text-gray-800 uppercase tracking-tight">
              Active Coverage
            </h4>
          </div>
          <p className="text-sm text-gray-600 font-medium leading-relaxed">
            Currently showing{" "}
            <span className="text-blue-600 font-bold">
              {filteredPlaces.length}
            </span>{" "}
            curated places in Paris.
          </p>
          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
            <span className="text-[10px] text-gray-400 font-semibold">
              UPDATED 2M AGO
            </span>
            <button className="text-[10px] font-bold text-blue-600 hover:underline">
              REFRESH
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
