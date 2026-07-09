import { Star, MapPin } from "lucide-react";
import { mockDestinations } from "../../data/mockData";
import { Card, CardContent } from "../ui/Card";

export function PopularDestinations() {
  return (
    <section className="py-20 bg-slate-50" id="destinations">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Popular Destinations</h2>
            <p className="text-slate-600">
              Explore the most sought-after locations by our community of global travelers.
            </p>
          </div>
          <a href="#" className="text-primary-600 font-medium hover:text-primary-700 mt-4 md:mt-0 transition-colors">
            View all destinations &rarr;
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockDestinations.map((destination) => (
            <Card key={destination.id} className="overflow-hidden group cursor-pointer border-none shadow-md hover:shadow-lg transition-all">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={destination.imageUrl} 
                  alt={destination.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-medium text-slate-700">{destination.rating}</span>
                </div>
              </div>
              <CardContent className="p-5">
                <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-primary-600 transition-colors">
                  {destination.name}
                </h3>
                <div className="flex items-center text-slate-500 text-sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  {destination.country}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
