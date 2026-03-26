"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Smartphone, Shirt, Home, Dumbbell, Sparkles,
  Gamepad2, Watch, Car, Search,
  ArrowRight, LayoutGrid, TrendingUp, Flame,
} from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import "@/styling/CategoriesPage.css";

const categories = [
  {
    name: "Electronics",
    slug: "electronics",
    icon: Smartphone,
    color: "#3B82F6",
    bg: "#EFF6FF",
    count: "2,400+",
    vendors: 186,
    description: "Smartphones, laptops, audio, cameras and all the latest gadgets.",
    subcategories: ["Smartphones", "Laptops", "Audio", "Cameras", "Wearables", "Accessories"],
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=400&fit=crop&q=80",
    trending: true,
  },
  {
    name: "Fashion",
    slug: "fashion",
    icon: Shirt,
    color: "#EC4899",
    bg: "#FDF2F8",
    count: "3,100+",
    vendors: 234,
    description: "Clothing, shoes, and accessories for men, women, and kids.",
    subcategories: ["Men", "Women", "Kids", "Shoes", "Bags", "Jewelry"],
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop&q=80",
    trending: true,
  },
  {
    name: "Home & Garden",
    slug: "home-garden",
    icon: Home,
    color: "#10B981",
    bg: "#ECFDF5",
    count: "1,800+",
    vendors: 142,
    description: "Furniture, decor, kitchen essentials, and garden tools.",
    subcategories: ["Furniture", "Decor", "Kitchen", "Bedding", "Lighting", "Garden"],
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop&q=80",
    trending: false,
  },
  {
    name: "Sports & Fitness",
    slug: "sports",
    icon: Dumbbell,
    color: "#F59E0B",
    bg: "#FFFBEB",
    count: "950+",
    vendors: 89,
    description: "Equipment, apparel, and accessories for every sport.",
    subcategories: ["Gym", "Running", "Cycling", "Yoga", "Outdoor", "Supplements"],
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=400&fit=crop&q=80",
    trending: false,
  },
  {
    name: "Beauty",
    slug: "beauty",
    icon: Sparkles,
    color: "#A855F7",
    bg: "#FAF5FF",
    count: "1,200+",
    vendors: 167,
    description: "Skincare, makeup, haircare, and fragrances from top brands.",
    subcategories: ["Skincare", "Makeup", "Haircare", "Fragrance", "Tools", "Organic"],
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop&q=80",
    trending: true,
  },
  {
    name: "Gaming",
    slug: "gaming",
    icon: Gamepad2,
    color: "#EF4444",
    bg: "#FEF2F2",
    count: "780+",
    vendors: 65,
    description: "Consoles, PC components, peripherals, and gaming accessories.",
    subcategories: ["Consoles", "PC Gaming", "Controllers", "Headsets", "Chairs", "Merchandise"],
    image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=600&h=400&fit=crop&q=80",
    trending: false,
  },
  {
    name: "Watches",
    slug: "watches",
    icon: Watch,
    color: "#0EA5E9",
    bg: "#F0F9FF",
    count: "540+",
    vendors: 48,
    description: "Luxury, smart, and casual watches from top brands.",
    subcategories: ["Smart Watches", "Luxury", "Casual", "Sport", "Bands", "Accessories"],
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=400&fit=crop&q=80",
    trending: false,
  },
  {
    name: "Automotive",
    slug: "automotive",
    icon: Car,
    color: "#64748B",
    bg: "#F8FAFC",
    count: "420+",
    vendors: 37,
    description: "Parts, accessories, tools, and care products for your vehicle.",
    subcategories: ["Parts", "Accessories", "Tools", "Car Care", "Electronics", "Interior"],
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop&q=80",
    trending: false,
  },
];

