import React, { useState } from "react";
import {
  Home,
  Utensils,
  Landmark,
  Hotel,
  Layers,
  Search,
  X,
  Menu,
  Filter,
} from "lucide-react";
import type { PlaceCategory } from "../../types/map";

interface FiltersProps {
  activeCategory: PlaceCategory;
  onCategoryChange: (category: PlaceCategory) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const FilterButton: React.FC<{
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  compact?: boolean;
}> = ({ active, onClick, icon, label, compact = false }) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center gap-2 rounded-2xl transition-all shadow-lg font-semibold whitespace-nowrap border-2 shrink-0 ${
      compact ? "text-xs px-3 py-2" : "text-sm px-4 py-3"
    } ${
      active
        ? "bg-linear-to-r from-blue-600 to-blue-500 text-white border-blue-600 shadow-blue-200/50"
        : "bg-white/95 text-gray-700 border-white/80 hover:border-blue-100 hover:bg-gray-50"
    }`}
  >
    {icon}
    {!compact && <span>{label}</span>}
  </button>
);

const Filters: React.FC<FiltersProps> = ({
  activeCategory,
  onCategoryChange,
  searchQuery,
  setSearchQuery,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const categories = [
    { id: "all", icon: <Layers size={18} />, label: "All Places" },
    { id: "home", icon: <Home size={18} />, label: "Homes" },
    { id: "restaurant", icon: <Utensils size={18} />, label: "Restaurants" },
    { id: "tourist", icon: <Landmark size={18} />, label: "Tourist Spots" },
    { id: "hotel", icon: <Hotel size={18} />, label: "Hotels" },
  ] as const;

  return (
    <div className="absolute top-4 left-0 right-0 z-[1000] px-3 sm:px-4 pointer-events-none">
      {/* Main Container with width constraint */}
      <div className="w-full max-w-7xl mx-auto">
        {/* Mobile Top Bar */}
        <div className="sm:hidden flex items-center justify-between mb-2 pointer-events-auto bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl p-3 border border-white/80">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <Menu size={20} className="text-gray-700" />
            </button>
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <Search size={20} className="text-gray-700" />
            </button>
          </div>
          <div className="text-sm font-bold text-gray-800 truncate max-w-30">
            Cairo Map
          </div>
          <div className="w-10"></div> {/* Spacer */}
        </div>

        {/* Mobile Search Bar (Conditional) */}
        {showSearch && (
          <div className="sm:hidden mb-3 pointer-events-auto animate-slideDown">
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
                <Search size={18} />
              </div>
              <input
                type="text"
                className="w-full bg-white/95 backdrop-blur-xl pl-12 pr-10 py-3 rounded-2xl shadow-xl border-2 border-transparent focus:border-blue-400/50 focus:shadow-blue-200/30 outline-none transition-all text-gray-700 placeholder:text-gray-400 font-medium text-sm"
                placeholder="Search places..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                onClick={() => setShowSearch(false)}
                className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Desktop & Tablet Search Bar */}
        <div className="hidden sm:block mb-4 pointer-events-auto">
          <div className="relative group max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
              <Search size={18} />
            </div>
            <input
              type="text"
              className="w-full bg-white/95 backdrop-blur-xl pl-12 pr-4 py-3 rounded-2xl shadow-xl border-2 border-transparent focus:border-blue-400/50 focus:shadow-blue-200/30 outline-none transition-all text-gray-700 placeholder:text-gray-400 font-medium text-sm"
              placeholder="Search restaurants, hotels, tourist spots, or homes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Category Filter Row - Desktop/Tablet */}
        <div className="hidden sm:flex items-center justify-center pb-3 pointer-events-auto">
          <div className="flex items-center justify-center gap-2 overflow-x-auto px-2 py-1 no-scrollbar max-w-full">
            {categories.map((category) => (
              <FilterButton
                key={category.id}
                active={activeCategory === category.id}
                onClick={() => onCategoryChange(category.id as PlaceCategory)}
                icon={category.icon}
                label={category.label}
                compact={false}
              />
            ))}
          </div>
        </div>

        {/* Mobile Category Menu (Drawer) */}
        {isMobileMenuOpen && (
          <div className="sm:hidden mb-3 pointer-events-auto animate-slideDown">
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-4 border border-white/80">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Filter size={18} className="text-blue-600" />
                  <span className="font-bold text-gray-800">Filter by</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      onCategoryChange(category.id as PlaceCategory);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl transition-all ${
                      activeCategory === category.id
                        ? "bg-linear-to-br from-blue-600 to-blue-500 text-white"
                        : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg ${
                        activeCategory === category.id
                          ? "bg-white/20"
                          : "bg-white"
                      }`}
                    >
                      {React.cloneElement(category.icon as React.ReactElement)}
                    </div>
                    <span className="text-xs font-semibold">
                      {category.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Compact Mobile Category Bar */}
        <div className="sm:hidden flex items-center justify-between gap-1 pb-2 pointer-events-auto overflow-x-auto no-scrollbar">
          {categories.map((category) => (
            <FilterButton
              key={category.id}
              active={activeCategory === category.id}
              onClick={() => onCategoryChange(category.id as PlaceCategory)}
              icon={category.icon}
              label={category.label}
              compact={true}
            />
          ))}
        </div>

        {/* Active Filter Indicator */}
        {activeCategory !== "all" && (
          <div className="mt-2 sm:mt-3 text-center pointer-events-none">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50/80 backdrop-blur-sm rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
              <span className="text-xs font-semibold text-blue-700">
                Showing{" "}
                {activeCategory === "home" ? "homes" : activeCategory + "s"}{" "}
                only
              </span>
              <button
                onClick={() => onCategoryChange("all")}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 ml-1"
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filters;
