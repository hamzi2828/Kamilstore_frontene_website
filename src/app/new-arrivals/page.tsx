"use client";

import { useState } from "react";
import {
  Sparkles, Flame, TrendingUp, ChevronDown,
  Package, Clock, Star,
} from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import Breadcrumb from "@/components/ui/Breadcrumb";
import "@/styling/FlashSalePage.css";

const allProducts = [
  { _id: "1", name: "Smart Home Security Camera 4K WiFi", slug: "smart-security-camera", images: ["https://images.unsplash.com/photo-1558002038-1055907df827?w=400&h=400&fit=crop"], sellingPrice: 89.99, discountPrice: 69.99, rating: 4.6, reviewCount: 42, vendor: { name: "TechZone", slug: "techzone" } },
  { _id: "2", name: "Bamboo Wireless Charging Station", slug: "bamboo-charging-station", images: ["https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop"], sellingPrice: 49.99, discountPrice: 39.99, rating: 4.4, reviewCount: 18, vendor: { name: "GadgetHub", slug: "gadgethub" } },
  { _id: "3", name: "Organic Cotton Oversized Hoodie", slug: "organic-cotton-hoodie", images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop"], sellingPrice: 79.99, discountPrice: 59.99, rating: 4.7, reviewCount: 35, vendor: { name: "FashionPlus", slug: "fashionplus" } },
  { _id: "4", name: "Noise Cancelling Earbuds Pro Max", slug: "nc-earbuds-pro-max", images: ["https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400&h=400&fit=crop"], sellingPrice: 159.99, discountPrice: 119.99, rating: 4.8, reviewCount: 67, vendor: { name: "TechZone", slug: "techzone" } },
  { _id: "5", name: "Minimalist Desk Organizer Walnut Wood", slug: "desk-organizer-walnut", images: ["https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=400&fit=crop"], sellingPrice: 44.99, discountPrice: 34.99, rating: 4.3, reviewCount: 23, vendor: { name: "HomeEssentials", slug: "homeessentials" } },
  { _id: "6", name: "Trail Running Shoes All-Terrain Grip", slug: "trail-running-shoes", images: ["https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400&h=400&fit=crop"], sellingPrice: 134.99, discountPrice: 99.99, rating: 4.5, reviewCount: 56, vendor: { name: "SportsFit Pro", slug: "sportsfit" } },
  { _id: "7", name: "Portable Espresso Maker Travel Size", slug: "portable-espresso-maker", images: ["https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop"], sellingPrice: 69.99, discountPrice: 54.99, rating: 4.6, reviewCount: 89, vendor: { name: "HomeEssentials", slug: "homeessentials" } },
  { _id: "8", name: "UV Protection Polarized Sunglasses", slug: "polarized-sunglasses", images: ["https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop"], sellingPrice: 59.99, discountPrice: 39.99, rating: 4.2, reviewCount: 31, vendor: { name: "FashionPlus", slug: "fashionplus" } },
];

const categoryFilters = ["All", "Electronics", "Fashion", "Sports", "Home"];

export default function NewArrivalsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  return (
    <>
      <Breadcrumb items={[{ label: "New Arrivals" }]} />

      <div className="flex flex-col gap-5 sm:gap-6 pt-4 sm:pt-5 pb-20 sm:pb-28">
        {/* ── Header Card ── */}
        <section className="site-container">
          <div className="bg-white rounded-2xl overflow-hidden">
            <div className="ks-fs-accent-bar" />

            <div className="p-5 sm:p-6">
              <div className="ks-fs-header-row">
                {/* Left: Title */}
                <div className="flex items-center gap-3.5">
                  <div className="ks-fs-icon-box" style={{ background: "linear-gradient(135deg, #faf5ff, #f3e8ff)", borderColor: "#d8b4fe" }}>
                    <Sparkles className="w-[22px] h-[22px] text-purple-500" />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-[28px] font-extrabold text-[#111] tracking-tight leading-tight">
                      New Arrivals
                    </h1>
                    <p className="text-sm text-[#999] font-medium mt-1.5">
                      Fresh products just added this week
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="ks-fs-stats-strip">
                <div className="ks-fs-stat">
                  <Package className="w-[18px] h-[18px] text-purple-500" />
                  <span className="ks-fs-stat-value">{allProducts.length}</span>
                  <span className="ks-fs-stat-label">New Products</span>
                </div>
                <div className="ks-fs-stat-sep" />
                <div className="ks-fs-stat">
                  <Clock className="w-[18px] h-[18px] text-blue-500" />
                  <span className="ks-fs-stat-value">24h</span>
                  <span className="ks-fs-stat-label">Latest Added</span>
                </div>
                <div className="ks-fs-stat-sep" />
                <div className="ks-fs-stat">
                  <Star className="w-[18px] h-[18px] text-amber-500" />
                  <span className="ks-fs-stat-value">4.5</span>
                  <span className="ks-fs-stat-label">Avg Rating</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Products Grid ── */}
        <section className="site-container">
          <div className="bg-white rounded-2xl p-5 sm:p-6">
            {/* Filter bar */}
            <div className="ks-fs-filter-bar">
              <div className="ks-fs-category-pills">
                {categoryFilters.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`ks-fs-pill ${selectedCategory === cat ? "ks-fs-pill-active" : ""}`}
                    style={selectedCategory === cat ? { background: "#a855f7", borderColor: "#a855f7" } : {}}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="ks-fs-sort-wrap">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="ks-fs-sort-select"
                >
                  <option value="newest">Newest First</option>
                  <option value="popular">Most Popular</option>
                  <option value="rating">Top Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
                <ChevronDown className="ks-fs-sort-arrow" />
              </div>
            </div>

            <p className="text-[13px] text-[#999] font-medium mb-5">
              Showing <strong className="text-[#555]">{allProducts.length}</strong> new arrivals
            </p>

            {/* Grid */}
            <div className="ks-fs-grid">
              {allProducts.map((p) => (
                <div key={p._id} className="ks-fs-product">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>

            {/* Bottom info */}
            <div className="ks-fs-bottom-info">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span>New products added <strong>daily</strong> &middot; Be the first to discover them!</span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
