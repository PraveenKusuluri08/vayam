"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="py-16 bg-gradient-to-b from-amber-50/30 to-amber-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy-900 mb-4">
            Premium Rewards & Incentives
          </h2>
          <p className="text-lg text-navy-700 max-w-2xl mx-auto">
            Gold, Diamond & Silver jewellery for corporate gifting and personal milestones.
          </p>
        </motion.div>
      </div>
    </section>
  );
}


