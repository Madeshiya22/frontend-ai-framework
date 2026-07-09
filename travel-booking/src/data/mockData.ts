export interface Destination {
  id: string;
  name: string;
  country: string;
  imageUrl: string;
  rating: number;
}

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

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatarUrl: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
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
    imageUrl: "https://images.unsplash.com/photo-1542051812871-757500829871?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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

export const mockTestimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Sarah Jenkins",
    role: "Solo Traveler",
    content: "My trip to Japan was perfectly organized. TravelExplore took care of every detail, allowing me to just enjoy the experience.",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
  },
  {
    id: "t2",
    name: "The Miller Family",
    role: "Family Vacation",
    content: "We've used them for three family vacations now. The resort selections are always top-notch and exactly what we asked for.",
    avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
  },
  {
    id: "t3",
    name: "David Chen",
    role: "Adventure Enthusiast",
    content: "The Inca Trail trek was challenging but incredibly rewarding. The local guides they partnered with were exceptional.",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
  }
];

export const mockFAQs: FAQ[] = [
  {
    id: "f1",
    question: "Do you offer travel insurance?",
    answer: "Yes, comprehensive travel insurance is available as an add-on during the checkout process for all our packages.",
  },
  {
    id: "f2",
    question: "Can I customize a travel package?",
    answer: "Absolutely! Our travel experts can help you tailor any existing package to better suit your preferences and dates.",
  },
  {
    id: "f3",
    question: "What is your cancellation policy?",
    answer: "You can cancel for a full refund up to 30 days before departure. Cancellations within 30 days are subject to a fee.",
  },
  {
    id: "f4",
    question: "Are flights included in the packages?",
    answer: "Most of our standard packages do not include international flights to allow you flexibility, but we can book them for you upon request.",
  }
];
