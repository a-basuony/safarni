import React from "react";

import plan from "../../../assets/plan.png";

export const FlightIllustration: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[400px] lg:min-h-0 bg-[#F1F3F5] rounded-[2.5rem] flex items-center justify-center overflow-hidden">
      <img
        src={plan}
        alt="Airplane Illustration"
        className="w-full h-full object-cover mix-blend-multiply"
      />
    </div>
  );
};
