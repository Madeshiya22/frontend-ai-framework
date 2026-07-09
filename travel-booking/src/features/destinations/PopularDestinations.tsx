import { motion, type Variants } from "framer-motion";
import { Star, MapPin } from "lucide-react";
import { mockDestinations } from "./data";
import { Card } from "../../shared/ui/Card";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

export function PopularDestinations() {
  return (
    <section className="py-12 md:py-20 lg:py-24 bg-slate-50" id="destinations">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12"
        >
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Popular Destinations</h2>
            <p className="text-slate-600">
              Explore the most sought-after locations by our community of global travelers.
            </p>
          </div>
          <a href="#" className="text-primary-600 font-medium hover:text-primary-700 mt-4 md:mt-0 transition-colors">
            View all destinations &rarr;
          </a>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {mockDestinations.map((destination) => (
            <Card 
              key={destination.id}
              variants={itemVariants}
              className="overflow-hidden group cursor-pointer border-0 shadow-lg"
            >
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={destination.imageUrl} 
                  alt={destination.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                  <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                  <span className="text-sm font-bold text-slate-800">{destination.rating}</span>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-2xl font-bold mb-1 drop-shadow-md">
                    {destination.name}
                  </h3>
                  <div className="flex items-center text-slate-200 text-sm font-medium drop-shadow-sm">
                    <MapPin className="h-4 w-4 mr-1.5 text-primary-400" />
                    {destination.country}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
}





