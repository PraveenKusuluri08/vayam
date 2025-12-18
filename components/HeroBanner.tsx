"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  BadgePercent,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const carouselSlides = [
  {
    id: 1,
    title: "Gold Collection",
    subtitle: "Hallmarked & Certified",
    imageSrc: "/images/products/image_1.jpeg",
    cta: "Shop Gold",
    link: "/categories/gold",
  },
  {
    id: 2,
    title: "Diamond Collection",
    subtitle: "Brilliant & Timeless",
    imageSrc: "/images/products/image_5.jpeg",
    cta: "Shop Diamonds",
    link: "/categories/diamond",
  },
  {
    id: 3,
    title: "Silver Collection",
    subtitle: "Elegant & Versatile",
    imageSrc: "/images/products/image_7.jpeg",
    cta: "Shop Silver",
    link: "/categories/silver",
  },
  {
    id: 4,
    title: "Custom & Corporate",
    subtitle: "Your Brand, Our Craft",
    imageSrc: "/images/products/image_4.jpeg",
    cta: "Explore Custom",
    link: "/categories/custom",
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
    <section className="relative h-[520px] md:h-[620px] lg:h-[680px] overflow-hidden bg-black">
      {/* Sub‑header promo strip */}
      <div className="absolute top-0 inset-x-0 z-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-md border border-white/20">
            <BadgePercent className="w-3 h-3 text-gold-300" />
            <p className="text-xs text-white">
              <span className="font-semibold text-gold-200">BUY 2 GET 10% OFF</span> · Free Shipping
            </p>
          </div>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative h-full pt-10 md:pt-12">
        {carouselSlides.map((slide, index) => (
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, x: index === currentSlide ? 0 : index < currentSlide ? -100 : 100 }}
            animate={{
              opacity: index === currentSlide ? 1 : 0,
              x: index === currentSlide ? 0 : index < currentSlide ? -100 : 100,
            }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <div className="relative w-full h-full">
              {/* Background image */}
              <motion.div
                animate={{
                  scale: index === currentSlide ? 1.1 : 1,
                }}
                transition={{ duration: 8, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={slide.imageSrc}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  className="object-cover"
                />
              </motion.div>
              {/* Animated Gradient overlay - Enhanced */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/40"
                animate={{
                  opacity: index === currentSlide ? 1 : 0,
                }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Animated shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                animate={{
                  x: index === currentSlide ? ["-200%", "200%"] : "-200%",
                }}
                transition={{
                  x: {
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeInOut",
                  },
                }}
              />

              {/* Content */}
              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <motion.h1
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{
                      opacity: index === currentSlide ? 1 : 0,
                      y: index === currentSlide ? 0 : 50,
                      scale: index === currentSlide ? 1 : 0.9,
                    }}
                    transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                    className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-4 drop-shadow-2xl"
                  >
                    {slide.title}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{
                      opacity: index === currentSlide ? 1 : 0,
                      y: index === currentSlide ? 0 : 30,
                    }}
                    transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                    className="text-lg md:text-xl lg:text-2xl text-white/95 mb-10 font-light tracking-wide"
                  >
                    {slide.subtitle}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{
                      opacity: index === currentSlide ? 1 : 0,
                      y: index === currentSlide ? 0 : 30,
                      scale: index === currentSlide ? 1 : 0.9,
                    }}
                    transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                  >
                    <Link href={slide.link}>
                      <motion.button
                        whileHover={{ scale: 1.08, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
                        whileTap={{ scale: 0.95 }}
                        className="px-10 py-5 bg-white text-navy-900 rounded-full font-bold text-base md:text-lg shadow-2xl hover:shadow-3xl transition-all flex items-center space-x-3 mx-auto group"
                      >
                        <span>{slide.cta}</span>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <ArrowRight className="w-5 h-5" />
                        </motion.div>
                      </motion.button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Navigation Arrows - Enhanced */}
      <motion.button
        onClick={goToPrevious}
        whileHover={{ scale: 1.15, x: -3 }}
        whileTap={{ scale: 0.9 }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-14 h-14 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center transition-all shadow-2xl border border-white/30"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-7 h-7 text-white" />
      </motion.button>
      <motion.button
        onClick={goToNext}
        whileHover={{ scale: 1.15, x: 3 }}
        whileTap={{ scale: 0.9 }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-14 h-14 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center transition-all shadow-2xl border border-white/30"
        aria-label="Next slide"
      >
        <ChevronRight className="w-7 h-7 text-white" />
      </motion.button>

      {/* Dots Indicator - Enhanced */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex space-x-3">
        {carouselSlides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              width: index === currentSlide ? 32 : 12,
              opacity: index === currentSlide ? 1 : 0.6,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`h-3 rounded-full transition-all shadow-lg ${
              index === currentSlide
                ? "bg-white"
                : "bg-white/60 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
