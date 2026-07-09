import { Button } from "../ui/Button";

export function HeroSection() {
  return (
    <section className="relative w-full h-[600px] flex items-center justify-center bg-slate-900 text-white overflow-hidden">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')" }}
        role="img"
        aria-label="Beautiful scenic mountains and lake"
      />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-tight">
          Discover Your Next Great Adventure
        </h1>
        <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto">
          Explore breathtaking destinations, exclusive travel packages, and unforgettable experiences curated just for you.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Button size="lg" variant="primary">
            Explore Destinations
          </Button>
          <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
            View Packages
          </Button>
        </div>
      </div>
    </section>
  );
}
