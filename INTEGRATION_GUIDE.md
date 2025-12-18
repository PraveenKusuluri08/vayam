# Integration Guide - Payment Gateway & Delivery System

This guide explains how to integrate payment gateway and delivery system into the Vayam Next.js application.

## 📋 Table of Contents

1. [Payment Gateway Integration](#payment-gateway-integration)
2. [Delivery System Integration](#delivery-system-integration)
3. [Cart & Checkout Implementation](#cart--checkout-implementation)
4. [Order Management](#order-management)

## 💳 Payment Gateway Integration

### Recommended Payment Gateways for India

1. **Razorpay** (Most popular in India)
2. **PayU**
3. **Stripe** (International)
4. **CCAvenue**

### Step 1: Install Payment SDK

For Razorpay (Recommended):
```bash
npm install razorpay
```

For PayU:
```bash
npm install payu-merchant
```

### Step 2: Create Payment Component

Create `components/Payment/RazorpayCheckout.tsx`:

```typescript
"use client";

import { useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayCheckoutProps {
  amount: number;
  orderId: string;
  onSuccess: (paymentId: string) => void;
  onFailure: (error: string) => void;
}

export default function RazorpayCheckout({
  amount,
  orderId,
  onSuccess,
  onFailure,
}: RazorpayCheckoutProps) {
  const handlePayment = () => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: amount * 100, // Convert to paise
      currency: "INR",
      name: "Vayam",
      description: `Order #${orderId}`,
      order_id: orderId,
      handler: function (response: any) {
        onSuccess(response.razorpay_payment_id);
      },
      prefill: {
        // Add user details if available
      },
      theme: {
        color: "#f59e0b", // Gold color
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.on("payment.failed", function (response: any) {
      onFailure(response.error.description);
    });
    razorpay.open();
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => {
          // Script loaded
        }}
      />
      <button
        onClick={handlePayment}
        className="px-8 py-4 gradient-gold text-white rounded-full font-semibold"
      >
        Pay ₹{amount.toLocaleString("en-IN")}
      </button>
    </>
  );
}
```

### Step 3: Create Payment API Route

Create `app/api/payment/create-order/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = "INR" } = await request.json();

    const options = {
      amount: amount * 100, // Convert to paise
      currency,
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
```

### Step 4: Environment Variables

Add to `.env.local`:
```
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_key_id
```

## 🚚 Delivery System Integration

### Recommended Shipping Partners

1. **Shiprocket** (Most popular in India)
2. **Delhivery**
3. **Bluedart**
4. **Custom courier service**

### Step 1: Install Shipping SDK

For Shiprocket:
```bash
npm install shiprocket-api
```

### Step 2: Create Shipping Address Component

Create `components/Shipping/AddressForm.tsx`:

```typescript
"use client";

import { useState } from "react";
import { ShippingAddress } from "@/lib/api";

interface AddressFormProps {
  onSubmit: (address: ShippingAddress) => void;
  initialData?: Partial<ShippingAddress>;
}

export default function AddressForm({
  onSubmit,
  initialData,
}: AddressFormProps) {
  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: initialData?.fullName || "",
    addressLine1: initialData?.addressLine1 || "",
    addressLine2: initialData?.addressLine2 || "",
    city: initialData?.city || "",
    state: initialData?.state || "",
    postalCode: initialData?.postalCode || "",
    country: initialData?.country || "India",
    phone: initialData?.phone || "",
    email: initialData?.email || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Form fields */}
      {/* Implement full form here */}
    </form>
  );
}
```

### Step 3: Create Shipping API Route

Create `app/api/shipping/calculate/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { address, items } = await request.json();

    // Calculate shipping cost based on address and items
    // Integrate with shipping provider API

    const shippingCost = calculateShipping(address, items);

    return NextResponse.json({
      cost: shippingCost,
      estimatedDays: 3-7,
      provider: "Shiprocket",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to calculate shipping" },
      { status: 500 }
    );
  }
}

