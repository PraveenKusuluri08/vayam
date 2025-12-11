"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Package, Eye, Download, Truck, CheckCircle, Clock, XCircle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  orderItems: {
    id: string;
    product: {
      id: string;
      name: string;
      images: string[];
    };
    quantity: number;
    price: number;
  }[];
}

export default function OrdersSection() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, [session]);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/profile/orders");
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "SHIPPED":
        return <Truck className="w-5 h-5 text-blue-600" />;
      case "PROCESSING":
      case "CONFIRMED":
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case "CANCELLED":
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Package className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return "bg-green-100 text-green-700";
      case "SHIPPED":
        return "bg-blue-100 text-blue-700";
      case "PROCESSING":
      case "CONFIRMED":
        return "bg-yellow-100 text-yellow-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading orders...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-serif font-bold text-navy-900">Order History</h2>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">You haven't placed any orders yet</p>
          <Link
            href="/#products"
            className="inline-block px-6 py-2 gradient-gold text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-navy-900">
                      Order #{order.orderNumber}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusIcon(order.status)}
                      <span>{order.status}</span>
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Placed on {new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="mt-4 md:mt-0 text-right">
                  <p className="text-2xl font-bold text-gold-600">
                    {formatCurrency(order.totalAmount)}
                  </p>
                  <p className="text-sm text-gray-600">
                    {order.orderItems.length} item{order.orderItems.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {order.orderItems.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                        {item.product.images && item.product.images[0] ? (
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-navy-900 line-clamp-1">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-gray-600">
                          Qty: {item.quantity} × {formatCurrency(item.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                  {order.orderItems.length > 3 && (
                    <div className="flex items-center justify-center text-sm text-gray-600">
                      +{order.orderItems.length - 3} more
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/orders/${order.id}`}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-gold-500 hover:text-gold-600 transition-all flex items-center space-x-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Details</span>
                  </Link>
                  {order.status === "DELIVERED" && (
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-gold-500 hover:text-gold-600 transition-all flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Download Invoice</span>
                  </button>
                  )}
                  {order.status === "SHIPPED" && (
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-gold-500 hover:text-gold-600 transition-all flex items-center space-x-2">
                      <Truck className="w-4 h-4" />
                      <span>Track Order</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

