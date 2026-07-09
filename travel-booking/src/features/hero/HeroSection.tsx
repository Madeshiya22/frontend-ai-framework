import { motion, type Variants } from "framer-motion";
import { Button } from "../../shared/ui/Button";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center bg-slate-950 text-white overflow-hidden">
      {/* Background Image Overlay */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')" }}
        role="img"
        aria-label="Beautiful scenic mountains and lake"
      />
      
      {/* Premium Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/50 to-transparent" />
      
      {/* Content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 container mx-auto px-4 sm:px-6 text-center space-y-6 md:space-y-8 mt-12 md:mt-16"
      >
        <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-white max-w-5xl mx-auto leading-[1.1] drop-shadow-2xl">
          Discover Your Next <span className="text-gradient block sm:inline mt-2 sm:mt-0">Great Adventure</span>
        </motion.h1>
        <motion.p variants={itemVariants} className="text-base sm:text-lg md:text-2xl text-slate-200 max-w-3xl mx-auto font-light tracking-wide drop-shadow-md px-2 md:px-0">
          Explore breathtaking destinations, exclusive travel packages, and unforgettable experiences curated just for you.
        </motion.p>
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 md:pt-8 w-full max-w-md mx-auto sm:max-w-none">
          <Button size="lg" variant="primary" className="w-full sm:w-auto text-base sm:text-lg px-8 md:px-10 py-5 md:py-6">
            Explore Destinations
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-10 py-6 text-white border-white/30 hover:bg-white/10 backdrop-blur-sm">
            View Packages
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}



