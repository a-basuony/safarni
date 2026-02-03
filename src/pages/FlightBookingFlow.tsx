import React, { useState } from "react";
import { FlightList } from "@/component/booking/flightList/FlightList";
import { SeatSelection } from "@/component/booking/chooseSet/SeatSelection";
import type { BookingFormData, Flight } from "@/types/flight";
import { BoardingPass } from "@/component/booking/BoardingPass/BoardingPass";
import FlightBooking from "@/component/booking/flightBooking/FlightBooking";

import { MOCK_FLIGHTS } from "@/constants/mockData";

type FlowStep = "search" | "flight-list" | "seat-selection" | "boarding-pass";

export const FlightBookingFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<FlowStep>("search");
  const [bookingData, setBookingData] = useState<BookingFormData | null>(null);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);

  const handleSearchSubmit = (data: BookingFormData) => {
    setBookingData(data);
    setCurrentStep("flight-list");
  };

  const handleFlightSelect = (flight: Flight) => {
    setSelectedFlight(flight);
    setCurrentStep("seat-selection");
  };

  const handleSeatSelect = (seatNumber: number) => {
    setSelectedSeat(seatNumber);
    setCurrentStep("boarding-pass");
  };

  const handleBack = () => {
    switch (currentStep) {
      case "flight-list":
        setCurrentStep("search");
        break;
      case "seat-selection":
        setCurrentStep("flight-list");
        break;
      case "boarding-pass":
        setCurrentStep("seat-selection");
        break;
    }
  };

  const handleCheckOut = () => {
    // Handle checkout logic (payment, API call, etc.)
    console.log("Checkout:", { selectedFlight, selectedSeat });
    alert("Checkout successful!");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      {currentStep === "search" && (
        <FlightBooking onSearchSubmit={handleSearchSubmit} />
      )}

      {currentStep === "flight-list" && bookingData && (
        <FlightList
          bookingData={bookingData}
          onFlightSelect={handleFlightSelect}
          onBack={handleBack}
        />
      )}

      {currentStep === "seat-selection" && selectedFlight && (
        <SeatSelection
          onBack={handleBack}
          onContinue={handleSeatSelect}
          ticketPrice={selectedFlight.price}
        />
      )}

      {currentStep === "boarding-pass" && selectedFlight && selectedSeat && (
        <BoardingPass
          onBack={handleBack}
          onCheckOut={handleCheckOut}
          flight={selectedFlight}
          seatNumber={selectedSeat}
        />
      )}
    </div>
  );
};
