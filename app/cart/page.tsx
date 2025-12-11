"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Package,
  X,
} from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import ProductImage from "@/components/ProductImage";

export default function CartPage() {
  const router = useRouter();
  const { items, updateQuantity, removeItem, total, itemCount, loading } = useCart();
  const [updating, setUpdating] = useState<string | null>(null);

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    setUpdating(itemId);
    try {
      await updateQuantity(itemId, newQuantity);
    } catch (error) {
      alert("Failed to update quantity");
    } finally {
      setUpdating(null);
    }
  };

  const handleRemove = async (itemId: string) => {
    if (!confirm("Remove this item from cart?")) return;
    setUpdating(itemId);
    try {
      await removeItem(itemId);
    } catch (error) {
      alert("Failed to remove item");
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-navy-900 mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-600">
            {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
          </p>
        </motion.div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-md p-12 text-center"
          >
            <Package className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-navy-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven&apos;t added anything to your cart yet.
            </p>
            <Link
              href="/#products"
              className="inline-flex items-center space-x-2 px-6 py-3 gradient-gold text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row gap-4"
                >
                  {/* Product Image */}
                  <Link href={`/products/${item.product.id}`} className="flex-shrink-0">
                    <div className="relative w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
                      {item.product.images && item.product.images[0] ? (
                        <ProductImage
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="w-12 h-12 text-gray-300" />
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <Link href={`/products/${item.product.id}`}>
                        <h3 className="text-lg font-semibold text-navy-900 hover:text-gold-600 transition-colors mb-2">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="text-xl font-bold text-gold-600 mb-4">
                        {formatCurrency(item.price)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                          disabled={updating === item.id || item.quantity <= 1}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gold-500 hover:text-gold-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-semibold text-navy-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                          disabled={updating === item.id}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gold-500 hover:text-gold-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-bold text-navy-900">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                        <button
                          onClick={() => handleRemove(item.id)}
                          disabled={updating === item.id}
                          className="mt-2 text-sm text-red-600 hover:text-red-700 flex items-center space-x-1 disabled:opacity-50"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl shadow-md p-6 sticky top-24"
              >
                <h2 className="text-2xl font-serif font-bold text-navy-900 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({itemCount} items)</span>
                    <span className="font-semibold">{formatCurrency(total)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-semibold">Calculated at checkout</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-xl font-bold text-navy-900">
                      <span>Total</span>
                      <span className="text-gold-600">{formatCurrency(total)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => router.push("/checkout")}
                  className="w-full px-6 py-4 gradient-gold text-white rounded-lg font-semibold text-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 mb-4"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <Link
                  href="/#products"
                  className="block text-center text-gold-600 hover:text-gold-700 font-medium transition-colors"
                >
                  Continue Shopping
                </Link>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

