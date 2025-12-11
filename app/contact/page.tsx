"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-navy-900 mb-6">
            Contact Us
          </h1>
          <div className="w-32 h-1 gradient-gold mx-auto mb-8 rounded-full" />
          <p className="text-xl text-navy-700 max-w-3xl mx-auto">
            Get in touch with us for premium rewards and incentives. We&apos;re
            here to help you shine!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-serif font-bold text-navy-900 mb-6">
                Get in Touch
              </h2>
              <p className="text-gray-600 mb-8">
                We appreciate your time & decision in choosing us! Rest assured,
                its topnotch from conceptualising to delivery.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 gradient-gold rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900 mb-2">Address</h3>
                  <p className="text-gray-600 leading-relaxed">
                    WeWork, 10th Floor, Nesco IT Park,
                    <br />
                    Bldg. 4, North Wing, Western Exp Highway,
                    <br />
                    Goregaon, Mumbai 400 603. INDIA.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 gradient-gold rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900 mb-2">Phone</h3>
                  <a
                    href="tel:+91"
                    className="text-gold-600 hover:text-gold-700 transition-colors"
                  >
                    +91 XXX XXX XXXX
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 gradient-gold rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900 mb-2">Email</h3>
                  <a
                    href="mailto:info@vayam.com"
                    className="text-gold-600 hover:text-gold-700 transition-colors"
                  >
                    info@vayam.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 gradient-gold rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900 mb-2">
                    Business Hours
                  </h3>
                  <p className="text-gray-600">
                    Monday - Friday: 9:00 AM - 6:00 PM
                    <br />
                    Saturday: 10:00 AM - 4:00 PM
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-gold-50 to-silver-50 rounded-2xl p-8"
          >
            <h2 className="text-3xl font-serif font-bold text-navy-900 mb-6">
              Send us a Message
            </h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gold-500 focus:ring-2 focus:ring-gold-200 outline-none transition-all"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gold-500 focus:ring-2 focus:ring-gold-200 outline-none transition-all"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gold-500 focus:ring-2 focus:ring-gold-200 outline-none transition-all"
                  placeholder="+91 XXX XXX XXXX"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gold-500 focus:ring-2 focus:ring-gold-200 outline-none transition-all resize-none"
                  placeholder="Tell us about your requirements..."
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full px-8 py-4 gradient-gold text-white rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-shadow"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}


