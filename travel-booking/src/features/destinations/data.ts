export interface Destination {
  id: string;
  name: string;
  country: string;
  imageUrl: string;
  rating: number;
}

export const mockDestinations: Destination[] = [
  {
    id: "d1",
    name: "Santorini",
    country: "Greece",
    imageUrl: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
  },
  {
    id: "d2",
    name: "Kyoto",
    country: "Japan",
    imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
  },
  {
    id: "d3",
    name: "Machu Picchu",
    country: "Peru",
    imageUrl: "https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
  },
  {
    id: "d4",
    name: "Banff",
    country: "Canada",
    imageUrl: "https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
  }
];
