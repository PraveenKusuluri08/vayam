"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, Gem, Award, Heart } from "lucide-react";

const categories = [
  {
    id: "gold",
    name: "Gold Collection",
    description: "Premium gold jewelry & accessories",
    icon: Sparkles,
    color: "from-gold-400 to-gold-600",
    textColor: "text-gold-700",
    bgColor: "bg-gold-50",
    link: "/categories/gold",
    count: "12+ Products",
  },
  {
    id: "diamond",
    name: "Diamond Collection",
    description: "Brilliant diamonds for special moments",
    icon: Gem,
    color: "from-purple-400 to-purple-600",
    textColor: "text-purple-700",
    bgColor: "bg-purple-50",
    link: "/categories/diamond",
    count: "8+ Products",
  },
  {
    id: "silver",
    name: "Silver Collection",
    description: "Elegant silver products & dinnerware",
    icon: Award,
    color: "from-silver-400 to-silver-600",
    textColor: "text-silver-700",
    bgColor: "bg-silver-50",
    link: "/categories/silver",
    count: "15+ Products",
  },
  {
    id: "custom",
    name: "Custom Products",
    description: "Personalized & corporate gifts",
    icon: Heart,
    color: "from-pink-400 to-pink-600",
    textColor: "text-pink-700",
    bgColor: "bg-pink-50",
    link: "/categories/custom",
    count: "Unlimited",
  },
];

export default function CategorySection() {
  return (
    <section className="py-12 bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-2">
            Shop by Category
          </h2>
          <p className="text-gray-600">Explore our premium collections</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <Link href={category.link}>
                  <div className={`${category.bgColor} rounded-xl p-6 h-full cursor-pointer group border-2 border-transparent hover:border-gold-300 transition-all shadow-sm hover:shadow-lg`}>
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className={`font-bold text-lg mb-2 ${category.textColor} group-hover:text-gold-600 transition-colors`}>
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {category.description}
                    </p>
                    <p className="text-xs font-semibold text-gray-500">
                      {category.count}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

