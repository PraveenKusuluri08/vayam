"use client";

import { motion } from "framer-motion";
import { Award, Users, Sparkles, Shield, Zap, Heart } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Core Focus",
    description: "Unlike others, this is our priority. We lead in B2B.",
    color: "from-gold-400 to-gold-600",
  },
  {
    icon: Heart,
    title: "Beyond Products",
    description: "We sell purpose, not just precious items.",
    color: "from-pink-400 to-pink-600",
  },
  {
    icon: Users,
    title: "Customer First Approach",
    description: "They shine with their products; we make you shine.",
    color: "from-blue-400 to-blue-600",
  },
  {
    icon: Shield,
    title: "Unmatched Quality",
    description: "Hallmarking on all products, unlike competitors.",
    color: "from-green-400 to-green-600",
  },
  {
    icon: Sparkles,
    title: "Expert Team",
    description: "Committed to excellence in every detail.",
    color: "from-purple-400 to-purple-600",
  },
  {
    icon: Zap,
    title: "New Age Process",
    description: "Seamless cycle from order to delivery.",
    color: "from-orange-400 to-orange-600",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-vayam" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy-900 mb-4">
            Why Vayam?
          </h2>
          <div className="w-24 h-1 gradient-gold mx-auto mb-6 rounded-full" />
          <p className="text-xl text-navy-700 max-w-2xl mx-auto">
            We make incentivisation & appreciation a lasting impression, emotionally & commercially
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-navy-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