function calculateShipping(address: any, items: any[]): number {
  // Implement shipping calculation logic
  return 150; // Base shipping cost
}
```

## 🛒 Cart & Checkout Implementation

### Step 1: Create Cart Context

Create `contexts/CartContext.tsx`:

```typescript
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/types/product";

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      setItems(JSON.parse(saved));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
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
```

### Step 2: Create Checkout Page

Create `app/checkout/page.tsx`:

```typescript
"use client";

import { useCart } from "@/contexts/CartContext";
import AddressForm from "@/components/Shipping/AddressForm";
import RazorpayCheckout from "@/components/Payment/RazorpayCheckout";
import { ShippingAddress } from "@/lib/api";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null);
  const [shippingCost, setShippingCost] = useState(0);

  const handleAddressSubmit = async (address: ShippingAddress) => {
    setShippingAddress(address);
    // Calculate shipping cost
    // const cost = await calculateShipping(address, items);
    // setShippingCost(cost);
  };

  const handlePaymentSuccess = async (paymentId: string) => {
    // Create order
    // Clear cart
    // Redirect to order confirmation
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-serif font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Shipping Address</h2>
            <AddressForm onSubmit={handleAddressSubmit} />
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            {/* Order summary component */}
            <div className="bg-white rounded-lg p-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.name} x {item.quantity}</span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <span>Shipping</span>
                    <span>₹{shippingCost}</span>
                  </div>
                  <div className="flex justify-between font-bold text-xl">
                    <span>Total</span>
                    <span>₹{total + shippingCost}</span>
                  </div>
                </div>
              </div>
              
              {shippingAddress && (
                <RazorpayCheckout
                  amount={total + shippingCost}
                  orderId="ORDER_ID"
                  onSuccess={handlePaymentSuccess}
                  onFailure={(error) => alert(error)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## 📦 Order Management

### Step 1: Create Order API Route

Create `app/api/orders/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { createOrder, getOrderStatus } from "@/lib/api";

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();
    const order = await createOrder(orderData);
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const orderId = searchParams.get("id");
  
  if (!orderId) {
    return NextResponse.json(
      { error: "Order ID required" },
      { status: 400 }
    );
  }

  try {
    const order = await getOrderStatus(orderId);
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json(
      { error: "Order not found" },
      { status: 404 }
    );
  }
}
```

### Step 2: Create Order Tracking Page

Create `app/orders/[id]/page.tsx`:

```typescript
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Order } from "@/lib/api";

export default function OrderTrackingPage() {
  const params = useParams();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    // Fetch order details
    // fetch(`/api/orders?id=${params.id}`)
    //   .then((res) => res.json())
    //   .then(setOrder);
  }, [params.id]);

  if (!order) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-serif font-bold mb-8">
          Order #{order.id}
        </h1>
        {/* Order details and tracking */}
      </div>
    </div>
  );
}
```

## 🔐 Environment Variables Setup

Create `.env.local` file:

```env
# Payment Gateway
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id

# Shipping
SHIPROCKET_EMAIL=your_email
SHIPROCKET_PASSWORD=your_password

# Database (if using)
DATABASE_URL=your_database_url

# NextAuth (if adding authentication)
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
```

## 🚀 Next Steps

1. **Database Integration**: Set up a database (PostgreSQL, MongoDB) to store orders and customer data
2. **Authentication**: Add user authentication using NextAuth.js
3. **Admin Panel**: Create an admin dashboard for managing orders and products
4. **Email Notifications**: Send order confirmation and tracking emails
5. **Inventory Management**: Track product stock and availability

## 📚 Resources

- [Razorpay Documentation](https://razorpay.com/docs/)
- [Shiprocket API Documentation](https://developers.shiprocket.in/)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [Next.js App Router](https://nextjs.org/docs/app)

---

**Note**: This is a guide for future implementation. The current codebase is structured to easily accommodate these features.



