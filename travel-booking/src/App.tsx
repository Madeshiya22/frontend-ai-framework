import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { HeroSection } from "./components/sections/HeroSection";
import { TripSearchForm } from "./components/sections/TripSearchForm";
import { PopularDestinations } from "./components/sections/PopularDestinations";
import { FeaturedPackages } from "./components/sections/FeaturedPackages";
import { WhyChooseUs } from "./components/sections/WhyChooseUs";
import { TestimonialsSection } from "./components/sections/TestimonialsSection";
import { TravelGallery } from "./components/sections/TravelGallery";
import { FAQSection } from "./components/sections/FAQSection";
import { NewsletterSubscription } from "./components/sections/NewsletterSubscription";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <TripSearchForm />
        <PopularDestinations />
        <FeaturedPackages />
        <WhyChooseUs />
        <TestimonialsSection />
        <TravelGallery />
        <FAQSection />
        <NewsletterSubscription />
      </main>
      <Footer />
    </div>
  );
}

export default App;
