import HeroBanner from "@/components/HeroBanner";
import CategorySection from "@/components/CategorySection";
import NewArrivalsSection from "@/components/NewArrivalsSection";
import BestSellerSection from "@/components/BestSellerSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import AnimatedOffers from "@/components/AnimatedOffers";
import WhyChooseUs from "@/components/WhyChooseUs";
import TestimonialsSection from "@/components/TestimonialsSection";
import AboutSection from "@/components/AboutSection";
import ProblemSolutionSection from "@/components/ProblemSolutionSection";
import CallToActionSection from "@/components/CallToActionSection";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-transparent">
      {/* Hero Banner with Carousel */}
      <HeroBanner />
      
      {/* Animated Offers Section - Swashaa Style */}
      <AnimatedOffers />
      
      {/* Category Navigation */}
      <CategorySection />
      
      {/* New Arrivals - Gold */}
      <NewArrivalsSection category="gold" title="GOLD" />
      
      {/* New Arrivals - Diamond */}
      <NewArrivalsSection category="diamond" title="DIAMOND" />
      
      {/* New Arrivals - Silver */}
      <NewArrivalsSection category="silver" title="SILVER" />
      
      {/* Best Seller Collection */}
      <BestSellerSection />
      
      {/* All Products Grid */}
      <FeaturedProducts />
      
      {/* Why Choose Us Section */}
      <WhyChooseUs />
      
      {/* About Section */}
      <AboutSection />
      
      {/* Problem Solution Section */}
      <ProblemSolutionSection />
      
      {/* Testimonials */}
      <TestimonialsSection />
      
      {/* Call to Action */}
      <CallToActionSection />
    </div>
  );
}
