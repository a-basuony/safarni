
import { Backpack, CarFront, ChevronLeft, Dock, Search, Star, Umbrella } from "lucide-react";
import BudgetRange from "./BudgetRange";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FilterPanel() {

  const [ isActive , setIsActive ] = useState(0)
  const navigate = useNavigate()

  const handelReting = (reting : number )=>{
    setIsActive(reting)
  }

  return <>
  
    <div className="container m-auto p-6">

         {/* Back Icon */}
        <button onClick={()=> navigate(-1)} className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 cursor-pointer  border border-gray-300">
          <ChevronLeft />
        </button>

        <div className=" p-4 flex justify-center flex-col  border-b border-gray-400 pb-7">
            
        <h2 className="text-[20px] font-bold py-3">Sort By</h2>

        <ul className=" flex flex-wrap gap-2 justify-between w-[60%] ">

            {["Price (Low to High)", "Price (High to Low)", "Biggest Deals (Highest Saving)", "Most Reviewed", "Most Reviewed"].map((item , idx)=>{
                return <li key={idx} className=" p-2 rounded-2xl border border-[#ebf5ff] text-gray-500 cursor-pointer hover:bg-[#ebf5ff] hover:text-[#1e429f]">{item}</li>
            })}

        </ul>

        </div>
        

        

            <BudgetRange/>



        <section className=" p-3 border-b border-b-gray-400">
             <h2 className="text-[20px] font-bold py-3">Adventure Style <span className=" text-gray-400">Multi Select</span></h2>

             <ul className="flex flex-wrap gap-2 justify-between max-sm:w-full md:w-[80%] p-3 m-auto">
                {[{ lnk: "Adventure Travel", icon: <Backpack className="m-auto"/> } , { lnk: "City Breaks", icon: <Dock className="m-auto" /> } ,
             { lnk: "Water Activity", icon: <Umbrella className="m-auto"/>} , { lnk: "Road Trips", icon: <CarFront className="m-auto"/> } ].map((item , idx)=>{
                return <li key={idx} className=" p-2 px-4 rounded-2xl border  border-[#ebf5ff] text-gray-500 cursor-pointer hover:bg-[#ebf5ff] hover:text-[#1e429f]">{item.icon}{item.lnk}</li>
             })}
             </ul>
        </section>

        <section className="p-3 border-b border-b-gray-400">

             <div className="flex justify-between items-center">
                <h2 className="text-[20px] font-bold py-3">Location</h2>
             </div>


             {/* Search Input */}
        <div className="relative w-full my-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"  />

          <input
            type="text"
            placeholder="Search"
            className="w-full h-10 pl-10 pr-4 rounded-[10px] border border-gray-300 outline-none focus:border-blue-500"
          />
        </div>

        </section>


        <section className=" p-3">
          <h2 className="text-[20px] font-bold py-3">Rating <span className=" text-gray-400 text-[20px]">Multi Select</span></h2>

          <ul className="grid grid-cols-3 md:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((item, idx) => {
              const active = isActive === item;
              return (
                <li
                  key={idx}
                  onClick={() => handelReting(item)}
                  className={`
                    text-center p-3 rounded-2xl cursor-pointer flex flex-col items-center justify-center
                    border ${active ? "border-amber-400 bg-amber-50 shadow-md text-amber-500" : "border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-blue-600"}
                    transition-all duration-200
                  `}
                >
                  {active ? (
                    <Star className="m-auto text-amber-400" fill="currentColor" />
                  ) : (
                    <Star className="m-auto text-gray-400" />
                  )}
                  <span className="mt-1 font-semibold">{item}</span>
                </li>
              );
            })}
          </ul>


          <div className="btns grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
               <button className="text-center p-2 rounded-[10px]  text-blue-700 border border-blue-700  cursor-pointer">Clear All</button>
               <button className="text-center p-2 rounded-[10px] bg-blue-700 text-white  cursor-pointer">56 Tours Found</button>
          </div>
        </section>


        
    </div>
  
  
  </>
}
