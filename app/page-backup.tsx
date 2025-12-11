// Backup of original page.tsx
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ProblemSolutionSection from "@/components/ProblemSolutionSection";
import ProductShowcase from "@/components/ProductShowcase";
import WhyVayamSection from "@/components/WhyVayamSection";
import CallToActionSection from "@/components/CallToActionSection";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <AboutSection />
      <ProblemSolutionSection />
      <ProductShowcase />
      <WhyVayamSection />
      <CallToActionSection />
    </div>
  );
}


