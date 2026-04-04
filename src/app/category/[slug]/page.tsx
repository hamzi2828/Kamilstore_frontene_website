"use client";

import { useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";
import { SlidersHorizontal, Grid, List, ChevronDown, X, ChevronRight } from "lucide-react";

// Mock data
const categoryInfo = {
  name: "Electronics",
  slug: "electronics",
  description: "Discover the latest in electronics and gadgets. From smartphones to laptops, find everything you need.",
  productCount: 1234,
  subcategories: ["Smartphones", "Laptops", "Audio", "Cameras", "Wearables", "Accessories"],
};

const products = [
  {
    _id: "1",
    name: "Apple MacBook Pro 14-inch M3 Pro",
    slug: "macbook-pro-14-m3",
    images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop"],
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
    images: ["https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop"],
    sellingPrice: 1299.99,
    rating: 4.7,
    reviewCount: 432,
    vendor: { name: "TechZone", slug: "techzone" },
  },
  {
    _id: "3",
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
    _id: "4",
    name: "iPad Pro 12.9-inch M2 WiFi 256GB",
    slug: "ipad-pro-12-m2",
    images: ["https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop"],
    sellingPrice: 1099.99,
    rating: 4.9,
    reviewCount: 345,
    vendor: { name: "TechZone", slug: "techzone" },
  },
  {
    _id: "5",
    name: "Apple Watch Series 9 GPS 45mm",
    slug: "apple-watch-series-9",
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop"],
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
    images: ["https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop"],
    sellingPrice: 249.99,
    rating: 4.7,
    reviewCount: 678,
    vendor: { name: "TechZone", slug: "techzone" },
  },
];

const brands = ["Apple", "Samsung", "Sony", "LG", "Dell", "HP", "Bose"];

const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under $100", min: 0, max: 100 },
  { label: "$100 - $500", min: 100, max: 500 },
  { label: "$500 - $1000", min: 500, max: 1000 },
  { label: "Over $1000", min: 1000, max: Infinity },
];

export default function CategoryPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [showFilters, setShowFilters] = useState(false);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Category Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="site-container">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-blue-100 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{categoryInfo.name}</span>
          </nav>

          <h1 className="text-3xl md:text-4xl font-bold mb-2">{categoryInfo.name}</h1>
          <p className="text-blue-100 max-w-2xl">{categoryInfo.description}</p>
          <p className="text-sm text-blue-200 mt-2">{categoryInfo.productCount} products</p>
        </div>
      </div>

      {/* Subcategories */}
      <div className="bg-white border-b border-gray-200">
        <div className="site-container">
          <div className="flex gap-4 py-4 overflow-x-auto">
            <button
              onClick={() => setSelectedSubcategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                !selectedSubcategory
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            {categoryInfo.subcategories.map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubcategory(sub)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedSubcategory === sub
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="site-container py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
              <h3 className="font-semibold text-lg mb-4">Filters</h3>

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
                            ? "bg-blue-100 text-blue-600"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {range.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Brands */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-800 mb-3">Brands</h4>
                <ul className="space-y-2">
                  {brands.map((brand) => (
                    <li key={brand}>
                      <label className="flex items-center gap-2 cursor-pointer py-1 px-2 hover:bg-gray-100 rounded">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => toggleBrand(brand)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span>{brand}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-800 mb-3">Customer Rating</h4>
                <ul className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <li key={rating}>
                      <button className="flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-100 w-full text-left">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-lg ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
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

              <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
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
                  <h2 className="text-xl font-semibold">
                    {selectedSubcategory || "All Products"}
                  </h2>
                  <p className="text-gray-500 text-sm">{products.length} products</p>
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

                  {/* Sort */}
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:border-blue-500"
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
                      className={`p-2 ${viewMode === "grid" ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`}
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 ${viewMode === "list" ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedBrands.length > 0 || selectedPriceRange.label !== "All Prices") && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedBrands.map((brand) => (
                  <span key={brand} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                    {brand}
                    <button onClick={() => toggleBrand(brand)}>
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
                {selectedPriceRange.label !== "All Prices" && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                    {selectedPriceRange.label}
                    <button onClick={() => setSelectedPriceRange(priceRanges[0])}>
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Products Grid */}
            <div className={`grid gap-4 md:gap-6 ${viewMode === "grid" ? "grid-cols-2 md:grid-cols-3" : "grid-cols-1"}`}>
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <nav className="flex items-center gap-2">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 bg-white">Previous</button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">1</button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 bg-white">2</button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 bg-white">3</button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 bg-white">Next</button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilters(false)} />
          <div className="absolute right-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg">Filters</h3>
              <button onClick={() => setShowFilters(false)}>
                <X className="w-6 h-6" />
              </button>
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
                          ? "bg-blue-100 text-blue-600"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {range.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Brands */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-800 mb-3">Brands</h4>
              <ul className="space-y-2">
                {brands.map((brand) => (
                  <li key={brand}>
                    <label className="flex items-center gap-2 cursor-pointer py-2 px-3 hover:bg-gray-100 rounded">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span>{brand}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setShowFilters(false)}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
