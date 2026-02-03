import { ChevronLeftIcon, Search } from "lucide-react";
import { useState } from "react";
import  TourCard from "@/component/cards/FavoriteCard";

const InternalTourPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const tours = [
    {
      id: 1,
      title: "Paris Evening Cruise",
      price: "$75",
      duration: "3 hours",
      highlights: "Boat Tour",
      availability: "Available",
      guide: "Local guide",
      transportation: "Boat",
      image:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop",
    },
    {
      id: 2,
      title: "Louvre Museum Tour",
      price: "$65",
      duration: "4 hours",
      highlights: "Museum Tour",
      availability: "Available",
      guide: "Art Historian",
      transportation: "Walking",
      image:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
    },
    {
      id: 3,
      title: "Eiffel Tower Summit",
      price: "$90",
      duration: "2.5 hours",
      highlights: "Landmark",
      availability: "Limited",
      guide: "Local Expert",
      transportation: "Walking",
      image:
        "https://images.unsplash.com/photo-1431274177511-4e4126a1e6b0?w=800&h=600&fit=crop",
    },
    {
      id: 4,
      title: "Montmartre Walking Tour",
      price: "$45",
      duration: "3 hours",
      highlights: "Walking Tour",
      availability: "Available",
      guide: "Local Artist",
      transportation: "Walking",
      image:
        "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&h=600&fit=crop",
    },
    {
      id: 5,
      title: "Versailles Palace",
      price: "$110",
      duration: "6 hours",
      highlights: "Palace Tour",
      availability: "Available",
      guide: "History Expert",
      transportation: "Bus",
      image:
        "https://images.unsplash.com/photo-1587330289769-81dab733e1f5?w=800&h=600&fit=crop",
    },
    {
      id: 6,
      title: "Seine River Dinner Cruise",
      price: "$120",
      duration: "3 hours",
      highlights: "Dinner Cruise",
      availability: "Limited",
      guide: "Local Guide",
      transportation: "Boat",
      image:
        "https://images.unsplash.com/photo-1549310786-4e2101efdf6c?w=800&h=600&fit=crop",
    },
  ];

  // Filter tours based on search query
  const filteredTours = tours.filter((tour) =>
    tour.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Search Section */}
      <div className="max-w-7xl mx-auto mb-8 flex items-center gap-3">
        <button className="bg-gray-200 w-12 h-12 cursor-pointer rounded-full flex justify-center items-center hover:bg-gray-300 transition-colors">
          <ChevronLeftIcon />
        </button>
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search tours to compare..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Tours Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTours.map((tour) => (
          <TourCard
            key={tour.id}
            title={tour.title}
            image={tour.image}
            rating={4.5} // Default rating
            type={tour.highlights}
            price={parseInt(tour.price.replace("$", ""))}
            className="h-full"
          />
        ))}
      </div>
    </div>
  );
};

export default InternalTourPage;
