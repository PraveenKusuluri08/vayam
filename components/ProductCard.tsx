"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";
import { formatCurrency } from "@/lib/utils";
import { ArrowRight, Sparkles, ShoppingCart, Heart, Check } from "lucide-react";
import ProductImage from "./ProductImage";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useSession } from "next-auth/react";

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeByProductId: removeFromWishlist, isInWishlist } = useWishlist();
  const { data: session } = useSession();
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [wishlisting, setWishlisting] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!product.inStock) {
      alert("This product is out of stock");
      return;
    }

    setAdding(true);
    try {
      // Use product ID directly - it should match database ID now
      await addItem(product.id, 1);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (error: any) {
      console.error("Error adding to cart:", error);
      alert(error.message || "Failed to add to cart");
    } finally {
      setAdding(false);
    }
  };

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session?.user) {
      if (confirm("Please sign in to add items to your wishlist. Would you like to sign in now?")) {
        window.location.href = `/auth/signin?callbackUrl=${encodeURIComponent(window.location.pathname)}`;
      }
      return;
    }

    setWishlisting(true);
    try {
      if (inWishlist) {
        await removeFromWishlist(product.id);
      } else {
        await addToWishlist(product.id);
        setWishlisted(true);
        setTimeout(() => setWishlisted(false), 2000);
      }
    } catch (error: any) {
      console.error("Error toggling wishlist:", error);
      alert(error.message || "Failed to update wishlist");
    } finally {
      setWishlisting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        delay: index * 0.1, 
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ y: -16 }}
      className="group"
    >
      <motion.div 
        className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-700 overflow-hidden border border-gray-200/50 hover:border-gold-400/60 h-full flex flex-col relative group/card"
        whileHover={{ scale: 1.02, y: -8 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Image Container */}
        <Link href={`/products/${product.id}`}>
          <div className="relative h-72 md:h-80 lg:h-96 bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden cursor-pointer">
            {product.images && product.images.length > 0 && product.images[0] ? (
              <motion.div
                className="absolute inset-0"
                whileHover={{ scale: 1.2, rotate: 1 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <ProductImage
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </motion.div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                <Sparkles className="w-16 h-16 text-gold-400 mb-2" />
                <p className="text-gold-700 font-semibold text-sm">{product.name}</p>
                <p className="text-gray-500 text-xs mt-1">Image coming soon</p>
              </div>
            )}
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  product.category === "gold"
                    ? "bg-gold-500 text-white"
                    : product.category === "diamond"
                    ? "bg-purple-500 text-white"
                    : product.category === "silver"
                    ? "bg-silver-600 text-white"
                    : "bg-blue-500 text-white"
                }`}
              >
                {product.category.toUpperCase()}
              </span>
            </div>

            {/* Subtle Overlay - Swashaa Style */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-black/0 to-black/0 group-hover:from-black/10 group-hover:via-black/5 group-hover:to-black/0 transition-all duration-500" />
            
            {/* Quick Action Button - Appears on Hover */}
            <motion.div
              className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
              initial={{ scale: 0, rotate: -180 }}
              whileHover={{ scale: 1.15, rotate: 0 }}
              transition={{ type: "spring", stiffness: 250, damping: 15 }}
            >
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="bg-white/95 backdrop-blur-sm rounded-full p-2.5 shadow-2xl hover:shadow-3xl border border-white/50"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = `/products/${product.id}`;
                }}
                aria-label="Quick view"
              >
                <ArrowRight className="w-4 h-4 text-gold-600" />
              </motion.button>
            </motion.div>
            
            {/* Shimmer Effect on Hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 pointer-events-none"
              initial={{ x: "-150%" }}
              whileHover={{ x: "200%" }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            />
          </div>
        </Link>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col bg-gradient-to-b from-white to-gray-50/50">
          <Link href={`/products/${product.id}`}>
            <h3 className="text-xl md:text-2xl font-semibold text-navy-900 mb-4 group-hover:text-gold-600 transition-colors cursor-pointer line-clamp-2 min-h-[3.5rem] leading-tight">
              {product.name}
            </h3>
          </Link>
            <p className="text-gray-600 text-base mb-4 line-clamp-2 flex-1">
              {product.description}
            </p>

            {/* Price */}
            <div className="mb-4">
              {product.startingPrice ? (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Starts at</p>
                  <p className="text-2xl md:text-3xl font-bold text-gold-600">
                    {formatCurrency(product.startingPrice)}
                  </p>
                </div>
              ) : (
                <p className="text-2xl md:text-3xl font-bold text-gold-600">
                  {formatCurrency(product.price)}
                </p>
              )}
              {product.inStock && (
                <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                  ✓ In Stock
                </span>
              )}
            </div>

            {/* Features Preview */}
            {product.features && product.features.length > 0 && (
              <ul className="space-y-2 mb-4">
                {product.features.slice(0, 2).map((feature, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-600">
                    <span className="w-2 h-2 bg-gold-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                    <span className="line-clamp-1">{feature}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Action Buttons - Amazon Style */}
            <div className="mt-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={adding || !product.inStock}
                className={`w-full py-3 rounded-md font-semibold transition-all shadow-md hover:shadow-lg text-base flex items-center justify-center space-x-2 ${
                  added
                    ? "bg-green-500 text-white"
                    : product.inStock
                    ? "bg-gradient-to-r from-gold-500 to-gold-600 text-white hover:from-gold-600 hover:to-gold-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                onClick={handleAddToCart}
              >
                {adding ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Adding...</span>
                  </>
                ) : added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>{product.inStock ? "Add to Cart" : "Out of Stock"}</span>
                  </>
                )}
              </motion.button>
              <div className="flex gap-2 mt-2">
                <Link
                  href={`/products/${product.id}`}
                  className="flex-1"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2.5 border border-gray-300 text-gray-700 rounded-md font-medium hover:border-gold-500 hover:text-gold-600 transition-colors text-base"
                  >
                    View Details
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={wishlisting}
                  onClick={handleWishlistToggle}
                  className={`px-3 py-2 border rounded-md transition-colors ${
                    inWishlist || wishlisted
                      ? "border-red-500 bg-red-50 text-red-600 hover:bg-red-100"
                      : "border-gray-300 text-gray-700 hover:border-gold-500 hover:text-gold-600"
                  } disabled:opacity-50`}
                  aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart className={`w-4 h-4 ${inWishlist || wishlisted ? "fill-current" : ""}`} />
                </motion.button>
              </div>
            </div>
          </div>
      </motion.div>
    </motion.div>
  );
}
