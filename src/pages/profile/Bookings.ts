import type { CarBooking, FlightBooking, HotelBooking, TourBooking } from "./types";
import LOGOImg from '@/assets/image 13.png';
import CarImg from '@/assets/iris 1.png';
import TourImg from '@/assets/tour.png';
import HotelImg from '@/assets/hotel.png';

 
 export const flightBookings: FlightBooking[] = [
    {
      id: '1',
      airline: 'Air Canada',
      flightNumber: 'AC006',
      from: 'YUL',
      to: 'NRT',
      date: 'December 16h, 2022',
      departureTime: '07h05',
      arrivalTime: '20h05',
      gate: '8',
      seat: '6',
      terminal: '3',
      flightCode: '13h00',
      image: LOGOImg

    }
  ];

 export const carBookings: CarBooking[] = [
    {
      id: '1',
      carModel: 'S 500 Sedan',
      type: 'Automatic',
      seats: 5,
      fuelType: 'Diesel',
      image: CarImg
    }
  ];

 export const tourBookings: TourBooking[] = [
    {
      id: '1',
      title: 'Luxor',
      type: 'Full Day Tour',
      location: 'Egypt',
      price: 150,
      rating: 4.3,
      image: TourImg
    }
  ];

  export const hotelBookings: HotelBooking[] = [
    {
      id: '1',
      name: 'Golden Valley',
      location: 'New York, USA',
      discount: '15% off',
      rating: 4.3,
      image: HotelImg 
    }
  ];
