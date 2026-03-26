"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search, ChevronDown, Store, Star, ShieldCheck,
  Package, MessageSquare, ArrowRight, TrendingUp,
  Users, ChevronRight, Award,
} from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import "@/styling/VendorsPage.css";

const allVendors = [
  { _id: "1", name: "TechZone Electronics", slug: "techzone", description: "Your trusted source for premium electronics and gadgets. Quality products at competitive prices.", rating: 4.8, reviewCount: 1250, productCount: 342, isVerified: true, badge: "Top Rated", color: "#3B82F6" },
  { _id: "2", name: "FashionPlus", slug: "fashionplus", description: "Trendy fashion for everyone. Stay stylish with our latest collections from top brands.", rating: 4.6, reviewCount: 890, productCount: 567, isVerified: true, badge: "Best Seller", color: "#EC4899" },
  { _id: "3", name: "HomeStyle Decor", slug: "homestyle", description: "Transform your living space with our beautiful home decor and furniture collection.", rating: 4.7, reviewCount: 456, productCount: 234, isVerified: true, badge: "Featured", color: "#10B981" },
  { _id: "4", name: "SportsFit Pro", slug: "sportsfit", description: "Premium sports equipment and fitness gear for athletes and fitness enthusiasts.", rating: 4.5, reviewCount: 678, productCount: 189, isVerified: false, color: "#F59E0B" },
  { _id: "5", name: "AudioMax", slug: "audiomax", description: "High-quality audio equipment for music lovers. From headphones to speakers.", rating: 4.9, reviewCount: 543, productCount: 156, isVerified: true, badge: "Top Rated", color: "#8B5CF6" },
  { _id: "6", name: "BeautyGlow", slug: "beautyglow", description: "Premium skincare and beauty products from leading brands worldwide.", rating: 4.4, reviewCount: 321, productCount: 278, isVerified: true, color: "#A855F7" },
  { _id: "7", name: "KidsWorld", slug: "kidsworld", description: "Everything for kids! Toys, clothing, and educational materials for all ages.", rating: 4.6, reviewCount: 432, productCount: 445, isVerified: false, color: "#EF4444" },
  { _id: "8", name: "GardenPro", slug: "gardenpro", description: "Quality gardening tools, plants, and outdoor living essentials.", rating: 4.7, reviewCount: 234, productCount: 167, isVerified: true, color: "#059669" },
];

const categoryFilters = [
  "All",
  "Electronics",
  "Fashion",
  "Home & Garden",
  "Sports",
  "Beauty",
  "Kids",
];

const badgeStyles: Record<string, { bg: string; color: string; border: string }> = {
  "Top Rated": { bg: "#FFFBEB", color: "#D97706", border: "#FDE68A" },
  "Best Seller": { bg: "#ECFDF5", color: "#059669", border: "#A7F3D0" },
  Featured: { bg: "#FAF5FF", color: "#7C3AED", border: "#DDD6FE" },
};

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  return n.toString();
}

