import type { Room } from "@/types/hotel";
import { Card } from "@/components/ui/card";

interface AvailableProps {
  rooms: Room[];
  onViewAll?: () => void;
}

export default function Available({ rooms, onViewAll }: AvailableProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Available Rooms</h2>
        <button
          onClick={onViewAll}
          className="text-blue-600 hover:underline text-sm cursor-pointer"
        >
          View all
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {rooms.map((room) => (
          <Card
            key={room.id}
            className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="relative">
              <img
                src={room.image}
                alt={room.name}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{room.name}</h3>
              <p className="text-sm text-gray-600">
                From{" "}
                <span className="text-blue-600 font-semibold">
                  {room.price}$
                </span>{" "}
                Per Night
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

