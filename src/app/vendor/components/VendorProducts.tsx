"use client";

import { useState } from "react";
import { ChevronDown, Grid, List, ChevronRight } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";

const categories = [
  "All Products",
  "Laptops",
  "Smartphones",
  "Audio",
  "Tablets",
  "Wearables",
  "Accessories",
];

const vendorProducts = [
  {
    _id: "1",
    name: "Apple MacBook Pro 14-inch M3 Pro",
    slug: "macbook-pro-14-m3",
    images: [] as string[],
    sellingPrice: 199999,
    discountPrice: 184999,
    rating: 4.9,
    reviewCount: 234,
  },
  {
    _id: "2",
    name: "Samsung Galaxy S24 Ultra 256GB",
    slug: "samsung-galaxy-s24-ultra",
    images: [] as string[],
    sellingPrice: 129999,
    rating: 4.7,
    reviewCount: 432,
  },
  {
    _id: "3",
    name: "Sony WH-1000XM5 Wireless Headphones",
    slug: "sony-wh-1000xm5",
    images: [] as string[],
    sellingPrice: 39999,
    discountPrice: 34999,
    rating: 4.8,
    reviewCount: 567,
  },
  {
    _id: "4",
    name: "iPad Pro 12.9-inch M2 WiFi 256GB",
    slug: "ipad-pro-12-m2",
    images: [] as string[],
    sellingPrice: 109999,
    rating: 4.9,
    reviewCount: 345,
  },
  {
    _id: "5",
    name: "Apple Watch Series 9 GPS 45mm",
    slug: "apple-watch-series-9",
    images: [] as string[],
    sellingPrice: 42999,
    discountPrice: 39999,
    rating: 4.8,
    reviewCount: 289,
  },
  {
    _id: "6",
    name: "AirPods Pro 2nd Generation",
    slug: "airpods-pro-2",
    images: [] as string[],
    sellingPrice: 24999,
    rating: 4.7,
    reviewCount: 678,
  },
];

export default function VendorProducts() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [selectedCategory, setSelectedCategory] = useState("All Products");

  return (
    <div className="ks-vp-products-layout">
      {/* Sidebar */}
      <aside className="ks-vp-sidebar">
        <div className="ks-vp-sidebar-card">
          <h3 className="ks-vp-sidebar-title">Categories</h3>
          <ul className="ks-vp-sidebar-list">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => setSelectedCategory(cat)}
                  className={`ks-vp-sidebar-item ${selectedCategory === cat ? "ks-vp-sidebar-item-active" : ""}`}
                >
                  {cat}
                  <ChevronRight className="ks-vp-sidebar-item-arrow" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main */}
      <div className="ks-vp-main">
        {/* Toolbar */}
        <div className="ks-vp-toolbar">
          <div>
            <h2 className="ks-vp-toolbar-title">{selectedCategory}</h2>
            <p className="ks-vp-toolbar-count">
              {vendorProducts.length} products found
            </p>
          </div>

          <div className="ks-vp-toolbar-controls">
            <div className="ks-vp-sort-wrap">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="ks-vp-sort-select"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Best Rating</option>
              </select>
              <ChevronDown className="ks-vp-sort-arrow" />
            </div>

            <div className="ks-vp-view-toggle">
              <button
                onClick={() => setViewMode("grid")}
                className={`ks-vp-view-btn ${viewMode === "grid" ? "ks-vp-view-btn-active" : ""}`}
              >
                <Grid className="w-[18px] h-[18px]" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`ks-vp-view-btn ${viewMode === "list" ? "ks-vp-view-btn-active" : ""}`}
              >
                <List className="w-[18px] h-[18px]" />
              </button>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className={`ks-vp-grid ${viewMode === "list" ? "ks-vp-grid-list" : ""}`}>
          {vendorProducts.map((product) => (
            <div key={product._id} className="ks-vp-product-wrap">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
