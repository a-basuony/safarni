import { useState } from "react";
import img1 from "/images/06e8d539f2c029102f72990099d00b165b9e3988.jpg";
import img2 from "/images/3d566ff03d5064ad903c9c1f1d7653e0a080404a.jpg";
import img3 from "/images/5345dfa8155204c3bae9205902d2bf8d7c7bc0c5.jpg";
import img4 from "/images/6020dedf540e6bdb15a63ebb17e9884d553d9bd5.jpg";
import img5 from "/images/710430bc6094afb847ff7f6a42e01e9613cd96ab.jpg";
import img6 from "/images/96aa1d6b3566764687e1b0505e052b25bd1cee28.jpg";
import img7 from "/images/ab768b7bfbedbd9c47e05dca2f558b7f4abcea6d.jpg";
import img8 from "/images/cb3d4d3525a4581d0d736f4e19a259e4fcbb57ba.jpg";
import { ChevronLeft, Heart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CityDetails() {
    const [ favorites , setFavorites ] = useState<{ [key: number]: boolean }>({})
    const navigate = useNavigate()

  const [places] = useState([
    {
      id: 1,
      img: img1,
      title: "Eiffel Tower",
      rating: 4.6,
      reviews: 650,
      pickup: "Pickup Available",
      duration: "7 Days",
      price: 1050,
    },
    {
      id: 2,
      img: img2,
      title: "Louvre Museum",
      rating: 4.8,
      reviews: 820,
      pickup: "Pickup Available",
      duration: "3 Days",
      price: 980,
    },
    {
      id: 3,
      img: img3,
      title: "Seine River Cruise",
      rating: 4.5,
      reviews: 430,
      pickup: "Pickup Available",
      duration: "1 Day",
      price: 450,
    },
    {
      id: 4,
      img: img4,
      title: "Montmartre",
      rating: 4.4,
      reviews: 390,
      pickup: "Pickup Available",
      duration: "2 Days",
      price: 600,
    },
    {
      id: 5,
      img: img5,
      title: "Notre Dame",
      rating: 4.7,
      reviews: 710,
      pickup: "Pickup Available",
      duration: "2 Days",
      price: 750,
    },
    {
      id: 6,
      img: img6,
      title: "Versailles Palace",
      rating: 4.9,
      reviews: 1020,
      pickup: "Pickup Available",
      duration: "1 Day",
      price: 1200,
    },
    {
      id: 7,
      img: img7,
      title: "Disneyland Paris",
      rating: 4.8,
      reviews: 1500,
      pickup: "Pickup Available",
      duration: "2 Days",
      price: 1800,
    },
    {
      id: 8,
      img: img8,
      title: "Arc de Triomphe",
      rating: 4.6,
      reviews: 540,
      pickup: "Pickup Available",
      duration: "1 Day",
      price: 500,
    },
  ]);


  


  const toggleFavorite = ( id : number ) => {

  setFavorites((prev) => ({
    ...prev,
    [id]: !prev[id],
  }));
};


  return (
    <div className="container m-auto p-5">

         {/* Back Icon */}
        <button onClick={()=> navigate(-1)} className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 cursor-pointer  border border-gray-300">
          <ChevronLeft />
        </button>

        <div className="flex justify-between items-center p-2">
          <h2 className=" py-4 text-2xl font-bold">Paris</h2>
          <button onClick={()=> navigate("/FilterPanel")} className=" capitalize rounded-[10px] border-0 bg-blue-700 text-white p-2 cursor-pointer">sort by</button>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {places.map((place) => (
          <div
            key={place.id}
            className="card rounded-2xl shadow border border-gray-200 p-3 relative"
          >
            <div onClick={()=> toggleFavorite(place.id)} className="flex justify-center items-center h-9 w-9 absolute top-5 right-7 rounded-full bg-white text-gray-400 cursor-pointer">
                {favorites[place.id] ? (
                <Heart className="w-6 h-6 text-red-500" fill="currentColor" />
            ) : (
                 <Heart />

            )}
              
            </div>

            <figure>
              <img
                className="w-full rounded-2xl h-75"
                src={place.img}
                alt={place.title}
              />
            </figure>

            <figcaption className="py-3">
              <div className="flex justify-between">
                <h3 className="font-bold">{place.title}</h3>
                <span className="flex items-center gap-1">
                  <Star className="text-[#FACC15] " fill="currentColor" size={19}/> {place.rating}
                </span>
              </div>

              <div className="flex justify-between">
                <h4 className="text-gray-400">{place.pickup}</h4>
                <h6>
                  <span className="inline-block h-2 w-2 rounded-full bg-blue-700 mr-1"></span>
                  {place.duration}
                </h6>
              </div>

              <p>
                From{" "}
                <span className="text-blue-500 font-bold">
                  {place.price}$
                </span>{" "}
                per Person
              </p>
            </figcaption>
          </div>
        ))}
      </div>
    </div>
  );
}
