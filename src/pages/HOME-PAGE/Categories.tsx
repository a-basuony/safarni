import { useState } from "react"
// import axios from "axios";
// import { useQuery } from "@tanstack/react-query";

// type Category = {
//   icon_url : string ,
//   id : number ,
//   name : string
// }

export default function Categories() {

    const [allCategories] =useState([

        { imgCategories : "/images/Frame 10154 (1).png" , nameCategories : "Flight"},
        { imgCategories : "/images/Frame 10154.png" , nameCategories : "Cars"},
        { imgCategories : "/images/Ellipse 25.png" , nameCategories : "Tours"},
        { imgCategories : "/images/Frame 10154 (2).png" , nameCategories : "Hotel"},
    ])

    // async function allCategories() {
    //  return  await axios.get("https://round8-backend-safarni-one.huma-volve.com/api/home")
    // }

    // const { data , isLoading , isError } = useQuery({
    //   queryKey : ["allCategories"] ,
    //   queryFn : allCategories
    //       })

    //   if (isLoading) {
    //     return <p>loading.....</p>
    //   }

    //   if (isError) {
    //     return <p>error.....</p>
    //   }

      // const allData = data?.data.data.categories

      // console.log("data" , allData);
      

  return <>
  
  <div className="container p-5 py-10">
    <h2 className=" text-[20px] md:text-[25px] py-2">Categories</h2>
    <div className="grid grid-cols-4 ">

        {allCategories.map((item , idx)=>{

            return  <div key={idx} className="card p-2 flex flex-col justify-center items-center gap-3 hover:scale-[1.03] cursor-pointer hover:shadow  rounded-lg transition-all decoration-2">
            <img className=" rounded-lg" src={item.imgCategories} alt={item.nameCategories} />
            <h3 className=" text-sm md:text-2xl font-bold text-[#1a56db]">{item.nameCategories}</h3>
          </div>
        })}
          
      

    </div>
  </div>
  
  </>
}