export default function VendorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  const filtered = allVendors.filter((v) =>
    v.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Breadcrumb items={[{ label: "Vendors" }]} />

      <div className="flex flex-col gap-5 sm:gap-6 pt-4 sm:pt-5 pb-20 sm:pb-28">
        {/* ── Header Card ── */}
        <section className="site-container">
          <div className="bg-white rounded-2xl overflow-hidden">
            <div className="h-[3px] bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400" />

            <div className="p-5 sm:p-6">
              {/* Title row */}
              <div className="flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row mb-5">
                <div className="flex items-center gap-3.5">
                  <div className="ks-vs-icon-box">
                    <Store className="w-[22px] h-[22px] text-orange-500" />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-[28px] font-extrabold text-[#111] tracking-tight leading-tight">
                      Our Vendors
                    </h1>
                    <p className="text-sm text-[#999] font-medium mt-1.5">
                      Shop from {allVendors.length} trusted sellers on KamilStore
                    </p>
                  </div>
                </div>

                {/* Search */}
                <div className="ks-vs-search-wrap">
                  <Search className="ks-vs-search-icon" />
                  <input
                    type="text"
                    placeholder="Search vendors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="ks-vs-search-input"
                  />
                </div>
              </div>

              {/* Stats strip */}
              <div className="ks-vs-stats-strip">
                <div className="ks-vs-stat">
                  <Store className="w-[18px] h-[18px] text-orange-500" />
                  <span className="ks-vs-stat-value">{allVendors.length}</span>
                  <span className="ks-vs-stat-label">Vendors</span>
                </div>
                <div className="ks-vs-stat-sep" />
                <div className="ks-vs-stat">
                  <Package className="w-[18px] h-[18px] text-blue-500" />
                  <span className="ks-vs-stat-value">2,378</span>
                  <span className="ks-vs-stat-label">Total Products</span>
                </div>
                <div className="ks-vs-stat-sep" />
                <div className="ks-vs-stat">
                  <Users className="w-[18px] h-[18px] text-emerald-500" />
                  <span className="ks-vs-stat-value">98%</span>
                  <span className="ks-vs-stat-label">Verified Sellers</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Filters + Grid ── */}
        <section className="site-container">
          <div className="bg-white rounded-2xl p-5 sm:p-6">
            {/* Filter bar */}
            <div className="ks-vs-filter-bar">
              <div className="ks-vs-category-pills">
                {categoryFilters.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`ks-vs-pill ${selectedCategory === cat ? "ks-vs-pill-active" : ""}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="ks-vs-sort-wrap">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="ks-vs-sort-select"
                >
                  <option value="featured">Featured</option>
                  <option value="rating">Highest Rated</option>
                  <option value="products">Most Products</option>
                  <option value="reviews">Most Reviews</option>
                </select>
                <ChevronDown className="ks-vs-sort-arrow" />
              </div>
            </div>

            {/* Result count */}
            <p className="text-[13px] text-[#999] font-medium mb-5">
              Showing <strong className="text-[#555]">{filtered.length}</strong> vendors
            </p>

            {/* Empty */}
            {filtered.length === 0 && (
              <div className="flex flex-col items-center py-16 text-center">
                <Search className="w-10 h-10 text-[#ddd] mb-4" />
                <p className="text-base font-semibold text-[#555] mb-1">No vendors found</p>
                <p className="text-sm text-[#999]">Try a different search term</p>
              </div>
            )}

            {/* Vendors Grid */}
            <div className="ks-vs-grid">
              {filtered.map((v, i) => {
                const bs = v.badge ? badgeStyles[v.badge] : null;
                return (
                  <Link
                    key={v._id}
                    href={`/vendor/${v.slug}`}
                    className="ks-vs-card group"
                  >
                    {/* Rank for top 3 */}
                    {i < 3 && (
                      <div className={`ks-vs-rank ks-vs-rank-${i + 1}`}>
                        {i + 1}
                      </div>
                    )}

                    {/* Header */}
                    <div className="ks-vs-card-header">
                      <div
                        className="ks-vs-avatar"
                        style={{ background: `linear-gradient(135deg, ${v.color}22, ${v.color}11)`, borderColor: `${v.color}30` }}
                      >
                        <span style={{ color: v.color }}>{v.name.charAt(0)}</span>
                      </div>
                      <div className="ks-vs-card-info">
                        <div className="ks-vs-name-row">
                          <h3 className="ks-vs-card-name">{v.name}</h3>
                          {v.isVerified && (
                            <ShieldCheck className="ks-vs-verified" />
                          )}
                        </div>
                        <div className="ks-vs-stars">
                          {[...Array(5)].map((_, j) => (
                            <Star
                              key={j}
                              className={`ks-vs-star ${j < Math.floor(v.rating) ? "ks-vs-star-filled" : ""}`}
                            />
                          ))}
                          <span className="ks-vs-rating-num">{v.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Badge */}
                    {bs && v.badge && (
                      <span
                        className="ks-vs-badge"
                        style={{ background: bs.bg, color: bs.color, borderColor: bs.border }}
                      >
                        <Award className="ks-vs-badge-icon" />
                        {v.badge}
                      </span>
                    )}

                    {/* Description */}
                    <p className="ks-vs-card-desc">{v.description}</p>

                    {/* Stats */}
                    <div className="ks-vs-card-stats">
                      <div className="ks-vs-card-stat">
                        <Package className="ks-vs-card-stat-icon" />
                        {formatCount(v.productCount)} products
                      </div>
                      <div className="ks-vs-card-stat">
                        <MessageSquare className="ks-vs-card-stat-icon" />
                        {formatCount(v.reviewCount)} reviews
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="ks-vs-card-cta">
                      Visit store
                      <ArrowRight className="ks-vs-card-cta-icon" />
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="ks-vs-pagination">
              <button className="ks-vs-page-btn">Previous</button>
              <button className="ks-vs-page-btn ks-vs-page-active">1</button>
              <button className="ks-vs-page-btn">2</button>
              <button className="ks-vs-page-btn">3</button>
              <button className="ks-vs-page-btn">Next</button>
            </div>
          </div>
        </section>

        {/* ── Become a Seller CTA ── */}
        <section className="site-container">
          <div className="ks-vs-cta-card">
            <div className="ks-vs-cta-content">
              <div className="ks-vs-cta-icon-box">
                <Store className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h2 className="ks-vs-cta-title">Become a Seller</h2>
                <p className="ks-vs-cta-sub">
                  Join thousands of successful sellers on KamilStore. Reach millions of customers today.
                </p>
              </div>
            </div>
            <Link href="/vendor/register" className="ks-vs-cta-btn">
              Start Selling
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
