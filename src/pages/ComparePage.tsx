import { useState } from "react";
import { Search, Check, ChevronLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { compareTours, tours } from "@/constants";

const ComparePage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Search Section */}
      <div className="max-w-7xl mx-auto mb-8 flex items-center gap-3">
        <span className=" bg-gray-200 w-12 h-12 cursor-pointer rounded-full flex justify-center items-center">
          <ChevronLeftIcon />
        </span>
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

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto  gap-8">
        {/* Left Side - Two Small Cards */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Select Tours
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tours.map((tour) => (
              <div
                key={tour.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="flex h-48">
                  {/* Image on left */}
                  <div className="w-2/5 shrink-0 flex justify-center items-center">
                    <img
                      src={tour.image}
                      alt={tour.title}
                      className="w-[95%] h-[90%] object-cover rounded-lg"
                    />
                  </div>
                  {/* Content beside image */}
                  <div className="w-3/5 p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {tour.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {tour.time} | {tour.price}
                      </p>
                      <p className="text-sm text-gray-500">
                        {tour.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Side - Detailed Comparison Card */}
        <div className="mt-5">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Compare</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5  ">
            {compareTours.map((tour) => (
              <div
                key={tour.id}
                className="bg-white rounded-lg shadow-lg p-6 w-full border border-white hover:border-blue-400 transition-colors duration-300 "
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {tour.title}
                </h3>
                <div className="text-3xl font-bold text-blue-600 mb-6">
                  {tour.price}
                  <span className="text-lg text-gray-600">/person</span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-gray-700">
                        Duration:{" "}
                      </span>
                      <span className="text-gray-600">{tour.duration}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-gray-700">
                        Highlights:{" "}
                      </span>
                      <span className="text-gray-600">{tour.highlights}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-gray-700">
                        Availability:{" "}
                      </span>
                      <span className="text-gray-600">{tour.availability}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-gray-700">Guide: </span>
                      <span className="text-gray-600">{tour.guide}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-gray-700">
                        Transportation:{" "}
                      </span>
                      <span className="text-gray-600">
                        {tour.transportation}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Button
        className="bg-blue-600 text-white w-full md:w-xl cursor-pointer py-6 mt-4 mx-auto flex items-center"
        variant={"default"}
      >
        Check Out
      </Button>
    </div>
  );
};

export default ComparePage;
