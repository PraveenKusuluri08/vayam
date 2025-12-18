"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

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
  return (
    <section className="py-20 bg-transparent border-b border-amber-100/30 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gold-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold-300 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring" }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-navy-900 mb-4 bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 bg-clip-text text-transparent"
          >
            Shop by Collection
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "120px" }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mb-4 rounded-full"
          />
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-gray-600 text-xl font-light"
          >
            Discover our curated selections
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8 lg:gap-10">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 50, scale: 0.9, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                delay: index * 0.15, 
                duration: 0.8,
                type: "spring",
                stiffness: 80,
                damping: 15
              }}
              whileHover={{ 
                y: -20, 
                scale: 1.03,
                rotateY: 2,
                transition: { duration: 0.4, ease: "easeOut" }
              }}
              className="group perspective-1000"
            >
              <Link href={category.link}>
                <div className="relative cursor-pointer rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 border-2 border-transparent hover:border-gold-400/60 bg-white">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <motion.div
                      whileHover={{ 
                        scale: 1.25,
                        rotate: 2,
                      }}
                      transition={{ 
                        duration: 0.8, 
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                      className="h-full w-full"
                    >
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        priority={index < 2}
                        className="object-cover"
                      />
                    </motion.div>
                    
                    {/* Dynamic Gradient Overlay - Swashaa Style */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 0.95 }}
                      transition={{ duration: 0.4 }}
                    />
                    
                    {/* Animated Shimmer Sweep */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 pointer-events-none"
                      initial={{ x: "-150%", opacity: 0 }}
                      whileHover={{ x: "200%", opacity: 1 }}
                      transition={{ 
                        duration: 0.9, 
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatDelay: 2
                      }}
                    />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 text-white z-10">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                      >
                        <motion.p 
                          className="text-xs uppercase tracking-[0.3em] text-gold-300 mb-2 font-semibold"
                          whileHover={{ scale: 1.05 }}
                        >
                          {category.id}
                        </motion.p>
                        <motion.h3 
                          className="text-lg md:text-xl font-bold mb-2"
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {category.name}
                        </motion.h3>
                        <p className="text-xs md:text-sm text-gray-300">
                          {category.subtitle}
                        </p>
                        
                        {/* Arrow indicator */}
                        <motion.div
                          className="mt-3 flex items-center text-gold-300"
                          initial={{ x: -10, opacity: 0 }}
                          whileHover={{ x: 0, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <span className="text-xs font-semibold mr-2">Explore</span>
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

