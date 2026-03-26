"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, TrendingUp, Sparkles, Flame, LayoutGrid, ArrowRight } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import "@/styling/FeaturedProducts.css";

const products = [
  { _id: "1", name: "Apple MacBook Pro 14-inch M3 Pro", slug: "macbook-pro-14-m3", images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop"], sellingPrice: 1999.99, rating: 4.9, reviewCount: 234, vendor: { name: "TechZone", slug: "techzone" }, tag: "trending" },
  { _id: "2", name: "Sony WH-1000XM5 Wireless Headphones", slug: "sony-wh-1000xm5", images: ["https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop"], sellingPrice: 399.99, discountPrice: 349.99, rating: 4.8, reviewCount: 567, vendor: { name: "AudioMax", slug: "audiomax" }, tag: "trending" },
  { _id: "3", name: "Nike Air Max 270 Running Shoes", slug: "nike-air-max-270", images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop"], sellingPrice: 150.0, discountPrice: 119.99, rating: 4.6, reviewCount: 891, vendor: { name: "SportsFit Pro", slug: "sportsfit" }, tag: "popular" },
  { _id: "4", name: "Samsung Galaxy S24 Ultra 256GB", slug: "samsung-galaxy-s24-ultra", images: ["https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop"], sellingPrice: 1299.99, rating: 4.7, reviewCount: 432, vendor: { name: "TechZone", slug: "techzone" }, tag: "new" },
  { _id: "5", name: "Dyson V15 Detect Vacuum Cleaner", slug: "dyson-v15-detect", images: ["https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop"], sellingPrice: 749.99, discountPrice: 649.99, rating: 4.8, reviewCount: 198, vendor: { name: "HomeStyle Decor", slug: "homestyle" }, tag: "trending" },
  { _id: "6", name: "Lululemon Align High-Rise Leggings", slug: "lululemon-align-leggings", images: ["https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&h=400&fit=crop"], sellingPrice: 98.0, rating: 4.7, reviewCount: 1023, vendor: { name: "FashionPlus", slug: "fashionplus" }, tag: "popular" },
  { _id: "7", name: "iPad Pro 12.9-inch M2 WiFi 256GB", slug: "ipad-pro-12-m2", images: ["https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop"], sellingPrice: 1099.99, rating: 4.9, reviewCount: 345, vendor: { name: "TechZone", slug: "techzone" }, tag: "new" },
  { _id: "8", name: "Philips Hue Smart Lighting Starter Kit", slug: "philips-hue-starter-kit", images: ["https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=400&fit=crop"], sellingPrice: 199.99, discountPrice: 159.99, rating: 4.5, reviewCount: 567, vendor: { name: "HomeStyle Decor", slug: "homestyle" }, tag: "popular" },
];

const tabs = [
  { id: "all", label: "All", icon: LayoutGrid, count: products.length },
  { id: "trending", label: "Trending", icon: TrendingUp, count: products.filter((p) => p.tag === "trending").length },
  { id: "new", label: "New Arrivals", icon: Sparkles, count: products.filter((p) => p.tag === "new").length },
  { id: "popular", label: "Most Popular", icon: Flame, count: products.filter((p) => p.tag === "popular").length },
];

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState("all");
  const filtered = activeTab === "all" ? products : products.filter((p) => p.tag === activeTab);

  return (
    <section className="site-container">
      <div className="ks-fp-wrap">
        {/* ── Header ── */}
        <div className="ks-fp-header">
          <div className="ks-fp-header-left">
            <div className="ks-fp-icon">
              <Sparkles className="ks-fp-icon-svg" />
            </div>
            <div>
              <h2 className="ks-fp-title">Featured Products</h2>
              <p className="ks-fp-subtitle">Hand-picked by our curators</p>
            </div>
          </div>
          <Link href="/products" className="ks-fp-viewall">
            View All
            <ArrowRight className="ks-fp-viewall-icon" />
          </Link>
        </div>

        {/* ── Tabs ── */}
        <div className="ks-fp-tabs-wrap">
          <div className="ks-fp-tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`ks-fp-tab ${isActive ? "ks-fp-tab-active" : ""}`}
                >
                  <Icon className="ks-fp-tab-icon" />
                  <span className="ks-fp-tab-label">{tab.label}</span>
                  <span className={`ks-fp-tab-count ${isActive ? "ks-fp-tab-count-active" : ""}`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Product Grid ── */}
        <div className="ks-fp-grid-area">
          <div className="ks-fp-grid">
            {filtered.map((p) => (
              <div key={p._id} className="ks-fp-product">
                <ProductCard product={p} />
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="ks-fp-empty">
              <Sparkles className="ks-fp-empty-icon" />
              <p>No products found in this category</p>
            </div>
          )}
        </div>

        {/* ── Bottom strip ── */}
        <div className="ks-fp-bottom">
          <span className="ks-fp-bottom-text">
            Showing <strong>{filtered.length}</strong> of <strong>{products.length}</strong> featured products
          </span>
          <Link href="/products" className="ks-fp-bottom-link">
            Browse all products
            <ChevronRight className="ks-fp-bottom-link-icon" />
          </Link>
        </div>
      </div>
    </section>
  );
}
