import { useState } from "react";
import ifelImg from "/images/Vector (3).png";
import RomaImg from "/images/Vector (1).png";
import Londen from "/images/Vector (2).png";
import { ChevronLeft, Search } from "lucide-react";
import {Link, useNavigate} from "react-router-dom"

export default function SearchPage() {

  const navigate = useNavigate()

  const [search, setSearch] = useState("");
  
  

  const [cities] = useState([
    { id: 1, img: ifelImg, name: "Paris", desc: "City of arts" },
    {
      id: 2,
      img: RomaImg,
      name: "Roma",
      desc: "History lives here",
    },
    {
      id: 3,
      img: Londen,
      name: "Londen",
      desc: "City of culture",
    },
  ]);

  console.log("searc" , search);

  const filteredCities  = cities.filter((cite)=>{
    return cite.name.toLowerCase().includes(search.toLowerCase())
  })


  
  


  return <>
  
  <div className="container p-10 m-auto">
      
      {/* Search Section */}
      <div className="flex items-center justify-center gap-4 mb-8 w-full">
        {/* Back Icon */}
        <button onClick={()=> navigate("/")}  className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 cursor-pointer  border border-gray-300">
          <ChevronLeft />
        </button>

        {/* Search Input */}
        <div className="relative w-[80%]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e)=> setSearch(e.target.value)}
            type="text"
            placeholder="Search"
            className="w-full h-10 pl-10 pr-4 rounded-[10px] border border-gray-300 outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1">
        {filteredCities.map((city) => {
        
          return <Link to={`/cite/${city.id}`}>
          
          <div
            key={city.id}
            className="p-1.5 flex gap-3 cursor-pointer hover:shadow   transition-all decoration-2 rounded-[10px]"
          >
            <div className="bg-[#ebf5ff] p-2 rounded-lg">
              <img src={city.img} alt={city.name} />
            </div>

            <figcaption className="flex flex-col justify-around">
              <h3 className="font-bold text-[20px]">{city.name}</h3>
              <h4>{city.desc}</h4>
            </figcaption>
          </div>
          
          </Link>
        
       })}
      </div>
    </div>
  
  </>
}
