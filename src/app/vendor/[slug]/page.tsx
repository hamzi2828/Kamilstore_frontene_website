"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Star,
  CheckCircle,
  MapPin,
  Calendar,
  Package,
  MessageCircle,
  ChevronDown,
  Grid,
  List,
} from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import ProductImage from "@/components/ui/ProductImage";
import VendorAvatar from "@/components/ui/VendorAvatar";

// Mock vendor data
const vendor = {
  _id: "v1",
  name: "TechZone Electronics",
  slug: "techzone",
  logo: "/vendors/techzone.jpg",
  coverImage: "/vendors/techzone-cover.jpg",
  description:
    "Your trusted source for premium electronics and gadgets. We offer a wide range of products from leading brands including Apple, Samsung, Sony, and more. Quality products at competitive prices with fast shipping and excellent customer service.",
  rating: 4.8,
  reviewCount: 1250,
  productCount: 342,
  isVerified: true,
  joinedAt: "2022-03-15",
  location: "New York, USA",
  responseRate: "98%",
  responseTime: "Within 2 hours",
};

const vendorProducts = [
  {
    _id: "1",
    name: "Apple MacBook Pro 14-inch M3 Pro",
    slug: "macbook-pro-14-m3",
    images: ["/products/macbook.jpg"],
    sellingPrice: 1999.99,
    discountPrice: 1849.99,
    rating: 4.9,
    reviewCount: 234,
    vendor: { name: "TechZone", slug: "techzone" },
  },
  {
    _id: "2",
    name: "Samsung Galaxy S24 Ultra 256GB",
    slug: "samsung-galaxy-s24-ultra",
    images: ["/products/samsung-phone.jpg"],
    sellingPrice: 1299.99,
    rating: 4.7,
    reviewCount: 432,
    vendor: { name: "TechZone", slug: "techzone" },
  },
  {
    _id: "3",
    name: "Sony WH-1000XM5 Wireless Headphones",
    slug: "sony-wh-1000xm5",
    images: ["/products/sony-headphones.jpg"],
    sellingPrice: 399.99,
    discountPrice: 349.99,
    rating: 4.8,
    reviewCount: 567,
    vendor: { name: "TechZone", slug: "techzone" },
  },
  {
    _id: "4",
    name: "iPad Pro 12.9-inch M2 WiFi 256GB",
    slug: "ipad-pro-12-m2",
    images: ["/products/ipad.jpg"],
    sellingPrice: 1099.99,
    rating: 4.9,
    reviewCount: 345,
    vendor: { name: "TechZone", slug: "techzone" },
  },
  {
    _id: "5",
    name: "Apple Watch Series 9 GPS 45mm",
    slug: "apple-watch-series-9",
    images: ["/products/apple-watch.jpg"],
    sellingPrice: 429.99,
    discountPrice: 399.99,
    rating: 4.8,
    reviewCount: 289,
    vendor: { name: "TechZone", slug: "techzone" },
  },
  {
    _id: "6",
    name: "AirPods Pro 2nd Generation",
    slug: "airpods-pro-2",
    images: ["/products/airpods.jpg"],
    sellingPrice: 249.99,
    rating: 4.7,
    reviewCount: 678,
    vendor: { name: "TechZone", slug: "techzone" },
  },
];

const categories = [
  "All Products",
  "Laptops",
  "Smartphones",
  "Audio",
  "Tablets",
  "Wearables",
  "Accessories",
];

export default function VendorPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [selectedCategory, setSelectedCategory] = useState("All Products");

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Cover Image */}
      <div className="relative h-48 md:h-64 bg-gradient-to-r from-orange-500 to-orange-600">
        {vendor.coverImage && (
          <ProductImage
            src={vendor.coverImage}
            alt={vendor.name}
            className="object-cover opacity-50"
          />
        )}
      </div>

      {/* Vendor Info */}
      <div className="site-container">
        <div className="relative -mt-16 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Logo */}
              <div className="flex-shrink-0 -mt-20 md:-mt-12">
                <VendorAvatar
                  src={vendor.logo}
                  name={vendor.name}
                  size="lg"
                  className="!w-32 !h-32 border-4 border-white shadow-lg"
                />
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-2xl font-bold text-gray-800">
                        {vendor.name}
                      </h1>
                      {vendor.isVerified && (
                        <CheckCircle className="w-6 h-6 text-blue-500" />
                      )}
                    </div>
                    <p className="text-gray-600 mt-2 max-w-2xl">
                      {vendor.description}
                    </p>
                  </div>

                  <button className="flex items-center gap-2 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    Contact Seller
                  </button>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-6 mt-6">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold">{vendor.rating}</span>
                    <span className="text-gray-500">
                      ({vendor.reviewCount} reviews)
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Package className="w-5 h-5" />
                    <span>{vendor.productCount} Products</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-5 h-5" />
                    <span>{vendor.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-5 h-5" />
                    <span>Joined {new Date(vendor.joinedAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Response Info */}
                <div className="flex gap-6 mt-4 text-sm">
                  <div>
                    <span className="text-gray-500">Response Rate:</span>
                    <span className="ml-2 font-medium text-green-600">
                      {vendor.responseRate}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Response Time:</span>
                    <span className="ml-2 font-medium">
                      {vendor.responseTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="flex gap-8 pb-12">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
              <h3 className="font-semibold text-lg mb-4">Categories</h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category}>
                    <button
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left py-2 px-3 rounded-lg ${
                        selectedCategory === category
                          ? "bg-orange-100 text-orange-600"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1">
            {/* Header */}
            <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold">
                    {selectedCategory === "All Products"
                      ? "All Products"
                      : selectedCategory}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    {vendorProducts.length} products
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  {/* Sort */}
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:border-orange-500"
                    >
                      <option value="featured">Featured</option>
                      <option value="newest">Newest</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Best Rating</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>

                  {/* View Toggle */}
                  <div className="hidden md:flex border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 ${
                        viewMode === "grid"
                          ? "bg-orange-500 text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 ${
                        viewMode === "list"
                          ? "bg-orange-500 text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div
              className={`grid gap-4 md:gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-2 md:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {vendorProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <nav className="flex items-center gap-2">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-4 py-2 bg-orange-500 text-white rounded-lg">
                  1
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  2
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
