"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="py-8 md:py-12 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-900 mb-2 tracking-tight">
            Premium Rewards & Incentives
          </h2>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            Gold, Diamond & Silver jewellery for corporate gifting and personal milestones.
          </p>
        </motion.div>
      </div>
    </section>
  );
}


