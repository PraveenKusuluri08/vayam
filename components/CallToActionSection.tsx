"use client";

import { motion } from "framer-motion";
import { Calendar, Gift, Target, Heart } from "lucide-react";
import Link from "next/link";

export default function CallToActionSection() {
  const occasions = [
    { icon: Calendar, text: "Birthdays and Anniversaries" },
    { icon: Gift, text: "Festivals" },
    { icon: Target, text: "Target Achievements" },
    { icon: Heart, text: "Years of Togetherness" },
  ];

  return (
    <section className="py-10 md:py-12 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-xl md:text-2xl lg:text-3xl font-medium mb-6 tracking-tight">
            Perfect for Every Occasion
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 max-w-3xl mx-auto">
            {occasions.map((occasion, index) => {
              const Icon = occasion.icon;
              return (
                <motion.div
                  key={occasion.text}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm text-center">{occasion.text}</span>
                </motion.div>
              );
            })}
          </div>
          <Link href="#products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-amber-500 text-white rounded-md font-medium text-sm md:text-base shadow-md hover:shadow-lg transition-shadow"
            >
              Shop Now
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}


