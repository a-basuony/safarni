export type PlaceCategory = "all" | "restaurant" | "hotel" | "tourist" | "home";

export interface Place {
  id: string;
  name: string;
  category: PlaceCategory;
  lat: number;
  lng: number;
  rating?: number;
  priceLevel?: string;
  image?: string;
  address?: string;
}

export interface MapState {
  center: [number, number];
  zoom: number;
}
