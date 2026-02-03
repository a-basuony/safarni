import React from "react";
import type { Flight } from "@/types/flight";
import { Plane } from "lucide-react";

interface FlightCardProps {
  flight: Flight;
}

export const FlightCard: React.FC<FlightCardProps> = ({ flight }) => {
  return (
    <div className="relative group cursor-pointer">
      {/* Ticket Cutout Effect (Circles on sides) */}
      <div className="absolute top-1/2 left-[-20px] -translate-y-1/2 w-10 h-10 rounded-full bg-slate-50 z-10"></div>
      <div className="absolute top-1/2 right-[-20px] -translate-y-1/2 w-10 h-10 rounded-full bg-slate-50 z-10"></div>
      {/* Ticket Cutout Effect - Match parent background EXACTLY */}
      {/* <div className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-inner"></div>
      <div className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-inner"></div> */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-100 overflow-hidden">
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-[#111928] tracking-tight">
              {flight.departureTime}
            </span>
            <span className="text-slate-400 font-medium text-sm">
              {flight.originCode}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center flex-1 px-4">
            <div className="flex items-center justify-center w-full max-w-[100px]">
              <Plane size={16} className="text-[#111928] rotate-45" />
            </div>
            <span className="w-full text-center text-[11px] font-semibold text-[#111928] mt-1 uppercase tracking-wider">
              {flight.duration}
            </span>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-xl font-bold text-[#111928] tracking-tight">
              {flight.arrivalTime}
            </span>
            <span className="text-slate-400 font-medium text-sm">
              {flight.destinationCode}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-end  pt-4">
          <div>
            {flight.layover && (
              <p className="text-[11px] text-slate-400 mb-1">
                1 layover: {flight.layover.location} ({flight.layover.duration})
              </p>
            )}
            <h4 className="font-bold text-slate-700">{flight.airline}</h4>
          </div>
          <div className="text-right">
            <p className="text-2xl font-black text-[#111928]">
              $ {flight.price.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