export default function CategoriesPage() {
  const [search, setSearch] = useState("");

  const filtered = categories.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.subcategories.some((s) => s.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      <Breadcrumb items={[{ label: "Categories" }]} />

      <div className="flex flex-col gap-5 sm:gap-6 pt-4 sm:pt-5 pb-20 sm:pb-28">
        {/* ── Header Card ── */}
        <section className="site-container">
          <div className="bg-white rounded-2xl overflow-hidden">
            <div className="ks-cat-accent-bar" />

            <div className="p-5 sm:p-6">
              <div className="ks-cat-header-row">
                {/* Left: Title */}
                <div className="flex items-center gap-3.5">
                  <div className="ks-cat-icon-box">
                    <LayoutGrid className="w-[22px] h-[22px] text-orange-500" />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-[28px] font-extrabold text-[#111] tracking-tight leading-tight">
                      All Categories
                    </h1>
                    <p className="text-sm text-[#999] font-medium mt-1.5">
                      Browse products across every department
                    </p>
                  </div>
                </div>

                {/* Right: Search */}
                <div className="ks-cat-search-wrap">
                  <Search className="ks-cat-search-icon" />
                  <input
                    type="text"
                    placeholder="Search categories..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="ks-cat-search-input"
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="ks-cat-stats-strip">
                <div className="ks-cat-stat">
                  <LayoutGrid className="w-[18px] h-[18px] text-orange-500" />
                  <span className="ks-cat-stat-value">{categories.length}</span>
                  <span className="ks-cat-stat-label">Categories</span>
                </div>
                <div className="ks-cat-stat-sep" />
                <div className="ks-cat-stat">
                  <TrendingUp className="w-[18px] h-[18px] text-emerald-500" />
                  <span className="ks-cat-stat-value">11,190+</span>
                  <span className="ks-cat-stat-label">Products</span>
                </div>
                <div className="ks-cat-stat-sep" />
                <div className="ks-cat-stat">
                  <Flame className="w-[18px] h-[18px] text-amber-500" />
                  <span className="ks-cat-stat-value">968</span>
                  <span className="ks-cat-stat-label">Verified Sellers</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Category Grid ── */}
        <section className="site-container">
          <div className="bg-white rounded-2xl p-5 sm:p-6">
            {search && filtered.length === 0 && (
              <div className="flex flex-col items-center py-16 text-center">
                <Search className="w-10 h-10 text-[#ddd] mb-4" />
                <p className="text-base font-semibold text-[#555] mb-1">No categories found</p>
                <p className="text-sm text-[#999]">Try a different search term</p>
              </div>
            )}

            <div className="ks-cat-grid">
              {filtered.map((cat) => {
                const Icon = cat.icon;
                return (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className="ks-cat-card group"
                  >
                    {/* Image */}
                    <div className="ks-cat-card-img-area">
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="ks-cat-card-img-fade" />

                      {/* Product count on image */}
                      <div className="absolute bottom-3.5 left-3.5 z-[2] flex items-baseline gap-1.5">
                        <span className="text-white text-xl font-extrabold leading-none drop-shadow-md">
                          {cat.count}
                        </span>
                        <span className="text-white/70 text-xs font-semibold drop-shadow-md">
                          products
                        </span>
                      </div>

                      {/* Trending */}
                      {cat.trending && (
                        <span className="absolute top-3 right-3 z-[2] flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg text-[11px] font-bold text-orange-500 shadow-sm">
                          <TrendingUp className="w-3.5 h-3.5" />
                          Trending
                        </span>
                      )}
                    </div>

                    {/* Body */}
                    <div className="p-5">
                      {/* Icon + Name */}
                      <div className="flex items-center gap-3.5 mb-3">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                          style={{ backgroundColor: cat.bg }}
                        >
                          <Icon className="w-6 h-6" style={{ color: cat.color }} />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-[17px] font-bold text-[#111] group-hover:text-orange-500 transition-colors leading-tight truncate">
                            {cat.name}
                          </h3>
                          <p className="text-[12.5px] font-semibold mt-0.5" style={{ color: cat.color }}>
                            {cat.vendors} sellers
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-[13.5px] text-[#777] leading-relaxed line-clamp-2 mb-4">
                        {cat.description}
                      </p>

                      {/* Subcategory pills */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {cat.subcategories.slice(0, 4).map((sub) => (
                          <span key={sub} className="ks-cat-sub-pill">
                            {sub}
                          </span>
                        ))}
                        {cat.subcategories.length > 4 && (
                          <span className="text-[11.5px] font-bold px-2 py-1" style={{ color: cat.color }}>
                            +{cat.subcategories.length - 4}
                          </span>
                        )}
                      </div>

                      {/* CTA */}
                      <div className="flex items-center justify-center gap-1.5 pt-3.5 border-t border-gray-100 text-[14px] font-semibold text-orange-500 group-hover:text-orange-600 transition-colors">
                        Browse category
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
