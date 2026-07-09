import { Star, MapPin, Clock } from "lucide-react";
import { mockPackages } from "./data";
import { Card, CardContent, CardFooter } from "../../shared/ui/Card";
import { Button } from "../../shared/ui/Button";

export function FeaturedPackages() {
  return (
    <section className="py-20 bg-white" id="packages">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Featured Travel Packages</h2>
          <p className="text-slate-600">
            Handpicked itineraries designed to give you the ultimate travel experience without the stress of planning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockPackages.map((pkg) => (
            <Card key={pkg.id} className="group flex flex-col border-0 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={pkg.imageUrl} 
                  alt={pkg.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-slate-900 px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  ${pkg.price}
                </div>
              </div>
              <CardContent className="p-8 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors">{pkg.title}</h3>
                  <div className="flex items-center gap-1 bg-primary-100 text-primary-700 px-2.5 py-1 rounded-full text-xs font-bold shadow-sm">
                    <Star className="h-3.5 w-3.5 fill-primary-600" />
                    <span>{pkg.rating}</span>
                  </div>
                </div>
                
                <div className="space-y-3 mt-4 text-sm text-slate-600 font-medium">
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-100 p-2 rounded-full">
                      <MapPin className="h-4 w-4 text-primary-500" />
                    </div>
                    <span>{pkg.destination}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-100 p-2 rounded-full">
                      <Clock className="h-4 w-4 text-primary-500" />
                    </div>
                    <span>{pkg.duration}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-8 pt-0 flex items-center justify-between border-t border-slate-100/50 mt-4">
                <p className="text-sm text-slate-500 font-medium">{pkg.reviews} reviews</p>
                <Button variant="ghost" size="sm" className="text-primary-600 font-bold hover:bg-primary-50 rounded-full px-6">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

