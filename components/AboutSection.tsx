"use client";

import { motion } from "framer-motion";
import { Heart, Users, Sparkles } from "lucide-react";

export default function AboutSection() {
  const features = [
    {
      icon: Heart,
      title: "Emotional Connection",
      description:
        "We craft experiences that make your customers feel uniquely valued.",
    },
    {
      icon: Users,
      title: "Deeper Bonds",
      description:
        "Foster engagements, commitments & loyalty with products of highest emotional value.",
    },
    {
      icon: Sparkles,
      title: "Premium Quality",
      description:
        "Hallmarked products in Gold, Diamond & Silver that symbolize excellence.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy-900 mb-4">
            Who We Are
          </h2>
          <div className="w-24 h-1 gradient-gold mx-auto mb-6 rounded-full" />
          <p className="text-xl text-navy-700 max-w-3xl mx-auto leading-relaxed">
            Vayam is your go-to-partner for Premium Rewards and Incentives in
            Gold, Diamond & Silver. We help you build deeper connections with
            your customers & top talents fostering engagements, commitments &
            loyalty.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="text-center p-8 rounded-2xl bg-gradient-to-br from-gold-50 to-silver-50 hover:shadow-xl transition-shadow"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="inline-flex items-center justify-center w-16 h-16 gradient-gold rounded-full mb-6"
                >
                  <Icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold text-navy-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


