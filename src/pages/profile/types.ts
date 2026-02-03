// Types for ProfileMain 
export interface User {
  name: string;
  email: string;
  avatar: string;
  location?: string;
  phone?: string;
}

export interface MenuItem {
  id: string;
  title: string;
 icon: string;
   path: string;
}


// Form values for Personal Info page
export interface PersonalInfoFormValues {
  name: string;
  email: string;
  location: string;
  phone: string;
}

// Types for Security Settings page
export interface SecuritySettings {
  biometricEnabled: boolean;
  faceIdEnabled: boolean;
}

// Booking Types
export interface FlightBooking {
  image: string | undefined;
  id: string;
  airline: string;
  flightNumber: string;
  from: string;
  to: string;
  date: string;
  departureTime: string;
  arrivalTime: string;
  gate: string;
  seat: string;
  terminal: string;
  flightCode: string;
}

export interface CarBooking {
  id: string;
  carModel: string;
  type: string;
  seats: number;
  fuelType: string;
  image: string;
}

export interface TourBooking {
  id: string;
  title: string;
  type: string;
  location: string;
  price: number;
  rating: number;
  image: string;
}

export interface HotelBooking {
  id: string;
  name: string;
  location: string;
  discount: string;
  rating: number;
  image: string;
}

export type BookingTab = 'flight' | 'cars' | 'tours' | 'hotel';