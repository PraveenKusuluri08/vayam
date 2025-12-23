"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
  {
    id: "gold",
    name: "Gold Collection",
    subtitle: "Necklaces · Rings · Kada",
    image: "/images/products/image_1.jpeg",
    link: "/categories/gold",
  },
  {
    id: "diamond",
    name: "Diamond Collection",
    subtitle: "Earrings · Pendants",
    image: "/images/products/image_5.jpeg",
    link: "/categories/diamond",
  },
  {
    id: "silver",
    name: "Silver Collection",
    subtitle: "Idols · Dinnerware · Decor",
    image: "/images/products/image_7.jpeg",
    link: "/categories/silver",
  },
  {
    id: "custom",
    name: "Custom & Corporate",
    subtitle: "Logo jewellery · Gifts",
    image: "/images/products/image_4.jpeg",
    link: "/categories/custom",
  },
];

export default function CategorySection() {
  const [currentIndex, setCurrentIndex] = useState(4); // Start at middle
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Duplicate categories for infinite scroll (like Mia website)
  const duplicatedCategories = [...categories, ...categories, ...categories];
  const totalCards = duplicatedCategories.length;
  const startIndex = categories.length;

  const scrollLeft = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev - 1;
      if (newIndex < 0) return totalCards - 1;
      return newIndex;
    });
  };

  const scrollRight = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev + 1;
      if (newIndex >= totalCards) return 0;
      return newIndex;
    });
  };

  // Auto-scroll functionality - smooth automatic scrolling
  useEffect(() => {
    if (isPaused) return;

    const autoScrollInterval = setInterval(() => {
      setCurrentIndex((prev) => {
        const newIndex = prev + 1;
        if (newIndex >= totalCards) return 0;
        return newIndex;
      });
    }, 4500); // Auto-scroll every 4.5 seconds

    return () => clearInterval(autoScrollInterval);
  }, [totalCards, isPaused]);

  // Reset to middle when reaching edges
  useEffect(() => {
    if (currentIndex === 0) {
      const timer = setTimeout(() => setCurrentIndex(startIndex), 300);
      return () => clearTimeout(timer);
    } else if (currentIndex === totalCards - 1) {
      const timer = setTimeout(() => setCurrentIndex(startIndex - 1), 300);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, startIndex, totalCards]);

  // Get visible cards with proper spacing
  const getVisibleCards = () => {
    const visible = [];
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + totalCards) % totalCards;
      visible.push({ 
        category: duplicatedCategories[index], 
        originalIndex: index % categories.length, 
        offset: i,
        globalIndex: index
      });
    }
    return visible;
  };

  const visibleCards = getVisibleCards();
  const leftmostCard = visibleCards.find(card => card.offset === -2);
  const rightmostCard = visibleCards.find(card => card.offset === 2);

  return (
    <section className="py-16 md:py-20 border-b border-gray-200/50 relative overflow-hidden bg-transparent">
      <div className="max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 tracking-tight">
            Shop by Collection
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            Discover our curated selections
          </p>
        </motion.div>

        {/* Carousel Container - Mia's Style */}
        <div 
          className="relative w-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Arrows - Dark background style */}
          <motion.button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              scrollLeft();
            }}
            whileHover={{ scale: 1.05, backgroundColor: "rgb(31 41 55)" }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25, mass: 0.5 }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center shadow-2xl border-2 border-gray-800 cursor-pointer"
            aria-label="Previous category"
          >
            <ChevronLeft className="w-7 h-7 text-white" />
          </motion.button>
          <motion.button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              scrollRight();
            }}
            whileHover={{ scale: 1.05, backgroundColor: "rgb(31 41 55)" }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25, mass: 0.5 }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center shadow-2xl border-2 border-gray-800 cursor-pointer"
            aria-label="Next category"
          >
            <ChevronRight className="w-7 h-7 text-white" />
          </motion.button>

          {/* Cards Container - Centered with proper spacing */}
          <div className="relative overflow-hidden h-[550px] md:h-[650px] lg:h-[700px] flex items-center justify-center px-20 md:px-24 lg:px-32">
            <div className="relative w-full h-full flex items-center justify-center">
              <AnimatePresence mode="popLayout" initial={false}>
                {visibleCards.map(({ category, originalIndex, offset, globalIndex }) => {
                  const isActive = offset === 0;
                  const isVisible = Math.abs(offset) <= 2;

                  if (!isVisible) return null;

                  // Calculate position for smooth floating effect with proper spacing
                  const cardWidth = 420;
                  const gap = 60; // Increased gap to prevent overlap
                  const xPosition = offset * (cardWidth + gap);

                  // Enhanced fade effect - more visible differences with proper z-index
                  let opacity = 1;
                  let scale = 1;
                  let zIndex = 10;
                  
                  if (offset === 0) {
                    opacity = 1;
                    scale = 1;
                    zIndex = 30; // Active card on top
                  } else if (Math.abs(offset) === 1) {
                    opacity = 0.7;
                    scale = 0.9;
                    zIndex = 20; // Side cards in middle
                  } else if (Math.abs(offset) === 2) {
                    opacity = 0.55;
                    scale = 0.8;
                    zIndex = 10; // Outer cards at bottom
                  }

                  // Higher z-index for cards on the right side to prevent overlap issues
                  if (offset > 0) {
                    zIndex += offset;
                  }

                  return (
                    <motion.div
                      key={`${category.id}-${globalIndex}`}
                      initial={false}
                      animate={{
                        x: xPosition,
                        scale: scale,
                        rotate: isActive ? 0 : offset * 2.5,
                        opacity: opacity,
                        y: isActive ? 0 : Math.abs(offset) * 12,
                        zIndex: zIndex,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 30,
                        mass: 1,
                        restDelta: 0.001,
                      }}
                      className="absolute flex-shrink-0 pointer-events-auto"
                      style={{
                        left: '50%',
                        marginLeft: `-${cardWidth / 2}px`,
                        zIndex: zIndex,
                      }}
                    >
                      <Link href={category.link} className="block w-full h-full">
                        <motion.div
                          whileHover={{
                            scale: isActive ? 1.02 : 0.96,
                            y: isActive ? -8 : 0,
                            rotate: isActive ? 0 : offset * 1.5,
                          }}
                          transition={{ 
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                            mass: 0.8,
                          }}
                          className={`relative w-[380px] md:w-[420px] lg:w-[460px] h-[500px] md:h-[580px] lg:h-[640px] cursor-pointer rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 bg-white group ${
                            isActive ? 'ring-4 ring-gold-500 ring-opacity-70 shadow-3xl' : 'shadow-lg'
                          }`}
                          style={{
                            transformStyle: 'preserve-3d',
                          }}
                        >

                          <div className="relative w-full h-full">
                            <motion.div
                              whileHover={{ scale: 1.08 }}
                              transition={{ duration: 0.5, ease: "easeOut" }}
                              className="absolute inset-0"
                            >
                              <Image
                                src={category.image}
                                alt={category.name}
                                fill
                                priority={isActive}
                                className="object-cover"
                                sizes="(max-width: 768px) 380px, (max-width: 1024px) 420px, 460px"
                              />
                            </motion.div>

                            {/* Gradient Overlay - Enhanced for better contrast */}
                            <div className={`absolute inset-0 transition-opacity duration-300 ${
                              isActive 
                                ? 'bg-gradient-to-t from-black/90 via-black/70 to-black/50' 
                                : 'bg-gradient-to-t from-black/95 via-black/80 to-black/60'
                            }`} />

                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col justify-end p-7 md:p-8 lg:p-10 text-white z-10">
                              <motion.div
                                animate={{
                                  opacity: isActive ? 1 : 0.7,
                                  y: isActive ? 0 : 10,
                                }}
                                transition={{ duration: 0.4 }}
                              >
                                <p className={`text-xs uppercase tracking-[0.2em] mb-3 font-extrabold transition-colors drop-shadow-md ${
                                  isActive ? 'text-gold-400' : 'text-gold-300'
                                }`}>
                                  {category.id}
                                </p>
                                <h3 className={`text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold mb-3 leading-tight transition-opacity drop-shadow-2xl ${
                                  isActive ? 'text-white' : 'text-gray-200'
                                }`}>
                                  {category.name}
                                </h3>
                                <p className={`text-base md:text-lg mb-6 font-semibold transition-opacity drop-shadow-md ${
                                  isActive ? 'text-gray-100' : 'text-gray-300'
                                }`}>
                                  {category.subtitle}
                                </p>

                                {/* Explore Button */}
                                <motion.div
                                  className={`inline-flex items-center transition-colors ${
                                    isActive ? 'text-white group-hover:text-gold-300' : 'text-gray-400'
                                  }`}
                                  animate={{
                                    x: isActive ? [0, 6, 0] : 0,
                                  }}
                                  transition={{
                                    duration: 2,
                                    repeat: isActive ? Infinity : 0,
                                    ease: "easeInOut",
                                  }}
                                >
                                  <span className="text-base font-semibold mr-2">Explore</span>
                                  <ArrowRight className="w-5 h-5" />
                                </motion.div>
                              </motion.div>
                            </div>
                          </div>
                        </motion.div>
                      </Link>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center items-center gap-2.5 mt-12">
          {categories.map((_, index) => {
            const isActive = (currentIndex % categories.length) === index;
            return (
              <button
                key={index}
                onClick={() => setCurrentIndex(index + startIndex)}
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? "w-12 h-3 bg-gray-900"
                    : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to category ${index + 1}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
