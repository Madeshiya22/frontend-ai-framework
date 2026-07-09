import { Star, MapPin, Clock } from "lucide-react";
import { mockPackages } from "../../data/mockData";
import { Card, CardContent, CardFooter } from "../ui/Card";
import { Button } from "../ui/Button";

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
            <Card key={pkg.id} className="flex flex-col overflow-hidden border-slate-200 shadow-md hover:shadow-xl transition-shadow">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={pkg.imageUrl} 
                  alt={pkg.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <CardContent className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-slate-900">{pkg.title}</h3>
                  <div className="flex items-center gap-1 bg-primary-50 text-primary-700 px-2 py-1 rounded-md text-xs font-semibold">
                    <Star className="h-3 w-3 fill-primary-600" />
                    <span>{pkg.rating}</span>
                  </div>
                </div>
                
                <div className="space-y-2 mt-4 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    <span>{pkg.destination}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-slate-400" />
                    <span>{pkg.duration}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex items-center justify-between border-t border-slate-100 mt-4">
                <div>
                  <p className="text-sm text-slate-500">Starting from</p>
                  <p className="text-xl font-bold text-primary-600">${pkg.price}</p>
                </div>
                <Button variant="primary" size="sm">
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
