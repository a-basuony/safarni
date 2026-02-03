import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import pic from "@/assets/car2.png"
import { useNavigate } from 'react-router-dom';

interface CarCardProps {
  title: string
  transmission: string
  seats: number
  fuelType: string
  className?: string
}

export function CarCard({
  title = "Volvo XC40",
  transmission = "Automatic",
  seats = 5,
  fuelType = "Petrol",

}: CarCardProps) {
    const navigate = useNavigate();
  return (
    <Card className={cn(" p-6 bg-white shadow-[0_0_15px_rgba(0,0,0,0.1),0_0_5px_rgba(0,0,0,0.05)] border-none rounded-3xl ")}>
      <div className="space-y-6">
        <div className="grid grid-cols-2 items-center">
        <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
        <img 
          src={pic} 
          alt="Car" 
          className=" object-cover drop-shadow-2xl rotate-y-180"
        />    
        </div>
        {/* Features Row */}
        <div className="flex items-center justify-between gap-6 text-slate-500 text-base mr-40">
          <span>{transmission}</span>
          <div className="flex items-center gap-2"> 
            <Separator orientation="vertical" className="h-4 bg-gray-200" />
            <span>{seats} seats</span>
          </div>
          <div className="flex items-center gap-2">
                <Separator orientation="vertical" className="h-4 bg-gray-200" />
                <span>{fuelType}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 pt-4 ">
          <Button className="flex-1 bg-[#1e40af] hover:bg-[#1e3a8a] text-white font-bold h-14 rounded-xl text-lg hover:scale-105">
            Rent Now
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate(`/car-details`)}
            className=" flex-1 border-[#1e40af] text-[#1e40af] hover:bg-blue-50 font-bold h-14 rounded-xl bg-transparent text-lg hover:scale-105"

          >
            Detail
          </Button>
        </div>
      </div>
    </Card>
  )
}
export default CarCard