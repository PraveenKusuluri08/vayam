"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Product } from "@/types/product";
import { formatCurrency } from "@/lib/utils";
import { Sparkles, ShoppingCart, Heart, Check } from "lucide-react";
import ProductImage from "./ProductImage";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useSession } from "next-auth/react";

interface ProductCardProps {
  product: Product;
  index: number;
  isLarge?: boolean;
}

export default function ProductCard({ product, index, isLarge = false }: ProductCardProps) {
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeByProductId: removeFromWishlist, isInWishlist } = useWishlist();
  const { data: session } = useSession();
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [wishlisting, setWishlisting] = useState(false);
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        delay: index * 0.05, 
        duration: 0.5,
        ease: "easeOut"
      }}
      className="group"
    >
      <div className={`bg-white rounded-2xl overflow-hidden flex flex-col relative transition-all duration-500 border-2 ${
        isLarge 
          ? product.category === "gold" 
            ? "border-amber-300/60 shadow-2xl hover:shadow-amber-200/50 hover:border-amber-400 hover:-translate-y-2 h-[520px] md:h-[540px]" :
            product.category === "diamond" 
            ? "border-purple-300/60 shadow-2xl hover:shadow-purple-200/50 hover:border-purple-400 hover:-translate-y-2 h-[520px] md:h-[540px]" :
            product.category === "silver" 
            ? "border-gray-400/60 shadow-2xl hover:shadow-gray-300/50 hover:border-gray-500 hover:-translate-y-2 h-[520px] md:h-[540px]" :
            "border-gray-200 shadow-xl hover:border-gray-300 hover:-translate-y-2 h-[490px] md:h-[510px]"
          : "border-gray-100 shadow-xl hover:shadow-2xl hover:border-gray-200 hover:-translate-y-1 h-[380px] md:h-[400px]"
      }`}>
        {/* Image Container - Premium Style */}
        <Link href={`/products/${product.id}`} className="flex-shrink-0">
          <div className={`relative ${isLarge ? 'h-[300px] md:h-[320px]' : 'h-[240px] md:h-[260px]'} bg-gradient-to-br ${
            product.category === "gold" ? "from-amber-50 to-white" :
            product.category === "diamond" ? "from-purple-50 to-white" :
            product.category === "silver" ? "from-gray-50 to-white" :
            "from-gray-50 to-white"
          } overflow-hidden cursor-pointer group/image`}>
            {product.images && product.images.length > 0 && product.images[0] ? (
              <motion.div
                className="absolute inset-0"
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent z-10" />
                <ProductImage
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </motion.div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-gray-50">
                <Sparkles className="w-12 h-12 text-gray-400 mb-2" />
                <p className="text-gray-700 font-medium text-sm">{product.name}</p>
              </div>
            )}
            
            {/* Wishlist Button - Enhanced */}
            <motion.button
              onClick={handleWishlistToggle}
              disabled={wishlisting}
              className={`absolute top-4 right-4 z-20 p-2.5 rounded-full backdrop-blur-md transition-all shadow-xl ${
                inWishlist
                  ? "bg-red-500/90 text-white shadow-red-500/50"
                  : "bg-white/90 text-gray-700 hover:bg-red-500/90 hover:text-white opacity-0 group-hover/image:opacity-100"
              } disabled:opacity-50 border border-white/20`}
              whileHover={{ scale: 1.15, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={`w-5 h-5 ${inWishlist ? "fill-current" : ""}`} />
            </motion.button>

            {/* Category Badge - Premium */}
            <div className="absolute top-4 left-4 z-20">
              <motion.span
                initial={{ scale: 0.9, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={`px-4 py-2 rounded-xl text-[11px] font-extrabold uppercase tracking-wider shadow-2xl backdrop-blur-sm ${
                  product.category === "gold"
                    ? "bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-white border border-amber-400/30"
                    : product.category === "diamond"
                    ? "bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white border border-purple-400/30"
                    : product.category === "silver"
                    ? "bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 text-white border border-gray-500/30"
                    : "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white border border-blue-400/30"
                }`}
              >
                {product.category}
              </motion.span>
            </div>
          </div>
        </Link>

        {/* Content Section - Properly Aligned */}
        <div className={`${isLarge ? 'p-4' : 'p-3'} flex-1 flex flex-col justify-between bg-white`}>
          {/* Top Content Area */}
          <div className="flex flex-col">
            {/* Product Title */}
            <Link href={`/products/${product.id}`} className="mb-3">
              <h3 className={`${isLarge ? 'text-sm' : 'text-xs'} font-semibold text-gray-900 group-hover:${
                product.category === "gold" ? "text-amber-600" :
                product.category === "diamond" ? "text-purple-600" :
                product.category === "silver" ? "text-gray-700" :
                "text-amber-600"
              } transition-colors duration-300 cursor-pointer line-clamp-2 leading-tight`}>
                {product.name}
              </h3>
            </Link>

            {/* Price Display */}
            <div className={`mb-3 ${isLarge ? `bg-gradient-to-r ${
              product.category === "gold" ? "from-amber-50 to-amber-100/50" :
              product.category === "diamond" ? "from-purple-50 to-purple-100/50" :
              product.category === "silver" ? "from-gray-50 to-gray-100/50" :
              "from-gray-50 to-white"
            } p-2.5 rounded-lg border border-gray-100` : ''}`}>
              {product.startingPrice ? (
                <div>
                  <p className={`${isLarge ? 'text-[10px]' : 'text-[9px]'} ${
                    product.category === "gold" ? "text-amber-600" :
                    product.category === "diamond" ? "text-purple-600" :
                    "text-gray-600"
                  } mb-1 font-medium`}>Starts at</p>
                  <p className={`${isLarge ? 'text-base' : 'text-sm'} font-bold leading-none ${
                    product.category === "gold" ? "text-amber-900" :
                    product.category === "diamond" ? "text-purple-900" :
                    "text-gray-900"
                  }`}>
                    {formatCurrency(product.startingPrice)}
                  </p>
                </div>
              ) : (
                <p className={`${isLarge ? 'text-base' : 'text-sm'} font-bold leading-none ${
                  product.category === "gold" ? "text-amber-900" :
                  product.category === "diamond" ? "text-purple-900" :
                  "text-gray-900"
                }`}>
                  {formatCurrency(product.price)}
                </p>
              )}
            </div>

            {/* Stock Status */}
            <div className="mb-0">
              {product.inStock ? (
                <span className={`inline-flex items-center gap-1.5 ${isLarge ? 'px-2.5 py-1 text-[10px]' : 'px-2 py-0.5 text-[9px]'} text-green-700 font-medium bg-green-50 border border-green-200 rounded-full`}>
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse flex-shrink-0"></span>
                  In Stock
                </span>
              ) : (
                <span className={`inline-flex items-center gap-1.5 ${isLarge ? 'px-2.5 py-1 text-[10px]' : 'px-2 py-0.5 text-[9px]'} text-gray-500 font-medium bg-gray-50 border border-gray-200 rounded-full`}>
                  Out of Stock
                </span>
              )}
            </div>
          </div>

          {/* Add to Cart Button - Fixed at Bottom */}
          <div className="mt-4 pt-3 border-t border-gray-200">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={adding || !product.inStock}
              className={`w-full ${isLarge ? 'py-2.5' : 'py-2'} rounded-lg font-bold ${isLarge ? 'text-xs' : 'text-[11px]'} transition-all duration-300 flex items-center justify-center gap-1.5 ${
                added
                  ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
                  : product.inStock
                  ? `bg-gradient-to-r text-white shadow-lg ${
                      product.category === "gold" ? "from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800" :
                      product.category === "diamond" ? "from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800" :
                      product.category === "silver" ? "from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900" :
                      "from-gray-900 to-gray-950 hover:from-gray-950 hover:to-black"
                    }`
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
              onClick={handleAddToCart}
            >
              {adding ? (
                <>
                  <div className={`${isLarge ? 'w-3.5 h-3.5' : 'w-3 h-3'} border-2 border-white border-t-transparent rounded-full animate-spin flex-shrink-0`}></div>
                  <span>Adding...</span>
                </>
              ) : added ? (
                <>
                  <Check className={`${isLarge ? 'w-3.5 h-3.5' : 'w-3 h-3'} flex-shrink-0`} />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className={`${isLarge ? 'w-3.5 h-3.5' : 'w-3 h-3'} flex-shrink-0`} />
                  <span>Add to cart</span>
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
