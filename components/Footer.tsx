import Link from "next/link";
import { Sparkles, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 gradient-gold rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-serif font-bold">VAYAM</h2>
            </div>
            <p className="text-gray-400 text-sm italic">
              Let&apos;s shine together!
            </p>
            <p className="text-gray-300 text-sm">
              Your go-to partner for Premium Rewards and Incentives in Gold,
              Diamond & Silver.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gold-400">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-gold-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/#products"
                  className="text-gray-300 hover:text-gold-400 transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-gold-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-gold-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gold-400">
              Products
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products?category=gold"
                  className="text-gray-300 hover:text-gold-400 transition-colors"
                >
                  Gold Products
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=diamond"
                  className="text-gray-300 hover:text-gold-400 transition-colors"
                >
                  Diamond Products
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=silver"
                  className="text-gray-300 hover:text-gold-400 transition-colors"
                >
                  Silver Products
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=custom"
                  className="text-gray-300 hover:text-gold-400 transition-colors"
                >
                  Custom Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gold-400">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gold-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  WeWork, 10th Floor, Nesco IT Park,
                  <br />
                  Bldg. 4, North Wing, Western Exp Highway,
                  <br />
                  Goregaon, Mumbai 400 603. INDIA.
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gold-400 flex-shrink-0" />
                <a
                  href="tel:+91"
                  className="text-gray-300 hover:text-gold-400 transition-colors text-sm"
                >
                  +91 XXX XXX XXXX
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gold-400 flex-shrink-0" />
                <a
                  href="mailto:info@vayam.com"
                  className="text-gray-300 hover:text-gold-400 transition-colors text-sm"
                >
                  info@vayam.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Vayam by Smart Jewels. All rights
              reserved.
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">
              Crafted with excellence & passion
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
