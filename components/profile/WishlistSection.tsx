"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Trash2, Eye } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import ProductImage from "@/components/ProductImage";
import { useCart } from "@/contexts/CartContext";

interface WishlistItem {
  id: string;
  product: {
    id: string;
    name: string;
    price: number;
    images: string[];
    slug: string;
    inStock: boolean;
  };
  createdAt: string;
}

export default function WishlistSection() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const response = await fetch("/api/profile/wishlist");
      if (response.ok) {
        const data = await response.json();
        setWishlist(data);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id: string) => {
    try {
      const response = await fetch(`/api/profile/wishlist/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchWishlist();
      } else {
        alert("Failed to remove item from wishlist");
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      alert("Failed to remove item from wishlist");
    }
  };

  const { addItem } = useCart();
  const [addingToCart, setAddingToCart] = useState<string | null>(null);

  const handleAddToCart = async (productId: string) => {
    setAddingToCart(productId);
    try {
      await addItem(productId, 1);
      alert("Added to cart!");
    } catch (error: any) {
      alert(error.message || "Failed to add to cart");
    } finally {
      setAddingToCart(null);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading wishlist...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-serif font-bold text-navy-900">My Wishlist</h2>
        <p className="text-gray-600">{wishlist.length} items</p>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">Your wishlist is empty</p>
          <Link
            href="/#products"
            className="inline-block px-6 py-2 gradient-gold text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all group"
            >
              <Link href={`/products/${item.product.id}`}>
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  {item.product.images && item.product.images[0] ? (
                    <ProductImage
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Heart className="w-12 h-12 text-gray-300" />
                    </div>
                  )}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemove(item.id);
                    }}
                    className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-50 hover:text-red-600 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </Link>
              <div className="p-4">
                <Link href={`/products/${item.product.id}`}>
                  <h3 className="font-semibold text-navy-900 mb-2 hover:text-gold-600 transition-colors line-clamp-2">
                    {item.product.name}
                  </h3>
                </Link>
                <p className="text-xl font-bold text-gold-600 mb-4">
                  {formatCurrency(item.product.price)}
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAddToCart(item.product.id)}
                    disabled={!item.product.inStock || addingToCart === item.product.id}
                    className="flex-1 px-4 py-2 gradient-gold text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {addingToCart === item.product.id ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Adding...</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>
                  <Link
                    href={`/products/${item.product.id}`}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-gold-500 hover:text-gold-600 transition-all"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                </div>
                {!item.product.inStock && (
                  <p className="text-sm text-red-600 mt-2">Out of Stock</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

