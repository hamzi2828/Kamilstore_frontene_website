"use client";

import { useState } from "react";
import {
  TrendingUp, Flame, ChevronDown, Eye,
  ShoppingCart, Award,
} from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { useLanguage } from "@/lib/i18n";
import "@/styling/FlashSalePage.css";

const allProducts = [
  { _id: "1", name: "Apple AirPods Pro 2nd Generation", slug: "airpods-pro-2", images: ["https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop"], sellingPrice: 249.99, discountPrice: 189.99, rating: 4.7, reviewCount: 567, vendor: { name: "TechZone", slug: "techzone" } },
  { _id: "2", name: "Smart Watch Series 5 - Fitness Tracker", slug: "smart-watch-series-5", images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop"], sellingPrice: 299.99, discountPrice: 149.99, rating: 4.8, reviewCount: 256, vendor: { name: "GadgetHub", slug: "gadgethub" } },
  { _id: "3", name: "Running Shoes Ultra Lightweight Comfort", slug: "running-shoes-ultra", images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop"], sellingPrice: 120.00, discountPrice: 69.99, rating: 4.4, reviewCount: 203, vendor: { name: "SportsFit Pro", slug: "sportsfit" } },
  { _id: "4", name: "Wireless Bluetooth Headphones with Noise Cancellation", slug: "wireless-bluetooth-headphones", images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"], sellingPrice: 199.99, discountPrice: 99.99, rating: 4.5, reviewCount: 128, vendor: { name: "TechZone", slug: "techzone" } },
  { _id: "5", name: "Portable Power Bank 20000mAh Fast Charging", slug: "portable-power-bank", images: ["https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop"], sellingPrice: 59.99, discountPrice: 34.99, rating: 4.6, reviewCount: 312, vendor: { name: "TechZone", slug: "techzone" } },
  { _id: "6", name: "Premium Leather Backpack - Waterproof", slug: "premium-leather-backpack", images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop"], sellingPrice: 129.99, discountPrice: 79.99, rating: 4.3, reviewCount: 89, vendor: { name: "FashionPlus", slug: "fashionplus" } },
  { _id: "7", name: "Mechanical Gaming Keyboard RGB Backlit", slug: "gaming-keyboard-rgb", images: ["https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&h=400&fit=crop"], sellingPrice: 89.99, discountPrice: 54.99, rating: 4.5, reviewCount: 178, vendor: { name: "TechZone", slug: "techzone" } },
  { _id: "8", name: "Minimalist Leather Wallet RFID Blocking", slug: "leather-wallet-rfid", images: ["https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop"], sellingPrice: 45.99, discountPrice: 24.99, rating: 4.2, reviewCount: 94, vendor: { name: "FashionPlus", slug: "fashionplus" } },
];

const categoryFilters = [
  { value: "All", labelKey: "catalog.all" },
  { value: "Electronics", labelKey: "catalog.dept.electronics.name" },
  { value: "Fashion", labelKey: "catalog.dept.fashion.name" },
  { value: "Sports", labelKey: "catalog.filter.sports" },
  { value: "Accessories", labelKey: "catalog.sub.accessories" },
];

export default function TrendingPage() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("popular");

  return (
    <>
      <Breadcrumb items={[{ label: t("nav.trending") }]} />

      <div className="flex flex-col gap-5 sm:gap-6 pt-4 sm:pt-5 pb-20 sm:pb-28">
        {/* ── Header Card ── */}
        <section className="site-container">
          <div className="bg-white rounded-2xl overflow-hidden">
            <div className="ks-fs-accent-bar" />

            <div className="p-5 sm:p-6">
              <div className="ks-fs-header-row">
                {/* Left: Title */}
                <div className="flex items-center gap-3.5">
                  <div className="ks-fs-icon-box" style={{ background: "linear-gradient(135deg, #ecfdf5, #d1fae5)", borderColor: "#6ee7b7" }}>
                    <TrendingUp className="w-[22px] h-[22px] text-emerald-500" />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-[28px] font-extrabold text-[#111] tracking-tight leading-tight">
                      {t("catalog.trending.title")}
                    </h1>
                    <p className="text-sm text-[#999] font-medium mt-1.5">
                      {t("catalog.trending.subtitle")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="ks-fs-stats-strip">
                <div className="ks-fs-stat">
                  <Flame className="w-[18px] h-[18px] text-orange-500" />
                  <span className="ks-fs-stat-value">{allProducts.length}</span>
                  <span className="ks-fs-stat-label">{t("catalog.stats.trendingItems")}</span>
                </div>
                <div className="ks-fs-stat-sep" />
                <div className="ks-fs-stat">
                  <Eye className="w-[18px] h-[18px] text-blue-500" />
                  <span className="ks-fs-stat-value">18k+</span>
                  <span className="ks-fs-stat-label">{t("catalog.stats.viewsThisWeek")}</span>
                </div>
                <div className="ks-fs-stat-sep" />
                <div className="ks-fs-stat">
                  <ShoppingCart className="w-[18px] h-[18px] text-emerald-500" />
                  <span className="ks-fs-stat-value">3.6k+</span>
                  <span className="ks-fs-stat-label">{t("catalog.stats.purchased")}</span>
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
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`ks-fs-pill ${selectedCategory === cat.value ? "ks-fs-pill-active" : ""}`}
                    style={selectedCategory === cat.value ? { background: "#10b981", borderColor: "#10b981" } : {}}
                  >
                    {t(cat.labelKey)}
                  </button>
                ))}
              </div>

              <div className="ks-fs-sort-wrap">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="ks-fs-sort-select"
                >
                  <option value="popular">{t("catalog.sort.mostPopular")}</option>
                  <option value="views">{t("catalog.sort.mostViewed")}</option>
                  <option value="rating">{t("catalog.sort.topRated")}</option>
                  <option value="price-low">{t("catalog.sort.priceLow")}</option>
                  <option value="price-high">{t("catalog.sort.priceHigh")}</option>
                </select>
                <ChevronDown className="ks-fs-sort-arrow" />
              </div>
            </div>

            <p className="text-[13px] text-[#999] font-medium mb-5">
              {t("catalog.showingPrefix")} <strong className="text-[#555]">{allProducts.length}</strong> {t("catalog.trendingProductsWord")}
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
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span>{t("catalog.trending.bottomPre")} <strong>{t("catalog.trending.everyHour")}</strong> {t("catalog.trending.bottomPost")}</span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
