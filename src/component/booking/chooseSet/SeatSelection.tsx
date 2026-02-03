import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { FlightIllustration } from "../flightBooking/FlightIllustration";
import { Button } from "@/component/ui/Button";

interface SeatSelectionProps {
  onBack: () => void;
  onContinue: (seatNumber: number) => void;
  ticketPrice: number;
}

export const SeatSelection: React.FC<SeatSelectionProps> = ({
  onBack,
  onContinue,
  ticketPrice,
}) => {
  const [selectedSeat, setSelectedSeat] = useState<number | null>(6);

  // Based on the provided image, defining the status of seats
  // Available: Dark Blue, Selected: Green, Unavailable: Light Gray
  const unavailableSeats = [
    1, 2, 3, 5, 7, 11, 12, 13, 14, 15, 18, 19, 21, 22, 23, 25, 27, 30,
  ];
  const availableSeats = [4, 6, 8, 9, 10, 16, 17, 20, 24, 26, 28, 29];

  const handleSeatClick = (num: number) => {
    if (unavailableSeats.includes(num)) return;
    setSelectedSeat(num === selectedSeat ? null : num);
  };

  const seats = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="w-full max-w-6xl mx-auto py-6 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Header with Back Button */}
      <div className="mb-8 flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-3 rounded-full bg-white cursor-pointer hover:bg-slate-50 shadow-sm hover:shadow-md transition-all active:scale-95 text-slate-600"
        >
          <ChevronLeft size={24} />
        </button>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 min-h-[600px]">
        {/* Left side: Illustration */}
        <section className="flex-1 lg:max-w-[50%]">
          <FlightIllustration />
        </section>

        {/* Right side: Seat Controls */}
        {/* flex-1 bg-white p-8 lg:p-12 rounded-[3rem] shadow-xl shadow-slate-200/50 flex flex-col */}
        <div className="flex-1 flex flex-col justify-start items-center  lg:items-start lg:pl-4 xl:pl-10">
          <h2 className="text-2xl font-bold text-slate-800 text-center mb-8 mx-auto">
            Choose seat
          </h2>

          {/* Legend */}
          <div className="flex justify-between gap-6 mb-10 w-full">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#2546A6]"></div>
              <span className="text-sm font-medium text-slate-500">
                Available
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#00D94E]"></div>
              <span className="text-sm font-medium text-slate-500">
                Selected
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#E2E8F0]"></div>
              <span className="text-sm font-medium text-slate-500">
                Un available
              </span>
            </div>
          </div>

          {/* Seat Grid */}
          <div className="grid grid-cols-6 gap-3 mb-10 mx-auto w-full">
            {seats.map((num) => {
              const isUnavailable = unavailableSeats.includes(num);
              const isSelected = selectedSeat === num;

              return (
                <button
                  key={num}
                  onClick={() => handleSeatClick(num)}
                  disabled={isUnavailable}
                  className={`
                    h-11 w-11 rounded-lg text-xs font-bold transition-all
                    ${
                      isUnavailable
                        ? "bg-[#E2E8F0] text-slate-400 cursor-not-allowed cursor-not-allowed"
                        : ""
                    }
                    ${
                      !isUnavailable && !isSelected
                        ? "bg-[#2546A6] text-white hover:bg-blue-800 cursor-pointer"
                        : ""
                    }
                    ${
                      isSelected
                        ? "bg-[#00D94E] text-white shadow-lg shadow-green-200"
                        : ""
                    }
                    ${(num - 1) % 5 === 2 ? "col-start-4" : ""}
                  `}
                >
                  {num}
                </button>
              );
            })}
          </div>

          {/* Pricing Summary */}
          <div className="w-full mb-8">
            <div className="flex justify-between items-center w-full">
              <span className="text-[#111928] font-medium">Ticket price</span>
              <span className="text-xl font-bold text-[#2546A6]">
                ${ticketPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#111928] font-medium">Total Price</span>
              <span className="text-xl font-bold text-[#2546A6]">
                ${(selectedSeat ? ticketPrice : 0).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#111928] font-medium">your Seat</span>
              <span className="text-xl font-bold text-[#2546A6]">
                {selectedSeat || "-"}
              </span>
            </div>
          </div>

          <Button
            fullWidth
            onClick={() => selectedSeat && onContinue(selectedSeat)}
            disabled={!selectedSeat}
            className="py-4 text-lg"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};
