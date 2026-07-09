export interface Package {
  id: string;
  title: string;
  destination: string;
  duration: string;
  price: number;
  imageUrl: string;
  rating: number;
  reviews: number;
}

export const mockPackages: Package[] = [
  {
    id: "p1",
    title: "Greek Islands Explorer",
    destination: "Athens & Santorini",
    duration: "7 Days",
    price: 1299,
    imageUrl: "https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviews: 124,
  },
  {
    id: "p2",
    title: "Taste of Japan",
    destination: "Tokyo & Kyoto",
    duration: "10 Days",
    price: 2499,
    imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviews: 89,
  },
  {
    id: "p3",
    title: "Inca Trail Adventure",
    destination: "Cusco & Machu Picchu",
    duration: "5 Days",
    price: 999,
    imageUrl: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    reviews: 215,
  }
];
