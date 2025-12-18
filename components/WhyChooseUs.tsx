"use client";

import { motion } from "framer-motion";
import { Award, ShieldCheck, Gem, Users } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Hallmarked",
  },
  {
    icon: Gem,
    title: "Premium Quality",
  },
  {
    icon: ShieldCheck,
    title: "Free Shipping",
  },
  {
    icon: Users,
    title: "Custom Orders",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-vayam" className="py-12 bg-gradient-to-b from-amber-50/30 via-amber-50/20 to-amber-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ y: -4 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="w-14 h-14 rounded-full bg-gold-100 flex items-center justify-center">
                  <Icon className="w-7 h-7 text-gold-700" />
                </div>
                <h3 className="text-sm font-semibold text-navy-900 text-center">
                  {feature.title}
                </h3>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

