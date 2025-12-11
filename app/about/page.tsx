"use client";

import { motion } from "framer-motion";
import { Heart, Users, Sparkles, Target, Award, Zap } from "lucide-react";

export default function AboutPage() {
  const values = [
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
    {
      icon: Target,
      title: "Core Focus",
      description:
        "Unlike others, this is our priority. We lead in B2B rewards and incentives.",
    },
    {
      icon: Award,
      title: "Unmatched Quality",
      description:
        "Hallmarking on all products, ensuring authenticity and quality unlike competitors.",
    },
    {
      icon: Zap,
      title: "New Age Process",
      description:
        "Seamless cycle from order to delivery with modern technology and efficiency.",
    },
  ];

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-navy-900 mb-6">
            Who We Are
          </h1>
          <div className="w-32 h-1 gradient-gold mx-auto mb-8 rounded-full" />
          <p className="text-xl text-navy-700 max-w-4xl mx-auto leading-relaxed">
            Vayam is your go-to-partner for Premium Rewards and Incentives in
            Gold, Diamond & Silver. We help you build deeper connections with
            your customers & top talents fostering engagements, commitments &
            loyalty.
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-gold-50 to-silver-50 rounded-2xl p-8 md:p-12 mb-16"
        >
          <h2 className="text-3xl font-serif font-bold text-navy-900 mb-4 text-center">
            Our Mission
          </h2>
          <p className="text-lg text-navy-700 text-center max-w-3xl mx-auto">
            We craft experiences that makes your customers feel uniquely valued
            & recognize the emotional bonds that drives the performances.
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow border border-gray-100"
              >
                <div className="w-16 h-16 gradient-gold rounded-xl flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-navy-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-navy-900 text-white rounded-2xl p-8 md:p-12"
        >
          <h2 className="text-3xl font-serif font-bold mb-6 text-center text-gold-400">
            Why Choose Vayam?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gold-400">
                Beyond Products
              </h3>
              <p className="text-gray-300">
                We sell purpose, not just precious items. Every piece tells a
                story.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gold-400">
                Customer First Approach
              </h3>
              <p className="text-gray-300">
                They shine with their products; we make you shine with ours.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gold-400">
                Expert Team
              </h3>
              <p className="text-gray-300">
                Committed to excellence with years of experience in precious
                metals.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gold-400">
                New Age Technology
              </h3>
              <p className="text-gray-300">
                Seamless cycle from order to delivery with modern technology and
                efficiency.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
