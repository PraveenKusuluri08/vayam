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
    <section className="py-20 bg-gradient-to-br from-navy-900 to-navy-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            The best time to acknowledge was yesterday.
            <br />
            <span className="text-gold-400">The next best time is NOW!</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
          >
            <h3 className="text-2xl font-semibold mb-6 text-gold-400">
              Celebrate Personal & Family Moments
            </h3>
            <ul className="space-y-4">
              {occasions.map((occasion, index) => {
                const Icon = occasion.icon;
                return (
                  <motion.li
                    key={occasion.text}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-4"
                  >
                    <div className="w-10 h-10 bg-gold-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg">{occasion.text}</span>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
          >
            <h3 className="text-2xl font-semibold mb-6 text-gold-400">
              Boost Engagement & Loyalty
            </h3>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              Our products are designed to strike an emotional chord with not
              just the individual but also his/her family.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gold-400 rounded-full" />
                <span>Recognize what Matters</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gold-400 rounded-full" />
                <span>New launches & Dealer Accomplishments</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gold-400 rounded-full" />
                <span>Target Achievements</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-center"
        >
          <Link href="#products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 gradient-gold text-white rounded-full font-semibold text-lg shadow-2xl hover:shadow-3xl transition-shadow"
            >
              Explore Our Premium Collection
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}


