
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import img from "/images/Frame 1464203887.png"
import img1 from "/images/Frame 1464203887 (1).png"
import img2 from "/images/Frame 1464203887 (2).png"
import img3 from "/images/Frame 1464203887 (3).png"
import { MapPin, Star } from 'lucide-react';


export default function Recommendation() {


  const [ recommendationAll ] = useState([
    { recommendationImg : img , name : "The Pyramids" , reting : "4.5" , adress : "Giza"} , 
    { recommendationImg : img1 , name : "The Citadel of Saladin" , reting : "4.5" , adress : "Cairo"} , 
    { recommendationImg : img2 , name : "Karnak Temple" , reting : "4.5" , adress : "Luxor"} , 
    { recommendationImg : img3 , name : " Library of Alexandria" , reting : "4.5" , adress : "Alexandria"} , 
  ])


  return <>
  
  <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Recommendation</h2>
    <Swiper
       spaceBetween={50}
      slidesPerView={1}
      breakpoints={{
        750 : {
          slidesPerView : 2 , 
          spaceBetween: 30,
        } ,

        1024: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
      }}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      
        {recommendationAll.map((item , idx)=>{
          return <SwiperSlide key={idx}>
          
          <div  className=' shadow-md shadow-black/10 max-sm:w-[80%] max-sm:m-auto  border border-gray-200 rounded-2xl p-2 py-5 my-7 mx-1 text-center hover:scale-[1.03] cursor-pointer  transition-all decoration-2'>
          <figure className=' flex justify-center items-center p-2 '>
            <img className='w-full' src={item.recommendationImg} alt="" />
          </figure>
          <figcaption className=' p-2 flex flex-col'>
            <div className='flex justify-between'>
                <h2>{item.name}</h2>
                <span className=' flex items-center gap-x-0.5'> 
                  <Star className="text-[#FACC15]" fill='#FACC15' size={20}/> {item.reting}</span>
            </div>
            
              <p className=' flex justify-star text-gray-400'><MapPin size={18} />{item.adress}</p>
          </figcaption>
        </div> 
          
          </SwiperSlide>
        })}
      
      
    </Swiper>
         
    </div>
  
  
  </>
}




