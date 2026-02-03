import {SearchIcon, ChevronLeft} from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Button } from "@/components/ui/button"
import ModelCard from "@/component/cards/ModelCard"
import CarCard from "@/component/cards/CarCard"
import { useNavigate } from 'react-router-dom';

export default function CarsBooking() {
    const navigate = useNavigate();
  return (
    <div className="p-7">
        <div className="relative flex items-center justify-center">
            <Button onClick={() => navigate(-1)} className="rounded-full bg-gray-100 absolute left-8 w-10 h-10"  >
                <ChevronLeft />
            </Button>
            <InputGroup className="w-3/4 border-gray-200">
                <InputGroupInput placeholder="Search..." className="font-poppins" />
                <InputGroupAddon>
                <SearchIcon color="#9CA3AF" />
                </InputGroupAddon>
            </InputGroup>
        </div>
        <div className="pl-8 pt-8 space-y-2.5">
            <h1 className="text-2xl font-medium font-poppins">Brands</h1>
            <div className="flex space-x-5 overflow-x-auto scrollbar-hide pb-2 no-scrollbar">
            <ModelCard/>
            <ModelCard/>
            <ModelCard/>
            <ModelCard/>
            <ModelCard/>
            <ModelCard/>
            <ModelCard/>
            <ModelCard/>
            </div>
        </div>
        <div className="pl-8 pt-5 space-y-2.5">
            <h1 className="text-2xl font-medium font-poppins">Popular Cars</h1>
            <div className=" grid grid-cols-1 lg:grid-cols-2 gap-7 ">
                <CarCard   title = "Volvo XC40"
                            transmission = "Automatic"
                            seats = {5}
                            fuelType = "Petrol"
                />
                <CarCard   title = "GLA 250 SUV"
                            transmission = "Automatic"
                            seats = {5}
                            fuelType = "Petrol"
                />
                <CarCard   title = "Mazda CX-30"
                            transmission = "Automatic"
                            seats = {5}
                            fuelType = "Petrol"
                />
                <CarCard   title = "S 500 Sedan"
                            transmission = "Automatic"
                            seats = {5}
                            fuelType = "Petrol"
                />

            </div>
        </div>
    </div>
  )
}
