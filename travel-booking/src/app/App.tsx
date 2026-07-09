import { Header } from "../features/header/Header";
import { Footer } from "../features/footer/Footer";
import { HeroSection } from "../features/hero/HeroSection";
import { TripSearchForm } from "../features/trip-search/TripSearchForm";
import { PopularDestinations } from "../features/destinations/PopularDestinations";
import { FeaturedPackages } from "../features/packages/FeaturedPackages";
import { WhyChooseUs } from "../features/why-choose-us/WhyChooseUs";
import { TestimonialsSection } from "../features/testimonials/TestimonialsSection";
import { TravelGallery } from "../features/gallery/TravelGallery";
import { FAQSection } from "../features/faq/FAQSection";
import { NewsletterSubscription } from "../features/newsletter/NewsletterSubscription";

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

