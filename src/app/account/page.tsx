"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Settings,
  LogOut,
  ChevronRight,
  Edit2,
} from "lucide-react";

// Mock user data
const user = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  avatar: "/avatars/user1.jpg",
  memberSince: "January 2023",
};

const recentOrders = [
  {
    _id: "ORD001",
    date: "2024-01-15",
    status: "Delivered",
    total: 2199.98,
    items: 2,
  },
  {
    _id: "ORD002",
    date: "2024-01-10",
    status: "Shipped",
    total: 149.99,
    items: 1,
  },
  {
    _id: "ORD003",
    date: "2024-01-05",
    status: "Processing",
    total: 599.99,
    items: 3,
  },
];

const menuItems = [
  { label: "My Orders", icon: Package, href: "/account/orders", count: 5 },
  { label: "Wishlist", icon: Heart, href: "/account/wishlist", count: 12 },
  { label: "Addresses", icon: MapPin, href: "/account/addresses" },
  { label: "Payment Methods", icon: CreditCard, href: "/account/payments" },
  { label: "Account Settings", icon: Settings, href: "/account/settings" },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Shipped":
        return "bg-blue-100 text-blue-700";
      case "Processing":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="site-container py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-orange-500">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">My Account</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              {/* User Info */}
              <div className="text-center mb-6 pb-6 border-b border-gray-200">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <Image
                    src={user.avatar || "/placeholder-avatar.jpg"}
                    alt={user.name}
                    fill
                    className="rounded-full object-cover"
                  />
                  <button className="absolute bottom-0 right-0 p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600">
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
                <h2 className="font-bold text-lg">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="text-xs text-gray-400 mt-1">Member since {user.memberSince}</p>
              </div>

              {/* Menu */}
              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-gray-500 group-hover:text-orange-500" />
                        <span className="font-medium text-gray-700 group-hover:text-orange-500">
                          {item.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.count && (
                          <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
                            {item.count}
                          </span>
                        )}
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </Link>
                  );
                })}
                <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 transition-colors w-full text-left group">
                  <LogOut className="w-5 h-5 text-gray-500 group-hover:text-red-500" />
                  <span className="font-medium text-gray-700 group-hover:text-red-500">
                    Sign Out
                  </span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
              <h1 className="text-2xl font-bold mb-2">Welcome back, {user.name.split(" ")[0]}!</h1>
              <p className="opacity-90">Manage your orders, wishlist, and account settings.</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                <Package className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">5</p>
                <p className="text-sm text-gray-500">Total Orders</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-gray-500">Wishlist Items</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                <MapPin className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-gray-500">Saved Addresses</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                <CreditCard className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">1</p>
                <p className="text-sm text-gray-500">Payment Methods</p>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-bold">Recent Orders</h2>
                <Link href="/account/orders" className="text-orange-500 hover:underline text-sm font-medium">
                  View All Orders
                </Link>
              </div>
              <div className="divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <div key={order._id} className="p-6 flex items-center justify-between">
                    <div>
                      <p className="font-medium">Order #{order._id}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(order.date).toLocaleDateString()} • {order.items} item(s)
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                      <p className="font-semibold mt-1">${order.total.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Profile Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Profile Information</h2>
                <button className="text-orange-500 hover:underline text-sm font-medium flex items-center gap-1">
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Full Name</label>
                  <p className="font-medium">{user.name}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Email Address</label>
                  <p className="font-medium">{user.email}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Phone Number</label>
                  <p className="font-medium">{user.phone}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Member Since</label>
                  <p className="font-medium">{user.memberSince}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
