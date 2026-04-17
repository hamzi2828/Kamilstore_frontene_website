"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Zap, Flame, Clock, TrendingUp,
  ChevronDown, SlidersHorizontal, X,
} from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import Breadcrumb from "@/components/ui/Breadcrumb";
import "@/styling/FlashSalePage.css";

const allProducts = [
  { _id: "1", name: "Wireless Bluetooth Headphones with Noise Cancellation", slug: "wireless-bluetooth-headphones", images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"], sellingPrice: 199.99, discountPrice: 99.99, rating: 4.5, reviewCount: 128, vendor: { name: "TechZone", slug: "techzone" }, sold: 76, total: 100, category: "Electronics" },
  { _id: "2", name: "Smart Watch Series 5 - Fitness Tracker", slug: "smart-watch-series-5", images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop"], sellingPrice: 299.99, discountPrice: 149.99, rating: 4.8, reviewCount: 256, vendor: { name: "GadgetHub", slug: "gadgethub" }, sold: 89, total: 100, category: "Electronics" },
  { _id: "3", name: "Premium Leather Backpack - Waterproof", slug: "premium-leather-backpack", images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop"], sellingPrice: 129.99, discountPrice: 79.99, rating: 4.3, reviewCount: 89, vendor: { name: "FashionPlus", slug: "fashionplus" }, sold: 45, total: 100, category: "Fashion" },
  { _id: "4", name: "Portable Power Bank 20000mAh Fast Charging", slug: "portable-power-bank", images: ["https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop"], sellingPrice: 59.99, discountPrice: 34.99, rating: 4.6, reviewCount: 312, vendor: { name: "TechZone", slug: "techzone" }, sold: 92, total: 100, category: "Accessories" },
  { _id: "5", name: "Apple AirPods Pro 2nd Generation", slug: "airpods-pro-2", images: ["https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop"], sellingPrice: 249.99, discountPrice: 189.99, rating: 4.7, reviewCount: 567, vendor: { name: "TechZone", slug: "techzone" }, sold: 81, total: 100, category: "Electronics" },
  { _id: "6", name: "Running Shoes Ultra Lightweight Comfort", slug: "running-shoes-ultra", images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop"], sellingPrice: 120.00, discountPrice: 69.99, rating: 4.4, reviewCount: 203, vendor: { name: "SportsFit Pro", slug: "sportsfit" }, sold: 63, total: 100, category: "Sports" },
  { _id: "7", name: "Mechanical Gaming Keyboard RGB Backlit", slug: "gaming-keyboard-rgb", images: ["https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&h=400&fit=crop"], sellingPrice: 89.99, discountPrice: 54.99, rating: 4.5, reviewCount: 178, vendor: { name: "TechZone", slug: "techzone" }, sold: 57, total: 100, category: "Electronics" },
  { _id: "8", name: "Minimalist Leather Wallet RFID Blocking", slug: "leather-wallet-rfid", images: ["https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop"], sellingPrice: 45.99, discountPrice: 24.99, rating: 4.2, reviewCount: 94, vendor: { name: "FashionPlus", slug: "fashionplus" }, sold: 38, total: 100, category: "Fashion" },
];

const categories = ["All Categories", "Electronics", "Fashion", "Sports", "Accessories"];

const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100 - $200", min: 100, max: 200 },
  { label: "Over $200", min: 200, max: Infinity },
];

const discountRanges = [
  { label: "All Discounts", min: 0 },
  { label: "30% or more", min: 30 },
  { label: "50% or more", min: 50 },
  { label: "70% or more", min: 70 },
];

type FilterPanelProps = {
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
  selectedPriceRange: (typeof priceRanges)[number];
  setSelectedPriceRange: (v: (typeof priceRanges)[number]) => void;
  selectedDiscount: (typeof discountRanges)[number];
  setSelectedDiscount: (v: (typeof discountRanges)[number]) => void;
  onApply?: () => void;
};

function FilterPanel({
  selectedCategory, setSelectedCategory,
  selectedPriceRange, setSelectedPriceRange,
  selectedDiscount, setSelectedDiscount,
  onApply,
}: FilterPanelProps) {
  return (
    <>
      {/* Categories */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 mb-3 text-sm">Categories</h4>
        <ul className="space-y-1">
          {categories.map((category) => (
            <li key={category}>
              <button
                onClick={() => setSelectedCategory(category)}
                className={`w-full text-left py-1.5 px-2.5 rounded-lg text-sm transition-colors ${
                  selectedCategory === category
                    ? "bg-orange-100 text-orange-600 font-semibold"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Price range */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 mb-3 text-sm">Price Range</h4>
        <ul className="space-y-1">
          {priceRanges.map((range) => (
            <li key={range.label}>
              <button
                onClick={() => setSelectedPriceRange(range)}
                className={`w-full text-left py-1.5 px-2.5 rounded-lg text-sm transition-colors ${
                  selectedPriceRange.label === range.label
                    ? "bg-orange-100 text-orange-600 font-semibold"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {range.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Discount */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 mb-3 text-sm">Discount</h4>
        <ul className="space-y-1">
          {discountRanges.map((d) => (
            <li key={d.label}>
              <button
                onClick={() => setSelectedDiscount(d)}
                className={`w-full text-left py-1.5 px-2.5 rounded-lg text-sm transition-colors ${
                  selectedDiscount.label === d.label
                    ? "bg-orange-100 text-orange-600 font-semibold"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {d.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {onApply && (
        <button
          onClick={onApply}
          className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-colors text-sm"
        >
          Apply Filters
        </button>
      )}
    </>
  );
}

export default function FlashSalePage() {
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 23, seconds: 45 });
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [selectedDiscount, setSelectedDiscount] = useState(discountRanges[0]);
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

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

  useEffect(() => {
    document.body.style.overflow = showFilters ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showFilters]);

  const pad = (n: number) => String(n).padStart(2, "0");

  const timerUnits = [
    { value: pad(timeLeft.hours), label: "Hours" },
    { value: pad(timeLeft.minutes), label: "Min" },
    { value: pad(timeLeft.seconds), label: "Sec" },
  ];

  const filteredProducts = useMemo(() => {
    let list = allProducts;

    if (selectedCategory !== "All Categories") {
      list = list.filter((p) => p.category === selectedCategory);
    }

    list = list.filter((p) => {
      const price = p.discountPrice ?? p.sellingPrice;
      return price >= selectedPriceRange.min && price <= selectedPriceRange.max;
    });

    if (selectedDiscount.min > 0) {
      list = list.filter((p) => {
        if (!p.discountPrice) return false;
        const pct = Math.round(((p.sellingPrice - p.discountPrice) / p.sellingPrice) * 100);
        return pct >= selectedDiscount.min;
      });
    }

    const sorted = [...list];
    if (sortBy === "discount") {
      sorted.sort((a, b) => {
        const da = a.discountPrice ? (a.sellingPrice - a.discountPrice) / a.sellingPrice : 0;
        const db = b.discountPrice ? (b.sellingPrice - b.discountPrice) / b.sellingPrice : 0;
        return db - da;
      });
    } else if (sortBy === "price-low") {
      sorted.sort((a, b) => (a.discountPrice ?? a.sellingPrice) - (b.discountPrice ?? b.sellingPrice));
    } else if (sortBy === "price-high") {
      sorted.sort((a, b) => (b.discountPrice ?? b.sellingPrice) - (a.discountPrice ?? a.sellingPrice));
    } else if (sortBy === "ending") {
      sorted.sort((a, b) => (b.sold / b.total) - (a.sold / a.total));
    }

    return sorted;
  }, [selectedCategory, selectedPriceRange, selectedDiscount, sortBy]);

  const hasActiveFilters =
    selectedCategory !== categories[0] ||
    selectedPriceRange.label !== priceRanges[0].label ||
    selectedDiscount.label !== discountRanges[0].label;

  return (
    <>
      <Breadcrumb items={[{ label: "Flash Sale" }]} />

      <div className="flex flex-col gap-5 sm:gap-6 pt-4 sm:pt-5 pb-20 sm:pb-28">
        {/* ── Header Card (timer + stats) ── */}
        <section className="site-container">
          <div className="bg-white rounded-2xl overflow-hidden">
            <div className="ks-fs-accent-bar" />

            <div className="p-4 sm:p-6">
              <div className="ks-fs-header-row">
                {/* Left: Title */}
                <div className="flex items-center gap-3 sm:gap-3.5">
                  <div className="ks-fs-icon-box">
                    <Zap className="ks-fs-icon-svg" />
                    <div className="ks-fs-icon-pulse" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                      <h1 className="text-xl sm:text-[28px] font-extrabold text-[#111] tracking-tight leading-tight">
                        Flash Sale
                      </h1>
                      <span className="ks-fs-live-badge">
                        <span className="ks-fs-live-dot" />
                        LIVE NOW
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#999] font-medium mt-1">
                      {filteredProducts.length} of {allProducts.length} deals · up to 60% off
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

        {/* ── Filters + Grid ── */}
        <section className="site-container">
          <div className="flex gap-6 lg:gap-8">
            {/* Sidebar Filters — desktop */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-white rounded-xl p-5 sticky top-[176px]">
                <h3 className="font-bold text-base mb-4 text-[#111]">Filters</h3>
                <FilterPanel
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  selectedPriceRange={selectedPriceRange}
                  setSelectedPriceRange={setSelectedPriceRange}
                  selectedDiscount={selectedDiscount}
                  setSelectedDiscount={setSelectedDiscount}
                />
              </div>
            </aside>

            {/* Main */}
            <div className="flex-1 min-w-0">
              <div className="bg-white rounded-2xl p-4 sm:p-5">
                {/* Filter / sort bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    {/* Mobile filter button */}
                    <button
                      onClick={() => setShowFilters(true)}
                      className="lg:hidden flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-semibold text-gray-700"
                    >
                      <SlidersHorizontal className="w-4 h-4" />
                      Filters
                      {hasActiveFilters && (
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                      )}
                    </button>
                    <p className="text-[12px] sm:text-[13px] text-[#999] font-medium">
                      Showing <strong className="text-[#555]">{filteredProducts.length}</strong> deals
                    </p>
                  </div>

                  {/* Sort */}
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

                {/* Active filter chips */}
                {hasActiveFilters && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedCategory !== categories[0] && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-semibold">
                        {selectedCategory}
                        <button onClick={() => setSelectedCategory(categories[0])} aria-label="Clear category">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    )}
                    {selectedPriceRange.label !== priceRanges[0].label && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-semibold">
                        {selectedPriceRange.label}
                        <button onClick={() => setSelectedPriceRange(priceRanges[0])} aria-label="Clear price">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    )}
                    {selectedDiscount.label !== discountRanges[0].label && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-semibold">
                        {selectedDiscount.label}
                        <button onClick={() => setSelectedDiscount(discountRanges[0])} aria-label="Clear discount">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    )}
                  </div>
                )}

                {/* Grid */}
                {filteredProducts.length > 0 ? (
                  <div className="ks-fs-grid">
                    {filteredProducts.map((p) => {
                      const pct = Math.round((p.sold / p.total) * 100);
                      const isHot = pct >= 80;
                      return (
                        <div key={p._id} className="ks-fs-product">
                          <ProductCard product={p} />
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
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Zap className="w-10 h-10 text-gray-300 mb-3" />
                    <p className="text-sm font-semibold text-gray-500 mb-1">No deals match your filters</p>
                    <p className="text-xs text-gray-400 mb-4">Try adjusting or clearing them.</p>
                    <button
                      onClick={() => {
                        setSelectedCategory(categories[0]);
                        setSelectedPriceRange(priceRanges[0]);
                        setSelectedDiscount(discountRanges[0]);
                      }}
                      className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-lg transition-colors"
                    >
                      Clear filters
                    </button>
                  </div>
                )}

                {/* Bottom info */}
                <div className="ks-fs-bottom-info">
                  <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>New flash deals added every <strong>6 hours</strong> &middot; Don&apos;t miss out!</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── Mobile Filters Modal ── */}
      {showFilters && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowFilters(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 sticky top-0 bg-white">
              <h3 className="font-bold text-base text-[#111]">Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5">
              <FilterPanel
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedPriceRange={selectedPriceRange}
                setSelectedPriceRange={setSelectedPriceRange}
                selectedDiscount={selectedDiscount}
                setSelectedDiscount={setSelectedDiscount}
                onApply={() => setShowFilters(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
