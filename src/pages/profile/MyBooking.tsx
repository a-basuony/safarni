import { ChevronLeft, Plane, Car, TramFront , Bed , Star, MapPin } from 'lucide-react';
import { useState } from 'react';
import type { BookingTab } from './types';
import { flightBookings, carBookings, tourBookings, hotelBookings } from './Bookings';
import { BackButton } from '@/components/ui/BackButton';



const MyBooking: React.FC = () => {
  const [activeTab, setActiveTab] = useState<BookingTab>('flight');

 
  const tabs = [
    { id: 'flight' as BookingTab, label: 'Flight', icon: Plane },
    { id: 'cars' as BookingTab, label: 'Cars', icon: Car },
    { id: 'tours' as BookingTab, label: 'tours', icon: TramFront },
    { id: 'hotel' as BookingTab, label: 'Hotel', icon: Bed }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header with Back Button */}
        <BackButton to="/profile" />

        {/* Title */}
        <h1 className="text-2xl font-poppins  text-center mb-8">My Booking</h1>

       {/* Tabs */}
<div className="relative mb-8">
  {/* Left Arrow – mobile only */}
  <button
    className="sm:hidden absolute left-2 top-1/2 -translate-y-1/2 z-20
               bg-white/90 backdrop-blur shadow-md rounded-full p-1.5"
    onClick={() => {
      const el = document.getElementById('tabs-scroll');
      el && (el.scrollLeft -= 140);
    }}
  >
    <ChevronLeft className="w-4 h-4 text-gray-600" />
  </button>

  {/* Tabs container */}
  <div
    id="tabs-scroll"
    className="flex gap-3 overflow-x-auto sm:overflow-visible
               scroll-smooth px-12 sm:px-0 no-scrollbar"
  >
    {tabs.map((tab) => {
      const Icon = tab.icon;
      return (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`shrink-0 min-w-30 sm:flex-1
            flex items-center justify-center gap-1
            border border-gray-200 py-3 px-5 rounded-full
            font-medium font-poppins transition-all
            ${
              activeTab === tab.id
                ? 'bg-blue-50 text-blue-600'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
        >
          <Icon className="w-5 h-5" />
          <span>{tab.label}</span>
        </button>
      );
    })}
  </div>

  {/* Right Arrow – mobile only */}
  <button
    className="sm:hidden absolute right-2 top-1/2 -translate-y-1/2 z-20
               bg-white/90 backdrop-blur shadow-md rounded-full p-1.5"
    onClick={() => {
      const el = document.getElementById('tabs-scroll');
      el && (el.scrollLeft += 140);
    }}
  >
    <ChevronLeft className="w-4 h-4 rotate-180 text-gray-600" />
  </button>
</div>


        {/* Content */}
        <div className="rounded-2xl p-px bg-linear-to-b from-brand-purple to-brand-pink">
        <div className="rounded-2xl bg-white ">
          {/* Flight Tab */}
          {activeTab === 'flight' && (
            <>
              {flightBookings.map((flight) => (
                <div key={flight.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex flex-col items-center gap-2 ">
  <div className="flex items-center justify-center">
    <img
      src={flight.image}
      alt={flight.airline}
      className="object-contain"
    />
  </div>

  <span className="font-medium text-gray-900 text-sm text-center">
    {flight.airline}
  </span>
</div>

                    <span className="text-sm text-gray-900  font-medium ">{flight.date}</span>
                  </div>

                  <div className="flex items-center justify-between mb-4 ">
                    <div>
                      <div className="text-xl font-normal text-gray-900">{flight.departureTime}</div>
                      <div className="text-sm text-gray-500 font-semibold ">{flight.from}</div>
                    </div>

                    <div className=" flex mx-8  ">
                      <div className=" items-center justify-center ">
                        <Plane className="w-5 h-5 text-black rotate-45 ml-2" />
                        <div className="text-sm text-gray-500">{flight.flightCode}</div>
                      </div>
                    </div>

                    <div className="text-right ">
                      <div className="text-xl font-normal text-gray-900 font-poppins ">{flight.arrivalTime}</div>
                      <div className="text-sm text-gray-500  font-poppins">{flight.to}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 pt-4 border-t border-gray-300">
                    <div>
                      <div className="text-[15px] ml-3 font-semibold  text-gray-500">{flight.gate}</div>
                      <div className="text-[17px] text-gray-900 font-poppins">Gate</div>
                    </div>
                    <div>
                      <div className="text-[15px] ml-3 font-semibold  text-gray-500">{flight.seat}</div>
                      <div className="text-[17px]  font-poppins text-gray-900">Seat</div>
                    </div>
                    <div>
                      <div className="text-[15px] ml-6 font-poppins text-gray-500">{flight.terminal}</div>
                      <div className="text-[17px]  font-poppins text-gray-900">Terminal</div>
                    </div>
                    <div className=" text-right mr-5">
                    <div className="text-xl text-gray-500 font-poppins">{flight.flightNumber}</div>
                    <div className="ml-4 text-sm font-poppins  text-gray-900">Flight</div>
                  </div>
                  </div>

                  
                </div>
              ))}
            </>
          )}

          {/* Cars Tab */}
          {activeTab === 'cars' && (
            <>
              {carBookings.map((car) => (
<div
  key={car.id}
  className="relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-poppins  text-gray-900 mb-4">{car.carModel}</h3>
<div className="flex flex-col sm:flex-row sm:gap-64 gap-2 text-[17px] font-normal font-poppins text-gray-500">
                        <span>{car.type}</span>
                        <span>{car.seats} seats</span>
                        <span>{car.fuelType}</span>
                      </div>
                    </div>
<img
  src={car.image}
  alt={car.carModel}
  className="
    absolute
    -top-20
    -right-6
    w-48
    h-auto
    object-contain
    pointer-events-none
    
    
  "
/>

                  </div>
                </div>
              ))}
            </>
          )}

          {/* Tours Tab */}
          {activeTab === 'tours' && (
            <>
              {tourBookings.map((tour) => (
                <div key={tour.id} className="bg-white rounded-2xl p-5 ">
                  <div className="flex items-center gap-4">
                    <img src={tour.image} alt={tour.title} className="w-24 h-24 rounded-xl object-cover" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[15px] text-gray-600 font-poppins font-medium">{tour.type}</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{tour.rating}</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-medium font-poppins text-gray-900 mb-2">{tour.title}</h3>
                      <p className="text-[15px] font-medium text-gray-500">From <span className='text-blue-600'>{tour.price}$</span> Per Person</p>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Hotel Tab */}
          {activeTab === 'hotel' && (
            <>
              {hotelBookings.map((hotel) => (
                <div key={hotel.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img src={hotel.image} alt={hotel.name} className="w-24 h-24 rounded-xl object-cover" />

                    </div>
                    <div className="flex-1">
                      <span className="bg-blue-100 text-blue-500 text-xs px-2 py-1 rounded-3xl ">
                        {hotel.discount}
                      </span>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-poppins font-medium text-gray-900">{hotel.name}</h3>
                        <div className="flex items-center gap-1 relative -top-9">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{hotel.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-[15px] text-gray-400">
                        <MapPin className="w-4 h-4" />
                        <span>{hotel.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div></div>
  );
};

export default MyBooking;