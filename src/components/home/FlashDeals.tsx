"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Zap, ChevronRight } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";

const flashProducts = [
  {
    _id: "1",
    name: "Wireless Bluetooth Headphones with Noise Cancellation",
    slug: "wireless-bluetooth-headphones",
    images: ["/products/headphones.jpg"],
    sellingPrice: 199.99,
    discountPrice: 99.99,
    rating: 4.5,
    reviewCount: 128,
    vendor: { name: "TechZone", slug: "techzone" },
  },
  {
    _id: "2",
    name: "Smart Watch Series 5 - Fitness Tracker",
    slug: "smart-watch-series-5",
    images: ["/products/smartwatch.jpg"],
    sellingPrice: 299.99,
    discountPrice: 149.99,
    rating: 4.8,
    reviewCount: 256,
    vendor: { name: "GadgetHub", slug: "gadgethub" },
  },
  {
    _id: "3",
    name: "Premium Leather Backpack - Waterproof",
    slug: "premium-leather-backpack",
    images: ["/products/backpack.jpg"],
    sellingPrice: 129.99,
    discountPrice: 79.99,
    rating: 4.3,
    reviewCount: 89,
    vendor: { name: "FashionPlus", slug: "fashionplus" },
  },
  {
    _id: "4",
    name: "Portable Power Bank 20000mAh Fast Charging",
    slug: "portable-power-bank",
    images: ["/products/powerbank.jpg"],
    sellingPrice: 59.99,
    discountPrice: 34.99,
    rating: 4.6,
    reviewCount: 312,
    vendor: { name: "TechZone", slug: "techzone" },
  },
];

export default function FlashDeals() {
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 23, seconds: 45 });

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

  return (
    <section className="site-container">
      <div className="bg-white rounded-2xl p-5 sm:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <Zap className="w-5 h-5 text-red-500 fill-red-500" />
              <h2 className="text-lg font-bold text-[#333]">Flash Deals</h2>
            </div>
            {/* Timer */}
            <div className="flex items-center gap-1 text-sm">
              <span className="text-[#999] hidden sm:inline">Ends in</span>
              {[pad(timeLeft.hours), pad(timeLeft.minutes), pad(timeLeft.seconds)].map((v, i) => (
                <span key={i} className="flex items-center gap-1">
                  {i > 0 && <span className="text-[#ccc]">:</span>}
                  <span className="bg-[#333] text-white text-xs font-bold px-1.5 py-0.5 rounded font-mono">
                    {v}
                  </span>
                </span>
              ))}
            </div>
          </div>
          <Link href="/flash-sale" className="text-sm text-orange-500 hover:text-orange-600 font-medium flex items-center gap-0.5">
            View all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {flashProducts.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
