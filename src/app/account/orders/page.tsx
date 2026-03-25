"use client";

import { useState } from "react";
import Link from "next/link";
import { Package, ChevronRight, Search, Filter, Eye, RotateCcw } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import ProductImage from "@/components/ui/ProductImage";

// Mock orders data
const orders = [
  {
    _id: "ORD001",
    date: "2024-01-15",
    status: "Delivered",
    total: 2199.98,
    items: [
      {
        name: "Apple MacBook Pro 14-inch M3 Pro",
        image: "/products/macbook.jpg",
        quantity: 1,
        price: 1849.99,
      },
      {
        name: "Sony WH-1000XM5 Wireless Headphones",
        image: "/products/sony-headphones.jpg",
        quantity: 1,
        price: 349.99,
      },
    ],
    shippingAddress: "123 Main St, New York, NY 10001",
    trackingNumber: "1Z999AA10123456784",
  },
  {
    _id: "ORD002",
    date: "2024-01-10",
    status: "Shipped",
    total: 149.99,
    items: [
      {
        name: "USB-C Hub Adapter 7-in-1",
        image: "/products/hub.jpg",
        quantity: 1,
        price: 49.99,
      },
      {
        name: "Wireless Charging Pad",
        image: "/products/charger.jpg",
        quantity: 2,
        price: 50.00,
      },
    ],
    shippingAddress: "123 Main St, New York, NY 10001",
    trackingNumber: "1Z999AA10123456785",
  },
  {
    _id: "ORD003",
    date: "2024-01-05",
    status: "Processing",
    total: 599.99,
    items: [
      {
        name: "iPad Pro 12.9-inch Case",
        image: "/products/ipad-case.jpg",
        quantity: 1,
        price: 79.99,
      },
      {
        name: "Apple Pencil 2nd Generation",
        image: "/products/pencil.jpg",
        quantity: 1,
        price: 129.00,
      },
      {
        name: "Magic Keyboard for iPad Pro",
        image: "/products/magic-keyboard.jpg",
        quantity: 1,
        price: 349.00,
      },
    ],
    shippingAddress: "123 Main St, New York, NY 10001",
  },
  {
    _id: "ORD004",
    date: "2023-12-20",
    status: "Cancelled",
    total: 299.99,
    items: [
      {
        name: "Beats Studio Pro Headphones",
        image: "/products/beats.jpg",
        quantity: 1,
        price: 299.99,
      },
    ],
    shippingAddress: "123 Main St, New York, NY 10001",
  },
];

export default function OrdersPage() {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const statusOptions = ["all", "Processing", "Shipped", "Delivered", "Cancelled"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Shipped":
        return "bg-blue-100 text-blue-700";
      case "Processing":
        return "bg-yellow-100 text-yellow-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus;
    const matchesSearch = order._id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="site-container py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-orange-500">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/account" className="hover:text-orange-500">Account</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">Orders</span>
        </nav>

        <div className="flex items-center gap-3 mb-8">
          <Package className="w-8 h-8 text-orange-500" />
          <h1 className="text-3xl font-bold">My Orders</h1>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by order ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <div className="flex flex-wrap gap-2">
                {statusOptions.map((status) => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${
                      selectedStatus === status
                        ? "bg-orange-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order._id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Order Header */}
              <div className="p-4 md:p-6 border-b border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-4">
                    <div>
                      <p className="font-semibold text-lg">Order #{order._id}</p>
                      <p className="text-sm text-gray-500">
                        Placed on {new Date(order.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-lg">{formatPrice(order.total)}</span>
                    <button
                      onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                      className="flex items-center gap-1 text-orange-500 hover:underline"
                    >
                      <Eye className="w-4 h-4" />
                      {expandedOrder === order._id ? "Hide Details" : "View Details"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Order Items Preview */}
              <div className="p-4 md:p-6">
                <div className="flex flex-wrap gap-4">
                  {order.items.slice(0, 3).map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                        <ProductImage
                          src={item.image}
                          alt={item.name}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-sm line-clamp-1">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-lg">
                      <span className="text-sm text-gray-500">+{order.items.length - 3} more</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Expanded Details */}
              {expandedOrder === order._id && (
                <div className="border-t border-gray-200 p-4 md:p-6 bg-gray-50">
                  {/* All Items */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-4">Order Items</h4>
                    <div className="space-y-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between bg-white p-4 rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                              <ProductImage
                                src={item.image}
                                alt={item.name}
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                            </div>
                          </div>
                          <p className="font-semibold">{formatPrice(item.price)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Shipping Address</h4>
                      <p className="text-gray-600">{order.shippingAddress}</p>
                    </div>
                    {order.trackingNumber && (
                      <div>
                        <h4 className="font-semibold mb-2">Tracking Number</h4>
                        <p className="text-orange-500 font-mono">{order.trackingNumber}</p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-6">
                    {order.status === "Delivered" && (
                      <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
                        <RotateCcw className="w-4 h-4" />
                        Return Items
                      </button>
                    )}
                    <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                      Buy Again
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No orders found</h3>
            <p className="text-gray-500 mb-6">
              {searchQuery
                ? "Try adjusting your search or filter"
                : "You haven't placed any orders yet"}
            </p>
            <Link
              href="/products"
              className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
