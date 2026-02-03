
import Categories from "./Categories"


import img1 from "/images/Frame 1464204088.png"
import img2 from "/images/Frame 1464204089.png"
import img3 from "/images/Frame 1464204090.png"
import img4 from "/images/Frame 1464204091.png"
import img5 from "/images/Frame 1464204092.png"
import img6 from "/images/Frame 1464203463.png"
import Vector from "/images/Vector.png"
import Recommendation from "./Recommendation"
import AvailableTours from "./AvailableTours"



export default function Home() {
  return <>
  

  <div className="container m-auto px-1 py-16">

    <header className="grid grid-cols-1 md:grid-cols-2 p-3.5">
         <div className="max-md:hidden flex justify-center items-center">
             <div className="text w-[60%] relative ">
               <h1 className=" text-3xl font-bold pt-5">Visit The Most</h1>
              <h2  className=" text-4xl font-bold py-5"> <span className="text-[#1e429f]">Beautiful Places</span> In The World </h2>
              <p>Explore stunning destinations around the globe. Find travel inspiration , top attractions , and plan your next adventure—all from one platform.</p>
              <img className=" absolute -right-2.5 top-[35%]" src={Vector} alt="" />
             </div>
         </div>


         <figure className="max-md:hidden allImg flex justify-evenly gap-2">
            <div className=" flex flex-col gap-4">
                  <img src={img1} alt="" />
                  <img src={img2} alt="" />
            </div>

             <div className=" flex flex-col justify-end gap-4">
                  <img src={img4} alt="" /> 
                  <img src={img3} alt="" />
            </div>

             <div className=" flex justify-end flex-col">
                  <img src={img5} alt="" />
            </div>
         </figure>

         <div className="w-full md:hidden">
             <img className="w-full" src={img6} alt="" />
         </div>

    </header>

     <Categories/>
     <Recommendation/>
     <AvailableTours/>
  </div>
  
  
  </>
}
