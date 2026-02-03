// import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { ChevronLeft } from 'lucide-react';
import  FavoriteCards  from "@/component/cards/FavoriteCard"
import { useNavigate } from 'react-router-dom';

function Favorite() {
    const navigate = useNavigate();
  return (
    <div className="p-7">
          {/* <div className="flex h-screen justify-center items-center flex-col gap-5">
            <h1>Your favorite!</h1>
            <h3>Add your favorite to find it easily</h3> 
             
        </div> */}
      <div className="relative flex items-center justify-center ">
        <Button onClick={() => navigate(-1)} className="rounded-full bg-gray-100 absolute left-8 w-10 h-10"  size="icon" >
            <ChevronLeft/>
        </Button>
        <p className="font-poppins text-3xl">Favorite</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 p-5">
        <FavoriteCards title="dasljkd" price={5} rating={5} type="asld" />
        <FavoriteCards title="dasljkd" price={5} rating={5} type="asld" />
        <FavoriteCards title="dasljkd" price={5} rating={5} type="asld" />
        <FavoriteCards title="dasljkd" price={5} rating={5} type="asld" />
        <FavoriteCards title="dasljkd" price={5} rating={5} type="asld" />
        <FavoriteCards title="dasljkd" price={5} rating={5} type="asld" />
        <FavoriteCards title="dasljkd" price={5} rating={5} type="asld" />
        <FavoriteCards title="dasljkd" price={5} rating={5} type="asld" />
      </div>
    </div>
  )
}
export default Favorite;
