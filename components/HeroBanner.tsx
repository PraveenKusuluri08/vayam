"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const carouselSlides = [
  {
    id: 1,
    title: "We've mastered the new language of",
    subtitle: "Incentivisation & Appreciation",
    description: "It's like casting your brand in Gold, literally!",
    image: "bg-gradient-to-br from-gold-400 to-gold-600",
    cta: "Explore Collections",
    link: "/#products",
  },
  {
    id: 2,
    title: "Premium Gold Collection",
    subtitle: "Elegant designs that speak luxury",
    description: "Discover our handcrafted gold jewelry and accessories",
    image: "bg-gradient-to-br from-gold-400 to-gold-600",
    cta: "Shop Gold",
    link: "/categories/gold",
  },
  {
    id: 3,
    title: "Brilliant Diamond Collection",
    subtitle: "Sparkle with every moment",
    description: "Exquisite diamonds for your special occasions",
    image: "bg-gradient-to-br from-purple-400 to-purple-600",
    cta: "Shop Diamonds",
    link: "/categories/diamond",
  },
  {
    id: 4,
    title: "Elegant Silver Collection",
    subtitle: "Timeless beauty in silver",
    description: "Premium silver products and dinnerware sets",
    image: "bg-gradient-to-br from-silver-400 to-silver-600",
    cta: "Shop Silver",
    link: "/categories/silver",
  },
];

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  return (
    <section className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden bg-gradient-to-br from-navy-900 to-navy-800">
      {/* Carousel Container */}
      <div className="relative h-full">
        {carouselSlides.map((slide, index) => (
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, x: index === currentSlide ? 0 : index < currentSlide ? -100 : 100 }}
            animate={{
              opacity: index === currentSlide ? 1 : 0,
              x: index === currentSlide ? 0 : index < currentSlide ? -100 : 100,
            }}
            transition={{ duration: 0.5 }}
            className={`absolute inset-0 ${slide.image} flex items-center`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: index === currentSlide ? 1 : 0, y: index === currentSlide ? 0 : 30 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="flex items-center space-x-2 mb-4"
                >
                  <Sparkles className="w-6 h-6 text-white" />
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: index === currentSlide ? 1 : 0, y: index === currentSlide ? 0 : 30 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4"
                >
                  {slide.title}
                  {slide.subtitle && (
                    <>
                      <br />
                      <span className="text-gold-200">{slide.subtitle}</span>
                    </>
                  )}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: index === currentSlide ? 1 : 0, y: index === currentSlide ? 0 : 30 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-lg md:text-xl text-white/90 mb-8"
                >
                  {slide.description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: index === currentSlide ? 1 : 0, y: index === currentSlide ? 0 : 30 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <Link href={slide.link}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-white text-navy-900 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-shadow flex items-center space-x-2"
                    >
                      <span>{slide.cta}</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
        {carouselSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
