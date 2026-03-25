"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";

const products = [
  {
    _id: "1",
    name: "Apple MacBook Pro 14-inch M3 Pro",
    slug: "macbook-pro-14-m3",
    images: ["/products/macbook.jpg"],
    sellingPrice: 1999.99,
    rating: 4.9,
    reviewCount: 234,
    vendor: { name: "TechZone", slug: "techzone" },
    tag: "trending",
  },
  {
    _id: "2",
    name: "Sony WH-1000XM5 Wireless Headphones",
    slug: "sony-wh-1000xm5",
    images: ["/products/sony-headphones.jpg"],
    sellingPrice: 399.99,
    discountPrice: 349.99,
    rating: 4.8,
    reviewCount: 567,
    vendor: { name: "AudioMax", slug: "audiomax" },
    tag: "trending",
  },
  {
    _id: "3",
    name: "Nike Air Max 270 Running Shoes",
    slug: "nike-air-max-270",
    images: ["/products/nike-shoes.jpg"],
    sellingPrice: 150.0,
    discountPrice: 119.99,
    rating: 4.6,
    reviewCount: 891,
    vendor: { name: "SportsFit Pro", slug: "sportsfit" },
    tag: "popular",
  },
  {
    _id: "4",
    name: "Samsung Galaxy S24 Ultra 256GB",
    slug: "samsung-galaxy-s24-ultra",
    images: ["/products/samsung-phone.jpg"],
    sellingPrice: 1299.99,
    rating: 4.7,
    reviewCount: 432,
    vendor: { name: "TechZone", slug: "techzone" },
    tag: "new",
  },
  {
    _id: "5",
    name: "Dyson V15 Detect Vacuum Cleaner",
    slug: "dyson-v15-detect",
    images: ["/products/dyson.jpg"],
    sellingPrice: 749.99,
    discountPrice: 649.99,
    rating: 4.8,
    reviewCount: 198,
    vendor: { name: "HomeStyle Decor", slug: "homestyle" },
    tag: "trending",
  },
  {
    _id: "6",
    name: "Lululemon Align High-Rise Leggings",
    slug: "lululemon-align-leggings",
    images: ["/products/leggings.jpg"],
    sellingPrice: 98.0,
    rating: 4.7,
    reviewCount: 1023,
    vendor: { name: "FashionPlus", slug: "fashionplus" },
    tag: "popular",
  },
  {
    _id: "7",
    name: "iPad Pro 12.9-inch M2 WiFi 256GB",
    slug: "ipad-pro-12-m2",
    images: ["/products/ipad.jpg"],
    sellingPrice: 1099.99,
    rating: 4.9,
    reviewCount: 345,
    vendor: { name: "TechZone", slug: "techzone" },
    tag: "new",
  },
  {
    _id: "8",
    name: "Philips Hue Smart Lighting Starter Kit",
    slug: "philips-hue-starter-kit",
    images: ["/products/hue.jpg"],
    sellingPrice: 199.99,
    discountPrice: 159.99,
    rating: 4.5,
    reviewCount: 567,
    vendor: { name: "HomeStyle Decor", slug: "homestyle" },
    tag: "popular",
  },
];

const tabs = [
  { id: "all", label: "All" },
  { id: "trending", label: "Trending" },
  { id: "new", label: "New Arrivals" },
  { id: "popular", label: "Most Popular" },
];

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState("all");

  const filtered =
    activeTab === "all"
      ? products
      : products.filter((p) => p.tag === activeTab);

  return (
    <section className="py-14">
      <div className="site-container">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Featured Products
            </h2>
            <p className="text-gray-500 mt-1.5">
              Handpicked products just for you
            </p>
          </div>
          <Link
            href="/products"
            className="hidden sm:inline-flex items-center gap-1.5 text-orange-500 hover:text-orange-600 font-medium transition-colors"
          >
            View All Products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-orange-500 text-white shadow-md shadow-orange-500/25"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        <div className="mt-6 sm:hidden text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-orange-500 font-medium"
          >
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
