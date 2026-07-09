import { Suspense, lazy } from "react";
import { Header } from "../features/header/Header";
import { Footer } from "../features/footer/Footer";
import { HeroSection } from "../features/hero/HeroSection";
import { TripSearchForm } from "../features/trip-search/TripSearchForm";

// Lazy load below-the-fold components
const PopularDestinations = lazy(() => import("../features/destinations/PopularDestinations").then(module => ({ default: module.PopularDestinations })));
const FeaturedPackages = lazy(() => import("../features/packages/FeaturedPackages").then(module => ({ default: module.FeaturedPackages })));
const WhyChooseUs = lazy(() => import("../features/why-choose-us/WhyChooseUs").then(module => ({ default: module.WhyChooseUs })));
const TestimonialsSection = lazy(() => import("../features/testimonials/TestimonialsSection").then(module => ({ default: module.TestimonialsSection })));
const TravelGallery = lazy(() => import("../features/gallery/TravelGallery").then(module => ({ default: module.TravelGallery })));
const FAQSection = lazy(() => import("../features/faq/FAQSection").then(module => ({ default: module.FAQSection })));
const NewsletterSubscription = lazy(() => import("../features/newsletter/NewsletterSubscription").then(module => ({ default: module.NewsletterSubscription })));

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      <Header />
      <main className="flex-grow">
        {/* Above the fold (eagerly loaded) */}
        <HeroSection />
        <TripSearchForm />
        
        {/* Below the fold (lazy loaded) */}
        <Suspense fallback={<div className="h-64 flex items-center justify-center text-slate-400">Loading...</div>}>
          <PopularDestinations />
          <FeaturedPackages />
          <WhyChooseUs />
          <TestimonialsSection />
          <TravelGallery />
          <FAQSection />
          <NewsletterSubscription />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;

