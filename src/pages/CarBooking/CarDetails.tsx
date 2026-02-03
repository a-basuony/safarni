import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import {ChevronLeft, Clock, CalendarRange} from "lucide-react"
import rec from "@/assets/rec.png"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CarDetails = () => {
    const navigate = useNavigate();

  return (
    <div className="p-7 ">
        <Button onClick={() => navigate(-1)} className="rounded-full bg-gray-100 ml-2 w-10 h-10"  >
            <ChevronLeft />
        </Button>

        <div className="flex flex-col lg:flex-row justify-around pl-12 space-x-5 w-full gap-1 h-190">
            {/* car pic 3d */}
            <div className="flex items-center lg:w-1/3">
            <img src={rec} alt="3d model" className="object-fill"/>
            </div>
            {/* car info */}
            <div className="flex justify-center flex-col  gap-3 mt-25 space-y-6 lg:w-1/3">
                <h1 className="font-medium text-gray-900 text-3xl">S 500 Sedan</h1>
                <div className="flex flex-col md:flex-row space-x-2">
                    <div className=" flex flex-col shadow justify-center p-5 space-y-1.5 border-gray-800 rounded-xl w-fit">
                        <p className="flex justify-center text-gray-900 text-2xl">Power</p>
                        <p className="flex justify-center  text-gray-600">429 hp @ 6,100 rpm</p>
                    </div>
                    <div className=" flex-3 shadow items-center p-5 space-y-1.5 border-gray-800 rounded-xl">
                        <p className="flex justify-center text-gray-900 text-2xl">Max Speed</p>
                        <p className="flex justify-center text-gray-600">280 km/h</p>
                    </div>
                    <div className=" flex-3 shadow items-center justify-center p-5 space-y-1.5 border-gray-800 rounded-xl">
                        <p className="flex justify-center text-gray-900 text-2xl">Acceleration</p>
                        <p className="flex justify-center text-gray-600">4.9 sec 0-60 mph</p>
                    </div>
                </div>
                <div className="space-y-4">
                    <h1 className="font-medium text-gray-900 text-3xl"> plan</h1>
                    <div className="space-y-3">
                        <Card
                            className={cn(
                                "group relative flex cursor-pointer items-stretch overflow-hidden transition-all duration-200 border-blue-500 " 
                            )}
                            >
                            <div
                                className={cn(
                                "flex w-24 flex-col items-center justify-center gap-2 p-4 transition-colors bg-blue-50"
                                )}
                            >
                                <Clock className={cn("h-6 w-6 text-blue-600" )} />
                                <span className={cn("text-2xl font-bold text-blue-700")}>${10}</span>
                            </div>

                            <div className="flex flex-1 flex-col justify-center px-6 py-4">
                                <h3 className={cn("text-xl font-medium transition-colors text-gray-900")}>
                                {"Hourly Rent"}
                                </h3>
                                <p className="mt-1 text-gray-500">Best for business appointments</p>
                            </div>
                        </Card>
                        <Card
                            className={cn(
                                "group relative flex cursor-pointer items-stretch overflow-hidden transition-all duration-200 border-gray-300 " 
                            )}
                            >
                            <div
                                className={cn(
                                "flex w-24 flex-col items-center justify-center gap-2 p-4 transition-colors bg-gray-100"
                                )}
                            >
                                <CalendarRange className={cn("h-6 w-6 text-gray-500" )} />
                                <span className={cn("text-2xl font-bold text-gray-500")}>${80}</span>
                            </div>

                            <div className="flex flex-1 flex-col justify-center px-6 py-4">
                                <h3 className={cn("text-xl font-medium transition-colors text-gray-600")}>
                                {"Hourly Rent"}
                                </h3>
                                <p className="mt-1 text-gray-500">Best for business appointments</p>
                            </div>
                        </Card>
                    </div>
                </div>
                <div>
                    <h1 className="text-gray-800 text-[18px]"> Location</h1>
                        <InputGroup className="border-gray-300">
                            <InputGroupInput className="text-gray-500" placeholder="200-298 Clipper St San Francisco" />
                            <InputGroupAddon >
                            <MapPin color="#9CA3AF"/>
                            </InputGroupAddon>
                        </InputGroup>
                </div>
                <Button className=" bg-[#1e40af] hover:bg-[#1e3a8a] text-white font-bold h-14 rounded-xl text-lg hover:scale-105">
                    Pick UP
                </Button>
            </div>
        </div>
    </div>
  )
}

export default CarDetails
