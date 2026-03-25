"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";

const products = [
  { _id: "1", name: "Apple MacBook Pro 14-inch M3 Pro", slug: "macbook-pro-14-m3", images: ["/products/macbook.jpg"], sellingPrice: 1999.99, rating: 4.9, reviewCount: 234, vendor: { name: "TechZone", slug: "techzone" }, tag: "trending" },
  { _id: "2", name: "Sony WH-1000XM5 Wireless Headphones", slug: "sony-wh-1000xm5", images: ["/products/sony-headphones.jpg"], sellingPrice: 399.99, discountPrice: 349.99, rating: 4.8, reviewCount: 567, vendor: { name: "AudioMax", slug: "audiomax" }, tag: "trending" },
  { _id: "3", name: "Nike Air Max 270 Running Shoes", slug: "nike-air-max-270", images: ["/products/nike-shoes.jpg"], sellingPrice: 150.0, discountPrice: 119.99, rating: 4.6, reviewCount: 891, vendor: { name: "SportsFit Pro", slug: "sportsfit" }, tag: "popular" },
  { _id: "4", name: "Samsung Galaxy S24 Ultra 256GB", slug: "samsung-galaxy-s24-ultra", images: ["/products/samsung-phone.jpg"], sellingPrice: 1299.99, rating: 4.7, reviewCount: 432, vendor: { name: "TechZone", slug: "techzone" }, tag: "new" },
  { _id: "5", name: "Dyson V15 Detect Vacuum Cleaner", slug: "dyson-v15-detect", images: ["/products/dyson.jpg"], sellingPrice: 749.99, discountPrice: 649.99, rating: 4.8, reviewCount: 198, vendor: { name: "HomeStyle Decor", slug: "homestyle" }, tag: "trending" },
  { _id: "6", name: "Lululemon Align High-Rise Leggings", slug: "lululemon-align-leggings", images: ["/products/leggings.jpg"], sellingPrice: 98.0, rating: 4.7, reviewCount: 1023, vendor: { name: "FashionPlus", slug: "fashionplus" }, tag: "popular" },
  { _id: "7", name: "iPad Pro 12.9-inch M2 WiFi 256GB", slug: "ipad-pro-12-m2", images: ["/products/ipad.jpg"], sellingPrice: 1099.99, rating: 4.9, reviewCount: 345, vendor: { name: "TechZone", slug: "techzone" }, tag: "new" },
  { _id: "8", name: "Philips Hue Smart Lighting Starter Kit", slug: "philips-hue-starter-kit", images: ["/products/hue.jpg"], sellingPrice: 199.99, discountPrice: 159.99, rating: 4.5, reviewCount: 567, vendor: { name: "HomeStyle Decor", slug: "homestyle" }, tag: "popular" },
];

const tabs = [
  { id: "all", label: "All" },
  { id: "trending", label: "Trending" },
  { id: "new", label: "New Arrivals" },
  { id: "popular", label: "Most Popular" },
];

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState("all");
  const filtered = activeTab === "all" ? products : products.filter((p) => p.tag === activeTab);

  return (
    <section className="site-container">
      <div className="bg-white rounded-2xl p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[#333]">Featured Products</h2>
          <Link href="/products" className="text-sm text-orange-500 hover:text-orange-600 font-medium flex items-center gap-0.5">
            View all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-5 overflow-x-auto scrollbar-hide border-b border-gray-100">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors relative ${
                activeTab === tab.id ? "text-orange-500" : "text-[#999] hover:text-[#666]"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-1 right-1 h-0.5 bg-orange-500 rounded-full" />
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {filtered.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
