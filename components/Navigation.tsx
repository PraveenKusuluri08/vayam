"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, ShoppingCart, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";

export default function Navigation() {
  const { data: session } = useSession();
  const { itemCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showUserMenu && !(event.target as Element).closest(".user-menu")) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showUserMenu]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#products", label: "Products" },
    { href: "/about", label: "About Us" },
    { href: "/#why-vayam", label: "Why Vayam" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white shadow-md border-b border-gray-200"
          : "bg-white/80 backdrop-blur-sm"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="relative"
            >
              <div className="w-10 h-10 gradient-gold rounded-lg flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </motion.div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-navy-900 group-hover:text-gold-600 transition-colors">
                VAYAM
              </h1>
              <p className="text-xs text-gray-600 italic">
                Let&apos;s shine together!
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-navy-700 hover:text-gold-600 font-medium transition-colors relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-600 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <div className="flex items-center space-x-4">
              {/* <Link
                href="/#contact"
                className="text-navy-700 hover:text-gold-600 font-medium transition-colors"
              >
                Contact
              </Link> */}
              <Link href="/cart">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative p-2 text-navy-700 hover:text-gold-600 transition-colors"
                  aria-label="Shopping Cart"
                >
                  <ShoppingCart className="w-6 h-6" />
                  {itemCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-gold-500 text-white text-xs rounded-full flex items-center justify-center font-semibold"
                    >
                      {itemCount > 99 ? "99+" : itemCount}
                    </motion.span>
                  )}
                </motion.button>
              </Link>
              {session ? (
                <div className="relative user-menu">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="p-2 text-navy-700 hover:text-gold-600 transition-colors flex items-center space-x-2"
                    aria-label="Account"
                  >
                    <User className="w-6 h-6" />
                    <span className="text-sm font-medium">{session.user?.name || session.user?.email}</span>
                  </motion.button>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                    >
                      <div className="px-4 py-2 border-b border-gray-200">
                        <p className="text-sm font-semibold text-navy-900">{session.user?.name}</p>
                        <p className="text-xs text-gray-600">{session.user?.email}</p>
                      </div>
                      <Link
                        href="/profile"
                        onClick={() => setShowUserMenu(false)}
                        className="block px-4 py-2 text-sm text-navy-700 hover:bg-gray-50 flex items-center space-x-2"
                      >
                        <User className="w-4 h-4" />
                        <span>My Profile</span>
                      </Link>
                      <button
                        onClick={() => {
                          signOut();
                          setShowUserMenu(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    href="/auth/signin"
                    className="px-4 py-2 text-navy-700 hover:text-gold-600 font-medium transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="px-4 py-2 text-gold-600 hover:text-gold-700 font-medium transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 gradient-gold text-white rounded-md font-semibold shadow-md hover:shadow-lg transition-all"
              >
                Get Quote
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-navy-900 hover:text-gold-600 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-navy-700 hover:text-gold-600 font-medium transition-colors py-2"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/cart"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-2 text-navy-700 hover:text-gold-600 font-medium transition-colors py-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Cart {itemCount > 0 && `(${itemCount})`}</span>
              </Link>
              <button className="w-full px-6 py-2 gradient-gold text-white rounded-full font-semibold shadow-lg">
                Get Quote
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
