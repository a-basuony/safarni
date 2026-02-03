import React from "react";
import type { TripType } from "../../../types/flight";
import { RefreshCcw, ArrowRight } from "lucide-react";

interface TripTypeSelectorProps {
  activeType: TripType;
  onChange: (type: TripType) => void;
}

export const TripTypeSelector: React.FC<TripTypeSelectorProps> = ({
  activeType,
  onChange,
}) => {
  const options: { id: TripType; label: string; icon: React.ReactNode }[] = [
    { id: "round-trip", label: "Round Trip", icon: <RefreshCcw size={18} /> },
    { id: "multi-city", label: "Multi City", icon: <RefreshCcw size={18} /> },
    { id: "one-way", label: "One Way", icon: <ArrowRight size={18} /> },
  ];

  return (
    <div className="flex flex-wrap gap-3 mb-8 ">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onChange(option.id)}
          className={` cursor-pointer
            flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all
            ${
              activeType === option.id
                ? "bg-[#EBF2FF] text-[#2546A6] shadow-sm"
                : "bg-slate-100 text-slate-500 hover:bg-slate-200"
            }
          `}
        >
          {option.icon}
          {option.label}
        </button>
      ))}
    </div>
  );
};
