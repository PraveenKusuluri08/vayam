"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface CartProduct {
  id: string;
  name: string;
  price: number;
  images: string[];
  slug: string;
  inStock: boolean;
}

interface CartItem {
  id: string;
  product: CartProduct;
  quantity: number;
  price: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (productId: string, quantity?: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  total: number;
  itemCount: number;
  loading: boolean;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const response = await fetch("/api/cart");
      if (response.ok) {
        const data = await response.json();
        setItems(data.items || []);
      } else {
        // If cart fetch fails, just set empty cart - don't break the page
        setItems([]);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      // Don't break the page if cart fails - just use empty cart
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.email]);

  const addItem = async (productId: string, quantity: number = 1) => {
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
      });

      if (response.ok) {
        await fetchCart();
      } else {
        const error = await response.json();
        throw new Error(error.error || "Failed to add item to cart");
      }
    } catch (error: any) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      const response = await fetch(`/api/cart/${itemId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchCart();
      } else {
        throw new Error("Failed to remove item from cart");
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
      throw error;
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) {
      await removeItem(itemId);
      return;
    }

    try {
      const response = await fetch(`/api/cart/${itemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });

      if (response.ok) {
        await fetchCart();
      } else {
        throw new Error("Failed to update quantity");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      throw error;
    }
  };

  const clearCart = async () => {
    // Remove all items one by one
    for (const item of items) {
      await removeItem(item.id);
    }
  };

  const refreshCart = async () => {
    await fetchCart();
  };

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
        itemCount,
        loading,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

