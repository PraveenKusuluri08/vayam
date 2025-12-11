import HeroBanner from "@/components/HeroBanner";
import CategorySection from "@/components/CategorySection";
import DealsSection from "@/components/DealsSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import WhyChooseUs from "@/components/WhyChooseUs";
import TestimonialsSection from "@/components/TestimonialsSection";
import AboutSection from "@/components/AboutSection";
import ProblemSolutionSection from "@/components/ProblemSolutionSection";
import CallToActionSection from "@/components/CallToActionSection";

export default function Home() {
  return (
    <>
      {/* Hero Banner with Carousel - Amazon Style */}
      <HeroBanner />
      
      {/* Category Navigation - Amazon Style */}
      <CategorySection />
      
      {/* Featured/Deals Section - Amazon Style */}
      <DealsSection />
      
      {/* All Products Grid - Amazon Style */}
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
    </>
  );
}
