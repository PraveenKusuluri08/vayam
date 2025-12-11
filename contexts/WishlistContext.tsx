"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface WishlistProduct {
  id: string;
  name: string;
  price: number;
  images: string[];
  slug: string;
  inStock: boolean;
}

interface WishlistItem {
  id: string;
  product: WishlistProduct;
  createdAt: string;
}

interface WishlistContextType {
  items: WishlistItem[];
  addItem: (productId: string) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  removeByProductId: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  loading: boolean;
  refreshWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    if (!session?.user) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/profile/wishlist");
      if (response.ok) {
        const data = await response.json();
        setItems(data || []);
      } else if (response.status === 401) {
        // Not logged in, empty wishlist
        setItems([]);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.email]);

  const addItem = async (productId: string) => {
    if (!session?.user) {
      // Redirect to sign in if not logged in
      window.location.href = "/auth/signin?callbackUrl=" + encodeURIComponent(window.location.pathname);
      return;
    }

    try {
      const response = await fetch("/api/profile/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      if (response.ok) {
        await fetchWishlist();
      } else {
        const error = await response.json();
        throw new Error(error.error || "Failed to add to wishlist");
      }
    } catch (error: any) {
      console.error("Error adding to wishlist:", error);
      throw error;
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      const response = await fetch(`/api/profile/wishlist/${itemId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchWishlist();
      } else {
        throw new Error("Failed to remove from wishlist");
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      throw error;
    }
  };

  const removeByProductId = async (productId: string) => {
    const item = items.find((item) => item.product.id === productId);
    if (item) {
      await removeItem(item.id);
    }
  };

  const isInWishlist = (productId: string): boolean => {
    return items.some((item) => item.product.id === productId);
  };

  const refreshWishlist = async () => {
    await fetchWishlist();
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        removeByProductId,
        isInWishlist,
        loading,
        refreshWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}

