"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Star, ShieldCheck, MapPin, Calendar, Package,
  MessageCircle, ChevronDown, Grid, List, ChevronRight,
  Clock, Percent, ThumbsUp, ArrowRight, Store,
} from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import Breadcrumb from "@/components/ui/Breadcrumb";
import "@/styling/VendorPage.css";

const vendor = {
  _id: "v1",
  name: "TechZone Electronics",
  slug: "techzone",
  logo: "/vendors/techzone.jpg",
  coverImage: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1440&h=400&fit=crop&q=80",
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
  followers: "12.4k",
};

const vendorProducts = [
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
    vendor: { name: "TechZone", slug: "techzone" },
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
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"],
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

  const joinDate = new Date(vendor.joinedAt).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Vendors", href: "/vendors" },
          { label: vendor.name },
        ]}
      />

      <div className="flex flex-col gap-5 sm:gap-6 pb-20 sm:pb-28">
        {/* ── Cover Image ── */}
        <div className="ks-vp-cover">
          <Image
            src={vendor.coverImage}
            alt={vendor.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="ks-vp-cover-overlay" />
        </div>

        {/* ── Vendor Profile Card ── */}
        <section className="site-container" style={{ marginTop: -60 }}>
          <div className="ks-vp-profile-card">
            {/* Avatar */}
            <div className="ks-vp-avatar">
              <span className="ks-vp-avatar-letter">
                {vendor.name.charAt(0)}
              </span>
            </div>

            <div className="ks-vp-profile-body">
              {/* Top row: name + actions */}
              <div className="ks-vp-profile-top">
                <div>
                  <div className="ks-vp-name-row">
                    <h1 className="ks-vp-name">{vendor.name}</h1>
                    {vendor.isVerified && (
                      <span className="ks-vp-verified-badge">
                        <ShieldCheck className="ks-vp-verified-icon" />
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="ks-vp-desc">{vendor.description}</p>
                </div>

                <div className="ks-vp-actions">
                  <button className="ks-vp-contact-btn">
                    <MessageCircle className="ks-vp-contact-icon" />
                    Contact Seller
                  </button>
                  <button className="ks-vp-follow-btn">
                    <Store className="ks-vp-follow-icon" />
                    Follow
                  </button>
                </div>
              </div>

              {/* Stats grid */}
              <div className="ks-vp-stats-grid">
                <div className="ks-vp-stat-card">
                  <Star className="ks-vp-stat-icon" style={{ color: "#F59E0B" }} />
                  <div>
                    <span className="ks-vp-stat-value">{vendor.rating}</span>
                    <span className="ks-vp-stat-label">{vendor.reviewCount.toLocaleString()} reviews</span>
                  </div>
                </div>
                <div className="ks-vp-stat-card">
                  <Package className="ks-vp-stat-icon" style={{ color: "#3B82F6" }} />
                  <div>
                    <span className="ks-vp-stat-value">{vendor.productCount}</span>
                    <span className="ks-vp-stat-label">Products</span>
                  </div>
                </div>
                <div className="ks-vp-stat-card">
                  <ThumbsUp className="ks-vp-stat-icon" style={{ color: "#10B981" }} />
                  <div>
                    <span className="ks-vp-stat-value">{vendor.responseRate}</span>
                    <span className="ks-vp-stat-label">Response rate</span>
                  </div>
                </div>
                <div className="ks-vp-stat-card">
                  <Clock className="ks-vp-stat-icon" style={{ color: "#8B5CF6" }} />
                  <div>
                    <span className="ks-vp-stat-value">{vendor.responseTime}</span>
                    <span className="ks-vp-stat-label">Avg response</span>
                  </div>
                </div>
                <div className="ks-vp-stat-card">
                  <MapPin className="ks-vp-stat-icon" style={{ color: "#EF4444" }} />
                  <div>
                    <span className="ks-vp-stat-value">{vendor.location}</span>
                    <span className="ks-vp-stat-label">Location</span>
                  </div>
                </div>
                <div className="ks-vp-stat-card">
                  <Calendar className="ks-vp-stat-icon" style={{ color: "#F97316" }} />
                  <div>
                    <span className="ks-vp-stat-value">{joinDate}</span>
                    <span className="ks-vp-stat-label">Member since</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Products Section ── */}
        <section className="site-container">
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
                  <h2 className="ks-vp-toolbar-title">
                    {selectedCategory}
                  </h2>
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

              {/* Pagination */}
              <div className="ks-vp-pagination">
                <button className="ks-vp-page-btn">Previous</button>
                <button className="ks-vp-page-btn ks-vp-page-btn-active">1</button>
                <button className="ks-vp-page-btn">2</button>
                <button className="ks-vp-page-btn">Next</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
