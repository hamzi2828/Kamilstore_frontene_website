"use client";

import { useState } from "react";
import ProductCard from "@/components/ui/ProductCard";
import { SlidersHorizontal, Grid, List, ChevronDown, X } from "lucide-react";

// Mock data
const allProducts = [
  {
    _id: "1",
    name: "Apple MacBook Pro 14-inch M3 Pro",
    slug: "macbook-pro-14-m3",
    images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop"],
    sellingPrice: 1999.99,
    rating: 4.9,
    reviewCount: 234,
    vendor: { name: "TechZone", slug: "techzone" },
  },
  {
    _id: "2",
    name: "Sony WH-1000XM5 Wireless Headphones",
    slug: "sony-wh-1000xm5",
    images: ["https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop"],
    sellingPrice: 399.99,
    discountPrice: 349.99,
    rating: 4.8,
    reviewCount: 567,
    vendor: { name: "AudioMax", slug: "audiomax" },
  },
  {
    _id: "3",
    name: "Nike Air Max 270 Running Shoes",
    slug: "nike-air-max-270",
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop"],
    sellingPrice: 150.0,
    discountPrice: 119.99,
    rating: 4.6,
    reviewCount: 891,
    vendor: { name: "SportsFit Pro", slug: "sportsfit" },
  },
  {
    _id: "4",
    name: "Samsung Galaxy S24 Ultra 256GB",
    slug: "samsung-galaxy-s24-ultra",
    images: ["https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop"],
    sellingPrice: 1299.99,
    rating: 4.7,
    reviewCount: 432,
    vendor: { name: "TechZone", slug: "techzone" },
  },
  {
    _id: "5",
    name: "Dyson V15 Detect Vacuum Cleaner",
    slug: "dyson-v15-detect",
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop"],
    sellingPrice: 749.99,
    discountPrice: 649.99,
    rating: 4.8,
    reviewCount: 198,
    vendor: { name: "HomeStyle Decor", slug: "homestyle" },
  },
  {
    _id: "6",
    name: "Lululemon Align High-Rise Leggings",
    slug: "lululemon-align-leggings",
    images: ["https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&h=400&fit=crop"],
    sellingPrice: 98.0,
    rating: 4.7,
    reviewCount: 1023,
    vendor: { name: "FashionPlus", slug: "fashionplus" },
  },
];

const categories = [
  "All Categories",
  "Electronics",
  "Fashion",
  "Home & Garden",
  "Sports",
  "Beauty",
];

const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100 - $500", min: 100, max: 500 },
  { label: "$500 - $1000", min: 500, max: 1000 },
  { label: "Over $1000", min: 1000, max: Infinity },
];

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="site-container py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <span>Home</span>
          <span className="mx-2">/</span>
          <span className="text-gray-900">All Products</span>
        </nav>

        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
              <h3 className="font-semibold text-lg mb-4">Filters</h3>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-800 mb-3">Categories</h4>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category}>
                      <button
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left py-1 px-2 rounded ${
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

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-800 mb-3">Price Range</h4>
                <ul className="space-y-2">
                  {priceRanges.map((range) => (
                    <li key={range.label}>
                      <button
                        onClick={() => setSelectedPriceRange(range)}
                        className={`w-full text-left py-1 px-2 rounded ${
                          selectedPriceRange.label === range.label
                            ? "bg-orange-100 text-orange-600"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {range.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-800 mb-3">
                  Customer Rating
                </h4>
                <ul className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <li key={rating}>
                      <button className="flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-100 w-full text-left">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-lg ${
                                i < rating ? "text-yellow-400" : "text-gray-300"
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">& Up</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <button className="w-full py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                Apply Filters
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold">All Products</h1>
                  <p className="text-gray-500 text-sm">
                    Showing {allProducts.length} products
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  {/* Mobile Filter Button */}
                  <button
                    onClick={() => setShowFilters(true)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                  </button>

                  {/* Sort Dropdown */}
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
                      <option value="rating">Customer Rating</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>

                  {/* View Mode Toggle */}
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

            {/* Active Filters */}
            {(selectedCategory !== "All Categories" ||
              selectedPriceRange.label !== "All Prices") && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedCategory !== "All Categories" && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm">
                    {selectedCategory}
                    <button onClick={() => setSelectedCategory("All Categories")}>
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                )}
                {selectedPriceRange.label !== "All Prices" && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm">
                    {selectedPriceRange.label}
                    <button onClick={() => setSelectedPriceRange(priceRanges[0])}>
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Products Grid */}
            <div
              className={`grid gap-4 md:gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-2 md:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {allProducts.map((product) => (
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
                  3
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowFilters(false)}
          />
          <div className="absolute right-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg">Filters</h3>
              <button onClick={() => setShowFilters(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-800 mb-3">Categories</h4>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category}>
                    <button
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left py-2 px-3 rounded ${
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

            {/* Price Range */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-800 mb-3">Price Range</h4>
              <ul className="space-y-2">
                {priceRanges.map((range) => (
                  <li key={range.label}>
                    <button
                      onClick={() => setSelectedPriceRange(range)}
                      className={`w-full text-left py-2 px-3 rounded ${
                        selectedPriceRange.label === range.label
                          ? "bg-orange-100 text-orange-600"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {range.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setShowFilters(false)}
              className="w-full py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
