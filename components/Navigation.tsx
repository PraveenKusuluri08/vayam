"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ShoppingCart,
  User,
  LogOut,
  ChevronDown,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";

interface NavItem {
  label: string;
  href?: string;
  submenu?: { label: string; href: string }[];
}

export default function Navigation() {
  const { data: session } = useSession();
  const { itemCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(false);

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
      if (activeDropdown && !(event.target as Element).closest(".dropdown-menu")) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showUserMenu, activeDropdown]);

  const navItems: NavItem[] = [
    {
      label: "Men",
      submenu: [
        { label: "All Men's Collection", href: "/categories/gold?type=men" },
        { label: "Men's Chains", href: "/categories/gold?type=chains" },
        { label: "Men's Kada", href: "/categories/gold?type=kada" },
        { label: "Men's Rings", href: "/categories/gold?type=rings" },
        { label: "Men's Bracelets", href: "/categories/gold?type=bracelets" },
      ],
    },
    {
      label: "Women",
      submenu: [
        { label: "All Women's Collection", href: "/categories/gold?type=women" },
        { label: "Necklaces", href: "/categories/gold?type=necklaces" },
        { label: "Earrings", href: "/categories/diamond?type=earrings" },
        { label: "Rings", href: "/categories/gold?type=rings" },
        { label: "Bracelets", href: "/categories/gold?type=bracelets" },
        { label: "Bangles", href: "/categories/gold?type=bangles" },
      ],
    },
    {
      label: "Mangalsutra",
      href: "/categories/gold?type=mangalsutra",
    },
    {
      label: "Kids",
      submenu: [
        { label: "All Kids Collection", href: "/categories/gold?type=kids" },
        { label: "Kids Necklaces", href: "/categories/gold?type=kids-necklaces" },
        { label: "Kids Earrings", href: "/categories/gold?type=kids-earrings" },
        { label: "Kids Bracelets", href: "/categories/gold?type=kids-bracelets" },
      ],
    },
    {
      label: "Collections",
      submenu: [
        { label: "Gold Collection", href: "/categories/gold" },
        { label: "Diamond Collection", href: "/categories/diamond" },
        { label: "Silver Collection", href: "/categories/silver" },
        { label: "Custom Products", href: "/categories/custom" },
        { label: "Corporate Gifting", href: "/categories/custom?type=corporate" },
      ],
    },
    {
      label: "Gifting",
      href: "/categories/custom?type=gifting",
    },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed left-0 right-0 z-[60] transition-all duration-300 font-montserrat",
        isScrolled
          ? "top-0 bg-white shadow-sm border-b border-gray-200"
          : "top-0 bg-white border-b border-gray-100"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group z-50">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="relative"
            >
              <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-xl overflow-hidden shadow-lg border border-gold-200 bg-white">
                <Image
                  src="/images/products/logo_vayam.jpeg"
                  alt="Vayam logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
            <div>
              <h1 className="text-2xl font-montserrat font-extrabold text-navy-900 group-hover:text-gold-600 transition-colors">
                VAYAM
              </h1>
              <p className="text-xs text-gray-600 italic hidden sm:block font-montserrat font-medium">
                Let&apos;s shine together!
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 flex-1 justify-center">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative dropdown-menu"
                onMouseEnter={() => item.submenu && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href || "#"}
                  className="flex items-center space-x-1 px-4 py-2 text-navy-700 hover:text-gold-600 font-semibold transition-colors relative group"
                >
                  <span>{item.label}</span>
                  {item.submenu && (
                    <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
                  )}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-600 group-hover:w-full transition-all duration-300" />
                </Link>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {item.submenu && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                    >
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-navy-700 hover:bg-gold-50 hover:text-gold-600 font-medium transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Search */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSearch(!showSearch)}
              className="hidden md:flex p-2 text-navy-700 hover:text-gold-600 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </motion.button>

            {/* Cart */}
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

            {/* User Menu */}
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
                  <span className="hidden md:inline text-sm font-semibold">
                    {session.user?.name || session.user?.email}
                  </span>
                </motion.button>
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                    >
                      <div className="px-4 py-2 border-b border-gray-200">
                        <p className="text-sm font-bold text-navy-900">
                          {session.user?.name}
                        </p>
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
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="hidden md:block px-4 py-2 text-navy-700 hover:text-gold-600 font-semibold transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="hidden md:block px-4 py-2 gradient-gold text-white rounded-md font-bold shadow-md hover:shadow-lg transition-all"
                >
                  Sign Up
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-navy-900 hover:text-gold-600 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-gray-200 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                  autoFocus
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href || "#"}
                    onClick={() => {
                      if (!item.submenu) setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-between text-navy-700 hover:text-gold-600 font-semibold transition-colors py-2"
                  >
                    <span>{item.label}</span>
                    {item.submenu && (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </Link>
                  {item.submenu && (
                    <div className="ml-4 mt-2 space-y-1">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-sm text-gray-600 hover:text-gold-600 font-medium py-1"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <Link
                  href="/cart"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-2 text-navy-700 hover:text-gold-600 font-semibold py-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Cart {itemCount > 0 && `(${itemCount})`}</span>
                </Link>
                {!session && (
                  <>
                    <Link
                      href="/auth/signin"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-navy-700 hover:text-gold-600 font-semibold py-2"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/signup"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full px-6 py-2 gradient-gold text-white rounded-full font-bold text-center shadow-lg"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
