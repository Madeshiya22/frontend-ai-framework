import { Button } from "../../shared/ui/Button";

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center bg-slate-950 text-white overflow-hidden">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')" }}
        role="img"
        aria-label="Beautiful scenic mountains and lake"
      />
      
      {/* Premium Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/50 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center space-y-8 mt-16">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-white max-w-5xl mx-auto leading-[1.1] drop-shadow-2xl">
          Discover Your Next <span className="text-gradient">Great Adventure</span>
        </h1>
        <p className="text-lg md:text-2xl text-slate-200 max-w-3xl mx-auto font-light tracking-wide drop-shadow-md">
          Explore breathtaking destinations, exclusive travel packages, and unforgettable experiences curated just for you.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Button size="lg" variant="primary" className="w-full sm:w-auto text-lg px-10 py-6">
            Explore Destinations
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-10 py-6 text-white border-white/30 hover:bg-white/10 backdrop-blur-sm">
            View Packages
          </Button>
        </div>
      </div>
    </section>
  );
}

