"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Zap, Flame, Clock, TrendingUp, ArrowRight,
  ChevronDown, Grid, List, SlidersHorizontal,
} from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import Breadcrumb from "@/components/ui/Breadcrumb";
import "@/styling/FlashSalePage.css";

const allProducts = [
  { _id: "1", name: "Wireless Bluetooth Headphones with Noise Cancellation", slug: "wireless-bluetooth-headphones", images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"], sellingPrice: 199.99, discountPrice: 99.99, rating: 4.5, reviewCount: 128, vendor: { name: "TechZone", slug: "techzone" }, sold: 76, total: 100 },
  { _id: "2", name: "Smart Watch Series 5 - Fitness Tracker", slug: "smart-watch-series-5", images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop"], sellingPrice: 299.99, discountPrice: 149.99, rating: 4.8, reviewCount: 256, vendor: { name: "GadgetHub", slug: "gadgethub" }, sold: 89, total: 100 },
  { _id: "3", name: "Premium Leather Backpack - Waterproof", slug: "premium-leather-backpack", images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop"], sellingPrice: 129.99, discountPrice: 79.99, rating: 4.3, reviewCount: 89, vendor: { name: "FashionPlus", slug: "fashionplus" }, sold: 45, total: 100 },
  { _id: "4", name: "Portable Power Bank 20000mAh Fast Charging", slug: "portable-power-bank", images: ["https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop"], sellingPrice: 59.99, discountPrice: 34.99, rating: 4.6, reviewCount: 312, vendor: { name: "TechZone", slug: "techzone" }, sold: 92, total: 100 },
  { _id: "5", name: "Apple AirPods Pro 2nd Generation", slug: "airpods-pro-2", images: ["https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop"], sellingPrice: 249.99, discountPrice: 189.99, rating: 4.7, reviewCount: 567, vendor: { name: "TechZone", slug: "techzone" }, sold: 81, total: 100 },
  { _id: "6", name: "Running Shoes Ultra Lightweight Comfort", slug: "running-shoes-ultra", images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop"], sellingPrice: 120.00, discountPrice: 69.99, rating: 4.4, reviewCount: 203, vendor: { name: "SportsFit Pro", slug: "sportsfit" }, sold: 63, total: 100 },
  { _id: "7", name: "Mechanical Gaming Keyboard RGB Backlit", slug: "gaming-keyboard-rgb", images: ["https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&h=400&fit=crop"], sellingPrice: 89.99, discountPrice: 54.99, rating: 4.5, reviewCount: 178, vendor: { name: "TechZone", slug: "techzone" }, sold: 57, total: 100 },
  { _id: "8", name: "Minimalist Leather Wallet RFID Blocking", slug: "leather-wallet-rfid", images: ["https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop"], sellingPrice: 45.99, discountPrice: 24.99, rating: 4.2, reviewCount: 94, vendor: { name: "FashionPlus", slug: "fashionplus" }, sold: 38, total: 100 },
];

const categoryFilters = ["All", "Electronics", "Fashion", "Sports", "Accessories"];

export default function FlashSalePage() {
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 23, seconds: 45 });
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  useEffect(() => {
    const t = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  const timerUnits = [
    { value: pad(timeLeft.hours), label: "Hours" },
    { value: pad(timeLeft.minutes), label: "Min" },
    { value: pad(timeLeft.seconds), label: "Sec" },
  ];

  return (
    <>
      <Breadcrumb items={[{ label: "Flash Sale" }]} />

      <div className="flex flex-col gap-5 sm:gap-6 pt-4 sm:pt-5 pb-20 sm:pb-28">
        {/* ── Header Card ── */}
        <section className="site-container">
          <div className="bg-white rounded-2xl overflow-hidden">
            <div className="ks-fs-accent-bar" />

            <div className="p-5 sm:p-6">
              <div className="ks-fs-header-row">
                {/* Left: Title */}
                <div className="flex items-center gap-3.5">
                  <div className="ks-fs-icon-box">
                    <Zap className="ks-fs-icon-svg" />
                    <div className="ks-fs-icon-pulse" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <h1 className="text-2xl sm:text-[28px] font-extrabold text-[#111] tracking-tight leading-tight">
                        Flash Sale
                      </h1>
                      <span className="ks-fs-live-badge">
                        <span className="ks-fs-live-dot" />
                        LIVE NOW
                      </span>
                    </div>
                    <p className="text-sm text-[#999] font-medium mt-1.5">
                      {allProducts.length} deals with up to 60% off
                    </p>
                  </div>
                </div>

                {/* Right: Timer */}
                <div className="ks-fs-timer-area">
                  <div className="ks-fs-timer-label">
                    <Clock className="w-3.5 h-3.5 text-[#ccc]" />
                    <span>Sale ends in</span>
                  </div>
                  <div className="ks-fs-timer">
                    {timerUnits.map((unit, i) => (
                      <div key={i} className="ks-fs-timer-group">
                        {i > 0 && (
                          <div className="ks-fs-timer-sep">
                            <span /><span />
                          </div>
                        )}
                        <div className="ks-fs-timer-card">
                          <div className="ks-fs-timer-card-inner">
                            <span className="ks-fs-timer-digit">{unit.value}</span>
                          </div>
                          <span className="ks-fs-timer-unit">{unit.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="ks-fs-stats-strip">
                <div className="ks-fs-stat">
                  <Zap className="w-[18px] h-[18px] text-red-500" />
                  <span className="ks-fs-stat-value">{allProducts.length}</span>
                  <span className="ks-fs-stat-label">Active Deals</span>
                </div>
                <div className="ks-fs-stat-sep" />
                <div className="ks-fs-stat">
                  <TrendingUp className="w-[18px] h-[18px] text-emerald-500" />
                  <span className="ks-fs-stat-value">60%</span>
                  <span className="ks-fs-stat-label">Max Discount</span>
                </div>
                <div className="ks-fs-stat-sep" />
                <div className="ks-fs-stat">
                  <Flame className="w-[18px] h-[18px] text-amber-500" />
                  <span className="ks-fs-stat-value">2.4k+</span>
                  <span className="ks-fs-stat-label">Items Sold</span>
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
                  <option value="featured">Featured</option>
                  <option value="discount">Biggest Discount</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="ending">Ending Soon</option>
                </select>
                <ChevronDown className="ks-fs-sort-arrow" />
              </div>
            </div>

            <p className="text-[13px] text-[#999] font-medium mb-5">
              Showing <strong className="text-[#555]">{allProducts.length}</strong> flash deals
            </p>

            {/* Grid */}
            <div className="ks-fs-grid">
              {allProducts.map((p) => {
                const pct = Math.round((p.sold / p.total) * 100);
                const isHot = pct >= 80;
                return (
                  <div key={p._id} className="ks-fs-product">
                    <ProductCard product={p} />
                    {/* Sold bar */}
                    <div className="ks-fs-sold-section">
                      <div className="ks-fs-sold-track">
                        <div
                          className={`ks-fs-sold-bar ${isHot ? "ks-fs-sold-bar-hot" : ""}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <div className="ks-fs-sold-info">
                        <span className="ks-fs-sold-text">
                          <TrendingUp className="w-3 h-3 text-orange-400" />
                          {p.sold} sold
                        </span>
                        {isHot && (
                          <span className="ks-fs-hot-badge">
                            <Flame className="w-3 h-3" />
                            Almost gone!
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom info */}
            <div className="ks-fs-bottom-info">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>New flash deals added every <strong>6 hours</strong> &middot; Don&apos;t miss out!</span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
