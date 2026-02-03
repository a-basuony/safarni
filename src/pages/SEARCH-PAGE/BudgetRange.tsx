import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Slider } from "@/components/ui/slider";

const initialData = [
  { price: 0, tours: 2 },
  { price: 1000, tours: 5 },
  { price: 2000, tours: 8 },
  { price: 3000, tours: 12 },
  { price: 4000, tours: 7 },
  { price: 5000, tours: 10 },
  { price: 6000, tours: 5 },
  { price: 7000, tours: 3 },
  { price: 8000, tours: 1 },
];

export default function BudgetRangeChart() {
  const [range, setRange] = useState<[number, number]>([2100, 8500]);

  const filteredData = initialData.filter(
    (item) => item.price >= range[0] && item.price <= range[1]
  );

  return (
    <div className="w-full border-b border-gray-300 p-4">
      <h2 className="text-lg font-bold mb-4">Budget Range</h2>

      {/* Chart */}
      <div className="w-full mb-4">
        <ResponsiveContainer width="100%" height={150}>
          <AreaChart data={filteredData}>
            <CartesianGrid horizontal={false} vertical={false} />
            <XAxis dataKey="price" hide />
            <YAxis hide />
            <Tooltip formatter={(v) => [`${v} Tours`, "Tours"]} />
            <Area
              type="monotone"
              dataKey="tours"
              stroke="#c1dcfd"
              fill="#c1dcfd"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Range Slider */}
      <div className="px-2">
        <Slider
          value={range}
          onValueChange={(val) => setRange(val as [number, number])}
          min={0}
          max={8500}
          step={100}
          minStepsBetweenThumbs={1}
          className="
            relative

            [&_[data-orientation=horizontal]]:h-1
            [&_[data-orientation=horizontal]]:bg-blue-200

            [&_[class*='range']]:bg-blue-500

            [&_[role=slider]]:h-5
            [&_[role=slider]]:w-5
            [&_[role=slider]]:rounded-full
            [&_[role=slider]]:border-2
            [&_[role=slider]]:border-blue-600
            [&_[role=slider]]:bg-blue-600
            [&_[role=slider]]:shadow
          "
        />

        <div className="flex justify-between text-sm mt-2">
          <span className="text-blue-600 text-lg">
            Min {range[0]}$
          </span>
          <span className="text-blue-600 text-lg">
            Max {range[1]}$
          </span>
        </div>
      </div>
    </div>
  );
}
