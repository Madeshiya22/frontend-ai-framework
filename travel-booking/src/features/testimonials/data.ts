export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatarUrl: string;
}

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
