"use client";

import { motion } from "framer-motion";
import {
  Target,
  Heart,
  Users,
  Award,
  UsersRound,
  Zap,
} from "lucide-react";

export default function WhyVayamSection() {
  const advantages = [
    {
      icon: Target,
      title: "Core Focus",
      description:
        "Unlike others, this is our priority. We lead in B2B rewards and incentives.",
    },
    {
      icon: Heart,
      title: "Beyond Products",
      description: "We sell purpose, not just precious items. Every piece tells a story.",
    },
    {
      icon: Users,
      title: "Customer First Approach",
      description:
        "They shine with their products; we make you shine with ours.",
    },
    {
      icon: Award,
      title: "Unmatched Quality",
      description:
        "Hallmarking on all products, ensuring authenticity and quality unlike competitors.",
    },
    {
      icon: UsersRound,
      title: "Expert Team",
      description:
        "Committed to excellence with years of experience in precious metals.",
    },
    {
      icon: Zap,
      title: "New Age Process",
      description:
        "Seamless cycle from order to delivery with modern technology and efficiency.",
    },
  ];

  return (
    <section id="why-vayam" className="py-20 bg-gradient-to-br from-gold-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy-900 mb-4">
            Why Vayam?
          </h2>
          <div className="w-24 h-1 gradient-gold mx-auto mb-6 rounded-full" />
          <p className="text-xl text-navy-700 max-w-3xl mx-auto">
            We stand out with our commitment to excellence, quality, and
            customer satisfaction.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            return (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="w-14 h-14 gradient-gold rounded-xl flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-navy-900 mb-3">
                  {advantage.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {advantage.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}





