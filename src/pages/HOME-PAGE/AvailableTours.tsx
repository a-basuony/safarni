import Luxor from "/images/_File Placeholder.png";
import Dahab from "/images/_Small Picture.png";
import Fayoum from "/images/_File Placeholder (1).png";
import MarsaAlam from "/images/_File Placeholder (2).png";
import { useState } from "react";
import { Star } from "lucide-react";

export default function AvailableTours() {

  const [availableTours] = useState([
    { image: Luxor, tripDuration: "Full Day Tour", rating: 4.5, cityName: "Luxor", price: "150" },
    { image: Dahab, tripDuration: "Full Day Tour", rating: 4.5, cityName: "Dahab", price: "250" },
    { image: Fayoum, tripDuration: "Full Day Tour", rating: 4.5, cityName: "Fayoum", price: "300" },
    { image: MarsaAlam, tripDuration: "Full Day Tour", rating: 4.5, cityName: "MarsaAlam", price: "200" },
  ]);

  return (
    <>
      <div className="container ">
        <div className="p-3 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Available Tours</h2>
          <h4 className="text-[20px]">viow all</h4>
        </div>
 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {availableTours.map((tour, index) => (
            <div
              key={index}
              className="card  flex shadow border-gray-300 p-1 rounded-lg"
            >
              <figure>
                <img className="w-full" src={tour.image} alt={tour.cityName} />
              </figure>

              <figcaption className="flex flex-col justify-around px-3.5 max-sm:py-4 w-full">
                <div className="flex justify-between">
                  <h4 className="text-gray-400">{tour.tripDuration}</h4>
                  <span className="flex items-center">
                    <Star className="text-[#FACC15]" fill='#FACC15' size={20}/>
                    {tour.rating}
                  </span>
                </div>

                <h3 className="text-[20px] font-bold">{tour.cityName}</h3>
                <p>From <span className=" text-blue-500">{tour.price}$</span> Per Person</p>
              </figcaption>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
