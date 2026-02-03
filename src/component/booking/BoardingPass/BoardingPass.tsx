import React from "react";
import { ChevronLeft, Plane } from "lucide-react";
import { Button } from "@/component/ui/Button";
import type { Flight } from "@/types/flight";
import { FlightIllustration } from "../flightBooking/FlightIllustration";

interface BoardingPassProps {
  onBack: () => void;
  onCheckOut: () => void;
  flight: Flight;
  seatNumber: number;
}

export const BoardingPass: React.FC<BoardingPassProps> = ({
  onBack,
  onCheckOut,
  flight,
  seatNumber,
}) => {
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

        {/* Right side: Boarding Pass Content */}
        <div className="flex-1 flex flex-col w-full justify-start items-center lg:items-start lg:pl-4 xl:pl-10">
          {/* Boarding Pass Card */}
          <h2 className="text-2xl font-bold text-slate-800 text-center mb-8 mx-auto">
            Boarding pass
          </h2>
          <div className="w-full max-w-md bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 overflow-hidden mb-8">
            {/* Header Accent Line */}
            <div className="h-2 w-full bg-gradient-to-r from-blue-300 via-blue-600 to-blue-300 opacity-50"></div>

            <div className="p-6 w-full">
              {/* Airline & Date */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
                    <span className="text-[10px] text-white font-bold">AC</span>
                  </div>
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Air Canada
                  </span>
                </div>
                <span className="text-sm font-medium text-slate-500">
                  December 16h, 2022
                </span>
              </div>

              {/* Times & Route */}
              <div className="flex justify-between items-center mb-8">
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-slate-800">
                    07h05
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    YUL
                  </span>
                </div>

                <div className="flex flex-col items-center flex-1 px-4">
                  <Plane size={16} className="mb-1 rotate-45 text-[#111928]" />
                  <div className="h-[1px] w-full bg-slate-200"></div>
                  <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">
                    13h00
                  </span>
                </div>

                <div className="flex flex-col items-end">
                  <span className="text-xl font-bold text-slate-800">
                    20h05
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    NRT
                  </span>
                </div>
              </div>

              {/* Flight Details Grid */}
              <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="flex flex-col items-center">
                  <span className="text-lg font-bold text-slate-700">8</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    Gate
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-lg font-bold text-slate-700">
                    {seatNumber}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    Seat
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-lg font-bold text-slate-700">3</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    Terminal
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-lg font-bold text-slate-700 text-right">
                    AC006
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    Flight
                  </span>
                </div>
              </div>

              {/* Passenger Row */}
              <div className="flex items-center justify-between border-t border-slate-100 pt-6">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100"
                    alt="Passenger"
                    className="w-10 h-10 rounded-full object-cover border-2 border-slate-50"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-800">
                      Catherine Dion
                    </span>
                    <span className="text-[10px] font-medium text-slate-400 tracking-tight">
                      24 years, Female
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full">
                  <div className="w-4 h-4 rounded bg-blue-900 flex items-center justify-center">
                    <span className="text-[8px] text-white">💺</span>
                  </div>
                  <span className="text-xs font-bold text-slate-700">
                    {seatNumber}A
                  </span>
                </div>
              </div>
            </div>

            {/* Ticket Divider */}
            <div className="relative  py-4">
              <div className="border-t-2 border-dashed border-slate-100"></div>
              <div className="absolute left-[-16px] top-1/2 -translate-y-1/2 w-8 h-8  rounded-full bg-slate-50 z-10"></div>
              <div className="absolute right-[-16px] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-50 z-10"></div>
            </div>

            {/* QR Code Section */}
            <div className="px-6 pb-10 flex justify-center">
              <div className="p-4 bg-white rounded-2xl border border-slate-50">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=SkyBound-AC006-Seat6"
                  alt="QR Code"
                  className="w-32 h-32 opacity-90"
                />
              </div>
            </div>
          </div>

          <Button
            fullWidth
            onClick={onCheckOut}
            className="py-4 text-lg bg-[#2546A6] max-w-md"
          >
            Check Out
          </Button>
        </div>
      </div>
    </div>
  );
};
