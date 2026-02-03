import { BookingForm } from "@/component/booking/flightBooking/BookingForm";
import { FlightIllustration } from "@/component/booking/flightBooking/FlightIllustration";
import type { BookingFormData } from "@/types/flight";

interface FlightBookingProps {
  onSearchSubmit: (data: BookingFormData) => void;
}

const FlightBooking: React.FC<FlightBookingProps> = ({ onSearchSubmit }) => {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 md:p-8 lg:p-12">
      {/* Main Container Card */}
      <div className="w-full max-w-7xl p-4 lg:p-6 overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-8 min-h-150">
          {/* Left Side: Illustration */}
          <section className="flex-1 lg:max-w-[50%]">
            <FlightIllustration />
          </section>

          {/* Right Side: Booking Controls */}
          <section className="flex-1 flex flex-col justify-start items-center lg:items-start lg:pl-4 xl:pl-10">
            <BookingForm onSubmit={onSearchSubmit} />
          </section>
        </div>
      </div>
    </main>
  );
};

export default FlightBooking;
