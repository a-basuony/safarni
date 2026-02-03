export type TripType = "round-trip" | "multi-city" | "one-way";

export interface BookingFormData {
  tripType: TripType;
  location: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  passengers: number;
}

export interface LocationOption {
  id: string;
  name: string;
  country: string;
}

export interface Flight {
  id: string;
  departureTime: string;
  arrivalTime: string;
  originCode: string;
  destinationCode: string;
  duration: string;
  airline: string;
  price: number;
  layover?: {
    location: string;
    duration: string;
  };
}
