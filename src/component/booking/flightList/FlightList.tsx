import React from "react";
import { ChevronLeft, Calendar, User } from "lucide-react";
import type { BookingFormData, Flight } from "@/types/flight";
import { MOCK_FLIGHTS } from "@/constants/mockData";
import { FlightCard } from "./FlightCard";

interface FlightListProps {
  bookingData: BookingFormData;
  onBack: () => void;
  onFlightSelect: (flight: Flight) => void; // Add this
}

export const FlightList: React.FC<FlightListProps> = ({
  bookingData,
  onBack,
  onFlightSelect,
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto py-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header with Back Button */}
      <div className="mb-8 flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-3 rounded-full bg-white cursor-pointer  hover:bg-slate-50 shadow-sm hover:shadow-md transition-all active:scale-95 text-slate-600"
        >
          <ChevronLeft size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Outbound Section */}
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-50 flex items-center justify-center gap-3 mb-6">
            <Calendar size={18} className="text-[#111928]" />
            <span className="font-semibold text-[#111928]">
              {bookingData.departureDate}
            </span>
          </div>

          <div className="space-y-4">
            {MOCK_FLIGHTS.map((flight) => (
              <button
                key={`outbound-${flight.id}`}
                onClick={() => onFlightSelect(flight)}
                className="w-full text-left"
              >
                <FlightCard flight={flight} />
              </button>
            ))}
          </div>
        </div>

        {/* Return Section */}
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-50 flex items-center justify-center gap-3 mb-6">
            <User size={18} className="text-[#111928]" />
            <span className="font-semibold text-[#111928]">
              {bookingData.returnDate}
            </span>
          </div>

          <div className="space-y-4">
            {MOCK_FLIGHTS.map((flight) => (
              <button
                key={`return-${flight.id}`}
                onClick={() => onFlightSelect(flight)}
                className="w-full text-left"
              >
                <FlightCard flight={flight} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
