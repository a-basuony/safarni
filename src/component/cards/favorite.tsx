import { Heart, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface TourCardProps {
  title: string
  image: string
  rating: number
  type: string
  price: number
  isFavorite?: boolean
  className?: string
}

export function TourCard({ title, image, rating, type, price, isFavorite = false, className }: TourCardProps) {
  return (
    <Card className={cn("overflow-hidden border-none shadow-lg transition-all hover:shadow-xl rounded-3xl", className)}>
      <CardContent className="p-4 space-y-4">
        {/* Image Section */}
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
          {/* <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          /> */}
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-3 right-3 rounded-full bg-white/90 hover:bg-white shadow-sm z-10 transition-transform active:scale-90"
          >
            <Heart className={cn("h-5 w-5", isFavorite ? "fill-red-500 text-red-500" : "text-gray-400")} />
          </Button>
        </div>

        {/* Info Section */}
        <div className="space-y-3 px-1">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm font-medium">{type}</span>
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="text-gray-700 font-bold text-sm">{rating.toFixed(1)}</span>
            </div>
          </div>

          <h3 className="text-xl font-bold text-slate-900 leading-tight">{title}</h3>

          <div className="text-gray-500 font-medium">
            From <span className="text-blue-600 font-extrabold text-lg">${price}</span> Per Person
          </div>
        </div>
      </CardContent>
    </Card>
  )
}