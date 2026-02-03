import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { TripTypeSelector } from "./TripTypeSelector";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import type { BookingFormData, TripType } from "../../../types/flight";
import { PASSENGER_OPTIONS } from "../../../constants/mockData";

interface BookingFormProps {
  onSubmit: (data: BookingFormData) => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<BookingFormData>({
    tripType: "round-trip",
    location: "Cairo, Egypt",
    destination: "Riyadh, Sadi Arabia",
    departureDate: "2025-12-16",
    returnDate: "2025-01-06",
    passengers: 1,
  });

  const handleInputChange = (field: keyof BookingFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for flights with data:", formData);
    onSubmit(formData); // Call parent handler
  };

  return (
    <div className="w-full max-w-2xl  p-6  lg:pr-10 lg:pt-0 rounded-3xl">
      <TripTypeSelector
        activeType={formData.tripType}
        onChange={(type) => handleInputChange("tripType", type)}
      />

      <form onSubmit={handleSearch} className="space-y-6">
        <Input
          label="Location"
          value={formData.location}
          onChange={(e) => handleInputChange("location", e.target.value)}
          placeholder="Where are you from?"
        />

        <Input
          label="Destination"
          value={formData.destination}
          onChange={(e) => handleInputChange("destination", e.target.value)}
          placeholder="Where are you going?"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Departure"
            type="text"
            value={formData.departureDate}
            onChange={(e) => handleInputChange("departureDate", e.target.value)}
          />
          <Input
            label="Return"
            type="text"
            value={formData.returnDate}
            onChange={(e) => handleInputChange("returnDate", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-slate-700 ml-1">
            Passenger
          </label>
          <div className="relative">
            <select
              className="w-full appearance-none px-4 py-3 bg-transparent border border-slate-200 rounded-xl text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all cursor-pointer"
              value={formData.passengers}
              onChange={(e) =>
                handleInputChange("passengers", Number(e.target.value))
              }
            >
              {PASSENGER_OPTIONS.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                  className="bg-white text-slate-600 hover:bg-blue-50 cursor-pointer"
                >
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              size={20}
            />
          </div>
        </div>

        <Button
          fullWidth
          type="submit"
          className=" cursor-pointer mt-4 py-4 text-lg"
        >
          Search Flights
        </Button>
      </form>
    </div>
  );
};
